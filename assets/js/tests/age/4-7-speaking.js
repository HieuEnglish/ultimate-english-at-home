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

  function safeText(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
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

      const u = new SpeechSynthesisUtterance(t);
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
    const val = String(d || "").toLowerCase();
    if (!val) return "";
    const label = val.charAt(0).toUpperCase() + val.slice(1);
    return `<span style="padding:4px 10px; border-radius:999px; border:1px solid var(--border); background: var(--surface); font-weight:800; font-size:12px">${safeText(label)}</span>`;
  }

  function renderIntro() {
    return `
      <div class="detail-card" role="region" aria-label="Speaking test intro">
        <h3 style="margin:0">Speaking (Ages 4–7)</h3>
        <p style="margin:10px 0 0; color: var(--muted)">
          A quick speaking practice you can run at home or in class.
          Read the prompt to the learner. The learner answers out loud.
        </p>
        <ul style="margin:12px 0 0; padding-left:18px; color: var(--muted)">
          <li>Encourage full sentences, but accept short answers.</li>
          <li>Model the answer once, then let them try.</li>
          <li>Keep it fun (5–8 minutes).</li>
        </ul>
        <p style="margin:10px 0 0; opacity:.92">
          Tip: Use <strong>🔊 Play</strong> to hear a model answer (if your browser supports audio).
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
        <strong>Could not load this test.</strong>
        <p style="margin:8px 0 0">${safeText(message || "Unknown error")}</p>
      </div>
    `;
  }

  function renderPromptScreen(state) {
    const q = state.questions[state.index];
    const total = state.questions.length;
    const n = state.index + 1;

    const prompt = safeText(q.question || "Speak!");
    const model = safeText(q.model || "");
    const tip = safeText(q.explanation || "Keep it playful and short.");
    const hasAudio = supportsSpeech() && String(q.say || "").trim();

    const speechHint = hasAudio
      ? ""
      : `
        <div class="note" style="margin:12px 0 0; padding:10px 12px">
          <strong>Audio not available</strong>
          <p style="margin:6px 0 0">Read the model answer out loud and encourage copying.</p>
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
          <button class="btn" type="button" data-action="restart" aria-label="Restart the test">Restart</button>
        </div>
      </div>

      <div style="margin-top:12px">
        <div style="border:1px solid var(--border); border-radius:16px; padding:14px; background: var(--surface2)">
          <div style="font-weight:900; font-size:18px">${prompt}</div>
          ${model ? `<div style="margin-top:10px; font-size:18px; font-weight:900; letter-spacing:.2px">Example: ${model}</div>` : ""}
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
      const r = state.results[q.id] || "skip";
      if (r === "said") said += 1;
      else if (r === "again") again += 1;
      else skip += 1;
    });

    const rows = state.questions
      .map((q, idx) => {
        const r = state.results[q.id] || "skip";
        const status =
          r === "said" ? "✅ Said" : r === "again" ? "🔁 Try again" : "⏭️ Skipped";
        return `
          <tr>
            <td style="padding:8px 10px; border-bottom:1px solid var(--border); color: var(--muted)">${idx + 1}</td>
            <td style="padding:8px 10px; border-bottom:1px solid var(--border)">${safeText(q.question || "")}</td>
            <td style="padding:8px 10px; border-bottom:1px solid var(--border); font-weight:800">${status}</td>
          </tr>
        `;
      })
      .join("");

    const encouragement =
      again > 0
        ? "Repeat the “Try again” prompts tomorrow. Short, happy practice works best."
        : "Great work. Try this test again later for a different order.";

    return `
      <div class="detail-card" role="region" aria-label="Speaking test summary">
        <h3 style="margin:0">Summary</h3>
        <p style="margin:10px 0 0; color: var(--muted)">
          Said: <strong>${said}</strong> • Try again: <strong>${again}</strong> • Skipped: <strong>${skip}</strong>
        </p>

        <div style="margin-top:14px; overflow:auto; border:1px solid var(--border); border-radius:16px">
          <table style="width:100%; border-collapse:collapse">
            <thead>
              <tr>
                <th style="text-align:left; padding:10px; border-bottom:1px solid var(--border); color: var(--muted)">#</th>
                <th style="text-align:left; padding:10px; border-bottom:1px solid var(--border); color: var(--muted)">Prompt</th>
                <th style="text-align:left; padding:10px; border-bottom:1px solid var(--border); color: var(--muted)">Result</th>
              </tr>
            </thead>
            <tbody>${rows}</tbody>
          </table>
        </div>

        <div class="note" style="margin-top:12px">
          <strong>Next step</strong>
          <p style="margin:8px 0 0">${safeText(encouragement)}</p>
        </div>
      </div>

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
  // Runner registration
  // -----------------------------

  store.registerRunner(SLUG, {
    render() {
      return renderLoading();
    },

    async afterRender(rootEl, ctx) {
      if (!rootEl) return;

      let questions = [];
      try {
        await ensureBankLoaded(ctx);
        questions = (window.UEAH_TEST_BANKS && window.UEAH_TEST_BANKS[SLUG]) || [];
        if (!Array.isArray(questions) || !questions.length) {
          throw new Error("Question bank is empty.");
        }
      } catch (e) {
        rootEl.innerHTML = renderError(e && e.message ? e.message : "Failed to load.");
        return;
      }

      const state = {
        mode: "intro", // intro | prompt | summary
        questions: shuffleInPlace(questions.slice()),
        index: 0,
        results: {} // id -> said | again | skip
      };

      function paint() {
        if (state.mode === "intro") {
          rootEl.innerHTML = renderIntro();
        } else if (state.mode === "summary") {
          rootEl.innerHTML = renderSummary(state);
        } else {
          rootEl.innerHTML = renderPromptScreen(state);
        }
      }

      function start() {
        stopSpeech();
        state.mode = "prompt";
        state.index = 0;
        state.results = {};
        paint();
      }

      function restart() {
        stopSpeech();
        state.mode = "intro";
        state.questions = shuffleInPlace(questions.slice());
        state.index = 0;
        state.results = {};
        paint();
      }

      function next() {
        stopSpeech();
        if (state.index + 1 >= state.questions.length) {
          state.mode = "summary";
          paint();
          return;
        }
        state.index += 1;
        paint();
      }

      function mark(val) {
        const q = state.questions[state.index];
        if (!q || !q.id) return;
        const v = String(val || "").toLowerCase();
        if (v !== "said" && v !== "again" && v !== "skip") return;
        state.results[q.id] = v;
        next();
      }

      function speakCurrent() {
        const q = state.questions[state.index];
        if (!q) return;
        const t = String(q.say || "").trim();
        if (!t) return;
        speak(t);
      }

      rootEl.addEventListener("click", (ev) => {
        const btn = ev.target && ev.target.closest ? ev.target.closest("[data-action]") : null;
        if (!btn) return;

        const action = btn.getAttribute("data-action");
        if (action === "start") {
          ev.preventDefault();
          start();
        } else if (action === "restart") {
          ev.preventDefault();
          restart();
        } else if (action === "play") {
          ev.preventDefault();
          speakCurrent();
        } else if (action === "mark") {
          ev.preventDefault();
          mark(btn.getAttribute("data-mark"));
        }
      });

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
