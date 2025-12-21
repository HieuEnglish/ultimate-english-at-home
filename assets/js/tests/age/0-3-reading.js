/* assets/js/tests/age/0-3-reading.js
   Runner: Ages 0–3 • Reading

   Loads the question bank (assets/data/tests-0-3-reading.js) and runs a
   simple, accessible, one-question-at-a-time quiz.
*/

(function () {
  "use strict";

  const SLUG = "age-0-3-reading";
  const BANK_SRC = "assets/data/tests-0-3-reading.js";

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

  // Bank loader (no build step)
  let bankPromise = null;

  function ensureBankLoaded(ctx) {
    // Already loaded?
    if (window.UEAH_TEST_BANKS && Array.isArray(window.UEAH_TEST_BANKS[SLUG])) {
      return Promise.resolve(true);
    }

    // In-flight?
    if (bankPromise) return bankPromise;

    const src = ctx && typeof ctx.assetHref === "function" ? ctx.assetHref(BANK_SRC) : BANK_SRC;

    bankPromise = new Promise((resolve, reject) => {
      // If a script with this src is already in the DOM, wait for it.
      const existing = document.querySelector(`script[data-ueah-test-bank="${SLUG}"]`);
      if (existing) {
        // If it already loaded, resolve.
        if (window.UEAH_TEST_BANKS && Array.isArray(window.UEAH_TEST_BANKS[SLUG])) {
          resolve(true);
          return;
        }

        // Otherwise, attach listeners (best effort)
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

  function safeText(v) {
    return String(v == null ? "" : v)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }

  function renderIntro() {
    return `
      <div class="note" style="margin-top:0">
        <strong>Ages 0–3 Reading</strong>
        <p style="margin:8px 0 0">Short, visual questions (letters + simple words). Tap an answer to continue.</p>
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

  function renderQuestionScreen(state) {
    const q = state.questions[state.index];
    const total = state.questions.length;
    const n = state.index + 1;

    const prompt = safeText(q.question || "Question");
    const options = Array.isArray(q.options) ? q.options : [];

    const optionButtons = options
      .map((opt, i) => {
        // Simple heuristic for emoji-like options (keeps compatibility across browsers)
        const isEmojiish = /[\u{1F300}-\u{1FAFF}]/u.test(String(opt));
        const big = isEmojiish ? "font-size:28px" : "font-size:22px; letter-spacing:.3px";
        return `
          <button
            class="btn"
            type="submit"
            name="choice"
            value="${i}"
            data-choice="${i}"
            style="justify-content:center; padding:14px 14px; min-height:54px"
            aria-label="Option ${i + 1}: ${safeText(opt)}"
          ><span style="${big}">${safeText(opt)}</span></button>
        `;
      })
      .join("");

    return `
      <div style="display:flex; align-items:center; justify-content:space-between; gap:10px; flex-wrap:wrap">
        <div style="font-weight:800; color: var(--muted)">Question ${n} of ${total}</div>
        <button class="btn" type="button" data-action="restart" aria-label="Restart the test">Restart</button>
      </div>

      <form data-form="question" style="margin-top:12px">
        <fieldset style="border:1px solid var(--border); border-radius:16px; padding:14px; background: var(--surface2)">
          <legend style="padding:0 8px; font-weight:900">${prompt}</legend>

          <div
            role="group"
            aria-label="Answer choices"
            style="display:grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap:10px; margin-top:12px"
          >
            ${optionButtons}
          </div>
        </fieldset>
      </form>
    `;
  }

  function renderFeedback(state) {
    const q = state.questions[state.index];
    const chosen = state.lastChoice;
    const correct = Number(q.answer);
    const ok = chosen === correct;
    const total = state.questions.length;
    const n = state.index + 1;

    const correctText = Array.isArray(q.options) ? q.options[correct] : "";
    const chosenText = Array.isArray(q.options) ? q.options[chosen] : "";

    const nextLabel = n >= total ? "Finish" : "Next";
    const icon = ok ? "✅" : "❌";

    return `
      <div style="display:flex; align-items:center; justify-content:space-between; gap:10px; flex-wrap:wrap">
        <div style="font-weight:800; color: var(--muted)">Question ${n} of ${total}</div>
        <button class="btn" type="button" data-action="restart" aria-label="Restart the test">Restart</button>
      </div>

      <div class="note" style="margin-top:12px" aria-live="polite">
        <strong>${icon} ${ok ? "Nice!" : "Almost!"}</strong>
        <p style="margin:8px 0 0">
          ${ok ? "Good job." : `The correct answer is: <strong>${safeText(correctText)}</strong>.`}
        </p>
        ${
          ok
            ? ""
            : `<p style="margin:8px 0 0; opacity:.9">You chose: <strong>${safeText(chosenText)}</strong></p>`
        }
      </div>

      <div class="actions" style="margin-top:12px">
        <button class="btn btn--primary" type="button" data-action="next">${nextLabel}</button>
      </div>
    `;
  }

  function renderSummary(state) {
    const total = state.questions.length;
    const correct = state.correctCount;
    const pct = total ? Math.round((correct / total) * 100) : 0;

    return `
      <div class="note" style="margin-top:0">
        <strong>Finished!</strong>
        <p style="margin:8px 0 0">Score: <strong>${correct}</strong> / ${total} (${pct}%)</p>
        <p style="margin:8px 0 0">Tip: Repeat the test to practice the letters and words again.</p>
      </div>
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

      // Prevent double-init if the user navigates away/back quickly.
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
        lastError: ""
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

          if (!bank.length) {
            throw new Error("Missing question bank.");
          }

          // Randomize: shuffle question order and shuffle options within each question.
          const prepared = bank.map(cloneQuestionWithShuffledOptions);
          shuffleInPlace(prepared);

          state.questions = prepared;
          state.index = 0;
          state.correctCount = 0;
          state.lastChoice = null;
          state.status = "question";
          paint();
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
        state.lastChoice = null;
        state.lastError = "";
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
        state.status = "question";
        paint();
      }

      function choose(choiceIndex) {
        const q = state.questions[state.index];
        const chosen = Number(choiceIndex);
        if (!Number.isFinite(chosen)) return;

        state.lastChoice = chosen;
        if (chosen === Number(q.answer)) {
          state.correctCount += 1;
        }
        state.status = "feedback";
        paint();
      }

      // Event delegation (stage content gets re-rendered)
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
        }
      });

      host.addEventListener("submit", (ev) => {
        const form = ev.target;
        if (!form || form.getAttribute("data-form") !== "question") return;

        ev.preventDefault();
        const submitter = ev.submitter || document.activeElement;
        const raw = submitter && submitter.value != null ? submitter.value : null;
        choose(raw);
      });

      paint();
    }
  });
})();
