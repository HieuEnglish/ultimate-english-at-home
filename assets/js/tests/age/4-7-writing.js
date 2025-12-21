/* assets/js/tests/age/4-7-writing.js
   Runner: Ages 4–7 • Writing

   Loads the question bank (assets/data/tests-4-7-writing.js) and runs a
   simple, accessible, one-question-at-a-time writing practice.

   Supported question types:
   - multipleChoice
   - fillInTheBlank
   - prompt (free response; not auto-scored)
*/

(function () {
  "use strict";

  const SLUG = "age-4-7-writing";
  const BANK_SRC = "assets/data/tests-4-7-writing.js";

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

  function normalizeAnswerText(v) {
    return String(v == null ? "" : v)
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "")
      .replace(/[.!,?;:]/g, "");
  }

  function cloneQuestionWithShuffledOptions(q) {
    if (!isPlainObject(q)) return q;
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
      const existing = document.querySelector(`script[data-ueah-test-bank="${SLUG}"]`);
      if (existing) {
        if (window.UEAH_TEST_BANKS && Array.isArray(window.UEAH_TEST_BANKS[SLUG])) {
          resolve(true);
          return;
        }

        existing.addEventListener("load", () => resolve(true), { once: true });
        existing.addEventListener("error", () => reject(new Error("Failed to load test bank")), {
          once: true
        });
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

  // -----------------------------
  // UI renderers
  // -----------------------------

  function renderIntro() {
    return `
      <div class="note" style="margin-top:0">
        <strong>Ages 4–7 Writing</strong>
        <p style="margin:8px 0 0">Practice letters, spaces, and simple sentences.</p>
        <p style="margin:8px 0 0; opacity:.92">Tip: A caregiver can help with spelling. Focus on neat writing.</p>
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

  function renderPromptHint(q) {
    const model = q && q.model ? String(q.model) : "";
    if (!model.trim()) return "";

    return `
      <div class="note" style="margin:12px 0 0; padding:10px 12px">
        <strong>Example:</strong>
        <span style="font-size:18px; font-weight:900"> ${safeText(model)}</span>
      </div>
    `;
  }

  function renderMCQForm(q) {
    const prompt = safeText(q.question || "Question");
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
    const prompt = safeText(q.question || "Fill in the blank");

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
              maxlength="24"
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
    const prompt = safeText(q.question || "Write");

    return `
      ${renderPromptHint(q)}

      <form data-form="question" data-qtype="prompt" style="margin-top:12px">
        <fieldset style="border:1px solid var(--border); border-radius:16px; padding:14px; background: var(--surface2)">
          <legend style="padding:0 8px; font-weight:900">${prompt}</legend>

          <label style="display:block; margin-top:12px">
            <span class="sr-only">Your writing</span>
            <textarea
              name="response"
              rows="4"
              maxlength="200"
              style="width:100%; padding:12px 12px; border:1px solid var(--border); border-radius:14px; background: var(--surface); resize:vertical"
              placeholder="Type here (or write on paper)"
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

    let form = "";
    if (type === "prompt") form = renderPromptForm(q);
    else if (type === "fillintheblank") form = renderFillBlankForm(q);
    else form = renderMCQForm(q);

    return `${top}${form}`;
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
          <p style="margin:8px 0 0">You can try it again next time.</p>
        </div>

        <div class="actions" style="margin-top:12px">
          <button class="btn btn--primary" type="button" data-action="next">${nextLabel}</button>
        </div>
      `;
    }

    if (type === "prompt") {
      const userText = state.lastResponse != null ? String(state.lastResponse) : "";
      const model = q.model != null ? String(q.model) : "";
      const tip = q.explanation != null ? String(q.explanation) : "";

      return `
        <div style="display:flex; align-items:center; justify-content:space-between; gap:10px; flex-wrap:wrap">
          <div style="font-weight:800; color: var(--muted)">Question ${n} of ${total}</div>
          <button class="btn" type="button" data-action="restart" aria-label="Restart the test">Restart</button>
        </div>

        <div class="note" style="margin-top:12px" aria-live="polite">
          <strong>✍️ Writing practice saved</strong>
          <p style="margin:8px 0 0">This question is not auto-scored.</p>
          ${userText.trim() ? `<p style="margin:8px 0 0">You wrote: <strong>${safeText(userText)}</strong></p>` : ""}
          ${model.trim() ? `<p style="margin:8px 0 0">Example: <strong>${safeText(model)}</strong></p>` : ""}
          ${tip.trim() ? `<p style="margin:8px 0 0; opacity:.92"><strong>Tip:</strong> ${safeText(tip)}</p>` : ""}
        </div>

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

        return `
          <li style="display:flex; gap:10px; align-items:flex-start; padding:8px 0; border-bottom:1px solid var(--border)">
            <span aria-hidden="true">${safeText(status.split(" ")[0])}</span>
            <span style="min-width:0"><b>Q${i + 1}:</b> ${safeText(q.question || "")}
              ${type === "prompt" && r.user && String(r.user).trim() ? `<div style="margin-top:6px; color: var(--muted)">You wrote: ${safeText(r.user)}</div>` : ""}
            </span>
          </li>
        `;
      })
      .join("");

    return `
      <div class="note" style="margin-top:0">
        <strong>Finished!</strong>
        <p style="margin:8px 0 0">Objective score: <strong>${correct}</strong> / ${objectiveTotal} (${pct}%)</p>
        ${promptTotal ? `<p style="margin:8px 0 0">Writing prompts completed: <strong>${promptDone}</strong> / ${promptTotal}</p>` : ""}
        <p style="margin:8px 0 0">Tip: Repeat the test to practice again. The question order changes each time.</p>
      </div>

      <details style="margin-top:12px">
        <summary style="cursor:pointer; font-weight:900">Show answers</summary>
        <ul style="list-style:none; padding-left:0; margin:12px 0 0">
          ${rows}
        </ul>
      </details>

      <div class="actions" style="margin-top:12px">
        <button class="btn btn--primary" type="button" data-action="restart">Play again</button>
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
        objectiveTotal: 0,
        promptDoneCount: 0,
        lastChoice: null,
        lastBlank: "",
        lastResponse: "",
        lastIsCorrect: false,
        lastWasSkipped: false,
        lastError: "",
        responses: {} // q.id -> { user, correct?, skipped? }
      };

      function paint() {
        if (state.status === "intro") stage.innerHTML = renderIntro();
        else if (state.status === "loading") stage.innerHTML = renderLoading();
        else if (state.status === "question") stage.innerHTML = renderQuestionScreen(state);
        else if (state.status === "feedback") stage.innerHTML = renderFeedback(state);
        else if (state.status === "summary") stage.innerHTML = renderSummary(state);
        else if (state.status === "error") stage.innerHTML = renderError(state.lastError);
        else stage.innerHTML = renderIntro();
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
          shuffleInPlace(prepared);

          state.questions = prepared;
          state.index = 0;
          state.correctCount = 0;
          state.promptDoneCount = 0;
          state.lastChoice = null;
          state.lastBlank = "";
          state.lastResponse = "";
          state.lastIsCorrect = false;
          state.lastWasSkipped = false;
          state.responses = {};

          state.objectiveTotal = prepared.filter((q) => String(q.type || "").toLowerCase() !== "prompt").length;

          state.status = "question";
          paint();

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

      function restart() {
        state.status = "intro";
        state.questions = [];
        state.index = 0;
        state.correctCount = 0;
        state.objectiveTotal = 0;
        state.promptDoneCount = 0;
        state.lastChoice = null;
        state.lastBlank = "";
        state.lastResponse = "";
        state.lastIsCorrect = false;
        state.lastWasSkipped = false;
        state.lastError = "";
        state.responses = {};
        paint();
      }

      function next() {
        const total = state.questions.length;
        if (state.index + 1 >= total) {
          state.status = "summary";
          paint();
          return;
        }

        state.index += 1;
        state.lastChoice = null;
        state.lastBlank = "";
        state.lastResponse = "";
        state.lastIsCorrect = false;
        state.lastWasSkipped = false;
        state.status = "question";
        paint();

        setTimeout(() => {
          try {
            const el = host.querySelector("input, textarea, button");
            if (el && typeof el.focus === "function") el.focus();
          } catch (_) {}
        }, 0);
      }

      function markSkipped() {
        const q = state.questions[state.index];
        if (!q) return;

        state.lastWasSkipped = true;
        state.lastIsCorrect = false;
        state.lastChoice = null;
        state.lastBlank = "";
        state.lastResponse = "";

        state.responses[q.id] = { skipped: true, user: "" };

        state.status = "feedback";
        paint();
      }

      function gradeObjective(choiceIndex, blankText) {
        const q = state.questions[state.index];
        const type = String(q.type || "multipleChoice").toLowerCase();

        let ok = false;

        if (type === "fillintheblank") {
          const user = normalizeAnswerText(blankText);
          const ans = q.answer;

          if (Array.isArray(ans)) {
            ok = ans.some((a) => normalizeAnswerText(a) === user);
          } else {
            ok = normalizeAnswerText(ans) === user;
          }

          state.lastBlank = blankText != null ? String(blankText) : "";
          state.responses[q.id] = { user: state.lastBlank, correct: ok, skipped: false };
        } else {
          const chosen = Number(choiceIndex);
          if (!Number.isFinite(chosen)) return;

          state.lastChoice = chosen;
          ok = chosen === Number(q.answer);
          state.responses[q.id] = { user: String(chosen), correct: ok, skipped: false };
        }

        state.lastWasSkipped = false;
        state.lastIsCorrect = ok;
        if (ok) state.correctCount += 1;

        state.status = "feedback";
        paint();
      }

      function gradePrompt(text) {
        const q = state.questions[state.index];
        if (!q) return;

        state.lastWasSkipped = false;
        state.lastIsCorrect = false;
        state.lastResponse = text != null ? String(text) : "";
        state.promptDoneCount += 1;

        state.responses[q.id] = { user: state.lastResponse, skipped: false };

        state.status = "feedback";
        paint();
      }

      // Event delegation
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
        } else if (action === "skip") {
          ev.preventDefault();
          markSkipped();
        }
      });

      host.addEventListener("submit", (ev) => {
        const form = ev.target;
        if (!form || form.getAttribute("data-form") !== "question") return;

        ev.preventDefault();

        const q = state.questions[state.index];
        const type = String(q.type || "multipleChoice").toLowerCase();

        if (type === "prompt") {
          const ta = form.querySelector('textarea[name="response"]');
          const value = ta ? ta.value : "";
          gradePrompt(value);
          return;
        }

        if (type === "fillintheblank") {
          const input = form.querySelector('input[name="blank"]');
          const value = input ? input.value : "";
          gradeObjective(null, value);
          return;
        }

        const checked = form.querySelector('input[name="choice"]:checked');
        const val = checked ? checked.value : null;
        gradeObjective(val, null);
      });

      paint();
    }
  });
})();
