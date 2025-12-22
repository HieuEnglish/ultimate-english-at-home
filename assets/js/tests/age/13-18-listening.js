/* assets/js/tests/age/13-18-listening.js
   Runner: Ages 13–18 • Listening (IELTS-inspired)

   - 4 parts (P1–P4), similar to IELTS listening but easier.
   - Uses browser Speech Synthesis (TTS) to read the Part audio ("say") so no external audio files are required.
   - One-question-at-a-time UI, timer, auto-grading, and a simple review.

   Bank: assets/data/tests-13-18-listening.js
   Global key: window.UEAH_TEST_BANKS["age-13-18-listening"]
*/

(function () {
  "use strict";

  const SLUG = "age-13-18-listening";
  const BANK_SRC = "assets/data/tests-13-18-listening.js";

  // Easier than IELTS but similar structure.
  const TIME_LIMIT_SEC = 30 * 60;
  const MAX_PER_PART = 5;

  const store = window.UEAH_TESTS_STORE;
  if (!store || typeof store.registerRunner !== "function") return;

  // -----------------------------
  // Helpers
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

  function safeText(v) {
    return String(v == null ? "" : v)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }

  function normalizeAnswerText(v) {
    // Trim, lowercase, strip punctuation, and remove spaces.
    // (Works well for numbers like "2:30" vs "2 30".)
    return String(v == null ? "" : v)
      .trim()
      .toLowerCase()
      .replace(/[.,!?;:"'()\[\]{}<>/\\-]/g, "")
      .replace(/\s+/g, "");
  }

  function cloneQuestionWithShuffledOptions(q) {
    if (!q || typeof q !== "object" || Array.isArray(q)) return q;
    const t = String(q.type || "").toLowerCase();
    if (t !== "listenchoice") return { ...q };
    if (!Array.isArray(q.options) || typeof q.answer !== "number") return { ...q };

    const pairs = q.options.map((text, idx) => ({ text, idx }));
    shuffleInPlace(pairs);
    const newOptions = pairs.map((p) => p.text);
    const newAnswer = pairs.findIndex((p) => p.idx === q.answer);
    return { ...q, options: newOptions, answer: newAnswer };
  }

  function formatTime(sec) {
    const s = Math.max(0, Math.floor(sec));
    const m = Math.floor(s / 60);
    const r = s % 60;
    return `${String(m).padStart(2, "0")}:${String(r).padStart(2, "0")}`;
  }

  function partLabel(partId) {
    const id = String(partId || "").toLowerCase();
    if (id === "p1") return "Part 1";
    if (id === "p2") return "Part 2";
    if (id === "p3") return "Part 3";
    if (id === "p4") return "Part 4";
    return "Part";
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

      // Prime voices list (some browsers populate async)
      try {
        if (typeof synth.getVoices === "function") synth.getVoices();
      } catch (_) {}

      const u = new SpeechSynthesisUtterance(t);
      u.lang = "en-US";
      u.rate = 0.97;
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
        <strong>Ages 13–18 Listening</strong>
        <p style="margin:8px 0 0">IELTS-inspired listening practice with 4 parts (conversation → lecture). This is easier than IELTS, but uses common question styles.</p>
        <p style="margin:8px 0 0; opacity:.92">Recommended time: 30 minutes. Use <strong>🔊 Play</strong> to hear the audio (TTS). You can replay for practice.</p>
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
          <div style="font-weight:800; color: var(--muted)">${partLabel(q.partId)} • Question ${n} of ${total}</div>
          <div class="chip" aria-label="Time remaining" style="font-weight:900">${formatTime(
            state.timeRemaining
          )}</div>
        </div>
        <div style="display:flex; gap:8px; flex-wrap:wrap">
          <button class="btn" type="button" data-action="play" aria-label="Play the audio">🔊 Play</button>
          <button class="btn" type="button" data-action="toggleTranscript" aria-pressed="${
            state.showTranscript ? "true" : "false"
          }">
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
        <p style="margin:6px 0 0">Your browser does not support Speech Synthesis. Use <strong>Show transcript</strong> instead.</p>
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

  function renderTranscript(state) {
    const q = state.questions[state.index];
    if (!state.showTranscript) return "";
    const t = q && q.say ? String(q.say) : "";
    if (!t.trim()) return "";
    return `
      <div class="note" style="margin:12px 0 0; padding:12px 14px">
        <strong>Transcript</strong>
        <p style="margin:8px 0 0">${safeText(t)}</p>
      </div>
    `;
  }

  function renderChoiceForm(q) {
    const prompt = safeText(q.question || "Question");
    const options = Array.isArray(q.options) ? q.options : [];

    const optionsHtml = options
      .map((opt, i) => {
        const id = `opt-${SLUG}-${q.id}-${i}`;
        return `
          <label for="${id}" style="display:flex; align-items:center; gap:10px; padding:12px; border:1px solid var(--border); border-radius:14px; background: var(--surface2); cursor:pointer">
            <input id="${id}" type="radio" name="choice" value="${i}" required style="margin:0" />
            <span>${safeText(opt)}</span>
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

  function renderBlankForm(q) {
    const prompt = safeText(q.question || "Complete the answer");
    return `
      <form data-form="question" style="margin-top:12px">
        <fieldset style="border:1px solid var(--border); border-radius:16px; padding:14px; background: var(--surface2)">
          <legend style="padding:0 8px; font-weight:900">${prompt}</legend>
          <label style="display:block; margin-top:12px; font-weight:700">Your answer</label>
          <input type="text" name="blank" required autocomplete="off" style="width:100%; margin-top:8px" placeholder="Type your answer" />
          <div class="actions" style="margin-top:12px">
            <button class="btn btn--primary" type="submit">Submit</button>
          </div>
        </fieldset>
      </form>
    `;
  }

  function renderQuestionScreen(state) {
    const q = state.questions[state.index];
    if (!q) return renderError("Missing question");

    const t = String(q.type || "").toLowerCase();
    const formHtml = t === "listenfillintheblank" ? renderBlankForm(q) : renderChoiceForm(q);

    return `
      ${renderTopBar(state)}
      ${!supportsSpeech() ? renderNoAudioHint() : ""}
      ${renderContext(q)}
      ${renderTranscript(state)}
      ${formHtml}
    `;
  }

  function renderFeedback(state) {
    const q = state.questions[state.index] || {};
    const ok = !!state.lastIsCorrect;
    const expl = q.explanation ? String(q.explanation) : "";

    let correctText = "";
    const t = String(q.type || "").toLowerCase();

    if (t === "listenfillintheblank") {
      const ans = q.answer;
      correctText = Array.isArray(ans) ? String(ans[0] || "") : String(ans || "");
    } else {
      const opts = Array.isArray(q.options) ? q.options : [];
      correctText =
        typeof q.answer === "number" && opts[q.answer] != null ? String(opts[q.answer]) : "";
    }

    return `
      ${renderTopBar(state)}
      <div class="note" style="margin-top:12px">
        <strong>${ok ? "Correct" : "Not quite"}</strong>
        <p style="margin:8px 0 0"><span style="font-weight:800">Correct answer:</span> ${safeText(
          correctText
        )}</p>
        ${expl ? `<p style="margin:8px 0 0; opacity:.95">${safeText(expl)}</p>` : ""}
      </div>
      <div class="actions" style="margin-top:12px">
        <button class="btn btn--primary" type="button" data-action="next">Next</button>
      </div>
    `;
  }

  function renderReview(state) {
    const rows = state.responses
      .map((r, idx) => {
        const q = r.q || {};
        const isOk = !!r.ok;
        const user = r.userText || "";
        const correct = r.correctText || "";
        return `
          <tr>
            <td style="padding:10px 8px; vertical-align:top; font-weight:800">${idx + 1}</td>
            <td style="padding:10px 8px; vertical-align:top; color:var(--muted)">${safeText(
              partLabel(q.partId)
            )}</td>
            <td style="padding:10px 8px; vertical-align:top">${safeText(q.question || "")}</td>
            <td style="padding:10px 8px; vertical-align:top">${safeText(user)}</td>
            <td style="padding:10px 8px; vertical-align:top">${safeText(correct)}</td>
            <td style="padding:10px 8px; vertical-align:top; font-weight:900">${isOk ? "✓" : "✗"}</td>
          </tr>
        `;
      })
      .join("");

    return `
      <div class="note" style="margin-top:12px; padding:12px 14px">
        <strong>Review</strong>
        <div style="overflow:auto; margin-top:10px">
          <table style="width:100%; border-collapse:collapse; min-width:720px">
            <thead>
              <tr>
                <th style="text-align:left; padding:10px 8px; border-bottom:1px solid var(--border)">#</th>
                <th style="text-align:left; padding:10px 8px; border-bottom:1px solid var(--border)">Part</th>
                <th style="text-align:left; padding:10px 8px; border-bottom:1px solid var(--border)">Question</th>
                <th style="text-align:left; padding:10px 8px; border-bottom:1px solid var(--border)">Your answer</th>
                <th style="text-align:left; padding:10px 8px; border-bottom:1px solid var(--border)">Correct</th>
                <th style="text-align:left; padding:10px 8px; border-bottom:1px solid var(--border)">✓/✗</th>
              </tr>
            </thead>
            <tbody>
              ${rows}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  function renderSummary(state) {
    const total = state.questions.length;
    const score = state.correctCount;
    const pct = total ? Math.round((score / total) * 100) : 0;

    return `
      <div class="note" style="margin-top:0">
        <strong>Finished</strong>
        <p style="margin:8px 0 0">Score: <span style="font-weight:900">${score}</span> / ${total} (${pct}%)</p>
        <p style="margin:8px 0 0; opacity:.92">Time remaining: ${formatTime(state.timeRemaining)}</p>
      </div>
      ${state.responses.length ? renderReview(state) : ""}
      <div class="actions" style="margin-top:12px">
        <button class="btn btn--primary" type="button" data-action="restart">Restart</button>
      </div>
    `;
  }

  // -----------------------------
  // Runner wiring
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
        correctCount: 0,
        timeRemaining: TIME_LIMIT_SEC,
        timerId: null,
        lastIsCorrect: false,
        lastError: "",
        showTranscript: false,
        responses: []
      };

      function stopTimer() {
        if (state.timerId) {
          clearInterval(state.timerId);
          state.timerId = null;
        }
      }

      function startTimer() {
        stopTimer();
        state.timerId = setInterval(() => {
          if (state.status !== "question" && state.status !== "feedback") return;
          state.timeRemaining -= 1;
          if (state.timeRemaining <= 0) {
            state.timeRemaining = 0;
            stopTimer();
            stopSpeech();
            state.status = "summary";
            paint();
          } else {
            const chip = host.querySelector('[aria-label="Time remaining"]');
            if (chip) chip.textContent = formatTime(state.timeRemaining);
          }
        }, 1000);
      }

      function paint() {
        if (state.status === "intro") stage.innerHTML = renderIntro();
        else if (state.status === "loading") stage.innerHTML = renderLoading();
        else if (state.status === "question") stage.innerHTML = renderQuestionScreen(state);
        else if (state.status === "feedback") stage.innerHTML = renderFeedback(state);
        else if (state.status === "summary") stage.innerHTML = renderSummary(state);
        else if (state.status === "error") stage.innerHTML = renderError(state.lastError);
        else stage.innerHTML = renderIntro();
      }

      function currentQuestion() {
        return state.questions[state.index] || null;
      }

      function speakCurrent() {
        const q = currentQuestion();
        if (!q) return;
        speak(q.say || "");
      }

      async function start() {
        stopTimer();
        stopSpeech();
        state.status = "loading";
        state.lastError = "";
        state.showTranscript = false;
        paint();

        try {
          await ensureBankLoaded(ctx);
          const bank =
            window.UEAH_TEST_BANKS && Array.isArray(window.UEAH_TEST_BANKS[SLUG])
              ? window.UEAH_TEST_BANKS[SLUG]
              : [];
          if (!bank.length) throw new Error("Missing question bank.");

          const prepared = bank.map(cloneQuestionWithShuffledOptions);

          const groups = { p1: [], p2: [], p3: [], p4: [] };
          prepared.forEach((q) => {
            const pid = String(q.partId || "").toLowerCase();
            if (pid === "p2") groups.p2.push(q);
            else if (pid === "p3") groups.p3.push(q);
            else if (pid === "p4") groups.p4.push(q);
            else groups.p1.push(q);
          });

          const chosen = [];
          ["p1", "p2", "p3", "p4"].forEach((pid) => {
            const arr = groups[pid] || [];
            shuffleInPlace(arr);
            chosen.push(...arr.slice(0, Math.min(MAX_PER_PART, arr.length)));
          });

          state.questions = chosen;
          state.index = 0;
          state.correctCount = 0;
          state.timeRemaining = TIME_LIMIT_SEC;
          state.lastIsCorrect = false;
          state.responses = [];

          state.status = "question";
          paint();
          startTimer();
        } catch (err) {
          stopTimer();
          stopSpeech();
          state.status = "error";
          state.lastError = err && err.message ? err.message : "Could not load the test.";
          paint();
        }
      }

      function restart() {
        stopTimer();
        stopSpeech();
        state.status = "intro";
        state.questions = [];
        state.index = 0;
        state.correctCount = 0;
        state.timeRemaining = TIME_LIMIT_SEC;
        state.lastIsCorrect = false;
        state.lastError = "";
        state.showTranscript = false;
        state.responses = [];
        paint();
      }

      function next() {
        stopSpeech();
        if (state.index + 1 >= state.questions.length) {
          stopTimer();
          state.status = "summary";
          paint();
          return;
        }
        state.index += 1;
        state.lastIsCorrect = false;
        state.showTranscript = false;
        state.status = "question";
        paint();
      }

      function grade(choiceIndex, blankText) {
        const q = currentQuestion();
        if (!q) return;

        const t = String(q.type || "").toLowerCase();
        let ok = false;
        let userText = "";
        let correctText = "";

        if (t === "listenfillintheblank") {
          userText = blankText != null ? String(blankText) : "";
          const user = normalizeAnswerText(userText);
          const ans = q.answer;

          if (Array.isArray(ans)) {
            ok = ans.some((a) => normalizeAnswerText(a) === user);
            correctText = String(ans[0] || "");
          } else {
            ok = normalizeAnswerText(ans) === user;
            correctText = String(ans || "");
          }
        } else {
          const chosen = Number(choiceIndex);
          if (!Number.isFinite(chosen)) return;
          const opts = Array.isArray(q.options) ? q.options : [];
          userText = opts[chosen] != null ? String(opts[chosen]) : String(chosen);
          ok = chosen === Number(q.answer);
          correctText =
            typeof q.answer === "number" && opts[q.answer] != null ? String(opts[q.answer]) : "";
        }

        state.lastIsCorrect = ok;
        if (ok) state.correctCount += 1;

        state.responses.push({ q, ok, userText, correctText });

        state.status = "feedback";
        paint();
      }

      // Initial render
      paint();

      host.addEventListener("click", (ev) => {
        const btn = ev.target && ev.target.closest ? ev.target.closest("button") : null;
        if (!btn) return;
        const action = btn.getAttribute("data-action");

        if (action === "start" || action === "retry") {
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
        } else if (action === "toggleTranscript") {
          ev.preventDefault();
          state.showTranscript = !state.showTranscript;
          paint();
        }
      });

      host.addEventListener("submit", (ev) => {
        const form = ev.target;
        if (!form || !form.matches || !form.matches('[data-form="question"]')) return;
        ev.preventDefault();

        const q = currentQuestion();
        if (!q) return;
        const t = String(q.type || "").toLowerCase();

        if (t === "listenfillintheblank") {
          const input = form.querySelector('input[name="blank"]');
          grade(null, input ? input.value : "");
          return;
        }

        const checked = form.querySelector('input[name="choice"]:checked');
        if (!checked) return;
        grade(Number(checked.value), null);
      });
    }
  });
})();
