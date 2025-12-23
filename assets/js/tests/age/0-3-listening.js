/* assets/js/tests/age/0-3-listening.js
   Runner: Ages 0–3 • Listening

   Loads the question bank (assets/data/tests-0-3-listening.js) and runs a
   simple, accessible, one-question-at-a-time listening quiz.

   Audio approach (no assets needed):
   - Uses the browser's Speech Synthesis (TTS) to say the target word.
   - Includes a "🔊 Play" button and a "Show word" fallback for caregivers.

   Update:
   - Adds a final summary report (per-question review) similar in spirit to 4–7 Speaking.
*/

(function () {
  "use strict";

  const SLUG = "age-0-3-listening";
  const BANK_SRC = "assets/data/tests-0-3-listening.js";

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

  function safeText(v) {
    return String(v == null ? "" : v)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }

  function optionAt(q, idx) {
    if (!q || !Array.isArray(q.options)) return "";
    const n = Number(idx);
    if (!Number.isFinite(n)) return "";
    return q.options[n] == null ? "" : String(q.options[n]);
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
  // UI renderers
  // -----------------------------

  function renderIntro() {
    return `
      <div class="note" style="margin-top:0">
        <strong>Ages 0–3 Listening</strong>
        <p style="margin:8px 0 0">Caregiver-led. Press <strong>Start</strong>, then the child taps the picture that matches the word.</p>
        <p style="margin:8px 0 0; opacity:.92">Tip: Use the <strong>🔊 Play</strong> button to repeat the word.</p>
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

  function renderQuestionScreen(state) {
    const q = state.questions[state.index];
    const total = state.questions.length;
    const n = state.index + 1;

    const prompt = safeText(q.question || "Listen. Tap the picture.");
    const options = Array.isArray(q.options) ? q.options : [];

    const optionButtons = options
      .map((opt, i) => {
        const isEmojiish = /[\u{1F300}-\u{1FAFF}]/u.test(String(opt));
        const big = isEmojiish ? "font-size:30px" : "font-size:22px; letter-spacing:.3px";
        return `
          <button
            class="btn"
            type="submit"
            name="choice"
            value="${i}"
            data-choice="${i}"
            style="justify-content:center; padding:14px 14px; min-height:54px"
            aria-label="Option ${i + 1}: ${safeText(opt)}"
          ><span style="${big}">${safeText(opt)}</span></button>
        `;
      })
      .join("");

    const showWordBtn = `
      <button class="btn" type="button" data-action="toggleWord" aria-pressed="${state.revealWord ? "true" : "false"}">
        ${state.revealWord ? "Hide word" : "Show word"}
      </button>
    `;

    const wordReveal = state.revealWord
      ? `
        <div class="note" style="margin:12px 0 0; padding:10px 12px">
          <strong>Word:</strong> <span style="font-size:18px; font-weight:900">${safeText(q.say || "")}</span>
        </div>
      `
      : "";

    const speechHint = supportsSpeech()
      ? ""
      : `
        <div class="note" style="margin:12px 0 0; padding:10px 12px">
          <strong>Audio not available</strong>
          <p style="margin:6px 0 0">Press <strong>Show word</strong> and read it out loud.</p>
        </div>
      `;

    return `
      <div style="display:flex; align-items:center; justify-content:space-between; gap:10px; flex-wrap:wrap">
        <div style="font-weight:800; color: var(--muted)">Question ${n} of ${total}</div>
        <div style="display:flex; gap:8px; flex-wrap:wrap">
          <button class="btn" type="button" data-action="play" aria-label="Play the word">🔊 Play</button>
          ${showWordBtn}
          <button class="btn" type="button" data-action="restart" aria-label="Restart the test">Restart</button>
        </div>
      </div>

      <form data-form="question" style="margin-top:12px">
        <fieldset style="border:1px solid var(--border); border-radius:16px; padding:14px; background: var(--surface2)">
          <legend style="padding:0 8px; font-weight:900">${prompt}</legend>

          <div
            role="group"
            aria-label="Answer choices"
            style="display:grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap:10px; margin-top:12px"
          >
            ${optionButtons}
          </div>
        </fieldset>
      </form>

      ${speechHint}
      ${wordReveal}
    `;
  }

  function renderFeedback(state) {
    const q = state.questions[state.index];
    const chosen = state.lastChoice;
    const correct = Number(q.answer);
    const ok = chosen === correct;
    const total = state.questions.length;
    const n = state.index + 1;

    const correctText = optionAt(q, correct);
    const chosenText = optionAt(q, chosen);

    const nextLabel = n >= total ? "Finish" : "Next";
    const icon = ok ? "✅" : "❌";

    return `
      <div style="display:flex; align-items:center; justify-content:space-between; gap:10px; flex-wrap:wrap">
        <div style="font-weight:800; color: var(--muted)">Question ${n} of ${total}</div>
        <div style="display:flex; gap:8px; flex-wrap:wrap">
          <button class="btn" type="button" data-action="play" aria-label="Play the word again">🔊 Play</button>
          <button class="btn" type="button" data-action="restart" aria-label="Restart the test">Restart</button>
        </div>
      </div>

      <div class="note" style="margin-top:12px" aria-live="polite">
        <strong>${icon} ${ok ? "Nice!" : "Almost!"}</strong>
        <p style="margin:8px 0 0">
          ${ok ? "Good job." : `The correct answer is: <strong>${safeText(correctText)}</strong>.`}
        </p>
        ${
          ok
            ? ""
            : `<p style="margin:8px 0 0; opacity:.9">You chose: <strong>${safeText(chosenText)}</strong></p>`
        }
        ${q.say ? `<p style="margin:8px 0 0; opacity:.92">Word: <strong>${safeText(q.say)}</strong></p>` : ""}
      </div>

      <div class="actions" style="margin-top:12px">
        <button class="btn btn--primary" type="button" data-action="next">${nextLabel}</button>
      </div>
    `;
  }

  function renderReview(state) {
    const rows = Array.isArray(state.review) ? state.review : [];
    if (!rows.length) {
      return `
        <div class="note" style="margin-top:12px; padding:10px 12px">
          <strong>Review</strong>
          <p style="margin:6px 0 0">No answers recorded.</p>
        </div>
      `;
    }

    const body = rows
      .map((r) => {
        const icon = r.isCorrect ? "✅" : "❌";
        return `
          <tr>
            <td style="padding:10px 10px; border-top:1px solid var(--border); font-weight:800; white-space:nowrap">${safeText(
              r.number
            )}</td>
            <td style="padding:10px 10px; border-top:1px solid var(--border); font-weight:800">${safeText(
              r.word || ""
            )}</td>
            <td style="padding:10px 10px; border-top:1px solid var(--border); font-size:18px">${safeText(
              r.chosenText || ""
            )}</td>
            <td style="padding:10px 10px; border-top:1px solid var(--border); font-size:18px">${safeText(
              r.correctText || ""
            )}</td>
            <td style="padding:10px 10px; border-top:1px solid var(--border); font-weight:900; white-space:nowrap">${icon}</td>
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
                <th scope="col" style="text-align:left; padding:10px 10px; border-top:1px solid var(--border); color: var(--muted)">Word</th>
                <th scope="col" style="text-align:left; padding:10px 10px; border-top:1px solid var(--border); color: var(--muted)">Chosen</th>
                <th scope="col" style="text-align:left; padding:10px 10px; border-top:1px solid var(--border); color: var(--muted)">Correct</th>
                <th scope="col" style="text-align:left; padding:10px 10px; border-top:1px solid var(--border); color: var(--muted)">Result</th>
              </tr>
            </thead>
            <tbody>
              ${body}
            </tbody>
          </table>
        </div>
      </details>
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
        <p style="margin:8px 0 0">Tip: Repeat the test. Toddlers learn through repetition.</p>
      </div>

      ${renderReview(state)}

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
        lastError: "",
        revealWord: false,
        autoSpokenIndex: -1,
        review: [] // per-question report rows
      };

      function currentQuestion() {
        return state.questions && state.questions.length ? state.questions[state.index] : null;
      }

      function speakCurrent() {
        const q = currentQuestion();
        if (!q) return false;
        return speak(q.say || "");
      }

      function resetRunState() {
        state.questions = [];
        state.index = 0;
        state.correctCount = 0;
        state.lastChoice = null;
        state.lastError = "";
        state.revealWord = false;
        state.autoSpokenIndex = -1;
        state.review = [];
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
        state.revealWord = false;
        state.autoSpokenIndex = -1;
        state.review = [];
        paint();

        try {
          await ensureBankLoaded(ctx);
          const bank =
            window.UEAH_TEST_BANKS && Array.isArray(window.UEAH_TEST_BANKS[SLUG])
              ? window.UEAH_TEST_BANKS[SLUG]
              : [];

          if (!bank.length) {
            throw new Error("Missing question bank.");
          }

          const prepared = bank.map(cloneQuestionWithShuffledOptions);
          shuffleInPlace(prepared);

          state.questions = prepared;
          state.index = 0;
          state.correctCount = 0;
          state.lastChoice = null;
          state.revealWord = false;
          state.autoSpokenIndex = -1;
          state.review = [];
          state.status = "question";
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
        resetRunState();
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
        state.revealWord = false;
        state.status = "question";
        paint();
      }

      function recordReviewRow(q, chosenIdx) {
        const correctIdx = Number(q && q.answer);
        const chosen = Number(chosenIdx);
        const isCorrect = Number.isFinite(chosen) && chosen === correctIdx;

        state.review.push({
          number: state.index + 1,
          word: q && q.say ? String(q.say) : "",
          chosenText: optionAt(q, chosen) || "(none)",
          correctText: optionAt(q, correctIdx) || "(not set)",
          isCorrect
        });
      }

      function choose(choiceIndex) {
        // Prevent double-answering (e.g., double-click).
        if (state.status !== "question") return;

        stopSpeech();
        const q = currentQuestion();
        if (!q) return;

        const chosen = Number(choiceIndex);
        if (!Number.isFinite(chosen)) return;

        state.lastChoice = chosen;

        recordReviewRow(q, chosen);

        if (chosen === Number(q.answer)) state.correctCount += 1;

        state.status = "feedback";
        paint();
      }

      function toggleWord() {
        state.revealWord = !state.revealWord;
        paint();
      }

      // Event delegation (stage content gets re-rendered)
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
        } else if (action === "toggleWord") {
          ev.preventDefault();
          toggleWord();
        }
      });

      host.addEventListener("submit", (ev) => {
        const form = ev.target;
        if (!form || form.getAttribute("data-form") !== "question") return;

        ev.preventDefault();
        const submitter = ev.submitter || document.activeElement;
        const raw = submitter && submitter.value != null ? submitter.value : null;
        choose(raw);
      });

      // Cancel speech when leaving the page (best effort)
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
