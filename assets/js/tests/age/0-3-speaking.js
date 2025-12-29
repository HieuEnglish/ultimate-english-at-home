/* assets/js/tests/age/0-3-speaking.js
   Runner: Ages 0–3 • Speaking

   Loads the question bank (assets/data/tests-0-3-speaking.js) and runs a
   caregiver-led, one-prompt-at-a-time speaking practice.

   Features:
   - Random order every run (limited to MAX_PROMPTS_PER_RUN)
   - Optional model audio using Speech Synthesis (TTS)
   - Caregiver marks each prompt as Said / Try again / Skip

   Updates:
   - Consistent runner wrapper (data-ueah-test + stage) + init guard
   - Robust bank loader (waits for existing script load/error; validates bank)
   - Ensures stable ids (fallback id if missing)
   - Adds Stop button for TTS
   - Adds Retry on error
   - Stops TTS on navigation (popstate)
   - Adds "Save score to Profile" using the shared helper (window.UEAH_SAVE_SCORE)
   - Save payload now includes:
     * questions: state.questions
     * resultsById: state.results
*/

(function () {
  "use strict";

  const SLUG = "age-0-3-speaking";
  const BANK_SRC = "assets/data/tests-0-3-speaking.js";
  const MAX_PROMPTS_PER_RUN = 8;

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

  function nowIso() {
    return new Date().toISOString();
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
        existing.addEventListener(
          "error",
          () => reject(new Error("Failed to load test bank")),
          { once: true }
        );

        // In case load already happened before listeners attached:
        validate();
        return;
      }

      const s = document.createElement("script");
      s.src = src;
      s.defer = true;
      s.async = true;
      s.setAttribute("data-ueah-test-bank", SLUG);
      s.onload = validate;
      s.onerror = () => reject(new Error(`Failed to load: ${src}`));
      document.head.appendChild(s);
    });

    return bankPromise;
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

      // Best-effort: prime voices list
      try {
        if (typeof synth.getVoices === "function") synth.getVoices();
      } catch (_) {}

      const u = new SpeechSynthesisUtterance(t);
      u.lang = "en-US";
      u.rate = 0.9;
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

  function renderIntro() {
    const audioOk = supportsSpeech();
    return `
      <div class="note" style="margin-top:0">
        <strong>Ages 0–3 Speaking</strong>
        <p style="margin:8px 0 0; color: var(--muted)">
          Caregiver-led. Press <strong>Start</strong> for <strong>${MAX_PROMPTS_PER_RUN}</strong> quick prompts,
          then encourage your child to copy the word or phrase.
        </p>
        <ul style="margin:10px 0 0; padding-left:18px; color: var(--muted)">
          <li>Accept any attempt (sounds, partial words).</li>
          <li>Keep it short (2–5 minutes).</li>
          <li>Repeat easy prompts often—repetition builds confidence.</li>
        </ul>
        <p style="margin:10px 0 0; opacity:.92">
          ${
            audioOk
              ? "Tip: Use <strong>🔊 Play</strong> for a model voice."
              : "Audio is not available in this browser. Say the model out loud."
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
        <p style="margin:8px 0 0">Preparing your speaking prompts.</p>
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

  function difficultyBadge(diff) {
    const d = String(diff || "").trim();
    if (!d) return "";
    return `<span style="display:inline-block; padding:4px 10px; border-radius:999px; border:1px solid var(--border); color: var(--muted); font-weight:800; font-size:12px">${safeText(
      d
    )}</span>`;
  }

  function renderPromptScreen(state) {
    const q = state.questions[state.index];
    const total = state.questions.length;
    const n = state.index + 1;

    const prompt = safeText(q.question || "Say it!");
    const model = safeText(q.model || "");
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
                  ? "Read the model out loud and encourage copying."
                  : "Say an example first, then let your child try."
              }
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
          ${model ? `<div style="margin-top:10px; font-size:26px; font-weight:900; letter-spacing:.2px">${model}</div>` : ""}
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
    const total = state.questions.length;
    let said = 0;
    let again = 0;
    let skip = 0;

    state.questions.forEach((q) => {
      const id = q && q.id != null ? String(q.id) : "";
      const r = (id && state.results[id]) || "skip";
      if (r === "said") said += 1;
      else if (r === "again") again += 1;
      else skip += 1;
    });

    const rows = state.questions
      .map((q, i) => {
        const id = q && q.id != null ? String(q.id) : "";
        const r = (id && state.results[id]) || "skip";
        const icon = r === "said" ? "✅" : r === "again" ? "🔁" : "⏭️";
        const label = r === "said" ? "Said" : r === "again" ? "Try again" : "Skipped";
        return `
          <li style="display:flex; gap:10px; align-items:flex-start; padding:8px 0; border-bottom:1px solid var(--border)">
            <span aria-hidden="true">${icon}</span>
            <span style="min-width:0"><b>Prompt ${i + 1}:</b> ${safeText(q.question || "")} <span style="opacity:.85">(${label})</span></span>
          </li>
        `;
      })
      .join("");

    const canSave = !!(window.UEAH_SAVE_SCORE && typeof window.UEAH_SAVE_SCORE.save === "function");

    return `
      <div class="note" style="margin-top:0">
        <strong>Finished!</strong>
        <p style="margin:8px 0 0; color: var(--muted)">
          Said: <strong>${said}</strong> • Try again: <strong>${again}</strong> • Skipped: <strong>${skip}</strong>
        </p>
        <p style="margin:8px 0 0; opacity:.92">
          Focus on 2–3 prompts marked <strong>Try again</strong>, repeat them daily for 1–2 minutes.
        </p>
      </div>

      <details style="margin-top:12px">
        <summary style="cursor:pointer; font-weight:900">Show prompt list</summary>
        <ul style="list-style:none; padding-left:0; margin:12px 0 0">
          ${rows}
        </ul>
      </details>

      <div class="actions" style="margin-top:12px; display:flex; gap:8px; flex-wrap:wrap">
        <button class="btn btn--primary" type="button" data-action="restart">Play again</button>
        ${
          canSave
            ? `<button class="btn" type="button" data-action="save-score" aria-label="Save score to Profile">Save score to Profile</button>`
            : ""
        }
        ${
          state.savedMsg
            ? `<span style="align-self:center; font-weight:800; color: var(--muted)">${safeText(
                state.savedMsg
              )}</span>`
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
        status: "intro", // intro | loading | prompt | summary | error
        questions: [],
        index: 0,
        results: Object.create(null), // per-id results map
        lastError: "",
        autoSpokenIndex: -1,
        savedMsg: ""
      };

      function currentQuestion() {
        return state.questions && state.questions.length ? state.questions[state.index] : null;
      }

      function speakCurrent() {
        const q = currentQuestion();
        if (!q) return false;
        const t = String(q.say || q.model || "").trim();
        if (!t) return false;
        return speak(t);
      }

      function paint() {
        if (state.status === "intro") stage.innerHTML = renderIntro();
        else if (state.status === "loading") stage.innerHTML = renderLoading();
        else if (state.status === "prompt") stage.innerHTML = renderPromptScreen(state);
        else if (state.status === "summary") stage.innerHTML = renderSummary(state);
        else if (state.status === "error") stage.innerHTML = renderError(state.lastError);
        else stage.innerHTML = renderIntro();

        // Auto-play once per prompt (best effort; may be blocked by browser)
        if (state.status === "prompt" && state.autoSpokenIndex !== state.index) {
          state.autoSpokenIndex = state.index;
          setTimeout(() => {
            try {
              speakCurrent();
            } catch (_) {}
          }, 0);
        }
      }

      async function start() {
        stopSpeech();
        state.status = "loading";
        state.lastError = "";
        state.autoSpokenIndex = -1;
        state.savedMsg = "";
        paint();

        try {
          await ensureBankLoaded(ctx);
          const bank =
            window.UEAH_TEST_BANKS && Array.isArray(window.UEAH_TEST_BANKS[SLUG])
              ? window.UEAH_TEST_BANKS[SLUG]
              : [];

          if (!bank.length) throw new Error("Missing question bank.");

          const prepared = bank
            .filter(isPlainObject)
            .map((q, idx) => {
              const id = q.id != null && String(q.id).trim() ? String(q.id).trim() : `${SLUG}::idx-${idx}`;
              return { ...q, id };
            });

          shuffleInPlace(prepared);

          const limit = Math.max(1, Math.min(MAX_PROMPTS_PER_RUN, prepared.length));
          state.questions = prepared.slice(0, limit);
          state.index = 0;
          state.results = Object.create(null);
          state.status = "prompt";
          state.autoSpokenIndex = -1;
          state.savedMsg = "";
          paint();
        } catch (err) {
          state.status = "error";
          state.lastError = err && err.message ? err.message : "Could not load the test.";
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
        state.autoSpokenIndex = -1;
        state.savedMsg = "";
        paint();
      }

      function mark(result) {
        stopSpeech();
        const q = currentQuestion();
        if (!q) return;

        const r = String(result || "").toLowerCase();
        const normalized = r === "said" || r === "again" || r === "skip" ? r : "skip";
        state.results[String(q.id)] = normalized;

        if (state.index + 1 >= state.questions.length) {
          state.status = "summary";
          paint();
          return;
        }

        state.index += 1;
        state.status = "prompt";
        paint();
      }

      function saveScoreToProfile() {
        if (!window.UEAH_SAVE_SCORE || typeof window.UEAH_SAVE_SCORE.save !== "function") {
          state.savedMsg = "Save unavailable.";
          paint();
          return;
        }

        // Optional: include simple summary numbers (safe for storage)
        const total = state.questions.length;
        let said = 0;
        let again = 0;
        let skip = 0;

        state.questions.forEach((q) => {
          const id = q && q.id != null ? String(q.id) : "";
          const r = (id && state.results[id]) || "skip";
          if (r === "said") said += 1;
          else if (r === "again") again += 1;
          else skip += 1;
        });

        const payload = {
          slug: SLUG,
          ageGroup: "0-3",
          skill: "speaking",
          at: nowIso(),
          totalPrompts: total,
          said,
          again,
          skip,
          // REQUIRED UPDATE:
          questions: state.questions,
          resultsById: state.results
        };

        const res = window.UEAH_SAVE_SCORE.save(payload);

        state.savedMsg = res && res.ok ? "Saved to Profile." : "Could not save.";
        paint();
      }

      host.addEventListener("click", (ev) => {
        const btn = ev.target && ev.target.closest ? ev.target.closest("[data-action]") : null;
        if (!btn) return;

        const action = btn.getAttribute("data-action");
        if (action === "start") {
          ev.preventDefault();
          start();
        } else if (action === "retry") {
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
