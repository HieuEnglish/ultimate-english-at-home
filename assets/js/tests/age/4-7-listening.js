/* assets/js/tests/age/4-7-listening.js
   Runner: Ages 4–7 • Listening

   Loads the question bank (assets/data/tests-4-7-listening.js) and runs a
   simple, accessible, one-question-at-a-time listening quiz.

   Audio approach (no assets needed):
   - Uses the browser's Speech Synthesis (TTS) to say the target word/sentence.
   - Includes a "🔊 Play" button and a "Show words" fallback.

   Supported question types:
   - listenChoice
   - listenTrueFalse

   Update:
   - Adds a final summary report (per-question review).
*/

(function () {
  "use strict";

  const SLUG = "age-4-7-listening";
  const BANK_SRC = "assets/data/tests-4-7-listening.js";

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

  function cloneQuestionWithShuffledOptions(q) {
    if (!isPlainObject(q)) return q;

    // Only shuffle options for listenChoice questions (keeps True/False stable).
    if (String(q.type || "").toLowerCase() !== "listenchoice") return { ...q };

    if (!Array.isArray(q.options)) return { ...q };
    if (typeof q.answer !== "number") return { ...q };

    const pairs = q.options.map((text, idx) => ({ text, idx }));
    shuffleInPlace(pairs);
    const newOptions = pairs.map((p) => p.text);
    const newAnswer = pairs.findIndex((p) => p.idx === q.answer);

    return { ...q, options: newOptions, answer: newAnswer };
  }

  function questionTypeLabel(q) {
    const t = String(q && q.type ? q.type : "").toLowerCase();
    return t === "listentruefalse" ? "True / False" : "Choose";
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
  // UI renderers
  // -----------------------------

  function renderIntro() {
    return `
      <div class="note" style="margin-top:0">
        <strong>Ages 4–7 Listening</strong>
        <p style="margin:8px 0 0">Press <strong>🔊 Play</strong>, then choose the best answer.</p>
        <p style="margin:8px 0 0; opacity:.92">Tip: Use <strong>Show words</strong> if the child needs help.</p>
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
          <button class="btn" type="button" data-action="toggleWords" aria-pressed="${state.showWords ? "true" : "false"}">
            ${state.showWords ? "Hide words" : "Show words"}
          </button>
          <button class="btn" type="button" data-action="restart" aria-label="Restart the test">Restart</button>
        </div>
      </div>
    `;
  }

  function renderWordsReveal(state) {
    if (!state.showWords) return "";
    const q = state.questions[state.index];
    const words = q && q.say ? String(q.say) : "";
    if (!words.trim()) return "";

    return `
      <div class="note" style="margin:12px 0 0; padding:10px 12px">
        <strong>Words:</strong>
        <span style="font-size:18px; font-weight:900"> ${safeText(words)}</span>
      </div>
    `;
  }

  function renderNoAudioHint() {
    return `
      <div class="note" style="margin:12px 0 0; padding:10px 12px">
        <strong>Audio not available</strong>
        <p style="margin:6px 0 0">Use <strong>Show words</strong> and read it out loud.</p>
      </div>
    `;
  }

  function renderOptionButtons(options) {
    const opts = Array.isArray(options) ? options : [];
    return opts
      .map((opt, i) => {
        const isEmojiish = /[\u{1F300}-\u{1FAFF}]/u.test(String(opt));
        const big = isEmojiish ? "font-size:30px" : "font-size:18px; line-height:1.25";
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
  }

  function renderListenChoice(state, q) {
    const prompt = safeText(q.question || "Listen. Choose the best answer.");
    const options = Array.isArray(q.options) ? q.options : [];

    return `
      ${renderTopBar(state)}

      <form data-form="question" style="margin-top:12px">
        <fieldset style="border:1px solid var(--border); border-radius:16px; padding:14px; background: var(--surface2)">
          <legend style="padding:0 8px; font-weight:900">${prompt}</legend>

          <div
            role="group"
            aria-label="Answer choices"
            style="display:grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap:10px; margin-top:12px"
          >
            ${renderOptionButtons(options)}
          </div>
        </fieldset>
      </form>

      ${supportsSpeech() ? "" : renderNoAudioHint()}
      ${renderWordsReveal(state)}
    `;
  }

  function renderListenTrueFalse(state, q) {
    const prompt = safeText(q.question || "Look. Listen. True or False?");
    const picture = q && q.picture ? String(q.picture) : "";
    const options = Array.isArray(q.options) ? q.options : ["True", "False"];

    return `
      ${renderTopBar(state)}

      <div class="note" style="margin:12px 0 0; padding:12px 14px">
        <strong>Look</strong>
        <div style="font-size:52px; line-height:1.1; margin-top:10px" aria-label="Picture">${safeText(
          picture
        )}</div>
      </div>

      <form data-form="question" style="margin-top:12px">
        <fieldset style="border:1px solid var(--border); border-radius:16px; padding:14px; background: var(--surface2)">
          <legend style="padding:0 8px; font-weight:900">${prompt}</legend>

          <div
            role="group"
            aria-label="True or False"
            style="display:grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap:10px; margin-top:12px"
          >
            ${renderOptionButtons(options)}
          </div>
        </fieldset>
      </form>

      ${supportsSpeech() ? "" : renderNoAudioHint()}
      ${renderWordsReveal(state)}
    `;
  }

  function renderQuestionScreen(state) {
    const q = state.questions[state.index];
    const t = String(q && q.type ? q.type : "").toLowerCase();

    if (t === "listentruefalse") return renderListenTrueFalse(state, q);
    return renderListenChoice(state, q);
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

    const extra = q.picture
      ? `<p style="margin:8px 0 0">Picture: <span style="font-size:22px">${safeText(q.picture)}</span></p>`
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
        <strong>${icon} ${ok ? "Nice!" : "Try again!"}</strong>
        <p style="margin:8px 0 0">
          ${ok ? "Good listening." : `The correct answer is: <strong>${safeText(correctText)}</strong>.`}
        </p>
        ${
          ok
            ? ""
            : `<p style="margin:8px 0 0; opacity:.9">You chose: <strong>${safeText(chosenText)}</strong></p>`
        }
        ${q.say ? `<p style="margin:8px 0 0; opacity:.92">Words: <strong>${safeText(q.say)}</strong></p>` : ""}
        ${extra}
        ${q.explanation ? `<p style="margin:8px 0 0; opacity:.9">${safeText(q.explanation)}</p>` : ""}
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
        const picture = r.picture ? `<div style="font-size:20px; margin-top:4px">${safeText(r.picture)}</div>` : "";
        const said = r.say ? `<div style="opacity:.9; margin-top:4px">${safeText(r.say)}</div>` : "";
        return `
          <tr>
            <td style="padding:10px 10px; border-top:1px solid var(--border); font-weight:800; white-space:nowrap">${safeText(
              r.number
            )}</td>
            <td style="padding:10px 10px; border-top:1px solid var(--border)">
              <div style="font-weight:900">${safeText(r.typeLabel)}</div>
              ${picture}
              ${said}
            </td>
            <td style="padding:10px 10px; border-top:1px solid var(--border); font-weight:800">${safeText(
              r.chosenText || ""
            )}</td>
            <td style="padding:10px 10px; border-top:1px solid var(--border); font-weight:800">${safeText(
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
                <th scope="col" style="text-align:left; padding:10px 10px; border-top:1px solid var(--border); color: var(--muted)">Prompt</th>
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
        <p style="margin:8px 0 0">Tip: Repeat the test and listen carefully for key words.</p>
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
        showWords: false,
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
        state.showWords = false;
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
        state.showWords = false;
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
          state.showWords = false;
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
        state.status = "question";
        paint();
      }

      function recordReviewRow(q, chosenIdx) {
        const correctIdx = Number(q && q.answer);
        const chosen = Number(chosenIdx);
        const isCorrect = Number.isFinite(chosen) && chosen === correctIdx;

        state.review.push({
          number: state.index + 1,
          typeLabel: questionTypeLabel(q),
          say: q && q.say ? String(q.say) : "",
          picture: q && q.picture ? String(q.picture) : "",
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

      function toggleWords() {
        state.showWords = !state.showWords;
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
        } else if (action === "toggleWords") {
          ev.preventDefault();
          toggleWords();
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
