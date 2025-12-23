/* assets/js/tests/iels/speaking.js
   Runner: IELTS Speaking (original prompts)

   - 3 parts (P1–P3)
   - Randomly selects 1 topic set each run (keeps Part 3 linked to Part 2 topic)
   - Collects typed responses (practice substitute for speaking)
   - Auto-checks: min word count + simple keyword cues (per prompt)
   - Shows rubric guidance + optional manual scoring (0–9 per criterion). No official IELTS band claim.

   Bank: assets/data/tests-iels-speaking.js
   Global key: window.UEAH_TEST_BANKS["iels-speaking"] (array of prompt objects)
*/

(function () {
  "use strict";

  const SLUG = "iels-speaking";
  const BANK_SRC = "assets/data/tests-iels-speaking.js";
  const TIME_LIMIT_SEC = 15 * 60;

  const store = window.UEAH_TESTS_STORE;
  if (!store || typeof store.registerRunner !== "function") {
    console.warn("[UEAH] tests store not found; runner not registered:", SLUG);
    return;
  }

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
    const s = Math.max(0, Math.floor(sec));
    const m = Math.floor(s / 60);
    const r = s % 60;
    return `${String(m).padStart(2, "0")}:${String(r).padStart(2, "0")}`;
  }

  function countWords(text) {
    const t = String(text || "").trim();
    if (!t) return 0;
    return t.split(/\s+/).filter(Boolean).length;
  }

  function norm(text) {
    return String(text || "").toLowerCase();
  }

  function includesAny(text, phrases) {
    const t = norm(text);
    return (phrases || []).some((p) => t.includes(String(p).toLowerCase()));
  }

  function uniq(arr) {
    return Array.from(new Set(arr));
  }

  function partLabel(partId) {
    const id = String(partId || "").toLowerCase();
    if (id === "p1") return "Part 1";
    if (id === "p2") return "Part 2";
    if (id === "p3") return "Part 3";
    return "Part";
  }

  function isPart2Cue(q) {
    return String(q && q.partId ? q.partId : "")
      .toLowerCase() === "p2" &&
      String(q && q.kind ? q.kind : "").toLowerCase() === "cue";
  }

  function isPlainObject(v) {
    return v && typeof v === "object" && !Array.isArray(v);
  }

  function clamp(n, a, b) {
    const x = Number(n);
    if (!Number.isFinite(x)) return a;
    return Math.min(b, Math.max(a, x));
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
        // If already executed, resolve immediately; otherwise tick once.
        if (window.UEAH_TEST_BANKS && Array.isArray(window.UEAH_TEST_BANKS[SLUG])) {
          resolve(true);
          return;
        }
        setTimeout(() => resolve(true), 0);
        return;
      }

      const s = document.createElement("script");
      s.src = src;
      s.defer = true;
      s.setAttribute("data-ueah-test-bank", SLUG);
      s.onload = () => resolve(true);
      s.onerror = () => reject(new Error(`Failed to load: ${src}`));
      document.head.appendChild(s);
    });

    return bankPromise;
  }

  // -----------------------------
  // Rubric guidance (global)
  // -----------------------------

  const SPEAKING_RUBRIC = {
    criteria: [
      {
        name: "Fluency & Coherence",
        descriptors: {
          "9": "Speaks smoothly with natural pauses; ideas are well-organised; develops answers fully.",
          "7": "Generally fluent; some hesitation; ideas are mostly clear and linked.",
          "5": "Frequent hesitation; limited development; organisation may be unclear."
        }
      },
      {
        name: "Lexical Resource",
        descriptors: {
          "9": "Wide vocabulary; precise word choice; flexible paraphrasing; rare errors.",
          "7": "Good range; can paraphrase; occasional awkwardness or repetition.",
          "5": "Limited range; frequent repetition; word choice errors noticeable."
        }
      },
      {
        name: "Grammar Range & Accuracy",
        descriptors: {
          "9": "Varied complex structures; high accuracy; errors are rare.",
          "7": "Mix of simple/complex; some errors but meaning is clear.",
          "5": "Mostly simple structures; frequent errors reduce clarity."
        }
      },
      {
        name: "Pronunciation",
        descriptors: {
          "9": "Easy to understand; natural rhythm and stress; minimal strain for listener.",
          "7": "Generally clear; occasional mispronunciation; rhythm may be less natural.",
          "5": "Often unclear; frequent issues with stress/intonation; listener effort required."
        }
      }
    ]
  };

  // -----------------------------
  // Auto-checks
  // -----------------------------

  function runChecks(q, text) {
    const t = String(text || "");
    const wc = countWords(t);

    const checks = [];
    const minWords = Number(q && q.minWords);
    if (Number.isFinite(minWords) && minWords > 0) {
      checks.push({
        id: "minWords",
        label: `At least ${minWords} words (practice check)`,
        ok: wc >= minWords,
        detail: `${wc} words`
      });
    }

    const cue = q && q.cues ? q.cues : null;
    if (cue && Array.isArray(cue.anyOf) && cue.anyOf.length) {
      const ok = includesAny(t, cue.anyOf);
      checks.push({
        id: "cueAny",
        label: cue.label || "Uses at least one helpful speaking phrase",
        ok,
        detail: ok
          ? "Cue found"
          : `Try using: ${cue.anyOf.slice(0, 5).join(", ")}${cue.anyOf.length > 5 ? "…" : ""}`
      });
    }

    if (isPart2Cue(q)) {
      const seqOk = includesAny(t, ["first", "second", "then", "after that", "finally"]);
      checks.push({
        id: "sequence",
        label: "Uses sequencing language (first/then/finally)",
        ok: seqOk,
        detail: seqOk ? "Sequencing cue found" : "Try: first, then, after that, finally"
      });

      const exOk = includesAny(t, ["for example", "for instance", "such as"]);
      checks.push({
        id: "example",
        label: "Gives an example (for example / such as)",
        ok: exOk,
        detail: exOk ? "Example cue found" : "Add a specific example"
      });
    }

    const passed = checks.filter((c) => c.ok).length;
    return { wordCount: wc, checks, passed, total: checks.length };
  }

  // -----------------------------
  // Build a 3-part test from the bank
  // -----------------------------

  function buildTestFromBank(bank) {
    const list = Array.isArray(bank) ? bank.filter(isPlainObject) : [];
    if (!list.length) return { setId: "", setLabel: "", items: [] };

    const setIds = uniq(list.map((x) => String(x.setId || "").trim()).filter(Boolean));
    if (!setIds.length) return { setId: "", setLabel: "", items: [] };

    const chosenSetId = setIds[Math.floor(Math.random() * setIds.length)];
    const pool = list.filter((x) => String(x.setId || "") === chosenSetId);

    const first = pool.find(Boolean);
    const setLabel = first && first.setLabel ? String(first.setLabel) : chosenSetId;

    const p1 = pool.filter((x) => String(x.partId || "").toLowerCase() === "p1");
    const p2 = pool.filter((x) => String(x.partId || "").toLowerCase() === "p2");
    const p3 = pool.filter((x) => String(x.partId || "").toLowerCase() === "p3");

    const byOrder = (a, b) => (Number(a.order) || 0) - (Number(b.order) || 0);

    const items = []
      .concat(p1.slice().sort(byOrder))
      .concat(p2.slice().sort(byOrder))
      .concat(p3.slice().sort(byOrder))
      .map((q, idx) => {
        // Ensure stable id
        if (q && !q.id) return { ...q, id: `p_${chosenSetId}_${idx}` };
        return q;
      });

    return { setId: chosenSetId, setLabel, items };
  }

  // -----------------------------
  // UI renderers
  // -----------------------------

  function renderIntro() {
    return `
      <div class="detail-card" role="region" aria-label="IELTS speaking intro">
        <h3 style="margin:0">IELTS Speaking (Practice)</h3>
        <p style="margin:10px 0 0; color: var(--muted)">
          3 parts • ~11–14 minutes. This activity uses typed responses as a speaking substitute.
        </p>
        <div class="note" style="margin-top:12px">
          <strong>How to use</strong>
          <ul style="margin:10px 0 0; padding-left:18px; color: var(--muted)">
            <li>Speak aloud first (use a timer), then type what you said.</li>
            <li>Auto-checks are basic (word count + phrase cues).</li>
            <li>Use the rubric for self/teacher scoring. No official band claim.</li>
          </ul>
        </div>
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
        <p style="margin:8px 0 0">Preparing your speaking test.</p>
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
    const total = state.items.length;
    const n = Math.min(state.index + 1, total);
    const q = state.items[state.index] || {};

    return `
      <div style="display:flex; align-items:center; justify-content:space-between; gap:10px; flex-wrap:wrap">
        <div style="display:flex; align-items:center; gap:10px; flex-wrap:wrap">
          <div style="font-weight:800; color: var(--muted)">${partLabel(q.partId)} • Item ${n} of ${total}</div>
          <span class="chip" aria-label="Time remaining" style="font-weight:900">${formatTime(state.timeRemaining)}</span>
          <span class="chip" style="font-weight:900">Topic set: ${safeText(state.setLabel || "—")}</span>
        </div>
        <div style="display:flex; gap:8px; flex-wrap:wrap">
          <button class="btn" type="button" data-action="restart" aria-label="Restart the test">Restart</button>
        </div>
      </div>
    `;
  }

  function renderPart2Timers(state, q) {
    if (!isPart2Cue(q)) return "";

    return `
      <div class="note" style="margin:12px 0 0; padding:10px 12px">
        <strong>Part 2 timers (optional)</strong>
        <p style="margin:8px 0 0; opacity:.92">
          Prep: 01:00 • Speaking: 02:00
        </p>
        <div style="display:flex; gap:8px; flex-wrap:wrap; margin-top:10px; align-items:center">
          <button class="btn" type="button" data-action="p2prep">Start prep</button>
          <button class="btn" type="button" data-action="p2speak">Start speaking</button>
          <button class="btn" type="button" data-action="p2stop">Stop timer</button>
          <span class="chip" aria-label="Part 2 timer" style="font-weight:900">${formatTime(state.p2Remaining || 0)}</span>
        </div>
      </div>
    `;
  }

  function renderPromptBlock(q) {
    const title = q && q.title ? `<div style="font-weight:900">${safeText(q.title)}</div>` : "";
    const question = q && q.question ? `<div style="margin-top:8px; white-space:pre-wrap">${safeText(q.question)}</div>` : "";
    const bullets =
      q && Array.isArray(q.bullets) && q.bullets.length
        ? `<ul style="margin:10px 0 0; padding-left:18px">${q.bullets
            .map((b) => `<li style="margin:6px 0">${safeText(b)}</li>`)
            .join("")}</ul>`
        : "";

    return `
      <div class="note" style="margin:12px 0 0; padding:12px 14px">
        <strong>Prompt</strong>
        <div style="margin-top:10px">
          ${title}
          ${question}
          ${bullets}
        </div>
      </div>
    `;
  }

  function renderAnswerForm(state) {
    const q = state.items[state.index];
    if (!q) return "";

    const saved = state.responses[q.id] || "";
    const wc = countWords(saved);
    const minWords = Number(q && q.minWords);
    const minWordsOk = Number.isFinite(minWords) && minWords > 0;

    const backDisabled = state.index === 0 ? "disabled" : "";

    return `
      <form data-form="speaking" style="margin-top:12px">
        <fieldset style="border:1px solid var(--border); border-radius:16px; padding:14px; background: var(--surface2)">
          <legend style="padding:0 8px; font-weight:900">Your response (type what you would say)</legend>

          <label for="speak-text" style="display:block; margin-top:10px; font-weight:700">Answer</label>
          <textarea
            id="speak-text"
            name="speakText"
            rows="${isPart2Cue(q) ? 12 : 8}"
            style="width:100%; margin-top:8px; padding:12px; border:1px solid var(--border); border-radius:14px; background: var(--surface); resize:vertical"
            placeholder="Speak aloud, then type here..."
          >${safeText(saved)}</textarea>

          <div style="margin-top:10px; display:flex; align-items:center; justify-content:space-between; gap:10px; flex-wrap:wrap">
            <div style="opacity:.9">
              Word count: <strong data-wordcount>${wc}</strong>${minWordsOk ? ` • Practice min: <strong>${minWords}</strong>` : ""}
            </div>
            <div style="display:flex; gap:8px; flex-wrap:wrap">
              <button class="btn" type="button" data-action="back" ${backDisabled}>Back</button>
              <button class="btn btn--primary" type="submit">${state.index + 1 >= state.items.length ? "Finish" : "Save & Next"}</button>
            </div>
          </div>
        </fieldset>
      </form>
    `;
  }

  function renderQuestionScreen(state) {
    const q = state.items[state.index];
    if (!q) return renderError("Missing prompt");

    return `
      ${renderTopBar(state)}
      ${renderPart2Timers(state, q)}
      ${renderPromptBlock(q)}
      ${renderAnswerForm(state)}
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
    const reviewHtml = state.items
      .map((q, idx) => {
        const text = state.responses[q.id] || "";
        const res = runChecks(q, text);

        const checksHtml = res.checks.length
          ? `<ul style="margin:8px 0 0; padding-left:18px">
              ${res.checks
                .map(
                  (c) => `
                <li style="margin:6px 0">
                  <span style="font-weight:900">${c.ok ? "✓" : "✗"}</span>
                  ${safeText(c.label)} <span style="opacity:.85">— ${safeText(c.detail || "")}</span>
                </li>
              `
                )
                .join("")}
            </ul>`
          : `<div style="opacity:.85; margin-top:8px">No auto-checks for this item.</div>`;

        return `
          <details style="border:1px solid var(--border); border-radius:16px; background: var(--surface2); padding:12px 14px">
            <summary style="cursor:pointer; font-weight:900">${safeText(partLabel(q.partId))} • Item ${idx + 1} — Auto-checks: ${res.passed}/${res.total}</summary>

            <div style="margin-top:10px">
              <div style="font-weight:900">Prompt</div>
              <div style="margin-top:8px; white-space:pre-wrap">${safeText(q.question || "")}</div>
              ${
                Array.isArray(q.bullets) && q.bullets.length
                  ? `<ul style="margin:10px 0 0; padding-left:18px">${q.bullets.map((b) => `<li style="margin:6px 0">${safeText(b)}</li>`).join("")}</ul>`
                  : ""
              }
            </div>

            <div style="margin-top:12px">
              <div style="font-weight:900">Your response</div>
              <pre style="white-space:pre-wrap; margin:10px 0 0; padding:10px 12px; border:1px solid var(--border); border-radius:14px; background: var(--surface);">${safeText(
                text
              )}</pre>
            </div>

            <div style="margin-top:12px">
              <div style="font-weight:900">Auto-checks</div>
              ${checksHtml}
            </div>
          </details>
        `;
      })
      .join("");

    const manualRows = SPEAKING_RUBRIC.criteria
      .map((c, idx) => {
        const key = `global::${idx}`;
        const val = state.manualScores[key] != null ? String(state.manualScores[key]) : "";
        return `
          <label style="display:flex; align-items:center; justify-content:space-between; gap:10px; padding:10px 12px; border:1px solid var(--border); border-radius:14px; background: var(--surface2)">
            <span style="font-weight:800">${safeText(c.name)}</span>
            <input
              type="number"
              inputmode="decimal"
              min="0"
              max="9"
              step="0.5"
              value="${safeText(val)}"
              data-score-key="${safeText(key)}"
              aria-label="Manual score for ${safeText(c.name)}"
              style="width:90px; padding:10px; border:1px solid var(--border); border-radius:12px; background: var(--surface)"
              placeholder="0–9"
            />
          </label>
        `;
      })
      .join("");

    return `
      <div class="note" style="margin-top:0">
        <strong>Finished</strong>
        <p style="margin:8px 0 0; opacity:.92">
          Auto-checks completed. Use the rubric and optional manual scoring below.
        </p>
        <p style="margin:8px 0 0; opacity:.92">
          Time remaining: <strong>${formatTime(state.timeRemaining)}</strong>
        </p>

        <div style="margin-top:10px">
          <div style="font-weight:900">Optional manual score summary</div>
          <div style="opacity:.92; margin-top:6px">
            Average (0–9): <strong data-manual-overall>—</strong>
          </div>
        </div>
      </div>

      <div class="note" style="margin-top:12px; padding:12px 14px">
        <strong>Rubric (guidance)</strong>
        ${renderRubric(SPEAKING_RUBRIC)}
      </div>

      <div class="note" style="margin-top:12px; padding:12px 14px">
        <strong>Optional manual scoring (0–9)</strong>
        <p style="margin:8px 0 0; opacity:.9">
          This is for practice only and does not claim official IELTS band accuracy.
        </p>
        <div style="display:grid; gap:10px; margin-top:10px">
          ${manualRows}
        </div>
      </div>

      <div style="margin-top:12px; display:grid; gap:10px">
        ${reviewHtml}
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
        status: "intro", // intro | loading | task | summary | error
        items: [],
        index: 0,
        responses: Object.create(null),

        timeRemaining: TIME_LIMIT_SEC,
        timerId: null,

        lastError: "",

        setId: "",
        setLabel: "",

        // Part 2 mini timer (optional)
        p2TimerId: null,
        p2Remaining: 0,

        manualScores: Object.create(null) // global::idx => value
      };

      function stopTimer() {
        if (state.timerId) {
          clearInterval(state.timerId);
          state.timerId = null;
        }
      }

      function stopP2Timer() {
        if (state.p2TimerId) {
          clearInterval(state.p2TimerId);
          state.p2TimerId = null;
        }
        state.p2Remaining = 0;
      }

      function startOverallTimer() {
        stopTimer();
        state.timerId = setInterval(() => {
          if (state.status !== "task") return;

          state.timeRemaining -= 1;

          if (state.timeRemaining <= 0) {
            state.timeRemaining = 0;
            stopTimer();
            stopP2Timer();
            state.status = "summary";
            paint();
            updateManualSummary();
            return;
          }

          const chip = host.querySelector('[aria-label="Time remaining"]');
          if (chip) chip.textContent = formatTime(state.timeRemaining);
        }, 1000);
      }

      function startP2Countdown(seconds) {
        stopP2Timer();
        state.p2Remaining = clamp(seconds, 0, 60 * 60);
        paint();

        state.p2TimerId = setInterval(() => {
          state.p2Remaining -= 1;
          if (state.p2Remaining <= 0) {
            state.p2Remaining = 0;
            stopP2Timer();
            paint();
            return;
          }
          const chip = host.querySelector('[aria-label="Part 2 timer"]');
          if (chip) chip.textContent = formatTime(state.p2Remaining);
        }, 1000);
      }

      function paint() {
        if (state.status === "intro") stage.innerHTML = renderIntro();
        else if (state.status === "loading") stage.innerHTML = renderLoading();
        else if (state.status === "task") stage.innerHTML = renderQuestionScreen(state);
        else if (state.status === "summary") stage.innerHTML = renderSummary(state);
        else if (state.status === "error") stage.innerHTML = renderError(state.lastError);
        else stage.innerHTML = renderIntro();

        if (state.status === "task") {
          // ensure wordcount shows correct value on initial render
          updateWordCountLive();
        }

        if (state.status === "summary") {
          updateManualSummary();
        }
      }

      function resetRunState() {
        stopTimer();
        stopP2Timer();
        state.items = [];
        state.index = 0;
        state.responses = Object.create(null);
        state.timeRemaining = TIME_LIMIT_SEC;
        state.lastError = "";
        state.setId = "";
        state.setLabel = "";
        state.manualScores = Object.create(null);
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
          if (!bank.length) throw new Error("Missing speaking bank.");

          const built = buildTestFromBank(bank);
          if (!built.items.length) throw new Error("Could not build a speaking test from the bank.");

          state.setId = built.setId;
          state.setLabel = built.setLabel;
          state.items = built.items;

          state.status = "task";
          paint();
          startOverallTimer();

          setTimeout(() => {
            try {
              const ta = host.querySelector("#speak-text");
              if (ta && typeof ta.focus === "function") ta.focus();
            } catch (_) {}
          }, 0);
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

      function saveCurrentText() {
        const q = state.items[state.index];
        if (!q) return;
        const ta = host.querySelector("#speak-text");
        state.responses[q.id] = ta ? ta.value : "";
      }

      function goBack() {
        if (state.index <= 0) return;
        saveCurrentText();
        stopP2Timer();
        state.index -= 1;
        state.status = "task";
        paint();
      }

      function goNextOrFinish() {
        saveCurrentText();
        stopP2Timer();

        if (state.index + 1 >= state.items.length) {
          stopTimer();
          state.status = "summary";
          paint();
          return;
        }

        state.index += 1;
        state.status = "task";
        paint();

        setTimeout(() => {
          try {
            const ta = host.querySelector("#speak-text");
            if (ta && typeof ta.focus === "function") ta.focus();
          } catch (_) {}
        }, 0);
      }

      function updateWordCountLive() {
        const ta = host.querySelector("#speak-text");
        const wcEl = host.querySelector("[data-wordcount]");
        if (!ta || !wcEl) return;
        wcEl.textContent = String(countWords(ta.value));
      }

      function updateManualSummary() {
        const vals = SPEAKING_RUBRIC.criteria
          .map((_, idx) => {
            const raw = state.manualScores[`global::${idx}`];
            const n = raw == null || raw === "" ? NaN : Number(raw);
            return Number.isFinite(n) ? n : NaN;
          })
          .filter((n) => Number.isFinite(n));

        const el = host.querySelector("[data-manual-overall]");
        if (!el) return;

        if (!vals.length) {
          el.textContent = "—";
          return;
        }

        const avg = vals.reduce((a, b) => a + b, 0) / vals.length;
        el.textContent = avg.toFixed(1);
      }

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
        } else if (action === "back") {
          e.preventDefault();
          goBack();
        } else if (action === "p2prep") {
          e.preventDefault();
          startP2Countdown(60);
        } else if (action === "p2speak") {
          e.preventDefault();
          startP2Countdown(120);
        } else if (action === "p2stop") {
          e.preventDefault();
          stopP2Timer();
          paint();
        }
      });

      host.addEventListener("submit", (e) => {
        const form = e.target;
        if (!form || !form.matches || !form.matches('[data-form="speaking"]')) return;
        e.preventDefault();
        goNextOrFinish();
      });

      host.addEventListener("input", (e) => {
        const el = e.target;

        if (el && el.id === "speak-text") {
          updateWordCountLive();
          return;
        }

        if (el && el.matches && el.matches("[data-score-key]")) {
          const key = el.getAttribute("data-score-key");
          if (!key) return;
          state.manualScores[key] = el.value;
          updateManualSummary();
        }
      });

      window.addEventListener(
        "popstate",
        () => {
          stopTimer();
          stopP2Timer();
        },
        { passive: true }
      );

      paint();
    }
  });
})();
