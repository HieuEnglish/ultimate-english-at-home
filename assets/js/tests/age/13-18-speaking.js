/* assets/js/tests/age/13-18-speaking.js
   Runner: Ages 13–18 • Speaking (IELTS-inspired)

   Notes:
   - Classroom-friendly: no IELTS band claims.
   - Structured + random: Part 1 + Part 2 cue card + Part 3 discussion.
   - Teacher/learner can mark each prompt as Said / Try again / Skip.

   Updates (this file):
   - Fixes structured picking bugs (Part 3 selection + topic anchoring + duplicate ids)
   - Adds stable fallback when sections are missing in the bank
   - Adds Stop audio + cancels speech/timers on navigation changes
   - Makes bank-loader resilient (existing script + validation tick; handles already-loaded script)
   - Improves safety around missing ids/fields; ensures stable UNIQUE ids
   - Keeps UI consistent with other runners (intro/loading/error/prompt/summary)
   - Adds optional Part 2 timers (1:00 prep / 2:00 speaking)
   - Adds “Save completion to Profile” on summary (uses window.UEAH_SAVE_SCORE if available)
*/

(function () {
  "use strict";

  const SLUG = "age-13-18-speaking";
  const BANK_SRC = "assets/data/tests-13-18-speaking.js";

  const AGE_GROUP = "13-18";
  const SKILL = "speaking";

  const SECTION_PLAN = [
    { key: "part1", label: "Part 1 (Interview)", pick: 8 },
    { key: "part2", label: "Part 2 (Cue card)", pick: 1 },
    { key: "part3", label: "Part 3 (Discussion)", pick: 6 }
  ];

  const store = window.UEAH_TESTS_STORE;
  if (!store || typeof store.registerRunner !== "function") return;

  // -----------------------------
  // Helpers
  // -----------------------------

  function nowIso() {
    try {
      return new Date().toISOString();
    } catch (_) {
      return "";
    }
  }

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

  function safeDomId(v) {
    return String(v == null ? "" : v)
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9\-_:.]/g, "-")
      .slice(0, 80);
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

  function deriveFallbackId(q, idx) {
    const sec = normalizeSection(q.section) || "x";
    const top = normalizeTopic(q.topicId) || "t";
    const stem = String(q.question || q.prompt || "")
      .trim()
      .slice(0, 24)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    return `${SLUG}::${sec}::${top}::${idx}::${stem || "q"}`;
  }

  function ensureUniqueIds(list) {
    const seen = new Set();
    return (Array.isArray(list) ? list : []).map((q, idx) => {
      if (!isPlainObject(q)) return q;

      const base =
        q.id != null && String(q.id).trim() ? String(q.id).trim() : deriveFallbackId(q, idx);

      let id = base;
      if (seen.has(id)) {
        let n = 2;
        while (seen.has(`${base}--${n}`)) n += 1;
        id = `${base}--${n}`;
      }
      seen.add(id);

      return { ...q, id };
    });
  }

  function asTextLines(v) {
    if (Array.isArray(v)) return v.filter((x) => x != null).map(String).join("\n");
    return String(v == null ? "" : v);
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
        // If already loaded, resolve immediately.
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
  // Structured picking
  // -----------------------------

  function sampleUnique(pool, n, usedIds) {
    const out = [];
    const tmp = (Array.isArray(pool) ? pool : []).slice();
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

  function buildFallbackSet(qs, totalTarget) {
    const tmp = (Array.isArray(qs) ? qs : []).slice();
    shuffleInPlace(tmp);
    return tmp.slice(0, Math.max(1, totalTarget || 15));
  }

  function buildStructuredSet(allQuestions) {
    const raw = (Array.isArray(allQuestions) ? allQuestions : []).filter(isPlainObject).map((q) => ({ ...q }));

    const qs = ensureUniqueIds(raw);
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

    const targetTotal = SECTION_PLAN.reduce((a, s) => a + (s.pick || 0), 0) || 15;

    // If the bank isn't structured at all, fallback.
    const hasAnyStructured = p1Pool.length || p2Pool.length || p3Pool.length;
    if (!hasAnyStructured) return buildFallbackSet(qs, targetTotal);

    const usedIds = new Set();

    // 1) Pick Part 2 first (topic anchor)
    shuffleInPlace(p2Pool);
    const p2 = p2Pool.length ? p2Pool[0] : null;
    if (p2 && p2.id) usedIds.add(String(p2.id));
    const anchorTopic = p2 ? normalizeTopic(p2.topicId) : "";

    // 2) Part 1: prefer topic variety; if topicId missing, treat as unique
    const p1Need = (SECTION_PLAN.find((s) => s.key === "part1") || {}).pick || 8;
    const p1Picked = [];
    const topicCounts = new Map();

    const p1Tmp = p1Pool.slice();
    shuffleInPlace(p1Tmp);

    for (let i = 0; i < p1Tmp.length && p1Picked.length < p1Need; i++) {
      const q = p1Tmp[i];
      if (!q || !q.id) continue;

      const id = String(q.id);
      if (usedIds.has(id)) continue;

      const t = normalizeTopic(q.topicId);
      const count = t ? topicCounts.get(t) || 0 : 0;

      // cap repeats when topic exists
      if (t && count >= 2) continue;

      usedIds.add(id);
      if (t) topicCounts.set(t, count + 1);
      p1Picked.push(q);
    }

    if (p1Picked.length < p1Need) {
      const fill = sampleUnique(p1Tmp, p1Need - p1Picked.length, usedIds);
      Array.prototype.push.apply(p1Picked, fill);
    }

    // 3) Part 3: prefer anchorTopic, then fill from remaining
    const p3Need = (SECTION_PLAN.find((s) => s.key === "part3") || {}).pick || 6;

    const p3Picked = [];
    const p3Tmp = p3Pool.slice();
    shuffleInPlace(p3Tmp);

    if (anchorTopic) {
      const pref = p3Tmp.filter((q) => normalizeTopic(q.topicId) === anchorTopic);
      const gotPref = sampleUnique(pref, p3Need, usedIds);
      Array.prototype.push.apply(p3Picked, gotPref);
    }

    if (p3Picked.length < p3Need) {
      const got = sampleUnique(p3Tmp, p3Need - p3Picked.length, usedIds);
      Array.prototype.push.apply(p3Picked, got);
    }

    // If P2 missing, attempt a cue-style middle prompt from remaining.
    let p2Final = p2;
    if (!p2Final) {
      const remaining = qs.filter((q) => q && q.id && !usedIds.has(String(q.id)));
      shuffleInPlace(remaining);
      p2Final = remaining.length ? remaining[0] : null;
      if (p2Final && p2Final.id) usedIds.add(String(p2Final.id));
    }

    // Build final in section order.
    const final = []
      .concat(p1Picked)
      .concat(p2Final ? [p2Final] : [])
      .concat(p3Picked);

    // If still too small (missing sections), backfill from remaining questions.
    if (final.length < targetTotal) {
      const remaining = qs.filter((q) => q && q.id && !usedIds.has(String(q.id)));
      const back = sampleUnique(remaining, targetTotal - final.length, usedIds);
      Array.prototype.push.apply(final, back);
    }

    return final.length ? final : buildFallbackSet(qs, targetTotal);
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
              : "Audio is not available in this browser. Read the sample out loud."
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
        <p style="margin:8px 0 0">Preparing your speaking prompts.</p>
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
    if (normalizeSection(q.section) !== "part2") return "";

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

    const prompt = safeTextWithBreaks(q.question || q.prompt || "Speak!");
    const sample = safeTextWithBreaks(asTextLines(q.model || ""));
    const tip = safeText(q.explanation || "Try your best.");

    const sectionKey = normalizeSection(q.section);
    const sectionLabel = sectionLabelFor(sectionKey);

    const audioText = asTextLines(q.say || q.model || "").trim();
    const hasAudio = supportsSpeech() && !!audioText;

    const topicText = q.topicId ? ` • Topic: ${safeText(q.topicId)}` : "";

    return `
      <div style="display:flex; align-items:center; justify-content:space-between; gap:10px; flex-wrap:wrap">
        <div style="font-weight:900; color: var(--muted)">${safeText(sectionLabel)} • Prompt ${n} of ${total}${topicText}</div>
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

          ${
            sample
              ? `<div style="margin-top:10px">
                  <div style="font-weight:900">Sample (optional)</div>
                  <div style="margin-top:6px; line-height:1.5">${sample}</div>
                </div>`
              : ""
          }

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
              ${safeText(q.question || q.prompt || "")}
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

    const canSave =
      !!(window.UEAH_SAVE_SCORE && typeof window.UEAH_SAVE_SCORE.save === "function") && !state.isSaving && !state.savedMsg;

    const savedNote = state.savedMsg
      ? `
        <div class="note" style="margin-top:12px">
          <strong>Saved to Profile</strong>
          <p style="margin:8px 0 0">${safeText(state.savedMsg)}</p>
          <p style="margin:8px 0 0; opacity:.9">Open <strong>Profile</strong> to view progress and your certification.</p>
        </div>
      `
      : "";

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

      <div class="actions" style="margin-top:12px; display:flex; gap:10px; flex-wrap:wrap">
        <button class="btn btn--primary" type="button" data-action="restart">Restart</button>
        <button class="btn" type="button" data-action="save" ${canSave ? "" : "disabled"} aria-label="Save completion to Profile">
          ${state.isSaving ? "Saving…" : "Save completion to Profile"}
        </button>
      </div>

      ${savedNote}
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
        p2Remaining: 0,

        // Save to Profile
        isSaving: false,
        savedMsg: ""
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
          // Only tick while on prompt screen
          if (state.status !== "prompt") return;

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

      function cleanup() {
        stopSpeech();
        stopP2Timer();
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
        cleanup();

        state.status = "loading";
        state.lastError = "";
        state.isSaving = false;
        state.savedMsg = "";
        paint();

        try {
          await ensureBankLoaded(ctx);

          const bank =
            window.UEAH_TEST_BANKS && Array.isArray(window.UEAH_TEST_BANKS[SLUG])
              ? window.UEAH_TEST_BANKS[SLUG]
              : [];

          if (!bank.length) throw new Error("Missing question bank.");

          const built = buildStructuredSet(bank);

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
        cleanup();

        state.status = "intro";
        state.questions = [];
        state.index = 0;
        state.results = Object.create(null);
        state.lastError = "";
        state.isSaving = false;
        state.savedMsg = "";
        paint();
      }

      function next() {
        cleanup();

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

        const t = asTextLines(q.say || q.model || "").trim();
        speak(t);
      }

      function buildSavePayload() {
        // Speaking is completion-marked, not auto-scored.
        // Convert Said/TryAgain/Skip into a simple percent so the profile can show progress consistently:
        // Said=1, Again=0.5, Skip=0.
        const qs = Array.isArray(state.questions) ? state.questions : [];
        let earned = 0;

        const review = qs.map((q) => {
          const r = state.results[String(q.id)] || "skip";
          const w = r === "said" ? 1 : r === "again" ? 0.5 : 0;
          earned += w;
          return { mark: r, weight: w };
        });

        const total = qs.length || 1;
        const percent = Math.round((earned / total) * 100);

        return { totalPrompts: qs.length, earned, percent, review };
      }

      async function saveCompletionToProfile() {
        if (!(window.UEAH_SAVE_SCORE && typeof window.UEAH_SAVE_SCORE.save === "function")) {
          state.savedMsg = "Save is not available.";
          paint();
          return;
        }
        if (state.isSaving || state.savedMsg) return;

        state.isSaving = true;
        paint();

        try {
          const p = buildSavePayload();
          const info = await window.UEAH_SAVE_SCORE.save({
            slug: SLUG,
            ageGroup: AGE_GROUP,
            skill: SKILL,
            timestamp: nowIso(),
            // speaking uses a derived percent
            rawCorrect: p.earned, // not really "correct", but stored for reference
            totalQuestions: p.totalPrompts,
            percent: p.percent,
            // Provide prompts as "questions" so the profile can store completion items if it wants.
            questions: (Array.isArray(state.questions) ? state.questions : []).map((q) => ({ ...q, points: 1 })),
            review: p.review
          });

          state.savedMsg = `Saved: ${info.ageLabel} • ${info.skillLabel} — ${info.normalizedScore}/100 (${info.levelTitle})`;
        } catch (e) {
          state.savedMsg = `Could not save: ${e && e.message ? e.message : "Unknown error"}`;
        } finally {
          state.isSaving = false;
          paint();
        }
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
        } else if (action === "play") {
          ev.preventDefault();
          speakCurrent();
        } else if (action === "stop") {
          ev.preventDefault();
          stopSpeech();
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
        } else if (action === "save") {
          ev.preventDefault();
          if (state.status === "summary") saveCompletionToProfile();
        }
      });

      // Cancel speech/timers when leaving the page (best effort)
      if (!host.__ueahNavHooked) {
        host.__ueahNavHooked = true;
        window.addEventListener(
          "popstate",
          () => {
            cleanup();
          },
          { passive: true }
        );
        window.addEventListener(
          "pagehide",
          () => {
            cleanup();
          },
          { passive: true }
        );
      }
    }
  });
})();
