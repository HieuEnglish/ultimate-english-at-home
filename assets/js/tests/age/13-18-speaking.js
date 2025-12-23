/* assets/js/tests/age/13-18-speaking.js
   Runner: Ages 13–18 • Speaking (IELTS-inspired)

   Notes:
   - Classroom-friendly: no IELTS band claims.
   - Structured + random: Part 1 + Part 2 cue card + Part 3 discussion.
   - Teacher/learner can mark each prompt as Said / Try again / Skip.

   Updates (this file):
   - Fixes structured picking bug in original (Part 3 selection logic + topic preference)
   - Adds stable fallback when sections are missing in the bank
   - Adds Stop audio + cancels speech/timers on navigation changes
   - Makes bank-loader resilient (existing script tick)
   - Improves safety around missing ids/fields; ensures ids exist
   - Keeps UI consistent with other runners (intro/loading/error/prompt/summary)
*/

(function () {
  "use strict";

  const SLUG = "age-13-18-speaking";
  const BANK_SRC = "assets/data/tests-13-18-speaking.js";

  const SECTION_PLAN = [
    { key: "part1", label: "Part 1 (Interview)", pick: 8 },
    { key: "part2", label: "Part 2 (Cue card)", pick: 1 },
    { key: "part3", label: "Part 3 (Discussion)", pick: 6 }
  ];

  const store = window.UEAH_TESTS_STORE;
  if (!store || typeof store.registerRunner !== "function") {
    console.warn("[UEAH] tests store not found; runner not registered:", SLUG);
    return;
  }

  // -----------------------------
  // Helpers
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

  function formatTime(sec) {
    const s = Math.max(0, Math.floor(sec));
    const m = Math.floor(s / 60);
    const r = s % 60;
    return `${String(m).padStart(2, "0")}:${String(r).padStart(2, "0")}`;
  }

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

  function normalizeSection(v) {
    return String(v || "").trim().toLowerCase();
  }

  function normalizeTopic(v) {
    return String(v || "").trim().toLowerCase();
  }

  function sectionLabelFor(key) {
    const k = String(key || "").toLowerCase();
    const match = SECTION_PLAN.find((s) => s.key === k);
    return match ? match.label : "Prompt";
  }

  function clamp(n, a, b) {
    const x = Number(n);
    if (!Number.isFinite(x)) return a;
    return Math.min(b, Math.max(a, x));
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
        // If it already executed, resolve; otherwise tick once.
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
  // Structured picking
  // -----------------------------

  function ensureIds(list) {
    return list.map((q, idx) => {
      if (!isPlainObject(q)) return q;
      if (q.id != null && String(q.id).trim()) return q;
      return { ...q, id: `q_${idx}_${Math.random().toString(16).slice(2)}` };
    });
  }

  function sampleUnique(pool, n, usedIds) {
    const out = [];
    const tmp = pool.slice();
    shuffleInPlace(tmp);

    for (let i = 0; i < tmp.length && out.length < n; i++) {
      const q = tmp[i];
      if (!q || !q.id) continue;
      const id = String(q.id);
      if (usedIds.has(id)) continue;
      usedIds.add(id);
      out.push(q);
    }
    return out;
  }

  function buildStructuredSet(allQuestions) {
    const qs = Array.isArray(allQuestions) ? ensureIds(allQuestions.filter(isPlainObject)) : [];
    if (!qs.length) return [];

    const bySection = new Map();
    qs.forEach((q) => {
      const key = normalizeSection(q.section);
      if (!bySection.has(key)) bySection.set(key, []);
      bySection.get(key).push(q);
    });

    const p1Pool = (bySection.get("part1") || []).slice();
    const p2Pool = (bySection.get("part2") || []).slice();
    const p3Pool = (bySection.get("part3") || []).slice();

    // If the bank isn't structured, fallback to a random sample.
    const hasAnyStructured = p1Pool.length || p2Pool.length || p3Pool.length;
    if (!hasAnyStructured) {
      const tmp = qs.slice();
      shuffleInPlace(tmp);
      return tmp.slice(0, 15);
    }

    const usedIds = new Set();

    // Pick Part 2 first (topic anchor)
    shuffleInPlace(p2Pool);
    const p2 = p2Pool.length ? p2Pool[0] : null;
    if (p2 && p2.id) usedIds.add(String(p2.id));

    const chosenTopic = p2 ? normalizeTopic(p2.topicId) : "";

    // Part 1: prefer variety by topicId (cap repeats at 2 where topicId exists)
    const p1Need = (SECTION_PLAN.find((s) => s.key === "part1") || {}).pick || 8;
    const p1Picked = [];
    const seenTopics = new Map();

    const p1Tmp = p1Pool.slice();
    shuffleInPlace(p1Tmp);

    for (let i = 0; i < p1Tmp.length && p1Picked.length < p1Need; i++) {
      const q = p1Tmp[i];
      if (!q || !q.id) continue;
      const id = String(q.id);
      if (usedIds.has(id)) continue;

      const t = normalizeTopic(q.topicId);
      const count = t ? seenTopics.get(t) || 0 : 0;

      if (t && count >= 2) continue;

      usedIds.add(id);
      if (t) seenTopics.set(t, count + 1);
      p1Picked.push(q);
    }

    // If still short, fill without topic constraint
    if (p1Picked.length < p1Need) {
      const fill = sampleUnique(p1Tmp, p1Need - p1Picked.length, usedIds);
      Array.prototype.push.apply(p1Picked, fill);
    }

    // Part 3: prefer same topicId as Part 2; then fill from remaining pool
    const p3Need = (SECTION_PLAN.find((s) => s.key === "part3") || {}).pick || 6;

    const preferredP3 = chosenTopic
      ? p3Pool.filter((q) => normalizeTopic(q.topicId) === chosenTopic)
      : [];

    const p3Picked = [];
    if (preferredP3.length) {
      const got = sampleUnique(preferredP3, p3Need, usedIds);
      Array.prototype.push.apply(p3Picked, got);
    }

    if (p3Picked.length < p3Need) {
      const got = sampleUnique(p3Pool, p3Need - p3Picked.length, usedIds);
      Array.prototype.push.apply(p3Picked, got);
    }

    // If P2 missing, try to take one from remaining questions (any section) as a cue-style middle prompt.
    let p2Final = p2;
    if (!p2Final) {
      const any = qs.filter((q) => !usedIds.has(String(q.id)));
      shuffleInPlace(any);
      p2Final = any.length ? any[0] : null;
      if (p2Final && p2Final.id) usedIds.add(String(p2Final.id));
    }

    const final = []
      .concat(p1Picked)
      .concat(p2Final ? [p2Final] : [])
      .concat(p3Picked);

    // Ultimate fallback if somehow empty
    if (!final.length) {
      const tmp = qs.slice();
      shuffleInPlace(tmp);
      return tmp.slice(0, 15);
    }

    return final;
  }

  // -----------------------------
  // UI renderers
  // -----------------------------

  function renderIntro() {
    const supportsAudio = supportsSpeech();
    const planList = SECTION_PLAN.map(
      (s) => `<li><strong>${safeText(s.label)}</strong> (${s.pick} prompts)</li>`
    ).join("");

    return `
      <div class="note" style="margin-top:0">
        <strong>Speaking (Ages 13–18)</strong>
        <p style="margin:8px 0 0; opacity:.92">
          Read the prompt. The learner answers out loud. Encourage clear reasons and examples. This is IELTS-inspired (simplified).
        </p>

        <div class="note" style="margin-top:12px; padding:12px 14px">
          <strong>Structure</strong>
          <ul style="margin:10px 0 0; padding-left:18px; color: var(--muted)">${planList}</ul>
          <p style="margin:10px 0 0; color: var(--muted)">
            Tip: Use linking words like <strong>because</strong>, <strong>however</strong>, <strong>for example</strong>, and <strong>on the other hand</strong>.
          </p>
        </div>

        <p style="margin:10px 0 0; opacity:.92">
          ${
            supportsAudio
              ? "Use <strong>🔊 Play</strong> to hear a model answer (if provided)."
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
        <p style="margin:8px 0 0">Preparing your test.</p>
      </div>
    `;
  }

  function renderError(message) {
    return `
      <div class="note" style="margin-top:0">
        <strong>Could not load this test</strong>
        <p style="margin:8px 0 0">${safeText(message || "Unknown error")}</p>
      </div>
      <div class="actions" style="margin-top:12px">
        <button class="btn" type="button" data-action="retry">Try again</button>
      </div>
    `;
  }

  function renderCue(q) {
    const cue = Array.isArray(q && q.cue) ? q.cue : [];
    if (!cue.length) return "";
    const items = cue.map((t) => `<li style="margin:6px 0">${safeText(t)}</li>`).join("");
    return `
      <div class="note" style="margin:12px 0 0; padding:10px 12px">
        <strong>Cue points</strong>
        <ul style="margin:8px 0 0; padding-left:18px; color: var(--muted)">${items}</ul>
      </div>
    `;
  }

  function renderFollowUps(q) {
    const fu = Array.isArray(q && q.followUps) ? q.followUps : [];
    if (!fu.length) return "";
    const items = fu.map((t) => `<li style="margin:6px 0">${safeText(t)}</li>`).join("");
    return `
      <div class="note" style="margin:12px 0 0; padding:10px 12px">
        <strong>Follow-up questions</strong>
        <ul style="margin:8px 0 0; padding-left:18px; color: var(--muted)">${items}</ul>
      </div>
    `;
  }

  function renderTargets(q) {
    const targets = Array.isArray(q && q.targets) ? q.targets : [];
    if (!targets.length) return "";
    const items = targets.map((t) => `<li style="margin:6px 0">${safeText(t)}</li>`).join("");
    return `
      <div class="note" style="margin:12px 0 0; padding:10px 12px">
        <strong>Targets</strong>
        <ul style="margin:8px 0 0; padding-left:18px; color: var(--muted)">${items}</ul>
      </div>
    `;
  }

  function renderChecks(q) {
    const rubric = q && q.rubric;
    const checksObj = rubric && rubric.checks && typeof rubric.checks === "object" ? rubric.checks : null;
    if (!checksObj) return "";

    const checks = [];
    if (Number.isFinite(Number(checksObj.minSentences))) checks.push(`Aim for ${Number(checksObj.minSentences)}+ sentences`);
    if (checksObj.encourageBecause) checks.push("Include a reason (because / so / due to)");
    if (checksObj.encourageLinkers) checks.push("Use linking words (however / for example / on the other hand)");
    if (!checks.length) return "";

    const items = checks.map((t) => `<li style="margin:6px 0">${safeText(t)}</li>`).join("");
    return `
      <div class="note" style="margin:12px 0 0; padding:10px 12px">
        <strong>Quick check</strong>
        <ul style="margin:8px 0 0; padding-left:18px; color: var(--muted)">${items}</ul>
      </div>
    `;
  }

  function renderPart2Timers(state, q) {
    if (String(q.section || "").toLowerCase() !== "part2") return "";

    return `
      <div class="note" style="margin:12px 0 0; padding:10px 12px">
        <strong>Part 2 timers (optional)</strong>
        <p style="margin:8px 0 0; opacity:.92">Prep: 01:00 • Speaking: 02:00</p>
        <div style="display:flex; gap:8px; flex-wrap:wrap; margin-top:10px; align-items:center">
          <button class="btn" type="button" data-action="p2prep">Start prep</button>
          <button class="btn" type="button" data-action="p2speak">Start speaking</button>
          <button class="btn" type="button" data-action="p2stop">Stop timer</button>
          <span class="chip" aria-label="Part 2 timer" style="font-weight:900">${formatTime(state.p2Remaining || 0)}</span>
        </div>
      </div>
    `;
  }

  function renderPromptScreen(state) {
    const q = state.questions[state.index];
    const total = state.questions.length;
    const n = state.index + 1;

    const prompt = safeTextWithBreaks(q.question || "Speak!");
    const sample = safeTextWithBreaks(q.model || "");
    const tip = safeText(q.explanation || "Try your best.");

    const sectionKey = normalizeSection(q.section);
    const sectionLabel = sectionLabelFor(sectionKey);

    const audioText = String(q.say || q.model || "").trim();
    const hasAudio = supportsSpeech() && !!audioText;

    return `
      <div style="display:flex; align-items:center; justify-content:space-between; gap:10px; flex-wrap:wrap">
        <div style="font-weight:900; color: var(--muted)">${safeText(sectionLabel)} • Prompt ${n} of ${total}</div>
        <div style="display:flex; gap:8px; flex-wrap:wrap">
          <button class="btn" type="button" data-action="play" ${hasAudio ? "" : "disabled"} aria-label="Play model audio">🔊 Play</button>
          <button class="btn" type="button" data-action="stop" ${supportsSpeech() ? "" : "disabled"} aria-label="Stop audio">⏹ Stop</button>
          <button class="btn" type="button" data-action="restart" aria-label="Restart the test">Restart</button>
        </div>
      </div>

      ${renderPart2Timers(state, q)}

      <div style="margin-top:12px">
        <div style="border:1px solid var(--border); border-radius:16px; padding:14px; background: var(--surface2)">
          <div style="font-weight:900; font-size:18px">${prompt}</div>

          ${sample ? `<div style="margin-top:10px; font-size:16px; font-weight:900">Sample: ${sample}</div>` : ""}

          <p style="margin:10px 0 0; color: var(--muted); font-size:13px">Tip: ${tip}</p>

          ${renderCue(q)}
          ${renderFollowUps(q)}
          ${renderTargets(q)}
          ${renderChecks(q)}

          <div class="actions" style="margin-top:14px; display:flex; gap:10px; flex-wrap:wrap">
            <button class="btn" type="button" data-action="mark" data-mark="said">✅ Said it</button>
            <button class="btn" type="button" data-action="mark" data-mark="again">🔁 Try again</button>
            <button class="btn" type="button" data-action="mark" data-mark="skip">⏭️ Skip</button>
          </div>
        </div>
      </div>
    `;
  }

  function renderSummary(state) {
    let said = 0;
    let again = 0;
    let skip = 0;

    const sectionCounts = {
      part1: { said: 0, again: 0, skip: 0 },
      part2: { said: 0, again: 0, skip: 0 },
      part3: { said: 0, again: 0, skip: 0 }
    };

    state.questions.forEach((q) => {
      const r = state.results[String(q.id)] || "skip";
      const sec = normalizeSection(q.section) || "part1";
      const bucket = sectionCounts[sec] || sectionCounts.part1;

      if (r === "said") {
        said += 1;
        bucket.said += 1;
      } else if (r === "again") {
        again += 1;
        bucket.again += 1;
      } else {
        skip += 1;
        bucket.skip += 1;
      }
    });

    const rows = state.questions
      .map((q, idx) => {
        const r = state.results[String(q.id)] || "skip";
        const status = r === "said" ? "✅ Said" : r === "again" ? "🔁 Try again" : "⏭️ Skipped";
        const sectionLabel = sectionLabelFor(normalizeSection(q.section));
        return `
          <li style="display:flex; gap:10px; align-items:flex-start; padding:8px 0; border-bottom:1px solid var(--border)">
            <span aria-hidden="true">${safeText(status.split(" ")[0])}</span>
            <span style="min-width:0">
              <b>${idx + 1}.</b> <span style="color:var(--muted); font-weight:800">${safeText(sectionLabel)}</span><br>
              ${safeText(q.question || "")}
              <div style="margin-top:6px; font-weight:800">${status}</div>
            </span>
          </li>
        `;
      })
      .join("");

    const encouragement =
      again > 0
        ? "Repeat the ‘Try again’ prompts. In Part 3, push for deeper reasons and comparisons."
        : "Restart to get a different set of prompts.";

    function secLine(key) {
      const s = sectionCounts[key];
      if (!s) return "";
      return `<div style="margin-top:6px; color:var(--muted)"><strong>${safeText(sectionLabelFor(key))}:</strong> Said ${s.said} • Try again ${s.again} • Skipped ${s.skip}</div>`;
    }

    return `
      <div class="note" style="margin-top:0">
        <strong>Summary</strong>
        <p style="margin:8px 0 0; color: var(--muted)">
          Said: <strong>${said}</strong> • Try again: <strong>${again}</strong> • Skipped: <strong>${skip}</strong>
        </p>
        ${secLine("part1")}
        ${secLine("part2")}
        ${secLine("part3")}
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
        lastError: "",

        // Part 2 mini timer (optional)
        p2TimerId: null,
        p2Remaining: 0
      };

      function stopP2Timer() {
        if (state.p2TimerId) {
          clearInterval(state.p2TimerId);
          state.p2TimerId = null;
        }
        state.p2Remaining = 0;
        const chip = host.querySelector('[aria-label="Part 2 timer"]');
        if (chip) chip.textContent = formatTime(state.p2Remaining);
      }

      function startP2Countdown(seconds) {
        stopP2Timer();
        state.p2Remaining = clamp(seconds, 0, 60 * 60);
        paint();

        state.p2TimerId = setInterval(() => {
          state.p2Remaining -= 1;
          if (state.p2Remaining <= 0) {
            state.p2Remaining = 0;
            stopP2Timer();
            paint();
            return;
          }
          const chip = host.querySelector('[aria-label="Part 2 timer"]');
          if (chip) chip.textContent = formatTime(state.p2Remaining);
        }, 1000);
      }

      function paint() {
        if (state.status === "intro") stage.innerHTML = renderIntro();
        else if (state.status === "loading") stage.innerHTML = renderLoading();
        else if (state.status === "prompt") stage.innerHTML = renderPromptScreen(state);
        else if (state.status === "summary") stage.innerHTML = renderSummary(state);
        else if (state.status === "error") stage.innerHTML = renderError(state.lastError);
        else stage.innerHTML = renderIntro();
      }

      async function start() {
        stopSpeech();
        stopP2Timer();

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

          const prepared = bank.map((q) => (isPlainObject(q) ? { ...q } : q));
          const built = buildStructuredSet(prepared);

          if (!built.length) throw new Error("Could not build a speaking test from the bank.");

          state.questions = built;
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
        stopP2Timer();

        state.status = "intro";
        state.questions = [];
        state.index = 0;
        state.results = Object.create(null);
        state.lastError = "";
        paint();
      }

      function next() {
        stopSpeech();
        stopP2Timer();

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
        if (!q || !q.id) return;

        const v = String(val || "").toLowerCase();
        const normalized = v === "said" || v === "again" || v === "skip" ? v : "skip";

        state.results[String(q.id)] = normalized;
        next();
      }

      function speakCurrent() {
        const q = state.questions[state.index];
        if (!q) return;
        const t = q.say || q.model || "";
        speak(t);
      }

      function stopAudio() {
        stopSpeech();
      }

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
        } else if (action === "play") {
          ev.preventDefault();
          speakCurrent();
        } else if (action === "stop") {
          ev.preventDefault();
          stopAudio();
        } else if (action === "mark") {
          ev.preventDefault();
          mark(btn.getAttribute("data-mark"));
        } else if (action === "p2prep") {
          ev.preventDefault();
          startP2Countdown(60);
        } else if (action === "p2speak") {
          ev.preventDefault();
          startP2Countdown(120);
        } else if (action === "p2stop") {
          ev.preventDefault();
          stopP2Timer();
          paint();
        }
      });

      // Cancel speech/timers when leaving the page (best effort)
      window.addEventListener(
        "popstate",
        () => {
          stopSpeech();
          stopP2Timer();
        },
        { passive: true }
      );

      paint();
    }
  });
})();
