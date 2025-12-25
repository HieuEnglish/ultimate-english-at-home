/* assets/js/tests/age/11-12-writing.js
   Runner: Ages 11–12 • Writing

   Loads the question bank (assets/data/tests-11-12-writing.js) and runs a
   simple, accessible, one-question-at-a-time writing practice.

   Supported question types:
   - multipleChoice
   - trueFalse
   - fillInTheBlank
   - prompt / essay (free response; auto-checkable requirements)

   Randomization (structured):
   - Objective questions are shuffled first
   - Writing tasks are shuffled second
   - Option order is shuffled for MCQ/TF

   Updates (this file):
   - Ensures every question has a stable id (prevents duplicate/blank ids breaking inputs + results)
   - Adds true/false defaults when options are missing
   - More resilient bank loader (handles existing script and validates after a tick)
   - Better fill-blank normalization + supports acceptedAnswers + array answers
   - Summary includes a per-question review table (prompt, your answer, correct/score, points)
   - Adds “Save score to Profile” on final summary (uses window.UEAH_SAVE_SCORE if available)
   - Ensures normalized save payload includes:
     • questions: scoringInputs.questions
     • review: scoringInputs.review
*/

(function () {
  "use strict";

  const SLUG = "age-11-12-writing";
  const BANK_SRC = "assets/data/tests-11-12-writing.js";
  const MAX_QUESTIONS = 16;

  const AGE_GROUP = "11-12";
  const SKILL = "writing";

  const store = window.UEAH_TESTS_STORE;
  if (!store || typeof store.registerRunner !== "function") return;

  // -----------------------------
  // Helpers
  // -----------------------------

  function nowIso() {
    try {
      return new Date().toISOString();
    } catch (_) {
      return "";
    }
  }

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

  function safeDomId(v) {
    // For input id/for attributes (not for display)
    return String(v == null ? "" : v)
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9\-_:.]/g, "-")
      .slice(0, 80);
  }

  function normalizeAnswerText(v) {
    // Trim, collapse spaces, lowercase, and strip trailing punctuation.
    return String(v == null ? "" : v)
      .trim()
      .toLowerCase()
      .replace(/\s+/g, " ")
      .replace(/[\s\u00A0]+/g, " ")
      .replace(/[\.\!\?\,\;\:\)\]\}\"\']+$/g, "")
      .trim();
  }

  function normalizeLoose(v) {
    return String(v == null ? "" : v)
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9\s']/g, "")
      .replace(/\s+/g, " ");
  }

  function wordCount(text) {
    const t = String(text || "").trim();
    if (!t) return 0;
    return t.split(/\s+/).filter(Boolean).length;
  }

  function countChar(text, ch) {
    if (!text || !ch) return 0;
    const s = String(text);
    let n = 0;
    for (let i = 0; i < s.length; i++) if (s[i] === ch) n++;
    return n;
  }

  function getType(q) {
    return String((q && q.type) || "multipleChoice").trim();
  }

  function isWritingType(t) {
    const s = String(t || "").toLowerCase();
    return s === "prompt" || s === "essay";
  }

  function typeLabel(q) {
    const t = String(getType(q)).toLowerCase();
    if (t === "fillintheblank") return "Fill in the blank";
    if (t === "truefalse") return "True / False";
    if (t === "prompt" || t === "essay") return "Writing";
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

  function correctTextForBlank(ans, acceptedAnswers) {
    const out = [];
    if (Array.isArray(acceptedAnswers)) out.push(...acceptedAnswers.filter((x) => x != null).map(String));
    if (Array.isArray(ans)) out.push(...ans.filter((x) => x != null).map(String));
    else if (ans != null) out.push(String(ans));
    const uniq = [];
    const seen = new Set();
    out.forEach((s) => {
      const k = normalizeAnswerText(s);
      if (!k) return;
      if (seen.has(k)) return;
      seen.add(k);
      uniq.push(s);
    });
    return uniq.length ? uniq.join(" / ") : "";
  }

  function pointsPossible(q) {
    const p = Number(q && q.points);
    if (Number.isFinite(p)) return Math.max(0, p);
    return 1;
  }

  function ensureIds(qs) {
    return (Array.isArray(qs) ? qs : []).map((q, idx) => {
      if (!isPlainObject(q)) return q;
      const raw = q.id != null && String(q.id).trim() ? String(q.id).trim() : `${SLUG}::idx-${idx}`;
      return { ...q, id: raw };
    });
  }

  function answerIndexFor(q, opts) {
    const ans = q && q.answer;
    const t = String(getType(q)).toLowerCase();

    if (typeof ans === "number" && Number.isFinite(ans)) return ans;

    // Allow boolean answers for True/False
    if (t === "truefalse" && typeof ans === "boolean") return ans ? 0 : 1;

    // Allow string answers that match an option
    if (typeof ans === "string" && Array.isArray(opts) && opts.length) {
      const needle = normalizeAnswerText(ans);
      const idx = opts.findIndex((o) => normalizeAnswerText(o) === needle);
      return idx >= 0 ? idx : NaN;
    }

    return NaN;
  }

  function cloneQuestionWithShuffledOptions(q) {
    if (!isPlainObject(q)) return q;

    const t = String(getType(q)).toLowerCase();
    if (t === "fillintheblank" || isWritingType(t)) return { ...q };

    const originalOptions = getOptionsForQuestion(q);
    if (!Array.isArray(originalOptions) || !originalOptions.length) return { ...q };

    const ansIdx = answerIndexFor(q, originalOptions);
    if (!Number.isFinite(ansIdx)) {
      // Still return options for true/false defaults
      return { ...q, options: Array.isArray(q.options) ? q.options : originalOptions };
    }

    const pairs = originalOptions.map((text, idx) => ({ text, idx }));
    shuffleInPlace(pairs);

    const newOptions = pairs.map((p) => p.text);
    const newAnswer = pairs.findIndex((p) => p.idx === ansIdx);

    return {
      ...q,
      options: newOptions,
      answer: newAnswer
    };
  }

  function evaluateChecks(text, rubric) {
    const checks = rubric && Array.isArray(rubric.checks) ? rubric.checks : [];
    if (!checks.length) return [];

    const raw = String(text || "");
    const wc = wordCount(raw);
    const loose = normalizeLoose(raw);
    const trimmed = raw.trim();
    const trimmedLower = trimmed.toLowerCase();

    return checks.map((c) => {
      const type = String(c && c.type ? c.type : "").toLowerCase();
      const label = String((c && (c.label || c.id)) || "Check");
      let ok = false;

      if (type === "minwords") {
        ok = wc >= Number(c.value || 0);
      } else if (type === "maxwords") {
        ok = wc <= Number(c.value || 0);
      } else if (type === "includesany") {
        const list = Array.isArray(c.value) ? c.value : [];
        ok = list.some((s) => loose.includes(normalizeLoose(s)));
      } else if (type === "includesall") {
        const list = Array.isArray(c.value) ? c.value : [];
        ok = list.every((s) => loose.includes(normalizeLoose(s)));
      } else if (type === "startswith") {
        ok = loose.startsWith(normalizeLoose(c.value || ""));
      } else if (type === "endswithany") {
        const list = Array.isArray(c.value) ? c.value : [];
        ok = list.some((s) => trimmedLower.endsWith(String(s || "").toLowerCase()));
      } else if (type === "mincharcount") {
        const ch = String(c && c.value && c.value.char ? c.value.char : "");
        const min = Number(c && c.value && c.value.min ? c.value.min : 0);
        ok = countChar(raw, ch) >= min;
      }

      return { id: String((c && c.id) || ""), label, ok };
    });
  }

  function scoreWritingFromChecks(checks, responseText) {
    const list = Array.isArray(checks) ? checks : [];
    if (!list.length) {
      const done = String(responseText || "").trim() ? 1 : 0;
      return { earned: done, possible: 1 };
    }
    const earned = list.filter((c) => !!c && c.ok).length;
    const possible = list.length;
    return { earned, possible };
  }

  function rubricWordHints(q) {
    const checks = q && q.rubric && Array.isArray(q.rubric.checks) ? q.rubric.checks : [];
    let min = null;
    let max = null;

    checks.forEach((c) => {
      const type = String(c && c.type ? c.type : "").toLowerCase();
      const v = Number(c && c.value != null ? c.value : NaN);
      if (!Number.isFinite(v)) return;
      if (type === "minwords") min = min == null ? v : Math.max(min, v);
      if (type === "maxwords") max = max == null ? v : Math.min(max, v);
    });

    return { min, max };
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
        <strong>Ages 11–12 Writing</strong>
        <p style="margin:8px 0 0">Practice sentence accuracy, linking words, paragraph structure, and short writing tasks.</p>
        <p style="margin:8px 0 0; opacity:.92">Tip: Plan quickly (2 ideas), then write, then check punctuation and spelling.</p>
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
    const prompt = safeTextWithBreaks(q.question || "Question");
    const options = getOptionsForQuestion(q);

    const optionsHtml = options
      .map((opt, i) => {
        const id = `opt-${SLUG}-${safeDomId(q.id)}-${i}`;
        return `
          <label for="${id}" style="display:flex; align-items:center; gap:10px; padding:12px; border:1px solid var(--border); border-radius:14px; background: var(--surface2); cursor:pointer">
            <input id="${id}" type="radio" name="choice" value="${i}" required style="margin:0" />
            <span>${safeText(opt)}</span>
          </label>
        `;
      })
      .join("");

    return `
      <form data-form="question" data-qtype="choice" style="margin-top:12px">
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

  function renderWritingForm(q) {
    const prompt = safeTextWithBreaks(q.question || "Write");
    const checks = q && q.rubric && Array.isArray(q.rubric.checks) ? q.rubric.checks : [];
    const hints = rubricWordHints(q);

    const checklistHtml = checks.length
      ? `
        <div class="note" style="margin:12px 0 0; padding:12px 14px">
          <strong>Checklist</strong>
          <ul style="margin:10px 0 0; padding-left:18px">
            ${checks.map((c) => `<li style="margin:4px 0">${safeText(c.label || c.id || "")}</li>`).join("")}
          </ul>
        </div>
      `
      : "";

    const wordHint =
      hints.min != null || hints.max != null
        ? `<span style="color:var(--muted)">Target: ${
            hints.min != null && hints.max != null
              ? `${hints.min}–${hints.max} words`
              : hints.min != null
              ? `${hints.min}+ words`
              : `${hints.max} words max`
          }</span>`
        : `<span style="color:var(--muted)">Write in your own words.</span>`;

    return `
      ${checklistHtml}

      <form data-form="question" data-qtype="writing" style="margin-top:12px">
        <fieldset style="border:1px solid var(--border); border-radius:16px; padding:14px; background: var(--surface2)">
          <legend style="padding:0 8px; font-weight:900">${prompt}</legend>

          <div style="display:flex; align-items:center; justify-content:space-between; gap:10px; flex-wrap:wrap; margin-top:10px">
            <div style="color:var(--muted); font-weight:800">Word count: <span data-word-count>0</span></div>
            ${wordHint}
          </div>

          <label style="display:block; margin-top:12px">
            <span class="sr-only">Your writing</span>
            <textarea
              name="response"
              rows="8"
              style="width:100%; padding:12px 12px; border:1px solid var(--border); border-radius:14px; background: var(--surface); resize:vertical"
              placeholder="Type here"
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

    const t = String(getType(q)).toLowerCase();
    let body = "";
    if (isWritingType(t)) body = renderWritingForm(q);
    else if (t === "fillintheblank") body = renderFillBlankForm(q);
    else body = renderMCQForm(q);

    return `${top}${renderPassage(q)}${body}`;
  }

  function renderFeedback(state) {
    const q = state.questions[state.index];
    const total = state.questions.length;
    const n = state.index + 1;

    const t = String(getType(q)).toLowerCase();
    const nextLabel = n >= total ? "Finish" : "Next";

    if (state.lastWasSkipped) {
      const possible = Number(state.lastPointsPossible || 0);
      return `
        <div style="display:flex; align-items:center; justify-content:space-between; gap:10px; flex-wrap:wrap">
          <div style="font-weight:800; color: var(--muted)">Question ${n} of ${total}</div>
          <button class="btn" type="button" data-action="restart" aria-label="Restart the test">Restart</button>
        </div>

        <div class="note" style="margin-top:12px" aria-live="polite">
          <strong>⏭️ Skipped</strong>
          <p style="margin:8px 0 0">Points: <strong>0</strong> / ${possible}</p>
        </div>

        <div class="actions" style="margin-top:12px">
          <button class="btn btn--primary" type="button" data-action="next">${nextLabel}</button>
        </div>
      `;
    }

    if (isWritingType(t)) {
      const userText = state.lastResponse != null ? String(state.lastResponse) : "";
      const checks = Array.isArray(state.lastChecks) ? state.lastChecks : [];
      const met = checks.filter((c) => c && c.ok).length;
      const totalChecks = checks.length;

      const wp = Number(state.lastWritingPointsPossible || 0);
      const we = Number(state.lastWritingPointsEarned || 0);

      const checksHtml = totalChecks
        ? `
          <div style="margin-top:10px">
            <div style="font-weight:900">Auto-score: ${we} / ${wp} (${wp ? Math.round((we / wp) * 100) : 0}%)</div>
            <div style="margin-top:8px; font-weight:900">Checks met: ${met} / ${totalChecks}</div>
            <ul style="margin:10px 0 0; padding-left:18px">
              ${checks.map((c) => `<li style="margin:4px 0">${c.ok ? "✅" : "❌"} ${safeText(c.label)}</li>`).join("")}
            </ul>
          </div>
        `
        : `
          <div style="margin-top:10px">
            <div style="font-weight:900">Completed: ${we ? "✅ Yes" : "❌ No"}</div>
            <p style="margin:8px 0 0; opacity:.92">No checklist items were provided, so this task is scored by completion.</p>
          </div>
        `;

      return `
        <div style="display:flex; align-items:center; justify-content:space-between; gap:10px; flex-wrap:wrap">
          <div style="font-weight:800; color: var(--muted)">Question ${n} of ${total}</div>
          <button class="btn" type="button" data-action="restart" aria-label="Restart the test">Restart</button>
        </div>

        <div class="note" style="margin-top:12px" aria-live="polite">
          <strong>✍️ Saved</strong>
          <p style="margin:8px 0 0">This writing task is auto-scored using the checklist below.</p>
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
    if (t === "fillintheblank") {
      const chosenText = state.lastBlank != null ? String(state.lastBlank) : "";
      const correctText = correctTextForBlank(q && q.answer, q && q.acceptedAnswers);

      detailHtml = ok
        ? `<p style="margin:8px 0 0">Correct.</p>
           <p style="margin:8px 0 0; opacity:.92">Points: <strong>${state.lastPointsEarned}</strong> / ${state.lastPointsPossible}</p>`
        : `<p style="margin:8px 0 0">Correct answer: <strong>${safeText(correctText || "(not set)")}</strong></p>
           <p style="margin:8px 0 0; opacity:.92">You typed: <strong>${safeText(chosenText || "(blank)")}</strong></p>
           <p style="margin:8px 0 0; opacity:.92">Points: <strong>${state.lastPointsEarned}</strong> / ${state.lastPointsPossible}</p>`;
    } else {
      const correctIdx = Number(q && q.answer);
      const chosenIdx = Number(state.lastChoice);

      const correctText = optionAt(q, correctIdx);
      const chosenText = optionAt(q, chosenIdx);

      detailHtml = ok
        ? `<p style="margin:8px 0 0">Correct.</p>
           <p style="margin:8px 0 0; opacity:.92">Points: <strong>${state.lastPointsEarned}</strong> / ${state.lastPointsPossible}</p>`
        : `<p style="margin:8px 0 0">Correct answer: <strong>${safeText(correctText || "(not set)")}</strong></p>
           <p style="margin:8px 0 0; opacity:.92">You chose: <strong>${safeText(chosenText || "(none)")}</strong></p>
           <p style="margin:8px 0 0; opacity:.92">Points: <strong>${state.lastPointsEarned}</strong> / ${state.lastPointsPossible}</p>`;
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

  function renderReviewTable(state) {
    const qs = Array.isArray(state.questions) ? state.questions : [];
    if (!qs.length) return "";

    const rows = qs
      .map((q, i) => {
        const id = q && q.id != null ? String(q.id) : "";
        const r = (id && state.responses[id]) || null;

        const t = String(getType(q)).toLowerCase();
        const typeTxt = typeLabel(q);

        const prompt = safeText(q && q.question ? String(q.question) : "");
        const passage =
          q && q.passage
            ? `<div style="margin-top:6px; opacity:.95"><strong>Passage:</strong> ${safeText(String(q.passage))}</div>`
            : "";

        let yourAnswer = "";
        let correct = "";
        let result = "";
        let points = "";

        if (!r) {
          result = "—";
          points = "—";
        } else if (r.skipped) {
          yourAnswer = "Skipped";
          correct = isWritingType(t)
            ? "—"
            : safeText(
                t === "fillintheblank"
                  ? correctTextForBlank(q && q.answer, q && q.acceptedAnswers) || "(not set)"
                  : optionAt(q, Number(q && q.answer)) || "(not set)"
              );
          result = "⏭️";
          points = `0 / ${Number(r.pointsPossible || 0)}`;
        } else if (isWritingType(t)) {
          const checks = Array.isArray(r.checks) ? r.checks : [];
          const met = checks.length ? checks.filter((c) => c && c.ok).length : Number(r.pointsEarned || 0) ? 1 : 0;
          const total = checks.length ? checks.length : 1;

          yourAnswer = r.user ? "Response saved" : "(blank)";
          correct = checks.length ? `Checks: ${met} / ${total}` : `Completed: ${Number(r.pointsEarned || 0) ? "Yes" : "No"}`;
          result = "✍️";
          points = `${Number(r.pointsEarned || 0)} / ${Number(r.pointsPossible || 0)}`;
        } else if (t === "fillintheblank") {
          yourAnswer = r.user != null && String(r.user).trim() ? String(r.user) : "(blank)";
          correct = correctTextForBlank(q && q.answer, q && q.acceptedAnswers) || "(not set)";
          result = r.correct ? "✅" : "❌";
          points = `${Number(r.pointsEarned || 0)} / ${Number(r.pointsPossible || 0)}`;
        } else {
          const chosenIdx = Number(r.user);
          const correctIdx = Number(q && q.answer);
          yourAnswer = optionAt(q, chosenIdx) || "(none)";
          correct = optionAt(q, correctIdx) || "(not set)";
          result = r.correct ? "✅" : "❌";
          points = `${Number(r.pointsEarned || 0)} / ${Number(r.pointsPossible || 0)}`;
        }

        return `
          <tr>
            <td style="padding:10px 10px; border-top:1px solid var(--border); font-weight:800; white-space:nowrap">${i + 1}</td>
            <td style="padding:10px 10px; border-top:1px solid var(--border)">
              <div style="font-weight:900">${safeText(typeTxt)}</div>
              <div style="margin-top:6px">${prompt}</div>
              ${passage}
            </td>
            <td style="padding:10px 10px; border-top:1px solid var(--border); font-weight:800">${safeText(yourAnswer || "")}</td>
            <td style="padding:10px 10px; border-top:1px solid var(--border); font-weight:800">${safeText(correct || "")}</td>
            <td style="padding:10px 10px; border-top:1px solid var(--border); font-weight:900; white-space:nowrap">${safeText(result || "")}</td>
            <td style="padding:10px 10px; border-top:1px solid var(--border); font-weight:900; white-space:nowrap">${safeText(points || "")}</td>
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
                <th scope="col" style="text-align:left; padding:10px 10px; border-top:1px solid var(--border); color: var(--muted)">Correct / Checks</th>
                <th scope="col" style="text-align:left; padding:10px 10px; border-top:1px solid var(--border); color: var(--muted)">Result</th>
                <th scope="col" style="text-align:left; padding:10px 10px; border-top:1px solid var(--border); color: var(--muted)">Points</th>
              </tr>
            </thead>
            <tbody>
              ${rows}
            </tbody>
          </table>
        </div>
      </details>
    `;
  }

  function renderSummary(state) {
    const total = state.questions.length;

    const earned = state.totalEarnedPoints;
    const max = state.totalMaxPoints;
    const pct = max ? Math.round((earned / max) * 100) : 0;

    const objectiveTotal = state.objectiveCount;
    const promptTotal = total - objectiveTotal;

    const objEarned = state.objectiveEarnedPoints;
    const objMax = state.objectiveMaxPoints;
    const objPct = objMax ? Math.round((objEarned / objMax) * 100) : 0;

    const wrEarned = state.writingEarnedPoints;
    const wrMax = state.writingMaxPoints;
    const wrPct = wrMax ? Math.round((wrEarned / wrMax) * 100) : 0;

    const promptDone = state.promptDoneCount;

    const canSave =
      !!(window.UEAH_SAVE_SCORE && typeof window.UEAH_SAVE_SCORE.save === "function") && !state.isSaving && !state.savedMsg;

    const savedNote = state.savedMsg
      ? `
        <div class="note" style="margin-top:12px">
          <strong>Saved to Profile</strong>
          <p style="margin:8px 0 0">${safeText(state.savedMsg)}</p>
          <p style="margin:8px 0 0; opacity:.9">Open <strong>Profile</strong> to view progress and your certification.</p>
        </div>
      `
      : "";

    return `
      <div class="note" style="margin-top:0">
        <strong>Finished!</strong>
        <p style="margin:8px 0 0">Total score: <strong>${earned}</strong> / ${max} (${pct}%)</p>
        <p style="margin:8px 0 0; opacity:.92">Objective score: ${objEarned} / ${objMax} (${objPct}%)</p>
        ${
          promptTotal
            ? `<p style="margin:8px 0 0; opacity:.92">Writing score: ${wrEarned} / ${wrMax} (${wrPct}%) • Tasks completed: <strong>${promptDone}</strong> / ${promptTotal}</p>`
            : ""
        }
        <p style="margin:8px 0 0">Tip: Repeat the test to practice again. The question order changes each time.</p>
      </div>

      ${renderReviewTable(state)}

      <div class="actions" style="margin-top:12px; display:flex; gap:10px; flex-wrap:wrap">
        <button class="btn btn--primary" type="button" data-action="restart">Play again</button>
        <button class="btn" type="button" data-action="save" ${canSave ? "" : "disabled"} aria-label="Save score to Profile">
          ${state.isSaving ? "Saving…" : "Save score to Profile"}
        </button>
      </div>

      ${savedNote}
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

        objectiveCount: 0,
        objectiveMaxPoints: 0,
        objectiveEarnedPoints: 0,

        writingMaxPoints: 0,
        writingEarnedPoints: 0,

        totalMaxPoints: 0,
        totalEarnedPoints: 0,

        promptDoneCount: 0,

        lastChoice: null,
        lastBlank: "",
        lastResponse: "",
        lastChecks: [],
        lastIsCorrect: false,
        lastWasSkipped: false,
        lastPointsEarned: 0,
        lastPointsPossible: 0,

        lastWritingPointsPossible: 0,
        lastWritingPointsEarned: 0,

        lastError: "",

        // Save-to-profile state
        isSaving: false,
        savedMsg: "",

        // q.id -> { user, correct?, skipped?, pointsEarned?, pointsPossible?, checks? }
        responses: Object.create(null)
      };

      function recalcTotals() {
        state.totalMaxPoints = (Number(state.objectiveMaxPoints) || 0) + (Number(state.writingMaxPoints) || 0);
        state.totalEarnedPoints =
          (Number(state.objectiveEarnedPoints) || 0) + (Number(state.writingEarnedPoints) || 0);
      }

      function resetRunState() {
        state.questions = [];
        state.index = 0;

        state.objectiveCount = 0;
        state.objectiveMaxPoints = 0;
        state.objectiveEarnedPoints = 0;

        state.writingMaxPoints = 0;
        state.writingEarnedPoints = 0;

        state.totalMaxPoints = 0;
        state.totalEarnedPoints = 0;

        state.promptDoneCount = 0;

        state.lastChoice = null;
        state.lastBlank = "";
        state.lastResponse = "";
        state.lastChecks = [];
        state.lastIsCorrect = false;
        state.lastWasSkipped = false;
        state.lastPointsEarned = 0;
        state.lastPointsPossible = 0;

        state.lastWritingPointsPossible = 0;
        state.lastWritingPointsEarned = 0;

        state.lastError = "";

        state.isSaving = false;
        state.savedMsg = "";

        state.responses = Object.create(null);
      }

      function paint() {
        if (state.status === "intro") stage.innerHTML = renderIntro();
        else if (state.status === "loading") stage.innerHTML = renderLoading();
        else if (state.status === "question") stage.innerHTML = renderQuestionScreen(state);
        else if (state.status === "feedback") stage.innerHTML = renderFeedback(state);
        else if (state.status === "summary") stage.innerHTML = renderSummary(state);
        else if (state.status === "error") stage.innerHTML = renderError(state.lastError);
        else stage.innerHTML = renderIntro();

        // Word count for writing tasks
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

      function buildQuestionSet(bankRaw) {
        const cleaned = ensureIds((Array.isArray(bankRaw) ? bankRaw : []).filter(isPlainObject)).map((q) =>
          isPlainObject(q) ? { ...q } : q
        );

        const prepared = cleaned.map((q) => cloneQuestionWithShuffledOptions(q));

        const objective = prepared.filter((q) => !isWritingType(getType(q)));
        const writing = prepared.filter((q) => isWritingType(getType(q)));

        shuffleInPlace(objective);
        shuffleInPlace(writing);

        const desiredObjective = Math.min(12, MAX_QUESTIONS);
        const desiredWriting = MAX_QUESTIONS - desiredObjective;

        const objPick = objective.slice(0, Math.min(desiredObjective, objective.length));
        const wrPick = writing.slice(0, Math.min(desiredWriting, writing.length));

        // Backfill while preserving structure (objective first, then writing)
        let combined = objPick.concat(wrPick);

        if (combined.length < MAX_QUESTIONS) {
          const remaining = MAX_QUESTIONS - combined.length;

          if (wrPick.length < desiredWriting) {
            const moreWr = writing.slice(wrPick.length, wrPick.length + remaining);
            wrPick.push(...moreWr);
          } else {
            const moreObj = objective.slice(objPick.length, objPick.length + remaining);
            objPick.push(...moreObj);
          }

          combined = objPick.concat(wrPick);
        }

        return combined.slice(0, MAX_QUESTIONS);
      }

      async function start() {
        state.status = "loading";
        state.lastError = "";
        state.isSaving = false;
        state.savedMsg = "";
        paint();

        try {
          await ensureBankLoaded(ctx);

          const bank =
            window.UEAH_TEST_BANKS && Array.isArray(window.UEAH_TEST_BANKS[SLUG])
              ? window.UEAH_TEST_BANKS[SLUG]
              : [];

          if (!bank.length) throw new Error("Missing question bank.");

          const combined = buildQuestionSet(bank);
          if (!combined.length) throw new Error("Could not build a writing test from the bank.");

          state.questions = combined;
          state.index = 0;

          const objectiveQs = combined.filter((q) => !isWritingType(getType(q)));
          const writingQs = combined.filter((q) => isWritingType(getType(q)));

          state.objectiveCount = objectiveQs.length;
          state.objectiveMaxPoints = objectiveQs.reduce((sum, q) => sum + pointsPossible(q), 0);
          state.objectiveEarnedPoints = 0;

          state.writingMaxPoints = writingQs.reduce((sum, q) => {
            const checks = q && q.rubric && Array.isArray(q.rubric.checks) ? q.rubric.checks : [];
            return sum + (checks.length ? checks.length : 1);
          }, 0);
          state.writingEarnedPoints = 0;

          recalcTotals();

          state.promptDoneCount = 0;

          state.lastChoice = null;
          state.lastBlank = "";
          state.lastResponse = "";
          state.lastChecks = [];
          state.lastIsCorrect = false;
          state.lastWasSkipped = false;
          state.lastPointsEarned = 0;
          state.lastPointsPossible = 0;
          state.lastWritingPointsPossible = 0;
          state.lastWritingPointsEarned = 0;

          state.responses = Object.create(null);

          state.status = "question";
          paint();

          setTimeout(() => {
            try {
              const el = host.querySelector("input, textarea, button");
              if (el && typeof el.focus === "function") el.focus();
            } catch (_) {}
          }, 0);
        } catch (e) {
          state.lastError = e && e.message ? e.message : "Could not load test.";
          state.status = "error";
          paint();
        }
      }

      function restart() {
        state.status = "intro";
        resetRunState();
        paint();
      }

      function next() {
        state.lastWasSkipped = false;
        state.lastPointsEarned = 0;
        state.lastPointsPossible = 0;
        state.lastChecks = [];
        state.lastWritingPointsPossible = 0;
        state.lastWritingPointsEarned = 0;

        if (state.index + 1 >= state.questions.length) {
          state.status = "summary";
          paint();
          return;
        }

        state.index += 1;
        state.status = "question";
        paint();
      }

      function skipCurrent() {
        const q = state.questions[state.index];
        if (!q || q.id == null) return;

        const t = String(getType(q)).toLowerCase();

        let possible = 0;
        if (isWritingType(t)) {
          const checks = q && q.rubric && Array.isArray(q.rubric.checks) ? q.rubric.checks : [];
          possible = checks.length ? checks.length : 1;
        } else {
          possible = pointsPossible(q);
        }

        state.responses[String(q.id)] = {
          type: t,
          skipped: true,
          pointsEarned: 0,
          pointsPossible: possible
        };

        state.lastWasSkipped = true;
        state.lastIsCorrect = false;
        state.lastChoice = null;
        state.lastBlank = "";
        state.lastResponse = "";
        state.lastChecks = [];
        state.lastPointsEarned = 0;
        state.lastPointsPossible = possible;
        state.lastWritingPointsPossible = 0;
        state.lastWritingPointsEarned = 0;

        state.status = "feedback";
        paint();
      }

      function gradeFillBlank(q, userText) {
        const user = normalizeAnswerText(userText);
        const ans = q && q.answer;
        const extra = Array.isArray(q && q.acceptedAnswers) ? q.acceptedAnswers : [];

        const accepted = [];
        accepted.push(...extra);
        if (Array.isArray(ans)) accepted.push(...ans);
        else if (ans != null) accepted.push(ans);

        const ok = !!user && accepted.some((a) => normalizeAnswerText(a) === user);
        return { ok };
      }

      function handleSubmit(form) {
        const q = state.questions[state.index];
        if (!q || q.id == null) return;

        const t = String(getType(q)).toLowerCase();
        const qid = String(q.id);

        state.lastWasSkipped = false;

        if (isWritingType(t)) {
          const txt = form.querySelector("textarea[name='response']")?.value || "";
          const checks = evaluateChecks(txt, q.rubric);
          const s = scoreWritingFromChecks(checks, txt);

          state.lastResponse = txt;
          state.lastChecks = checks;
          state.lastWritingPointsEarned = s.earned;
          state.lastWritingPointsPossible = s.possible;
          state.lastPointsEarned = s.earned;
          state.lastPointsPossible = s.possible;

          state.promptDoneCount += 1;

          state.writingEarnedPoints += s.earned;
          recalcTotals();

          state.responses[qid] = {
            type: t,
            user: txt,
            checks,
            pointsEarned: s.earned,
            pointsPossible: s.possible
          };

          state.status = "feedback";
          paint();
          return;
        }

        const possible = pointsPossible(q);
        let earned = 0;
        let ok = false;

        if (t === "fillintheblank") {
          const blank = form.querySelector("input[name='blank']")?.value || "";
          ok = gradeFillBlank(q, blank).ok;
          earned = ok ? possible : 0;

          state.lastBlank = blank;
          state.lastChoice = null;
          state.lastIsCorrect = ok;
          state.lastPointsEarned = earned;
          state.lastPointsPossible = possible;

          state.responses[qid] = {
            type: t,
            user: blank,
            correct: ok,
            pointsEarned: earned,
            pointsPossible: possible
          };
        } else {
          const checked = form.querySelector("input[name='choice']:checked");
          const chosenIdx = checked ? Number(checked.value) : NaN;

          ok = Number.isFinite(chosenIdx) && chosenIdx === Number(q && q.answer);
          earned = ok ? possible : 0;

          state.lastChoice = chosenIdx;
          state.lastBlank = "";
          state.lastIsCorrect = ok;
          state.lastPointsEarned = earned;
          state.lastPointsPossible = possible;

          state.responses[qid] = {
            type: t,
            user: chosenIdx,
            correct: ok,
            pointsEarned: earned,
            pointsPossible: possible
          };
        }

        state.objectiveEarnedPoints += earned;
        recalcTotals();

        state.status = "feedback";
        paint();
      }

      // -----------------------------
      // Normalized save input
      // -----------------------------
      // Build a normalized object commonly named scoringInputs.
      // Ensure payload includes:
      //  • questions: scoringInputs.questions
      //  • review: scoringInputs.review
      function buildScoringInputs() {
        const qs = Array.isArray(state.questions) ? state.questions : [];

        // Normalize questions with explicit points:
        // - objective: use pointsPossible(q)
        // - writing: possible = rubric.checks.length or 1
        const questions = qs.map((q) => {
          if (!isPlainObject(q)) return q;

          const t = String(getType(q)).toLowerCase();
          if (isWritingType(t)) {
            const checks = q && q.rubric && Array.isArray(q.rubric.checks) ? q.rubric.checks : [];
            const possible = checks.length ? checks.length : 1;
            return { ...q, points: possible };
          }
          return { ...q, points: pointsPossible(q) };
        });

        // Normalize review as an array aligned to questions order.
        // Shared scoring helper only requires {isCorrect}; keep it consistent.
        const review = qs.map((q) => {
          const id = q && q.id != null ? String(q.id) : "";
          const r = (id && state.responses[id]) || null;
          const t = String(getType(q)).toLowerCase();

          if (!r || r.skipped) return { isCorrect: false };

          if (isWritingType(t)) {
            const pe = Number(r.pointsEarned || 0);
            const pp = Number(r.pointsPossible || 0);
            const ratio = pp ? pe / pp : 0;
            // Binary for shared scoring: treat “mostly met” as correct.
            return { isCorrect: ratio >= 0.6 };
          }

          return { isCorrect: !!r.correct };
        });

        return { questions, review };
      }

      async function saveScoreToProfile() {
        if (!(window.UEAH_SAVE_SCORE && typeof window.UEAH_SAVE_SCORE.save === "function")) {
          state.savedMsg = "Save is not available.";
          paint();
          return;
        }
        if (state.isSaving || state.savedMsg) return;

        state.isSaving = true;
        paint();

        try {
          const earned = Number(state.totalEarnedPoints || 0);
          const max = Number(state.totalMaxPoints || 0);
          const percent = max ? Math.round((earned / max) * 100) : 0;

          const scoringInputs = buildScoringInputs();

          const info = await window.UEAH_SAVE_SCORE.save({
            slug: SLUG,
            ageGroup: AGE_GROUP,
            skill: SKILL,
            timestamp: nowIso(),
            rawCorrect: earned,
            totalQuestions: max,
            percent,

            // Required normalized payload fields:
            questions: scoringInputs.questions,
            review: scoringInputs.review
          });

          state.savedMsg = `Saved: ${info.ageLabel} • ${info.skillLabel} — ${info.normalizedScore}/100 (${info.levelTitle})`;
        } catch (e) {
          state.savedMsg = `Could not save: ${e && e.message ? e.message : "Unknown error"}`;
        } finally {
          state.isSaving = false;
          paint();
        }
      }

      host.addEventListener("click", (e) => {
        const btn = e.target && e.target.closest ? e.target.closest("[data-action]") : null;
        if (!btn) return;
        const action = btn.getAttribute("data-action");
        if (!action) return;

        if (action === "start") {
          e.preventDefault();
          start();
        } else if (action === "retry") {
          e.preventDefault();
          start();
        } else if (action === "restart") {
          e.preventDefault();
          restart();
        } else if (action === "next") {
          e.preventDefault();
          next();
        } else if (action === "skip") {
          e.preventDefault();
          if (state.status === "question") skipCurrent();
        } else if (action === "save") {
          e.preventDefault();
          if (state.status === "summary") saveScoreToProfile();
        }
      });

      host.addEventListener("submit", (e) => {
        const form = e.target;
        if (!form || !form.getAttribute) return;
        if (form.getAttribute("data-form") !== "question") return;

        e.preventDefault();
        if (state.status !== "question") return;

        handleSubmit(form);
      });

      paint();
    }
  });
})();
