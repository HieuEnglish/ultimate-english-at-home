/* assets/js/tests/iels/writing.js
   Runner: IELTS Writing (original prompts)

   - Builds a 2-task test by randomly selecting:
     - 1 Task 1 (Academic-style chart description)
     - 1 Task 2 (essay)
   - Collects written responses, runs auto-checks (word count + simple structure cues),
     shows rubric guidance, and allows optional manual scoring (not an IELTS band claim).

   Bank: assets/data/tests-iels-writing.js
   Global key: window.UEAH_TEST_BANKS["iels-writing"]
*/

(function () {
  "use strict";

  const SLUG = "iels-writing";
  const BANK_SRC = "assets/data/tests-iels-writing.js";

  const TIME_LIMIT_SEC = 60 * 60;

  const store = window.UEAH_TESTS_STORE;
  if (!store || typeof store.registerRunner !== "function") return;

  // -----------------------------
  // Helpers
  // -----------------------------

  function safeText(v) {
    return String(v == null ? "" : v)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }

  function formatTime(sec) {
    const s = Math.max(0, Math.floor(Number(sec) || 0));
    const m = Math.floor(s / 60);
    const r = s % 60;
    return `${String(m).padStart(2, "0")}:${String(r).padStart(2, "0")}`;
  }

  function countWords(text) {
    const t = String(text || "").trim();
    if (!t) return 0;
    return t
      .split(/\s+/)
      .map((w) => w.trim())
      .filter(Boolean).length;
  }

  function normalize(text) {
    return String(text || "").toLowerCase();
  }

  function extractNumbers(text) {
    const t = String(text || "");
    const matches = t.match(/\d+(\.\d+)?%?/g);
    return matches ? matches : [];
  }

  function includesAny(text, phrases) {
    const t = normalize(text);
    return phrases.some((p) => t.includes(String(p).toLowerCase()));
  }

  function taskLabel(n) {
    return n === 1 ? "Task 1" : "Task 2";
  }

  function clamp01(n) {
    const x = Number(n);
    if (!Number.isFinite(x)) return 0;
    return Math.max(0, Math.min(1, x));
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
  // Auto checks (simple heuristics) + auto-score
  // -----------------------------

  function runChecks(q, text) {
    const t = String(text || "");
    const wc = countWords(t);

    const checks = [];
    const minWords = Number(q.minWords || 0) || 0;

    if (minWords) {
      checks.push({
        id: "minWords",
        label: `At least ${minWords} words`,
        ok: wc >= minWords,
        detail: `${wc} words`
      });
    }

    if (q.taskNumber === 1) {
      // Task 1 heuristics: overview + figures + comparison language + paragraphing
      const overviewOk = includesAny(t, ["overall", "in general", "generally", "on the whole"]);
      checks.push({
        id: "overview",
        label: 'Includes an overview (e.g., "Overall, ...")',
        ok: overviewOk,
        detail: overviewOk ? "Found overview cue" : "No clear overview cue found"
      });

      const nums = extractNumbers(t);
      checks.push({
        id: "figures",
        label: "Mentions at least 2 figures (numbers/percentages)",
        ok: nums.length >= 2,
        detail: nums.length
          ? `Found: ${nums.slice(0, 6).join(", ")}${nums.length > 6 ? "…" : ""}`
          : "No figures found"
      });

      const compareOk = includesAny(t, [
        "higher",
        "lower",
        "more",
        "less",
        "increase",
        "increased",
        "decrease",
        "decreased",
        "rose",
        "fell",
        "grew",
        "declined",
        "compared",
        "whereas",
        "while"
      ]);
      checks.push({
        id: "comparison",
        label: "Uses comparison language (e.g., higher/lower/increase/decrease/whereas)",
        ok: compareOk,
        detail: compareOk ? "Comparison cue found" : "No clear comparison cue found"
      });

      const paragraphs = t.trim().split(/\n\s*\n/).filter(Boolean).length;
      checks.push({
        id: "paragraphs",
        label: "Uses paragraphs (at least 2)",
        ok: paragraphs >= 2,
        detail: `${paragraphs} paragraph(s)`
      });
    } else {
      // Task 2 heuristics: position + conclusion + paragraphing
      const positionOk = includesAny(t, [
        "i believe",
        "in my opinion",
        "i think",
        "i would argue",
        "this essay",
        "i agree",
        "i disagree",
        "should",
        "must"
      ]);
      checks.push({
        id: "position",
        label: "States a clear position (e.g., In my opinion / I agree / should)",
        ok: positionOk,
        detail: positionOk ? "Position cue found" : "No clear position cue found"
      });

      const conclusionOk = includesAny(t, [
        "in conclusion",
        "to conclude",
        "to sum up",
        "overall, i believe",
        "in summary"
      ]);
      checks.push({
        id: "conclusion",
        label: "Includes a conclusion signal (e.g., In conclusion / To sum up)",
        ok: conclusionOk,
        detail: conclusionOk ? "Conclusion cue found" : "No clear conclusion cue found"
      });

      const paragraphs = t.trim().split(/\n\s*\n/).filter(Boolean).length;
      checks.push({
        id: "paragraphs",
        label: "Uses paragraphs (at least 3)",
        ok: paragraphs >= 3,
        detail: `${paragraphs} paragraph(s)`
      });
    }

    const passed = checks.filter((c) => c.ok).length;
    return { wordCount: wc, checks, passed, total: checks.length };
  }

  function computeAutoScores(questions, responses) {
    const qs = Array.isArray(questions) ? questions : [];
    const resp = responses || {};

    const perTask = qs.map((q) => {
      const text = resp[q.id] || "";
      const results = runChecks(q, text);
      const earned = results.passed;
      const possible = results.total || 1;
      const pct = possible ? Math.round((earned / possible) * 100) : 0;
      return { q, text, results, earned, possible, pct };
    });

    const totalEarned = perTask.reduce((s, x) => s + Number(x.earned || 0), 0);
    const totalPossible = perTask.reduce((s, x) => s + Number(x.possible || 0), 0);
    const totalPct = totalPossible ? Math.round((totalEarned / totalPossible) * 100) : 0;

    const t1 = perTask.find((x) => Number(x.q.taskNumber) === 1) || null;
    const t2 = perTask.find((x) => Number(x.q.taskNumber) === 2) || null;

    return { perTask, totalEarned, totalPossible, totalPct, t1, t2 };
  }

  // -----------------------------
  // UI renderers
  // -----------------------------

  function renderIntro() {
    return `
      <div class="note" style="margin-top:0">
        <strong>IELTS Writing</strong>
        <p style="margin:8px 0 0">
          2 tasks • 60 minutes (practice). Task 1: 20 minutes (150+ words). Task 2: 40 minutes (250+ words).
        </p>
        <p style="margin:8px 0 0; opacity:.92">
          This is an original practice test (not official IELTS material). The app will auto-score using word count and simple structure cues,
          and show a rubric for self/teacher scoring.
        </p>
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

    return `
      <div style="display:flex; align-items:center; justify-content:space-between; gap:10px; flex-wrap:wrap">
        <div style="display:flex; align-items:center; gap:10px; flex-wrap:wrap">
          <div style="font-weight:800; color: var(--muted)">${taskLabel(q.taskNumber)} • ${n} of ${total}</div>
          <div class="chip" aria-label="Time remaining" style="font-weight:900">${formatTime(state.timeRemaining)}</div>
        </div>
        <div style="display:flex; gap:8px; flex-wrap:wrap">
          <button class="btn" type="button" data-action="restart" aria-label="Restart the test">Restart</button>
        </div>
      </div>
    `;
  }

  function renderTaskMeta(q) {
    const minWords = q.minWords ? Number(q.minWords) : 0;
    const rec = q.recommendedTimeMin ? Number(q.recommendedTimeMin) : 0;

    return `
      <div class="note" style="margin:12px 0 0; padding:10px 12px">
        <strong>Guidance</strong>
        <p style="margin:8px 0 0">
          Recommended time: <strong>${rec || (q.taskNumber === 1 ? 20 : 40)} min</strong> • Minimum: <strong>${
      minWords || (q.taskNumber === 1 ? 150 : 250)
    } words</strong>
        </p>
        ${q.notes ? `<p style="margin:8px 0 0; opacity:.92">${safeText(q.notes)}</p>` : ""}
        <p style="margin:8px 0 0; opacity:.92">
          Auto-scoring uses word count + basic structure cues (overview/figures/paragraphs). It is for practice only.
        </p>
      </div>
    `;
  }

  function renderQuestionScreen(state) {
    const q = state.questions[state.index];
    if (!q) return renderError("Missing task");

    const saved = state.responses[q.id] || "";
    const wc = countWords(saved);
    const minWords = Number(q.minWords || 0) || 0;

    return `
      ${renderTopBar(state)}
      ${renderTaskMeta(q)}

      <div class="note" style="margin:12px 0 0; padding:12px 14px">
        <strong>Task</strong>
        <div style="margin-top:10px; white-space:pre-wrap">${safeText(q.question || "")}</div>
      </div>

      <form data-form="writing" style="margin-top:12px">
        <fieldset style="border:1px solid var(--border); border-radius:16px; padding:14px; background: var(--surface2)">
          <legend style="padding:0 8px; font-weight:900">Write your response</legend>

          <label for="writing-text" style="display:block; margin-top:10px; font-weight:700">Answer</label>
          <textarea id="writing-text" name="writingText" rows="14" style="width:100%; margin-top:8px" placeholder="Write here...">${safeText(
            saved
          )}</textarea>

          <div style="margin-top:10px; display:flex; align-items:center; justify-content:space-between; gap:10px; flex-wrap:wrap">
            <div style="opacity:.9">
              Word count: <strong data-wordcount>${wc}</strong>${minWords ? ` • Min: <strong>${minWords}</strong>` : ""}
            </div>
            <div style="display:flex; gap:8px; flex-wrap:wrap">
              <button class="btn" type="button" data-action="back" ${
                state.index === 0 ? "disabled" : ""
              }>Back</button>
              <button class="btn btn--primary" type="submit">${
                state.index + 1 >= state.questions.length ? "Finish" : "Save & Next"
              }</button>
            </div>
          </div>
        </fieldset>
      </form>
    `;
  }

  function renderRubric(rubric) {
    if (!rubric || !Array.isArray(rubric.criteria) || !rubric.criteria.length) return "";
    const rows = rubric.criteria
      .map((c, idx) => {
        const name = safeText(c.name || `Criterion ${idx + 1}`);
        const d9 = safeText((c.descriptors && c.descriptors["9"]) || "");
        const d7 = safeText((c.descriptors && c.descriptors["7"]) || "");
        const d5 = safeText((c.descriptors && c.descriptors["5"]) || "");
        return `
          <div style="border:1px solid var(--border); border-radius:14px; padding:10px 12px; background: var(--surface2)">
            <div style="font-weight:900">${name}</div>
            <div style="margin-top:8px; opacity:.92">
              <div><strong>Strong:</strong> ${d9}</div>
              <div style="margin-top:6px"><strong>Good:</strong> ${d7}</div>
              <div style="margin-top:6px"><strong>Basic:</strong> ${d5}</div>
            </div>
          </div>
        `;
      })
      .join("");
    return `<div style="display:grid; gap:10px; margin-top:10px">${rows}</div>`;
  }

  function renderSummary(state) {
    const auto = computeAutoScores(state.questions, state.responses);

    const t1Line = auto.t1
      ? `Task 1 auto-score: <strong>${auto.t1.earned}</strong> / ${auto.t1.possible} (${auto.t1.pct}%)`
      : "";
    const t2Line = auto.t2
      ? `Task 2 auto-score: <strong>${auto.t2.earned}</strong> / ${auto.t2.possible} (${auto.t2.pct}%)`
      : "";

    const taskBlocks = auto.perTask
      .map((item) => {
        const q = item.q;
        const text = item.text;
        const results = item.results;

        const checksHtml = results.checks
          .map(
            (c) => `
            <li style="margin:6px 0">
              <span style="font-weight:900">${c.ok ? "✓" : "✗"}</span>
              ${safeText(c.label)}
              <span style="opacity:.85"> — ${safeText(c.detail || "")}</span>
            </li>
          `
          )
          .join("");

        // Manual scoring inputs (optional)
        const rubric = q.rubric || null;
        const criteria = rubric && Array.isArray(rubric.criteria) ? rubric.criteria : [];
        const manualRows = criteria
          .map((c, cIdx) => {
            const key = `${q.id}::${cIdx}`;
            const val = state.manualScores[key] != null ? String(state.manualScores[key]) : "";
            return `
              <label style="display:flex; align-items:center; justify-content:space-between; gap:10px; padding:10px 12px; border:1px solid var(--border); border-radius:14px; background: var(--surface2)">
                <span style="font-weight:800">${safeText(c.name || `Criterion ${cIdx + 1}`)}</span>
                <input
                  type="number"
                  inputmode="decimal"
                  min="0"
                  max="9"
                  step="0.5"
                  value="${safeText(val)}"
                  data-score-key="${safeText(key)}"
                  aria-label="Manual score for ${safeText(c.name || `Criterion ${cIdx + 1}`)}"
                  style="width:90px"
                  placeholder="0–9"
                />
              </label>
            `;
          })
          .join("");

        return `
          <details open style="border:1px solid var(--border); border-radius:16px; background: var(--surface2); padding:12px 14px">
            <summary style="cursor:pointer; font-weight:900">
              ${taskLabel(q.taskNumber)} — Auto-score: ${item.earned}/${item.possible} (${item.pct}%)
            </summary>

            <div style="margin-top:10px">
              <div style="font-weight:900">Your response</div>
              <pre style="white-space:pre-wrap; margin:10px 0 0; padding:10px 12px; border:1px solid var(--border); border-radius:14px; background: var(--surface);">${safeText(
                text || ""
              )}</pre>
            </div>

            <div style="margin-top:12px">
              <div style="font-weight:900">Auto-checks</div>
              <ul style="margin:8px 0 0; padding-left:18px">${checksHtml}</ul>
            </div>

            <div style="margin-top:12px">
              <div style="font-weight:900">Rubric (guidance)</div>
              ${renderRubric(q.rubric)}
            </div>

            <div style="margin-top:12px">
              <div style="font-weight:900">Optional manual scoring (0–9)</div>
              <p style="margin:8px 0 0; opacity:.9">
                Enter scores per criterion if a teacher/self-assessor wants a numeric estimate. This app does not claim official IELTS band accuracy.
              </p>
              <div style="display:grid; gap:10px; margin-top:10px">
                ${manualRows || `<div style="opacity:.85">No rubric criteria found.</div>`}
              </div>
            </div>
          </details>
        `;
      })
      .join("");

    return `
      <div class="note" style="margin-top:0">
        <strong>Finished</strong>
        <p style="margin:8px 0 0; opacity:.92">
          Auto-score (checks): <strong>${auto.totalEarned}</strong> / ${auto.totalPossible} (${auto.totalPct}%)
        </p>
        ${t1Line ? `<p style="margin:8px 0 0; opacity:.92">${t1Line}</p>` : ""}
        ${t2Line ? `<p style="margin:8px 0 0; opacity:.92">${t2Line}</p>` : ""}
        <p style="margin:8px 0 0; opacity:.92">
          Time remaining: <strong>${formatTime(state.timeRemaining)}</strong>
        </p>
        <div style="margin-top:10px">
          <div style="font-weight:900">Manual score summary</div>
          <div style="opacity:.92; margin-top:6px">
            Task 1 average: <strong data-manual-task1>—</strong> • Task 2 average: <strong data-manual-task2>—</strong> • Overall average: <strong data-manual-overall>—</strong>
          </div>
        </div>
      </div>

      <div style="margin-top:12px; display:grid; gap:10px">
        ${taskBlocks}
      </div>

      <div class="actions" style="margin-top:12px">
        <button class="btn btn--primary" type="button" data-action="restart">Restart</button>
      </div>
    `;
  }

  // -----------------------------
  // Runner registration
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
        status: "intro",
        questions: [],
        index: 0,

        responses: {},

        timeRemaining: TIME_LIMIT_SEC,
        timerId: null,

        lastError: "",

        manualScores: {} // key: `${questionId}::${criterionIndex}` => number/string
      };

      function stopTimer() {
        if (state.timerId) {
          clearInterval(state.timerId);
          state.timerId = null;
        }
      }

      function saveCurrentText() {
        const q = state.questions[state.index];
        if (!q) return;
        const ta = host.querySelector("#writing-text");
        const text = ta ? ta.value : "";
        state.responses[q.id] = text;
      }

      function startTimer() {
        stopTimer();
        state.timerId = setInterval(() => {
          if (state.status !== "task" && state.status !== "summary") return;

          state.timeRemaining -= 1;

          if (state.timeRemaining <= 0) {
            state.timeRemaining = 0;
            // preserve whatever is currently typed
            if (state.status === "task") saveCurrentText();
            stopTimer();
            state.status = "summary";
            paint();
            updateManualSummary();
            return;
          }

          const chip = host.querySelector('[aria-label="Time remaining"]');
          if (chip) chip.textContent = formatTime(state.timeRemaining);
        }, 1000);
      }

      function paint() {
        if (state.status === "intro") stage.innerHTML = renderIntro();
        else if (state.status === "loading") stage.innerHTML = renderLoading();
        else if (state.status === "task") stage.innerHTML = renderQuestionScreen(state);
        else if (state.status === "summary") stage.innerHTML = renderSummary(state);
        else if (state.status === "error") stage.innerHTML = renderError(state.lastError);
        else stage.innerHTML = renderIntro();
      }

      function resetRunState() {
        stopTimer();
        state.questions = [];
        state.index = 0;
        state.responses = {};
        state.timeRemaining = TIME_LIMIT_SEC;
        state.lastError = "";
        state.manualScores = {};
      }

      function chooseTasks(bank) {
        const t1 = bank.filter((q) => Number(q.taskNumber) === 1);
        const t2 = bank.filter((q) => Number(q.taskNumber) === 2);
        if (!t1.length || !t2.length) return [];

        const pick1 = t1[Math.floor(Math.random() * t1.length)];
        const pick2 = t2[Math.floor(Math.random() * t2.length)];
        return [pick1, pick2];
      }

      async function start() {
        resetRunState();
        state.status = "loading";
        paint();

        try {
          await ensureBankLoaded(ctx);
          const bank =
            window.UEAH_TEST_BANKS && Array.isArray(window.UEAH_TEST_BANKS[SLUG])
              ? window.UEAH_TEST_BANKS[SLUG]
              : [];
          if (!bank.length) throw new Error("Missing writing bank.");

          state.questions = chooseTasks(bank);
          if (state.questions.length !== 2) throw new Error("Writing bank is missing Task 1 or Task 2.");

          state.status = "task";
          paint();
          startTimer();
        } catch (err) {
          state.status = "error";
          state.lastError = err && err.message ? err.message : "Could not load the test.";
          paint();
        }
      }

      function restart() {
        resetRunState();
        state.status = "intro";
        paint();
      }

      function goBack() {
        if (state.index <= 0) return;
        saveCurrentText();
        state.index -= 1;
        state.status = "task";
        paint();
      }

      function goNextOrFinish() {
        saveCurrentText();
        if (state.index + 1 >= state.questions.length) {
          state.status = "summary";
          paint();
          updateManualSummary();
          return;
        }
        state.index += 1;
        state.status = "task";
        paint();
      }

      function updateWordCountLive() {
        const ta = host.querySelector("#writing-text");
        const wcEl = host.querySelector("[data-wordcount]");
        if (!ta || !wcEl) return;
        wcEl.textContent = String(countWords(ta.value));
      }

      function computeTaskAverage(taskNumber) {
        const q = state.questions.find((x) => Number(x.taskNumber) === Number(taskNumber));
        if (!q || !q.rubric || !Array.isArray(q.rubric.criteria)) return null;

        const vals = q.rubric.criteria
          .map((_, idx) => {
            const key = `${q.id}::${idx}`;
            const raw = state.manualScores[key];
            const n = raw == null || raw === "" ? NaN : Number(raw);
            return Number.isFinite(n) ? n : NaN;
          })
          .filter((n) => Number.isFinite(n));

        if (!vals.length) return null;

        const sum = vals.reduce((a, b) => a + b, 0);
        return sum / vals.length;
      }

      function updateManualSummary() {
        const t1 = computeTaskAverage(1);
        const t2 = computeTaskAverage(2);

        const t1El = host.querySelector("[data-manual-task1]");
        const t2El = host.querySelector("[data-manual-task2]");
        const allEl = host.querySelector("[data-manual-overall]");

        if (t1El) t1El.textContent = t1 == null ? "—" : t1.toFixed(1);
        if (t2El) t2El.textContent = t2 == null ? "—" : t2.toFixed(1);

        let overall = null;
        if (t1 != null && t2 != null) overall = (t1 + t2) / 2;
        else if (t1 != null) overall = t1;
        else if (t2 != null) overall = t2;

        if (allEl) allEl.textContent = overall == null ? "—" : overall.toFixed(1);
      }

      paint();

      host.addEventListener("click", (e) => {
        const btn = e.target && e.target.closest ? e.target.closest("[data-action]") : null;
        if (!btn) return;

        const action = btn.getAttribute("data-action");
        if (action === "start" || action === "retry") start();
        else if (action === "restart") restart();
        else if (action === "back") goBack();
      });

      host.addEventListener("submit", (e) => {
        const form = e.target;
        if (!form || !form.matches || !form.matches('[data-form="writing"]')) return;
        e.preventDefault();
        goNextOrFinish();
      });

      host.addEventListener("input", (e) => {
        const el = e.target;

        // Live word count
        if (el && el.id === "writing-text") {
          updateWordCountLive();
          return;
        }

        // Manual scoring
        if (el && el.matches && el.matches("[data-score-key]")) {
          const key = el.getAttribute("data-score-key");
          if (!key) return;
          state.manualScores[key] = el.value;
          updateManualSummary();
        }
      });
    }
  });
})();
