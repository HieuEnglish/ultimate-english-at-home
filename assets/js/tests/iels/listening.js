/* assets/js/tests/iels/listening.js
   Runner: IELTS Listening (original audio scripts via TTS)

   - 4 parts (P1–P4), per-run cap (40 questions by default; bank is a pool)
   - Uses browser Speech Synthesis (TTS) so no external audio files required
   - One-question-at-a-time UI, timer, auto-grading, and per-question review

   Bank: assets/data/tests-iels-listening.js
   Global key: window.UEAH_TEST_BANKS["iels-listening"]

   Updates (this file):
   - Per-run cap: pick a short subset from the bank pool (default 40)
   - IELTS requirement: totals computed from picked, not full prepared bank
   - Restart behavior unchanged: start() rebuilds questions each run; slicing after random pick keeps runs randomized
   - Bank loader resilient when script already exists/has executed
   - Ensures stable ids if missing
   - Proper True/False support (auto options + boolean/string answers)
   - Safe option shuffling only when answer is numeric index (prevents TF mismatch)
   - Part-level transcript/audio uses a stable "say" per question; replay enabled
   - Stops speech + timer on navigation changes (best effort)
   - More robust review + correct answer display for all types
   - Adds "Save score to Profile" button on results screen (IELTS Practice group)
*/

(function () {
  "use strict";

  const SLUG = "iels-listening";
  const BANK_SRC = "assets/data/tests-iels-listening.js";

  // Per-run cap (bank is a pool)
  const MAX_QUESTIONS_PER_RUN = 40; // IELTS Listening is 40 questions
  const TARGET_PER_PART = 10; // best-effort, when bank has enough per part

  // IELTS Listening timing (paper-based is ~30 min audio + 10 min transfer)
  const TIME_LIMIT_SEC = 40 * 60;

  const store = window.UEAH_TESTS_STORE;
  if (!store || typeof store.registerRunner !== "function") return;

  // -----------------------------
  // Helpers
  // -----------------------------

  function nowIso() {
    return new Date().toISOString();
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

  function safeText(v) {
    return String(v == null ? "" : v)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }

  function normalizeAnswerText(v) {
    // Trim, lowercase, strip punctuation, remove spaces.
    // (Good for "9:15" vs "915" and "Room-6" vs "Room 6".)
    return String(v == null ? "" : v)
      .trim()
      .toLowerCase()
      .replace(/[.,!?;:"'()\[\]{}<>/\\-]/g, "")
      .replace(/\s+/g, "");
  }

  function normalizeType(t) {
    return String(t || "multipleChoice").trim().toLowerCase();
  }

  function pointsFor(q) {
    const p = Number(q && q.points);
    return Number.isFinite(p) && p > 0 ? p : 1;
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

  function partOrderValue(partId) {
    const id = String(partId || "").toLowerCase();
    if (id === "p1") return 1;
    if (id === "p2") return 2;
    if (id === "p3") return 3;
    if (id === "p4") return 4;
    return 99;
  }

  function deriveTrueFalseIndex(answer) {
    if (typeof answer === "number" && Number.isFinite(answer)) return answer; // 0/1
    if (typeof answer === "boolean") return answer ? 0 : 1;
    const s = normalizeAnswerText(answer);
    if (!s) return null;
    if (s === "true" || s === "t" || s === "yes" || s === "y") return 0;
    if (s === "false" || s === "f" || s === "no" || s === "n") return 1;
    return null;
  }

  function getOptionsForQuestion(q) {
    const t = normalizeType(q && q.type);
    if (Array.isArray(q && q.options) && q.options.length) return q.options;
    if (t === "truefalse") return ["True", "False"];
    return [];
  }

  function optionAt(q, idx) {
    const opts = getOptionsForQuestion(q);
    const n = Number(idx);
    if (!Number.isFinite(n)) return "";
    return opts[n] == null ? "" : String(opts[n]);
  }

  function ensureIds(list) {
    return (Array.isArray(list) ? list : []).map((q, idx) => {
      if (!isPlainObject(q)) return q;
      if (q.id != null && String(q.id).trim()) return q;
      const pid = String(q.partId || "p1").toLowerCase();
      const t = normalizeType(q.type);
      const stem = String(q.question || "")
        .trim()
        .slice(0, 28)
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
      return { ...q, id: `${SLUG}::${pid}::${t}::${idx}::${stem || "q"}` };
    });
  }

  function cloneQuestionWithShuffledOptions(q) {
    if (!isPlainObject(q)) return q;

    // Only shuffle when:
    // - options exist
    // - answer is a numeric index (so we can remap safely)
    if (!Array.isArray(q.options) || !q.options.length) return { ...q };
    if (typeof q.answer !== "number") return { ...q };

    const pairs = q.options.map((text, idx) => ({ text, idx }));
    shuffleInPlace(pairs);

    const newOptions = pairs.map((p) => p.text);
    const newAnswer = pairs.findIndex((p) => p.idx === q.answer);

    return { ...q, options: newOptions, answer: newAnswer };
  }

  function pickPerRunSubset(preparedAll) {
    const all = Array.isArray(preparedAll) ? preparedAll : [];
    const cap = Math.max(1, Number(MAX_QUESTIONS_PER_RUN) || 40);

    if (all.length <= cap) return all.slice();

    // Attach stable original index for ordering after random selection
    const withIdx = all.map((q, i) => (isPlainObject(q) ? { ...q, __bankIndex: i } : q)).filter(isPlainObject);

    // Group by partId
    const groups = Object.create(null);
    withIdx.forEach((q) => {
      const pid = String(q.partId || "p1").toLowerCase();
      if (!groups[pid]) groups[pid] = [];
      groups[pid].push(q);
    });

    // Best-effort: pick TARGET_PER_PART per p1..p4 (random selection)
    const pickedMap = Object.create(null);
    const picked = [];

    ["p1", "p2", "p3", "p4"].forEach((pid) => {
      const g = Array.isArray(groups[pid]) ? groups[pid].slice() : [];
      if (!g.length) return;
      shuffleInPlace(g);
      const take = Math.min(TARGET_PER_PART, g.length);
      for (let i = 0; i < take; i++) {
        const item = g[i];
        const id = String(item.id || "");
        if (id && pickedMap[id]) continue;
        if (id) pickedMap[id] = true;
        picked.push(item);
      }
    });

    // Fill remaining up to cap from the rest (random)
    if (picked.length < cap) {
      const remaining = withIdx.filter((q) => {
        const id = String(q.id || "");
        return !(id && pickedMap[id]);
      });
      shuffleInPlace(remaining);
      const need = cap - picked.length;
      for (let i = 0; i < remaining.length && i < need; i++) picked.push(remaining[i]);
    }

    // Sort into IELTS-like flow: part order then original order
    picked.sort((a, b) => {
      const pa = partOrderValue(a.partId);
      const pb = partOrderValue(b.partId);
      if (pa !== pb) return pa - pb;
      return Number(a.__bankIndex) - Number(b.__bankIndex);
    });

    // Strip internal index key
    return picked.slice(0, cap).map((q) => {
      const { __bankIndex, ...rest } = q;
      return rest;
    });
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
    const audioOk = supportsSpeech();
    return `
      <div class="note" style="margin-top:0">
        <strong>IELTS Listening</strong>
        <p style="margin:8px 0 0">
          4 parts • up to ${safeText(MAX_QUESTIONS_PER_RUN)} questions per run • 40 minutes (practice). This uses original audio scripts read by your browser.
        </p>
        <p style="margin:8px 0 0; opacity:.92">
          ${
            audioOk
              ? 'Use <strong>🔊 Play</strong> to hear the Part audio (TTS). You can replay for practice.'
              : 'Audio is not available in this browser. Use <strong>Show transcript</strong> instead.'
          }
        </p>
        <p style="margin:8px 0 0; opacity:.85">
          If you want stricter conditions, avoid using “Show transcript”.
        </p>
        <p style="margin:8px 0 0; opacity:.85">
          IELTS Practice estimate (not official IELTS).
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
          <div style="font-weight:800; color: var(--muted)">${safeText(partLabel(q.partId))} • Question ${n} of ${total}</div>
          <div class="chip" aria-label="Time remaining" style="font-weight:900">${formatTime(state.timeRemaining)}</div>
        </div>
        <div style="display:flex; gap:8px; flex-wrap:wrap">
          <button class="btn" type="button" data-action="play" aria-label="Play the part audio" ${supportsSpeech() ? "" : "disabled"}>
            🔊 ${played ? "Replay" : "Play"}
          </button>
          <button class="btn" type="button" data-action="stop" aria-label="Stop audio" ${supportsSpeech() ? "" : "disabled"}>⏹ Stop</button>
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
    const options = getOptionsForQuestion(q);

    const qid = q && q.id ? String(q.id) : "q";
    const optionsHtml = options
      .map((opt, i) => {
        const id = `opt-${SLUG}-${qid}-${i}`;
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
    const prompt = safeText(q.question || "Complete the answer");
    const hint = q && q.hint ? String(q.hint) : "";

    return `
      <form data-form="question" style="margin-top:12px">
        <fieldset style="border:1px solid var(--border); border-radius:16px; padding:14px; background: var(--surface2)">
          <legend style="padding:0 8px; font-weight:900">${prompt}</legend>
          ${hint ? `<p style="margin:10px 0 0; opacity:.88">${safeText(hint)}</p>` : ""}

          <label style="display:block; margin-top:12px; font-weight:700">Your answer</label>
          <input
            type="text"
            name="blank"
            required
            autocomplete="off"
            autocapitalize="none"
            spellcheck="false"
            maxlength="64"
            style="width:100%; margin-top:8px; padding:12px 12px; border:1px solid var(--border); border-radius:14px; background: var(--surface)"
            placeholder="Type your answer"
          />
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

    const type = normalizeType(q.type);
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
    const type = normalizeType(q.type);

    if (type === "fillintheblank") {
      const ans = q.answer;
      if (Array.isArray(ans)) return String(ans[0] || "");
      return String(ans == null ? "" : ans);
    }

    if (type === "truefalse") {
      const idx = deriveTrueFalseIndex(q.answer);
      return optionAt(q, idx);
    }

    if (typeof q.answer === "number") return optionAt(q, q.answer);
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
        <p style="margin:8px 0 0"><span style="font-weight:800">Your answer:</span> ${safeText(state.lastUserText || "—")}</p>
        <p style="margin:8px 0 0"><span style="font-weight:800">Correct answer:</span> ${safeText(state.lastCorrectText || correctTextFor(q) || "—")}</p>
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

    const saveDisabled = state.isSaving ? `disabled aria-disabled="true"` : "";
    const saveLabel = state.isSaving ? "Saving…" : "Save score to Profile";
    const savedMsg = state.savedMsg ? String(state.savedMsg) : "";

    return `
      <div class="note" style="margin-top:0">
        <strong>Finished</strong>
        <p style="margin:8px 0 0">
          Score: <span style="font-weight:900">${earned}</span> / ${totalPoints} (${pct}%)
        </p>
        <p style="margin:8px 0 0; opacity:.92">
          Questions completed: ${state.completedCount} / ${totalQs} • Time remaining: ${formatTime(state.timeRemaining)}
        </p>
        <p style="margin:8px 0 0; opacity:.85">
          IELTS Practice estimate (not official IELTS).
        </p>
      </div>

      <div class="actions" style="margin-top:12px; flex-wrap:wrap">
        <button class="btn btn--primary" type="button" data-action="save" ${saveDisabled}>${saveLabel}</button>
        <button class="btn" type="button" data-action="restart">Restart</button>
      </div>

      <p class="muted" data-saved-msg aria-live="polite" role="status" style="margin:10px 0 0">
        ${safeText(savedMsg)}
      </p>

      <div style="margin-top:12px; display:grid; gap:10px">
        <div class="note" style="margin:0; padding:12px 14px">
          <strong>Review</strong>
          <p style="margin:8px 0 0; opacity:.92">Open any question to see your answer, the correct answer, and feedback.</p>
        </div>
        <div style="display:grid; gap:10px">
          ${reviewHtml}
        </div>
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
        playedParts: new Set(),

        // save-to-profile
        savedMsg: "",
        isSaving: false
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

        state.savedMsg = "";
        state.isSaving = false;
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

          // Bank is a pool:
          // - shuffle options only (when safe)
          // - then pick a random subset (best-effort 10 per part) up to MAX_QUESTIONS_PER_RUN
          const preparedAll = ensureIds(bank.map(cloneQuestionWithShuffledOptions).filter(isPlainObject));
          if (!preparedAll.length) throw new Error("Question bank contained no usable questions.");

          const picked = pickPerRunSubset(preparedAll);

          state.questions = picked;

          // IELTS requirement: totals computed from picked, not full bank
          state.totalPoints = picked.reduce((sum, q) => sum + pointsFor(q), 0);

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

      function countRawCorrect() {
        return (state.review || []).reduce((sum, r) => sum + (r && r.isCorrect ? 1 : 0), 0);
      }

      function saveScoreToProfile() {
        if (state.status !== "summary") return;
        if (state.isSaving) return;

        const saver = window.UEAH_SAVE_SCORE && window.UEAH_SAVE_SCORE.save;
        if (typeof saver !== "function") {
          state.savedMsg = "Save not available (missing save helper).";
          paint();
          return;
        }

        state.isSaving = true;
        state.savedMsg = "Saving…";
        paint();

        const rawCorrect = countRawCorrect();
        const rawTotal = state.questions.length;

        const payload = {
          slug: SLUG,
          ageGroup: "ielts",
          skill: "listening",
          at: nowIso(),
          questions: state.questions,
          review: (state.review || []).map((r) => ({ isCorrect: !!(r && r.isCorrect) })),
          rawCorrect,
          totalQuestions: rawTotal,
          percent: state.totalPoints ? Math.round((state.pointsEarned / state.totalPoints) * 100) : 0,
          pointsEarned: state.pointsEarned,
          totalPoints: state.totalPoints
        };

        const res = saver(payload);

        state.isSaving = false;

        if (!res || res.ok === false) {
          const reason = res && res.reason ? String(res.reason) : "Unknown error";
          state.savedMsg = `Could not save. (${reason})`;
          paint();
          return;
        }

        const scoreTxt = Number.isFinite(Number(res.normalizedScore))
          ? String(Math.round(Number(res.normalizedScore)))
          : "—";
        const levelTxt = res.levelTitle ? String(res.levelTitle) : "Saved";
        state.savedMsg = `Saved to Profile — ${scoreTxt}/100 • ${levelTxt}`;
        paint();
      }

      function gradeBlank(q, blankText) {
        const userRaw = String(blankText || "").trim();
        const userNorm = normalizeAnswerText(userRaw);

        const accepted = [];
        const ans = q && q.answer;

        if (Array.isArray(q && q.acceptedAnswers)) accepted.push(...q.acceptedAnswers);
        if (Array.isArray(ans)) accepted.push(...ans);
        else if (ans != null) accepted.push(ans);

        const ok = accepted.some((a) => normalizeAnswerText(a) === userNorm);

        const correctText = accepted.length ? String(accepted[0] || "") : String(ans == null ? "" : ans);
        return { isCorrect: ok, userText: userRaw, correctText };
      }

      function gradeChoice(q, choiceIndex) {
        const type = normalizeType(q.type);

        const chosen = Number(choiceIndex);
        if (!Number.isFinite(chosen)) return { isCorrect: false, userText: "", correctText: correctTextFor(q) };

        const userText = optionAt(q, chosen);
        let isCorrect = false;

        if (type === "truefalse") {
          const correctIdx = deriveTrueFalseIndex(q.answer);
          isCorrect = correctIdx != null ? chosen === correctIdx : chosen === Number(q.answer);
          return { isCorrect, userText, correctText: optionAt(q, correctIdx) || correctTextFor(q) };
        }

        if (typeof q.answer === "number" && Number.isFinite(q.answer)) {
          isCorrect = chosen === q.answer;
          return { isCorrect, userText, correctText: optionAt(q, q.answer) };
        }

        // Fallback: compare chosen option text to string answer.
        const chosenText = normalizeAnswerText(userText);
        const ansText = normalizeAnswerText(q.answer);
        isCorrect = !!chosenText && !!ansText && chosenText === ansText;
        return { isCorrect, userText, correctText: correctTextFor(q) };
      }

      function grade(choiceIndex, blankText) {
        const q = currentQuestion();
        if (!q) return;

        // Prevent double-answering.
        if (state.status !== "question") return;

        const type = normalizeType(q.type);
        const pts = pointsFor(q);

        const result = type === "fillintheblank" ? gradeBlank(q, blankText) : gradeChoice(q, choiceIndex);

        state.lastIsCorrect = !!result.isCorrect;
        state.lastUserText = result.userText || "—";
        state.lastCorrectText = result.correctText || correctTextFor(q) || "—";

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

      // Cancel speech/timers when leaving route (best effort)
      window.addEventListener(
        "popstate",
        () => {
          stopSpeech();
          stopTimer();
        },
        { passive: true }
      );

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
          paint(); // refresh button label (Play -> Replay)
        } else if (action === "stop") {
          ev.preventDefault();
          stopSpeech();
        } else if (action === "toggleTranscript") {
          ev.preventDefault();
          state.showTranscript = !state.showTranscript;
          paint();
        } else if (action === "save") {
          ev.preventDefault();
          saveScoreToProfile();
        }
      });

      host.addEventListener("submit", (ev) => {
        const form = ev.target;
        if (!form || !form.matches || !form.matches('[data-form="question"]')) return;
        ev.preventDefault();

        const q = currentQuestion();
        if (!q) return;

        const type = normalizeType(q.type);

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
