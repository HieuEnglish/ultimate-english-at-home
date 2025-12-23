/* assets/js/tests/age/8-10-writing.js
   Runner: Ages 8–10 • Writing

   This module provides interactive writing practice for learners aged 8–10.
   It loads a question bank (assets/data/tests-8-10-writing.js) and presents:
   - Objective questions (MCQ/TF/fill-in) that are auto-scored
   - Short writing prompts that are also auto-scored using simple checklist rules

   Auto-grading:
   - Objective: correct/incorrect → points
   - Writing prompts: points earned by meeting rubric checklist items
     (min words, min sentences, includes words). If no rubric exists, any non-empty
     response earns 1 point.

   No build step: this file runs in the browser directly.
*/

(function () {
  "use strict";

  const SLUG = "age-8-10-writing";
  const BANK_SRC = "assets/data/tests-8-10-writing.js";
  // Limit total questions: up to 12 objective and 4 writing prompts.
  const MAX_QUESTIONS = 16;

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

  function normalizeAnswerText(v) {
    return String(v == null ? "" : v)
      .trim()
      .toLowerCase()
      .replace(/[.,!?;:"()]/g, "")
      .replace(/\s+/g, " ");
  }

  function wordCount(text) {
    const t = String(text || "").trim();
    if (!t) return 0;
    return t.split(/\s+/).filter(Boolean).length;
  }

  function sentenceCount(text) {
    const t = String(text || "");
    return t.split(/[.!?]/).filter((s) => s.trim()).length;
  }

  function pointsPossible(q) {
    const p = Number(q && q.points);
    if (Number.isFinite(p)) return Math.max(0, p);
    return 1;
  }

  function cloneQuestionWithShuffledOptions(q) {
    if (!q || typeof q !== "object") return q;
    if (!Array.isArray(q.options)) return { ...q };
    if (typeof q.answer !== "number") return { ...q };
    const pairs = q.options.map((text, idx) => ({ text, idx }));
    shuffleInPlace(pairs);
    const newOptions = pairs.map((p) => p.text);
    const newAnswer = pairs.findIndex((p) => p.idx === q.answer);
    return { ...q, options: newOptions, answer: newAnswer };
  }

  function isPromptType(type) {
    const s = String(type || "").toLowerCase();
    return s === "prompt";
  }

  function promptPointsPossible(q) {
    const rubric = q && typeof q.rubric === "object" ? q.rubric : null;
    let n = 0;
    if (rubric && Number.isFinite(Number(rubric.minWords))) n += 1;
    if (rubric && Number.isFinite(Number(rubric.minSentences))) n += 1;
    if (rubric && Array.isArray(rubric.mustIncludeAny)) {
      rubric.mustIncludeAny.forEach((group) => {
        if (Array.isArray(group) && group.length) n += 1;
      });
    }
    // If there are no explicit checks, still allow a simple auto-score:
    // any non-empty response = 1 point.
    return n > 0 ? n : 1;
  }

  function evaluatePrompt(text, rubric) {
    const checks = [];
    if (!rubric || typeof rubric !== "object") return checks;

    const raw = String(text || "");
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
      const lower = raw.toLowerCase();
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

    return checks;
  }

  function gradeFillBlank(q, userText) {
    const userNorm = normalizeAnswerText(userText);

    const accepted = [];
    if (Array.isArray(q && q.acceptedAnswers)) accepted.push(...q.acceptedAnswers);

    const ans = q && q.answer;
    if (Array.isArray(ans)) accepted.push(...ans);
    else if (ans != null) accepted.push(ans);

    const ok = accepted.some((a) => normalizeAnswerText(a) === userNorm);
    return { ok, accepted };
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
      const existing = document.querySelector(`script[data-ueah-test-bank="${SLUG}"]`);
      if (existing) {
        if (window.UEAH_TEST_BANKS && Array.isArray(window.UEAH_TEST_BANKS[SLUG])) {
          resolve(true);
          return;
        }
        existing.addEventListener("load", () => resolve(true), { once: true });
        existing.addEventListener(
          "error",
          () => reject(new Error("Failed to load test bank")),
          { once: true }
        );
        return;
      }

      const s = document.createElement("script");
      s.defer = true;
      s.src = src;
      s.setAttribute("data-ueah-test-bank", SLUG);
      s.onload = () => resolve(true);
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
        <p style="margin:8px 0 0; opacity:.92">Writing tasks are auto-scored using a simple checklist (words, sentences, and key words).</p>
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
        <p style="margin:8px 0 0">${safeText(p)}</p>
      </div>
    `;
  }

  function renderMCQForm(q) {
    const prompt = safeTextWithBreaks(q.question || "Question");
    const options = Array.isArray(q.options) ? q.options : [];
    const optionsHtml = options
      .map((opt, i) => {
        const id = `opt-${SLUG}-${q.id}-${i}`;
        return `
          <label for="${id}" style="display:flex; align-items:center; gap:10px; padding:12px; border:1px solid var(--border); border-radius:14px; background: var(--surface2); cursor:pointer">
            <input id="${id}" type="radio" name="choice" value="${i}" required style="margin:0" />
            <span>${safeText(opt)}</span>
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
              maxlength="32"
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

  function renderPromptForm(q) {
    const prompt = safeTextWithBreaks(q.question || "Write");
    const model = q && q.model ? String(q.model) : "";
    const rubric = q && q.rubric ? q.rubric : null;

    const checklist = [];
    if (rubric && Number.isFinite(Number(rubric.minWords))) checklist.push(`${rubric.minWords}+ words`);
    if (rubric && Number.isFinite(Number(rubric.minSentences))) checklist.push(`${rubric.minSentences}+ sentences`);
    if (rubric && Array.isArray(rubric.mustIncludeAny)) {
      rubric.mustIncludeAny.forEach((group) => {
        if (!Array.isArray(group) || !group.length) return;
        checklist.push(`Include ${group.join(" / ")}`);
      });
    }

    const checklistHtml = checklist.length
      ? `
        <div class="note" style="margin:12px 0 0; padding:12px 14px">
          <strong>Checklist</strong>
          <ul style="margin:10px 0 0; padding-left:18px">
            ${checklist.map((t) => `<li style="margin:4px 0">${safeText(t)}</li>`).join("")}
          </ul>
        </div>
      `
      : `
        <div class="note" style="margin:12px 0 0; padding:12px 14px">
          <strong>Checklist</strong>
          <p style="margin:8px 0 0; opacity:.92">Write something clear. Any non-empty answer earns 1 point.</p>
        </div>
      `;

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
      ${checklistHtml}
      <form data-form="question" data-qtype="prompt" style="margin-top:12px">
        <fieldset style="border:1px solid var(--border); border-radius:16px; padding:14px; background: var(--surface2)">
          <legend style="padding:0 8px; font-weight:900">${prompt}</legend>

          <div style="display:flex; align-items:center; justify-content:space-between; gap:10px; flex-wrap:wrap; margin-top:10px">
            <div style="color:var(--muted); font-weight:800">Word count: <span data-word-count>0</span></div>
            <div style="color:var(--muted)">Write in your own words.</div>
          </div>

          <label style="display:block; margin-top:12px">
            <span class="sr-only">Your writing</span>
            <textarea
              name="response"
              rows="6"
              maxlength="450"
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

    const type = String(q.type || "multipleChoice").toLowerCase();
    let body = "";
    if (type === "prompt") body = renderPromptForm(q);
    else if (type === "fillintheblank") body = renderFillBlankForm(q);
    else body = renderMCQForm(q);

    return `${top}${renderPassage(q)}${body}`;
  }

  function renderFeedback(state) {
    const q = state.questions[state.index];
    const total = state.questions.length;
    const n = state.index + 1;
    const type = String(q.type || "multipleChoice").toLowerCase();
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

    if (type === "prompt") {
      const userText = state.lastResponse != null ? String(state.lastResponse) : "";
      const checks = Array.isArray(state.lastChecks) ? state.lastChecks : [];
      const possible = Number(state.lastPointsPossible || 0);
      const earned = Number(state.lastPointsEarned || 0);

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
    if (type === "fillintheblank") {
      const correctText = q.answer != null ? String(Array.isArray(q.answer) ? q.answer[0] : q.answer) : "";
      const chosenText = state.lastBlank != null ? String(state.lastBlank) : "";
      detailHtml = ok
        ? `<p style="margin:8px 0 0">Correct. +${state.lastPointsEarned} point(s)</p>`
        : `<p style="margin:8px 0 0">Correct answer: <strong>${safeText(correctText)}</strong></p>
           <p style="margin:8px 0 0; opacity:.92">You typed: <strong>${safeText(chosenText || "(blank)")}</strong></p>`;
    } else {
      const correctIdx = Number(q.answer);
      const chosenIdx = Number(state.lastChoice);
      const correctText = Array.isArray(q.options) ? q.options[correctIdx] : "";
      const chosenText = Array.isArray(q.options) ? q.options[chosenIdx] : "";
      detailHtml = ok
        ? `<p style="margin:8px 0 0">Correct. +${state.lastPointsEarned} point(s)</p>`
        : `<p style="margin:8px 0 0">Correct answer: <strong>${safeText(correctText)}</strong></p>
           <p style="margin:8px 0 0; opacity:.92">You chose: <strong>${safeText(chosenText)}</strong></p>`;
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
    const total = state.questions.length;

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
        const type = String(q.type || "").toLowerCase();

        let status = "";
        if (r.skipped) status = "⏭️ Skipped";
        else if (type === "prompt") status = "✍️ Scored";
        else status = r.correct ? "✅ Correct" : "❌ Wrong";

        const earned = Number(r.pointsEarned || 0);
        const possible = Number(r.pointsPossible || 0);

        let extra = `<div style="margin-top:6px; color: var(--muted)">Points: ${earned} / ${possible}</div>`;

        if (type === "prompt" && Array.isArray(r.checks) && r.checks.length) {
          const met = r.checks.filter((c) => c.ok).length;
          extra += `<div style="margin-top:6px; color: var(--muted)">Checklist: ${met} / ${r.checks.length}</div>`;
        }

        return `
          <li style="display:flex; gap:10px; align-items:flex-start; padding:8px 0; border-bottom:1px solid var(--border)">
            <span aria-hidden="true">${safeText(status.split(" ")[0])}</span>
            <span style="min-width:0"><b>Q${i + 1}:</b> ${safeText(q.question || "")}
              ${extra}
            </span>
          </li>
        `;
      })
      .join("");

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

      <div class="actions" style="margin-top:12px">
        <button class="btn btn--primary" type="button" data-action="restart">Play again</button>
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
        lastResponse: "",
        lastChecks: [],
        lastIsCorrect: false,
        lastWasSkipped: false,
        lastPointsEarned: 0,
        lastPointsPossible: 0,
        lastError: "",

        responses: {} // q.id -> { type, user, correct?, checks?, skipped?, pointsEarned, pointsPossible }
      };

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
          const counter = stage.querySelector("[data-word-count]");
          if (textarea && counter) {
            const update = () => {
              counter.textContent = String(wordCount(textarea.value));
            };
            textarea.addEventListener("input", update);
            update();
          }
        }
      }

      async function start() {
        state.status = "loading";
        state.lastError = "";
        paint();

        try {
          await ensureBankLoaded(ctx);

          const bank =
            window.UEAH_TEST_BANKS && Array.isArray(window.UEAH_TEST_BANKS[SLUG])
              ? window.UEAH_TEST_BANKS[SLUG]
              : [];

          if (!bank.length) throw new Error("Missing question bank.");

          const prepared = bank.map(cloneQuestionWithShuffledOptions);
          const objective = prepared.filter((q) => !isPromptType(q?.type));
          const prompts = prepared.filter((q) => isPromptType(q?.type));

          shuffleInPlace(objective);
          shuffleInPlace(prompts);

          const objPick = objective.slice(0, Math.min(12, objective.length));
          const prPick = prompts.slice(0, Math.min(4, prompts.length));
          const combined = objPick.concat(prPick).slice(0, MAX_QUESTIONS);

          state.questions = combined;
          state.index = 0;

          state.objectiveMaxPoints = combined
            .filter((q) => !isPromptType(q?.type))
            .reduce((sum, q) => sum + pointsPossible(q), 0);
          state.objectiveEarnedPoints = 0;

          state.promptMaxPoints = combined
            .filter((q) => isPromptType(q?.type))
            .reduce((sum, q) => sum + promptPointsPossible(q), 0);
          state.promptEarnedPoints = 0;

          state.lastChoice = null;
          state.lastBlank = "";
          state.lastResponse = "";
          state.lastChecks = [];
          state.lastIsCorrect = false;
          state.lastWasSkipped = false;
          state.lastPointsEarned = 0;
          state.lastPointsPossible = 0;
          state.responses = {};

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

        state.lastWasSkipped = false;
        state.lastPointsEarned = 0;
        state.lastPointsPossible = 0;
        state.responses = {};
        paint();
      }

      function next() {
        state.lastWasSkipped = false;
        state.lastPointsEarned = 0;
        state.lastPointsPossible = 0;
        state.lastChecks = [];

        if (state.index + 1 >= state.questions.length) {
          state.status = "summary";
          paint();
          return;
        }

        state.index += 1;
        state.status = "question";
        paint();
      }

      function skipCurrent() {
        const q = state.questions[state.index];
        const type = String(q?.type || "").toLowerCase();

        const possible = isPromptType(type) ? promptPointsPossible(q) : pointsPossible(q);

        state.responses[q.id] = {
          ...(state.responses[q.id] || {}),
          skipped: true,
          type,
          pointsEarned: 0,
          pointsPossible: possible
        };

        state.lastWasSkipped = true;
        state.lastIsCorrect = false;
        state.lastChoice = null;
        state.lastBlank = "";
        state.lastResponse = "";
        state.lastChecks = [];
        state.lastPointsEarned = 0;
        state.lastPointsPossible = possible;

        state.status = "feedback";
        paint();
      }

      function handleSubmit(form) {
        const q = state.questions[state.index];
        const type = String(q?.type || "").toLowerCase();
        state.lastWasSkipped = false;

        if (type === "prompt") {
          const txt = form.querySelector("textarea[name='response']")?.value || "";
          const checks = evaluatePrompt(txt, q.rubric);
          const possible = promptPointsPossible(q);

          let earned = 0;
          if (checks.length) {
            earned = checks.filter((c) => c.ok).length;
          } else {
            earned = wordCount(txt) > 0 ? 1 : 0;
          }

          state.lastResponse = txt;
          state.lastChecks = checks;
          state.lastPointsEarned = earned;
          state.lastPointsPossible = possible;

          state.promptEarnedPoints += earned;

          state.responses[q.id] = {
            type,
            user: txt,
            checks,
            pointsEarned: earned,
            pointsPossible: possible
          };

          state.status = "feedback";
          paint();
          return;
        }

        const possible = pointsPossible(q);
        let earned = 0;
        let ok = false;

        if (type === "fillintheblank") {
          const blank = form.querySelector("input[name='blank']")?.value || "";
          const graded = gradeFillBlank(q, blank);
          ok = graded.ok;
          earned = ok ? possible : 0;

          state.lastBlank = blank;
          state.lastChoice = null;
          state.lastIsCorrect = ok;
          state.lastPointsEarned = earned;
          state.lastPointsPossible = possible;

          state.responses[q.id] = {
            type,
            user: blank,
            correct: ok,
            pointsEarned: earned,
            pointsPossible: possible
          };
        } else {
          const chosen = form.querySelector("input[name='choice']:checked")?.value;
          const chosenIdx = Number(chosen);
          ok = Number.isFinite(chosenIdx) && chosenIdx === Number(q.answer);
          earned = ok ? possible : 0;

          state.lastChoice = chosenIdx;
          state.lastBlank = "";
          state.lastIsCorrect = ok;
          state.lastPointsEarned = earned;
          state.lastPointsPossible = possible;

          state.responses[q.id] = {
            type,
            user: chosenIdx,
            correct: ok,
            pointsEarned: earned,
            pointsPossible: possible
          };
        }

        state.objectiveEarnedPoints += earned;
        state.status = "feedback";
        paint();
      }

      stage.addEventListener("click", (e) => {
        const btn = e.target && e.target.closest ? e.target.closest("[data-action]") : null;
        if (!btn) return;
        const action = btn.getAttribute("data-action");
        if (!action) return;

        if (action === "start") start();
        else if (action === "retry") start();
        else if (action === "restart") restartToIntro();
        else if (action === "next") next();
        else if (action === "skip") {
          if (state.status === "question") skipCurrent();
        }
      });

      stage.addEventListener("submit", (e) => {
        const form = e.target;
        if (!form || !form.matches || !form.matches("form[data-form='question']")) return;
        e.preventDefault();
        if (state.status !== "question") return;
        handleSubmit(form);
      });

      paint();
    }
  });
})();
