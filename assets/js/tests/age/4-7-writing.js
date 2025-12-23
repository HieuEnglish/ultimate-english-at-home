/* assets/js/tests/age/4-7-writing.js
   Runner: Ages 4–7 • Writing

   Loads the question bank (assets/data/tests-4-7-writing.js) and runs a
   simple, accessible, one-question-at-a-time writing practice.

   Supported question types:
   - multipleChoice
   - fillInTheBlank
   - prompt (free response; auto-scored via simple checklist when rubric exists)

   Scoring:
   - Objective questions: 1 point each (or q.points if provided)
   - Prompt questions: points earned by meeting rubric checks
     (minWords, minLetters, mustIncludeAny groups). If no rubric exists, any non-empty
     response earns 1 point.

   Note: For ages 4–7, prompts are very short. A caregiver can help with spelling.
*/

(function () {
  "use strict";

  const SLUG = "age-4-7-writing";
  const BANK_SRC = "assets/data/tests-4-7-writing.js";

  const store = window.UEAH_TESTS_STORE;
  if (!store || typeof store.registerRunner !== "function") {
    console.warn("[UEAH] tests store not found; runner not registered:", SLUG);
    return;
  }

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

  function normalizeAnswerText(v) {
    return String(v == null ? "" : v)
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "")
      .replace(/[.!,?;:]/g, "");
  }

  function wordCount(text) {
    const t = String(text || "").trim();
    if (!t) return 0;
    return t.split(/\s+/).filter(Boolean).length;
  }

  function letterCount(text) {
    const t = String(text || "");
    const matches = t.match(/[a-zA-Z]/g);
    return matches ? matches.length : 0;
  }

  function pointsPossible(q) {
    const p = Number(q && q.points);
    if (Number.isFinite(p)) return Math.max(0, p);
    return 1;
  }

  function isPromptType(t) {
    return String(t || "").toLowerCase() === "prompt";
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

  function promptPointsPossible(q) {
    const rubric = q && typeof q.rubric === "object" ? q.rubric : null;
    let n = 0;

    if (rubric && Number.isFinite(Number(rubric.minWords))) n += 1;
    if (rubric && Number.isFinite(Number(rubric.minLetters))) n += 1;

    // mustIncludeAny: array of groups (each group is an array of words)
    if (rubric && Array.isArray(rubric.mustIncludeAny)) {
      rubric.mustIncludeAny.forEach((group) => {
        if (Array.isArray(group) && group.length) n += 1;
      });
    }

    // If no explicit checks exist, any non-empty response can still earn 1.
    return n > 0 ? n : 1;
  }

  function evaluatePrompt(text, rubric) {
    const checks = [];
    if (!rubric || typeof rubric !== "object") return checks;

    const raw = String(text || "");
    const wc = wordCount(raw);
    const lc = letterCount(raw);
    const lower = raw.toLowerCase();

    if (Number.isFinite(Number(rubric.minWords))) {
      const m = Number(rubric.minWords);
      checks.push({ id: "minWords", label: `${m}+ words`, ok: wc >= m });
    }

    if (Number.isFinite(Number(rubric.minLetters))) {
      const m = Number(rubric.minLetters);
      checks.push({ id: "minLetters", label: `${m}+ letters`, ok: lc >= m });
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

    return checks;
  }

  function getFillBlankAcceptedAnswers(q) {
    // Bank format supports string or array; allow a couple of common alternates too.
    const a = q && q.answer;
    if (Array.isArray(a)) return a;
    if (a != null) return [a];
    if (Array.isArray(q && q.answers)) return q.answers;
    if (Array.isArray(q && q.acceptAnyOf)) return q.acceptAnyOf;
    return [];
  }

  function gradeFillBlank(q, value) {
    const userNorm = normalizeAnswerText(value);
    const accepted = getFillBlankAcceptedAnswers(q)
      .map((x) => String(x == null ? "" : x))
      .map(normalizeAnswerText)
      .filter(Boolean);

    const ok = !!userNorm && accepted.includes(userNorm);
    return { ok, userNorm, acceptedNorm: accepted };
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

  function renderPromptChecklist(q) {
    const rubric = q && q.rubric && typeof q.rubric === "object" ? q.rubric : null;
    const items = [];

    if (rubric && Number.isFinite(Number(rubric.minLetters))) items.push(`${Number(rubric.minLetters)}+ letters`);
    if (rubric && Number.isFinite(Number(rubric.minWords))) items.push(`${Number(rubric.minWords)}+ words`);
    if (rubric && Array.isArray(rubric.mustIncludeAny)) {
      rubric.mustIncludeAny.forEach((group) => {
        if (!Array.isArray(group) || !group.length) return;
        items.push(`Include ${group.join(" / ")}`);
      });
    }

    if (!items.length) {
      return `
        <div class="note" style="margin:12px 0 0; padding:10px 12px">
          <strong>Checklist</strong>
          <p style="margin:8px 0 0; opacity:.92">Write something. Any non-empty answer earns 1 point.</p>
        </div>
      `;
    }

    return `
      <div class="note" style="margin:12px 0 0; padding:10px 12px">
        <strong>Checklist</strong>
        <ul style="margin:10px 0 0; padding-left:18px">
          ${items.map((t) => `<li style="margin:4px 0">${safeText(t)}</li>`).join("")}
        </ul>
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
    const prompt = safeTextWithBreaks(q.question || "Write");

    return `
      ${renderPromptHint(q)}
      ${renderPromptChecklist(q)}

      <form data-form="question" data-qtype="prompt" style="margin-top:12px">
        <fieldset style="border:1px solid var(--border); border-radius:16px; padding:14px; background: var(--surface2)">
          <legend style="padding:0 8px; font-weight:900">${prompt}</legend>

          <div style="display:flex; align-items:center; justify-content:space-between; gap:10px; flex-wrap:wrap; margin-top:10px">
            <div style="color:var(--muted); font-weight:800">Words: <span data-word-count>0</span> • Letters: <span data-letter-count>0</span></div>
            <div style="color:var(--muted)">Short is OK.</div>
          </div>

          <label style="display:block; margin-top:12px">
            <span class="sr-only">Your writing</span>
            <textarea
              name="response"
              rows="4"
              maxlength="240"
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

    if (type === "fillintheblank") {
      const acceptedRaw = getFillBlankAcceptedAnswers(q).map((x) => String(x == null ? "" : x)).filter(Boolean);
      const correctText = acceptedRaw.length ? acceptedRaw.slice(0, 4).join(" / ") : "";
      const chosenText = state.lastBlank != null ? String(state.lastBlank) : "";

      detailHtml = ok
        ? `<p style="margin:8px 0 0">Correct. +${state.lastPointsEarned} point(s)</p>`
        : `<p style="margin:8px 0 0">Correct answer: <strong>${safeText(correctText || "(unknown)")}</strong></p>
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

        objectiveMaxPoints: 0,
        objectiveEarnedPoints: 0,
        promptMaxPoints: 0,
        promptEarnedPoints: 0,

        correctCount: 0, // kept for compatibility with older summary messaging
        objectiveTotal: 0,
        promptDoneCount: 0,

        lastChoice: null,
        lastBlank: "",
        lastResponse: "",
        lastChecks: [],
        lastIsCorrect: false,
        lastWasSkipped: false,
        lastPointsEarned: 0,
        lastPointsPossible: 0,
        lastError: "",

        responses: {} // q.id -> { user, correct?, skipped?, checks?, pointsEarned, pointsPossible }
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
          const wcEl = stage.querySelector("[data-word-count]");
          const lcEl = stage.querySelector("[data-letter-count]");
          if (textarea && (wcEl || lcEl)) {
            const update = () => {
              if (wcEl) wcEl.textContent = String(wordCount(textarea.value));
              if (lcEl) lcEl.textContent = String(letterCount(textarea.value));
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
          shuffleInPlace(prepared);

          state.questions = prepared;
          state.index = 0;

          const objectiveQs = prepared.filter((q) => !isPromptType(q && q.type));
          const promptQs = prepared.filter((q) => isPromptType(q && q.type));

          state.objectiveTotal = objectiveQs.length;
          state.promptDoneCount = 0;

          state.objectiveMaxPoints = objectiveQs.reduce((sum, q) => sum + pointsPossible(q), 0);
          state.objectiveEarnedPoints = 0;

          state.promptMaxPoints = promptQs.reduce((sum, q) => sum + promptPointsPossible(q), 0);
          state.promptEarnedPoints = 0;

          state.correctCount = 0;

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

        state.objectiveMaxPoints = 0;
        state.objectiveEarnedPoints = 0;
        state.promptMaxPoints = 0;
        state.promptEarnedPoints = 0;

        state.correctCount = 0;
        state.objectiveTotal = 0;
        state.promptDoneCount = 0;

        state.lastChoice = null;
        state.lastBlank = "";
        state.lastResponse = "";
        state.lastChecks = [];
        state.lastIsCorrect = false;
        state.lastWasSkipped = false;
        state.lastPointsEarned = 0;
        state.lastPointsPossible = 0;
        state.lastError = "";
        state.responses = {};
        paint();
      }

      function next() {
        state.lastWasSkipped = false;
        state.lastChecks = [];
        state.lastPointsEarned = 0;
        state.lastPointsPossible = 0;

        if (state.index + 1 >= state.questions.length) {
          state.status = "summary";
        } else {
          state.index += 1;
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

      function skip() {
        const q = state.questions[state.index];
        if (!q) return;

        const type = String(q.type || "").toLowerCase();
        const possible = isPromptType(type) ? promptPointsPossible(q) : pointsPossible(q);

        state.lastWasSkipped = true;
        state.lastIsCorrect = false;
        state.lastChecks = [];
        state.lastPointsEarned = 0;
        state.lastPointsPossible = possible;

        state.responses[q.id] = {
          skipped: true,
          pointsEarned: 0,
          pointsPossible: possible,
          type
        };

        state.status = "feedback";
        paint();
      }

      function handleMCQSubmit(q, choice) {
        const chosen = Number(choice);
        const ok = chosen === Number(q.answer);
        const possible = pointsPossible(q);
        const earned = ok ? possible : 0;

        state.lastChoice = chosen;
        state.lastIsCorrect = ok;
        state.lastPointsEarned = earned;
        state.lastPointsPossible = possible;

        if (ok) state.correctCount += 1;
        state.objectiveEarnedPoints += earned;

        state.responses[q.id] = {
          type: "multiplechoice",
          correct: ok,
          user: chosen,
          skipped: false,
          pointsEarned: earned,
          pointsPossible: possible
        };

        state.status = "feedback";
        paint();
      }

      function handleBlankSubmit(q, value) {
        const graded = gradeFillBlank(q, value);
        const ok = graded.ok;

        const possible = pointsPossible(q);
        const earned = ok ? possible : 0;

        state.lastBlank = value;
        state.lastIsCorrect = ok;
        state.lastPointsEarned = earned;
        state.lastPointsPossible = possible;

        if (ok) state.correctCount += 1;
        state.objectiveEarnedPoints += earned;

        state.responses[q.id] = {
          type: "fillintheblank",
          correct: ok,
          user: value,
          skipped: false,
          pointsEarned: earned,
          pointsPossible: possible
        };

        state.status = "feedback";
        paint();
      }

      function handlePromptSubmit(q, text) {
        const raw = String(text || "");
        const checks = evaluatePrompt(raw, q.rubric);

        const possible = promptPointsPossible(q);

        let earned = 0;
        if (checks.length) earned = checks.filter((c) => c.ok).length;
        else earned = raw.trim() ? 1 : 0;

        state.lastResponse = raw;
        state.lastChecks = checks;
        state.lastPointsEarned = earned;
        state.lastPointsPossible = possible;

        state.promptDoneCount += 1;
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

      function onClick(e) {
        const btn = e.target && e.target.closest ? e.target.closest("button[data-action]") : null;
        if (!btn) return;

        const action = btn.getAttribute("data-action");
        if (!action) return;

        if (action === "start") {
          e.preventDefault();
          start();
        } else if (action === "restart") {
          e.preventDefault();
          restart();
        } else if (action === "retry") {
          e.preventDefault();
          start();
        } else if (action === "next") {
          e.preventDefault();
          next();
        } else if (action === "skip") {
          e.preventDefault();
          skip();
        }
      }

      function onSubmit(e) {
        const form = e.target;
        if (!form || !form.matches || !form.matches("form[data-form='question']")) return;

        e.preventDefault();

        const q = state.questions[state.index];
        if (!q) return;

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

      host.addEventListener("click", onClick);
      host.addEventListener("submit", onSubmit);

      paint();
    }
  });
})();
