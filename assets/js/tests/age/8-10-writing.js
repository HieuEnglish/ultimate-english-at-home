/* assets/js/tests/age/8-10-writing.js
   Runner: Ages 8–10 • Writing

   Interactive writing practice for learners aged 8–10.
   Loads the question bank (assets/data/tests-8-10-writing.js) and presents:
   - Objective questions (MCQ / True-False / Fill-in) that are auto-scored
   - Short writing prompts that are auto-scored using simple checklist rules

   Auto-grading:
   - Objective: correct/incorrect → points (default 1, or q.points)
   - Writing prompts: points earned by meeting rubric checklist items
     (minWords, minSentences, mustIncludeAny groups, mustIncludeAll words).
     If no rubric checks exist, any non-empty response earns 1 point.

   Randomization:
   - Shuffles question order each run
   - Shuffles options within MCQ/TF questions

   Limits:
   - Up to 12 objective + up to 4 prompts (max 16 total)

   Optional:
   - If window.UEAH_SAVE_SCORE.save exists, summary shows “Save score to Profile”.
*/

(function () {
  "use strict";

  const SLUG = "age-8-10-writing";
  const BANK_SRC = "assets/data/tests-8-10-writing.js";

  const MAX_TOTAL = 16;
  const MAX_OBJECTIVE = 12;
  const MAX_PROMPTS = 4;

  const store = window.UEAH_TESTS_STORE;
  if (!store || typeof store.registerRunner !== "function") {
    console.warn("[UEAH] tests store not found; runner not registered:", SLUG);
    return;
  }

  // ---------------------------------------------------------------------------
  // Helpers
  // ---------------------------------------------------------------------------

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
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function safeTextWithBreaks(v) {
    return safeText(v).replace(/\n/g, "<br>");
  }

  function normalizeType(t) {
    return String(t || "")
      .trim()
      .toLowerCase()
      .replace(/[^a-z]/g, "");
  }

  function isPromptType(t) {
    return normalizeType(t) === "prompt";
  }

  function normalizeAnswerText(v) {
    // Trim, lowercase, collapse spaces, strip common punctuation.
    return String(v == null ? "" : v)
      .trim()
      .toLowerCase()
      .replace(/[\u00A0]/g, " ")
      .replace(/[.,!?;:"(){}\[\]]/g, "")
      .replace(/\s+/g, " ")
      .trim();
  }

  function wordCount(text) {
    const t = String(text || "").trim();
    if (!t) return 0;
    return t.split(/\s+/).filter(Boolean).length;
  }

  function sentenceCount(text) {
    const t = String(text || "").trim();
    if (!t) return 0;
    // Count segments separated by punctuation or newlines.
    const parts = t.split(/[\n\r]+|[.!?]+/g).map((s) => s.trim());
    return parts.filter(Boolean).length;
  }

  function pointsPossible(q) {
    const p = Number(q && q.points);
    if (Number.isFinite(p)) return Math.max(0, p);
    return 1;
  }

  function ensureIds(qs) {
    const arr = Array.isArray(qs) ? qs : [];
    return arr.map((q, idx) => {
      if (!isPlainObject(q)) return q;
      const id = q.id != null && String(q.id).trim() ? String(q.id).trim() : `${SLUG}::idx-${idx}`;
      return { ...q, id };
    });
  }

  function coerceTrueFalseAnswerToIndex(ans) {
    // True => 0, False => 1 (matches default options ["True","False"])
    if (typeof ans === "boolean") return ans ? 0 : 1;

    const s = String(ans == null ? "" : ans).trim().toLowerCase();
    if (s === "true" || s === "t" || s === "yes" || s === "y") return 0;
    if (s === "false" || s === "f" || s === "no" || s === "n") return 1;

    const n = Number(ans);
    if (Number.isFinite(n)) return n;

    return null;
  }

  function cloneQuestionWithShuffledOptions(q) {
    if (!isPlainObject(q)) return q;

    const t = normalizeType(q.type || "multipleChoice");

    // Only shuffle if we have options and a numeric index answer.
    if (!Array.isArray(q.options) || !q.options.length) return { ...q };

    let answerIdx = null;

    if (typeof q.answer === "number") answerIdx = q.answer;
    else if (t === "truefalse") answerIdx = coerceTrueFalseAnswerToIndex(q.answer);

    if (!Number.isFinite(Number(answerIdx))) return { ...q };

    const pairs = q.options.map((text, idx) => ({ text, idx }));
    shuffleInPlace(pairs);

    const newOptions = pairs.map((p) => p.text);
    const newAnswer = pairs.findIndex((p) => p.idx === Number(answerIdx));

    return { ...q, options: newOptions, answer: newAnswer };
  }

  // Fill-in accepted answers:
  // - q.answer: string or array
  // - q.answers, q.acceptedAnswers, q.acceptAnyOf: arrays
  function getFillBlankAcceptedAnswers(q) {
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

  function gradeFillBlank(q, userText) {
    const userNorm = normalizeAnswerText(userText);
    const acceptedRaw = getFillBlankAcceptedAnswers(q);
    const acceptedNorm = acceptedRaw.map(normalizeAnswerText).filter(Boolean);

    const ok = !!userNorm && acceptedNorm.includes(userNorm);
    return { ok, acceptedRaw };
  }

  function promptPointsPossible(q) {
    const rubric = q && isPlainObject(q.rubric) ? q.rubric : null;
    let n = 0;

    if (rubric && Number.isFinite(Number(rubric.minWords))) n += 1;
    if (rubric && Number.isFinite(Number(rubric.minSentences))) n += 1;

    // mustIncludeAny: array of groups (each group is an array of words)
    if (rubric && Array.isArray(rubric.mustIncludeAny)) {
      rubric.mustIncludeAny.forEach((group) => {
        if (Array.isArray(group) && group.length) n += 1;
      });
    }

    // mustIncludeAll: array of words
    if (rubric && Array.isArray(rubric.mustIncludeAll) && rubric.mustIncludeAll.length) n += 1;

    return n > 0 ? n : 1;
  }

  function evaluatePrompt(text, rubric) {
    const checks = [];
    if (!rubric || !isPlainObject(rubric)) return checks;

    const raw = String(text || "");
    const lower = raw.toLowerCase();
    const wc = wordCount(raw);
    const sc = sentenceCount(raw);

    if (Number.isFinite(Number(rubric.minWords))) {
      const m = Number(rubric.minWords);
      checks.push({ id: "minWords", label: `${m}+ words`, ok: wc >= m });
    }

    if (Number.isFinite(Number(rubric.minSentences))) {
      const m = Number(rubric.minSentences);
      checks.push({ id: "minSentences", label: `${m}+ sentences`, ok: sc >= m });
    }

    if (Array.isArray(rubric.mustIncludeAny)) {
      rubric.mustIncludeAny.forEach((group, idx) => {
        if (!Array.isArray(group) || !group.length) return;
        const ok = group.some((w) => lower.includes(String(w).toLowerCase()));
        checks.push({
          id: `includesAny-${idx}`,
          label: `Includes ${group.join(" / ")}`,
          ok
        });
      });
    }

    if (Array.isArray(rubric.mustIncludeAll) && rubric.mustIncludeAll.length) {
      const words = rubric.mustIncludeAll.map((w) => String(w || "").trim()).filter(Boolean);
      if (words.length) {
        const ok = words.every((w) => lower.includes(w.toLowerCase()));
        checks.push({
          id: "includesAll",
          label: `Includes all: ${words.join(", ")}`,
          ok
        });
      }
    }

    return checks;
  }

  function nowIso() {
    return new Date().toISOString();
  }

  // ---------------------------------------------------------------------------
  // Bank loader (no build step)
  // ---------------------------------------------------------------------------

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

  // ---------------------------------------------------------------------------
  // UI renderers
  // ---------------------------------------------------------------------------

  function renderIntro() {
    return `
      <div class="note" style="margin-top:0">
        <strong>Ages 8–10 Writing</strong>
        <p style="margin:8px 0 0">Practice punctuation, grammar, spelling, and short writing tasks.</p>
        <p style="margin:8px 0 0; opacity:.92">
          Writing prompts are auto-scored with a checklist (words, sentences, and key words).
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
    return `
      <div style="display:flex; align-items:center; justify-content:space-between; gap:10px; flex-wrap:wrap">
        <div style="font-weight:800; color: var(--muted)">Question ${n} of ${total}</div>
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
    const prompt = safeTextWithBreaks(q.question || "Question");
    const t = normalizeType(q.type || "multipleChoice");

    let options = Array.isArray(q.options) ? q.options.slice() : [];
    if (t === "truefalse" && (!options || !options.length)) options = ["True", "False"];

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
      <form data-form="question" data-qtype="multipleChoice" style="margin-top:12px">
        <fieldset style="border:1px solid var(--border); border-radius:16px; padding:14px; background: var(--surface2)">
          <legend style="padding:0 8px; font-weight:900">${prompt}</legend>
          <div role="radiogroup" aria-label="Answer choices" style="display:grid; gap:10px; margin-top:12px">
            ${optionsHtml}
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
      <form data-form="question" data-qtype="fillInTheBlank" style="margin-top:12px">
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
              spellcheck="true"
              maxlength="48"
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

  function renderPromptChecklist(q) {
    const rubric = q && isPlainObject(q.rubric) ? q.rubric : null;
    const items = [];

    if (rubric && Number.isFinite(Number(rubric.minWords))) items.push(`${Number(rubric.minWords)}+ words`);
    if (rubric && Number.isFinite(Number(rubric.minSentences))) items.push(`${Number(rubric.minSentences)}+ sentences`);

    if (rubric && Array.isArray(rubric.mustIncludeAny)) {
      rubric.mustIncludeAny.forEach((group) => {
        if (!Array.isArray(group) || !group.length) return;
        items.push(`Include ${group.join(" / ")}`);
      });
    }

    if (rubric && Array.isArray(rubric.mustIncludeAll) && rubric.mustIncludeAll.length) {
      items.push(`Include all: ${rubric.mustIncludeAll.join(", ")}`);
    }

    if (!items.length) {
      return `
        <div class="note" style="margin:12px 0 0; padding:12px 14px">
          <strong>Checklist</strong>
          <p style="margin:8px 0 0; opacity:.92">Write something clear. Any non-empty answer earns 1 point.</p>
        </div>
      `;
    }

    return `
      <div class="note" style="margin:12px 0 0; padding:12px 14px">
        <strong>Checklist</strong>
        <ul style="margin:10px 0 0; padding-left:18px">
          ${items.map((t) => `<li style="margin:4px 0">${safeText(t)}</li>`).join("")}
        </ul>
      </div>
    `;
  }

  function renderPromptForm(q) {
    const prompt = safeTextWithBreaks(q.question || "Write");
    const model = q && q.model ? String(q.model) : "";

    const modelHtml = model.trim()
      ? `
        <div class="note" style="margin:12px 0 0; padding:10px 12px">
          <strong>Example:</strong>
          <span style="font-size:18px; font-weight:900"> ${safeText(model)}</span>
        </div>
      `
      : "";

    return `
      ${modelHtml}
      ${renderPromptChecklist(q)}
      <form data-form="question" data-qtype="prompt" style="margin-top:12px">
        <fieldset style="border:1px solid var(--border); border-radius:16px; padding:14px; background: var(--surface2)">
          <legend style="padding:0 8px; font-weight:900">${prompt}</legend>

          <div style="display:flex; align-items:center; justify-content:space-between; gap:10px; flex-wrap:wrap; margin-top:10px">
            <div style="color:var(--muted); font-weight:800">
              Words: <span data-word-count>0</span> • Sentences: <span data-sentence-count>0</span>
            </div>
            <div style="color:var(--muted)">Short is OK.</div>
          </div>

          <label style="display:block; margin-top:12px">
            <span class="sr-only">Your writing</span>
            <textarea
              name="response"
              rows="6"
              maxlength="600"
              style="width:100%; padding:12px 12px; border:1px solid var(--border); border-radius:14px; background: var(--surface); resize:vertical"
              placeholder="Type here"
              required
            ></textarea>
          </label>

          <div class="actions" style="margin-top:12px">
            <button class="btn btn--primary" type="submit">Done</button>
          </div>
        </fieldset>
      </form>
    `;
  }

  function renderQuestionScreen(state) {
    const q = state.questions[state.index];
    const top = renderTopBar(state);

    const t = normalizeType(q.type || "multipleChoice");

    let body = "";
    if (t === "prompt") body = renderPromptForm(q);
    else if (t === "fillintheblank") body = renderFillBlankForm(q);
    else body = renderMCQForm(q);

    return `${top}${renderPassage(q)}${body}`;
  }

  function renderFeedback(state) {
    const q = state.questions[state.index];
    const total = state.questions.length;
    const n = state.index + 1;
    const t = normalizeType(q.type || "multipleChoice");
    const nextLabel = n >= total ? "Finish" : "Next";

    if (state.lastWasSkipped) {
      return `
        <div style="display:flex; align-items:center; justify-content:space-between; gap:10px; flex-wrap:wrap">
          <div style="font-weight:800; color: var(--muted)">Question ${n} of ${total}</div>
          <button class="btn" type="button" data-action="restart" aria-label="Restart the test">Restart</button>
        </div>

        <div class="note" style="margin-top:12px" aria-live="polite">
          <strong>⏭️ Skipped</strong>
          <p style="margin:8px 0 0">0 points for this question.</p>
        </div>

        <div class="actions" style="margin-top:12px">
          <button class="btn btn--primary" type="button" data-action="next">${nextLabel}</button>
        </div>
      `;
    }

    if (t === "prompt") {
      const userText = state.lastResponse != null ? String(state.lastResponse) : "";
      const checks = Array.isArray(state.lastChecks) ? state.lastChecks : [];

      const earned = Number(state.lastPointsEarned || 0);
      const possible = Number(state.lastPointsPossible || 0);

      const checksHtml =
        checks.length > 0
          ? `
            <div style="margin-top:10px">
              <div style="font-weight:900">Checklist: ${earned} / ${possible} point(s)</div>
              <ul style="margin:10px 0 0; padding-left:18px">
                ${checks.map((c) => `<li style="margin:4px 0">${c.ok ? "✅" : "❌"} ${safeText(c.label)}</li>`).join("")}
              </ul>
            </div>
          `
          : `
            <div style="margin-top:10px">
              <div style="font-weight:900">Auto-score: ${earned} / ${possible} point(s)</div>
              <p style="margin:8px 0 0; opacity:.92">Non-empty answer earns 1 point.</p>
            </div>
          `;

      return `
        <div style="display:flex; align-items:center; justify-content:space-between; gap:10px; flex-wrap:wrap">
          <div style="font-weight:800; color: var(--muted)">Question ${n} of ${total}</div>
          <button class="btn" type="button" data-action="restart" aria-label="Restart the test">Restart</button>
        </div>

        <div class="note" style="margin-top:12px" aria-live="polite">
          <strong>✍️ Saved & scored</strong>
          ${checksHtml}
        </div>

        <details style="margin-top:12px">
          <summary style="cursor:pointer; font-weight:900">Show what you wrote</summary>
          <div style="white-space:pre-wrap; margin-top:10px; padding:12px; border:1px solid var(--border); border-radius:14px; background: var(--surface2)">${safeText(
            userText || ""
          )}</div>
        </details>

        <div class="actions" style="margin-top:12px">
          <button class="btn btn--primary" type="button" data-action="next">${nextLabel}</button>
        </div>
      `;
    }

    const ok = !!state.lastIsCorrect;
    const icon = ok ? "✅" : "❌";

    let detailHtml = "";

    if (t === "fillintheblank") {
      const accepted = state.lastAcceptedAnswers || [];
      const correctText = accepted.length ? accepted.slice(0, 4).join(" / ") : "";
      const chosenText = state.lastBlank != null ? String(state.lastBlank) : "";

      detailHtml = ok
        ? `<p style="margin:8px 0 0">Correct. +${state.lastPointsEarned} point(s)</p>`
        : `<p style="margin:8px 0 0">Correct answer: <strong>${safeText(correctText || "(unknown)")}</strong></p>
           <p style="margin:8px 0 0; opacity:.92">You typed: <strong>${safeText(chosenText || "(blank)")}</strong></p>`;
    } else {
      // MCQ / TF
      let options = Array.isArray(q.options) ? q.options : [];
      if (t === "truefalse" && (!options || !options.length)) options = ["True", "False"];

      const correctIdx = Number(q.answer);
      const chosenIdx = Number(state.lastChoice);

      const correctText = options[correctIdx] != null ? String(options[correctIdx]) : "";
      const chosenText = options[chosenIdx] != null ? String(options[chosenIdx]) : "";

      detailHtml = ok
        ? `<p style="margin:8px 0 0">Correct. +${state.lastPointsEarned} point(s)</p>`
        : `<p style="margin:8px 0 0">Correct answer: <strong>${safeText(correctText || "(unknown)")}</strong></p>
           <p style="margin:8px 0 0; opacity:.92">You chose: <strong>${safeText(chosenText || "(none)")}</strong></p>`;
    }

    const explanation = q.explanation ? String(q.explanation).trim() : "";
    const explanationHtml = explanation
      ? `<p style="margin:8px 0 0; opacity:.92"><strong>Tip:</strong> ${safeText(explanation)}</p>`
      : "";

    return `
      <div style="display:flex; align-items:center; justify-content:space-between; gap:10px; flex-wrap:wrap">
        <div style="font-weight:800; color: var(--muted)">Question ${n} of ${total}</div>
        <button class="btn" type="button" data-action="restart" aria-label="Restart the test">Restart</button>
      </div>

      <div class="note" style="margin-top:12px" aria-live="polite">
        <strong>${icon} ${ok ? "Nice work!" : "Try again next time"}</strong>
        ${detailHtml}
        ${explanationHtml}
      </div>

      <div class="actions" style="margin-top:12px">
        <button class="btn btn--primary" type="button" data-action="next">${nextLabel}</button>
      </div>
    `;
  }

  function renderSummary(state) {
    const objEarned = state.objectiveEarnedPoints;
    const objMax = state.objectiveMaxPoints;
    const objPct = objMax ? Math.round((objEarned / objMax) * 100) : 0;

    const wrEarned = state.promptEarnedPoints;
    const wrMax = state.promptMaxPoints;
    const wrPct = wrMax ? Math.round((wrEarned / wrMax) * 100) : 0;

    const allEarned = objEarned + wrEarned;
    const allMax = objMax + wrMax;
    const allPct = allMax ? Math.round((allEarned / allMax) * 100) : 0;

    const rows = state.questions
      .map((q, i) => {
        const r = state.responses[q.id] || {};
        const t = normalizeType(q.type || "");

        let status = "";
        if (r.skipped) status = "⏭️ Skipped";
        else if (t === "prompt") status = "✍️ Scored";
        else status = r.correct ? "✅ Correct" : "❌ Wrong";

        const earned = Number(r.pointsEarned || 0);
        const possible = Number(r.pointsPossible || 0);

        let extra = `<div style="margin-top:6px; color: var(--muted)">Points: ${earned} / ${possible}</div>`;

        if (t === "prompt" && Array.isArray(r.checks) && r.checks.length) {
          const met = r.checks.filter((c) => c.ok).length;
          extra += `<div style="margin-top:6px; color: var(--muted)">Checklist: ${met} / ${r.checks.length}</div>`;
        }

        return `
          <li style="display:flex; gap:10px; align-items:flex-start; padding:8px 0; border-bottom:1px solid var(--border)">
            <span aria-hidden="true">${safeText(status.split(" ")[0])}</span>
            <span style="min-width:0">
              <b>Q${i + 1}:</b> ${safeText(q.question || "")}
              ${extra}
            </span>
          </li>
        `;
      })
      .join("");

    const canSave = !!(window.UEAH_SAVE_SCORE && typeof window.UEAH_SAVE_SCORE.save === "function");

    return `
      <div class="note" style="margin-top:0">
        <strong>Finished!</strong>
        <p style="margin:8px 0 0">Objective score: <strong>${objEarned}</strong> / ${objMax} (${objPct}%)</p>
        <p style="margin:8px 0 0">Writing score: <strong>${wrEarned}</strong> / ${wrMax} (${wrPct}%)</p>
        <p style="margin:8px 0 0">Overall score: <strong>${allEarned}</strong> / ${allMax} (${allPct}%)</p>
        <p style="margin:8px 0 0">Tip: Repeat the test to practice again. The question order changes each time.</p>
      </div>

      <details style="margin-top:12px">
        <summary style="cursor:pointer; font-weight:900">Show review</summary>
        <ul style="list-style:none; padding-left:0; margin:12px 0 0">
          ${rows}
        </ul>
      </details>

      <div class="actions" style="margin-top:12px; display:flex; gap:10px; flex-wrap:wrap; align-items:center">
        <button class="btn btn--primary" type="button" data-action="restart">Play again</button>
        ${canSave ? `<button class="btn" type="button" data-action="save-score">Save score to Profile</button>` : ""}
        ${state.savedMsg ? `<span style="font-weight:800; color: var(--muted)">${safeText(state.savedMsg)}</span>` : ""}
      </div>
    `;
  }

  // ---------------------------------------------------------------------------
  // Runner registration
  // ---------------------------------------------------------------------------

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

        objectiveMaxPoints: 0,
        objectiveEarnedPoints: 0,
        promptMaxPoints: 0,
        promptEarnedPoints: 0,

        lastChoice: null,
        lastBlank: "",
        lastAcceptedAnswers: [],
        lastResponse: "",
        lastChecks: [],
        lastIsCorrect: false,
        lastWasSkipped: false,
        lastPointsEarned: 0,
        lastPointsPossible: 0,
        lastError: "",
        savedMsg: "",

        responses: Object.create(null) // q.id -> { type, user, correct?, checks?, skipped?, pointsEarned, pointsPossible }
      };

      function focusFirst() {
        setTimeout(() => {
          try {
            const el = host.querySelector("input, textarea, button");
            if (el && typeof el.focus === "function") el.focus();
          } catch (_) {}
        }, 0);
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
          const textarea = stage.querySelector("textarea[name='response']");
          const wcEl = stage.querySelector("[data-word-count]");
          const scEl = stage.querySelector("[data-sentence-count]");
          if (textarea && (wcEl || scEl)) {
            const update = () => {
              if (wcEl) wcEl.textContent = String(wordCount(textarea.value));
              if (scEl) scEl.textContent = String(sentenceCount(textarea.value));
            };
            textarea.addEventListener("input", update);
            update();
          }
          focusFirst();
        }
      }

      async function start() {
        state.status = "loading";
        state.lastError = "";
        state.savedMsg = "";
        paint();

        try {
          await ensureBankLoaded(ctx);

          const rawBank =
            window.UEAH_TEST_BANKS && Array.isArray(window.UEAH_TEST_BANKS[SLUG])
              ? window.UEAH_TEST_BANKS[SLUG]
              : [];

          if (!rawBank.length) throw new Error("Missing question bank.");

          // Ensure stable ids before any shuffling/subsetting.
          const bank = ensureIds(rawBank.filter(isPlainObject).map((q) => ({ ...q })));

          // Normalize/patch TF items with default options and numeric answer if needed.
          const patched = bank.map((q) => {
            const t = normalizeType(q.type || "multipleChoice");

            if (t === "truefalse") {
              const opts = Array.isArray(q.options) && q.options.length ? q.options.slice() : ["True", "False"];
              const idx = typeof q.answer === "number" ? q.answer : coerceTrueFalseAnswerToIndex(q.answer);
              return { ...q, type: "trueFalse", options: opts, answer: Number.isFinite(Number(idx)) ? Number(idx) : 0 };
            }

            return q;
          });

          // Shuffle options for MCQ/TF where possible, and then split objective vs prompt.
          const optionShuffled = patched.map(cloneQuestionWithShuffledOptions);

          const objective = optionShuffled.filter((q) => !isPromptType(q && q.type));
          const prompts = optionShuffled.filter((q) => isPromptType(q && q.type));

          shuffleInPlace(objective);
          shuffleInPlace(prompts);

          const objPick = objective.slice(0, Math.min(MAX_OBJECTIVE, objective.length));
          const prPick = prompts.slice(0, Math.min(MAX_PROMPTS, prompts.length));

          const combined = objPick.concat(prPick);
          shuffleInPlace(combined);

          state.questions = combined.slice(0, Math.min(MAX_TOTAL, combined.length));
          state.index = 0;

          const objQs = state.questions.filter((q) => !isPromptType(q && q.type));
          const prQs = state.questions.filter((q) => isPromptType(q && q.type));

          state.objectiveMaxPoints = objQs.reduce((sum, q) => sum + pointsPossible(q), 0);
          state.objectiveEarnedPoints = 0;

          state.promptMaxPoints = prQs.reduce((sum, q) => sum + promptPointsPossible(q), 0);
          state.promptEarnedPoints = 0;

          state.lastChoice = null;
          state.lastBlank = "";
          state.lastAcceptedAnswers = [];
          state.lastResponse = "";
          state.lastChecks = [];
          state.lastIsCorrect = false;
          state.lastWasSkipped = false;
          state.lastPointsEarned = 0;
          state.lastPointsPossible = 0;

          state.responses = Object.create(null);

          state.status = "question";
          paint();
        } catch (err) {
          state.status = "error";
          state.lastError = err && err.message ? err.message : "Could not load the test.";
          paint();
        }
      }

      function restartToIntro() {
        state.status = "intro";
        state.questions = [];
        state.index = 0;

        state.objectiveMaxPoints = 0;
        state.objectiveEarnedPoints = 0;
        state.promptMaxPoints = 0;
        state.promptEarnedPoints = 0;

        state.lastChoice = null;
        state.lastBlank = "";
        state.lastAcceptedAnswers = [];
        state.lastResponse = "";
        state.lastChecks = [];
        state.lastIsCorrect = false;
        state.lastWasSkipped = false;
        state.lastPointsEarned = 0;
        state.lastPointsPossible = 0;
        state.lastError = "";
        state.savedMsg = "";

        state.responses = Object.create(null);

        paint();
      }

      function next() {
        state.lastWasSkipped = false;
        state.lastChecks = [];
        state.lastPointsEarned = 0;
        state.lastPointsPossible = 0;
        state.lastAcceptedAnswers = [];

        if (state.index + 1 >= state.questions.length) {
          state.status = "summary";
        } else {
          state.index += 1;
          state.status = "question";
        }

        paint();
      }

      function skipCurrent() {
        const q = state.questions[state.index];
        if (!q) return;

        const t = normalizeType(q.type || "");
        const possible = isPromptType(t) ? promptPointsPossible(q) : pointsPossible(q);

        state.lastWasSkipped = true;
        state.lastIsCorrect = false;
        state.lastChecks = [];
        state.lastPointsEarned = 0;
        state.lastPointsPossible = possible;

        state.responses[q.id] = {
          type: t,
          skipped: true,
          pointsEarned: 0,
          pointsPossible: possible
        };

        state.status = "feedback";
        paint();
      }

      function handleObjectiveMCQ(q, choiceIndex) {
        const chosen = Number(choiceIndex);
        if (!Number.isFinite(chosen)) return;

        const possible = pointsPossible(q);
        const ok = chosen === Number(q.answer);
        const earned = ok ? possible : 0;

        state.lastChoice = chosen;
        state.lastBlank = "";
        state.lastAcceptedAnswers = [];
        state.lastIsCorrect = ok;
        state.lastPointsEarned = earned;
        state.lastPointsPossible = possible;

        state.objectiveEarnedPoints += earned;

        state.responses[q.id] = {
          type: normalizeType(q.type || "multipleChoice"),
          user: chosen,
          correct: ok,
          skipped: false,
          pointsEarned: earned,
          pointsPossible: possible
        };

        state.status = "feedback";
        paint();
      }

      function handleObjectiveBlank(q, value) {
        const graded = gradeFillBlank(q, value);
        const ok = graded.ok;

        const possible = pointsPossible(q);
        const earned = ok ? possible : 0;

        state.lastChoice = null;
        state.lastBlank = value != null ? String(value) : "";
        state.lastAcceptedAnswers = graded.acceptedRaw || [];
        state.lastIsCorrect = ok;
        state.lastPointsEarned = earned;
        state.lastPointsPossible = possible;

        state.objectiveEarnedPoints += earned;

        state.responses[q.id] = {
          type: "fillintheblank",
          user: state.lastBlank,
          correct: ok,
          skipped: false,
          pointsEarned: earned,
          pointsPossible: possible
        };

        state.status = "feedback";
        paint();
      }

      function handlePrompt(q, text) {
        const raw = String(text || "");
        const checks = evaluatePrompt(raw, q.rubric);
        const possible = promptPointsPossible(q);

        let earned = 0;
        if (checks.length) earned = checks.filter((c) => c.ok).length;
        else earned = raw.trim() ? 1 : 0;

        state.lastResponse = raw;
        state.lastChecks = checks;
        state.lastIsCorrect = true; // prompts are "scored", not right/wrong
        state.lastPointsEarned = earned;
        state.lastPointsPossible = possible;

        state.promptEarnedPoints += earned;

        state.responses[q.id] = {
          type: "prompt",
          user: raw,
          checks,
          skipped: false,
          pointsEarned: earned,
          pointsPossible: possible
        };

        state.status = "feedback";
        paint();
      }

      function saveScoreToProfile() {
        if (!window.UEAH_SAVE_SCORE || typeof window.UEAH_SAVE_SCORE.save !== "function") {
          state.savedMsg = "Save unavailable.";
          paint();
          return;
        }

        const allEarned = state.objectiveEarnedPoints + state.promptEarnedPoints;
        const allMax = state.objectiveMaxPoints + state.promptMaxPoints;
        const percent = allMax ? Math.round((allEarned / allMax) * 100) : 0;

        const payload = {
          slug: SLUG,
          ageGroup: "8-10",
          skill: "writing",
          at: nowIso(),

          // UPDATE: include questions + review (responses map)
          questions: Array.isArray(state.questions) ? state.questions : [],
          review: state.responses && typeof state.responses === "object" ? state.responses : Object.create(null),

          totals: {
            overall: { earned: allEarned, possible: allMax, percent },
            objective: {
              earned: state.objectiveEarnedPoints,
              possible: state.objectiveMaxPoints,
              percent: state.objectiveMaxPoints ? Math.round((state.objectiveEarnedPoints / state.objectiveMaxPoints) * 100) : 0
            },
            prompts: {
              earned: state.promptEarnedPoints,
              possible: state.promptMaxPoints,
              percent: state.promptMaxPoints ? Math.round((state.promptEarnedPoints / state.promptMaxPoints) * 100) : 0
            }
          },

          // Backward-compatible field (kept)
          responses: Object.keys(state.responses).length ? state.responses : {}
        };

        const res = window.UEAH_SAVE_SCORE.save(payload);
        if (res && res.ok) {
          const norm =
            res.normalizedScore != null
              ? `${Math.round(Number(res.normalizedScore))}/100`
              : res.saved && res.saved.normalizedScore != null
                ? `${Math.round(Number(res.saved.normalizedScore))}/100`
                : "";
          const level =
            res.levelTitle ||
            (res.saved && res.saved.levelTitle) ||
            (res.saved && res.saved.level && res.saved.level.title) ||
            "";
          state.savedMsg = norm || level ? `Saved (${[norm, level].filter(Boolean).join(" — ")}).` : "Saved to Profile.";
        } else {
          state.savedMsg = "Could not save.";
        }

        paint();
      }

      // Event delegation
      host.addEventListener("click", (e) => {
        const btn = e.target && e.target.closest ? e.target.closest("[data-action]") : null;
        if (!btn) return;

        const action = btn.getAttribute("data-action");
        if (!action) return;

        if (action === "start" || action === "retry") {
          e.preventDefault();
          start();
          return;
        }

        if (action === "restart") {
          e.preventDefault();
          restartToIntro();
          return;
        }

        if (action === "next") {
          e.preventDefault();
          next();
          return;
        }

        if (action === "skip") {
          e.preventDefault();
          if (state.status === "question") skipCurrent();
          return;
        }

        if (action === "save-score") {
          e.preventDefault();
          saveScoreToProfile();
          return;
        }
      });

      host.addEventListener("submit", (e) => {
        const form = e.target;
        if (!form || !form.matches || !form.matches("form[data-form='question']")) return;

        e.preventDefault();
        if (state.status !== "question") return;

        const q = state.questions[state.index];
        if (!q) return;

        const t = normalizeType(q.type || "multipleChoice");
        state.lastWasSkipped = false;

        if (t === "prompt") {
          const area = form.querySelector("textarea[name='response']");
          handlePrompt(q, area ? area.value : "");
          return;
        }

        if (t === "fillintheblank") {
          const input = form.querySelector("input[name='blank']");
          handleObjectiveBlank(q, input ? input.value : "");
          return;
        }

        const checked = form.querySelector("input[name='choice']:checked");
        handleObjectiveMCQ(q, checked ? checked.value : null);
      });

      paint();
    }
  });
})();
