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

   Updates:
   - Consistent runner wrapper (data-ueah-test + stage) + init guard
   - Robust bank loader (waits for existing script load/error; validates bank)
   - Ensures stable ids (fallback id if missing)
   - Prevents double-submit grading
   - Adds a final summary report (per-question review)
   - Adds "Save score to Profile" using shared helper (window.UEAH_SAVE_SCORE) when available
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
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function safeTextWithBreaks(v) {
    return safeText(v).replace(/\n/g, "<br>");
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

  function ensureIds(qs) {
    return qs.map((q, idx) => {
      if (!isPlainObject(q)) return q;
      const id = q.id != null && String(q.id).trim() ? String(q.id).trim() : `${SLUG}::idx-${idx}`;
      return { ...q, id };
    });
  }

  function cloneQuestionWithShuffledOptions(q) {
    if (!isPlainObject(q)) return q;

    const type = String(q.type || "multipleChoice").toLowerCase();
    if (type === "prompt" || type === "fillintheblank") return { ...q };

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

    if (rubric && Array.isArray(rubric.mustIncludeAny)) {
      rubric.mustIncludeAny.forEach((group) => {
        if (Array.isArray(group) && group.length) n += 1;
      });
    }

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

  function computeDifficultyBreakdown(questions, responses) {
    const out = Object.create(null);
    const qs = Array.isArray(questions) ? questions : [];

    qs.forEach((q) => {
      const d = String(q && q.difficulty ? q.difficulty : "").trim().toLowerCase() || "unknown";
      if (!out[d]) out[d] = { earned: 0, possible: 0, count: 0 };

      const r = (q && q.id && responses && responses[q.id]) || null;
      const earned = r ? Number(r.pointsEarned || 0) : 0;
      const possible = r ? Number(r.pointsPossible || 0) : 0;

      out[d].earned += earned;
      out[d].possible += possible;
      out[d].count += 1;
    });

    return out;
  }

  function normalizeResponsesForSave(responses) {
    // state.responses is created with null-prototype; convert to a plain object for JSON + downstream scoring.
    const src = responses && typeof responses === "object" ? responses : null;
    if (!src) return {};
    const out = {};
    Object.keys(src).forEach((k) => {
      const v = src[k];
      if (v && typeof v === "object") out[k] = { ...v };
      else out[k] = v;
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
      s.async = true;
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

    const type = state.questions[state.index] ? String(state.questions[state.index].type || "") : "";
    const points = state.questions[state.index]
      ? (isPromptType(type) ? promptPointsPossible(state.questions[state.index]) : pointsPossible(state.questions[state.index]))
      : 0;

    return `
      <div style="display:flex; align-items:center; justify-content:space-between; gap:10px; flex-wrap:wrap">
        <div style="display:flex; gap:10px; align-items:center; flex-wrap:wrap">
          <div style="font-weight:800; color: var(--muted)">Question ${n} of ${total}</div>
          <span style="display:inline-block; padding:4px 10px; border-radius:999px; border:1px solid var(--border); color: var(--muted); font-weight:800; font-size:12px">+${safeText(
            points
          )} pt</span>
        </div>
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
            <div style="color: var(--muted)">Short is OK.</div>
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
        const icon = r.skipped ? "⏭️" : r.isCorrect ? "✅" : r.type === "prompt" ? "✍️" : "❌";
        const extra = `<div style="opacity:.9; margin-top:6px">Points: ${safeText(r.pointsEarned)} / ${safeText(
          r.pointsPossible
        )}</div>`;

        const wrote =
          r.type === "prompt" && r.userText
            ? `<div style="opacity:.9; margin-top:6px; white-space:pre-wrap">${safeText(r.userText)}</div>`
            : "";

        return `
          <tr>
            <td style="padding:10px 10px; border-top:1px solid var(--border); font-weight:800; white-space:nowrap">${safeText(
              r.number
            )}</td>
            <td style="padding:10px 10px; border-top:1px solid var(--border)">
              <div style="font-weight:900">${safeText(r.typeLabel)}</div>
              <div style="margin-top:6px">${safeText(r.question || "")}</div>
              ${wrote}
              ${extra}
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
    const objEarned = state.objectiveEarnedPoints;
    const objMax = state.objectiveMaxPoints;
    const objPct = objMax ? Math.round((objEarned / objMax) * 100) : 0;

    const wrEarned = state.promptEarnedPoints;
    const wrMax = state.promptMaxPoints;
    const wrPct = wrMax ? Math.round((wrEarned / wrMax) * 100) : 0;

    const allEarned = objEarned + wrEarned;
    const allMax = objMax + wrMax;
    const allPct = allMax ? Math.round((allEarned / allMax) * 100) : 0;

    const canSave = !!(window.UEAH_SAVE_SCORE && typeof window.UEAH_SAVE_SCORE.save === "function");

    return `
      <div class="note" style="margin-top:0">
        <strong>Finished!</strong>
        <p style="margin:8px 0 0">Objective score: <strong>${objEarned}</strong> / ${objMax} (${objPct}%)</p>
        <p style="margin:8px 0 0">Writing score: <strong>${wrEarned}</strong> / ${wrMax} (${wrPct}%)</p>
        <p style="margin:8px 0 0">Overall score: <strong>${allEarned}</strong> / ${allMax} (${allPct}%)</p>
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
        savedMsg: "",

        responses: Object.create(null), // q.id -> { ... }
        review: [], // per-question rows
        isGrading: false
      };

      function resetRunState() {
        state.questions = [];
        state.index = 0;

        state.objectiveMaxPoints = 0;
        state.objectiveEarnedPoints = 0;
        state.promptMaxPoints = 0;
        state.promptEarnedPoints = 0;

        state.lastChoice = null;
        state.lastBlank = "";
        state.lastResponse = "";
        state.lastChecks = [];
        state.lastIsCorrect = false;
        state.lastWasSkipped = false;
        state.lastPointsEarned = 0;
        state.lastPointsPossible = 0;
        state.lastError = "";
        state.savedMsg = "";

        state.responses = Object.create(null);
        state.review = [];
        state.isGrading = false;
      }

      function typeLabel(q) {
        const t = String(q && q.type ? q.type : "multipleChoice").toLowerCase();
        if (t === "prompt") return "Writing prompt";
        if (t === "fillintheblank") return "Fill in the blank";
        return "Multiple choice";
      }

      function optionAt(q, idx) {
        if (!q || !Array.isArray(q.options)) return "";
        const n = Number(idx);
        if (!Number.isFinite(n)) return "";
        return q.options[n] == null ? "" : String(q.options[n]);
      }

      function recordReviewRow(q, r) {
        const t = String(q && q.type ? q.type : "multipleChoice").toLowerCase();

        let chosenText = "";
        let correctText = "";

        if (r && r.skipped) {
          chosenText = "(skipped)";
          correctText = "";
        } else if (t === "prompt") {
          chosenText = "(written)";
          correctText = "(rubric)";
        } else if (t === "fillintheblank") {
          chosenText = r && r.user != null && String(r.user).trim() ? String(r.user) : "(blank)";
          const acc = getFillBlankAcceptedAnswers(q).map((x) => String(x == null ? "" : x)).filter(Boolean);
          correctText = acc.length ? acc.slice(0, 4).join(" / ") : "(not set)";
        } else {
          chosenText = optionAt(q, r ? r.user : null) || "(none)";
          correctText = optionAt(q, q ? q.answer : null) || "(not set)";
        }

        state.review.push({
          number: state.index + 1,
          type: t,
          typeLabel: typeLabel(q),
          question: q && q.question ? String(q.question) : "",
          userText: t === "prompt" && r && r.user != null ? String(r.user) : "",
          chosenText,
          correctText,
          isCorrect: !!(r && r.correct),
          skipped: !!(r && r.skipped),
          pointsEarned: r ? Number(r.pointsEarned || 0) : 0,
          pointsPossible: r ? Number(r.pointsPossible || 0) : 0
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

          setTimeout(() => {
            try {
              const el = host.querySelector("input, textarea, button");
              if (el && typeof el.focus === "function") el.focus();
            } catch (_) {}
          }, 0);
        }
      }

      async function start() {
        state.status = "loading";
        state.lastError = "";
        state.savedMsg = "";
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

          const objectiveQs = prepared.filter((q) => !isPromptType(q && q.type));
          const promptQs = prepared.filter((q) => isPromptType(q && q.type));

          state.questions = prepared;
          state.index = 0;

          state.objectiveMaxPoints = objectiveQs.reduce((sum, q) => sum + pointsPossible(q), 0);
          state.objectiveEarnedPoints = 0;

          state.promptMaxPoints = promptQs.reduce((sum, q) => sum + promptPointsPossible(q), 0);
          state.promptEarnedPoints = 0;

          state.lastChoice = null;
          state.lastBlank = "";
          state.lastResponse = "";
          state.lastChecks = [];
          state.lastIsCorrect = false;
          state.lastWasSkipped = false;
          state.lastPointsEarned = 0;
          state.lastPointsPossible = 0;

          state.responses = Object.create(null);
          state.review = [];
          state.isGrading = false;

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

      function toNextScreenAfterFeedback() {
        state.isGrading = false;
        state.lastWasSkipped = false;
        state.lastChecks = [];
        state.lastPointsEarned = 0;
        state.lastPointsPossible = 0;

        if (state.index + 1 >= state.questions.length) state.status = "summary";
        else {
          state.index += 1;
          state.status = "question";
        }
        paint();
      }

      function skip() {
        if (state.status !== "question" || state.isGrading) return;

        const q = state.questions[state.index];
        if (!q) return;

        state.isGrading = true;

        const type = String(q.type || "multipleChoice").toLowerCase();
        const possible = isPromptType(type) ? promptPointsPossible(q) : pointsPossible(q);

        state.lastWasSkipped = true;
        state.lastIsCorrect = false;
        state.lastChecks = [];
        state.lastPointsEarned = 0;
        state.lastPointsPossible = possible;

        const r = {
          type,
          skipped: true,
          correct: false,
          pointsEarned: 0,
          pointsPossible: possible
        };

        state.responses[q.id] = r;
        recordReviewRow(q, r);

        state.status = "feedback";
        paint();
      }

      function handleMCQSubmit(q, choice) {
        const chosen = Number(choice);
        if (!Number.isFinite(chosen)) return;

        const ok = chosen === Number(q.answer);
        const possible = pointsPossible(q);
        const earned = ok ? possible : 0;

        state.lastChoice = chosen;
        state.lastIsCorrect = ok;
        state.lastPointsEarned = earned;
        state.lastPointsPossible = possible;

        state.objectiveEarnedPoints += earned;

        const r = {
          type: "multiplechoice",
          user: chosen,
          correct: ok,
          skipped: false,
          pointsEarned: earned,
          pointsPossible: possible
        };

        state.responses[q.id] = r;
        recordReviewRow(q, r);

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

        state.objectiveEarnedPoints += earned;

        const r = {
          type: "fillintheblank",
          user: value,
          correct: ok,
          skipped: false,
          pointsEarned: earned,
          pointsPossible: possible
        };

        state.responses[q.id] = r;
        recordReviewRow(q, r);

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

        state.promptEarnedPoints += earned;

        const r = {
          type: "prompt",
          user: raw,
          checks,
          correct: true, // prompts are not right/wrong; keep true to indicate "completed"
          skipped: false,
          pointsEarned: earned,
          pointsPossible: possible
        };

        state.responses[q.id] = r;
        recordReviewRow(q, r);

        state.status = "feedback";
        paint();
      }

      function saveScoreToProfile() {
        if (!window.UEAH_SAVE_SCORE || typeof window.UEAH_SAVE_SCORE.save !== "function") {
          state.savedMsg = "Save unavailable.";
          paint();
          return;
        }

        const earned = Number(state.objectiveEarnedPoints || 0) + Number(state.promptEarnedPoints || 0);
        const possible = Number(state.objectiveMaxPoints || 0) + Number(state.promptMaxPoints || 0);
        const percent = possible ? Math.round((earned / possible) * 100) : 0;

        // FIX: include scoring inputs used for normalization
        const reviewMap = normalizeResponsesForSave(state.responses);

        const payload = {
          slug: SLUG,
          ageGroup: "4-7",
          skill: "writing",
          at: nowIso(),

          // scoring inputs for normalization
          questions: Array.isArray(state.questions) ? state.questions : [],
          review: reviewMap, // id -> { pointsEarned, pointsPossible, ... }

          rawCorrect: earned,
          totalQuestions: possible, // treat as "total points" for writing
          percent,
          rubric: {
            scoring: "points",
            objectiveMaxPoints: Number(state.objectiveMaxPoints || 0),
            promptMaxPoints: Number(state.promptMaxPoints || 0)
          },
          difficultyBreakdown: computeDifficultyBreakdown(state.questions, state.responses)
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
        const btn = ev.target && ev.target.closest ? ev.target.closest("[data-action]") : null;
        if (!btn) return;

        const action = btn.getAttribute("data-action");

        if (action === "start" || action === "retry") {
          ev.preventDefault();
          start();
        } else if (action === "restart") {
          ev.preventDefault();
          restart();
        } else if (action === "next") {
          ev.preventDefault();
          toNextScreenAfterFeedback();
        } else if (action === "skip") {
          ev.preventDefault();
          skip();
        } else if (action === "save-score") {
          ev.preventDefault();
          saveScoreToProfile();
        }
      });

      host.addEventListener("submit", (ev) => {
        const form = ev.target;
        if (!form || form.getAttribute("data-form") !== "question") return;

        ev.preventDefault();
        if (state.status !== "question" || state.isGrading) return;

        const q = state.questions[state.index];
        if (!q) return;

        state.isGrading = true;

        const qtype = String(form.getAttribute("data-qtype") || "").toLowerCase();

        try {
          if (qtype === "prompt") {
            const area = form.querySelector("textarea[name='response']");
            const text = area ? area.value : "";
            handlePromptSubmit(q, text);
            return;
          }

          if (qtype === "fillintheblank") {
            const input = form.querySelector("input[name='blank']");
            const value = input ? input.value : "";
            handleBlankSubmit(q, value);
            return;
          }

          // multipleChoice
          const checked = form.querySelector("input[name='choice']:checked");
          const val = checked ? checked.value : null;
          handleMCQSubmit(q, val);
        } catch (_) {
          state.isGrading = false;
        }
      });

      paint();
    }
  });
})();
