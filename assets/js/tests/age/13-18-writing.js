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
   - Writing tasks are shuffled second (prefer Task 1 + Task 2 if present)
   - Option order is shuffled for MCQ/TF (only when explicit options exist AND answer is index-based)

   Updates (this file):
   - Robust true/false support (auto options + boolean/number/string answers)
   - Prevents option-shuffle breaking TF when answer isn't numeric index
   - Bank-loader resilient (existing script + validation tick + already-loaded handling)
   - Ensures stable UNIQUE ids if missing (prevents broken review mapping)
   - Tracks objective vs writing points cleanly, with per-question review
   - Autoscore preview for writing (checklist + word count + completion fallback)
   - Improved normalization for blanks (accept array answers + acceptedAnswers; de-dupe)
   - Skip button (records in review; no points)
   - Timer stops on navigation changes (popstate/pagehide; best-effort)
   - Summary includes “Save score to Profile” (uses window.UEAH_SAVE_SCORE if available)
   - Uses normalized writing scoring inputs. Ensure payload includes:
     • questions: scoringInputs.questions
     • review: scoringInputs.review
*/

(function () {
  "use strict";

  const SLUG = "age-13-18-writing";
  const BANK_SRC = "assets/data/tests-13-18-writing.js";

  const AGE_GROUP = "13-18";
  const SKILL = "writing";

  const TIME_LIMIT_SEC = 60 * 60; // 60 minutes (easier than IELTS)
  const MAX_OBJECTIVE = 10;
  const MAX_QUESTIONS = 12;

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

  function normalizeAnswerText(v) {
    // Tolerant: keeps spaces for phrase matching, strips punctuation.
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

  function normalizeTight(v) {
    // For dedupe / strict compare: remove all non-alphanumerics.
    return String(v == null ? "" : v)
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "");
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

  function normalizeType(t) {
    return String(t || "multipleChoice").trim().toLowerCase();
  }

  function deriveTrueFalseIndex(answer) {
    // Returns 0 for True, 1 for False, or null if unknown.
    if (typeof answer === "number" && Number.isFinite(answer)) {
      if (answer === 0 || answer === 1) return answer;
      return null;
    }
    if (typeof answer === "boolean") return answer ? 0 : 1;
    const s = normalizeTight(answer);
    if (!s) return null;
    if (s === "true" || s === "t" || s === "yes" || s === "y") return 0;
    if (s === "false" || s === "f" || s === "no" || s === "n") return 1;
    return null;
  }

  function getOptionsForQuestion(q) {
    const type = normalizeType(q && q.type);
    if (Array.isArray(q && q.options) && q.options.length) return q.options;
    if (type === "truefalse") return ["True", "False"];
    return [];
  }

  function optionAt(q, idx) {
    const opts = getOptionsForQuestion(q);
    const n = Number(idx);
    if (!Number.isFinite(n)) return "";
    return opts[n] == null ? "" : String(opts[n]);
  }

  function deriveFallbackId(q, idx) {
    const t = normalizeType(q.type);
    const task = String(q.task || "").toLowerCase() || "x";
    const stem = String(q.question || q.prompt || "")
      .trim()
      .slice(0, 24)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    return `${SLUG}::${t}::${task}::${idx}::${stem || "q"}`;
  }

  function ensureUniqueIds(list) {
    const seen = new Set();
    return (Array.isArray(list) ? list : []).map((q, idx) => {
      if (!isPlainObject(q)) return q;
      const base =
        q.id != null && String(q.id).trim() ? String(q.id).trim() : deriveFallbackId(q, idx);

      let id = base;
      if (seen.has(id)) {
        let n = 2;
        while (seen.has(`${base}--${n}`)) n += 1;
        id = `${base}--${n}`;
      }
      seen.add(id);
      return { ...q, id };
    });
  }

  function cloneQuestionWithShuffledOptions(q) {
    if (!isPlainObject(q)) return q;

    const type = normalizeType(q.type);
    const opts = Array.isArray(q.options) ? q.options : null;

    // Only shuffle when:
    // - explicit options exist
    // - answer is numeric index
    // - NOT a writing type
    // - For TF: only safe when answer is numeric index (boolean/string TF should not shuffle)
    if (!opts || !opts.length) return { ...q };
    if (isWritingType(type)) return { ...q };
    if (typeof q.answer !== "number" || !Number.isFinite(q.answer)) return { ...q };

    const pairs = opts.map((text, idx) => ({ text, idx }));
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

  function collectAcceptedBlankAnswers(q) {
    const accepted = [];

    if (q && Array.isArray(q.acceptedAnswers)) accepted.push(...q.acceptedAnswers);

    const ans = q && q.answer;
    if (Array.isArray(ans)) accepted.push(...ans);
    else if (ans != null) accepted.push(ans);

    const uniq = [];
    const seen = new Set();
    accepted.forEach((a) => {
      const s = String(a == null ? "" : a);
      const k = normalizeTight(s);
      if (!k) return;
      if (seen.has(k)) return;
      seen.add(k);
      uniq.push(s);
    });

    return uniq;
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
        // If already loaded, resolve immediately.
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
        <strong>Ages 13–18 Writing (IELTS-inspired)</strong>
        <p style="margin:8px 0 0">Practice sentence accuracy, linking words, paragraph structure, and short writing tasks.</p>
        <p style="margin:8px 0 0; opacity:.92">Tip: Plan quickly (2 ideas), then write, then check punctuation and spelling.</p>
        <p style="margin:8px 0 0; opacity:.92">Time limit: <strong>60 minutes</strong>.</p>
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
        <p style="margin:8px 0 0">${safeTextWithBreaks(p)}</p>
      </div>
    `;
  }

  function renderMCQForm(q) {
    const prompt = safeTextWithBreaks(q.question || "Question");
    const options = getOptionsForQuestion(q);

    const qid = String(q && q.id ? q.id : "q")
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9\-_:.]/g, "-")
      .slice(0, 80);

    const optionsHtml = options
      .map((opt, i) => {
        const id = `opt-${SLUG}-${qid}-${i}`;
        return `
          <label for="${id}" style="display:flex; align-items:flex-start; gap:10px; padding:12px; border:1px solid var(--border); border-radius:14px; background: var(--surface2); cursor:pointer">
            <input id="${id}" type="radio" name="choice" value="${i}" required style="margin-top:3px" />
            <span style="line-height:1.35">${safeText(opt)}</span>
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
      <form data-form="question" data-qtype="blank" style="margin-top:12px">
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
              rows="9"
              style="width:100%; padding:12px 12px; border:1px solid var(--border); border-radius:14px; background: var(--surface); resize:vertical"
              placeholder="Type here"
              required
            ></textarea>
          </label>

          <div class="actions" style="margin-top:12px; display:flex; gap:10px; flex-wrap:wrap">
            <button class="btn btn--primary" type="submit">Done</button>
          </div>
        </fieldset>
      </form>
    `;
  }

  function renderQuestionScreen(state) {
    const q = state.questions[state.index];
    if (!q) return renderError("Missing question.");

    const top = renderTopBar(state);
    const type = normalizeType(q.type);

    let body = "";
    if (isWritingType(type)) body = renderWritingForm(q);
    else if (type === "fillintheblank") body = renderFillBlankForm(q);
    else body = renderMCQForm(q);

    return `${top}${renderPassage(q)}${body}`;
  }

  function renderFeedback(state) {
    const q = state.questions[state.index] || {};
    const total = state.questions.length;
    const n = Math.min(state.index + 1, total);
    const tl = taskLabel(q);
    const leftLabel = tl ? `${tl} • Question ${n} of ${total}` : `Question ${n} of ${total}`;
    const type = normalizeType(q.type);
    const nextLabel = n >= total ? "Finish" : "Next";

    const header = `
      <div style="display:flex; align-items:center; justify-content:space-between; gap:10px; flex-wrap:wrap">
        <div style="display:flex; align-items:center; gap:10px; flex-wrap:wrap">
          <div style="font-weight:800; color: var(--muted)">${leftLabel}</div>
          <div class="chip" aria-label="Time remaining" style="font-weight:900">${formatTime(state.timeRemaining)}</div>
        </div>
        <button class="btn" type="button" data-action="restart" aria-label="Restart the test">Restart</button>
      </div>
    `;

    if (state.lastWasSkipped) {
      return `
        ${header}
        <div class="note" style="margin-top:12px" aria-live="polite">
          <strong>⏭️ Skipped</strong>
          <p style="margin:8px 0 0">No points earned for this question.</p>
        </div>
        <div class="actions" style="margin-top:12px">
          <button class="btn btn--primary" type="button" data-action="next">${nextLabel}</button>
        </div>
      `;
    }

    if (isWritingType(type)) {
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
        ${header}
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
    const explanation = q.explanation ? String(q.explanation).trim() : "";
    const possible = Number(state.lastPointsPossible || 0);
    const earned = Number(state.lastPointsEarned || 0);

    let detailHtml = "";
    if (type === "fillintheblank") {
      const accepted = Array.isArray(state.lastAcceptedAnswers) ? state.lastAcceptedAnswers : [];
      const correctText = accepted.length ? String(accepted[0]) : q.answer != null ? String(q.answer) : "";
      const typed = state.lastBlank != null ? String(state.lastBlank) : "";
      detailHtml = ok
        ? `<p style="margin:8px 0 0">Correct. +${earned} / ${possible} point(s)</p>`
        : `<p style="margin:8px 0 0">Correct answer: <strong>${safeText(correctText || "(not set)")}</strong></p>
           <p style="margin:8px 0 0; opacity:.92">You typed: <strong>${safeText(typed || "(blank)")}</strong></p>`;
    } else {
      const correctIdx =
        type === "truefalse"
          ? deriveTrueFalseIndex(q.answer)
          : typeof q.answer === "number" && Number.isFinite(q.answer)
          ? q.answer
          : null;

      const correctText = optionAt(q, correctIdx) || "(not set)";
      const chosenText = optionAt(q, state.lastChoice) || "(none)";

      detailHtml = ok
        ? `<p style="margin:8px 0 0">Correct. +${earned} / ${possible} point(s)</p>`
        : `<p style="margin:8px 0 0">Correct answer: <strong>${safeText(correctText)}</strong></p>
           <p style="margin:8px 0 0; opacity:.92">You chose: <strong>${safeText(chosenText)}</strong></p>`;
    }

    const explanationHtml = explanation
      ? `<p style="margin:8px 0 0; opacity:.92"><strong>Tip:</strong> ${safeText(explanation)}</p>`
      : "";

    return `
      ${header}
      <div class="note" style="margin-top:12px" aria-live="polite">
        <strong>${icon} ${ok ? "Nice work!" : "Not quite"}</strong>
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

    const canSave =
      !!(window.UEAH_SAVE_SCORE && typeof window.UEAH_SAVE_SCORE.save === "function") &&
      !state.isSaving &&
      !state.savedMsg;

    const savedNote = state.savedMsg
      ? `
        <div class="note" style="margin-top:12px">
          <strong>Saved to Profile</strong>
          <p style="margin:8px 0 0">${safeText(state.savedMsg)}</p>
          <p style="margin:8px 0 0; opacity:.9">Open <strong>Profile</strong> to view progress and your certification.</p>
        </div>
      `
      : "";

    const rows = state.questions
      .map((q, i) => {
        const r = state.responses[q.id] || {};
        const type = normalizeType(q.type);
        const tl = taskLabel(q);
        const prefix = tl ? `${tl} • ` : "";

        let status = "";
        if (r.skipped) status = "⏭️ Skipped";
        else if (isWritingType(type)) status = "✍️ Scored";
        else status = r.correct ? "✅ Correct" : "❌ Wrong";

        let extra = `<div style="margin-top:6px; color: var(--muted)">Points: ${Number(
          r.pointsEarned || 0
        )} / ${Number(r.pointsPossible || 0)}</div>`;

        if (Array.isArray(r.checks) && r.checks.length) {
          const met = r.checks.filter((c) => c.ok).length;
          extra += `<div style="margin-top:6px; color: var(--muted)">Checks: ${met} / ${r.checks.length}</div>`;
        }

        return `
          <li style="display:flex; gap:10px; align-items:flex-start; padding:8px 0; border-bottom:1px solid var(--border)">
            <span aria-hidden="true">${safeText(status.split(" ")[0])}</span>
            <span style="min-width:0">
              <b>Q${i + 1}:</b> ${safeText(prefix + (q.question || q.prompt || ""))}
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
        ${
          promptTotal
            ? `<p style="margin:8px 0 0; opacity:.92">Writing score: ${wrEarned} / ${wrMax} (${wrPct}%)</p>`
            : ""
        }
        <p style="margin:8px 0 0; opacity:.92">Time remaining: ${formatTime(state.timeRemaining)}</p>
      </div>

      <details style="margin-top:12px">
        <summary style="cursor:pointer; font-weight:900">Show review</summary>
        <ul style="list-style:none; padding-left:0; margin:12px 0 0">
          ${rows}
        </ul>
      </details>

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

        timeRemaining: TIME_LIMIT_SEC,
        timerId: null,

        objectiveCount: 0,
        objectiveMaxPoints: 0,
        objectiveEarnedPoints: 0,

        writingMaxPoints: 0,
        writingEarnedPoints: 0,

        totalMaxPoints: 0,
        totalEarnedPoints: 0,

        lastChoice: null,
        lastBlank: "",
        lastResponse: "",
        lastChecks: [],
        lastAcceptedAnswers: [],
        lastIsCorrect: false,
        lastWasSkipped: false,
        lastPointsEarned: 0,
        lastPointsPossible: 0,

        lastWritingPointsPossible: 0,
        lastWritingPointsEarned: 0,

        lastError: "",

        responses: Object.create(null), // q.id -> result object

        // Save to Profile
        isSaving: false,
        savedMsg: ""
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

          const chip = host.querySelector('[aria-label="Time remaining"]');
          if (chip) chip.textContent = formatTime(state.timeRemaining);
        }, 1000);
      }

      function resetRuntimeFlags() {
        state.lastChoice = null;
        state.lastBlank = "";
        state.lastResponse = "";
        state.lastChecks = [];
        state.lastAcceptedAnswers = [];
        state.lastIsCorrect = false;
        state.lastWasSkipped = false;
        state.lastPointsEarned = 0;
        state.lastPointsPossible = 0;
        state.lastWritingPointsPossible = 0;
        state.lastWritingPointsEarned = 0;
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

      function cleanup() {
        stopTimer();
      }

      async function start() {
        cleanup();

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

          const prepared = ensureUniqueIds(
            bank.map((q) => (isPlainObject(q) ? cloneQuestionWithShuffledOptions(q) : q))
          );

          const objective = prepared.filter((q) => isPlainObject(q) && !isWritingType(q?.type));
          const writing = prepared.filter((q) => isPlainObject(q) && isWritingType(q?.type));

          const task1 = writing.filter((q) => String(q?.task || "").toLowerCase() === "task1");
          const task2 = writing.filter((q) => String(q?.task || "").toLowerCase() === "task2");

          shuffleInPlace(objective);
          shuffleInPlace(task1);
          shuffleInPlace(task2);

          const objPick = objective.slice(0, Math.min(MAX_OBJECTIVE, objective.length));

          // Prefer one Task1 + one Task2 if possible; otherwise take up to 2 writing tasks total.
          const pickedWriting = [];
          if (task1.length) pickedWriting.push(task1[0]);
          if (task2.length) pickedWriting.push(task2[0]);

          if (pickedWriting.length < 2 && writing.length) {
            const remaining = writing.filter((q) => !pickedWriting.includes(q));
            shuffleInPlace(remaining);
            while (pickedWriting.length < 2 && remaining.length) pickedWriting.push(remaining.shift());
          }

          const combined = objPick.concat(pickedWriting).filter(Boolean).slice(0, MAX_QUESTIONS);

          if (!combined.length) throw new Error("No questions were selected from the bank.");

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

          state.responses = Object.create(null);

          state.timeRemaining = TIME_LIMIT_SEC;
          resetRuntimeFlags();
          recalcTotals();

          state.status = "question";
          paint();
          startTimer();
        } catch (e) {
          cleanup();
          state.lastError = e && e.message ? e.message : "Could not load test.";
          state.status = "error";
          paint();
        }
      }

      function restartToIntro() {
        cleanup();

        state.status = "intro";
        state.questions = [];
        state.index = 0;

        state.timeRemaining = TIME_LIMIT_SEC;

        state.objectiveCount = 0;
        state.objectiveMaxPoints = 0;
        state.objectiveEarnedPoints = 0;

        state.writingMaxPoints = 0;
        state.writingEarnedPoints = 0;

        state.totalMaxPoints = 0;
        state.totalEarnedPoints = 0;

        state.responses = Object.create(null);
        resetRuntimeFlags();

        state.isSaving = false;
        state.savedMsg = "";

        paint();
      }

      function next() {
        resetRuntimeFlags();

        if (state.index + 1 >= state.questions.length) {
          cleanup();
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
        if (!q || !q.id) return;

        const type = normalizeType(q.type);
        const possible = isWritingType(type) ? writingPointsPossible(q) : pointsPossible(q);

        state.responses[q.id] = {
          type,
          skipped: true,
          pointsEarned: 0,
          pointsPossible: possible
        };

        state.lastWasSkipped = true;
        state.lastIsCorrect = false;
        state.lastPointsEarned = 0;
        state.lastPointsPossible = possible;

        state.status = "feedback";
        paint();
      }

      function gradeFillBlank(q, userText) {
        const userNorm = normalizeTight(userText);
        const accepted = collectAcceptedBlankAnswers(q);
        const ok = !!userNorm && accepted.some((a) => normalizeTight(a) === userNorm);
        return { ok, accepted };
      }

      function gradeChoice(q, chosenIdx) {
        const type = normalizeType(q.type);

        if (!Number.isFinite(chosenIdx)) return { ok: false, correctIdx: null };

        if (type === "truefalse") {
          const correctIdx = deriveTrueFalseIndex(q.answer);
          if (correctIdx != null) return { ok: chosenIdx === correctIdx, correctIdx };

          // fallback: compare chosen option text to answer text
          const chosenText = normalizeTight(optionAt(q, chosenIdx));
          const ansText = normalizeTight(q.answer);
          const ok = !!chosenText && !!ansText && chosenText === ansText;
          return { ok, correctIdx: null };
        }

        if (typeof q.answer === "number" && Number.isFinite(q.answer)) {
          return { ok: chosenIdx === q.answer, correctIdx: q.answer };
        }

        // Fallback: compare option string to answer string
        const chosenText = normalizeTight(optionAt(q, chosenIdx));
        const ansText = normalizeTight(q.answer);
        const ok = !!chosenText && !!ansText && chosenText === ansText;
        return { ok, correctIdx: null };
      }

      function handleSubmit(form) {
        const q = state.questions[state.index];
        if (!q || !q.id) return;

        const type = normalizeType(q.type);
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
        state.lastPointsPossible = possible;

        if (type === "fillintheblank") {
          const blank = form.querySelector("input[name='blank']")?.value || "";
          const graded = gradeFillBlank(q, blank);

          const ok = graded.ok;
          const earned = ok ? possible : 0;

          state.lastBlank = blank;
          state.lastAcceptedAnswers = graded.accepted.slice(0, 8);
          state.lastIsCorrect = ok;
          state.lastPointsEarned = earned;

          state.objectiveEarnedPoints += earned;
          recalcTotals();

          state.responses[q.id] = {
            type,
            user: blank,
            correct: ok,
            pointsEarned: earned,
            pointsPossible: possible
          };

          state.status = "feedback";
          paint();
          return;
        }

        // Choice (MCQ / TF)
        const checked = form.querySelector("input[name='choice']:checked");
        const chosenIdx = checked ? Number(checked.value) : NaN;

        const graded = gradeChoice(q, chosenIdx);
        const ok = graded.ok;
        const earned = ok ? possible : 0;

        state.lastChoice = chosenIdx;
        state.lastIsCorrect = ok;
        state.lastPointsEarned = earned;

        state.objectiveEarnedPoints += earned;
        recalcTotals();

        state.responses[q.id] = {
          type,
          user: chosenIdx,
          correct: ok,
          pointsEarned: earned,
          pointsPossible: possible
        };

        state.status = "feedback";
        paint();
      }

      // -----------------------------
      // Normalized writing scoring inputs
      // Ensure payload includes:
      //  • questions: scoringInputs.questions
      //  • review: scoringInputs.review
      // -----------------------------
      function buildNormalizedWritingScoringInputs() {
        const qs = Array.isArray(state.questions) ? state.questions.filter(isPlainObject) : [];
        const responses = state.responses && typeof state.responses === "object" ? state.responses : Object.create(null);

        // Normalize questions: embed the effective points for each item (objective: q.points|1, writing: checks|1).
        const questions = qs.map((q) => {
          const type = normalizeType(q.type);
          const pts = isWritingType(type) ? writingPointsPossible(q) : pointsPossible(q);
          return { ...q, points: Number.isFinite(pts) ? pts : 1 };
        });

        // Review aligned to questions order. Include pointsEarned/pointsPossible for writing partial credit support.
        const review = questions.map((q) => {
          const r = q && q.id && responses[q.id] ? responses[q.id] : null;
          const pointsPossible = Number(q && q.points);
          const pointsEarned = Number(r && r.pointsEarned);
          const skipped = !!(r && r.skipped);

          return {
            isCorrect: !skipped && Number.isFinite(pointsEarned) && Number.isFinite(pointsPossible)
              ? pointsEarned >= pointsPossible
              : false,
            skipped,
            pointsEarned: Number.isFinite(pointsEarned) ? pointsEarned : 0,
            pointsPossible: Number.isFinite(pointsPossible) ? pointsPossible : 0
          };
        });

        const rawCorrect = review.reduce((sum, r) => sum + (Number(r && r.pointsEarned) || 0), 0);
        const totalQuestions = review.reduce((sum, r) => sum + (Number(r && r.pointsPossible) || 0), 0);
        const percent = totalQuestions ? Math.round((rawCorrect / totalQuestions) * 100) : 0;

        return { questions, review, rawCorrect, totalQuestions, percent };
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
          const scoringInputs = buildNormalizedWritingScoringInputs();

          const info = await window.UEAH_SAVE_SCORE.save({
            slug: SLUG,
            ageGroup: AGE_GROUP,
            skill: SKILL,
            timestamp: nowIso(),

            rawCorrect: scoringInputs.rawCorrect,
            totalQuestions: scoringInputs.totalQuestions,
            percent: scoringInputs.percent,

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

      // Stop timer on navigation (best effort)
      if (!host.__ueahNavHooked) {
        host.__ueahNavHooked = true;
        window.addEventListener(
          "popstate",
          () => {
            cleanup();
          },
          { passive: true }
        );
        window.addEventListener(
          "pagehide",
          () => {
            cleanup();
          },
          { passive: true }
        );
      }

      // Events (delegate)
      stage.addEventListener("click", (e) => {
        const btn = e.target && e.target.closest ? e.target.closest("[data-action]") : null;
        if (!btn) return;
        const action = btn.getAttribute("data-action");
        if (!action) return;

        if (action === "start" || action === "retry") {
          e.preventDefault();
          start();
        } else if (action === "restart") {
          e.preventDefault();
          restartToIntro();
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

      stage.addEventListener("submit", (e) => {
        const form = e.target;
        if (!form || !form.matches || !form.matches("form[data-form='question']")) return;
        e.preventDefault();
        if (state.status !== "question") return;
        handleSubmit(form);
      });

      // Initial paint
      paint();
    }
  });
})();
