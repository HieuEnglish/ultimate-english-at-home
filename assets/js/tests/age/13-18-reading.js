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
   - Shuffles options within MCQ/TF questions (when options exist)
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

  // -----------------------------
  // Helpers
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
      .replace(/[.,!?;:"'()]/g, "")
      .replace(/\s+/g, "");
  }

  function formatTime(sec) {
    const s = Math.max(0, Math.floor(sec));
    const m = Math.floor(s / 60);
    const r = s % 60;
    return `${String(m).padStart(2, "0")}:${String(r).padStart(2, "0")}`;
  }

  function getType(q) {
    return String(q && q.type ? q.type : "multipleChoice");
  }

  function passageIdOf(q) {
    const pid = String((q && q.passageId) || "").toLowerCase();
    if (pid === "p2") return "p2";
    if (pid === "p3") return "p3";
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
    if (typeof answer === "number" && Number.isFinite(answer)) return answer;
    if (typeof answer === "boolean") return answer ? 0 : 1;
    const s = normalizeAnswerText(answer);
    if (!s) return null;
    if (s === "true" || s === "t" || s === "yes" || s === "y") return 0;
    if (s === "false" || s === "f" || s === "no" || s === "n") return 1;
    return null;
  }

  function correctTextForBlank(ans) {
    if (Array.isArray(ans)) return ans.filter((x) => x != null).map(String).join(" / ");
    return ans == null ? "" : String(ans);
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
    const prompt = safeText((q && q.question) || "Question");
    const options = getOptionsForQuestion(q);

    const optionsHtml = options
      .map((opt, i) => {
        const id = `opt-${SLUG}-${q && q.id ? q.id : "q"}-${i}`;
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
    const prompt = safeText((q && q.question) || "Fill in the blank");
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
    const icon = ok ? "✅" : "❌";

    const type = String(getType(q)).toLowerCase();
    const pid = passageIdOf(q);

    let correctText = "";
    let chosenText = "";

    if (type === "fillintheblank") {
      correctText = correctTextForBlank(q.answer) || "(not set)";
      chosenText = state.lastBlank != null && String(state.lastBlank).trim() ? String(state.lastBlank) : "(blank)";
    } else {
      const correctIdx =
        type === "truefalse" ? deriveTrueFalseIndex(q.answer) : typeof q.answer === "number" ? q.answer : null;
      correctText = optionAt(q, correctIdx) || "(not set)";
      chosenText = optionAt(q, state.lastChoice) || "(none)";
    }

    const expl = q && q.explanation ? String(q.explanation).trim() : "";

    const nextLabel = state.index + 1 >= state.questions.length ? "Finish" : "Next";

    return `
      ${renderTopBar(state)}

      <div class="note" style="margin-top:12px" aria-live="polite">
        <strong>${icon} ${ok ? "Correct" : "Not quite"}</strong>
        <p style="margin:8px 0 0; opacity:.92">${safeText(passageLabel(pid))} • ${safeText(typeLabel(q))}</p>
        <p style="margin:10px 0 0"><span style="font-weight:900">Correct:</span> ${safeText(correctText)}</p>
        ${
          ok
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
        const icon = r.isCorrect ? "✅" : "❌";
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
            <caption style="text-align:left; padding:12px 12px 0; font-weight:900; color: var(--muted)">
              Per-question report
            </caption>
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

    return `
      <div class="note" style="margin-top:0">
        <strong>Finished</strong>
        <p style="margin:8px 0 0">Score: <span style="font-weight:900">${score}</span> / ${total} (${pct}%)</p>
        <p style="margin:8px 0 0; opacity:.92">Time remaining: ${formatTime(state.timeRemaining)}</p>
      </div>

      ${renderReview(state)}

      <div class="actions" style="margin-top:12px">
        <button class="btn btn--primary" type="button" data-action="restart">Restart</button>
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
        timeRemaining: TIME_LIMIT_SEC,
        timerId: null,
        lastIsCorrect: false,
        lastChoice: null,
        lastBlank: "",
        lastError: "",
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

          // Update the timer chip without rerendering the full UI.
          const chip = host.querySelector('[aria-label="Time remaining"]');
          if (chip) chip.textContent = formatTime(state.timeRemaining);
        }, 1000);
      }

      function recordReviewRow(q, ok, chosenIdx, blankText) {
        const t = String(getType(q)).toLowerCase();
        const pid = passageIdOf(q);

        let chosenText = "";
        let correctText = "";

        if (t === "fillintheblank") {
          chosenText = blankText != null && String(blankText).trim() ? String(blankText) : "(blank)";
          correctText = correctTextForBlank(q && q.answer) || "(not set)";
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
          passage: passageLabel(pid),
          typeLabel: typeLabel(q),
          question: q && q.question ? String(q.question) : "",
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
        paint();

        try {
          await ensureBankLoaded(ctx);

          const bank =
            window.UEAH_TEST_BANKS && Array.isArray(window.UEAH_TEST_BANKS[SLUG])
              ? window.UEAH_TEST_BANKS[SLUG]
              : [];

          if (!bank.length) throw new Error("Missing question bank.");

          const prepared = bank.map(cloneQuestionWithShuffledOptions);

          // Group by passage, shuffle within passage, then take a capped subset per passage (p1->p2->p3).
          const groups = { p1: [], p2: [], p3: [] };

          prepared.forEach((q) => {
            const pid = passageIdOf(q);
            groups[pid].push(q);
          });

          const chosen = [];
          ["p1", "p2", "p3"].forEach((pid) => {
            const arr = groups[pid] || [];
            shuffleInPlace(arr);
            chosen.push(...arr.slice(0, Math.min(MAX_PER_PASSAGE, arr.length)));
          });

          if (!chosen.length) throw new Error("No questions were selected from the bank.");

          state.questions = chosen;
          state.index = 0;
          state.correctCount = 0;
          state.timeRemaining = TIME_LIMIT_SEC;
          state.lastIsCorrect = false;
          state.lastChoice = null;
          state.lastBlank = "";
          state.lastError = "";
          state.review = [];

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
        state.lastChoice = null;
        state.lastBlank = "";
        state.lastError = "";
        state.review = [];
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
        state.lastChoice = null;
        state.lastBlank = "";
        state.status = "question";
        paint();
      }

      function grade(choiceIndex, blankText) {
        const q = state.questions[state.index];
        if (!q) return;

        // Prevent double-answering.
        if (state.status !== "question") return;

        const t = String(getType(q)).toLowerCase();
        let ok = false;

        if (t === "fillintheblank") {
          const user = normalizeAnswerText(blankText);
          const ans = q.answer;

          if (Array.isArray(ans)) ok = ans.some((x) => normalizeAnswerText(x) === user);
          else ok = normalizeAnswerText(ans) === user;

          state.lastBlank = blankText != null ? String(blankText) : "";
          recordReviewRow(q, ok, null, state.lastBlank);
        } else {
          const chosen = Number(choiceIndex);
          if (!Number.isFinite(chosen)) return;

          state.lastChoice = chosen;

          if (t === "truefalse") {
            const correctIdx = deriveTrueFalseIndex(q.answer);
            ok = correctIdx != null ? chosen === correctIdx : chosen === Number(q.answer);
          } else if (typeof q.answer === "number" && Number.isFinite(q.answer)) {
            ok = chosen === q.answer;
          } else {
            // Fallback: compare chosen option text to string answer (if provided).
            const chosenText = normalizeAnswerText(optionAt(q, chosen));
            const ansText = normalizeAnswerText(q.answer);
            ok = !!chosenText && !!ansText && chosenText === ansText;
          }

          recordReviewRow(q, ok, chosen, null);
        }

        state.lastIsCorrect = ok;
        if (ok) state.correctCount += 1;

        state.status = "feedback";
        paint();
      }

      // Stop timer when leaving the route (best effort).
      window.addEventListener(
        "popstate",
        () => {
          stopTimer();
        },
        { passive: true }
      );

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
