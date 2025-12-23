/* assets/js/tests/age/13-18-speaking.js
   Runner: Ages 13–18 • Speaking (IELTS-inspired)

   Notes:
   - Classroom-friendly: no IELTS band claims.
   - Structured + random: Part 1 + Part 2 cue card + Part 3 discussion.
   - Teacher/learner can mark each prompt as Said / Try again / Skip.
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

  function safeText(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
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

  function sectionLabelFor(key) {
    const k = String(key || "").toLowerCase();
    const match = SECTION_PLAN.find((s) => s.key === k);
    return match ? match.label : "Prompt";
  }

  function renderIntro() {
    const supportsAudio = supportsSpeech();
    const planList = SECTION_PLAN.map((s) => `<li><strong>${safeText(s.label)}</strong> (${s.pick} prompts)</li>`).join("");

    return `
      <div class="detail-card" role="region" aria-label="Speaking test intro">
        <h3 style="margin:0">Speaking (Ages 13–18)</h3>
        <p style="margin:10px 0 0; color: var(--muted)">
          Read the prompt. The learner answers out loud. Encourage natural answers with clear reasons and examples. This is IELTS-inspired (simplified).
        </p>
        <div class="note" style="margin-top:12px">
          <strong>Structure</strong>
          <ul style="margin:10px 0 0; padding-left:18px; color: var(--muted)">${planList}</ul>
          <p style="margin:10px 0 0; color: var(--muted)">
            Tip: Use linking words like <strong>because</strong>, <strong>however</strong>, <strong>for example</strong>, and <strong>on the other hand</strong>.
          </p>
        </div>
        <p style="margin:10px 0 0; opacity:.92">
          ${supportsAudio ? "Use <strong>🔊 Play</strong> for a sample answer." : "Audio is not available in this browser. Read the sample answer out loud."}
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

  function renderPromptScreen(state) {
    const q = state.questions[state.index];
    const total = state.questions.length;
    const n = state.index + 1;

    const prompt = safeText(q.question || "Speak!");
    const sample = safeText(q.model || "");
    const tip = safeText(q.explanation || "Try your best.");

    const sectionLabel = sectionLabelFor(q.section);
    const hasAudio = supportsSpeech() && String(q.say || q.model || "").trim();

    return `
      <div style="display:flex; align-items:center; justify-content:space-between; gap:10px; flex-wrap:wrap">
        <div style="font-weight:900; color: var(--muted)">${safeText(sectionLabel)} • Prompt ${n} of ${total}</div>
        <div style="display:flex; gap:8px; flex-wrap:wrap">
          <button class="btn" type="button" data-action="play" ${hasAudio ? "" : "disabled"} aria-label="Play sample answer audio">🔊 Play</button>
          <button class="btn" type="button" data-action="restart" aria-label="Restart the test">Restart</button>
        </div>
      </div>

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

    state.questions.forEach((q) => {
      const r = state.results[q.id] || "skip";
      if (r === "said") said += 1;
      else if (r === "again") again += 1;
      else skip += 1;
    });

    const rows = state.questions
      .map((q, idx) => {
        const r = state.results[q.id] || "skip";
        const status = r === "said" ? "✅ Said" : r === "again" ? "🔁 Try again" : "⏭️ Skipped";
        const sectionLabel = sectionLabelFor(q.section);
        return `
          <tr>
            <td style="padding:8px 10px; border-bottom:1px solid var(--border); color: var(--muted)">${idx + 1}</td>
            <td style="padding:8px 10px; border-bottom:1px solid var(--border); color: var(--muted); font-weight:800">${safeText(sectionLabel)}</td>
            <td style="padding:8px 10px; border-bottom:1px solid var(--border)">${safeText(q.question || "")}</td>
            <td style="padding:8px 10px; border-bottom:1px solid var(--border); font-weight:800">${status}</td>
          </tr>
        `;
      })
      .join("");

    const encouragement =
      again > 0
        ? "Repeat the ‘Try again’ prompts. In Part 3, push for deeper reasons and comparisons."
        : "Good work. Restart to get a different set of prompts.";

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
                <th style="text-align:left; padding:10px; border-bottom:1px solid var(--border); color: var(--muted)">Section</th>
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

  // Bank loader (no build step)
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

  function buildStructuredSet(allQuestions) {
    const qs = Array.isArray(allQuestions) ? allQuestions.slice() : [];
    const bySection = new Map();
    qs.forEach((q) => {
      const key = String(q && q.section ? q.section : "").toLowerCase();
      if (!bySection.has(key)) bySection.set(key, []);
      bySection.get(key).push(q);
    });

    const usedIds = new Set();

    // Pick Part 2 first (so we can prefer the same topic in Part 3)
    let chosenTopic = "";
    const part2 = [];
    const p2Pool = bySection.get("part2") || [];
    const p2 = shuffleInPlace(p2Pool.slice())[0];
    if (p2 && p2.id) {
      part2.push(p2);
      usedIds.add(p2.id);
      chosenTopic = String(p2.topicId || "").toLowerCase();
    }

    // Pick Part 1 (Interview)
    const part1 = [];
    const p1Pool = bySection.get("part1") || [];
    const p1Shuffled = shuffleInPlace(p1Pool.slice());
    for (let i = 0; i < p1Shuffled.length && part1.length < 8; i++) {
      const q = p1Shuffled[i];
      if (!q || !q.id || usedIds.has(q.id)) continue;
      usedIds.add(q.id);
      part1.push(q);
    }

    // Pick Part 3 (Discussion) - prefer same topic as Part 2
    const part3 = [];
    const p3Pool = bySection.get("part3") || [];
    const preferred = chosenTopic
      ? p3Pool.filter((q) => String(q && q.topicId ? q.topicId : "").toLowerCase() === chosenTopic)
      : [];

    function takeFrom(pool, need) {
      const shuffled = shuffleInPlace(pool.slice());
      for (let i = 0; i < shuffled.length && part3.length < need; i++) {
        const q = shuffled[i];
        if (!q || !q.id || usedIds.has(q.id)) continue;
        usedIds.add(q.id);
        part3.push(q);
      }
    }

    takeFrom(preferred, 6);
    if (part3.length < 6) takeFrom(p3Pool, 6);

    const out = part1.concat(part2, part3);
    if (!out.length) return shuffleInPlace(qs).slice(0, 12);
    return out;
  }

  store.registerRunner(SLUG, {
    render() {
      return renderLoading();
    },

    async afterRender(rootEl, ctx) {
      if (!rootEl) return;

      let allQuestions = [];
      try {
        await ensureBankLoaded(ctx);
        allQuestions = (window.UEAH_TEST_BANKS && window.UEAH_TEST_BANKS[SLUG]) || [];
        if (!Array.isArray(allQuestions) || !allQuestions.length) {
          throw new Error("Question bank is empty.");
        }
      } catch (e) {
        rootEl.innerHTML = renderError(e && e.message ? e.message : "Failed to load.");
        return;
      }

      const state = {
        mode: "intro",
        questions: [],
        index: 0,
        results: {}
      };

      function paint() {
        if (state.mode === "intro") rootEl.innerHTML = renderIntro();
        else if (state.mode === "summary") rootEl.innerHTML = renderSummary(state);
        else rootEl.innerHTML = renderPromptScreen(state);
      }

      function start() {
        stopSpeech();
        state.mode = "prompt";
        state.index = 0;
        state.results = {};
        state.questions = buildStructuredSet(allQuestions);
        paint();
      }

      function restart() {
        stopSpeech();
        state.mode = "intro";
        state.index = 0;
        state.results = {};
        state.questions = [];
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
        speak(q.say || q.model || q.question || "");
      }

      rootEl.addEventListener("click", (ev) => {
        const btn = ev.target && ev.target.closest ? ev.target.closest("[data-action]") : null;
        if (!btn) return;

        const action = btn.getAttribute("data-action");
        if (!action) return;

        if (action === "start") start();
        else if (action === "restart") restart();
        else if (action === "play") speakCurrent();
        else if (action === "mark") mark(btn.getAttribute("data-mark"));
      });

      paint();
    }
  });
})();
