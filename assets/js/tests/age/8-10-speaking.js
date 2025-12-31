/* assets/js/tests/age/8-10-speaking.js
   Runner: Ages 8–10 • Speaking

   Loads the question bank (assets/data/tests-8-10-speaking.js) and runs a
   teacher/caregiver-led, one-prompt-at-a-time speaking practice.

   Design:
   - Structured (Warm-up → Describe → Story → Opinion)
   - Random every run (selects a different subset inside each section)
   - Optional model audio using Speech Synthesis (TTS)
   - Teacher marks each prompt as Said / Try again / Skip

   Supported question types:
   - prompt

   Updates (this file):
   - Ensures every question has a stable id (prevents results overwriting when id missing)
   - Structured selection:
     * Fills each section to target count where possible
     * Avoids duplicates by id
     * Backfills from leftover questions if any section is short/missing
   - SpeechSynthesis: Play + Stop; cancels on navigation and between prompts
   - Robust bank loader (handles existing script; validates bank after load tick)
   - Summary includes per-section counts + compact review list
   - Optional "Save score to Profile" via window.UEAH_SAVE_SCORE.save (if available)
   - Slightly improved UI copy for 8–10 (shorter, clearer guidance)
*/

(function () {
  "use strict";

  const SLUG = "age-8-10-speaking";
  const BANK_SRC = "assets/data/tests-8-10-speaking.js";

  // Section structure (keeps the test consistent while still randomized)
  const SECTION_PLAN = [
    { key: "warmup", label: "Warm-up", pick: 4 },
    { key: "describe", label: "Describe", pick: 4 },
    { key: "story", label: "Story", pick: 3 },
    { key: "opinion", label: "Opinion", pick: 3 }
  ];

  const TARGET_TOTAL = SECTION_PLAN.reduce((sum, s) => sum + (Number(s.pick) || 0), 0);

  const store = window.UEAH_TESTS_STORE;
  if (!store || typeof store.registerRunner !== "function") {
    console.warn("[UEAH] tests store not found; runner not registered:", SLUG);
    return;
  }

  // -----------------------------
  // Utilities
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

  // Normalize section keys:
  // - lowercases
  // - removes spaces/hyphens/underscores and other non-alphanumerics
  function normalizeSectionKey(v) {
    return String(v || "")
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "");
  }

  function sectionLabelFor(key) {
    const k = normalizeSectionKey(key);
    const match = SECTION_PLAN.find((s) => s.key === k);
    return match ? match.label : "Prompt";
  }

  function ensureIds(qs) {
    return qs.map((q, idx) => {
      if (!isPlainObject(q)) return q;
      const id = q.id != null && String(q.id).trim() ? String(q.id).trim() : `${SLUG}::idx-${idx}`;
      return { ...q, id };
    });
  }

  function nowIso() {
    return new Date().toISOString();
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
      return !!fn.call(window.UEAH_TTS, t, { lang: "en-US", chunk: false });
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

        // If already present but not yet executed/loaded, listen for load/error.
        existing.addEventListener("load", validate, { once: true });
        existing.addEventListener("error", () => reject(new Error("Failed to load test bank")), { once: true });

        // In case load already happened before listeners attached, validate on next tick.
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
  // Selection (structured + random)
  // -----------------------------

  function buildStructuredSet(allQuestions) {
    const qs = Array.isArray(allQuestions) ? ensureIds(allQuestions.filter(isPlainObject)) : [];
    if (!qs.length) return [];

    const bySection = new Map();
    qs.forEach((q) => {
      const key = normalizeSectionKey(q.section);
      if (!bySection.has(key)) bySection.set(key, []);
      bySection.get(key).push(q);
    });

    const chosen = [];
    const usedIds = new Set();

    function takeFrom(pool, count) {
      const tmp = pool.slice();
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

    // Primary picks by section
    SECTION_PLAN.forEach((s) => {
      const pool = bySection.get(s.key) || [];
      takeFrom(pool, Math.max(0, Number(s.pick) || 0));
    });

    // Backfill to target length (if any section was short/missing)
    if (chosen.length < TARGET_TOTAL) {
      const leftovers = qs.filter((q) => q && q.id && !usedIds.has(String(q.id)));
      shuffleInPlace(leftovers);

      for (let i = 0; i < leftovers.length && chosen.length < TARGET_TOTAL; i++) {
        const q = leftovers[i];
        if (!q || !q.id) continue;
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
  // UI render helpers
  // -----------------------------

  function difficultyBadge(d) {
    const val = String(d || "").trim();
    if (!val) return "";
    const label = val.charAt(0).toUpperCase() + val.slice(1);
    return `<span style="padding:4px 10px; border-radius:999px; border:1px solid var(--border); background: var(--surface); font-weight:800; font-size:12px">${safeText(
      label
    )}</span>`;
  }

  function renderIntro() {
    const supportsAudio = supportsSpeech();
    const planList = SECTION_PLAN.map((s) => `<li><strong>${safeText(s.label)}</strong> (${s.pick} prompts)</li>`).join("");

    return `
      <div class="note" style="margin-top:0">
        <strong>Speaking (Ages 8–10)</strong>
        <p style="margin:8px 0 0; color: var(--muted)">
          Read each prompt. The learner answers out loud in full sentences.
        </p>

        <div class="note" style="margin-top:12px; padding:12px 14px">
          <strong>Structure</strong>
          <ul style="margin:10px 0 0; padding-left:18px; color: var(--muted)">${planList}</ul>
          <p style="margin:10px 0 0; color: var(--muted)">Tip: Ask one follow-up: <strong>Why?</strong></p>
        </div>

        <p style="margin:10px 0 0; opacity:.92">
          ${
            supportsAudio
              ? "Use <strong>🔊 Play</strong> for a model answer (if included)."
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
        <p style="margin:8px 0 0">Preparing your speaking practice.</p>
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
    if (c.encourageBecause) checks.push("Try to include ‘because’ (a reason)");
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

    const sectionLabel = sectionLabelFor(q.section);

    const prompt = safeTextWithBreaks(q.question || "Speak!");
    const model = safeTextWithBreaks(q.model || "");
    const tip = safeText(q.explanation || "Try your best.");

    const audioText = String(q.say || q.model || q.question || "").trim();
    const hasAudio = supportsSpeech() && !!audioText;

    return `
      <div style="display:flex; align-items:center; justify-content:space-between; gap:10px; flex-wrap:wrap">
        <div style="display:flex; gap:10px; align-items:center; flex-wrap:wrap">
          <div style="font-weight:900; color: var(--muted)">${safeText(sectionLabel)} • Prompt ${n} of ${total}</div>
          ${difficultyBadge(q.difficulty)}
        </div>
        <div style="display:flex; gap:8px; flex-wrap:wrap">
          <button class="btn" type="button" data-action="play" ${hasAudio ? "" : "disabled"} aria-label="Play model audio">🔊 Play</button>
          <button class="btn" type="button" data-action="stop" ${supportsSpeech() ? "" : "disabled"} aria-label="Stop audio">⏹ Stop</button>
          <button class="btn" type="button" data-action="restart" aria-label="Restart the test">Restart</button>
        </div>
      </div>

      <div style="margin-top:12px">
        <div style="border:1px solid var(--border); border-radius:16px; padding:14px; background: var(--surface2)">
          <div style="font-weight:900; font-size:18px">${prompt}</div>

          ${model ? `<div style="margin-top:10px; font-size:16px; font-weight:900">Example: ${model}</div>` : ""}

          <p style="margin:10px 0 0; color: var(--muted); font-size:13px">Tip: ${tip}</p>

          ${renderTargets(q)}
          ${renderChecks(q)}

          <div class="actions" style="margin-top:14px; display:flex; gap:10px; flex-wrap:wrap">
            <button class="btn" type="button" data-action="mark" data-mark="said" aria-label="Mark as said">✅ Said it</button>
            <button class="btn" type="button" data-action="mark" data-mark="again" aria-label="Mark as try again">🔁 Try again</button>
            <button class="btn" type="button" data-action="mark" data-mark="skip" aria-label="Skip this prompt">⏭️ Skip</button>
          </div>
        </div>
      </div>
    `;
  }

  function computeCounts(state) {
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
      const sec = normalizeSectionKey(q && q.section);

      if (r === "said") said += 1;
      else if (r === "again") again += 1;
      else skip += 1;

      if (!sectionCounts[sec]) sectionCounts[sec] = { said: 0, again: 0, skip: 0 };
      if (r === "said") sectionCounts[sec].said += 1;
      else if (r === "again") sectionCounts[sec].again += 1;
      else sectionCounts[sec].skip += 1;
    });

    return { said, again, skip, sectionCounts };
  }

  function renderSummary(state) {
    const { said, again, skip, sectionCounts } = computeCounts(state);
    const total = state.questions.length;

    const sectionLines = SECTION_PLAN.map((s) => {
      const c = sectionCounts[s.key] || { said: 0, again: 0, skip: 0 };
      return `<div style="margin-top:6px; color:var(--muted)"><strong>${safeText(s.label)}:</strong> Said ${c.said} • Try again ${c.again} • Skipped ${c.skip}</div>`;
    }).join("");

    const encouragement =
      again > 0
        ? "Repeat the ‘Try again’ prompts tomorrow. Ask one more ‘Why?’ question each time."
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
          Said: <strong>${said}</strong> • Try again: <strong>${again}</strong> • Skipped: <strong>${skip}</strong> • Total: <strong>${total}</strong>
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

      <div class="actions" style="margin-top:12px; display:flex; gap:10px; flex-wrap:wrap; align-items:center">
        <button class="btn btn--primary" type="button" data-action="restart">Restart</button>
        ${canSave ? `<button class="btn" type="button" data-action="save-score">Save score to Profile</button>` : ""}
        ${state.savedMsg ? `<span style="font-weight:800; color: var(--muted)">${safeText(state.savedMsg)}</span>` : ""}
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
        savedMsg: ""
      };

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

          // Clone and ensure stable ids
          const prepared = ensureIds(bank.filter(isPlainObject).map((q) => ({ ...q })));
          const picked = buildStructuredSet(prepared);

          if (!picked.length) throw new Error("Could not build a speaking test from the bank.");

          state.questions = picked;
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
        stopSpeech();
        const q = state.questions[state.index];
        if (!q || q.id == null) return;

        const v = String(val || "").toLowerCase();
        if (v !== "said" && v !== "again" && v !== "skip") return;

        state.results[String(q.id)] = v;
        next();
      }

      function speakCurrent() {
        stopSpeech();
        const q = state.questions[state.index];
        if (!q) return;
        const t = String(q.say || q.model || q.question || "").trim();
        if (!t) return;
        speak(t);
      }

      function saveScoreToProfile() {
        if (!window.UEAH_SAVE_SCORE || typeof window.UEAH_SAVE_SCORE.save !== "function") {
          state.savedMsg = "Save unavailable.";
          paint();
          return;
        }

        const { said, again, skip, sectionCounts } = computeCounts(state);
        const total = state.questions.length;

        // Simple speaking score model:
        // Said = 1.0, Try again = 0.5, Skipped = 0
        const raw = total ? (said + again * 0.5) / total : 0;
        const percent = Math.max(0, Math.min(100, Math.round(raw * 100)));

        const payload = {
          slug: SLUG,
          ageGroup: "8-10",
          skill: "speaking",
          at: nowIso(),

          questions: Array.isArray(state.questions) ? state.questions : [],
          resultsById: state.results,

          totalPrompts: total,
          said,
          again,
          skip,
          percent,
          sectionCounts
        };

        const res = window.UEAH_SAVE_SCORE.save(payload);

        if (res && res.ok) {
          const norm =
            res.normalizedScore != null
              ? `${Math.round(Number(res.normalizedScore))}/100`
              : res.saved && res.saved.normalizedScore != null
                ? `${Math.round(Number(res.saved.normalizedScore))}/100`
                : "";
          const level =
            res.levelTitle ||
            (res.saved && res.saved.levelTitle) ||
            (res.saved && res.saved.level && res.saved.level.title) ||
            "";
          state.savedMsg = norm || level ? `Saved (${[norm, level].filter(Boolean).join(" — ")}).` : "Saved to Profile.";
        } else {
          state.savedMsg = "Could not save.";
        }

        paint();
      }

      // Event delegation
      host.addEventListener("click", (ev) => {
        const btn = ev.target && ev.target.closest ? ev.target.closest("[data-action]") : null;
        if (!btn) return;

        const action = btn.getAttribute("data-action");

        if (action === "start" || action === "retry") {
          ev.preventDefault();
          start();
          return;
        }

        if (action === "restart") {
          ev.preventDefault();
          restart();
          return;
        }

        if (action === "play") {
          ev.preventDefault();
          speakCurrent();
          return;
        }

        if (action === "stop") {
          ev.preventDefault();
          stopSpeech();
          return;
        }

        if (action === "save-score") {
          ev.preventDefault();
          saveScoreToProfile();
          return;
        }

        if (action === "mark") {
          ev.preventDefault();
          mark(btn.getAttribute("data-mark"));
          return;
        }
      });

      // Cancel audio on navigation/unload (best effort)
      window.addEventListener(
        "popstate",
        () => {
          stopSpeech();
        },
        { passive: true }
      );

      window.addEventListener(
        "pagehide",
        () => {
          stopSpeech();
        },
        { passive: true }
      );

      paint();
    }
  });
})();
