/* assets/js/tests/age/13-18-reading.js
   Runner: Ages 13–18 • Reading (IELTS-inspired)

   Loads the question bank (assets/data/tests-13-18-reading.js) and runs a
   timed, one-question-at-a-time reading test.

   Structure (IELTS-inspired, easier):
   - Up to 3 passages (p1, p2, p3)
   - Up to MAX_PER_PASSAGE questions per passage
   - Mixed question types

   Supported question types:
   - multipleChoice
   - trueFalse
   - fillInTheBlank

   Randomization:
   - Shuffles question order within each passage on start
   - Randomizes passage block order (so the test can start on p2/p3)
   - Shuffles options within MCQ questions when explicit options exist
   - Uses crypto.getRandomValues when available (fallback to Math.random)

   Updates (this file):
   - Ensures every question has a stable UNIQUE id (prevents broken label/inputs and review mapping)
   - More resilient bank loader (handles existing script + validates after a tick)
   - Better selection: caps per passage AND backfills from leftovers so tests are not tiny if a passage is short
   - Adds Skip button (records in review; no points)
   - Stronger grading:
     * trueFalse supports boolean/number/string answers
     * fillInTheBlank supports acceptedAnswers + array answers
     * normalization tuned for numbers/times/spacing
   - Summary includes per-passage breakdown + expandable review table
   - Adds “Save score to Profile” on final summary (uses window.UEAH_SAVE_SCORE if available)
   - Builds a normalized save payload input (commonly p) that includes:
     • questions: p.questions
     • review: p.review
*/

(function () {
  "use strict";

  const SLUG = "age-13-18-reading";
  const BANK_SRC = "assets/data/tests-13-18-reading.js";

  const AGE_GROUP = "13-18";
  const SKILL = "reading";

  // Easier than IELTS but similar structure.
  const TIME_LIMIT_SEC = 45 * 60;
  const MAX_PER_PASSAGE = 10; // increased (was 8)
  const TARGET_TOTAL = 3 * MAX_PER_PASSAGE; // now 30 (was 24)

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

  function randomInt(maxExclusive) {
    const max = Math.floor(Number(maxExclusive));
    if (!Number.isFinite(max) || max <= 0) return 0;

    try {
      if (typeof crypto !== "undefined" && crypto && typeof crypto.getRandomValues === "function") {
        // Rejection sampling to avoid modulo bias
        const range = 0x100000000; // 2^32
        const limit = range - (range % max);
        const buf = new Uint32Array(1);
        let x = 0;

        do {
          crypto.getRandomValues(buf);
          x = buf[0] >>> 0;
        } while (x >= limit);

        return x % max;
      }
    } catch (_) {}

    return Math.floor(Math.random() * max);
  }

  function shuffleInPlace(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = randomInt(i + 1);
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
    // Good for numbers/times: "2:30" vs "2 30" => "230"
    return String(v == null ? "" : v)
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "");
  }

  function formatTime(sec) {
    const s = Math.max(0, Math.floor(sec));
    const m = Math.floor(s / 60);
    const r = s % 60;
    return `${String(m).padStart(2, "0")}:${String(r).padStart(2, "0")}`;
  }

  function getType(q) {
    return String((q && q.type) || "multipleChoice").trim();
  }

  function passageIdOf(q) {
    const pid = String((q && q.passageId) || "").toLowerCase();
    if (pid === "p2" || pid === "part2" || pid === "2") return "p2";
    if (pid === "p3" || pid === "part3" || pid === "3") return "p3";
    return "p1";
  }

  function passageLabel(passageId) {
    const id = String(passageId || "").toLowerCase();
    if (id === "p1") return "Passage 1";
    if (id === "p2") return "Passage 2";
    if (id === "p3") return "Passage 3";
    return "Passage";
  }

  function typeLabel(q) {
    const t = String(getType(q)).toLowerCase();
    if (t === "fillintheblank") return "Fill in the blank";
    if (t === "truefalse") return "True / False";
    return "Multiple choice";
  }

  function getOptionsForQuestion(q) {
    const t = String(getType(q)).toLowerCase();
    if (Array.isArray(q && q.options) && q.options.length) return q.options;
    if (t === "truefalse") return ["True", "False"];
    return [];
  }

  function optionAt(q, idx) {
    const opts = getOptionsForQuestion(q);
    const n = Number(idx);
    if (!Number.isFinite(n)) return "";
    return opts[n] == null ? "" : String(opts[n]);
  }

  function deriveTrueFalseIndex(answer) {
    // Returns 0 for True, 1 for False, or null if unknown.
    if (typeof answer === "number" && Number.isFinite(answer)) {
      if (answer === 0 || answer === 1) return answer;
    }
    if (typeof answer === "boolean") return answer ? 0 : 1;

    const s = normalizeAnswerText(answer);
    if (!s) return null;

    if (s === "true" || s === "t" || s === "yes" || s === "y") return 0;
    if (s === "false" || s === "f" || s === "no" || s === "n") return 1;
    return null;
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

  function collectAcceptedBlankAnswers(q) {
    const accepted = [];
    if (q && Array.isArray(q.acceptedAnswers)) accepted.push(...q.acceptedAnswers);
    const ans = q && q.answer;
    if (Array.isArray(ans)) accepted.push(...ans);
    else if (ans != null) accepted.push(ans);

    // de-dup by normalized
    const uniq = [];
    const seen = new Set();
    accepted.forEach((a) => {
      const s = String(a == null ? "" : a);
      const k = normalizeAnswerText(s);
      if (!k) return;
      if (seen.has(k)) return;
      seen.add(k);
      uniq.push(s);
    });

    return uniq;
  }

  function correctTextForBlank(q) {
    const list = collectAcceptedBlankAnswers(q);
    return list.length ? list.join(" / ") : "";
  }

  function cloneQuestionWithShuffledOptions(q) {
    if (!isPlainObject(q)) return q;

    const t = String(getType(q)).toLowerCase();

    // Only shuffle explicit MCQ options (not generated True/False).
    if (t === "fillintheblank" || t === "truefalse") return { ...q };
    if (!Array.isArray(q.options) || !q.options.length) return { ...q };
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
  // Selection
  // -----------------------------

  function buildReadingSet(bankRaw) {
    const base = (Array.isArray(bankRaw) ? bankRaw : []).filter(isPlainObject).map((q) => ({
      ...q,
      passageId: passageIdOf(q)
    }));

    const cleaned = ensureUniqueIds(base);
    if (!cleaned.length) return [];

    const prepared = cleaned.map(cloneQuestionWithShuffledOptions);

    const byPassage = { p1: [], p2: [], p3: [] };
    prepared.forEach((q) => {
      byPassage[passageIdOf(q)].push(q);
    });

    const chosen = [];
    const used = new Set();
    const counts = { p1: 0, p2: 0, p3: 0 };

    // Primary pick: cap per passage
    ["p1", "p2", "p3"].forEach((pid) => {
      const arr = (byPassage[pid] || []).slice();
      shuffleInPlace(arr);

      for (let i = 0; i < arr.length && chosen.length < TARGET_TOTAL; i++) {
        if (counts[pid] >= MAX_PER_PASSAGE) break;

        const q = arr[i];
        const id = q && q.id != null ? String(q.id) : "";
        if (!id || used.has(id)) continue;

        used.add(id);
        chosen.push(q);
        counts[pid] += 1;
      }
    });

    // Backfill from leftovers across all passages
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

    // Keep questions grouped by passage, but randomize passage block order each run
    // so the test clearly feels different every time.
    const passageOrder = ["p1", "p2", "p3"].filter((pid) => chosen.some((q) => passageIdOf(q) === pid));
    shuffleInPlace(passageOrder);

    const ordered = [];
    passageOrder.forEach((pid) => {
      ordered.push(...chosen.filter((q) => passageIdOf(q) === pid));
    });

    return ordered.length ? ordered : chosen;
  }

  // -----------------------------
  // UI renderers
  // -----------------------------

  function renderIntro() {
    return `
      <div class="note" style="margin-top:0">
        <strong>Ages 13–18 Reading</strong>
        <p style="margin:8px 0 0">IELTS-inspired reading practice: up to 3 passages with mixed question types.</p>
        <p style="margin:8px 0 0; opacity:.92">Time limit: <strong>45 minutes</strong>. Tip: skim for the main idea, then scan for keywords.</p>
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
    const pid = passageIdOf(q);

    return `
      <div style="display:flex; align-items:center; justify-content:space-between; gap:10px; flex-wrap:wrap">
        <div style="display:flex; align-items:center; gap:10px; flex-wrap:wrap">
          <div style="font-weight:800; color: var(--muted)">${safeText(passageLabel(pid))} • Question ${n} of ${total}</div>
          <div class="chip" aria-label="Time remaining" style="font-weight:900">${formatTime(state.timeRemaining)}</div>
        </div>
        <div style="display:flex; gap:8px; flex-wrap:wrap">
          <button class="btn" type="button" data-action="skip" aria-label="Skip this question">Skip</button>
          <button class="btn" type="button" data-action="restart" aria-label="Restart the test">Restart</button>
        </div>
      </div>
    `;
  }

  function renderPassage(q) {
    const p = q && q.passage ? String(q.passage) : "";
    if (!p.trim()) return "";
    return `
      <div class="note" style="margin:12px 0 0; padding:12px 14px">
        <strong>Read</strong>
        <p style="margin:8px 0 0">${safeTextWithBreaks(p)}</p>
      </div>
    `;
  }

  function renderMCQForm(q) {
    const prompt = safeTextWithBreaks((q && q.question) || "Question");
    const options = getOptionsForQuestion(q);

    const optionsHtml = options
      .map((opt, i) => {
        const id = `opt-${SLUG}-${safeDomId(q && q.id ? q.id : "q")}-${i}`;
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
            ${
              optionsHtml ||
              `<div class="note" style="margin:0; padding:10px 12px"><strong>No options provided</strong></div>`
            }
          </div>

          <div class="actions" style="margin-top:12px">
            <button class="btn btn--primary" type="submit">Submit</button>
          </div>
        </fieldset>
      </form>
    `;
  }

  function renderFillBlankForm(q) {
    const prompt = safeTextWithBreaks((q && q.question) || "Fill in the blank");
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
            <button class="btn btn--primary" type="submit">Submit</button>
          </div>
        </fieldset>
      </form>
    `;
  }

  function renderQuestionScreen(state) {
    const q = state.questions[state.index];
    if (!q) return renderError("Missing question.");

    const type = String(getType(q)).toLowerCase();
    const formHtml = type === "fillintheblank" ? renderFillBlankForm(q) : renderMCQForm(q);

    return `
      ${renderTopBar(state)}
      ${renderPassage(q)}
      ${formHtml}
    `;
  }

  function renderFeedback(state) {
    const q = state.questions[state.index];
    if (!q) return renderError("Missing question.");

    const ok = !!state.lastIsCorrect;
    const icon = state.lastWasSkipped ? "⏭️" : ok ? "✅" : "❌";

    const type = String(getType(q)).toLowerCase();
    const pid = passageIdOf(q);

    let correctText = "";
    let chosenText = "";

    if (type === "fillintheblank") {
      correctText = correctTextForBlank(q) || "(not set)";
      chosenText = state.lastBlank != null && String(state.lastBlank).trim() ? String(state.lastBlank) : "(blank)";
    } else {
      const correctIdx =
        type === "truefalse"
          ? deriveTrueFalseIndex(q.answer)
          : typeof q.answer === "number" && Number.isFinite(q.answer)
          ? q.answer
          : null;

      correctText = optionAt(q, correctIdx) || "(not set)";
      chosenText = optionAt(q, state.lastChoice) || "(none)";
    }

    const expl = q && q.explanation ? String(q.explanation).trim() : "";

    const nextLabel = state.index + 1 >= state.questions.length ? "Finish" : "Next";

    return `
      ${renderTopBar(state)}

      <div class="note" style="margin-top:12px" aria-live="polite">
        <strong>${icon} ${state.lastWasSkipped ? "Skipped" : ok ? "Correct" : "Not quite"}</strong>
        <p style="margin:8px 0 0; opacity:.92">${safeText(passageLabel(pid))} • ${safeText(typeLabel(q))}</p>
        <p style="margin:10px 0 0"><span style="font-weight:900">Correct:</span> ${safeText(correctText)}</p>
        ${
          state.lastWasSkipped
            ? `<p style="margin:8px 0 0; opacity:.92">No points earned for this question.</p>`
            : ok
            ? ""
            : `<p style="margin:8px 0 0; opacity:.92"><span style="font-weight:900">You answered:</span> ${safeText(
                chosenText
              )}</p>`
        }
        ${expl ? `<p style="margin:10px 0 0; opacity:.95"><strong>Explanation:</strong> ${safeText(expl)}</p>` : ""}
      </div>

      <div class="actions" style="margin-top:12px">
        <button class="btn btn--primary" type="button" data-action="next">${nextLabel}</button>
      </div>
    `;
  }

  function renderReview(state) {
    const rows = Array.isArray(state.review) ? state.review : [];
    if (!rows.length) return "";

    const body = rows
      .map((r) => {
        const icon = r.skipped ? "⏭️" : r.isCorrect ? "✅" : "❌";
        return `
          <tr>
            <td style="padding:10px 10px; border-top:1px solid var(--border); font-weight:900; white-space:nowrap">${safeText(
              r.number
            )}</td>
            <td style="padding:10px 10px; border-top:1px solid var(--border); font-weight:800; white-space:nowrap">${safeText(
              r.passage
            )}</td>
            <td style="padding:10px 10px; border-top:1px solid var(--border)">
              <div style="font-weight:900">${safeText(r.typeLabel)}</div>
              <div style="margin-top:6px">${safeText(r.question || "")}</div>
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
            <thead>
              <tr>
                <th scope="col" style="text-align:left; padding:10px 10px; border-top:1px solid var(--border); color: var(--muted)">#</th>
                <th scope="col" style="text-align:left; padding:10px 10px; border-top:1px solid var(--border); color: var(--muted)">Passage</th>
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
    const score = state.correctCount;
    const pct = total ? Math.round((score / total) * 100) : 0;

    const per = { p1: { c: 0, t: 0 }, p2: { c: 0, t: 0 }, p3: { c: 0, t: 0 } };
    (Array.isArray(state.review) ? state.review : []).forEach((r) => {
      const pid = String(r.passageId || "p1").toLowerCase();
      if (!per[pid]) per[pid] = { c: 0, t: 0 };
      per[pid].t += 1;
      if (!r.skipped && r.isCorrect) per[pid].c += 1;
    });

    const breakdown = ["p1", "p2", "p3"]
      .map((pid) => {
        const x = per[pid] || { c: 0, t: 0 };
        return `<div style="margin-top:6px; color:var(--muted)"><strong>${safeText(
          passageLabel(pid)
        )}:</strong> ${x.c} / ${x.t}</div>`;
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
        ${breakdown}
      </div>

      ${renderReview(state)}

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
        timeRemaining: TIME_LIMIT_SEC,
        timerId: null,

        lastIsCorrect: false,
        lastWasSkipped: false,
        lastChoice: null,
        lastBlank: "",
        lastError: "",

        isSaving: false,
        savedMsg: "",

        // review rows (UI)
        review: []
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
            state.status = "summary";
            paint();
            return;
          }

          const chip = host.querySelector('[aria-label="Time remaining"]');
          if (chip) chip.textContent = formatTime(state.timeRemaining);
        }, 1000);
      }

      function recordReviewRow(q, ok, skipped, chosenIdx, blankText) {
        const t = String(getType(q)).toLowerCase();
        const pid = passageIdOf(q);

        let chosenText = "";
        let correctText = "";

        if (t === "fillintheblank") {
          chosenText = blankText != null && String(blankText).trim() ? String(blankText) : "(blank)";
          correctText = correctTextForBlank(q) || "(not set)";
        } else {
          const correctIdx =
            t === "truefalse"
              ? deriveTrueFalseIndex(q.answer)
              : typeof q.answer === "number" && Number.isFinite(q.answer)
              ? q.answer
              : null;

          chosenText = optionAt(q, chosenIdx) || "(none)";
          correctText = optionAt(q, correctIdx) || "(not set)";
        }

        state.review.push({
          number: state.index + 1,
          passageId: pid,
          passage: passageLabel(pid),
          typeLabel: typeLabel(q),
          question: q && q.question ? String(q.question) : "",
          chosenText: skipped ? "Skipped" : chosenText,
          correctText,
          isCorrect: !!ok,
          skipped: !!skipped
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
        stopTimer();

        state.status = "loading";
        state.lastError = "";
        state.review = [];
        state.lastChoice = null;
        state.lastBlank = "";
        state.lastIsCorrect = false;
        state.lastWasSkipped = false;
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

          const chosen = buildReadingSet(bank);
          if (!chosen.length) throw new Error("No questions were selected from the bank.");

          state.questions = chosen;
          state.index = 0;
          state.correctCount = 0;
          state.timeRemaining = TIME_LIMIT_SEC;
          state.lastIsCorrect = false;
          state.lastWasSkipped = false;
          state.lastChoice = null;
          state.lastBlank = "";
          state.lastError = "";
          state.review = [];
          state.isSaving = false;
          state.savedMsg = "";

          state.status = "question";
          paint();
          startTimer();
        } catch (err) {
          stopTimer();
          state.status = "error";
          state.lastError = err && err.message ? err.message : "Could not load the test.";
          paint();
        }
      }

      function restart() {
        stopTimer();

        state.status = "intro";
        state.questions = [];
        state.index = 0;
        state.correctCount = 0;
        state.timeRemaining = TIME_LIMIT_SEC;
        state.lastIsCorrect = false;
        state.lastWasSkipped = false;
        state.lastChoice = null;
        state.lastBlank = "";
        state.lastError = "";
        state.review = [];
        state.isSaving = false;
        state.savedMsg = "";

        paint();
      }

      function next() {
        if (state.index + 1 >= state.questions.length) {
          stopTimer();
          state.status = "summary";
          paint();
          return;
        }

        state.index += 1;
        state.lastIsCorrect = false;
        state.lastWasSkipped = false;
        state.lastChoice = null;
        state.lastBlank = "";
        state.status = "question";
        paint();
      }

      function grade(choiceIndex, blankText, isSkip) {
        const q = state.questions[state.index];
        if (!q) return;

        // prevent double-answering
        if (state.status !== "question") return;

        const t = String(getType(q)).toLowerCase();
        const skipped = !!isSkip;
        let ok = false;

        if (t === "fillintheblank") {
          const user = normalizeAnswerText(blankText);
          const acceptedNorm = collectAcceptedBlankAnswers(q).map((x) => normalizeAnswerText(x));
          ok = !skipped && !!user && acceptedNorm.some((a) => a === user);

          state.lastBlank = blankText != null ? String(blankText) : "";
          state.lastChoice = null;

          recordReviewRow(q, ok, skipped, null, state.lastBlank);
        } else {
          const chosen = Number(choiceIndex);
          const hasChoice = Number.isFinite(chosen);

          state.lastChoice = hasChoice ? chosen : null;
          state.lastBlank = "";

          if (!skipped && hasChoice) {
            if (t === "truefalse") {
              const correctIdx = deriveTrueFalseIndex(q.answer);
              ok = correctIdx != null ? chosen === correctIdx : chosen === Number(q.answer);
            } else if (typeof q.answer === "number" && Number.isFinite(q.answer)) {
              ok = chosen === q.answer;
            } else {
              const chosenText = normalizeAnswerText(optionAt(q, chosen));
              const ansText = normalizeAnswerText(q.answer);
              ok = !!chosenText && !!ansText && chosenText === ansText;
            }
          }

          recordReviewRow(q, ok, skipped, hasChoice ? chosen : null, null);
        }

        state.lastWasSkipped = skipped;
        state.lastIsCorrect = ok;

        if (!skipped && ok) state.correctCount += 1;

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

        // Align review to the questions array order (one entry per question).
        // Scorers only need {isCorrect}. Skips are treated as incorrect.
        const review = qs.map((_, idx) => {
          const r = state.review && state.review[idx] ? state.review[idx] : null;
          return { isCorrect: !!(r && !r.skipped && r.isCorrect) };
        });

        const rawCorrect = Number(state.correctCount || 0);
        const totalQuestions = qs.length;
        const percent = totalQuestions ? Math.round((rawCorrect / totalQuestions) * 100) : 0;

        // Normalize question points for scoring: 1 point each.
        const questions = qs.map((q) => (isPlainObject(q) ? { ...q, points: 1 } : q));

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

      // Initial paint
      paint();

      // Event delegation
      host.addEventListener("click", (e) => {
        const btn = e.target && e.target.closest ? e.target.closest("[data-action]") : null;
        if (!btn) return;

        const action = btn.getAttribute("data-action");
        if (action === "start" || action === "retry") {
          e.preventDefault();
          start();
        } else if (action === "restart") {
          e.preventDefault();
          restart();
        } else if (action === "next") {
          e.preventDefault();
          next();
        } else if (action === "skip") {
          e.preventDefault();
          grade(null, "", true);
        } else if (action === "save") {
          e.preventDefault();
          if (state.status === "summary") saveScoreToProfile();
        }
      });

      host.addEventListener("submit", (e) => {
        const form = e.target;
        if (!form || !form.matches || !form.matches('[data-form="question"]')) return;

        e.preventDefault();

        const q = state.questions[state.index];
        if (!q) return;

        const t = String(getType(q)).toLowerCase();

        if (t === "fillintheblank") {
          const input = form.querySelector('input[name="blank"]');
          grade(null, input ? input.value : "", false);
          return;
        }

        const checked = form.querySelector('input[name="choice"]:checked');
        if (!checked) return;

        grade(Number(checked.value), "", false);
      });

      // Best-effort cleanup on navigation
      if (!host.__ueahNavHooked) {
        host.__ueahNavHooked = true;
        window.addEventListener(
          "popstate",
          () => {
            stopTimer();
          },
          { passive: true }
        );
        window.addEventListener(
          "pagehide",
          () => {
            stopTimer();
          },
          { passive: true }
        );
      }
    }
  });
})();
