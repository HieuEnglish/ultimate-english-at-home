/* assets/js/tests/age/4-7-speaking.js
   Runner: Ages 4–7 • Speaking

   Loads the question bank (assets/data/tests-4-7-speaking.js) and runs a
   caregiver/teacher-led, one-prompt-at-a-time speaking practice.

   Features:
   - Random order every run
   - Optional model audio using Speech Synthesis (TTS)
   - Caregiver marks each prompt as Said / Try again / Skip

   Supported question types:
   - prompt

   Updates:
   - Ensures stable ids (fallback id if missing)
   - Robust bank loader (handles existing script + validates after load tick)
   - Adds Stop button for TTS
   - Adds Retry on error
   - Stops TTS on navigation (popstate) and when changing screens
   - Summary includes per-section counts if `section` exists in the bank, otherwise totals only
   - Adds "Save score to Profile" using the shared helper (window.UEAH_SAVE_SCORE)
   - Adds per-run cap (bank is a pool; each run uses a short randomized subset)
*/

(function () {
  "use strict";

  const SLUG = "age-4-7-speaking";
  const BANK_SRC = "assets/data/tests-4-7-speaking.js";
  const MAX_QUESTIONS_PER_RUN = 10;

  const store = window.UEAH_TESTS_STORE;
  if (!store || typeof store.registerRunner !== "function") return;

  // -----------------------------
  // Utilities
  // -----------------------------

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

  function nowIso() {
    return new Date().toISOString();
  }

  function normalizeSection(v) {
    return String(v || "").trim().toLowerCase();
  }

  function ensureIds(qs) {
    return qs.map((q, idx) => {
      if (!isPlainObject(q)) return q;
      const id = q.id != null && String(q.id).trim() ? String(q.id).trim() : `${SLUG}::idx-${idx}`;
      return { ...q, id };
    });
  }

  function normalizeDifficulty(v) {
    const d = String(v || "").trim().toLowerCase();
    if (d === "easy" || d === "medium" || d === "hard") return d;
    return "";
  }

  function computeSectionCounts(questions, results) {
    const out = Object.create(null);
    const qs = Array.isArray(questions) ? questions : [];
    qs.forEach((q) => {
      const sec = normalizeSection(q && q.section);
      if (!sec) return;
      if (!out[sec]) out[sec] = { said: 0, again: 0, skip: 0, total: 0 };
      const id = q && q.id != null ? String(q.id) : "";
      const r = (id && results && results[id]) || "skip";
      out[sec].total += 1;
      if (r === "said") out[sec].said += 1;
      else if (r === "again") out[sec].again += 1;
      else out[sec].skip += 1;
    });
    return out;
  }

  function computeDifficultyCounts(questions, results) {
    const out = {
      easy: { said: 0, again: 0, skip: 0, total: 0 },
      medium: { said: 0, again: 0, skip: 0, total: 0 },
      hard: { said: 0, again: 0, skip: 0, total: 0 },
      unknown: { said: 0, again: 0, skip: 0, total: 0 }
    };

    const qs = Array.isArray(questions) ? questions : [];
    qs.forEach((q) => {
      const d = normalizeDifficulty(q && q.difficulty);
      const key = d || "unknown";
      const id = q && q.id != null ? String(q.id) : "";
      const r = (id && results && results[id]) || "skip";

      out[key].total += 1;
      if (r === "said") out[key].said += 1;
      else if (r === "again") out[key].again += 1;
      else out[key].skip += 1;
    });

    const compact = Object.create(null);
    Object.keys(out).forEach((k) => {
      if (out[k].total > 0) compact[k] = out[k];
    });
    return compact;
  }

  function computeOverallScoreFromSpeaking(results, questions) {
    // Map: said=1, again=0, skip=0. Percent = said/total.
    const qs = Array.isArray(questions) ? questions : [];
    if (!qs.length) return { said: 0, again: 0, skip: 0, total: 0, percent: 0 };

    let said = 0;
    let again = 0;
    let skip = 0;

    qs.forEach((q) => {
      const id = q && q.id != null ? String(q.id) : "";
      const r = (id && results && results[id]) || "skip";
      if (r === "said") said += 1;
      else if (r === "again") again += 1;
      else skip += 1;
    });

    const total = qs.length;
    const percent = total ? Math.round((said / total) * 100) : 0;
    return { said, again, skip, total, percent };
  }

  // -----------------------------
  // Speech (TTS) — use shared helper UEAH_TTS
  // -----------------------------

  function supportsSpeech() {
    return !!window.UEAH_TTS?.isSupported?.();
  }

  function stopSpeech() {
    try {
      window.UEAH_TTS?.stop?.();
    } catch (_) {}
  }

  function speak(text) {
    const t = String(text || "").trim();
    if (!t) return false;

    try {
      const fn = window.UEAH_TTS?.speak;
      if (typeof fn !== "function") return false;
      return !!fn.call(window.UEAH_TTS, t, { lang: "en-US", chunk: false });
    } catch (_) {
      return false;
    }
  }

  // -----------------------------
  // UI render helpers
  // -----------------------------

  function difficultyBadge(d) {
    const val = String(d || "").trim();
    if (!val) return "";
    const label = val.charAt(0).toUpperCase() + val.slice(1);
    return `<span style="padding:4px 10px; border-radius:999px; border:1px solid var(--border); background: var(--surface); font-weight:800; font-size:12px">${safeText(
      label
    )}</span>`;
  }

  function renderIntro() {
    const audioOk = supportsSpeech();
    return `
      <div class="note" style="margin-top:0">
        <strong>Speaking (Ages 4–7)</strong>
        <p style="margin:8px 0 0; color: var(--muted)">
          Read the prompt to the learner. The learner answers out loud.
        </p>
        <ul style="margin:12px 0 0; padding-left:18px; color: var(--muted)">
          <li>Accept short answers, then model a full sentence.</li>
          <li>Ask one follow-up: “Why?” or “Tell me more.”</li>
          <li>Keep it fun (5–8 minutes).</li>
        </ul>
        <p style="margin:10px 0 0; opacity:.92">
          ${
            audioOk
              ? "Tip: Use <strong>🔊 Play</strong> to hear a model answer (if included)."
              : "Audio is not available in this browser. Read the model answer out loud."
          }
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
        <p style="margin:8px 0 0">Preparing your practice.</p>
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

  function renderPromptScreen(state) {
    const q = state.questions[state.index];
    const total = state.questions.length;
    const n = state.index + 1;

    const prompt = safeTextWithBreaks(q.question || "Speak!");
    const model = safeTextWithBreaks(q.model || "");
    const tip = safeText(q.explanation || "Keep it playful and short.");

    const audioText = String(q.say || q.model || "").trim();
    const hasAudio = supportsSpeech() && audioText;

    const speechHint =
      supportsSpeech() && hasAudio
        ? ""
        : `
          <div class="note" style="margin:12px 0 0; padding:10px 12px">
            <strong>Model support</strong>
            <p style="margin:6px 0 0; color: var(--muted)">
              ${
                model
                  ? "Read the example out loud, then let the learner copy."
                  : "Say a simple example first, then let the learner try."
              }
            </p>
          </div>
        `;

    return `
      <div style="display:flex; align-items:center; justify-content:space-between; gap:10px; flex-wrap:wrap">
        <div style="display:flex; gap:10px; align-items:center; flex-wrap:wrap">
          <div style="font-weight:900; color: var(--muted)">Prompt ${n} of ${total}</div>
          ${difficultyBadge(q.difficulty)}
          ${
            q.section != null && String(q.section).trim()
              ? `<span style="padding:4px 10px; border-radius:999px; border:1px solid var(--border); color: var(--muted); font-weight:800; font-size:12px">${safeText(
                  String(q.section).trim()
                )}</span>`
              : ""
          }
        </div>
        <div style="display:flex; gap:8px; flex-wrap:wrap">
          <button class="btn" type="button" data-action="play" ${hasAudio ? "" : "disabled"} aria-label="Play model audio">🔊 Play</button>
          <button class="btn" type="button" data-action="stop" ${supportsSpeech() ? "" : "disabled"} aria-label="Stop audio">⏹ Stop</button>
          <button class="btn" type="button" data-action="restart" aria-label="Restart the test">Restart</button>
        </div>
      </div>

      <div style="margin-top:12px">
        <div style="border:1px solid var(--border); border-radius:16px; padding:14px; background: var(--surface2)">
          <div style="font-weight:900; font-size:18px">${prompt}</div>
          ${model ? `<div style="margin-top:10px; font-size:18px; font-weight:900">Example: ${model}</div>` : ""}
          <p style="margin:10px 0 0; color: var(--muted); font-size:13px">Tip: ${tip}</p>

          <div class="actions" style="margin-top:14px; display:flex; gap:10px; flex-wrap:wrap">
            <button class="btn" type="button" data-action="mark" data-mark="said" aria-label="Mark as said">✅ Said it</button>
            <button class="btn" type="button" data-action="mark" data-mark="again" aria-label="Mark as try again">🔁 Try again</button>
            <button class="btn" type="button" data-action="mark" data-mark="skip" aria-label="Skip this prompt">⏭️ Skip</button>
          </div>

          ${speechHint}
        </div>
      </div>
    `;
  }

  function renderSummary(state) {
    const overall = computeOverallScoreFromSpeaking(state.results, state.questions);

    const hasAnySection = state.questions.some((q) => q && q.section != null && String(q.section).trim());
    const sectionCounts = hasAnySection ? computeSectionCounts(state.questions, state.results) : null;

    const sectionLines = hasAnySection
      ? Object.keys(sectionCounts)
          .filter((k) => k)
          .sort()
          .map((k) => {
            const c = sectionCounts[k];
            return `<div style="margin-top:6px; color:var(--muted)"><strong>${safeText(
              k
            )}:</strong> Said ${c.said} • Try again ${c.again} • Skipped ${c.skip}</div>`;
          })
          .join("")
      : "";

    const rows = state.questions
      .map((q, idx) => {
        const id = q && q.id != null ? String(q.id) : "";
        const r = (id && state.results[id]) || "skip";
        const icon = r === "said" ? "✅" : r === "again" ? "🔁" : "⏭️";
        const label = r === "said" ? "Said" : r === "again" ? "Try again" : "Skipped";
        const sec = q && q.section != null && String(q.section).trim() ? ` • ${safeText(String(q.section).trim())}` : "";
        return `
          <li style="display:flex; gap:10px; align-items:flex-start; padding:8px 0; border-bottom:1px solid var(--border)">
            <span aria-hidden="true">${icon}</span>
            <span style="min-width:0">
              <b>${idx + 1}.</b> ${safeText(q.question || "")}
              <div style="margin-top:6px; font-weight:800; opacity:.92">${label}${sec}</div>
            </span>
          </li>
        `;
      })
      .join("");

    const encouragement =
      overall.again > 0
        ? "Repeat the “Try again” prompts tomorrow. Short, happy practice works best."
        : "Great work. Try again later for a different order.";

    const canSave = !!(window.UEAH_SAVE_SCORE && typeof window.UEAH_SAVE_SCORE.save === "function");

    return `
      <div class="note" style="margin-top:0">
        <strong>Summary</strong>
        <p style="margin:8px 0 0; color: var(--muted)">
          Said: <strong>${overall.said}</strong> • Try again: <strong>${overall.again}</strong> • Skipped: <strong>${overall.skip}</strong>
        </p>
        ${sectionLines}
      </div>

      <div class="note" style="margin-top:12px; padding:12px 14px">
        <strong>Next step</strong>
        <p style="margin:8px 0 0">${safeText(encouragement)}</p>
      </div>

      <details style="margin-top:12px">
        <summary style="cursor:pointer; font-weight:900">Show review</summary>
        <ul style="list-style:none; padding-left:0; margin:12px 0 0">
          ${rows}
        </ul>
      </details>

      <div class="actions" style="margin-top:12px; display:flex; gap:10px; flex-wrap:wrap; align-items:center">
        <button class="btn btn--primary" type="button" data-action="restart">Restart</button>
        ${
          canSave
            ? `<button class="btn" type="button" data-action="save-score" aria-label="Save score to Profile">Save score to Profile</button>`
            : ""
        }
        ${state.savedMsg ? `<span style="font-weight:800; color: var(--muted)">${safeText(state.savedMsg)}</span>` : ""}
      </div>
    `;
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
        validate();
        existing.addEventListener("load", validate, { once: true });
        existing.addEventListener("error", () => reject(new Error("Failed to load test bank")), { once: true });
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
        status: "intro", // intro | loading | prompt | summary | error
        questions: [],
        index: 0,
        results: Object.create(null), // id -> "said" | "again" | "skip"
        lastError: "",
        savedMsg: ""
      };

      function paint() {
        if (state.status === "intro") stage.innerHTML = renderIntro();
        else if (state.status === "loading") stage.innerHTML = renderLoading();
        else if (state.status === "prompt") stage.innerHTML = renderPromptScreen(state);
        else if (state.status === "summary") stage.innerHTML = renderSummary(state);
        else if (state.status === "error") stage.innerHTML = renderError(state.lastError);
        else stage.innerHTML = renderIntro();

        if (state.status === "prompt") {
          setTimeout(() => {
            try {
              const el = host.querySelector("button");
              if (el && typeof el.focus === "function") el.focus();
            } catch (_) {}
          }, 0);
        }
      }

      async function start() {
        stopSpeech();
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

          const prepared = ensureIds(bank.filter(isPlainObject).map((q) => ({ ...q })));
          shuffleInPlace(prepared);

          // Per-run cap: use a short subset after shuffle
          const picked = prepared.slice(0, Math.min(MAX_QUESTIONS_PER_RUN, prepared.length));

          state.questions = picked;
          state.index = 0;
          state.results = Object.create(null);
          state.status = "prompt";
          paint();
        } catch (e) {
          state.status = "error";
          state.lastError = e && e.message ? e.message : "Could not load the test.";
          paint();
        }
      }

      function restart() {
        stopSpeech();
        state.status = "intro";
        state.questions = [];
        state.index = 0;
        state.results = Object.create(null);
        state.lastError = "";
        state.savedMsg = "";
        paint();
      }

      function next() {
        stopSpeech();
        if (state.index + 1 >= state.questions.length) {
          state.status = "summary";
          paint();
          return;
        }
        state.index += 1;
        state.status = "prompt";
        paint();
      }

      function mark(val) {
        stopSpeech();
        const q = state.questions[state.index];
        if (!q || q.id == null) return;

        const v = String(val || "").toLowerCase();
        const normalized = v === "said" || v === "again" || v === "skip" ? v : "skip";

        state.results[String(q.id)] = normalized;
        next();
      }

      function speakCurrent() {
        stopSpeech();
        const q = state.questions[state.index];
        if (!q) return;
        const t = String(q.say || q.model || "").trim();
        if (!t) return;
        speak(t);
      }

      function saveScoreToProfile() {
        if (!window.UEAH_SAVE_SCORE || typeof window.UEAH_SAVE_SCORE.save !== "function") {
          state.savedMsg = "Save unavailable.";
          paint();
          return;
        }

        const overall = computeOverallScoreFromSpeaking(state.results, state.questions);

        const payload = {
          slug: SLUG,
          ageGroup: "4-7",
          skill: "speaking",
          at: nowIso(),

          questions: Array.isArray(state.questions) ? state.questions : [],
          resultsById: Object.assign({}, state.results),

          rawCorrect: overall.said,
          totalQuestions: overall.total,
          percent: overall.percent,

          sectionBreakdown: computeSectionCounts(state.questions, state.results),
          difficultyBreakdown: computeDifficultyCounts(state.questions, state.results)
        };

        const res = window.UEAH_SAVE_SCORE.save(payload);

        state.savedMsg = res && res.ok ? "Saved to Profile." : "Could not save.";
        paint();
      }

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
        } else if (action === "play") {
          ev.preventDefault();
          speakCurrent();
        } else if (action === "stop") {
          ev.preventDefault();
          stopSpeech();
        } else if (action === "mark") {
          ev.preventDefault();
          mark(btn.getAttribute("data-mark"));
        } else if (action === "save-score") {
          ev.preventDefault();
          saveScoreToProfile();
        }
      });

      // Stop TTS on navigation (best effort)
      window.addEventListener(
        "popstate",
        () => {
          stopSpeech();
        },
        { passive: true }
      );

      window.addEventListener(
        "pagehide",
        () => {
          stopSpeech();
        },
        { passive: true }
      );

      paint();
    }
  });
})();
