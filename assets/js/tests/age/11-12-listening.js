/* assets/js/tests/age/11-12-listening.js
   Runner: Ages 11–12 • Listening

   Loads the question bank (assets/data/tests-11-12-listening.js) and runs a
   simple, accessible, one-question-at-a-time listening quiz.

   Audio approach (no assets needed):
   - Uses the browser's Speech Synthesis (TTS) to read "say".
   - Includes a "🔊 Play" button and a "Show transcript" fallback.

   Supported question types:
   - listenChoice
   - listenTrueFalse
   - listenFillInTheBlank

   Randomization:
   - Shuffles question order on start
   - Shuffles options within listenChoice questions

   Updates (this file):
   - Robust bank loader (handles existing script; validates bank on next tick)
   - Ensures stable ids for every question (prevents overwriting review rows)
   - True/False supports boolean / string / numeric answers and default options
   - Better fill-in grading: supports q.acceptedAnswers / q.answers / q.acceptAnyOf / q.answer (string|array)
   - SpeechSynthesis: Play + Stop; cancels on navigation and between prompts
   - Optional one-time auto-play per question (if audio exists)
   - Final summary includes per-question review table
   - Adds "Save score to Profile" using shared helper (window.UEAH_SAVE_SCORE) when available
   - Save payload now includes (or ensures present):
     * questions: state.questions
     * review: state.review
*/

(function () {
  "use strict";

  const SLUG = "age-11-12-listening";
  const BANK_SRC = "assets/data/tests-11-12-listening.js";
  const MAX_QUESTIONS = 20;

  const store = window.UEAH_TESTS_STORE;
  if (!store || typeof store.registerRunner !== "function") return;

  // -----------------------------
  // Small helpers
  // -----------------------------

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

  function normalizeType(v) {
    return String(v || "")
      .trim()
      .toLowerCase()
      .replace(/[^a-z]/g, "");
  }

  function normalizeAnswerText(v) {
    // Trim, collapse spaces, lowercase, and strip trailing punctuation.
    return String(v == null ? "" : v)
      .trim()
      .toLowerCase()
      .replace(/[\u00A0]/g, " ")
      .replace(/\s+/g, " ")
      .replace(/[\.\!\?\,\;\:\)\]\}\"\']+$/g, "")
      .trim();
  }

  function ensureIds(qs) {
    const arr = Array.isArray(qs) ? qs : [];
    return arr.map((q, idx) => {
      if (!isPlainObject(q)) return q;
      const id = q.id != null && String(q.id).trim() ? String(q.id).trim() : `${SLUG}::idx-${idx}`;
      return { ...q, id };
    });
  }

  function getType(q) {
    const t = normalizeType(q && q.type ? q.type : "");
    // Support both "listenFillInTheBlank" and "listenFillInBlank" etc. by normalization.
    if (t === "listenfillintheblank") return "listenfillintheblank";
    if (t === "listentruefalse") return "listentruefalse";
    if (t === "listenchoice") return "listenchoice";
    return t || "listenchoice";
  }

  function typeLabel(q) {
    const t = getType(q);
    if (t === "listenfillintheblank") return "Fill in the blank";
    if (t === "listentruefalse") return "True / False";
    return "Multiple choice";
  }

  function coerceTrueFalseAnswerToIndex(ans) {
    if (typeof ans === "boolean") return ans ? 0 : 1;
    const s = String(ans == null ? "" : ans).trim().toLowerCase();
    if (s === "true" || s === "t" || s === "yes" || s === "y") return 0;
    if (s === "false" || s === "f" || s === "no" || s === "n") return 1;
    const n = Number(ans);
    if (Number.isFinite(n)) return n;
    return null;
  }

  function getOptionsForQuestion(q) {
    const t = getType(q);
    if (Array.isArray(q && q.options) && q.options.length) return q.options;
    if (t === "listentruefalse") return ["True", "False"];
    return [];
  }

  function optionAt(q, idx) {
    const opts = getOptionsForQuestion(q);
    const n = Number(idx);
    if (!Number.isFinite(n)) return "";
    return opts[n] == null ? "" : String(opts[n]);
  }

  function correctTextForBlank(ans) {
    if (Array.isArray(ans)) return ans.filter((x) => x != null).map(String).join(" / ");
    return ans == null ? "" : String(ans);
  }

  function getAcceptedBlankAnswers(q) {
    const out = [];

    if (!q) return out;

    if (Array.isArray(q.acceptedAnswers)) out.push(...q.acceptedAnswers);
    if (Array.isArray(q.acceptAnyOf)) out.push(...q.acceptAnyOf);
    if (Array.isArray(q.answers)) out.push(...q.answers);

    const a = q.answer;
    if (Array.isArray(a)) out.push(...a);
    else if (a != null) out.push(a);

    return out
      .map((x) => String(x == null ? "" : x))
      .map((s) => s.trim())
      .filter(Boolean);
  }

  function gradeBlank(q, userText) {
    const user = normalizeAnswerText(userText);
    const acceptedRaw = getAcceptedBlankAnswers(q);
    const acceptedNorm = acceptedRaw.map(normalizeAnswerText).filter(Boolean);
    const ok = !!user && acceptedNorm.includes(user);
    return { ok, acceptedRaw };
  }

  function cloneQuestionWithShuffledOptions(q) {
    if (!isPlainObject(q)) return q;

    const t = getType(q);

    // Shuffle only for listenChoice when we have options + numeric answer index.
    if (t !== "listenchoice") return { ...q };

    if (!Array.isArray(q.options)) return { ...q };
    if (typeof q.answer !== "number") return { ...q };

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
  // Speech (TTS) — via shared helper UEAH_TTS
  // -----------------------------

  function supportsSpeech() {
    return !!window.UEAH_TTS?.isSupported?.();
  }

  function stopSpeech() {
    try {
      window.UEAH_TTS?.stop?.();
    } catch (_) {}
  }

  function shouldChunk(text) {
    const t = String(text || "").trim();
    if (!t) return false;
    return t.length > 90 || t.includes("\n");
  }

  function speak(text) {
    const t = String(text || "").trim();
    if (!t) return false;

    const tts = window.UEAH_TTS;
    if (!tts || typeof tts.speak !== "function") return false;

    try {
      // Ensure any prior speech is stopped (best effort).
      if (typeof tts.stop === "function") tts.stop();
      tts.speak(t, { lang: "en-US", chunk: shouldChunk(t) });
      return true;
    } catch (_) {
      return false;
    }
  }

  // -----------------------------
  // UI renderers
  // -----------------------------

  function renderIntro() {
    const audioLine = supportsSpeech()
      ? "Tip: Take quick notes. Use <strong>🔊 Play</strong> to repeat the audio, and <strong>Show transcript</strong> if needed."
      : "Audio is not available in this browser. Use <strong>Show transcript</strong> and read it out loud.";

    return `
      <div class="note" style="margin-top:0">
        <strong>Ages 11–12 Listening</strong>
        <p style="margin:8px 0 0">
          Listen for main ideas, specific details, and common exam-style information (times, dates, prices, names, and places).
        </p>
        <p style="margin:8px 0 0; opacity:.92">${audioLine}</p>
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

    const q = state.questions[state.index];
    const sayText = q && q.say ? String(q.say).trim() : "";
    const canPlay = supportsSpeech() && !!sayText;

    return `
      <div style="display:flex; align-items:center; justify-content:space-between; gap:10px; flex-wrap:wrap">
        <div style="font-weight:800; color: var(--muted)">Question ${n} of ${total}</div>
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

  function renderPicture(q) {
    const p = q && q.picture ? String(q.picture) : "";
    if (!p.trim()) return "";

    return `
      <div class="note" style="margin:12px 0 0; padding:12px 14px">
        <strong>Look</strong>
        <div style="font-size:52px; line-height:1.1; margin-top:10px" aria-label="Picture">${safeText(p)}</div>
      </div>
    `;
  }

  function renderTranscript(state) {
    const q = state.questions[state.index];
    const t = q && q.say ? String(q.say) : "";
    if (!state.showTranscript) return "";
    if (!t.trim()) return "";

    return `
      <div class="note" style="margin:12px 0 0; padding:12px 14px">
        <strong>Transcript</strong>
        <p style="margin:8px 0 0">${safeTextWithBreaks(t)}</p>
      </div>
    `;
  }

  function renderMCQForm(q) {
    const prompt = safeTextWithBreaks(q.question || "Question");
    const options = getOptionsForQuestion(q);

    const optionsHtml = options
      .map((opt, i) => {
        const id = `opt-${SLUG}-${q.id}-${i}`;
        return `
          <label for="${id}" style="display:flex; align-items:flex-start; gap:10px; padding:12px; border:1px solid var(--border); border-radius:14px; background: var(--surface2); cursor:pointer">
            <input id="${id}" type="radio" name="choice" value="${i}" required style="margin-top:3px" />
            <span style="line-height:1.35">${safeText(opt)}</span>
          </label>
        `;
      })
      .join("");

    return `
      <form data-form="question" style="margin-top:12px">
        <fieldset style="border:1px solid var(--border); border-radius:16px; padding:14px; background: var(--surface2)">
          <legend style="padding:0 8px; font-weight:900">${prompt}</legend>

          <div role="radiogroup" aria-label="Answer choices" style="display:grid; gap:10px; margin-top:12px">
            ${optionsHtml || `<div class="note" style="margin:0; padding:10px 12px"><strong>No options provided</strong></div>`}
          </div>

          <div class="actions" style="margin-top:12px">
            <button class="btn btn--primary" type="submit">Submit</button>
          </div>
        </fieldset>
      </form>
    `;
  }

  function renderFillBlankForm(q) {
    const prompt = safeTextWithBreaks(q.question || "Fill in the blank");

    return `
      <form data-form="question" style="margin-top:12px">
        <fieldset style="border:1px solid var(--border); border-radius:16px; padding:14px; background: var(--surface2)">
          <legend style="padding:0 8px; font-weight:900">${prompt}</legend>

          <label style="display:block; margin-top:12px">
            <span class="sr-only">Your answer</span>
            <input
              type="text"
              name="blank"
              inputmode="text"
              autocomplete="off"
              autocapitalize="none"
              spellcheck="false"
              maxlength="64"
              required
              style="width:100%; padding:12px 12px; border:1px solid var(--border); border-radius:14px; background: var(--surface)"
              placeholder="Type your answer"
            />
          </label>

          <div class="actions" style="margin-top:12px">
            <button class="btn btn--primary" type="submit">Check</button>
          </div>
        </fieldset>
      </form>
    `;
  }

  function renderQuestionScreen(state) {
    const q = state.questions[state.index];

    const top = renderTopBar(state);
    const context = renderContext(q);
    const picture = renderPicture(q);

    const type = getType(q);
    const form = type === "listenfillintheblank" ? renderFillBlankForm(q) : renderMCQForm(q);

    const transcript = renderTranscript(state);

    return `${top}${context}${picture}${form}${transcript}`;
  }

  function renderFeedback(state) {
    const q = state.questions[state.index];
    const total = state.questions.length;
    const n = state.index + 1;

    const ok = !!state.lastIsCorrect;
    const icon = ok ? "✅" : "❌";
    const nextLabel = n >= total ? "Finish" : "Next";

    const t = getType(q);

    let detailHtml = "";

    if (t === "listenfillintheblank") {
      const chosenText = state.lastBlank != null ? String(state.lastBlank) : "";
      const correctText =
        state.lastAcceptedAnswers && state.lastAcceptedAnswers.length
          ? state.lastAcceptedAnswers.slice(0, 4).join(" / ")
          : correctTextForBlank(q && q.answer);

      detailHtml = ok
        ? `<p style="margin:8px 0 0">Correct.</p>`
        : `<p style="margin:8px 0 0">Correct answer: <strong>${safeText(correctText || "(not set)")}</strong></p>
           <p style="margin:8px 0 0; opacity:.92">You typed: <strong>${safeText(chosenText || "(blank)")}</strong></p>`;
    } else {
      let correctIdx = Number(q && q.answer);
      if (t === "listentruefalse" && typeof q.answer !== "number") {
        const coerced = coerceTrueFalseAnswerToIndex(q.answer);
        if (Number.isFinite(Number(coerced))) correctIdx = Number(coerced);
      }

      const chosenIdx = Number(state.lastChoice);
      const correctText = optionAt(q, correctIdx);
      const chosenText = optionAt(q, chosenIdx);

      detailHtml = ok
        ? `<p style="margin:8px 0 0">Correct.</p>`
        : `<p style="margin:8px 0 0">Correct answer: <strong>${safeText(correctText || "(not set)")}</strong></p>
           <p style="margin:8px 0 0; opacity:.92">You chose: <strong>${safeText(chosenText || "(none)")}</strong></p>`;
    }

    const transcriptLine =
      q && q.say
        ? `<p style="margin:8px 0 0; opacity:.92"><strong>Transcript:</strong> ${safeTextWithBreaks(q.say)}</p>`
        : "";

    const explanation = q && q.explanation ? String(q.explanation).trim() : "";
    const expHtml = explanation
      ? `<p style="margin:8px 0 0; opacity:.92"><strong>Tip:</strong> ${safeText(explanation)}</p>`
      : "";

    const sayText = q && q.say ? String(q.say).trim() : "";
    const canPlay = supportsSpeech() && !!sayText;

    return `
      <div class="note" style="margin-top:12px" aria-live="polite">
        <strong>${icon} ${ok ? "Correct" : "Not quite"}</strong>
        ${detailHtml}
        ${transcriptLine}
        ${q && q.picture ? `<p style="margin:8px 0 0">Picture: <span style="font-size:22px">${safeText(q.picture)}</span></p>` : ""}
        ${expHtml}
      </div>

      <div class="actions" style="margin-top:12px; display:flex; gap:10px; flex-wrap:wrap">
        <button class="btn btn--primary" type="button" data-action="next">${nextLabel}</button>
        <button class="btn" type="button" data-action="play" ${canPlay ? "" : "disabled"}>🔊 Play again</button>
        <button class="btn" type="button" data-action="stop" ${supportsSpeech() ? "" : "disabled"}>⏹ Stop</button>
        <button class="btn" type="button" data-action="toggleTranscript" aria-pressed="${state.showTranscript ? "true" : "false"}">
          ${state.showTranscript ? "Hide transcript" : "Show transcript"}
        </button>
        <button class="btn" type="button" data-action="restart">Restart</button>
      </div>
    `;
  }

  function renderReview(state) {
    const rows = Array.isArray(state.review) ? state.review : [];
    if (!rows.length) {
      return `
        <div class="note" style="margin-top:12px; padding:10px 12px">
          <strong>Review</strong>
          <p style="margin:6px 0 0">No answers recorded.</p>
        </div>
      `;
    }

    const body = rows
      .map((r) => {
        const icon = r.isCorrect ? "✅" : "❌";
        const metaBits = [];

        if (r.context)
          metaBits.push(
            `<div style="margin-top:6px; opacity:.95"><strong>Context:</strong> ${safeTextWithBreaks(r.context)}</div>`
          );
        if (r.transcript)
          metaBits.push(
            `<div style="margin-top:6px; opacity:.95"><strong>Transcript:</strong> ${safeTextWithBreaks(
              r.transcript
            )}</div>`
          );
        if (r.picture)
          metaBits.push(
            `<div style="margin-top:6px; opacity:.95"><strong>Picture:</strong> <span style="font-size:18px">${safeText(
              r.picture
            )}</span></div>`
          );

        return `
          <tr>
            <td style="padding:10px 10px; border-top:1px solid var(--border); font-weight:800; white-space:nowrap">${safeText(
              r.number
            )}</td>
            <td style="padding:10px 10px; border-top:1px solid var(--border)">
              <div style="font-weight:900">${safeText(r.typeLabel)}</div>
              <div style="margin-top:6px">${safeTextWithBreaks(r.question || "")}</div>
              ${metaBits.join("")}
            </td>
            <td style="padding:10px 10px; border-top:1px solid var(--border); font-weight:800">${safeText(
              r.chosenText || ""
            )}</td>
            <td style="padding:10px 10px; border-top:1px solid var(--border); font-weight:800">${safeText(
              r.correctText || ""
            )}</td>
            <td style="padding:10px 10px; border-top:1px solid var(--border); font-weight:900; white-space:nowrap">${icon}</td>
          </tr>
        `;
      })
      .join("");

    return `
      <details style="margin-top:12px">
        <summary style="cursor:pointer; font-weight:900">Review answers</summary>
        <div style="margin-top:10px; border:1px solid var(--border); border-radius:16px; overflow:hidden; background: var(--surface2)">
          <table style="width:100%; border-collapse:collapse" aria-label="Answer review table">
            <caption style="text-align:left; padding:12px 12px 0; font-weight:900; color: var(--muted)">
              Per-question report
            </caption>
            <thead>
              <tr>
                <th scope="col" style="text-align:left; padding:10px 10px; border-top:1px solid var(--border); color: var(--muted)">#</th>
                <th scope="col" style="text-align:left; padding:10px 10px; border-top:1px solid var(--border); color: var(--muted)">Prompt</th>
                <th scope="col" style="text-align:left; padding:10px 10px; border-top:1px solid var(--border); color: var(--muted)">Your answer</th>
                <th scope="col" style="text-align:left; padding:10px 10px; border-top:1px solid var(--border); color: var(--muted)">Correct</th>
                <th scope="col" style="text-align:left; padding:10px 10px; border-top:1px solid var(--border); color: var(--muted)">Result</th>
              </tr>
            </thead>
            <tbody>
              ${body}
            </tbody>
          </table>
        </div>
      </details>
    `;
  }

  function renderSummary(state) {
    const total = state.questions.length;
    const correct = state.correctCount;
    const pct = total ? Math.round((correct / total) * 100) : 0;
    const canSave = !!(window.UEAH_SAVE_SCORE && typeof window.UEAH_SAVE_SCORE.save === "function");

    return `
      <div class="note" style="margin-top:0">
        <strong>Finished!</strong>
        <p style="margin:8px 0 0">Score: <strong>${correct}</strong> / ${total} (${pct}%)</p>
        <p style="margin:8px 0 0">Tip: Repeat the test to practice again. The questions are randomized each time.</p>
      </div>

      ${renderReview(state)}

      <div class="actions" style="margin-top:12px; display:flex; gap:10px; flex-wrap:wrap; align-items:center">
        <button class="btn btn--primary" type="button" data-action="restart">Play again</button>
        ${
          canSave
            ? `<button class="btn" type="button" data-action="save-score" aria-label="Save score to Profile">Save score to Profile</button>`
            : ""
        }
        ${
          state.savedMsg
            ? `<span style="font-weight:800; color: var(--muted)">${safeText(state.savedMsg)}</span>`
            : ""
        }
      </div>
    `;
  }

  // -----------------------------
  // Runner
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
        lastChoice: null,
        lastBlank: "",
        lastAcceptedAnswers: [],
        lastIsCorrect: false,
        lastError: "",
        showTranscript: false,
        autoSpokenIndex: -1,
        review: [], // per-question report rows
        savedMsg: ""
      };

      function currentQuestion() {
        return state.questions && state.questions.length ? state.questions[state.index] : null;
      }

      function speakCurrent() {
        const q = currentQuestion();
        if (!q) return false;
        const text = String(q.say || "").trim();
        if (!text) return false;
        return speak(text);
      }

      function resetRunState() {
        state.questions = [];
        state.index = 0;
        state.correctCount = 0;
        state.lastChoice = null;
        state.lastBlank = "";
        state.lastAcceptedAnswers = [];
        state.lastIsCorrect = false;
        state.lastError = "";
        state.showTranscript = false;
        state.autoSpokenIndex = -1;
        state.review = [];
        state.savedMsg = "";
      }

      function recordReviewRow(q, ok, chosenIdx, blankText, acceptedRaw) {
        const t = getType(q);

        let chosenText = "";
        let correctText = "";

        if (t === "listenfillintheblank") {
          chosenText = blankText != null && String(blankText).trim() ? String(blankText) : "(blank)";
          const raw = Array.isArray(acceptedRaw) && acceptedRaw.length ? acceptedRaw : getAcceptedBlankAnswers(q);
          correctText = raw.length ? raw.slice(0, 4).join(" / ") : "(not set)";
        } else {
          chosenText = optionAt(q, chosenIdx) || "(none)";

          let cidx = Number(q && q.answer);
          if (t === "listentruefalse" && typeof q.answer !== "number") {
            const coerced = coerceTrueFalseAnswerToIndex(q.answer);
            if (Number.isFinite(Number(coerced))) cidx = Number(coerced);
          }

          correctText = optionAt(q, cidx) || "(not set)";
        }

        state.review.push({
          number: state.index + 1,
          typeLabel: typeLabel(q),
          question: q && q.question ? String(q.question) : "",
          context: q && q.context ? String(q.context) : "",
          transcript: q && q.say ? String(q.say) : "",
          picture: q && q.picture ? String(q.picture) : "",
          chosenText,
          correctText,
          isCorrect: !!ok
        });
      }

      function paint() {
        if (state.status === "intro") stage.innerHTML = renderIntro();
        else if (state.status === "loading") stage.innerHTML = renderLoading();
        else if (state.status === "question") stage.innerHTML = renderQuestionScreen(state);
        else if (state.status === "feedback") stage.innerHTML = renderFeedback(state);
        else if (state.status === "summary") stage.innerHTML = renderSummary(state);
        else if (state.status === "error") stage.innerHTML = renderError(state.lastError);
        else stage.innerHTML = renderIntro();

        // Auto-play once per question (best effort).
        if (state.status === "question" && state.autoSpokenIndex !== state.index) {
          state.autoSpokenIndex = state.index;
          setTimeout(() => {
            try {
              speakCurrent();
            } catch (_) {}
          }, 0);
        }

        if (state.status === "question") {
          setTimeout(() => {
            try {
              const el = host.querySelector("input, button");
              if (el && typeof el.focus === "function") el.focus();
            } catch (_) {}
          }, 0);
        }
      }

      async function start() {
        stopSpeech();
        state.status = "loading";
        state.lastError = "";
        state.showTranscript = false;
        state.autoSpokenIndex = -1;
        state.review = [];
        state.savedMsg = "";
        paint();

        try {
          await ensureBankLoaded(ctx);

          const rawBank =
            window.UEAH_TEST_BANKS && Array.isArray(window.UEAH_TEST_BANKS[SLUG])
              ? window.UEAH_TEST_BANKS[SLUG]
              : [];

          if (!rawBank.length) throw new Error("Missing question bank.");

          const withIds = ensureIds(rawBank.filter(isPlainObject).map((q) => ({ ...q })));

          // Normalize TF questions (ensure options + numeric answer index)
          const normalized = withIds.map((q) => {
            const t = getType(q);
            if (t !== "listentruefalse") return q;

            const opts = Array.isArray(q.options) && q.options.length ? q.options.slice() : ["True", "False"];
            const idx = typeof q.answer === "number" ? q.answer : coerceTrueFalseAnswerToIndex(q.answer);

            return { ...q, options: opts, answer: Number.isFinite(Number(idx)) ? Number(idx) : 0 };
          });

          const prepared = normalized.map(cloneQuestionWithShuffledOptions);
          shuffleInPlace(prepared);

          const subset = prepared.slice(0, Math.min(MAX_QUESTIONS, prepared.length));

          state.questions = subset;
          state.index = 0;
          state.correctCount = 0;
          state.lastChoice = null;
          state.lastBlank = "";
          state.lastAcceptedAnswers = [];
          state.lastIsCorrect = false;
          state.lastError = "";
          state.showTranscript = false;
          state.autoSpokenIndex = -1;
          state.review = [];
          state.savedMsg = "";

          state.status = "question";
          paint();
        } catch (err) {
          state.status = "error";
          state.lastError = err && err.message ? err.message : "Could not load the test.";
          paint();
        }
      }

      function restart() {
        stopSpeech();
        state.status = "intro";
        resetRunState();
        paint();
      }

      function next() {
        stopSpeech();
        const total = state.questions.length;
        if (state.index + 1 >= total) {
          state.status = "summary";
          paint();
          return;
        }

        state.index += 1;
        state.lastChoice = null;
        state.lastBlank = "";
        state.lastAcceptedAnswers = [];
        state.lastIsCorrect = false;
        state.status = "question";
        paint();
      }

      function grade(choiceIndex, blankText) {
        const q = currentQuestion();
        if (!q) return;

        if (state.status !== "question") return;

        const t = getType(q);

        let ok = false;

        if (t === "listenfillintheblank") {
          const graded = gradeBlank(q, blankText);
          ok = graded.ok;

          state.lastBlank = blankText != null ? String(blankText) : "";
          state.lastAcceptedAnswers = graded.acceptedRaw || [];

          recordReviewRow(q, ok, null, state.lastBlank, state.lastAcceptedAnswers);
        } else {
          const chosen = Number(choiceIndex);
          if (!Number.isFinite(chosen)) return;

          state.lastChoice = chosen;

          let correctIdx = Number(q.answer);
          if (t === "listentruefalse" && typeof q.answer !== "number") {
            const coerced = coerceTrueFalseAnswerToIndex(q.answer);
            if (Number.isFinite(Number(coerced))) correctIdx = Number(coerced);
          }

          ok = chosen === Number(correctIdx);

          recordReviewRow(q, ok, chosen, null, null);
        }

        state.lastIsCorrect = ok;
        if (ok) state.correctCount += 1;

        state.status = "feedback";
        paint();
      }

      function saveScoreToProfile() {
        if (!window.UEAH_SAVE_SCORE || typeof window.UEAH_SAVE_SCORE.save !== "function") {
          state.savedMsg = "Save unavailable.";
          paint();
          return;
        }

        if (state.status !== "summary") {
          state.savedMsg = "Finish the test first.";
          paint();
          return;
        }

        const res = window.UEAH_SAVE_SCORE.save({
          slug: SLUG,
          ageGroup: "11-12",
          skill: "listening",
          questions: state.questions,
          review: state.review
        });

        state.savedMsg = res && res.ok ? "Saved to Profile." : "Could not save.";
        paint();
      }

      host.addEventListener("click", (ev) => {
        const btn = ev.target && ev.target.closest ? ev.target.closest("button") : null;
        if (!btn) return;

        const action = btn.getAttribute("data-action");
        if (action === "start") {
          ev.preventDefault();
          start();
        } else if (action === "restart") {
          ev.preventDefault();
          restart();
        } else if (action === "next") {
          ev.preventDefault();
          next();
        } else if (action === "retry") {
          ev.preventDefault();
          start();
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
        } else if (action === "save-score") {
          ev.preventDefault();
          saveScoreToProfile();
        }
      });

      host.addEventListener("submit", (ev) => {
        const form = ev.target;
        if (!form || form.getAttribute("data-form") !== "question") return;

        ev.preventDefault();

        const q = currentQuestion();
        const t = getType(q);

        if (t === "listenfillintheblank") {
          const input = form.querySelector('input[name="blank"]');
          const value = input ? input.value : "";
          grade(null, value);
          return;
        }

        const checked = form.querySelector('input[name="choice"]:checked');
        const val = checked ? checked.value : null;
        grade(val, null);
      });

      // Cancel speech when leaving the page (best effort)
      window.addEventListener(
        "popstate",
        () => {
          stopSpeech();
        },
        { passive: true }
      );

      paint();
    }
  });
})();
