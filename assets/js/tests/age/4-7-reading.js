/* assets/js/tests/age/4-7-reading.js
   Runner: Ages 4–7 • Reading

   Loads the question bank (assets/data/tests-4-7-reading.js) and runs a
   simple, accessible, one-question-at-a-time quiz.

   Supported question types:
   - multipleChoice
   - trueFalse
   - fillInTheBlank

   Update:
   - Adds a final summary report (per-question review).
   - Adds "Save score to Profile" using the shared helper (window.UEAH_SAVE_SCORE).
   - Adds per-run cap (bank is a pool; each run uses a short randomized subset).
*/

(function () {
  "use strict";

  const SLUG = "age-4-7-reading";
  const BANK_SRC = "assets/data/tests-4-7-reading.js";
  const MAX_QUESTIONS_PER_RUN = 12;

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

  function nowIso() {
    return new Date().toISOString();
  }

  function normalizeAnswerText(v) {
    return String(v == null ? "" : v)
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "");
  }

  function normalizeDifficulty(v) {
    const d = String(v || "").trim().toLowerCase();
    if (d === "easy" || d === "medium" || d === "hard") return d;
    return "";
  }

  function computeDifficultyBreakdown(questions, reviewRows) {
    const qs = Array.isArray(questions) ? questions : [];
    const rows = Array.isArray(reviewRows) ? reviewRows : [];

    const byIndex = Object.create(null);
    rows.forEach((r) => {
      const n = Number(r && r.number);
      if (Number.isFinite(n) && n >= 1) byIndex[n - 1] = !!r.isCorrect;
    });

    const out = {
      easy: { total: 0, correct: 0 },
      medium: { total: 0, correct: 0 },
      hard: { total: 0, correct: 0 },
      unknown: { total: 0, correct: 0 }
    };

    qs.forEach((q, idx) => {
      const d = normalizeDifficulty(q && q.difficulty);
      const key = d || "unknown";
      out[key].total += 1;
      if (byIndex[idx]) out[key].correct += 1;
    });

    const compact = Object.create(null);
    Object.keys(out).forEach((k) => {
      if (out[k].total > 0) compact[k] = out[k];
    });
    return compact;
  }

  function computeTypeBreakdown(questions, reviewRows) {
    const qs = Array.isArray(questions) ? questions : [];
    const rows = Array.isArray(reviewRows) ? reviewRows : [];

    const byIndex = Object.create(null);
    rows.forEach((r) => {
      const n = Number(r && r.number);
      if (Number.isFinite(n) && n >= 1) byIndex[n - 1] = !!r.isCorrect;
    });

    const out = Object.create(null);
    qs.forEach((q, idx) => {
      const t = String(q && q.type ? q.type : "unknown").trim() || "unknown";
      if (!out[t]) out[t] = { total: 0, correct: 0 };
      out[t].total += 1;
      if (byIndex[idx]) out[t].correct += 1;
    });

    return out;
  }

  function cloneQuestionWithShuffledOptions(q) {
    if (!isPlainObject(q)) return q;

    const t = String(q.type || "multipleChoice");

    // Only shuffle options when options+numeric answer exist (MCQ / TF).
    if (!Array.isArray(q.options)) return { ...q };
    if (typeof q.answer !== "number") return { ...q };

    const pairs = q.options.map((text, idx) => ({ text, idx }));
    shuffleInPlace(pairs);

    const newOptions = pairs.map((p) => p.text);
    const newAnswer = pairs.findIndex((p) => p.idx === q.answer);

    return { ...q, type: t, options: newOptions, answer: newAnswer };
  }

  function typeLabel(q) {
    const t = String(q && q.type ? q.type : "multipleChoice");
    if (t === "fillInTheBlank") return "Fill in the blank";
    if (t === "trueFalse") return "True / False";
    return "Multiple choice";
  }

  function answerTextForBlank(ans) {
    if (Array.isArray(ans)) return ans.map((a) => String(a)).join(" / ");
    return ans == null ? "" : String(ans);
  }

  function optionAt(q, idx) {
    if (!q || !Array.isArray(q.options)) return "";
    const n = Number(idx);
    if (!Number.isFinite(n)) return "";
    return q.options[n] == null ? "" : String(q.options[n]);
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
        <strong>Ages 4–7 Reading</strong>
        <p style="margin:8px 0 0">Short reading questions: words, sentences, and tiny stories.</p>
        <p style="margin:8px 0 0; opacity:.92">Tip: Say the words out loud, then choose the best answer.</p>
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

    const qid = q && q.id != null ? String(q.id) : "q";
    const optionsHtml = options
      .map((opt, i) => {
        const id = `opt-${SLUG}-${qid}-${i}`;
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

  function renderQuestionScreen(state) {
    const q = state.questions[state.index];

    const top = renderTopBar(state);
    const passage = renderPassage(q);

    const type = String(q.type || "multipleChoice");
    const form = type === "fillInTheBlank" ? renderFillBlankForm(q) : renderMCQForm(q);

    return `${top}${passage}${form}`;
  }

  function renderFeedback(state) {
    const q = state.questions[state.index];
    const total = state.questions.length;
    const n = state.index + 1;

    const ok = !!state.lastIsCorrect;
    const icon = ok ? "✅" : "❌";
    const nextLabel = n >= total ? "Finish" : "Next";

    let detailHtml = "";

    const type = String(q.type || "multipleChoice");

    if (type === "fillInTheBlank") {
      const correctText = answerTextForBlank(q.answer);
      const chosenText = state.lastBlank != null ? String(state.lastBlank) : "";

      detailHtml = ok
        ? `<p style="margin:8px 0 0">Correct.</p>`
        : `<p style="margin:8px 0 0">Correct answer: <strong>${safeText(correctText)}</strong></p>
           <p style="margin:8px 0 0; opacity:.92">You typed: <strong>${safeText(chosenText || "(blank)")}</strong></p>`;
    } else {
      const correctIdx = Number(q.answer);
      const chosenIdx = Number(state.lastChoice);

      const correctText = optionAt(q, correctIdx);
      const chosenText = optionAt(q, chosenIdx);

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
        const passage = r.passage ? `<div style="opacity:.95; margin-top:6px">${safeText(r.passage)}</div>` : "";
        return `
          <tr>
            <td style="padding:10px 10px; border-top:1px solid var(--border); font-weight:800; white-space:nowrap">${safeText(
              r.number
            )}</td>
            <td style="padding:10px 10px; border-top:1px solid var(--border)">
              <div style="font-weight:900">${safeText(r.typeLabel)}</div>
              <div style="margin-top:6px">${safeText(r.question || "")}</div>
              ${passage}
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
        <p style="margin:8px 0 0">Tip: Repeat the test to practice again. The question order changes each time.</p>
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

      // Prevent double-init if navigating away/back quickly.
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
        lastIsCorrect: false,
        lastError: "",
        review: [], // per-question report rows
        savedMsg: ""
      };

      function resetRunState() {
        state.questions = [];
        state.index = 0;
        state.correctCount = 0;
        state.lastChoice = null;
        state.lastBlank = "";
        state.lastIsCorrect = false;
        state.lastError = "";
        state.review = [];
        state.savedMsg = "";
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
        state.status = "loading";
        state.lastError = "";
        state.review = [];
        state.savedMsg = "";
        paint();

        try {
          await ensureBankLoaded(ctx);

          const bank =
            window.UEAH_TEST_BANKS && Array.isArray(window.UEAH_TEST_BANKS[SLUG])
              ? window.UEAH_TEST_BANKS[SLUG]
              : [];

          if (!bank.length) throw new Error("Missing question bank.");

          // Randomize:
          // - Shuffle question order
          // - Shuffle options within MCQ/TF questions
          const prepared = bank.map(cloneQuestionWithShuffledOptions);
          shuffleInPlace(prepared);

          // Per-run cap: use a short subset after shuffle
          const picked = prepared.slice(0, Math.min(MAX_QUESTIONS_PER_RUN, prepared.length));

          state.questions = picked;
          state.index = 0;
          state.correctCount = 0;
          state.lastChoice = null;
          state.lastBlank = "";
          state.lastIsCorrect = false;
          state.review = [];
          state.savedMsg = "";

          state.status = "question";
          paint();

          setTimeout(() => {
            try {
              const el = host.querySelector("input, button");
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
        resetRunState();
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
        state.lastIsCorrect = false;
        state.status = "question";
        paint();
      }

      function recordReviewRow(q, ok, chosenIdx, blankText) {
        const t = String(q && q.type ? q.type : "multipleChoice");

        let chosenText = "";
        let correctText = "";

        if (t === "fillInTheBlank") {
          chosenText = blankText != null && String(blankText).trim() ? String(blankText) : "(blank)";
          correctText = answerTextForBlank(q ? q.answer : "");
        } else {
          const correctIdx = Number(q && q.answer);
          chosenText = optionAt(q, chosenIdx) || "(none)";
          correctText = optionAt(q, correctIdx) || "(not set)";
        }

        state.review.push({
          number: state.index + 1,
          typeLabel: typeLabel(q),
          question: q && q.question ? String(q.question) : "",
          passage: q && q.passage ? String(q.passage) : "",
          difficulty: q && q.difficulty ? String(q.difficulty) : "",
          chosenText,
          correctText,
          isCorrect: !!ok
        });
      }

      function grade(choiceIndex, blankText) {
        const q = state.questions[state.index];
        if (!q) return;

        // Prevent double-answering
        if (state.status !== "question") return;

        const t = String(q.type || "multipleChoice");
        let ok = false;

        if (t === "fillInTheBlank") {
          const user = normalizeAnswerText(blankText);
          const ans = q.answer;

          if (Array.isArray(ans)) ok = ans.some((a) => normalizeAnswerText(a) === user);
          else ok = normalizeAnswerText(ans) === user;

          state.lastBlank = blankText != null ? String(blankText) : "";
          recordReviewRow(q, ok, null, state.lastBlank);
        } else {
          const chosen = Number(choiceIndex);
          if (!Number.isFinite(chosen)) return;

          state.lastChoice = chosen;
          ok = chosen === Number(q.answer);

          recordReviewRow(q, ok, chosen, null);
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

        const total = state.questions.length;
        const correct = state.correctCount;
        const percent = total ? (correct / total) * 100 : 0;

        const payload = {
          slug: SLUG,
          ageGroup: "4-7",
          skill: "reading",
          at: nowIso(),

          questions: Array.isArray(state.questions) ? state.questions : [],
          review: Array.isArray(state.review) ? state.review : [],

          rawCorrect: correct,
          totalQuestions: total,
          percent: Math.round(percent),
          difficultyBreakdown: computeDifficultyBreakdown(state.questions, state.review),
          typeBreakdown: computeTypeBreakdown(state.questions, state.review)
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
        } else if (action === "save-score") {
          ev.preventDefault();
          saveScoreToProfile();
        }
      });

      host.addEventListener("submit", (ev) => {
        const form = ev.target;
        if (!form || form.getAttribute("data-form") !== "question") return;

        ev.preventDefault();

        const q = state.questions[state.index];
        const t = String(q.type || "multipleChoice");

        if (t === "fillInTheBlank") {
          const input = form.querySelector('input[name="blank"]');
          const value = input ? input.value : "";
          grade(null, value);
          return;
        }

        const checked = form.querySelector('input[name="choice"]:checked');
        const val = checked ? checked.value : null;
        grade(val, null);
      });

      paint();
    }
  });
})();
