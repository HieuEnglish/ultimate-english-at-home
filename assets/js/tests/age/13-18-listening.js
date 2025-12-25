/* assets/js/tests/age/13-18-listening.js
   Runner: Ages 13–18 • Listening (IELTS-inspired)

   - 4 parts (P1–P4), similar to IELTS listening but easier.
   - Uses browser Speech Synthesis (TTS) to read the Part audio ("say") so no external audio files are required.
   - One-question-at-a-time UI, timer, auto-grading, and a review + per-part summary.

   Bank: assets/data/tests-13-18-listening.js
   Global key: window.UEAH_TEST_BANKS["age-13-18-listening"]

   Updates (this file):
   - Ensures every question has a stable UNIQUE id (prevents broken label/inputs and review mapping)
   - More resilient bank loader (handles existing script + validates after a tick)
   - Stronger selection: picks up to MAX_PER_PART per part, then backfills to reach a full test when parts are short
   - Adds Stop audio button; cancels speech on navigation/restart/next and before speaking again
   - Better transcript rendering (supports arrays + line breaks)
   - Better fill-blank grading: supports acceptedAnswers + array answers; normalization tuned for times/numbers
   - Summary: per-part score + expandable review table
   - Adds “Save score to Profile” on final summary (uses window.UEAH_SAVE_SCORE if available)
   - Normalized save payload input (commonly "p") includes:
     • questions: p.questions
     • review: p.review
*/

(function () {
  "use strict";

  const SLUG = "age-13-18-listening";
  const BANK_SRC = "assets/data/tests-13-18-listening.js";

  const AGE_GROUP = "13-18";
  const SKILL = "listening";

  // Easier than IELTS but similar structure.
  const TIME_LIMIT_SEC = 30 * 60;
  const MAX_PER_PART = 5;
  const TARGET_TOTAL = 4 * MAX_PER_PART;

  const store = window.UEAH_TESTS_STORE;
  if (!store || typeof store.registerRunner !== "function") return;

  // -----------------------------
  // Helpers
  // -----------------------------

  function nowIso() {
    try {
      return new Date().toISOString();
    } catch (_) {
      return "";
    }
  }

  function shuffleInPlace(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const tmp = arr[i];
      arr[i] = arr[j];
      arr[j] = tmp;
    }
    return arr;
  }

  function isPlainObject(v) {
    return v && typeof v === "object" && !Array.isArray(v);
  }

  function safeText(v) {
    return String(v == null ? "" : v)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }

  function safeTextWithBreaks(v) {
    return safeText(v).replace(/\n/g, "<br>");
  }

  function safeDomId(v) {
    return String(v == null ? "" : v)
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9\-_:.]/g, "-")
      .slice(0, 80);
  }

  function normalizeAnswerText(v) {
    // Trim, lowercase, remove punctuation and spaces.
    // Good for times like "2:30" vs "2 30" -> "230"
    return String(v == null ? "" : v)
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "");
  }

  function ensureUniqueIds(qs) {
    const seen = new Set();
    return (Array.isArray(qs) ? qs : []).map((q, idx) => {
      if (!isPlainObject(q)) return q;

      const base =
        q.id != null && String(q.id).trim() ? String(q.id).trim() : `${SLUG}::idx-${idx}`;

      let id = base;
      if (seen.has(id)) {
        let n = 2;
        while (seen.has(`${base}--${n}`)) n += 1;
        id = `${base}--${n}`;
      }
      seen.add(id);
      return { ...q, id };
    });
  }

  function getType(q) {
    return String((q && q.type) || "").trim().toLowerCase();
  }

  function isBlankType(type) {
    const t = String(type || "").toLowerCase();
    return (
      t === "listenfillintheblank" ||
      t === "listeningfillintheblank" ||
      t === "fillintheblank" ||
      t === "blank"
    );
  }

  function isChoiceType(type) {
    const t = String(type || "").toLowerCase();
    return (
      t === "listenchoice" ||
      t === "listeningchoice" ||
      t === "mcq" ||
      t === "multiplechoice" ||
      t === "choice"
    );
  }

  function partIdNorm(partId) {
    const id = String(partId || "").toLowerCase();
    if (id === "p1" || id === "part1" || id === "1") return "p1";
    if (id === "p2" || id === "part2" || id === "2") return "p2";
    if (id === "p3" || id === "part3" || id === "3") return "p3";
    if (id === "p4" || id === "part4" || id === "4") return "p4";
    return "p1";
  }

  function partLabel(partId) {
    const id = partIdNorm(partId);
    if (id === "p1") return "Part 1";
    if (id === "p2") return "Part 2";
    if (id === "p3") return "Part 3";
    if (id === "p4") return "Part 4";
    return "Part";
  }

  function formatTime(sec) {
    const s = Math.max(0, Math.floor(sec));
    const m = Math.floor(s / 60);
    const r = s % 60;
    return `${String(m).padStart(2, "0")}:${String(r).padStart(2, "0")}`;
  }

  function audioTextForQuestion(q) {
    if (!q) return "";
    const say = q.say;
    if (Array.isArray(say)) return say.filter((x) => x != null).map(String).join("\n");
    if (say == null) return "";
    return String(say);
  }

  function correctTextForBlank(ans, acceptedAnswers) {
    const out = [];
    if (Array.isArray(acceptedAnswers)) out.push(...acceptedAnswers.filter((x) => x != null).map(String));
    if (Array.isArray(ans)) out.push(...ans.filter((x) => x != null).map(String));
    else if (ans != null) out.push(String(ans));

    const uniq = [];
    const seen = new Set();
    out.forEach((s) => {
      const k = normalizeAnswerText(s);
      if (!k) return;
      if (seen.has(k)) return;
      seen.add(k);
      uniq.push(s);
    });

    return uniq.length ? uniq.join(" / ") : "";
  }

  function getOptionsForQuestion(q) {
    const opts = q && Array.isArray(q.options) ? q.options : [];
    return opts;
  }

  function optionAt(q, idx) {
    const opts = getOptionsForQuestion(q);
    const n = Number(idx);
    if (!Number.isFinite(n)) return "";
    return opts[n] == null ? "" : String(opts[n]);
  }

  function cloneQuestionWithShuffledOptions(q) {
    if (!isPlainObject(q)) return q;

    const t = getType(q);
    if (!isChoiceType(t)) return { ...q };

    if (!Array.isArray(q.options) || typeof q.answer !== "number") return { ...q };

    const pairs = q.options.map((text, idx) => ({ text, idx }));
    shuffleInPlace(pairs);
    const newOptions = pairs.map((p) => p.text);
    const newAnswer = pairs.findIndex((p) => p.idx === q.answer);

    return { ...q, options: newOptions, answer: newAnswer };
  }

  // -----------------------------
  // Bank loader (no build step)
  // -----------------------------

  let bankPromise = null;

  function ensureBankLoaded(ctx) {
    if (window.UEAH_TEST_BANKS && Array.isArray(window.UEAH_TEST_BANKS[SLUG])) {
      return Promise.resolve(true);
    }
    if (bankPromise) return bankPromise;

    const src = ctx && typeof ctx.assetHref === "function" ? ctx.assetHref(BANK_SRC) : BANK_SRC;

    bankPromise = new Promise((resolve, reject) => {
      const validate = () => {
        setTimeout(() => {
          if (window.UEAH_TEST_BANKS && Array.isArray(window.UEAH_TEST_BANKS[SLUG])) resolve(true);
          else reject(new Error("Missing question bank."));
        }, 0);
      };

      const existing = document.querySelector(`script[data-ueah-test-bank="${SLUG}"]`);
      if (existing) {
        if (window.UEAH_TEST_BANKS && Array.isArray(window.UEAH_TEST_BANKS[SLUG])) {
          resolve(true);
          return;
        }
        existing.addEventListener("load", validate, { once: true });
        existing.addEventListener("error", () => reject(new Error("Failed to load test bank")), { once: true });
        validate();
        return;
      }

      const s = document.createElement("script");
      s.defer = true;
      s.async = true;
      s.src = src;
      s.setAttribute("data-ueah-test-bank", SLUG);
      s.onload = validate;
      s.onerror = () => reject(new Error(`Failed to load: ${src}`));
      document.head.appendChild(s);
    });

    return bankPromise;
  }

  // -----------------------------
  // Speech (TTS)
  // -----------------------------

  function supportsSpeech() {
    return !!(window.speechSynthesis && window.SpeechSynthesisUtterance);
  }

  function stopSpeech() {
    try {
      if (window.speechSynthesis) window.speechSynthesis.cancel();
    } catch (_) {}
  }

  // Chunk long text for more reliable playback.
  let activeUtterances = [];
  function clearUtterances() {
    activeUtterances = [];
  }

  function speak(text) {
    const t = String(text || "").trim();
    if (!t) return false;
    if (!supportsSpeech()) return false;

    try {
      const synth = window.speechSynthesis;
      synth.cancel();
      clearUtterances();

      try {
        if (typeof synth.getVoices === "function") synth.getVoices();
      } catch (_) {}

      const chunks = t
        .split(/\n{2,}/g)
        .map((s) => s.trim())
        .filter(Boolean);

      if (!chunks.length) return false;

      chunks.forEach((chunk, idx) => {
        const u = new SpeechSynthesisUtterance(chunk);
        u.lang = "en-US";
        u.rate = 0.97;
        u.pitch = 1.0;
        u.volume = 1.0;
        if (idx === 0) {
          u.onend = () => {};
        }
        activeUtterances.push(u);
      });

      // Speak sequentially
      let i = 0;
      const speakNext = () => {
        if (i >= activeUtterances.length) return;
        const u = activeUtterances[i];
        u.onend = () => {
          i += 1;
          speakNext();
        };
        u.onerror = () => {
          i += 1;
          speakNext();
        };
        synth.speak(u);
      };
      speakNext();

      return true;
    } catch (_) {
      return false;
    }
  }

  // -----------------------------
  // Selection logic
  // -----------------------------

  function buildListeningSet(bankRaw) {
    const base = (Array.isArray(bankRaw) ? bankRaw : []).filter(isPlainObject).map((q) => {
      const pid = partIdNorm(q.partId || q.part || q.partID);
      return { ...q, partId: pid };
    });

    const cleaned = ensureUniqueIds(base);
    if (!cleaned.length) return [];

    const prepared = cleaned.map(cloneQuestionWithShuffledOptions);

    const byPart = { p1: [], p2: [], p3: [], p4: [] };
    prepared.forEach((q) => {
      byPart[partIdNorm(q.partId)].push(q);
    });

    const chosen = [];
    const used = new Set();
    const partCounts = { p1: 0, p2: 0, p3: 0, p4: 0 };

    // Primary picks: up to MAX_PER_PART per part (p1->p4)
    ["p1", "p2", "p3", "p4"].forEach((pid) => {
      const tmp = (byPart[pid] || []).slice();
      shuffleInPlace(tmp);

      for (let i = 0; i < tmp.length && chosen.length < TARGET_TOTAL; i++) {
        if (partCounts[pid] >= MAX_PER_PART) break;
        const q = tmp[i];
        const id = q && q.id != null ? String(q.id) : "";
        if (!id || used.has(id)) continue;
        used.add(id);
        chosen.push(q);
        partCounts[pid] += 1;
      }
    });

    // Backfill: fill remaining slots from all leftovers
    if (chosen.length < TARGET_TOTAL) {
      const leftovers = prepared.filter((q) => q && q.id != null && !used.has(String(q.id)));
      shuffleInPlace(leftovers);

      for (let i = 0; i < leftovers.length && chosen.length < TARGET_TOTAL; i++) {
        const q = leftovers[i];
        const id = q && q.id != null ? String(q.id) : "";
        if (!id || used.has(id)) continue;
        used.add(id);
        chosen.push(q);
      }
    }

    // Order: group by part (p1->p4), preserve within chosen order
    const ordered = [];
    ["p1", "p2", "p3", "p4"].forEach((pid) => {
      ordered.push(...chosen.filter((q) => partIdNorm(q.partId) === pid));
    });

    return ordered.length ? ordered : chosen;
  }

  // -----------------------------
  // UI renderers
  // -----------------------------

  function renderIntro() {
    const audioOk = supportsSpeech();
    return `
      <div class="note" style="margin-top:0">
        <strong>Ages 13–18 Listening</strong>
        <p style="margin:8px 0 0">
          IELTS-inspired listening practice with 4 parts (conversation → lecture). This is easier than IELTS, but uses common question styles.
        </p>
        <p style="margin:8px 0 0; opacity:.92">
          Recommended time: 30 minutes.
          ${
            audioOk
              ? 'Use <strong>🔊 Play</strong> to hear the audio (TTS). You can replay for practice.'
              : 'Audio is not available in this browser. Use <strong>Show transcript</strong> instead.'
          }
        </p>
      </div>
      <div class="actions" style="margin-top:12px">
        <button class="btn btn--primary" type="button" data-action="start">Start</button>
      </div>
    `;
  }

  function renderLoading() {
    return `
      <div class="note" style="margin-top:0">
        <strong>Loading…</strong>
        <p style="margin:8px 0 0">Preparing your test.</p>
      </div>
    `;
  }

  function renderError(message) {
    return `
      <div class="note" style="margin-top:0">
        <strong>Could not start the test</strong>
        <p style="margin:8px 0 0">${safeText(message || "Unknown error")}</p>
      </div>
      <div class="actions" style="margin-top:12px">
        <button class="btn" type="button" data-action="retry">Try again</button>
      </div>
    `;
  }

  function renderTopBar(state) {
    const total = state.questions.length;
    const n = Math.min(state.index + 1, total);
    const q = state.questions[state.index] || {};

    const audioText = audioTextForQuestion(q).trim();
    const canPlay = supportsSpeech() && !!audioText;

    return `
      <div style="display:flex; align-items:center; justify-content:space-between; gap:10px; flex-wrap:wrap">
        <div style="display:flex; align-items:center; gap:10px; flex-wrap:wrap">
          <div style="font-weight:800; color: var(--muted)">${partLabel(q.partId)} • Question ${n} of ${total}</div>
          <div class="chip" aria-label="Time remaining" style="font-weight:900">${formatTime(state.timeRemaining)}</div>
        </div>
        <div style="display:flex; gap:8px; flex-wrap:wrap">
          <button class="btn" type="button" data-action="play" ${canPlay ? "" : "disabled"} aria-label="Play the audio">🔊 Play</button>
          <button class="btn" type="button" data-action="stop" ${supportsSpeech() ? "" : "disabled"} aria-label="Stop audio">⏹ Stop</button>
          <button class="btn" type="button" data-action="toggleTranscript" aria-pressed="${state.showTranscript ? "true" : "false"}">
            ${state.showTranscript ? "Hide transcript" : "Show transcript"}
          </button>
          <button class="btn" type="button" data-action="restart" aria-label="Restart the test">Restart</button>
        </div>
      </div>
    `;
  }

  function renderNoAudioHint() {
    return `
      <div class="note" style="margin:12px 0 0; padding:10px 12px">
        <strong>Audio not available</strong>
        <p style="margin:6px 0 0">Your browser does not support Speech Synthesis. Use <strong>Show transcript</strong> instead.</p>
      </div>
    `;
  }

  function renderContext(q) {
    const c = q && q.context ? String(q.context) : "";
    if (!c.trim()) return "";
    return `
      <div class="note" style="margin:12px 0 0; padding:10px 12px">
        <strong>Context</strong>
        <p style="margin:8px 0 0">${safeTextWithBreaks(c)}</p>
      </div>
    `;
  }

  function renderTranscript(state) {
    const q = state.questions[state.index];
    if (!state.showTranscript) return "";
    const t = audioTextForQuestion(q);
    if (!t.trim()) return "";
    return `
      <div class="note" style="margin:12px 0 0; padding:12px 14px">
        <strong>Transcript</strong>
        <p style="margin:8px 0 0">${safeTextWithBreaks(t)}</p>
      </div>
    `;
  }

  function renderChoiceForm(q) {
    const prompt = safeTextWithBreaks(q.question || "Question");
    const options = getOptionsForQuestion(q);

    const optionsHtml = options
      .map((opt, i) => {
        const id = `opt-${SLUG}-${safeDomId(q.id)}-${i}`;
        return `
          <label for="${id}" style="display:flex; align-items:center; gap:10px; padding:12px; border:1px solid var(--border); border-radius:14px; background: var(--surface2); cursor:pointer">
            <input id="${id}" type="radio" name="choice" value="${i}" required style="margin:0" />
            <span>${safeText(opt)}</span>
          </label>
        `;
      })
      .join("");

    return `
      <form data-form="question" style="margin-top:12px">
        <fieldset style="border:1px solid var(--border); border-radius:16px; padding:14px; background: var(--surface2)">
          <legend style="padding:0 8px; font-weight:900">${prompt}</legend>
          <div role="radiogroup" aria-label="Answer choices" style="display:grid; gap:10px; margin-top:12px">
            ${
              optionsHtml ||
              `<div class="note" style="margin:0; padding:10px 12px"><strong>No options provided</strong></div>`
            }
          </div>
          <div class="actions" style="margin-top:12px; display:flex; gap:10px; flex-wrap:wrap">
            <button class="btn btn--primary" type="submit">Submit</button>
            <button class="btn" type="button" data-action="skip">Skip</button>
          </div>
        </fieldset>
      </form>
    `;
  }

  function renderBlankForm(q) {
    const prompt = safeTextWithBreaks(q.question || "Complete the answer");
    return `
      <form data-form="question" style="margin-top:12px">
        <fieldset style="border:1px solid var(--border); border-radius:16px; padding:14px; background: var(--surface2)">
          <legend style="padding:0 8px; font-weight:900">${prompt}</legend>

          <label style="display:block; margin-top:12px">
            <span style="font-weight:800; color:var(--muted)">Your answer</span>
            <input
              type="text"
              name="blank"
              required
              autocomplete="off"
              autocapitalize="none"
              spellcheck="false"
              maxlength="64"
              style="width:100%; margin-top:8px; padding:12px 12px; border:1px solid var(--border); border-radius:14px; background: var(--surface)"
              placeholder="Type your answer"
            />
          </label>

          <div class="actions" style="margin-top:12px; display:flex; gap:10px; flex-wrap:wrap">
            <button class="btn btn--primary" type="submit">Submit</button>
            <button class="btn" type="button" data-action="skip">Skip</button>
          </div>
        </fieldset>
      </form>
    `;
  }

  function renderQuestionScreen(state) {
    const q = state.questions[state.index];
    if (!q) return renderError("Missing question");

    const t = getType(q);
    const formHtml = isBlankType(t) ? renderBlankForm(q) : renderChoiceForm(q);

    return `
      ${renderTopBar(state)}
      ${!supportsSpeech() ? renderNoAudioHint() : ""}
      ${renderContext(q)}
      ${renderTranscript(state)}
      ${formHtml}
    `;
  }

  function renderFeedback(state) {
    const q = state.questions[state.index] || {};
    const t = getType(q);

    const isSkipped = !!state.lastWasSkipped;
    const ok = !!state.lastIsCorrect;

    const expl = q && q.explanation ? String(q.explanation).trim() : "";

    let correctText = "";
    if (isBlankType(t)) {
      correctText = correctTextForBlank(q && q.answer, q && q.acceptedAnswers) || "";
    } else {
      correctText = optionAt(q, Number(q && q.answer)) || "";
    }

    return `
      ${renderTopBar(state)}
      <div class="note" style="margin-top:12px" aria-live="polite">
        <strong>${isSkipped ? "⏭️ Skipped" : ok ? "✅ Correct" : "❌ Not quite"}</strong>
        <p style="margin:8px 0 0"><span style="font-weight:800">Correct answer:</span> ${safeText(correctText || "(not set)")}</p>
        ${
          !isSkipped
            ? `<p style="margin:8px 0 0; opacity:.92"><span style="font-weight:800">Your answer:</span> ${safeText(
                state.lastUserText || ""
              )}</p>`
            : ""
        }
        ${expl ? `<p style="margin:8px 0 0; opacity:.95">${safeText(expl)}</p>` : ""}
      </div>
      <div class="actions" style="margin-top:12px">
        <button class="btn btn--primary" type="button" data-action="next">Next</button>
      </div>
    `;
  }

  function renderReview(state) {
    const rows = (Array.isArray(state.responses) ? state.responses : [])
      .map((r, idx) => {
        return `
          <tr>
            <td style="padding:10px 8px; vertical-align:top; font-weight:800">${idx + 1}</td>
            <td style="padding:10px 8px; vertical-align:top; color:var(--muted)">${safeText(partLabel(r.partId))}</td>
            <td style="padding:10px 8px; vertical-align:top">${safeText(r.question || "")}</td>
            <td style="padding:10px 8px; vertical-align:top">${safeText(r.userText || "")}</td>
            <td style="padding:10px 8px; vertical-align:top">${safeText(r.correctText || "")}</td>
            <td style="padding:10px 8px; vertical-align:top; font-weight:900">${r.skipped ? "⏭️" : r.ok ? "✓" : "✗"}</td>
          </tr>
        `;
      })
      .join("");

    return `
      <details style="margin-top:12px">
        <summary style="cursor:pointer; font-weight:900">Review answers</summary>
        <div style="overflow:auto; margin-top:10px; border:1px solid var(--border); border-radius:16px; background: var(--surface2)">
          <table style="width:100%; border-collapse:collapse; min-width:720px">
            <thead>
              <tr>
                <th style="text-align:left; padding:10px 8px; border-bottom:1px solid var(--border)">#</th>
                <th style="text-align:left; padding:10px 8px; border-bottom:1px solid var(--border)">Part</th>
                <th style="text-align:left; padding:10px 8px; border-bottom:1px solid var(--border)">Question</th>
                <th style="text-align:left; padding:10px 8px; border-bottom:1px solid var(--border)">Your answer</th>
                <th style="text-align:left; padding:10px 8px; border-bottom:1px solid var(--border)">Correct</th>
                <th style="text-align:left; padding:10px 8px; border-bottom:1px solid var(--border)">✓/✗</th>
              </tr>
            </thead>
            <tbody>
              ${rows}
            </tbody>
          </table>
        </div>
      </details>
    `;
  }

  function renderSummary(state) {
    const total = state.questions.length;
    const score = state.correctCount;
    const pct = total ? Math.round((score / total) * 100) : 0;

    const perPart = { p1: { c: 0, t: 0 }, p2: { c: 0, t: 0 }, p3: { c: 0, t: 0 }, p4: { c: 0, t: 0 } };
    (Array.isArray(state.responses) ? state.responses : []).forEach((r) => {
      const pid = partIdNorm(r.partId);
      if (!perPart[pid]) perPart[pid] = { c: 0, t: 0 };
      perPart[pid].t += 1;
      if (!r.skipped && r.ok) perPart[pid].c += 1;
    });

    const partLines = ["p1", "p2", "p3", "p4"]
      .map((pid) => {
        const x = perPart[pid] || { c: 0, t: 0 };
        return `<div style="margin-top:6px; color:var(--muted)"><strong>${safeText(partLabel(pid))}:</strong> ${x.c} / ${x.t}</div>`;
      })
      .join("");

    const canSave =
      !!(window.UEAH_SAVE_SCORE && typeof window.UEAH_SAVE_SCORE.save === "function") && !state.isSaving && !state.savedMsg;

    const savedNote = state.savedMsg
      ? `
        <div class="note" style="margin-top:12px">
          <strong>Saved to Profile</strong>
          <p style="margin:8px 0 0">${safeText(state.savedMsg)}</p>
          <p style="margin:8px 0 0; opacity:.9">Open <strong>Profile</strong> to view progress and your certification.</p>
        </div>
      `
      : "";

    return `
      <div class="note" style="margin-top:0">
        <strong>Finished</strong>
        <p style="margin:8px 0 0">Score: <span style="font-weight:900">${score}</span> / ${total} (${pct}%)</p>
        <p style="margin:8px 0 0; opacity:.92">Time remaining: ${formatTime(state.timeRemaining)}</p>
        ${partLines}
      </div>

      ${state.responses.length ? renderReview(state) : ""}

      <div class="actions" style="margin-top:12px; display:flex; gap:10px; flex-wrap:wrap">
        <button class="btn btn--primary" type="button" data-action="restart">Restart</button>
        <button class="btn" type="button" data-action="save" ${canSave ? "" : "disabled"} aria-label="Save score to Profile">
          ${state.isSaving ? "Saving…" : "Save score to Profile"}
        </button>
      </div>

      ${savedNote}
    `;
  }

  // -----------------------------
  // Runner wiring
  // -----------------------------

  store.registerRunner(SLUG, {
    render() {
      return `
        <div data-ueah-test="${SLUG}">
          <div data-stage>
            ${renderIntro()}
          </div>
        </div>
      `;
    },

    afterRender(rootEl, ctx) {
      if (!rootEl) return;

      const host = rootEl.querySelector(`[data-ueah-test="${SLUG}"]`);
      if (!host) return;
      if (host.__ueahInited) return;
      host.__ueahInited = true;

      const stage = host.querySelector("[data-stage]");
      if (!stage) return;

      const state = {
        status: "intro", // intro | loading | question | feedback | summary | error
        questions: [],
        index: 0,
        correctCount: 0,
        timeRemaining: TIME_LIMIT_SEC,
        timerId: null,

        lastIsCorrect: false,
        lastWasSkipped: false,
        lastUserText: "",
        lastError: "",

        showTranscript: false,

        isSaving: false,
        savedMsg: "",

        // review rows
        responses: []
      };

      function stopTimer() {
        if (state.timerId) {
          clearInterval(state.timerId);
          state.timerId = null;
        }
      }

      function startTimer() {
        stopTimer();
        state.timerId = setInterval(() => {
          if (state.status !== "question" && state.status !== "feedback") return;

          state.timeRemaining -= 1;
          if (state.timeRemaining <= 0) {
            state.timeRemaining = 0;
            stopTimer();
            stopSpeech();
            state.status = "summary";
            paint();
            return;
          }

          const chip = host.querySelector('[aria-label="Time remaining"]');
          if (chip) chip.textContent = formatTime(state.timeRemaining);
        }, 1000);
      }

      function paint() {
        if (state.status === "intro") stage.innerHTML = renderIntro();
        else if (state.status === "loading") stage.innerHTML = renderLoading();
        else if (state.status === "question") stage.innerHTML = renderQuestionScreen(state);
        else if (state.status === "feedback") stage.innerHTML = renderFeedback(state);
        else if (state.status === "summary") stage.innerHTML = renderSummary(state);
        else if (state.status === "error") stage.innerHTML = renderError(state.lastError);
        else stage.innerHTML = renderIntro();
      }

      function currentQuestion() {
        return state.questions[state.index] || null;
      }

      function speakCurrent() {
        const q = currentQuestion();
        if (!q) return;
        const t = audioTextForQuestion(q);
        stopSpeech();
        speak(t);
      }

      async function start() {
        stopTimer();
        stopSpeech();

        state.status = "loading";
        state.lastError = "";
        state.showTranscript = false;
        state.responses = [];
        state.correctCount = 0;
        state.index = 0;
        state.lastIsCorrect = false;
        state.lastWasSkipped = false;
        state.lastUserText = "";
        state.timeRemaining = TIME_LIMIT_SEC;
        state.isSaving = false;
        state.savedMsg = "";

        paint();

        try {
          await ensureBankLoaded(ctx);

          const bank =
            window.UEAH_TEST_BANKS && Array.isArray(window.UEAH_TEST_BANKS[SLUG])
              ? window.UEAH_TEST_BANKS[SLUG]
              : [];

          if (!bank.length) throw new Error("Missing question bank.");

          const chosen = buildListeningSet(bank);
          if (!chosen.length) throw new Error("Could not build a listening test from the bank.");

          state.questions = chosen;
          state.status = "question";
          paint();
          startTimer();

          setTimeout(() => {
            try {
              const el = host.querySelector("input, button");
              if (el && typeof el.focus === "function") el.focus();
            } catch (_) {}
          }, 0);
        } catch (err) {
          stopTimer();
          stopSpeech();
          state.status = "error";
          state.lastError = err && err.message ? err.message : "Could not load the test.";
          paint();
        }
      }

      function restart() {
        stopTimer();
        stopSpeech();

        state.status = "intro";
        state.questions = [];
        state.index = 0;
        state.correctCount = 0;
        state.timeRemaining = TIME_LIMIT_SEC;
        state.lastIsCorrect = false;
        state.lastWasSkipped = false;
        state.lastUserText = "";
        state.lastError = "";
        state.showTranscript = false;
        state.responses = [];
        state.isSaving = false;
        state.savedMsg = "";

        paint();
      }

      function next() {
        stopSpeech();

        if (state.index + 1 >= state.questions.length) {
          stopTimer();
          state.status = "summary";
          paint();
          return;
        }

        state.index += 1;
        state.lastIsCorrect = false;
        state.lastWasSkipped = false;
        state.lastUserText = "";
        state.showTranscript = false;

        state.status = "question";
        paint();
      }

      function recordResponse(q, ok, skipped, userText, correctText) {
        state.responses.push({
          id: q && q.id != null ? String(q.id) : "",
          partId: q && q.partId ? q.partId : "p1",
          question: q && q.question ? String(q.question) : "",
          type: getType(q),
          ok: !!ok,
          skipped: !!skipped,
          userText: String(userText || ""),
          correctText: String(correctText || "")
        });
      }

      function grade(choiceIndex, blankText, isSkip) {
        const q = currentQuestion();
        if (!q) return;

        // prevent double-answering
        if (state.status !== "question") return;

        stopSpeech();

        const t = getType(q);

        let ok = false;
        const skipped = !!isSkip;
        let userText = "";
        let correctText = "";

        if (isBlankType(t)) {
          userText = blankText != null ? String(blankText) : "";
          correctText = correctTextForBlank(q && q.answer, q && q.acceptedAnswers) || "";

          if (!skipped) {
            const user = normalizeAnswerText(userText);
            const ans = q && q.answer;

            const accepted = [];
            if (Array.isArray(q && q.acceptedAnswers)) accepted.push(...q.acceptedAnswers);
            if (Array.isArray(ans)) accepted.push(...ans);
            else if (ans != null) accepted.push(ans);

            ok = accepted.some((a) => normalizeAnswerText(a) === user);
          }
        } else {
          correctText = optionAt(q, Number(q && q.answer)) || "";

          if (skipped) {
            userText = "Skipped";
          } else {
            const chosen = Number(choiceIndex);
            if (!Number.isFinite(chosen)) return;
            userText = optionAt(q, chosen) || String(chosen);
            ok = chosen === Number(q && q.answer);
          }
        }

        state.lastWasSkipped = skipped;
        state.lastIsCorrect = !skipped && ok;
        state.lastUserText = userText;

        if (!skipped && ok) state.correctCount += 1;

        recordResponse(q, ok, skipped, userText, correctText);

        state.status = "feedback";
        paint();
      }

      // -----------------------------
      // Normalized save payload (commonly "p")
      // Ensure payload includes:
      //  • questions: p.questions
      //  • review: p.review
      // -----------------------------
      function buildNormalizedPayload() {
        const qs = Array.isArray(state.questions) ? state.questions : [];

        const mapById = Object.create(null);
        (Array.isArray(state.responses) ? state.responses : []).forEach((r) => {
          if (!r || !r.id) return;
          mapById[String(r.id)] = r;
        });

        // Normalize: 1 point per question
        const questions = qs.map((q) => (isPlainObject(q) ? { ...q, points: 1 } : q));

        // Review aligned to questions array order; skips treated as incorrect.
        const review = qs.map((q) => {
          const id = q && q.id != null ? String(q.id) : "";
          const r = id ? mapById[id] : null;
          return { isCorrect: !!(r && !r.skipped && r.ok) };
        });

        const rawCorrect = Number(state.correctCount || 0);
        const totalQuestions = qs.length;
        const percent = totalQuestions ? Math.round((rawCorrect / totalQuestions) * 100) : 0;

        return { questions, review, rawCorrect, totalQuestions, percent };
      }

      async function saveScoreToProfile() {
        if (!(window.UEAH_SAVE_SCORE && typeof window.UEAH_SAVE_SCORE.save === "function")) {
          state.savedMsg = "Save is not available.";
          paint();
          return;
        }
        if (state.isSaving || state.savedMsg) return;

        state.isSaving = true;
        paint();

        try {
          const p = buildNormalizedPayload();

          const info = await window.UEAH_SAVE_SCORE.save({
            slug: SLUG,
            ageGroup: AGE_GROUP,
            skill: SKILL,
            timestamp: nowIso(),

            rawCorrect: p.rawCorrect,
            totalQuestions: p.totalQuestions,
            percent: p.percent,

            // Required normalized payload fields:
            questions: p.questions,
            review: p.review
          });

          state.savedMsg = `Saved: ${info.ageLabel} • ${info.skillLabel} — ${info.normalizedScore}/100 (${info.levelTitle})`;
        } catch (e) {
          state.savedMsg = `Could not save: ${e && e.message ? e.message : "Unknown error"}`;
        } finally {
          state.isSaving = false;
          paint();
        }
      }

      // Initial render
      paint();

      host.addEventListener("click", (ev) => {
        const btn = ev.target && ev.target.closest ? ev.target.closest("button") : null;
        if (!btn) return;

        const action = btn.getAttribute("data-action");

        if (action === "start" || action === "retry") {
          ev.preventDefault();
          start();
        } else if (action === "restart") {
          ev.preventDefault();
          restart();
        } else if (action === "next") {
          ev.preventDefault();
          next();
        } else if (action === "play") {
          ev.preventDefault();
          speakCurrent();
        } else if (action === "stop") {
          ev.preventDefault();
          stopSpeech();
        } else if (action === "toggleTranscript") {
          ev.preventDefault();
          state.showTranscript = !state.showTranscript;
          paint();
        } else if (action === "skip") {
          ev.preventDefault();
          grade(null, "", true);
        } else if (action === "save") {
          ev.preventDefault();
          if (state.status === "summary") saveScoreToProfile();
        }
      });

      host.addEventListener("submit", (ev) => {
        const form = ev.target;
        if (!form || !form.matches || !form.matches('[data-form="question"]')) return;
        ev.preventDefault();

        const q = currentQuestion();
        if (!q) return;

        const t = getType(q);

        if (isBlankType(t)) {
          const input = form.querySelector('input[name="blank"]');
          grade(null, input ? input.value : "", false);
          return;
        }

        const checked = form.querySelector('input[name="choice"]:checked');
        if (!checked) return;
        grade(Number(checked.value), null, false);
      });

      // Best-effort cleanup on navigation
      if (!host.__ueahNavHooked) {
        host.__ueahNavHooked = true;
        window.addEventListener(
          "popstate",
          () => {
            stopSpeech();
            stopTimer();
          },
          { passive: true }
        );
        window.addEventListener(
          "pagehide",
          () => {
            stopSpeech();
            stopTimer();
          },
          { passive: true }
        );
      }
    }
  });
})();
