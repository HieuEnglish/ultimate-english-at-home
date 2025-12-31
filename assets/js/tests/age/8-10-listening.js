/* assets/js/tests/age/8-10-listening.js
   Runner: Ages 8–10 • Listening

   Loads the question bank (assets/data/tests-8-10-listening.js) and runs a
   simple, accessible, one-question-at-a-time listening quiz.

   Audio approach (no assets needed):
   - Uses the browser's Speech Synthesis (TTS) to read "say".
   - Includes "🔊 Play" and "⏹ Stop" buttons and a "Show transcript" fallback.

   Supported question types:
   - listenChoice
   - listenTrueFalse
   - listenFillInTheBlank

   Randomization:
   - Shuffles question order on start
   - Shuffles options within listenChoice questions

   Updates:
   - Ensures stable ids (fallback id if missing)
   - Robust bank loader (handles existing script + validates after load tick)
   - Adds Stop button for TTS
   - Adds Retry on error
   - Stops TTS on navigation (popstate) and when changing screens
   - Prevents double-submit grading
   - Adds a final summary report (per-question review)
   - Optional "Save score to Profile" via window.UEAH_SAVE_SCORE.save (if available)
*/

(function () {
  "use strict";

  const SLUG = "age-8-10-listening";
  const BANK_SRC = "assets/data/tests-8-10-listening.js";
  const MAX_QUESTIONS = 16;

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

  function normalizeAnswerText(v) {
    // Trim, collapse spaces, lowercase, strip trailing punctuation.
    return String(v == null ? "" : v)
      .trim()
      .toLowerCase()
      .replace(/[\s\u00A0]+/g, " ")
      .replace(/[\.\!\?\,\;\:\)\]\}\"\']+$/g, "")
      .trim();
  }

  function ensureIds(qs) {
    return qs.map((q, idx) => {
      if (!isPlainObject(q)) return q;
      const id = q.id != null && String(q.id).trim() ? String(q.id).trim() : `${SLUG}::idx-${idx}`;
      return { ...q, id };
    });
  }

  function optionAt(q, idx) {
    if (!q || !Array.isArray(q.options)) return "";
    const n = Number(idx);
    if (!Number.isFinite(n)) return "";
    return q.options[n] == null ? "" : String(q.options[n]);
  }

  function answerTextForBlank(ans) {
    if (Array.isArray(ans)) return ans.map((a) => String(a)).join(" / ");
    return ans == null ? "" : String(ans);
  }

  function typeLower(q) {
    return String(q && q.type ? q.type : "").toLowerCase();
  }

  function questionTypeLabel(q) {
    const t = typeLower(q);
    if (t === "listenfillintheblank") return "Fill in the blank";
    if (t === "listentruefalse") return "True / False";
    return "Multiple choice";
  }

  function coerceTrueFalseOptions(q) {
    // Bank may omit options for TF; normalize to ["True","False"]
    if (!isPlainObject(q)) return q;
    const t = typeLower(q);
    if (t !== "listentruefalse") return q;

    const opts = Array.isArray(q.options) && q.options.length ? q.options : ["True", "False"];

    // Normalize answer to index (0 True, 1 False) if it's boolean/string
    let ans = q.answer;
    if (typeof ans === "boolean") ans = ans ? 0 : 1;
    else if (typeof ans === "string") {
      const s = ans.trim().toLowerCase();
      if (s === "true") ans = 0;
      else if (s === "false") ans = 1;
    }
    // If already number, keep.

    return { ...q, options: opts, answer: ans };
  }

  function cloneQuestionWithShuffledOptions(q) {
    if (!isPlainObject(q)) return q;

    const t = typeLower(q);
    const base = coerceTrueFalseOptions({ ...q });

    if (t !== "listenchoice") return base;

    if (!Array.isArray(base.options)) return base;
    if (typeof base.answer !== "number") return base;

    const pairs = base.options.map((text, idx) => ({ text, idx }));
    shuffleInPlace(pairs);

    const newOptions = pairs.map((p) => p.text);
    const newAnswer = pairs.findIndex((p) => p.idx === base.answer);

    return { ...base, options: newOptions, answer: newAnswer };
  }

  function computeDifficultyBreakdown(questions, reviewRows) {
    // Optional: if q.difficulty exists, aggregate correctness counts.
    const out = Object.create(null);
    const qs = Array.isArray(questions) ? questions : [];
    const rows = Array.isArray(reviewRows) ? reviewRows : [];

    qs.forEach((q, i) => {
      const d = String(q && q.difficulty ? q.difficulty : "")
        .trim()
        .toLowerCase();
      if (!d) return;

      if (!out[d]) out[d] = { correct: 0, total: 0 };
      out[d].total += 1;

      const r = rows[i];
      if (r && r.isCorrect) out[d].correct += 1;
    });

    return out;
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
      s.async = true;
      s.src = src;
      s.setAttribute("data-ueah-test-bank", SLUG);
      s.onload = () => resolve(true);
      s.onerror = () => reject(new Error(`Failed to load: ${src}`));
      document.head.appendChild(s);
    });

    return bankPromise;
  }

  // -----------------------------
  // Speech (TTS) — via shared helper UEAH_TTS
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

    const tts = window.UEAH_TTS;
    if (!tts || typeof tts.speak !== "function") return false;

    try {
      // Chunk longer prompts for reliability (sentences / longer transcripts).
      tts.speak(t, { lang: "en-US", chunk: t.length > 80 });
      return true;
    } catch (_) {
      return false;
    }
  }

  // -----------------------------
  // UI renderers
  // -----------------------------

  function renderIntro() {
    const audioOk = supportsSpeech();
    return `
      <div class="note" style="margin-top:0">
        <strong>Ages 8–10 Listening</strong>
        <p style="margin:8px 0 0">Listen and answer questions about details, numbers, and meaning.</p>
        <p style="margin:8px 0 0; opacity:.92">
          ${
            audioOk
              ? 'Tip: Press <strong>🔊 Play</strong> to repeat. Use <strong>Show transcript</strong> if needed.'
              : 'Audio is not available in this browser. Use <strong>Show transcript</strong> and read it out loud.'
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

    const q = state.questions[state.index];
    const sayText = q && q.say ? String(q.say).trim() : "";
    const canPlay = supportsSpeech() && !!sayText;

    return `
      <div style="display:flex; align-items:center; justify-content:space-between; gap:10px; flex-wrap:wrap">
        <div style="font-weight:800; color: var(--muted)">Question ${n} of ${total}</div>
        <div style="display:flex; gap:8px; flex-wrap:wrap">
          <button class="btn" type="button" data-action="play" ${canPlay ? "" : "disabled"} aria-label="Play the audio">🔊 Play</button>
          <button class="btn" type="button" data-action="stop" ${supportsSpeech() ? "" : "disabled"} aria-label="Stop audio">⏹ Stop</button>
          <button class="btn" type="button" data-action="toggleTranscript" aria-pressed="${state.showTranscript ? "true" : "false"}">
            ${state.showTranscript ? "Hide transcript" : "Show transcript"}
          </button>
          <button class="btn" type="button" data-action="restart" aria-label="Restart the test">Restart</button>
        </div>
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

  function renderListenChoice(state, q) {
    const prompt = safeText(q.question || "Listen. Choose the best answer.");
    const options = Array.isArray(q.options) ? q.options : [];

    const optionButtons = options
      .map((opt, i) => {
        return `
          <button
            class="btn"
            type="submit"
            name="choice"
            value="${i}"
            data-choice="${i}"
            style="justify-content:center; padding:14px 14px; min-height:54px"
            aria-label="Option ${i + 1}: ${safeText(opt)}"
          >${safeText(opt)}</button>
        `;
      })
      .join("");

    return `
      ${renderTopBar(state)}

      <form data-form="question" style="margin-top:12px">
        <fieldset style="border:1px solid var(--border); border-radius:16px; padding:14px; background: var(--surface2)">
          <legend style="padding:0 8px; font-weight:900">${prompt}</legend>

          <div
            role="group"
            aria-label="Answer choices"
            style="display:grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap:10px; margin-top:12px"
          >
            ${optionButtons}
          </div>
        </fieldset>
      </form>

      ${renderTranscript(state)}
    `;
  }

  function renderListenTrueFalse(state, q) {
    const prompt = safeText(q.question || "Listen. True or False?");
    const picture = q && q.picture ? String(q.picture) : "";
    const options = Array.isArray(q.options) && q.options.length ? q.options : ["True", "False"];

    const optionButtons = options
      .map((opt, i) => {
        return `
          <button
            class="btn"
            type="submit"
            name="choice"
            value="${i}"
            data-choice="${i}"
            style="justify-content:center; padding:14px 14px; min-height:54px"
            aria-label="Option ${i + 1}: ${safeText(opt)}"
          >${safeText(opt)}</button>
        `;
      })
      .join("");

    return `
      ${renderTopBar(state)}

      ${
        picture
          ? `
        <div class="note" style="margin:12px 0 0; padding:12px 14px">
          <strong>Look</strong>
          <div style="font-size:52px; line-height:1.1; margin-top:10px" aria-label="Picture">${safeText(
            picture
          )}</div>
        </div>
      `
          : ""
      }

      <form data-form="question" style="margin-top:12px">
        <fieldset style="border:1px solid var(--border); border-radius:16px; padding:14px; background: var(--surface2)">
          <legend style="padding:0 8px; font-weight:900">${prompt}</legend>

          <div
            role="group"
            aria-label="True or False"
            style="display:grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap:10px; margin-top:12px"
          >
            ${optionButtons}
          </div>
        </fieldset>
      </form>

      ${renderTranscript(state)}
    `;
  }

  function renderListenFillInTheBlank(state, q) {
    const prompt = safeText(q.question || "Listen and type the missing word.");

    return `
      ${renderTopBar(state)}

      <form data-form="blank" style="margin-top:12px">
        <fieldset style="border:1px solid var(--border); border-radius:16px; padding:14px; background: var(--surface2)">
          <legend style="padding:0 8px; font-weight:900">${prompt}</legend>

          <div class="field" style="margin-top:12px">
            <label class="label" for="blank-${SLUG}">Your answer</label>
            <input
              id="blank-${SLUG}"
              class="input"
              type="text"
              autocomplete="off"
              inputmode="text"
              spellcheck="false"
              data-blank
              placeholder="Type your answer"
              style="max-width:420px"
            />
          </div>

          <div class="actions" style="margin-top:12px">
            <button class="btn btn--primary" type="submit" data-action="submit-blank">Submit</button>
          </div>
        </fieldset>
      </form>

      ${renderTranscript(state)}
    `;
  }

  function renderQuestionScreen(state) {
    const q = state.questions[state.index];
    const t = typeLower(q);

    if (t === "listenfillintheblank") return renderListenFillInTheBlank(state, q);
    if (t === "listentruefalse") return renderListenTrueFalse(state, q);
    return renderListenChoice(state, q);
  }

  function renderFeedback(state) {
    const q = state.questions[state.index];
    const chosen = state.lastChoice;
    const correct = q && q.answer;
    const ok = !!state.lastCorrect;
    const total = state.questions.length;
    const n = state.index + 1;

    const nextLabel = n >= total ? "Finish" : "Next";
    const icon = ok ? "✅" : "❌";

    const t = typeLower(q);
    let correctText = "";
    let chosenText = "";

    if (t === "listenfillintheblank") {
      correctText = answerTextForBlank(correct);
      chosenText = state.lastBlank || "";
    } else {
      const cIdx = Number(correct);
      const chIdx = Number(chosen);
      correctText = optionAt(q, cIdx);
      chosenText = optionAt(q, chIdx);
    }

    const sayText = q && q.say ? String(q.say).trim() : "";
    const canPlay = supportsSpeech() && !!sayText;

    return `
      <div style="display:flex; align-items:center; justify-content:space-between; gap:10px; flex-wrap:wrap">
        <div style="font-weight:800; color: var(--muted)">Question ${n} of ${total}</div>
        <div style="display:flex; gap:8px; flex-wrap:wrap">
          <button class="btn" type="button" data-action="play" ${canPlay ? "" : "disabled"} aria-label="Play the audio again">🔊 Play</button>
          <button class="btn" type="button" data-action="stop" ${supportsSpeech() ? "" : "disabled"} aria-label="Stop audio">⏹ Stop</button>
          <button class="btn" type="button" data-action="restart" aria-label="Restart the test">Restart</button>
        </div>
      </div>

      <div class="note" style="margin-top:12px" aria-live="polite">
        <strong>${icon} ${ok ? "Correct!" : "Not quite"}</strong>
        <p style="margin:8px 0 0">
          ${ok ? "Good job." : `Correct answer: <strong>${safeText(correctText)}</strong>`}
        </p>
        ${ok ? "" : `<p style="margin:8px 0 0; opacity:.9">You answered: <strong>${safeText(chosenText)}</strong></p>`}
        ${q.say ? `<p style="margin:8px 0 0; opacity:.92">Transcript: <strong>${safeText(q.say)}</strong></p>` : ""}
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
        return `
          <tr>
            <td style="padding:10px 10px; border-top:1px solid var(--border); font-weight:800; white-space:nowrap">${safeText(
              r.number
            )}</td>
            <td style="padding:10px 10px; border-top:1px solid var(--border)">
              <div style="font-weight:900">${safeText(r.typeLabel)}</div>
              ${r.say ? `<div style="opacity:.9; margin-top:4px">${safeText(r.say)}</div>` : ""}
              ${r.question ? `<div style="opacity:.9; margin-top:4px">${safeText(r.question)}</div>` : ""}
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
                <th scope="col" style="text-align:left; padding:10px 10px; border-top:1px solid var(--border); color: var(--muted)">Your answer</th>
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

    const canSave = !!(window.UEAH_SAVE_SCORE && typeof window.UEAH_SAVE_SCORE.save === "function");

    return `
      <div class="note" style="margin-top:0">
        <strong>Finished!</strong>
        <p style="margin:8px 0 0">Score: <strong>${correct}</strong> / ${total} (${pct}%)</p>
      </div>

      ${renderReview(state)}

      <div class="actions" style="margin-top:12px; display:flex; gap:10px; flex-wrap:wrap; align-items:center">
        <button class="btn btn--primary" type="button" data-action="restart">Play again</button>
        ${
          canSave
            ? `<button class="btn" type="button" data-action="save-score" aria-label="Save score to Profile">Save score to Profile</button>`
            : ""
        }
        ${
          state.savedMsg
            ? `<span style="font-weight:800; color: var(--muted)">${safeText(state.savedMsg)}</span>`
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
        lastCorrect: false,
        lastError: "",
        showTranscript: false,
        autoSpokenIndex: -1,
        isGrading: false,
        review: [],
        savedMsg: ""
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
        state.lastBlank = "";
        state.lastCorrect = false;
        state.lastError = "";
        state.showTranscript = false;
        state.autoSpokenIndex = -1;
        state.isGrading = false;
        state.review = [];
        state.savedMsg = "";
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
        state.isGrading = false;
        state.review = [];
        state.savedMsg = "";
        paint();

        try {
          await ensureBankLoaded(ctx);

          // Validate after next tick (script may have just executed)
          await new Promise((r) => setTimeout(r, 0));

          const bank =
            window.UEAH_TEST_BANKS && Array.isArray(window.UEAH_TEST_BANKS[SLUG])
              ? window.UEAH_TEST_BANKS[SLUG]
              : [];

          if (!bank.length) {
            throw new Error("Missing question bank.");
          }

          const prepared = ensureIds(bank.map(cloneQuestionWithShuffledOptions));
          shuffleInPlace(prepared);

          const picked = prepared.slice(0, Math.min(MAX_QUESTIONS, prepared.length));

          state.questions = picked;
          state.index = 0;
          state.correctCount = 0;
          state.lastChoice = null;
          state.lastBlank = "";
          state.lastCorrect = false;
          state.showTranscript = false;
          state.autoSpokenIndex = -1;
          state.isGrading = false;
          state.review = [];
          state.savedMsg = "";
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
        state.isGrading = false;

        const total = state.questions.length;
        if (state.index + 1 >= total) {
          state.status = "summary";
          paint();
          return;
        }

        state.index += 1;
        state.lastChoice = null;
        state.lastBlank = "";
        state.lastCorrect = false;
        state.status = "question";
        paint();
      }

      function recordReviewRow(q, isCorrect, chosenText, correctText) {
        state.review.push({
          number: state.review.length + 1,
          typeLabel: questionTypeLabel(q),
          question: q && q.question ? String(q.question) : "",
          say: q && q.say ? String(q.say) : "",
          chosenText: chosenText || "",
          correctText: correctText || "",
          isCorrect: !!isCorrect
        });
      }

      function choose(choiceIndex) {
        if (state.status !== "question") return;
        if (state.isGrading) return;

        stopSpeech();

        const q = currentQuestion();
        if (!q) return;

        const chosen = Number(choiceIndex);
        if (!Number.isFinite(chosen)) return;

        state.isGrading = true;

        // Coerce correct index
        let ans = q.answer;
        if (typeof ans === "boolean") ans = ans ? 0 : 1;
        else if (typeof ans === "string") {
          const s = ans.trim().toLowerCase();
          if (s === "true") ans = 0;
          else if (s === "false") ans = 1;
        }

        const correctIdx = Number(ans);

        state.lastChoice = chosen;
        state.lastCorrect = chosen === correctIdx;

        if (state.lastCorrect) state.correctCount += 1;

        recordReviewRow(q, state.lastCorrect, optionAt(q, chosen) || "(none)", optionAt(q, correctIdx) || "(not set)");

        state.status = "feedback";
        paint();
      }

      function submitBlank(value) {
        if (state.status !== "question") return;
        if (state.isGrading) return;

        stopSpeech();

        const q = currentQuestion();
        if (!q) return;

        state.isGrading = true;

        const typedRaw = String(value == null ? "" : value);
        const typed = normalizeAnswerText(typedRaw);

        const ans = q.answer;
        let ok = false;
        if (Array.isArray(ans)) {
          ok = ans.some((a) => normalizeAnswerText(a) === typed);
        } else {
          ok = normalizeAnswerText(ans) === typed;
        }

        state.lastBlank = typedRaw;
        state.lastCorrect = ok;

        if (ok) state.correctCount += 1;

        recordReviewRow(q, ok, typedRaw || "(blank)", answerTextForBlank(ans) || "(not set)");

        state.status = "feedback";
        paint();
      }

      function toggleTranscript() {
        state.showTranscript = !state.showTranscript;
        paint();
      }

      function saveScoreToProfile() {
        if (!window.UEAH_SAVE_SCORE || typeof window.UEAH_SAVE_SCORE.save !== "function") {
          state.savedMsg = "Save unavailable.";
          paint();
          return;
        }

        const total = state.questions.length;
        const correct = state.correctCount;
        const percent = total ? (correct / total) * 100 : 0;

        const payload = {
          slug: SLUG,
          ageGroup: "8-10",
          skill: "listening",
          at: nowIso(),
          rawCorrect: correct,
          totalQuestions: total,
          percent: Math.round(percent),
          difficultyBreakdown: computeDifficultyBreakdown(state.questions, state.review),
          questions: Array.isArray(state.questions) ? state.questions : [],
          review: Array.isArray(state.review) ? state.review : []
        };

        const res = window.UEAH_SAVE_SCORE.save(payload);
        state.savedMsg = res && res.ok ? "Saved to Profile." : "Could not save.";
        paint();
      }

      // Event delegation
      host.addEventListener("click", (ev) => {
        const btn = ev.target && ev.target.closest ? ev.target.closest("button") : null;
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
        } else if (action === "next") {
          ev.preventDefault();
          next();
        } else if (action === "play") {
          ev.preventDefault();
          speakCurrent();
        } else if (action === "stop") {
          ev.preventDefault();
          stopSpeech();
        } else if (action === "toggleTranscript") {
          ev.preventDefault();
          toggleTranscript();
        } else if (action === "save-score") {
          ev.preventDefault();
          saveScoreToProfile();
        }
      });

      host.addEventListener("submit", (ev) => {
        const form = ev.target;
        if (!form) return;

        if (form.getAttribute("data-form") === "question") {
          ev.preventDefault();
          if (state.status !== "question") return;

          const submitter = ev.submitter || document.activeElement;
          const raw = submitter && submitter.value != null ? submitter.value : null;
          choose(raw);
          return;
        }

        if (form.getAttribute("data-form") === "blank") {
          ev.preventDefault();
          if (state.status !== "question") return;

          const input = form.querySelector("[data-blank]");
          const val = input && input.value != null ? input.value : "";
          submitBlank(val);
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
