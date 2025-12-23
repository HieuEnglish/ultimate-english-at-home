/* assets/js/tests/age/8-10-writing.js
   Runner: Ages 8–10 • Writing

   This module provides the interactive writing practice for learners aged
   8–10. It loads a question bank (assets/data/tests-8-10-writing.js) and
   presents a series of objective questions (multiple choice, true/false,
   fill‑in‑the‑blank) followed by a handful of short writing prompts.

   Objective questions are automatically scored. Writing prompts are not
   graded, but simple requirements—minimum word count, minimum sentence
   count, and inclusion of certain words—are checked and displayed to the
   learner as feedback. A summary at the end reports the number of correct
   objective answers and how many writing prompts were completed.

   Supported question types:
   - multipleChoice
   - trueFalse
   - fillInTheBlank
   - prompt (free response)

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

  /**
   * Shuffle an array in place (Fisher–Yates).
   * @param {Array<any>} arr
   * @returns {Array<any>}
   */
  function shuffleInPlace(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const tmp = arr[i];
      arr[i] = arr[j];
      arr[j] = tmp;
    }
    return arr;
  }

  /**
   * Escape text for safe HTML display.
   * @param {any} v
   * @returns {string}
   */
  function safeText(v) {
    return String(v == null ? "" : v)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  /**
   * Escape text and convert newlines into <br> tags.
   * @param {any} v
   * @returns {string}
   */
  function safeTextWithBreaks(v) {
    return safeText(v).replace(/\n/g, "<br>");
  }

  /**
   * Normalize a short answer text for comparison: lowercase, trim, remove
   * punctuation, collapse whitespace.
   * @param {any} v
   * @returns {string}
   */
  function normalizeAnswerText(v) {
    return String(v == null ? "" : v)
      .trim()
      .toLowerCase()
      .replace(/[.,!?;:"()]/g, "")
      .replace(/\s+/g, " ");
  }

  /**
   * Count the number of words in a string.
   * @param {string} text
   * @returns {number}
   */
  function wordCount(text) {
    const t = String(text || "").trim();
    if (!t) return 0;
    return t.split(/\s+/).filter(Boolean).length;
  }

  /**
   * Count the number of sentences by splitting on ., ! or ? and filtering
   * out empty parts.
   * @param {string} text
   * @returns {number}
   */
  function sentenceCount(text) {
    const t = String(text || "");
    return t.split(/[.!?]/).filter((s) => s.trim()).length;
  }

  /**
   * Clone a question and shuffle its options if applicable. For MCQ/TF
   * questions, shuffles the options array and adjusts the answer index.
   * @param {Object} q
   * @returns {Object}
   */
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

  /**
   * Determine if a question type corresponds to a writing prompt.
   * @param {string} type
   * @returns {boolean}
   */
  function isPromptType(type) {
    const s = String(type || "").toLowerCase();
    return s === "prompt";
  }

  /**
   * Evaluate a writing response against rubric constraints. Creates check
   * objects for minimum words, minimum sentences, and required word groups.
   * Each check has a label and an ok boolean indicating if the requirement
   * was met.
   * @param {string} text
   * @param {Object} rubric
   * @returns {Array<{label: string, ok: boolean}>}
   */
  function evaluatePrompt(text, rubric) {
    const checks = [];
    if (!rubric || typeof rubric !== "object") return checks;
    const raw = String(text || "");
    const wc = wordCount(raw);
    const sc = sentenceCount(raw);
    // Minimum words
    if (Number.isFinite(Number(rubric.minWords))) {
      const m = Number(rubric.minWords);
      checks.push({ label: `${m}+ words`, ok: wc >= m });
    }
    // Minimum sentences
    if (Number.isFinite(Number(rubric.minSentences))) {
      const m = Number(rubric.minSentences);
      checks.push({ label: `${m}+ sentences`, ok: sc >= m });
    }
    // Required word groups
    if (Array.isArray(rubric.mustIncludeAny)) {
      const lower = raw.toLowerCase();
      rubric.mustIncludeAny.forEach((group) => {
        if (!Array.isArray(group) || !group.length) return;
        const ok = group.some((w) => lower.includes(String(w).toLowerCase()));
        checks.push({ label: `Includes ${group.join(" / ")}`, ok });
      });
    }
    return checks;
  }

  /**
   * Load the question bank for this slug if it hasn't been loaded yet. Returns
   * a promise that resolves once the bank is ready. The ctx argument may
   * provide an assetHref helper to compute the script URL.
   * @param {any} ctx
   * @returns {Promise<boolean>}
   */
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
        existing.addEventListener("error", () => reject(new Error("Failed to load test bank")), { once: true });
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

  /**
   * Introduction screen explaining the test. Provides a start button.
   * @returns {string}
   */
  function renderIntro() {
    return `
      <div class="note" style="margin-top:0">
        <strong>Ages 8–10 Writing</strong>
        <p style="margin:8px 0 0">Practice punctuation, grammar, spelling, and short writing tasks.</p>
        <p style="margin:8px 0 0; opacity:.92">Tip: Plan your sentences, then check for capitals and full stops.</p>
      </div>
      <div class="actions" style="margin-top:12px">
        <button class="btn btn--primary" type="button" data-action="start">Start</button>
      </div>
    `;
  }

  /**
   * Show a loading message while preparing the test.
   */
  function renderLoading() {
    return `
      <div class="note" style="margin-top:0">
        <strong>Loading…</strong>
        <p style="margin:8px 0 0">Preparing your test.</p>
      </div>
    `;
  }

  /**
   * Show an error message when unable to start the test.
   * @param {string} message
   */
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

  /**
   * Render the top bar with question count and skip/restart controls.
   * @param {Object} state
   */
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

  /**
   * If a question has a reading passage (for example, summary prompts), render
   * it in a note box above the question form.
   * @param {Object} q
   */
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

  /**
   * Render a multiple choice or true/false form.
   * @param {Object} q
   */
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

  /**
   * Render a short answer form for fill‑in‑the‑blank questions.
   * @param {Object} q
   */
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
              spellcheck="false"
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

  /**
   * Render a writing prompt form. Shows an example (model) if provided and
   * displays a checklist of rubric requirements. Includes a word counter
   * that updates as the learner types.
   * @param {Object} q
   */
  function renderPromptForm(q) {
    const prompt = safeTextWithBreaks(q.question || "Write");
    const model = q && q.model ? String(q.model) : "";
    const rubric = q && q.rubric ? q.rubric : {};
    // Build checklist items
    const checklist = [];
    if (Number.isFinite(Number(rubric.minWords))) checklist.push(`${rubric.minWords}+ words`);
    if (Number.isFinite(Number(rubric.minSentences))) checklist.push(`${rubric.minSentences}+ sentences`);
    if (Array.isArray(rubric.mustIncludeAny)) {
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
      : "";
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
              maxlength="400"
              style="width:100%; padding:12px 12px; border:1px solid var(--border); border-radius:14px; background: var(--surface); resize:vertical"
              placeholder="Type here (or write on paper)"
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

  /**
   * Render the question screen with top bar, optional passage, and the
   * appropriate form based on question type.
   * @param {Object} state
   */
  function renderQuestionScreen(state) {
    const q = state.questions[state.index];
    const top = renderTopBar(state);
    const type = String(q.type || "multipleChoice").toLowerCase();
    let form = "";
    if (type === "prompt") form = renderPromptForm(q);
    else if (type === "fillintheblank") form = renderFillBlankForm(q);
    else form = renderMCQForm(q);
    return `${top}${renderPassage(q)}${form}`;
  }

  /**
   * Render feedback after answering a question or skipping. For writing prompts,
   * show which requirements were met. For objective questions, show correct
   * answer and explanation if wrong.
   * @param {Object} state
   */
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
          <p style="margin:8px 0 0">You can try this question again next time.</p>
        </div>
        <div class="actions" style="margin-top:12px">
          <button class="btn btn--primary" type="button" data-action="next">${nextLabel}</button>
        </div>
      `;
    }
    if (type === "prompt") {
      const userText = state.lastResponse != null ? String(state.lastResponse) : "";
      const checks = Array.isArray(state.lastChecks) ? state.lastChecks : [];
      const met = checks.filter((c) => c.ok).length;
      const totalChecks = checks.length;
      const checksHtml = totalChecks
        ? `
          <div style="margin-top:10px">
            <div style="font-weight:900">Auto-checks: ${met} / ${totalChecks}</div>
            <ul style="margin:10px 0 0; padding-left:18px">
              ${checks.map((c) => `<li style="margin:4px 0">${c.ok ? "✅" : "❌"} ${safeText(c.label)}</li>`).join("")}
            </ul>
          </div>
        `
        : "";
      return `
        <div style="display:flex; align-items:center; justify-content:space-between; gap:10px; flex-wrap:wrap">
          <div style="font-weight:800; color: var(--muted)">Question ${n} of ${total}</div>
          <button class="btn" type="button" data-action="restart" aria-label="Restart the test">Restart</button>
        </div>
        <div class="note" style="margin-top:12px" aria-live="polite">
          <strong>✍️ Saved</strong>
          <p style="margin:8px 0 0">This writing task is not automatically scored, but your response has been saved.</p>
          ${checksHtml}
        </div>
        <details style="margin-top:12px">
          <summary style="cursor:pointer; font-weight:900">Show what you wrote</summary>
          <div style="white-space:pre-wrap; margin-top:10px; padding:12px; border:1px solid var(--border); border-radius:14px; background: var(--surface2)">${safeText(userText || "")}</div>
        </details>
        <div class="actions" style="margin-top:12px">
          <button class="btn btn--primary" type="button" data-action="next">${nextLabel}</button>
        </div>
      `;
    }
    // Objective feedback
    const ok = !!state.lastIsCorrect;
    const icon = ok ? "✅" : "❌";
    let detailHtml = "";
    if (type === "fillintheblank") {
      const correctText = q.answer != null ? String(Array.isArray(q.answer) ? q.answer[0] : q.answer) : "";
      const chosenText = state.lastBlank != null ? String(state.lastBlank) : "";
      detailHtml = ok
        ? `<p style="margin:8px 0 0">Correct.</p>`
        : `<p style="margin:8px 0 0">Correct answer: <strong>${safeText(correctText)}</strong></p>
           <p style="margin:8px 0 0; opacity:.92">You typed: <strong>${safeText(chosenText || "(blank)")}</strong></p>`;
    } else {
      const correctIdx = Number(q.answer);
      const chosenIdx = Number(state.lastChoice);
      const correctText = Array.isArray(q.options) ? q.options[correctIdx] : "";
      const chosenText = Array.isArray(q.options) ? q.options[chosenIdx] : "";
      detailHtml = ok
        ? `<p style="margin:8px 0 0">Correct.</p>`
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

  /**
   * Render the summary at the end of the test. Lists how many objective
   * questions were correct and how many writing prompts were completed. A
   * collapsible section gives per-question status and, for writing prompts,
   * shows how many rubric checks were met.
   * @param {Object} state
   */
  function renderSummary(state) {
    const total = state.questions.length;
    const objectiveTotal = state.objectiveTotal;
    const promptTotal = total - objectiveTotal;
    const correct = state.correctCount;
    const pct = objectiveTotal ? Math.round((correct / objectiveTotal) * 100) : 0;
    const promptDone = state.promptDoneCount;
    const rows = state.questions
      .map((q, i) => {
        const r = state.responses[q.id] || {};
        const type = String(q.type || "").toLowerCase();
        let status = "";
        if (r.skipped) status = "⏭️ Skipped";
        else if (type === "prompt") status = "✍️ Done";
        else status = r.correct ? "✅ Correct" : "❌ Wrong";
        let extra = "";
        if (type === "prompt" && Array.isArray(r.checks) && r.checks.length) {
          const met = r.checks.filter((c) => c.ok).length;
          extra = `<div style="margin-top:6px; color: var(--muted)">Checks: ${met} / ${r.checks.length}</div>`;
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
        <p style="margin:8px 0 0">Objective score: <strong>${correct}</strong> / ${objectiveTotal} (${pct}%)</p>
        ${promptTotal ? `<p style="margin:8px 0 0">Writing tasks completed: <strong>${promptDone}</strong> / ${promptTotal}</p>` : ""}
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
    /**
     * Render the root container. Contains a data-ueah-test attribute so
     * multiple test instances can coexist without interfering with each other.
     */
    render() {
      return `
        <div data-ueah-test="${SLUG}">
          <div data-stage>
            ${renderIntro()}
          </div>
        </div>
      `;
    },
    /**
     * After the element is added to the DOM, set up state and event listeners.
     * @param {HTMLElement} rootEl
     * @param {any} ctx
     */
    afterRender(rootEl, ctx) {
      if (!rootEl) return;
      const host = rootEl.querySelector(`[data-ueah-test="${SLUG}"]`);
      if (!host) return;
      if (host.__ueahInited) return;
      host.__ueahInited = true;
      const stage = host.querySelector("[data-stage]");
      if (!stage) return;
      // Initialize state
      const state = {
        status: "intro",
        questions: [],
        index: 0,
        correctCount: 0,
        objectiveTotal: 0,
        promptDoneCount: 0,
        lastChoice: null,
        lastBlank: "",
        lastResponse: "",
        lastChecks: [],
        lastIsCorrect: false,
        lastWasSkipped: false,
        lastError: "",
        responses: {}
      };
      /**
       * Redraw the current stage of the test.
       */
      function paint() {
        if (state.status === "intro") stage.innerHTML = renderIntro();
        else if (state.status === "loading") stage.innerHTML = renderLoading();
        else if (state.status === "question") stage.innerHTML = renderQuestionScreen(state);
        else if (state.status === "feedback") stage.innerHTML = renderFeedback(state);
        else if (state.status === "summary") stage.innerHTML = renderSummary(state);
        else if (state.status === "error") stage.innerHTML = renderError(state.lastError);
        else stage.innerHTML = renderIntro();
        // Attach word counter updates for writing prompts
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
      /**
       * Start the test by loading the question bank and shuffling questions.
       */
      async function start() {
        state.status = "loading";
        state.lastError = "";
        paint();
        try {
          await ensureBankLoaded(ctx);
          const bank = window.UEAH_TEST_BANKS && Array.isArray(window.UEAH_TEST_BANKS[SLUG])
            ? window.UEAH_TEST_BANKS[SLUG]
            : [];
          if (!bank.length) throw new Error("Missing question bank.");
          // Prepare and shuffle
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
          state.correctCount = 0;
          state.promptDoneCount = 0;
          state.lastChoice = null;
          state.lastBlank = "";
          state.lastResponse = "";
          state.lastChecks = [];
          state.lastIsCorrect = false;
          state.lastWasSkipped = false;
          state.responses = {};
          state.objectiveTotal = combined.filter((q) => !isPromptType(q?.type)).length;
          state.status = "question";
          paint();
          // Focus the first interactive element
          setTimeout(() => {
            try {
              const el = host.querySelector("input, textarea, button");
              if (el && typeof el.focus === "function") el.focus();
            } catch (_) {}
          }, 0);
        } catch (err) {
          state.status = "error";
          state.lastError = err && err.message ? err.message : "Could not load the test.";
          paint();
        }
      }
      /**
       * Restart the test back to the intro screen.
       */
      function restart() {
        state.status = "intro";
        state.questions = [];
        state.index = 0;
        state.correctCount = 0;
        state.promptDoneCount = 0;
        state.lastChoice = null;
        state.lastBlank = "";
        state.lastResponse = "";
        state.lastChecks = [];
        state.lastIsCorrect = false;
        state.lastWasSkipped = false;
        state.responses = {};
        paint();
      }
      /**
       * Proceed to the next question or finish the test.
       */
      function next() {
        state.lastWasSkipped = false;
        state.lastChecks = [];
        if (state.index + 1 >= state.questions.length) {
          state.status = "summary";
        } else {
          state.index++;
          state.status = "question";
        }
        paint();
        if (state.status === "question") {
          setTimeout(() => {
            try {
              const el = host.querySelector("input, textarea, button");
              if (el && typeof el.focus === "function") el.focus();
            } catch (_) {}
          }, 0);
        }
      }
      /**
       * Skip the current question.
       */
      function skip() {
        const q = state.questions[state.index];
        state.lastWasSkipped = true;
        state.lastIsCorrect = false;
        state.lastChecks = [];
        state.responses[q.id] = { skipped: true };
        state.status = "feedback";
        paint();
      }
      /**
       * Handle submission for multiple choice and true/false questions.
       * @param {Object} q
       * @param {string|number} choice
       */
      function handleMCQSubmit(q, choice) {
        const chosen = Number(choice);
        const correctIdx = Number(q.answer);
        const ok = chosen === correctIdx;
        state.lastChoice = chosen;
        state.lastIsCorrect = ok;
        if (ok) state.correctCount++;
        state.responses[q.id] = { correct: ok, choice: chosen };
        state.status = "feedback";
        paint();
      }
      /**
       * Handle submission for fill-in-the-blank questions.
       * @param {Object} q
       * @param {string} value
       */
      function handleBlankSubmit(q, value) {
        const normalized = normalizeAnswerText(value);
        let ok = false;
        if (Array.isArray(q.acceptedAnswers) && q.acceptedAnswers.length) {
          ok = q.acceptedAnswers.some((ans) => normalizeAnswerText(ans) === normalized);
        } else if (q.answer != null) {
          const ans = Array.isArray(q.answer) ? q.answer[0] : q.answer;
          ok = normalizeAnswerText(ans) === normalized;
        }
        state.lastBlank = value;
        state.lastIsCorrect = ok;
        if (ok) state.correctCount++;
        state.responses[q.id] = { correct: ok, user: value };
        state.status = "feedback";
        paint();
      }
      /**
       * Handle submission for writing prompts.
       * @param {Object} q
       * @param {string} text
       */
      function handlePromptSubmit(q, text) {
        state.lastResponse = text;
        const checks = evaluatePrompt(text, q.rubric || {});
        state.lastChecks = checks;
        state.responses[q.id] = { user: text, checks };
        state.promptDoneCount++;
        state.status = "feedback";
        paint();
      }
      /**
       * Event handler for click and submit events. Uses event delegation.
       * @param {Event} e
       */
      function onEvent(e) {
        const target = e.target;
        if (!target) return;
        // Button actions
        if (e.type === "click" && target.tagName === "BUTTON") {
          const action = target.getAttribute("data-action");
          if (action === "start") {
            e.preventDefault();
            start();
            return;
          }
          if (action === "restart") {
            e.preventDefault();
            restart();
            return;
          }
          if (action === "retry") {
            e.preventDefault();
            start();
            return;
          }
          if (action === "next") {
            e.preventDefault();
            next();
            return;
          }
          if (action === "skip") {
            e.preventDefault();
            skip();
            return;
          }
        }
        // Form submissions
        if (e.type === "submit") {
          const form = target.closest("form[data-form='question']");
          if (!form) return;
          e.preventDefault();
          const q = state.questions[state.index];
          const qtype = form.getAttribute("data-qtype");
          if (qtype === "multipleChoice") {
            const choiceInput = form.querySelector("input[name='choice']:checked");
            if (choiceInput) handleMCQSubmit(q, choiceInput.value);
          } else if (qtype === "fillInTheBlank") {
            const blank = form.querySelector("input[name='blank']");
            if (blank) handleBlankSubmit(q, blank.value);
          } else if (qtype === "prompt") {
            const area = form.querySelector("textarea[name='response']");
            const text = area ? area.value : "";
            handlePromptSubmit(q, text);
          }
        }
      }
      host.addEventListener("click", onEvent);
      host.addEventListener("submit", onEvent);
    }
  });
})();