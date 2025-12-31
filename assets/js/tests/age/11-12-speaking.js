/* assets/js/tests/age/11-12-speaking.js
   Runner: Ages 11–12 • Speaking

   Updates (this file):
   - Ensures every question has a stable id (avoids duplicate/blank ids causing overwrite)
   - Improves structured selection:
     * Fills each section to target count where possible
     * If a section is missing/short, backfills from remaining questions
     * Ensures "longturn" is included when available (1 cue card)
   - Adds optional Cue Card timers for "longturn" (00:30 prep / 01:30 speaking)
   - TTS: Play + Stop via shared UEAH_TTS; cancels on navigation and between prompts
   - Bank loader: resilient to existing script; validates bank after load tick
   - Summary includes per-section counts + compact review list
   - Adds "Save score to Profile" on summary (uses window.UEAH_SAVE_SCORE.save)
   - Ensures save payload includes (or ensures present):
     * questions: state.questions
     * resultsById: state.results
*/

(function () {
  "use strict";

  const SLUG = "age-11-12-speaking";
  const BANK_SRC = "assets/data/tests-11-12-speaking.js";

  // SECTION_PLAN total: 16 prompts per attempt
  const SECTION_PLAN = [
    { key: "warmup", label: "Warm-up", pick: 4 },
    { key: "describe", label: "Describe", pick: 4 },
    { key: "roleplay", label: "Role-play", pick: 3 },
    { key: "longturn", label: "Cue card", pick: 1 },
    { key: "discussion", label: "Discussion", pick: 4 }
  ];

  const TARGET_TOTAL = SECTION_PLAN.reduce((sum, s) => sum + (Number(s.pick) || 0), 0);

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

  function normalizeSection(v) {
    return String(v || "").trim().toLowerCase();
  }

  function sectionLabelFor(key) {
    const k = normalizeSection(key);
    const match = SECTION_PLAN.find((s) => s.key === k);
    return match ? match.label : "Prompt";
  }

  function formatTime(sec) {
    const s = Math.max(0, Math.floor(sec));
    const m = Math.floor(s / 60);
    const r = s % 60;
    return `${String(m).padStart(2, "0")}:${String(r).padStart(2, "0")}`;
  }

  function ensureIds(qs) {
    return (Array.isArray(qs) ? qs : []).map((q, idx) => {
      if (!isPlainObject(q)) return q;
      const id = q.id != null && String(q.id).trim() ? String(q.id).trim() : `${SLUG}::idx-${idx}`;
      return { ...q, id };
    });
  }

  // -----------------------------
  // Speech (TTS) — use shared helper UEAH_TTS
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

    try {
      const fn = window.UEAH_TTS?.speak;
      if (typeof fn !== "function") return false;
      return !!fn.call(window.UEAH_TTS, t, { lang: "en-US", chunk: true });
    } catch (_) {
      return false;
    }
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
        if (window.UEAH_TEST_BANKS && Array.isArray(window.UEAH_TEST_BANKS[SLUG])) {
          resolve(true);
          return;
        }
        existing.addEventListener("load", validate, { once: true });
        existing.addEventListener("error", () => reject(new Error("Failed to load test bank")), { once: true });
        validate();
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
  // Selection logic
  // -----------------------------

  function buildStructuredSet(allQuestions) {
    const qs = Array.isArray(allQuestions) ? ensureIds(allQuestions.filter(isPlainObject)) : [];
    if (!qs.length) return [];

    const bySection = new Map();
    qs.forEach((q) => {
      const key = normalizeSection(q.section);
      if (!bySection.has(key)) bySection.set(key, []);
      bySection.get(key).push(q);
    });

    const chosen = [];
    const usedIds = new Set();

    function takeFrom(pool, count) {
      const tmp = Array.isArray(pool) ? pool.slice() : [];
      shuffleInPlace(tmp);
      for (let i = 0; i < tmp.length && count > 0 && chosen.length < TARGET_TOTAL; i++) {
        const q = tmp[i];
        if (!q || !q.id) continue;
        const id = String(q.id);
        if (usedIds.has(id)) continue;
        usedIds.add(id);
        chosen.push(q);
        count -= 1;
      }
      return count;
    }

    // Prefer to include longturn (cue card) if available
    const longturnPick = Math.max(0, Number((SECTION_PLAN.find((s) => s.key === "longturn") || {}).pick || 0));
    if (longturnPick > 0) {
      const ltPool = bySection.get("longturn") || [];
      takeFrom(ltPool, longturnPick);
    }

    // Pick remaining sections (excluding longturn since already handled)
    SECTION_PLAN.forEach((s) => {
      if (s.key === "longturn") return;
      const pool = bySection.get(s.key) || [];
      takeFrom(pool, Math.max(0, Number(s.pick) || 0));
    });

    // Backfill to target length if any section was short/missing
    if (chosen.length < TARGET_TOTAL) {
      const leftovers = qs.filter((q) => q && q.id && !usedIds.has(String(q.id)));
      shuffleInPlace(leftovers);
      for (let i = 0; i < leftovers.length && chosen.length < TARGET_TOTAL; i++) {
        const q = leftovers[i];
        const id = String(q.id);
        if (usedIds.has(id)) continue;
        usedIds.add(id);
        chosen.push(q);
      }
    }

    // Final fallback
    if (!chosen.length) return shuffleInPlace(qs.slice()).slice(0, TARGET_TOTAL);

    return chosen.slice(0, TARGET_TOTAL);
  }

  // -----------------------------
  // UI renderers
  // -----------------------------

  function renderIntro() {
    const supportsAudio = supportsSpeech();
    const planList = SECTION_PLAN.map((s) => `<li><strong>${safeText(s.label)}</strong> (${s.pick} prompts)</li>`).join("");

    return `
      <div class="note" style="margin-top:0">
        <strong>Speaking (Ages 11–12)</strong>
        <p style="margin:8px 0 0; color: var(--muted)">
          Read the prompt. The learner answers out loud. Encourage longer answers (3–6 sentences) and clear reasons.
        </p>

        <div class="note" style="margin-top:12px; padding:12px 14px">
          <strong>Structure</strong>
          <ul style="margin:10px 0 0; padding-left:18px; color: var(--muted)">${planList}</ul>
          <p style="margin:10px 0 0; color: var(--muted)">
            Tip: Encourage linking words like <strong>because</strong>, <strong>however</strong>, and <strong>for example</strong>.
          </p>
        </div>

        <p style="margin:10px 0 0; opacity:.92">
          ${
            supportsAudio
              ? "Use <strong>🔊 Play</strong> for a model answer (if provided)."
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
        <strong>Could not start the test</strong>
        <p style="margin:8px 0 0">${safeText(message || "Unknown error")}</p>
      </div>
      <div class="actions" style="margin-top:12px">
        <button class="btn" type="button" data-action="retry">Try again</button>
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
    if (!isPlainObject(rubric) || !isPlainObject(rubric.checks)) return "";
    const c = rubric.checks;

    const checks = [];
    if (Number.isFinite(Number(c.minSentences))) checks.push(`Aim for ${Number(c.minSentences)}+ sentences`);
    if (c.encourageBecause) checks.push("Try to include a reason (because / so)");
    if (c.encourageLinkers) checks.push("Try to include a linker (however / for example / also)");
    if (!checks.length) return "";

    const items = checks.map((t) => `<li style="margin:6px 0">${safeText(t)}</li>`).join("");
    return `
      <div class="note" style="margin:12px 0 0; padding:10px 12px">
        <strong>Quick check</strong>
        <ul style="margin:8px 0 0; padding-left:18px; color: var(--muted)">${items}</ul>
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

  function renderLongTurnTimers(state, q) {
    if (normalizeSection(q && q.section) !== "longturn") return "";

    return `
      <div class="note" style="margin:12px 0 0; padding:10px 12px">
        <strong>Cue card timers (optional)</strong>
        <p style="margin:8px 0 0; opacity:.92">Prep: 00:30 • Speaking: 01:30</p>
        <div style="display:flex; gap:8px; flex-wrap:wrap; margin-top:10px; align-items:center">
          <button class="btn" type="button" data-action="ltprep">Start prep</button>
          <button class="btn" type="button" data-action="ltspeak">Start speaking</button>
          <button class="btn" type="button" data-action="ltstop">Stop timer</button>
          <span class="chip" aria-label="Cue card timer" style="font-weight:900">${formatTime(state.ltRemaining || 0)}</span>
        </div>
      </div>
    `;
  }

  function renderPromptScreen(state) {
    const q = state.questions[state.index];
    const total = state.questions.length;
    const n = state.index + 1;

    const prompt = safeTextWithBreaks(q.question || "Speak!");
    const model = safeTextWithBreaks(q.model || "");
    const tip = safeText(q.explanation || "Try your best.");

    const sectionLabel = sectionLabelFor(q.section);
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

      ${renderLongTurnTimers(state, q)}

      <div style="margin-top:12px">
        <div style="border:1px solid var(--border); border-radius:16px; padding:14px; background: var(--surface2)">
          <div style="font-weight:900; font-size:18px">${prompt}</div>

          ${model ? `<div style="margin-top:10px; font-size:16px; font-weight:900">Example: ${model}</div>` : ""}

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

    const sectionCounts = Object.create(null);
    SECTION_PLAN.forEach((s) => {
      sectionCounts[s.key] = { said: 0, again: 0, skip: 0 };
    });

    state.questions.forEach((q) => {
      const id = q && q.id != null ? String(q.id) : "";
      const r = (id && state.results[id]) || "skip";
      const sec = normalizeSection(q && q.section);
      const bucket = sectionCounts[sec] || { said: 0, again: 0, skip: 0 };

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

      if (sectionCounts[sec]) sectionCounts[sec] = bucket;
    });

    const sectionLines = SECTION_PLAN.map((s) => {
      const c = sectionCounts[s.key] || { said: 0, again: 0, skip: 0 };
      return `<div style="margin-top:6px; color:var(--muted)"><strong>${safeText(s.label)}:</strong> Said ${c.said} • Try again ${c.again} • Skipped ${c.skip}</div>`;
    }).join("");

    const encouragement =
      again > 0
        ? "Repeat the ‘Try again’ prompts tomorrow. Ask the learner to add one extra detail each time."
        : "Good work. Restart to get a different set of prompts.";

    const rows = state.questions
      .map((q, idx) => {
        const id = q && q.id != null ? String(q.id) : "";
        const r = (id && state.results[id]) || "skip";
        const status = r === "said" ? "✅ Said" : r === "again" ? "🔁 Try again" : "⏭️ Skipped";
        const secLabel = sectionLabelFor(q.section);

        return `
          <li style="display:flex; gap:10px; align-items:flex-start; padding:8px 0; border-bottom:1px solid var(--border)">
            <span aria-hidden="true">${safeText(status.split(" ")[0])}</span>
            <span style="min-width:0">
              <b>${idx + 1}.</b> <span style="color:var(--muted); font-weight:800">${safeText(secLabel)}</span><br>
              ${safeText(q.question || "")}
              <div style="margin-top:6px; font-weight:800">${status}</div>
            </span>
          </li>
        `;
      })
      .join("");

    const canSave = !!(window.UEAH_SAVE_SCORE && typeof window.UEAH_SAVE_SCORE.save === "function");

    return `
      <div class="note" style="margin-top:0">
        <strong>Summary</strong>
        <p style="margin:8px 0 0; color: var(--muted)">
          Said: <strong>${said}</strong> • Try again: <strong>${again}</strong> • Skipped: <strong>${skip}</strong>
        </p>
        ${sectionLines}
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

      <div class="actions" style="margin-top:12px; display:flex; gap:8px; flex-wrap:wrap">
        <button class="btn btn--primary" type="button" data-action="restart">Restart</button>
        ${
          canSave
            ? `<button class="btn" type="button" data-action="save-score" aria-label="Save score to Profile">Save score to Profile</button>`
            : ""
        }
        ${
          state.savedMsg
            ? `<span style="align-self:center; font-weight:800; color: var(--muted)">${safeText(
                state.savedMsg
              )}</span>`
            : ""
        }
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
        results: Object.create(null), // q.id -> "said" | "again" | "skip"
        lastError: "",
        savedMsg: "",

        // Cue card timer (optional)
        ltTimerId: null,
        ltRemaining: 0
      };

      function stopLongTurnTimer() {
        if (state.ltTimerId) {
          clearInterval(state.ltTimerId);
          state.ltTimerId = null;
        }
        state.ltRemaining = 0;
        const chip = host.querySelector('[aria-label="Cue card timer"]');
        if (chip) chip.textContent = formatTime(state.ltRemaining);
      }

      function startLongTurnCountdown(seconds) {
        stopLongTurnTimer();
        state.ltRemaining = Math.max(0, Math.floor(seconds || 0));
        paint();

        state.ltTimerId = setInterval(() => {
          state.ltRemaining -= 1;
          if (state.ltRemaining <= 0) {
            state.ltRemaining = 0;
            stopLongTurnTimer();
            paint();
            return;
          }
          const chip = host.querySelector('[aria-label="Cue card timer"]');
          if (chip) chip.textContent = formatTime(state.ltRemaining);
        }, 1000);
      }

      function paint() {
        if (state.status === "intro") stage.innerHTML = renderIntro();
        else if (state.status === "loading") stage.innerHTML = renderLoading();
        else if (state.status === "prompt") stage.innerHTML = renderPromptScreen(state);
        else if (state.status === "summary") stage.innerHTML = renderSummary(state);
        else if (state.status === "error") stage.innerHTML = renderError(state.lastError);
        else stage.innerHTML = renderIntro();

        if (state.status === "prompt") {
          setTimeout(() => {
            try {
              const el = host.querySelector("button");
              if (el && typeof el.focus === "function") el.focus();
            } catch (_) {}
          }, 0);
        }
      }

      async function start() {
        stopSpeech();
        stopLongTurnTimer();

        state.status = "loading";
        state.lastError = "";
        state.savedMsg = "";
        paint();

        try {
          await ensureBankLoaded(ctx);

          const bank =
            window.UEAH_TEST_BANKS && Array.isArray(window.UEAH_TEST_BANKS[SLUG])
              ? window.UEAH_TEST_BANKS[SLUG]
              : [];

          if (!bank.length) throw new Error("Missing question bank.");

          const prepared = ensureIds(bank.filter(isPlainObject).map((q) => ({ ...q })));
          const picked = buildStructuredSet(prepared);

          if (!picked.length) throw new Error("Could not build a speaking test from the bank.");

          state.questions = picked;
          state.index = 0;
          state.results = Object.create(null);
          state.savedMsg = "";

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
        stopLongTurnTimer();

        state.status = "intro";
        state.questions = [];
        state.index = 0;
        state.results = Object.create(null);
        state.lastError = "";
        state.savedMsg = "";
        paint();
      }

      function next() {
        stopSpeech();
        stopLongTurnTimer();

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
        if (!q || q.id == null) return;

        const v = String(val || "").toLowerCase();
        if (v !== "said" && v !== "again" && v !== "skip") return;

        state.results[String(q.id)] = v;
        next();
      }

      function speakCurrent() {
        const q = state.questions[state.index];
        if (!q) return;
        const t = String(q.say || q.model || "").trim();
        if (!t) return;
        speak(t);
      }

      function saveScoreToProfile() {
        if (!window.UEAH_SAVE_SCORE || typeof window.UEAH_SAVE_SCORE.save !== "function") {
          state.savedMsg = "Save unavailable.";
          paint();
          return;
        }

        if (state.status !== "summary") {
          state.savedMsg = "Finish the test first.";
          paint();
          return;
        }

        const res = window.UEAH_SAVE_SCORE.save({
          slug: SLUG,
          ageGroup: "11-12",
          skill: "speaking",
          questions: state.questions,
          resultsById: state.results
        });

        if (res && res.ok) state.savedMsg = "Saved to Profile.";
        else state.savedMsg = "Could not save.";

        paint();
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
          stopSpeech();
        } else if (action === "mark") {
          ev.preventDefault();
          mark(btn.getAttribute("data-mark"));
        } else if (action === "ltprep") {
          ev.preventDefault();
          startLongTurnCountdown(30);
        } else if (action === "ltspeak") {
          ev.preventDefault();
          startLongTurnCountdown(90);
        } else if (action === "ltstop") {
          ev.preventDefault();
          stopLongTurnTimer();
          paint();
        } else if (action === "save-score") {
          ev.preventDefault();
          saveScoreToProfile();
        }
      });

      // Cancel audio/timer on navigation (best effort)
      window.addEventListener(
        "popstate",
        () => {
          stopSpeech();
          stopLongTurnTimer();
        },
        { passive: true }
      );

      paint();
    }
  });
})();
