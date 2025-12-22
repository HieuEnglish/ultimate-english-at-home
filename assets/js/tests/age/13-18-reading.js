/* assets/js/tests/age/13-18-reading.js
   Runner: Ages 13-18 Reading (IELTS-inspired)
*/

(function () {
  "use strict";

  const SLUG = "age-13-18-reading";
  const BANK_SRC = "assets/data/tests-13-18-reading.js";

  // Easier than IELTS but similar structure.
  const TIME_LIMIT_SEC = 45 * 60;
  const MAX_PER_PASSAGE = 8;

  const store = window.UEAH_TESTS_STORE;
  if (!store || typeof store.registerRunner !== "function") return;

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
      .replace(/[.,!?;:"'()]/g, "")
      .replace(/\s+/g, "");
  }

  function cloneQuestionWithShuffledOptions(q) {
    if (!q || typeof q !== "object" || Array.isArray(q)) return q;
    if (!Array.isArray(q.options) || typeof q.answer !== "number") return { ...q };

    const pairs = q.options.map((text, idx) => ({ text, idx }));
    shuffleInPlace(pairs);

    const newOptions = pairs.map((p) => p.text);
    const newAnswer = pairs.findIndex((p) => p.idx === q.answer);

    return { ...q, options: newOptions, answer: newAnswer };
  }

  function formatTime(sec) {
    const s = Math.max(0, Math.floor(sec));
    const m = Math.floor(s / 60);
    const r = s % 60;
    return `${String(m).padStart(2, "0")}:${String(r).padStart(2, "0")}`;
  }

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

  function renderIntro() {
    return `
      <div class="note" style="margin-top:0">
        <strong>Ages 13-18 Reading</strong>
        <p style="margin:8px 0 0">IELTS-inspired reading practice: 3 passages with mixed question types.</p>
        <p style="margin:8px 0 0; opacity:.92">Recommended time: 45 minutes. Tip: skim, then scan for keywords.</p>
      </div>
      <div class="actions" style="margin-top:12px">
        <button class="btn btn--primary" type="button" data-action="start">Start</button>
      </div>
    `;
  }

  function renderLoading() {
    return `
      <div class="note" style="margin-top:0">
        <strong>Loading...</strong>
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

  function passageLabel(passageId) {
    const id = String(passageId || "").toLowerCase();
    if (id === "p1") return "Passage 1";
    if (id === "p2") return "Passage 2";
    if (id === "p3") return "Passage 3";
    return "Passage";
  }

  function renderTopBar(state) {
    const total = state.questions.length;
    const n = Math.min(state.index + 1, total);
    const q = state.questions[state.index] || {};
    return `
      <div style="display:flex; align-items:center; justify-content:space-between; gap:10px; flex-wrap:wrap">
        <div style="display:flex; align-items:center; gap:10px; flex-wrap:wrap">
          <div style="font-weight:800; color: var(--muted)">${passageLabel(q.passageId)} • Question ${n} of ${total}</div>
          <div class="chip" aria-label="Time remaining" style="font-weight:900">${formatTime(state.timeRemaining)}</div>
        </div>
        <button class="btn" type="button" data-action="restart" aria-label="Restart the test">Restart</button>
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
      <form data-form="question" style="margin-top:12px">
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
      <form data-form="question" style="margin-top:12px">
        <fieldset style="border:1px solid var(--border); border-radius:16px; padding:14px; background: var(--surface2)">
          <legend style="padding:0 8px; font-weight:900">${prompt}</legend>
          <label style="display:block; margin-top:12px; font-weight:700">Your answer</label>
          <input type="text" name="blank" required autocomplete="off" style="width:100%; margin-top:8px" placeholder="Type your answer" />
          <div class="actions" style="margin-top:12px">
            <button class="btn btn--primary" type="submit">Submit</button>
          </div>
        </fieldset>
      </form>
    `;
  }

  function renderQuestionScreen(state) {
    const q = state.questions[state.index];
    if (!q) return renderError("Missing question");
    const type = String(q.type || "multipleChoice");
    const formHtml = type === "fillInTheBlank" ? renderFillBlankForm(q) : renderMCQForm(q);
    return `
      ${renderTopBar(state)}
      ${renderPassage(q)}
      ${formHtml}
    `;
  }

  function renderFeedback(state) {
    const q = state.questions[state.index];
    const ok = !!state.lastIsCorrect;

    let correctText = "";
    if (q && Array.isArray(q.options) && typeof q.answer === "number") {
      correctText = q.options[q.answer] != null ? String(q.options[q.answer]) : "";
    } else if (q) {
      const ans = q.answer;
      correctText = Array.isArray(ans) ? String(ans[0] || "") : String(ans || "");
    }

    const expl = q && q.explanation ? String(q.explanation) : "";

    return `
      ${renderTopBar(state)}
      <div class="note" style="margin-top:12px">
        <strong>${ok ? "Correct" : "Not quite"}</strong>
        <p style="margin:8px 0 0"><span style="font-weight:800">Correct answer:</span> ${safeText(correctText)}</p>
        ${expl ? `<p style="margin:8px 0 0; opacity:.95">${safeText(expl)}</p>` : ""}
      </div>
      <div class="actions" style="margin-top:12px">
        <button class="btn btn--primary" type="button" data-action="next">Next</button>
      </div>
    `;
  }

  function renderSummary(state) {
    const total = state.questions.length;
    const score = state.correctCount;
    const pct = total ? Math.round((score / total) * 100) : 0;
    return `
      <div class="note" style="margin-top:0">
        <strong>Finished</strong>
        <p style="margin:8px 0 0">Score: <span style="font-weight:900">${score}</span> / ${total} (${pct}%)</p>
        <p style="margin:8px 0 0; opacity:.92">Time remaining: ${formatTime(state.timeRemaining)}</p>
      </div>
      <div class="actions" style="margin-top:12px">
        <button class="btn btn--primary" type="button" data-action="restart">Restart</button>
      </div>
    `;
  }

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
        status: "intro",
        questions: [],
        index: 0,
        correctCount: 0,
        timeRemaining: TIME_LIMIT_SEC,
        timerId: null,
        lastIsCorrect: false,
        lastError: ""
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
          } else {
            // refresh timer chip
            const chip = host.querySelector('[aria-label="Time remaining"]');
            if (chip) chip.textContent = formatTime(state.timeRemaining);
          }
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

      async function start() {
        stopTimer();
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

          const groups = { p1: [], p2: [], p3: [] };
          prepared.forEach((q) => {
            const pid = String(q.passageId || "").toLowerCase();
            if (pid === "p2") groups.p2.push(q);
            else if (pid === "p3") groups.p3.push(q);
            else groups.p1.push(q);
          });

          const chosen = [];
          ["p1", "p2", "p3"].forEach((pid) => {
            const arr = groups[pid] || [];
            shuffleInPlace(arr);
            chosen.push(...arr.slice(0, Math.min(MAX_PER_PASSAGE, arr.length)));
          });

          state.questions = chosen;
          state.index = 0;
          state.correctCount = 0;
          state.timeRemaining = TIME_LIMIT_SEC;
          state.lastIsCorrect = false;

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
        state.lastError = "";
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
        state.status = "question";
        paint();
      }

      function grade(choiceIndex, blankText) {
        const q = state.questions[state.index];
        const type = String(q.type || "multipleChoice");

        let ok = false;
        if (type === "fillInTheBlank") {
          const user = normalizeAnswerText(blankText);
          const ans = q.answer;
          ok = Array.isArray(ans)
            ? ans.some((x) => normalizeAnswerText(x) === user)
            : normalizeAnswerText(ans) === user;
        } else {
          ok = Number(choiceIndex) === Number(q.answer);
        }

        state.lastIsCorrect = ok;
        if (ok) state.correctCount += 1;

        state.status = "feedback";
        paint();
      }

      paint();

      host.addEventListener("click", (e) => {
        const btn = e.target && e.target.closest ? e.target.closest("[data-action]") : null;
        if (!btn) return;
        const action = btn.getAttribute("data-action");
        if (action === "start" || action === "retry") start();
        else if (action === "restart") restart();
        else if (action === "next") next();
      });

      host.addEventListener("submit", (e) => {
        const form = e.target;
        if (!form || !form.matches || !form.matches('[data-form="question"]')) return;
        e.preventDefault();

        const q = state.questions[state.index];
        if (!q) return;

        if (String(q.type) === "fillInTheBlank") {
          const input = form.querySelector('input[name="blank"]');
          grade(null, input ? input.value : "");
          return;
        }

        const checked = form.querySelector('input[name="choice"]:checked');
        if (!checked) return;
        grade(Number(checked.value), "");
      });
    }
  });
})();
