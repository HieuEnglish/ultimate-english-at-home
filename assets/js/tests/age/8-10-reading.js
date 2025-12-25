/* assets/js/tests/age/8-10-reading.js
   Runner: Ages 8–10 • Reading

   Loads the question bank (assets/data/tests-8-10-reading.js) and runs a
   simple, accessible, one-question-at-a-time quiz.

   Supported question types:
   - multipleChoice
   - trueFalse
   - fillInTheBlank

   Randomization:
   - Shuffles question order on start
   - Shuffles options within MCQ/TF questions

   Updates:
   - Ensures stable ids (fallback id if missing)
   - Robust bank loader (handles existing script + validates after load tick)
   - Adds Retry on error
   - Prevents double-submit grading
   - Adds a final summary report (per-question review)
   - Optional "Save score to Profile" via window.UEAH_SAVE_SCORE.save (if available)
*/

(function () {
  "use strict";

  const SLUG = "age-8-10-reading";
  const BANK_SRC = "assets/data/tests-8-10-reading.js";
  const MAX_QUESTIONS = 15;

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
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function nowIso() {
    return new Date().toISOString();
  }

  function normalizeAnswerText(v) {
    return String(v == null ? "" : v)
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "")
      .replace(/[.!,?;:]/g, "");
  }

  function ensureIds(qs) {
    return qs.map((q, idx) => {
      if (!isPlainObject(q)) return q;
      const id = q.id != null && String(q.id).trim() ? String(q.id).trim() : `${SLUG}::idx-${idx}`;
      return { ...q, id };
    });
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

  function questionTypeLabel(q) {
    const t = String(q && q.type ? q.type : "multipleChoice").toLowerCase();
    if (t === "fillintheblank") return "Fill in the blank";
    if (t === "truefalse") return "True / False";
    return "Multiple choice";
  }

  function coerceTrueFalse(q) {
    // Ensure TF has options + numeric answer index
    if (!isPlainObject(q)) return q;
    const t = String(q.type || "").toLowerCase();
    if (t !== "truefalse") return q;

    const options = Array.isArray(q.options) && q.options.length ? q.options : ["True", "False"];

    let ans = q.answer;
    if (typeof ans === "boolean") ans = ans ? 0 : 1;
    else if (typeof ans === "string") {
      const s = ans.trim().toLowerCase();
      if (s === "true") ans = 0;
      else if (s === "false") ans = 1;
    }

    return { ...q, options, answer: ans };
  }

  function cloneQuestionWithShuffledOptions(q) {
    if (!isPlainObject(q)) return q;

    const base = coerceTrueFalse({ ...q });

    if (!Array.isArray(base.options)) return base;
    if (typeof base.answer !== "number") return base;

    const pairs = base.options.map((text, idx) => ({ text, idx }));
    shuffleInPlace(pairs);

    const newOptions = pairs.map((p) => p.text);
    const newAnswer = pairs.findIndex((p) => p.idx === base.answer);

    return { ...base, options: newOptions, answer: newAnswer };
  }

  function computeDifficultyBreakdown(questions, reviewRows) {
    // Optional: if q.difficulty exists, aggregate correctness counts.
    const out = Object.create(null);
    const qs = Array.isArray(questions) ? questions : [];
    const rows = Array.isArray(reviewRows) ? reviewRows : [];

    qs.forEach((q, i) => {
      const d = String(q && q.difficulty ? q.difficulty : "")
        .trim()
        .toLowerCase();
      if (!d) return;

      if (!out[d]) out[d] = { correct: 0, total: 0 };
      out[d].total += 1;

      const r = rows[i];
      if (r && r.isCorrect) out[d].correct += 1;
    });

    return out;
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
        // Let already-present script execute (best-effort), then validate.
        setTimeout(() => {
          if (window.UEAH_TEST_BANKS && Array.isArray(window.UEAH_TEST_BANKS[SLUG])) resolve(true);
          else reject(new Error("Missing question bank."));
        }, 0);
        return;
      }

      const s = document.createElement("script");
      s.defer = true;
      s.async = true;
      s.src = src;
      s.setAttribute("data-ueah-test-bank", SLUG);
      s.onload = () => {
        setTimeout(() => {
          if (window.UEAH_TEST_BANKS && Array.isArray(window.UEAH_TEST_BANKS[SLUG])) resolve(true);
          else reject(new Error("Missing question bank."));
        }, 0);
      };
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
        <strong>Ages 8–10 Reading</strong>
        <p style="margin:8px 0 0">Read short texts and answer questions about meaning, details, and vocabulary.</p>
        <p style="margin:8px 0 0; opacity:.92">Tip: Read the passage once, then look back to find the answer.</p>
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

  function renderQuestionScreen(state) {
    const q = state.questions[state.index];

    const top = renderTopBar(state);
    const passage = renderPassage(q);

    const type = String(q.type || "multipleChoice").toLowerCase();
    const form = type === "fillintheblank" ? renderFillBlankForm(q) : renderMCQForm(q);

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

    const type = String(q.type || "multipleChoice").toLowerCase();

    if (type === "fillintheblank") {
      const correctText = answerTextForBlank(q.answer);
      const chosenText = state.lastBlank != null ? String(state.lastBlank) : "";

      detailHtml = ok
        ? `<p style="margin:8px 0 0">Correct.</p>`
        : `<p style="margin:8px 0 0">Correct answer: <strong>${safeText(correctText)}</strong></p>
           <p style="margin:8px 0 0; opacity:.92">You typed: <strong>${safeText(chosenText || "(blank)")}</strong></p>`;
    } else {
      const chosenIdx = Number(state.lastChoice);

      // Handle TF where answer could still be boolean/string (should be normalized in start)
      let ansIdx = q.answer;
      if (typeof ansIdx === "boolean") ansIdx = ansIdx ? 0 : 1;
      else if (typeof ansIdx === "string") {
        const s = ansIdx.trim().toLowerCase();
        if (s === "true") ansIdx = 0;
        else if (s === "false") ansIdx = 1;
      }

      const correctIdx = Number(ansIdx);

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
        <strong>${icon} ${ok ? "Nice work!" : "Keep going"}</strong>
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
        review: [],
        savedMsg: "",
        isGrading: false
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
        state.isGrading = false;
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
        state.isGrading = false;
        paint();

        try {
          await ensureBankLoaded(ctx);

          const bank =
            window.UEAH_TEST_BANKS && Array.isArray(window.UEAH_TEST_BANKS[SLUG])
              ? window.UEAH_TEST_BANKS[SLUG]
              : [];

          if (!bank.length) throw new Error("Missing question bank.");

          const prepared = ensureIds(bank.filter(isPlainObject).map(cloneQuestionWithShuffledOptions));
          shuffleInPlace(prepared);

          // Random subset for variety (order already shuffled)
          const subset = prepared.slice(0, Math.min(MAX_QUESTIONS, prepared.length));

          state.questions = subset;
          state.index = 0;
          state.correctCount = 0;
          state.lastChoice = null;
          state.lastBlank = "";
          state.lastIsCorrect = false;
          state.review = [];
          state.savedMsg = "";
          state.isGrading = false;

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
        state.isGrading = false;

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
        const type = String(q && q.type ? q.type : "multipleChoice").toLowerCase();

        let chosenText = "";
        let correctText = "";

        if (type === "fillintheblank") {
          chosenText = blankText != null && String(blankText).trim() ? String(blankText) : "(blank)";
          correctText = answerTextForBlank(q ? q.answer : "");
        } else {
          // Normalize TF answers if needed
          let ansIdx = q && q.answer;
          if (typeof ansIdx === "boolean") ansIdx = ansIdx ? 0 : 1;
          else if (typeof ansIdx === "string") {
            const s = ansIdx.trim().toLowerCase();
            if (s === "true") ansIdx = 0;
            else if (s === "false") ansIdx = 1;
          }

          const correctIdx = Number(ansIdx);
          chosenText = optionAt(q, chosenIdx) || "(none)";
          correctText = optionAt(q, correctIdx) || "(not set)";
        }

        state.review.push({
          number: state.review.length + 1,
          typeLabel: questionTypeLabel(q),
          question: q && q.question ? String(q.question) : "",
          passage: q && q.passage ? String(q.passage) : "",
          chosenText,
          correctText,
          isCorrect: !!ok
        });
      }

      function grade(choiceIndex, blankText) {
        if (state.status !== "question" || state.isGrading) return;

        const q = state.questions[state.index];
        if (!q) return;

        state.isGrading = true;

        const type = String(q.type || "multipleChoice").toLowerCase();
        let ok = false;

        if (type === "fillintheblank") {
          const user = normalizeAnswerText(blankText);
          const ans = q.answer;

          if (Array.isArray(ans)) ok = ans.some((a) => normalizeAnswerText(a) === user);
          else ok = normalizeAnswerText(ans) === user;

          state.lastBlank = blankText != null ? String(blankText) : "";
          recordReviewRow(q, ok, null, state.lastBlank);
        } else {
          const chosen = Number(choiceIndex);
          if (!Number.isFinite(chosen)) {
            state.isGrading = false;
            return;
          }

          state.lastChoice = chosen;

          let ansIdx = q.answer;
          if (typeof ansIdx === "boolean") ansIdx = ansIdx ? 0 : 1;
          else if (typeof ansIdx === "string") {
            const s = ansIdx.trim().toLowerCase();
            if (s === "true") ansIdx = 0;
            else if (s === "false") ansIdx = 1;
          }

          ok = chosen === Number(ansIdx);

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
        const percent = total ? Math.round((correct / total) * 100) : 0;

        // UPDATE: include questions + review for downstream scoring/normalization
        const payload = {
          slug: SLUG,
          ageGroup: "8-10",
          skill: "reading",
          at: nowIso(),

          questions: Array.isArray(state.questions) ? state.questions : [],
          review: Array.isArray(state.review) ? state.review : [],

          rawCorrect: correct,
          totalQuestions: total,
          percent,
          difficultyBreakdown: computeDifficultyBreakdown(state.questions, state.review)
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
        if (!action) return;

        if (action === "start" || action === "retry") {
          ev.preventDefault();
          start();
          return;
        }

        if (action === "restart") {
          ev.preventDefault();
          restart();
          return;
        }

        if (action === "next") {
          ev.preventDefault();
          next();
          return;
        }

        if (action === "save-score") {
          ev.preventDefault();
          saveScoreToProfile();
          return;
        }
      });

      host.addEventListener("submit", (ev) => {
        const form = ev.target;
        if (!form || form.getAttribute("data-form") !== "question") return;

        ev.preventDefault();

        const q = state.questions[state.index];
        if (!q) return;

        const type = String(q.type || "multipleChoice").toLowerCase();

        if (type === "fillintheblank") {
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
