/* assets/js/tests/age/11-12-reading.js
   Runner: Ages 11–12 • Reading

   Loads the question bank (assets/data/tests-11-12-reading.js) and runs a
   simple, accessible, one-question-at-a-time quiz.

   Supported question types:
   - multipleChoice
   - trueFalse
   - fillInTheBlank

   Randomization:
   - Shuffles question order on start
   - Shuffles options within MCQ/TF questions

   Updates (this file):
   - Robust bank loader (handles existing script; validates bank on next tick)
   - Ensures stable ids for every question (prevents overwriting review rows)
   - True/False supports boolean / string / numeric answers; defaults options to ["True","False"]
   - Better fill-in grading: supports q.acceptedAnswers / q.answers / q.acceptAnyOf / q.answer (string|array)
   - More resilient type parsing (case/format variations)
   - Final summary includes per-question review table
   - Adds "Save score to Profile" using shared helper (window.UEAH_SAVE_SCORE) when available
   - Save payload now includes (or ensures present):
     * questions: state.questions
     * review: state.review
*/

(function () {
  "use strict";

  const SLUG = "age-11-12-reading";
  const BANK_SRC = "assets/data/tests-11-12-reading.js";
  const MAX_QUESTIONS = 18;

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

  function safeTextWithBreaks(v) {
    return safeText(v).replace(/\n/g, "<br>");
  }

  function normalizeType(v) {
    return String(v || "")
      .trim()
      .toLowerCase()
      .replace(/[^a-z]/g, "");
  }

  function normalizeAnswerText(v) {
    return String(v == null ? "" : v)
      .trim()
      .toLowerCase()
      .replace(/[.,!?;:"'()]/g, "")
      .replace(/[\u00A0]/g, " ")
      .replace(/\s+/g, " ")
      .replace(/\s+/g, "");
  }

  function ensureIds(qs) {
    const arr = Array.isArray(qs) ? qs : [];
    return arr.map((q, idx) => {
      if (!isPlainObject(q)) return q;
      const id = q.id != null && String(q.id).trim() ? String(q.id).trim() : `${SLUG}::idx-${idx}`;
      return { ...q, id };
    });
  }

  function getType(q) {
    const t = normalizeType(q && q.type ? q.type : "");
    if (t === "fillintheblank") return "fillintheblank";
    if (t === "truefalse") return "truefalse";
    if (t === "multiplechoice") return "multiplechoice";
    return t || "multiplechoice";
  }

  function typeLabel(q) {
    const t = getType(q);
    if (t === "fillintheblank") return "Fill in the blank";
    if (t === "truefalse") return "True / False";
    return "Multiple choice";
  }

  function coerceTrueFalseAnswerToIndex(ans) {
    if (typeof ans === "boolean") return ans ? 0 : 1;
    const s = String(ans == null ? "" : ans).trim().toLowerCase();
    if (s === "true" || s === "t" || s === "yes" || s === "y") return 0;
    if (s === "false" || s === "f" || s === "no" || s === "n") return 1;
    const n = Number(ans);
    if (Number.isFinite(n)) return n;
    return null;
  }

  function getOptionsForQuestion(q) {
    const t = getType(q);
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

  function correctTextForBlank(ans) {
    if (Array.isArray(ans)) return ans.filter((x) => x != null).map(String).join(" / ");
    return ans == null ? "" : String(ans);
  }

  function getAcceptedBlankAnswers(q) {
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

  function gradeBlank(q, userText) {
    const user = normalizeAnswerText(userText);
    const acceptedRaw = getAcceptedBlankAnswers(q);
    const acceptedNorm = acceptedRaw.map(normalizeAnswerText).filter(Boolean);
    const ok = !!user && acceptedNorm.includes(user);
    return { ok, acceptedRaw };
  }

  function cloneQuestionWithShuffledOptions(q) {
    if (!isPlainObject(q)) return q;

    if (!Array.isArray(q.options)) return { ...q };

    // Shuffle for MCQ + TF where answer is an index
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
  // UI renderers
  // -----------------------------

  function renderIntro() {
    return `
      <div class="note" style="margin-top:0">
        <strong>Ages 11–12 Reading</strong>
        <p style="margin:8px 0 0">Read longer passages and answer questions about main ideas, details, inference, and vocabulary.</p>
        <p style="margin:8px 0 0; opacity:.92">Tip: Skim for the main idea, then scan for key words to find specific details.</p>
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
        <p style="margin:8px 0 0">${safeTextWithBreaks(p)}</p>
      </div>
    `;
  }

  function renderMCQForm(q) {
    const prompt = safeTextWithBreaks(q.question || "Question");
    const options = getOptionsForQuestion(q);

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
            ${optionsHtml || `<div class="note" style="margin:0; padding:10px 12px"><strong>No options provided</strong></div>`}
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

    const type = getType(q);
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

    const type = getType(q);

    if (type === "fillintheblank") {
      const chosenText = state.lastBlank != null ? String(state.lastBlank) : "";
      const correctText =
        state.lastAcceptedAnswers && state.lastAcceptedAnswers.length
          ? state.lastAcceptedAnswers.slice(0, 4).join(" / ")
          : correctTextForBlank(q && q.answer);

      detailHtml = ok
        ? `<p style="margin:8px 0 0">Correct.</p>`
        : `<p style="margin:8px 0 0">Correct answer: <strong>${safeText(correctText || "(not set)")}</strong></p>
           <p style="margin:8px 0 0; opacity:.92">You typed: <strong>${safeText(chosenText || "(blank)")}</strong></p>`;
    } else {
      const chosenIdx = Number(state.lastChoice);

      let correctIdx = Number(q && q.answer);
      if (type === "truefalse" && typeof q.answer !== "number") {
        const coerced = coerceTrueFalseAnswerToIndex(q.answer);
        if (Number.isFinite(Number(coerced))) correctIdx = Number(coerced);
      }

      const correctText = optionAt(q, correctIdx);
      const chosenText = optionAt(q, chosenIdx);

      detailHtml = ok
        ? `<p style="margin:8px 0 0">Correct.</p>`
        : `<p style="margin:8px 0 0">Correct answer: <strong>${safeText(correctText || "(not set)")}</strong></p>
           <p style="margin:8px 0 0; opacity:.92">You chose: <strong>${safeText(chosenText || "(none)")}</strong></p>`;
    }

    const explanation = q && q.explanation ? String(q.explanation).trim() : "";
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
        const passage = r.passage
          ? `<div style="margin-top:6px; opacity:.95"><strong>Passage:</strong> ${safeTextWithBreaks(r.passage)}</div>`
          : "";
        return `
          <tr>
            <td style="padding:10px 10px; border-top:1px solid var(--border); font-weight:800; white-space:nowrap">${safeText(
              r.number
            )}</td>
            <td style="padding:10px 10px; border-top:1px solid var(--border)">
              <div style="font-weight:900">${safeText(r.typeLabel)}</div>
              <div style="margin-top:6px">${safeTextWithBreaks(r.question || "")}</div>
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
        lastAcceptedAnswers: [],
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
        state.lastAcceptedAnswers = [];
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

        if (state.status === "question") {
          setTimeout(() => {
            try {
              const el = host.querySelector("input, button");
              if (el && typeof el.focus === "function") el.focus();
            } catch (_) {}
          }, 0);
        }
      }

      function recordReviewRow(q, ok, chosenIdx, blankText, acceptedRaw) {
        const t = getType(q);

        let chosenText = "";
        let correctText = "";

        if (t === "fillintheblank") {
          chosenText = blankText != null && String(blankText).trim() ? String(blankText) : "(blank)";
          const raw = Array.isArray(acceptedRaw) && acceptedRaw.length ? acceptedRaw : getAcceptedBlankAnswers(q);
          correctText = raw.length ? raw.slice(0, 4).join(" / ") : "(not set)";
        } else {
          chosenText = optionAt(q, chosenIdx) || "(none)";

          let correctIdx = Number(q && q.answer);
          if (t === "truefalse" && typeof q.answer !== "number") {
            const coerced = coerceTrueFalseAnswerToIndex(q.answer);
            if (Number.isFinite(Number(coerced))) correctIdx = Number(coerced);
          }

          correctText = optionAt(q, correctIdx) || "(not set)";
        }

        state.review.push({
          number: state.index + 1,
          typeLabel: typeLabel(q),
          question: q && q.question ? String(q.question) : "",
          passage: q && q.passage ? String(q.passage) : "",
          chosenText,
          correctText,
          isCorrect: !!ok
        });
      }

      async function start() {
        state.status = "loading";
        state.lastError = "";
        state.review = [];
        state.savedMsg = "";
        paint();

        try {
          await ensureBankLoaded(ctx);

          const rawBank =
            window.UEAH_TEST_BANKS && Array.isArray(window.UEAH_TEST_BANKS[SLUG])
              ? window.UEAH_TEST_BANKS[SLUG]
              : [];

          if (!rawBank.length) throw new Error("Missing question bank.");

          const withIds = ensureIds(rawBank.filter(isPlainObject).map((q) => ({ ...q })));

          // Normalize TF questions (ensure options + numeric answer index)
          const normalized = withIds.map((q) => {
            const t = getType(q);
            if (t !== "truefalse") return q;

            const opts = Array.isArray(q.options) && q.options.length ? q.options.slice() : ["True", "False"];
            const idx = typeof q.answer === "number" ? q.answer : coerceTrueFalseAnswerToIndex(q.answer);

            return { ...q, options: opts, answer: Number.isFinite(Number(idx)) ? Number(idx) : 0 };
          });

          const prepared = normalized.map(cloneQuestionWithShuffledOptions);
          shuffleInPlace(prepared);

          const subset = prepared.slice(0, Math.min(MAX_QUESTIONS, prepared.length));

          state.questions = subset;
          state.index = 0;
          state.correctCount = 0;
          state.lastChoice = null;
          state.lastBlank = "";
          state.lastAcceptedAnswers = [];
          state.lastIsCorrect = false;
          state.lastError = "";
          state.review = [];
          state.savedMsg = "";

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
        state.lastAcceptedAnswers = [];
        state.lastIsCorrect = false;
        state.status = "question";
        paint();
      }

      function grade(choiceIndex, blankText) {
        const q = state.questions[state.index];
        if (!q) return;

        if (state.status !== "question") return;

        const type = getType(q);

        let ok = false;

        if (type === "fillintheblank") {
          const graded = gradeBlank(q, blankText);
          ok = graded.ok;

          state.lastBlank = blankText != null ? String(blankText) : "";
          state.lastAcceptedAnswers = graded.acceptedRaw || [];

          recordReviewRow(q, ok, null, state.lastBlank, state.lastAcceptedAnswers);
        } else {
          const chosen = Number(choiceIndex);
          if (!Number.isFinite(chosen)) return;

          state.lastChoice = chosen;

          let correctIdx = Number(q.answer);
          if (type === "truefalse" && typeof q.answer !== "number") {
            const coerced = coerceTrueFalseAnswerToIndex(q.answer);
            if (Number.isFinite(Number(coerced))) correctIdx = Number(coerced);
          }

          ok = chosen === Number(correctIdx);

          recordReviewRow(q, ok, chosen, null, null);
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

        const res = window.UEAH_SAVE_SCORE.save({
          slug: SLUG,
          ageGroup: "11-12",
          skill: "reading",
          questions: state.questions,
          review: state.review
        });

        state.savedMsg = res && res.ok ? "Saved to Profile." : "Could not save.";
        paint();
      }

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
        const type = getType(q);

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
