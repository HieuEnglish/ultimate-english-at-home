/* assets/js/tests/age/13-18-writing.js
   Runner: Ages 13–18 • Writing (IELTS-inspired)

   Loads the question bank (assets/data/tests-13-18-writing.js) and runs a
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
*/

(function () {
  "use strict";

  const SLUG = "age-13-18-writing";
  const BANK_SRC = "assets/data/tests-13-18-writing.js";
  const TIME_LIMIT_SEC = 60 * 60; // 60 minutes (easier than IELTS)
  const MAX_OBJECTIVE = 10;
  const MAX_QUESTIONS = 12;

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

  function safeTextWithBreaks(v) {
    return safeText(v).replace(/\n/g, "<br>");
  }

  function normalizeAnswerText(v) {
    return String(v == null ? "" : v)
      .trim()
      .toLowerCase()
      .replace(/[.,!?;:"()]/g, "")
      .replace(/\s+/g, " ");
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

  function isWritingType(t) {
    const s = String(t || "").toLowerCase();
    return s === "prompt" || s === "essay";
  }

  function taskLabel(q) {
    const t = String(q && q.task ? q.task : "").toLowerCase();
    if (t === "task1") return "Task 1";
    if (t === "task2") return "Task 2";
    return "";
  }

  function pointsPossible(q) {
    const p = Number(q && q.points);
    if (Number.isFinite(p)) return Math.max(0, p);
    return 1;
  }

  function formatTime(sec) {
    const s = Math.max(0, Math.floor(Number(sec) || 0));
    const m = Math.floor(s / 60);
    const r = s % 60;
    return String(m).padStart(2, "0") + ":" + String(r).padStart(2, "0");
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

  function evaluateChecks(text, rubric) {
    const checks = rubric && Array.isArray(rubric.checks) ? rubric.checks : [];
    if (!checks.length) return [];

    const raw = String(text || "");
    const wc = wordCount(raw);
    const loose = normalizeLoose(raw);
    const trimmed = raw.trim();

    return checks.map((c) => {
      const type = String(c?.type || "").toLowerCase();
      const label = String(c?.label || c?.id || "Check");
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
        ok = list.some((s) => trimmed.endsWith(String(s)));
      } else if (type === "mincharcount") {
        const ch = String(c.value?.char || "");
        const min = Number(c.value?.min || 0);
        ok = countChar(raw, ch) >= min;
      }

      return { id: String(c?.id || ""), label, ok };
    });
  }

  function scoreWritingFromChecks(checks) {
    const list = Array.isArray(checks) ? checks : [];
    if (!list.length) return { earned: 0, possible: 1 };
    const earned = list.filter((c) => !!c && c.ok).length;
    const possible = list.length;
    return { earned, possible };
  }

  function writingPointsPossible(q) {
    const checks = q && q.rubric && Array.isArray(q.rubric.checks) ? q.rubric.checks : [];
    return checks.length ? checks.length : 1; // completion fallback
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
        <strong>Ages 13–18 Writing (IELTS-inspired)</strong>
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
    const q = state.questions[state.index] || {};
    const tl = taskLabel(q);
    const leftLabel = tl ? `${tl} • Question ${n} of ${total}` : `Question ${n} of ${total}`;

    return `
      <div style="display:flex; align-items:center; justify-content:space-between; gap:10px; flex-wrap:wrap">
        <div style="display:flex; align-items:center; gap:10px; flex-wrap:wrap">
          <div style="font-weight:800; color: var(--muted)">${leftLabel}</div>
          <div class="chip" aria-label="Time remaining" style="font-weight:900">${formatTime(state.timeRemaining)}</div>
        </div>
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

  function renderWritingForm(q) {
    const prompt = safeTextWithBreaks(q.question || "Write");
    const rubric = q && q.rubric ? q.rubric : null;
    const checks = rubric && Array.isArray(rubric.checks) ? rubric.checks : [];

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

    return `
      ${checklistHtml}

      <form data-form="question" data-qtype="writing" style="margin-top:12px">
        <fieldset style="border:1px solid var(--border); border-radius:16px; padding:14px; background: var(--surface2)">
          <legend style="padding:0 8px; font-weight:900">${prompt}</legend>

          <div style="display:flex; align-items:center; justify-content:space-between; gap:10px; flex-wrap:wrap; margin-top:10px">
            <div style="color:var(--muted); font-weight:800">Word count: <span data-word-count>0</span></div>
            <div style="color:var(--muted)">Write in your own words.</div>
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

    const type = String(q.type || "multipleChoice").toLowerCase();

    let body = "";
    if (type === "prompt" || type === "essay") body = renderWritingForm(q);
    else if (type === "fillintheblank") body = renderFillBlankForm(q);
    else body = renderMCQForm(q);

    return `${top}${renderPassage(q)}${body}`;
  }

  function renderFeedback(state) {
    const q = state.questions[state.index];
    const total = state.questions.length;
    const n = state.index + 1;
    const tl = taskLabel(q);
    const leftLabel = tl ? `${tl} • Question ${n} of ${total}` : `Question ${n} of ${total}`;

    const type = String(q.type || "multipleChoice").toLowerCase();
    const nextLabel = n >= total ? "Finish" : "Next";

    if (state.lastWasSkipped) {
      return `
        <div style="display:flex; align-items:center; justify-content:space-between; gap:10px; flex-wrap:wrap">
          <div style="display:flex; align-items:center; gap:10px; flex-wrap:wrap"><div style="font-weight:800; color: var(--muted)">${leftLabel}</div><div class="chip" aria-label="Time remaining" style="font-weight:900">${formatTime(state.timeRemaining)}</div></div>
          <button class="btn" type="button" data-action="restart" aria-label="Restart the test">Restart</button>
        </div>

        <div class="note" style="margin-top:12px" aria-live="polite">
          <strong>⏭️ Skipped</strong>
          <p style="margin:8px 0 0">No points earned for this question.</p>
        </div>

        <div class="actions" style="margin-top:12px">
          <button class="btn btn--primary" type="button" data-action="next">${nextLabel}</button>
        </div>
      `;
    }

    if (type === "prompt" || type === "essay") {
      const userText = state.lastResponse != null ? String(state.lastResponse) : "";
      const checks = Array.isArray(state.lastChecks) ? state.lastChecks : [];
      const met = checks.filter((c) => c.ok).length;
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
            <div style="font-weight:900">Auto-score: ${we} / ${wp} (${wp ? Math.round((we / wp) * 100) : 0}%)</div>
            <p style="margin:8px 0 0; opacity:.92">No checklist items were provided, so this task is scored as completed.</p>
          </div>
        `;

      return `
        <div style="display:flex; align-items:center; justify-content:space-between; gap:10px; flex-wrap:wrap">
          <div style="display:flex; align-items:center; gap:10px; flex-wrap:wrap"><div style="font-weight:800; color: var(--muted)">${leftLabel}</div><div class="chip" aria-label="Time remaining" style="font-weight:900">${formatTime(state.timeRemaining)}</div></div>
          <button class="btn" type="button" data-action="restart" aria-label="Restart the test">Restart</button>
        </div>

        <div class="note" style="margin-top:12px" aria-live="polite">
          <strong>✍️ Saved</strong>
          <p style="margin:8px 0 0">This writing task is auto-scored using the checklist below.</p>
          ${checksHtml}
        </div>

        <details style="margin-top:12px">
          <summary style="cursor:pointer; font-weight:900">Show what you wrote</summary>
          <div style="white-space:pre-wrap; margin-top:10px; padding:12px; border:1px solid var(--border); border-radius:14px; background: var(--surface2)">${safeText(userText || "")}</div>
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
      const correctText = q.answer != null ? String(Array.isArray(q.answer) ? q.answer[0] : q.answer) : "";
      const chosenText = state.lastBlank != null ? String(state.lastBlank) : "";
      detailHtml = ok
        ? `<p style="margin:8px 0 0">Correct. +${state.lastPointsEarned} point(s)</p>`
        : `<p style="margin:8px 0 0">Correct answer: <strong>${safeText(correctText)}</strong></p>
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
        <div style="display:flex; align-items:center; gap:10px; flex-wrap:wrap"><div style="font-weight:800; color: var(--muted)">${leftLabel}</div><div class="chip" aria-label="Time remaining" style="font-weight:900">${formatTime(state.timeRemaining)}</div></div>
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

    const rows = state.questions
      .map((q, i) => {
        const r = state.responses[q.id] || {};
        const type = String(q.type || "").toLowerCase();
        const tl = taskLabel(q);
        const prefix = tl ? `${tl} • ` : "";

        let status = "";
        if (r.skipped) status = "⏭️ Skipped";
        else if (isWritingType(type)) status = "✍️ Scored";
        else status = r.correct ? "✅ Correct" : "❌ Wrong";

        let extra = "";
        if (!isWritingType(type)) {
          extra = `<div style="margin-top:6px; color: var(--muted)">Points: ${Number(r.pointsEarned || 0)} / ${Number(
            r.pointsPossible || 0
          )}</div>`;
        } else {
          extra = `<div style="margin-top:6px; color: var(--muted)">Points: ${Number(r.pointsEarned || 0)} / ${Number(
            r.pointsPossible || 0
          )}</div>`;
          if (Array.isArray(r.checks) && r.checks.length) {
            const met = r.checks.filter((c) => c.ok).length;
            extra += `<div style="margin-top:6px; color: var(--muted)">Checks: ${met} / ${r.checks.length}</div>`;
          }
        }

        return `
          <li style="display:flex; gap:10px; align-items:flex-start; padding:8px 0; border-bottom:1px solid var(--border)">
            <span aria-hidden="true">${safeText(status.split(" ")[0])}</span>
            <span style="min-width:0"><b>Q${i + 1}:</b> ${safeText(prefix + (q.question || ""))}
              ${extra}
            </span>
          </li>
        `;
      })
      .join("");

    return `
      <div class="note" style="margin-top:0">
        <strong>Finished!</strong>
        <p style="margin:8px 0 0">Total score: <strong>${earned}</strong> / ${max} (${pct}%)</p>
        <p style="margin:8px 0 0; opacity:.92">Objective score: ${objEarned} / ${objMax} (${objPct}%)</p>
        ${promptTotal ? `<p style="margin:8px 0 0; opacity:.92">Writing score: ${wrEarned} / ${wrMax} (${wrPct}%) • Tasks completed: <strong>${promptDone}</strong> / ${promptTotal}</p>` : ""}
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

        timeRemaining: TIME_LIMIT_SEC,
        timerId: null,

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

        lastWritingPointsPossible: 0,
        lastWritingPointsEarned: 0,

        lastError: "",

        responses: {} // q.id -> { user, correct?, skipped?, pointsEarned?, pointsPossible?, checks? }
      };

      function recalcTotals() {
        state.totalMaxPoints = (Number(state.objectiveMaxPoints) || 0) + (Number(state.writingMaxPoints) || 0);
        state.totalEarnedPoints =
          (Number(state.objectiveEarnedPoints) || 0) + (Number(state.writingEarnedPoints) || 0);
      }

      function stopTimer() {
        if (state.timerId) {
          clearInterval(state.timerId);
          state.timerId = null;
        }
      }

      function startTimer() {
        if (state.timerId) return;
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

          // Refresh timer chip if present
          try {
            const chip = host.querySelector('[aria-label="Time remaining"]');
            if (chip) chip.textContent = formatTime(state.timeRemaining);
          } catch (_) {}
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

          const objective = prepared.filter((q) => !isWritingType(q?.type));
          const writing = prepared.filter((q) => isWritingType(q?.type));

          const task1 = writing.filter((q) => String(q?.task || "").toLowerCase() === "task1");
          const task2 = writing.filter((q) => String(q?.task || "").toLowerCase() === "task2");

          shuffleInPlace(objective);
          shuffleInPlace(task1);
          shuffleInPlace(task2);
          shuffleInPlace(writing);

          const objPick = objective.slice(0, Math.min(MAX_OBJECTIVE, objective.length));

          const t1Pick = task1.length ? task1.slice(0, 1) : writing.slice(0, 1);
          const remaining = writing.filter((q) => !t1Pick.includes(q));
          const t2Pick = task2.length ? task2.slice(0, 1) : remaining.slice(0, 1);

          const combined = objPick.concat(t1Pick).concat(t2Pick).filter(Boolean).slice(0, MAX_QUESTIONS);

          state.questions = combined;
          state.index = 0;

          state.objectiveCount = combined.filter((q) => !isWritingType(q?.type)).length;
          state.objectiveMaxPoints = combined
            .filter((q) => !isWritingType(q?.type))
            .reduce((sum, q) => sum + pointsPossible(q), 0);
          state.objectiveEarnedPoints = 0;

          state.writingMaxPoints = combined
            .filter((q) => isWritingType(q?.type))
            .reduce((sum, q) => sum + writingPointsPossible(q), 0);
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
          state.lastWritingPointsPossible = 0;
          state.lastWritingPointsEarned = 0;
          state.responses = {};

          stopTimer();
          state.timeRemaining = TIME_LIMIT_SEC;
          state.status = "question";
          paint();
          startTimer();
        } catch (e) {
          state.lastError = e && e.message ? e.message : "Could not load test.";
          state.status = "error";
          paint();
        }
      }

      function restartToIntro() {
        stopTimer();
        state.timeRemaining = TIME_LIMIT_SEC;
        state.status = "intro";
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
        state.responses = {};
        state.lastWasSkipped = false;
        state.lastPointsEarned = 0;
        state.lastWritingPointsPossible = 0;
        state.lastWritingPointsEarned = 0;
        paint();
      }

      function next() {
        state.lastWasSkipped = false;
        state.lastPointsEarned = 0;
        state.lastChecks = [];
        state.lastWritingPointsPossible = 0;
        state.lastWritingPointsEarned = 0;

        if (state.index + 1 >= state.questions.length) {
          stopTimer();
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
        const type = String(q?.type || "").toLowerCase();

        if (isWritingType(type)) {
          const possible = writingPointsPossible(q);
          state.responses[q.id] = {
            ...(state.responses[q.id] || {}),
            skipped: true,
            type,
            pointsEarned: 0,
            pointsPossible: possible,
            checks: []
          };
        } else {
          state.responses[q.id] = {
            ...(state.responses[q.id] || {}),
            skipped: true,
            type,
            pointsEarned: 0,
            pointsPossible: pointsPossible(q)
          };
        }

        state.lastWasSkipped = true;
        state.lastIsCorrect = false;
        state.lastChoice = null;
        state.lastBlank = "";
        state.lastResponse = "";
        state.lastChecks = [];
        state.lastPointsEarned = 0;
        state.lastWritingPointsPossible = 0;
        state.lastWritingPointsEarned = 0;
        state.status = "feedback";
        paint();
      }

      function gradeFillBlank(q, userText) {
        const userNorm = normalizeAnswerText(userText);
        const answer = q && q.answer;

        const accepted = [];
        if (Array.isArray(q.acceptedAnswers)) accepted.push(...q.acceptedAnswers);
        if (Array.isArray(answer)) accepted.push(...answer);
        else if (answer != null) accepted.push(answer);

        const ok = accepted.some((a) => normalizeAnswerText(a) === userNorm);
        return { ok, accepted };
      }

      function handleSubmit(form) {
        const q = state.questions[state.index];
        const type = String(q?.type || "").toLowerCase();
        state.lastWasSkipped = false;

        if (isWritingType(type)) {
          const txt = form.querySelector("textarea[name='response']")?.value || "";
          const checks = evaluateChecks(txt, q.rubric);

          let earned = 0;
          let possible = 1;

          if (checks.length) {
            const s = scoreWritingFromChecks(checks);
            earned = s.earned;
            possible = s.possible;
          } else {
            const t = String(txt || "").trim();
            earned = t ? 1 : 0;
            possible = 1;
          }

          state.lastResponse = txt;
          state.lastChecks = checks;

          state.lastWritingPointsEarned = earned;
          state.lastWritingPointsPossible = possible;

          state.promptDoneCount += 1;

          state.writingEarnedPoints += earned;
          recalcTotals();

          state.responses[q.id] = {
            type,
            user: txt,
            checks,
            pointsEarned: earned,
            pointsPossible: possible
          };

          state.status = "feedback";
          paint();
          return;
        }

        const possible = pointsPossible(q);
        let earned = 0;
        let ok = false;

        if (type === "fillintheblank") {
          const blank = form.querySelector("input[name='blank']")?.value || "";
          const graded = gradeFillBlank(q, blank);
          ok = graded.ok;
          earned = ok ? possible : 0;

          state.lastBlank = blank;
          state.lastChoice = null;
          state.lastIsCorrect = ok;
          state.lastPointsEarned = earned;

          state.responses[q.id] = {
            type,
            user: blank,
            correct: ok,
            pointsEarned: earned,
            pointsPossible: possible
          };
        } else {
          const chosen = form.querySelector("input[name='choice']:checked")?.value;
          const chosenIdx = Number(chosen);
          ok = Number.isFinite(chosenIdx) && chosenIdx === Number(q.answer);
          earned = ok ? possible : 0;

          state.lastChoice = chosenIdx;
          state.lastBlank = "";
          state.lastIsCorrect = ok;
          state.lastPointsEarned = earned;

          state.responses[q.id] = {
            type,
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

      stage.addEventListener("click", (e) => {
        const btn = e.target && e.target.closest ? e.target.closest("[data-action]") : null;
        if (!btn) return;
        const action = btn.getAttribute("data-action");
        if (!action) return;

        if (action === "start") start();
        else if (action === "retry") start();
        else if (action === "restart") restartToIntro();
        else if (action === "next") next();
        else if (action === "skip") {
          if (state.status === "question") skipCurrent();
        }
      });

      stage.addEventListener("submit", (e) => {
        const form = e.target;
        if (!form || !form.matches || !form.matches("form[data-form='question']")) return;
        e.preventDefault();
        if (state.status !== "question") return;
        handleSubmit(form);
      });

      paint();
    }
  });
})();
