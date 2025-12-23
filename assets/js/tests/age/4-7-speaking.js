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

   Updates (this file):
   - Ensures stable ids (fallback id if missing)
   - Robust bank loader (handles existing script + validates after load tick)
   - Adds Stop button for TTS
   - Adds Retry on error
   - Stops TTS on navigation (popstate) and when changing screens
   - Summary includes per-section counts if `section` exists in the bank, otherwise totals only
*/

(function () {
  "use strict";

  const SLUG = "age-4-7-speaking";
  const BANK_SRC = "assets/data/tests-4-7-speaking.js";

  const store = window.UEAH_TESTS_STORE;
  if (!store || typeof store.registerRunner !== "function") {
    console.warn("[UEAH] tests store not found; runner not registered:", SLUG);
    return;
  }

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

  // -----------------------------
  // Speech (TTS)
  // -----------------------------

  function supportsSpeech() {
    return !!(window.speechSynthesis && window.SpeechSynthesisUtterance);
  }

  function stopSpeech() {
    try {
      if (window.speechSynthesis) window.speechSynthesis.cancel();
    } catch (_) {}
  }

  function speak(text) {
    const t = String(text || "").trim();
    if (!t) return false;
    if (!supportsSpeech()) return false;

    try {
      const synth = window.speechSynthesis;
      synth.cancel();

      // best-effort prime voices
      try {
        if (typeof synth.getVoices === "function") synth.getVoices();
      } catch (_) {}

      const u = new SpeechSynthesisUtterance(t);
      u.lang = "en-US";
      u.rate = 0.92;
      u.pitch = 1.0;
      u.volume = 1.0;
      synth.speak(u);
      return true;
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
    const hasAudio = supportsSpeech() && !!audioText;

    const speechHint =
      supportsSpeech() && hasAudio
        ? ""
        : `
          <div class="note" style="margin:12px 0 0; padding:10px 12px">
            <strong>Model support</strong>
            <p style="margin:6px 0 0; color: var(--muted)">
              ${model ? "Read the example out loud, then let the learner copy." : "Say a simple example first, then let the learner try."}
            </p>
          </div>
        `;

    return `
      <div style="display:flex; align-items:center; justify-content:space-between; gap:10px; flex-wrap:wrap">
        <div style="display:flex; gap:10px; align-items:center; flex-wrap:wrap">
          <div style="font-weight:900; color: var(--muted)">Prompt ${n} of ${total}</div>
          ${difficultyBadge(q.difficulty)}
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
    let said = 0;
    let again = 0;
    let skip = 0;

    // Optional per-section counts (only if section exists)
    const hasAnySection = state.questions.some((q) => q && q.section != null && String(q.section).trim());
    const sectionCounts = Object.create(null);

    state.questions.forEach((q) => {
      const id = q && q.id != null ? String(q.id) : "";
      const r = (id && state.results[id]) || "skip";

      if (r === "said") said += 1;
      else if (r === "again") again += 1;
      else skip += 1;

      if (hasAnySection) {
        const sec = normalizeSection(q && q.section);
        if (!sectionCounts[sec]) sectionCounts[sec] = { said: 0, again: 0, skip: 0 };
        if (r === "said") sectionCounts[sec].said += 1;
        else if (r === "again") sectionCounts[sec].again += 1;
        else sectionCounts[sec].skip += 1;
      }
    });

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
        const status = r === "said" ? "✅ Said" : r === "again" ? "🔁 Try again" : "⏭️ Skipped";
        return `
          <li style="display:flex; gap:10px; align-items:flex-start; padding:8px 0; border-bottom:1px solid var(--border)">
            <span aria-hidden="true">${safeText(status.split(" ")[0])}</span>
            <span style="min-width:0">
              <b>${idx + 1}.</b> ${safeText(q.question || "")}
              <div style="margin-top:6px; font-weight:800">${status}</div>
            </span>
          </li>
        `;
      })
      .join("");

    const encouragement =
      again > 0
        ? "Repeat the “Try again” prompts tomorrow. Short, happy practice works best."
        : "Great work. Try again later for a different order.";

    return `
      <div class="note" style="margin-top:0">
        <strong>Summary</strong>
        <p style="margin:8px 0 0; color: var(--muted)">
          Said: <strong>${said}</strong> • Try again: <strong>${again}</strong> • Skipped: <strong>${skip}</strong>
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

      <div class="actions" style="margin-top:12px">
        <button class="btn btn--primary" type="button" data-action="restart">Restart</button>
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
      const existing = document.querySelector(`script[data-ueah-test-bank="${SLUG}"]`);
      if (existing) {
        // If already injected, resolve on next tick (lets the script run if needed)
        setTimeout(() => resolve(true), 0);
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
        results: Object.create(null),
        lastError: ""
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

          state.questions = prepared;
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
        const q = state.questions[state.index];
        if (!q || q.id == null) return;

        const v = String(val || "").toLowerCase();
        if (v !== "said" && v !== "again" && v !== "skip") return;

        state.results[String(q.id)] = v;
        next();
      }

      function speakCurrent() {
        const q = state.questions[state.index];
        if (!q) return;
        const t = String(q.say || q.model || q.question || "").trim();
        if (!t) return;
        speak(t);
      }

      // Event delegation
      host.addEventListener("click", (ev) => {
        const btn = ev.target && ev.target.closest ? ev.target.closest("[data-action]") : null;
        if (!btn) return;

        const action = btn.getAttribute("data-action");

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

        if (action === "play") {
          ev.preventDefault();
          speakCurrent();
          return;
        }

        if (action === "stop") {
          ev.preventDefault();
          stopSpeech();
          return;
        }

        if (action === "mark") {
          ev.preventDefault();
          mark(btn.getAttribute("data-mark"));
          return;
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

      paint();
    }
  });
})();
