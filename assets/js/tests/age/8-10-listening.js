/* assets/js/tests/age/8-10-listening.js
   Runner: Ages 8–10 • Listening

   Loads the question bank (assets/data/tests-8-10-listening.js) and runs a
   simple, accessible, one-question-at-a-time listening quiz.

   Audio approach (no assets needed):
   - Uses the browser's Speech Synthesis (TTS) to read "say".
   - Includes a "🔊 Play" button and a "Show transcript" fallback.

   Supported question types:
   - listenChoice
   - listenTrueFalse
   - listenFillInTheBlank

   Randomization:
   - Shuffles question order on start
   - Shuffles options within listenChoice questions
*/

(function () {
  "use strict";

  const SLUG = "age-8-10-listening";
  const BANK_SRC = "assets/data/tests-8-10-listening.js";
  const MAX_QUESTIONS = 15;

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
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
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

  function cloneQuestionWithShuffledOptions(q) {
    if (!isPlainObject(q)) return q;

    const t = String(q.type || "").toLowerCase();
    if (t !== "listenchoice") return { ...q };

    if (!Array.isArray(q.options)) return { ...q };
    if (typeof q.answer !== "number") return { ...q };

    const pairs = q.options.map((text, idx) => ({ text, idx }));
    shuffleInPlace(pairs);

    const newOptions = pairs.map((p) => p.text);
    const newAnswer = pairs.findIndex((p) => p.idx === q.answer);

    return { ...q, options: newOptions, answer: newAnswer };
  }

  // -----------------------------
  // Bank loader (no build step)
  // -----------------------------

  let bankPromise = null;

  function ensureBankLoaded(ctx) {
    // Already loaded?
    if (window.UEAH_TEST_BANKS && Array.isArray(window.UEAH_TEST_BANKS[SLUG])) {
      return Promise.resolve(true);
    }

    // In-flight?
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

      // Best-effort: prime voices list (some browsers populate async)
      try {
        if (typeof synth.getVoices === "function") synth.getVoices();
      } catch (_) {}

      const u = new SpeechSynthesisUtterance(t);
      u.lang = "en-US";
      u.rate = 0.93;
      u.pitch = 1.0;
      u.volume = 1.0;
      synth.speak(u);
      return true;
    } catch (_) {
      return false;
    }
  }

  // -----------------------------
  // UI renderers
  // -----------------------------

  function renderIntro() {
    return `
      <div class="note" style="margin-top:0">
        <strong>Ages 8–10 Listening</strong>
        <p style="margin:8px 0 0">Listen and answer questions about details, numbers, and meaning.</p>
        <p style="margin:8px 0 0; opacity:.92">Tip: You can press <strong>🔊 Play</strong> to repeat the audio, and <strong>Show transcript</strong> if needed.</p>
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
          <button class="btn" type="button" data-action="play" aria-label="Play the audio">🔊 Play</button>
          <button class="btn" type="button" data-action="toggleTranscript" aria-pressed="${state.showTranscript ? "true" : "false"}">
            ${state.showTranscript ? "Hide transcript" : "Show transcript"}
          </button>
          <button class="btn" type="button" data-action="restart" aria-label="Restart the test">Restart</button>
        </div>
      </div>
    `;
  }

  function renderNoAudioHint() {
    return `
      <div class="note" style="margin:12px 0 0; padding:10px 12px">
        <strong>Audio not available</strong>
        <p style="margin:6px 0 0">Use <strong>Show transcript</strong> and read it out loud.</p>
      </div>
    `;
  }

  function renderContext(q) {
    const c = q && q.context ? String(q.context) : "";
    if (!c.trim()) return "";
    return `
      <div class="note" style="margin:12px 0 0; padding:10px 12px">
        <strong>Context</strong>
        <p style="margin:8px 0 0">${safeText(c)}</p>
      </div>
    `;
  }

  function renderPicture(q) {
    const p = q && q.picture ? String(q.picture) : "";
    if (!p.trim()) return "";
    return `
      <div class="note" style="margin:12px 0 0; padding:12px 14px">
        <strong>Look</strong>
        <div style="font-size:52px; line-height:1.1; margin-top:10px" aria-label="Picture">${safeText(
          p
        )}</div>
      </div>
    `;
  }

  function renderTranscript(state) {
    if (!state.showTranscript) return "";
    const q = state.questions[state.index];
    const t = q && q.say ? String(q.say) : "";
    if (!t.trim()) return "";

    return `
      <div class="note" style="margin:12px 0 0; padding:10px 12px">
        <strong>Transcript</strong>
        <p style="margin:8px 0 0">${safeText(t)}</p>
      </div>
    `;
  }

  function renderMCQForm(q) {
    const prompt = safeText(q.question || "Listen. Choose the best answer.");
    const options = Array.isArray(q.options) ? q.options : [];

    const optionsHtml = options
      .map((opt, i) => {
        const id = `opt-${SLUG}-${q.id}-${i}`;
        return `
          <label for="${id}" style="display:flex; align-items:flex-start; gap:10px; padding:12px; border:1px solid var(--border); border-radius:14px; background: var(--surface2); cursor:pointer">
            <input id="${id}" type="radio" name="choice" value="${i}" required style="margin-top:3px" />
            <span style="line-height:1.35">${safeText(opt)}</span>
          </label>
        `;
      })
      .join("");

    return `
      <form data-form="question" style="margin-top:12px">
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
    const prompt = safeText(q.question || "Type your answer.");

    return `
      <form data-form="question" style="margin-top:12px">
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
              spellcheck="false"
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

  function renderQuestionScreen(state) {
    const q = state.questions[state.index];
    const t = String(q && q.type ? q.type : "").toLowerCase();

    const top = renderTopBar(state);
    const context = renderContext(q);
    const picture = renderPicture(q);
    const transcript = renderTranscript(state);

    const form = t === "listenfillintheblank" ? renderFillBlankForm(q) : renderMCQForm(q);

    return `
      ${top}
      ${context}
      ${picture}
      ${form}
      ${supportsSpeech() ? "" : renderNoAudioHint()}
      ${transcript}
    `;
  }

  function renderFeedback(state) {
    const q = state.questions[state.index];
    const total = state.questions.length;
    const n = state.index + 1;

    const ok = !!state.lastIsCorrect;
    const icon = ok ? "✅" : "❌";
    const nextLabel = n >= total ? "Finish" : "Next";

    const t = String(q && q.type ? q.type : "").toLowerCase();

    let detailHtml = "";

    if (t === "listenfillintheblank") {
      const typed = state.lastBlank != null ? String(state.lastBlank) : "";
      const answers = Array.isArray(q.answer) ? q.answer : [q.answer];
      const best = answers.filter((x) => x != null).map(String);

      detailHtml = ok
        ? `<p style="margin:8px 0 0">Correct.</p>`
        : `
          <p style="margin:8px 0 0">Correct answer: <strong>${safeText(best[0] || "")}</strong></p>
          <p style="margin:8px 0 0; opacity:.92">You typed: <strong>${safeText(typed || "(blank)")}</strong></p>
        `;

      if (best.length > 1) {
        detailHtml += `<p style="margin:8px 0 0; opacity:.92">Also accepted: ${safeText(best.slice(1).join(", "))}</p>`;
      }
    } else {
      const correctIdx = Number(q.answer);
      const chosenIdx = Number(state.lastChoice);

      const correctText = Array.isArray(q.options) ? q.options[correctIdx] : "";
      const chosenText = Array.isArray(q.options) ? q.options[chosenIdx] : "";

      detailHtml = ok
        ? `<p style="margin:8px 0 0">Correct.</p>`
        : `
          <p style="margin:8px 0 0">Correct answer: <strong>${safeText(correctText)}</strong></p>
          <p style="margin:8px 0 0; opacity:.92">You chose: <strong>${safeText(chosenText)}</strong></p>
        `;
    }

    const explanation = q.explanation ? String(q.explanation).trim() : "";
    const explanationHtml = explanation
      ? `<p style="margin:8px 0 0; opacity:.92"><strong>Tip:</strong> ${safeText(explanation)}</p>`
      : "";

    const transcriptLine = q.say
      ? `<p style="margin:8px 0 0; opacity:.92"><strong>Transcript:</strong> ${safeText(q.say)}</p>`
      : "";

    return `
      <div style="display:flex; align-items:center; justify-content:space-between; gap:10px; flex-wrap:wrap">
        <div style="font-weight:800; color: var(--muted)">Question ${n} of ${total}</div>
        <div style="display:flex; gap:8px; flex-wrap:wrap">
          <button class="btn" type="button" data-action="play" aria-label="Play the audio again">🔊 Play</button>
          <button class="btn" type="button" data-action="restart" aria-label="Restart the test">Restart</button>
        </div>
      </div>

      <div class="note" style="margin-top:12px" aria-live="polite">
        <strong>${icon} ${ok ? "Nice work!" : "Keep going"}</strong>
        ${detailHtml}
        ${transcriptLine}
        ${q.picture ? `<p style="margin:8px 0 0">Picture: <span style="font-size:22px">${safeText(q.picture)}</span></p>` : ""}
        ${explanationHtml}
      </div>

      <div class="actions" style="margin-top:12px">
        <button class="btn btn--primary" type="button" data-action="next">${nextLabel}</button>
      </div>
    `;
  }

  function renderSummary(state) {
    const total = state.questions.length;
    const correct = state.correctCount;
    const pct = total ? Math.round((correct / total) * 100) : 0;

    return `
      <div class="note" style="margin-top:0">
        <strong>Finished!</strong>
        <p style="margin:8px 0 0">Score: <strong>${correct}</strong> / ${total} (${pct}%)</p>
        <p style="margin:8px 0 0">Tip: Repeat the test to practice again. The questions are randomized each time.</p>
      </div>
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

      // Prevent double-init if the user navigates away/back quickly.
      if (host.__ueahInited) return;
      host.__ueahInited = true;

      const stage = host.querySelector("[data-stage]");
      if (!stage) return;

      const state = {
        status: "intro", // intro | loading | question | feedback | summary | error
        questions: [],
        index: 0,
        correctCount: 0,
        lastChoice: null,
        lastBlank: "",
        lastIsCorrect: false,
        lastError: "",
        showTranscript: false,
        autoSpokenIndex: -1
      };

      function currentQuestion() {
        return state.questions && state.questions.length ? state.questions[state.index] : null;
      }

      function speakCurrent() {
        const q = currentQuestion();
        if (!q) return false;
        return speak(q.say || "");
      }

      function paint() {
        if (state.status === "intro") stage.innerHTML = renderIntro();
        else if (state.status === "loading") stage.innerHTML = renderLoading();
        else if (state.status === "question") stage.innerHTML = renderQuestionScreen(state);
        else if (state.status === "feedback") stage.innerHTML = renderFeedback(state);
        else if (state.status === "summary") stage.innerHTML = renderSummary(state);
        else if (state.status === "error") stage.innerHTML = renderError(state.lastError);
        else stage.innerHTML = renderIntro();

        // Auto-play once per question (best effort).
        if (state.status === "question" && state.autoSpokenIndex !== state.index) {
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
        state.showTranscript = false;
        state.autoSpokenIndex = -1;
        paint();

        try {
          await ensureBankLoaded(ctx);

          const bank =
            window.UEAH_TEST_BANKS && Array.isArray(window.UEAH_TEST_BANKS[SLUG])
              ? window.UEAH_TEST_BANKS[SLUG]
              : [];

          if (!bank.length) throw new Error("Missing question bank.");

          const prepared = bank.map(cloneQuestionWithShuffledOptions);
          shuffleInPlace(prepared);

          // Take a random subset for variety (order already shuffled)
          const subset = prepared.slice(0, Math.min(MAX_QUESTIONS, prepared.length));

          state.questions = subset;
          state.index = 0;
          state.correctCount = 0;
          state.lastChoice = null;
          state.lastBlank = "";
          state.lastIsCorrect = false;
          state.lastError = "";
          state.showTranscript = false;
          state.autoSpokenIndex = -1;

          state.status = "question";
          paint();

          setTimeout(() => {
            try {
              const el = host.querySelector("input, button");
              if (el && typeof el.focus === "function") el.focus();
            } catch (_) {}
          }, 0);
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
        state.correctCount = 0;
        state.lastChoice = null;
        state.lastBlank = "";
        state.lastIsCorrect = false;
        state.lastError = "";
        state.showTranscript = false;
        state.autoSpokenIndex = -1;
        paint();
      }

      function next() {
        stopSpeech();
        const total = state.questions.length;
        if (state.index + 1 >= total) {
          state.status = "summary";
          paint();
          return;
        }

        state.index += 1;
        state.lastChoice = null;
        state.lastBlank = "";
        state.lastIsCorrect = false;
        state.status = "question";
        paint();
      }

      function grade(choiceIndex, blankText) {
        const q = state.questions[state.index];
        const t = String(q && q.type ? q.type : "").toLowerCase();

        let ok = false;

        if (t === "listenfillintheblank") {
          const user = normalizeAnswerText(blankText);
          const ans = q.answer;

          if (Array.isArray(ans)) {
            ok = ans.some((a) => normalizeAnswerText(a) === user);
          } else {
            ok = normalizeAnswerText(ans) === user;
          }

          state.lastBlank = blankText != null ? String(blankText) : "";
        } else {
          const chosen = Number(choiceIndex);
          if (!Number.isFinite(chosen)) return;
          state.lastChoice = chosen;
          ok = chosen === Number(q.answer);
        }

        state.lastIsCorrect = ok;
        if (ok) state.correctCount += 1;

        state.status = "feedback";
        paint();
      }

      host.addEventListener("click", (ev) => {
        const btn = ev.target && ev.target.closest ? ev.target.closest("button") : null;
        if (!btn) return;

        const action = btn.getAttribute("data-action");

        if (action === "start") {
          ev.preventDefault();
          start();
        } else if (action === "restart") {
          ev.preventDefault();
          restart();
        } else if (action === "next") {
          ev.preventDefault();
          next();
        } else if (action === "retry") {
          ev.preventDefault();
          start();
        } else if (action === "play") {
          ev.preventDefault();
          speakCurrent();
        } else if (action === "toggleTranscript") {
          ev.preventDefault();
          state.showTranscript = !state.showTranscript;
          paint();
        }
      });

      host.addEventListener("submit", (ev) => {
        const form = ev.target;
        if (!form || form.getAttribute("data-form") !== "question") return;

        ev.preventDefault();

        const q = state.questions[state.index];
        const t = String(q && q.type ? q.type : "").toLowerCase();

        if (t === "listenfillintheblank") {
          const input = form.querySelector('input[name="blank"]');
          const value = input ? input.value : "";
          grade(null, value);
          return;
        }

        const checked = form.querySelector('input[name="choice"]:checked');
        const val = checked ? checked.value : null;
        grade(val, null);
      });

      // Initial render
      paint();
    }
  });
})();
