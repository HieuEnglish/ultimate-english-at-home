/* assets/js/tests/iels/listening.js
   Runner: IELTS Listening (original audio scripts via TTS)

   - 4 parts (P1–P4), 40 questions total
   - Uses browser Speech Synthesis (TTS) so no external audio files required
   - One-question-at-a-time UI, timer, auto-grading, and per-question review

   Bank: assets/data/tests-iels-listening.js
   Global key: window.UEAH_TEST_BANKS["iels-listening"]
*/

(function () {
  "use strict";

  const SLUG = "iels-listening";
  const BANK_SRC = "assets/data/tests-iels-listening.js";

  // IELTS Listening timing (paper-based is ~30 min audio + 10 min transfer)
  const TIME_LIMIT_SEC = 40 * 60;

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
    // Trim, lowercase, strip common punctuation, remove spaces.
    // (Good for times like "9:15" vs "915" and "Room-6" vs "Room 6".)
    return String(v == null ? "" : v)
      .trim()
      .toLowerCase()
      .replace(/[.,!?;:"'()\[\]{}<>/\\-]/g, "")
      .replace(/\s+/g, "");
  }

  function pointsFor(q) {
    const p = Number(q && q.points);
    return Number.isFinite(p) && p > 0 ? p : 1;
  }

  function cloneQuestionWithShuffledOptions(q) {
    if (!q || typeof q !== "object" || Array.isArray(q)) return q;
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
        <strong>IELTS Listening</strong>
        <p style="margin:8px 0 0">
          4 parts • 40 questions • 40 minutes (practice). This uses original audio scripts read by your browser.
        </p>
        <p style="margin:8px 0 0; opacity:.92">
          Use <strong>🔊 Play</strong> to hear the Part audio (TTS). You can replay for practice.
        </p>
        <p style="margin:8px 0 0; opacity:.85">
          If you want stricter conditions, avoid using “Show transcript”.
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
    const q = state.questions[state.index] || {};
    const pid = String(q.partId || "").toLowerCase();

    const played = state.playedParts.has(pid);

    return `
      <div style="display:flex; align-items:center; justify-content:space-between; gap:10px; flex-wrap:wrap">
        <div style="display:flex; align-items:center; gap:10px; flex-wrap:wrap">
          <div style="font-weight:800; color: var(--muted)">${partLabel(q.partId)} • Question ${n} of ${total}</div>
          <div class="chip" aria-label="Time remaining" style="font-weight:900">${formatTime(state.timeRemaining)}</div>
        </div>
        <div style="display:flex; gap:8px; flex-wrap:wrap">
          <button class="btn" type="button" data-action="play" aria-label="Play the part audio">
            🔊 ${played ? "Replay" : "Play"}
          </button>
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
        <strong>Instructions</strong>
        <p style="margin:8px 0 0">${safeText(c)}</p>
      </div>
    `;
  }

  function renderTranscript(state) {
    if (!state.showTranscript) return "";
    const q = state.questions[state.index];
    const t = q && q.say ? String(q.say) : "";
    if (!t.trim()) return "";
    return `
      <div class="note" style="margin:12px 0 0; padding:12px 14px">
        <strong>Transcript</strong>
        <p style="margin:8px 0 0">${safeText(t)}</p>
      </div>
    `;
  }

  function renderMCQForm(q) {
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

  function renderFillBlankForm(q) {
    const prompt = safeText(q.question || "Complete the answer");
    const hint = q && q.hint ? String(q.hint) : "";

    return `
      <form data-form="question" style="margin-top:12px">
        <fieldset style="border:1px solid var(--border); border-radius:16px; padding:14px; background: var(--surface2)">
          <legend style="padding:0 8px; font-weight:900">${prompt}</legend>
          ${hint ? `<p style="margin:10px 0 0; opacity:.88">${safeText(hint)}</p>` : ""}

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

    const type = String(q.type || "multipleChoice").toLowerCase();
    const formHtml = type === "fillintheblank" ? renderFillBlankForm(q) : renderMCQForm(q);

    return `
      ${renderTopBar(state)}
      ${!supportsSpeech() ? renderNoAudioHint() : ""}
      ${renderContext(q)}
      ${renderTranscript(state)}
      ${formHtml}
    `;
  }

  function correctTextFor(q) {
    const type = String(q.type || "multipleChoice").toLowerCase();
    if (type === "fillintheblank") {
      const ans = q.answer;
      if (Array.isArray(ans)) return String(ans[0] || "");
      return String(ans || "");
    }
    const opts = Array.isArray(q.options) ? q.options : [];
    if (typeof q.answer === "number" && opts[q.answer] != null) return String(opts[q.answer]);
    return "";
  }

  function renderFeedback(state) {
    const q = state.questions[state.index] || {};
    const ok = !!state.lastIsCorrect;
    const expl = q.explanation ? String(q.explanation) : "";

    return `
      ${renderTopBar(state)}
      <div class="note" style="margin-top:12px">
        <strong>${ok ? "Correct" : "Not quite"}</strong>
        <p style="margin:8px 0 0"><span style="font-weight:800">Your answer:</span> ${safeText(
          state.lastUserText || "—"
        )}</p>
        <p style="margin:8px 0 0"><span style="font-weight:800">Correct answer:</span> ${safeText(
          state.lastCorrectText || correctTextFor(q)
        )}</p>
        ${expl ? `<p style="margin:8px 0 0; opacity:.95">${safeText(expl)}</p>` : ""}
      </div>
      <div class="actions" style="margin-top:12px">
        <button class="btn btn--primary" type="button" data-action="next">Next</button>
      </div>
    `;
  }

  function renderSummary(state) {
    const totalQs = state.questions.length;

    const totalPoints = state.totalPoints;
    const earned = state.pointsEarned;
    const pct = totalPoints ? Math.round((earned / totalPoints) * 100) : 0;

    const reviewHtml = (state.review || [])
      .map((row, idx) => {
        const n = idx + 1;
        const mark = row.isCorrect ? "✓" : "✗";
        const q = row.questionObj || {};
        return `
          <details style="border:1px solid var(--border); border-radius:14px; background: var(--surface2); padding:10px 12px">
            <summary style="cursor:pointer; font-weight:900">
              ${mark} Q${n} • ${safeText(partLabel(q.partId))}
            </summary>
            <div style="margin-top:10px">
              <div style="font-weight:800">${safeText(q.question || "")}</div>
              <div style="margin-top:8px">
                <div><span style="font-weight:800">Your answer:</span> ${safeText(row.userText || "—")}</div>
                <div style="margin-top:6px"><span style="font-weight:800">Correct answer:</span> ${safeText(row.correctText || "")}</div>
                ${q.explanation ? `<div style="margin-top:8px; opacity:.95">${safeText(String(q.explanation))}</div>` : ""}
              </div>
            </div>
          </details>
        `;
      })
      .join("");

    return `
      <div class="note" style="margin-top:0">
        <strong>Finished</strong>
        <p style="margin:8px 0 0">
          Score: <span style="font-weight:900">${earned}</span> / ${totalPoints} (${pct}%)
        </p>
        <p style="margin:8px 0 0; opacity:.92">
          Questions completed: ${state.completedCount} / ${totalQs} • Time remaining: ${formatTime(
            state.timeRemaining
          )}
        </p>
      </div>

      <div style="margin-top:12px; display:grid; gap:10px">
        <div class="note" style="margin:0; padding:12px 14px">
          <strong>Review</strong>
          <p style="margin:8px 0 0; opacity:.92">Open any question to see your answer, the correct answer, and feedback.</p>
        </div>
        <div style="display:grid; gap:10px">
          ${reviewHtml}
        </div>
      </div>

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

        timeRemaining: TIME_LIMIT_SEC,
        timerId: null,

        totalPoints: 0,
        pointsEarned: 0,
        completedCount: 0,

        lastIsCorrect: false,
        lastUserText: "",
        lastCorrectText: "",

        review: [],
        lastError: "",

        showTranscript: false,
        playedParts: new Set()
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
            return;
          }

          const chip = host.querySelector('[aria-label="Time remaining"]');
          if (chip) chip.textContent = formatTime(state.timeRemaining);
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

      function speakCurrentPart() {
        const q = currentQuestion();
        if (!q) return;
        const pid = String(q.partId || "").toLowerCase();
        const ok = speak(q.say || "");
        if (ok && pid) state.playedParts.add(pid);
      }

      function resetRunState() {
        stopTimer();
        stopSpeech();

        state.questions = [];
        state.index = 0;

        state.timeRemaining = TIME_LIMIT_SEC;

        state.totalPoints = 0;
        state.pointsEarned = 0;
        state.completedCount = 0;

        state.lastIsCorrect = false;
        state.lastUserText = "";
        state.lastCorrectText = "";

        state.review = [];
        state.lastError = "";

        state.showTranscript = false;
        state.playedParts = new Set();
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

          if (!bank.length) throw new Error("Missing question bank.");

          // Keep question order (IELTS-style), shuffle options only
          const prepared = bank.map(cloneQuestionWithShuffledOptions);

          state.questions = prepared;
          state.totalPoints = prepared.reduce((sum, q) => sum + pointsFor(q), 0);

          state.status = "question";
          paint();
          startTimer();
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
        state.lastUserText = "";
        state.lastCorrectText = "";
        state.showTranscript = false;

        state.status = "question";
        paint();
      }

      function gradeMCQ(q, choiceIndex) {
        const isCorrect = Number(choiceIndex) === Number(q.answer);
        const userText =
          Array.isArray(q.options) && q.options[choiceIndex] != null ? String(q.options[choiceIndex]) : "";
        const correctText =
          Array.isArray(q.options) && q.options[q.answer] != null ? String(q.options[q.answer]) : "";
        return { isCorrect, userText, correctText };
      }

      function gradeBlank(q, blankText) {
        const userRaw = String(blankText || "").trim();
        const userNorm = normalizeAnswerText(userRaw);

        const accepted = []
          .concat(q.answer != null ? q.answer : [])
          .concat(Array.isArray(q.acceptedAnswers) ? q.acceptedAnswers : []);

        const ok = accepted.some((a) => normalizeAnswerText(a) === userNorm);

        const correctText = accepted.length ? String(accepted[0] || "") : "";
        return { isCorrect: ok, userText: userRaw, correctText };
      }

      function grade(choiceIndex, blankText) {
        const q = currentQuestion();
        if (!q) return;

        const type = String(q.type || "multipleChoice").toLowerCase();
        const pts = pointsFor(q);

        const result = type === "fillintheblank" ? gradeBlank(q, blankText) : gradeMCQ(q, choiceIndex);

        state.lastIsCorrect = !!result.isCorrect;
        state.lastUserText = result.userText || "";
        state.lastCorrectText = result.correctText || "";

        state.completedCount += 1;
        if (result.isCorrect) state.pointsEarned += pts;

        state.review[state.index] = {
          isCorrect: !!result.isCorrect,
          userText: result.userText || "",
          correctText: result.correctText || "",
          questionObj: q
        };

        state.status = "feedback";
        paint();
      }

      // Initial render
      paint();

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
        } else if (action === "next") {
          ev.preventDefault();
          next();
        } else if (action === "play") {
          ev.preventDefault();
          speakCurrentPart();
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

        const type = String(q.type || "multipleChoice").toLowerCase();

        if (type === "fillintheblank") {
          const input = form.querySelector('input[name="blank"]');
          grade(null, input ? input.value : "");
          return;
        }

        const checked = form.querySelector('input[name="choice"]:checked');
        if (!checked) return;
        grade(Number(checked.value), "");
      });
    }
  });
})();
