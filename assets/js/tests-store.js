/* assets/js/tests-store.js
   Global store for Tests (metadata) + lazy-loaded runners (implementations).

   Goals:
   - No build step (plain <script> tags / dynamic injection)
   - Central list of tests for the /tests page
   - Stable slugs with upsert behavior (update existing instead of duplicates)
   - Separate “runner” registration for big test implementations that load later

   Update:
   - Auto-normalize IELTS test titles so cards show "IELTS Reading/Listening/Writing/Speaking"
     even if the stored title is a slug like "iels-reading".
*/

(function () {
  "use strict";

  const state = {
    tests: [],            // Array of test metadata objects
    bySlug: new Map(),    // slug -> index in tests[]
    runners: new Map()    // slug -> runner object/function
  };

  const TRUE_FALSE_WORDS = {
    "🐱": "cat",
    "🐶": "dog",
    "🐰": "rabbit",
    "🐟": "fish",
    "🐸": "frog",
    "🐦": "bird",
    "🍎": "apple",
    "🍌": "banana",
    "🍇": "grapes",
    "🥕": "carrot",
    "🧀": "cheese",
    "📚": "book",
    "🎒": "bag",
    "🚌": "bus",
    "🚗": "car",
    "🏫": "school",
    "🌳": "tree",
    "👟": "shoes",
    "🧦": "socks",
    "⏰": "clock",
    "⚽": "football",
    "🧸": "teddy bear",
    "⛵": "boat",
    "☀️": "sunny",
    "🌧️": "raining",
    "❄️": "cold"
  };

  function normalizeSlug(slug) {
    return String(slug || "")
      .trim()
      .toLowerCase();
  }

  function isPlainObject(v) {
    return v && typeof v === "object" && !Array.isArray(v);
  }

  function looksLikeSlug(s) {
    const str = String(s || "").trim();
    if (!str) return false;
    if (/\s/.test(str)) return false;
    if (!/[-_]/.test(str)) return false;
    return /^[a-z0-9_-]+$/i.test(str);
  }

  function inferSkillFromSlug(slug) {
    const s = normalizeSlug(slug);
    if (s.includes("reading")) return "reading";
    if (s.includes("listening")) return "listening";
    if (s.includes("writing")) return "writing";
    if (s.includes("speaking")) return "speaking";
    return "";
  }

  function humanizeSlug(s) {
    return String(s || "")
      .replaceAll("_", " ")
      .replaceAll("-", " ")
      .trim()
      .split(/\s+/)
      .map((w) => (w ? w.charAt(0).toUpperCase() + w.slice(1) : w))
      .join(" ");
  }

  function isIELTSTestSlug(slug) {
    const s = normalizeSlug(slug);
    return s.startsWith("ielts-") || s.startsWith("iels-");
  }

  function defaultTitleForSlug(slug) {
    const s = normalizeSlug(slug);
    const skill = inferSkillFromSlug(s);

    if (isIELTSTestSlug(s) && skill) {
      return `IELTS ${skill.charAt(0).toUpperCase() + skill.slice(1)}`;
    }

    return humanizeSlug(slug);
  }

  function normalizeTest(test, slug) {
    const out = { ...test, slug };

    // Default subtitle
    if (!out.subtitle) out.subtitle = "Test your ability";

    // Infer skill for IELTS tests if missing
    if (!out.skill) {
      const inferred = inferSkillFromSlug(slug);
      if (inferred) out.skill = inferred;
    }

    // Fix titles that are missing or slug-like (e.g., "iels-reading")
    const t = String(out.title || "").trim();
    if (!t || t.toLowerCase() === slug.toLowerCase() || looksLikeSlug(t)) {
      out.title = defaultTitleForSlug(slug);
    }

    return out;
  }

  function compactText(value) {
    return String(value == null ? "" : value)
      .trim()
      .toLowerCase()
      .replace(/\s+/g, " ");
  }

  function ageFromSlug(slug) {
    const s = normalizeSlug(slug);
    if (s.startsWith("age-0-3-")) return "0-3";
    if (s.startsWith("age-4-7-")) return "4-7";
    if (s.startsWith("age-8-10-")) return "8-10";
    if (s.startsWith("age-11-12-")) return "11-12";
    if (s.startsWith("age-13-18-")) return "13-18";
    if (s.startsWith("iels-") || s.startsWith("ielts-")) return "ielts";
    return "";
  }

  function skillFromSlug(slug) {
    return inferSkillFromSlug(slug);
  }

  function isGenericListeningTruthContext(q) {
    const context = compactText(q && q.context);
    if (!context) return true;
    return context === "listen to the short statement." || context === "listen to the short statement";
  }

  function shouldDropQuestion(q, slug) {
    if (!isPlainObject(q)) return true;

    const age = ageFromSlug(slug);
    const skill = skillFromSlug(slug);
    const type = compactText(q.type);
    const question = compactText(q.question || q.prompt);
    const model = compactText(q.model);
    const say = compactText(q.say);
    const explanation = compactText(q.explanation);
    const blob = [question, model, say, explanation].join(" ");

    // Remove generated IELTS-style scaffolding that was appended to child banks.
    if (
      (age !== "13-18" && age !== "ielts" && /sample answer|clear opinion|support your idea/.test(blob)) ||
      (skill === "speaking" && /sample answer|clear opinion/.test([model, say].join(" ")))
    ) {
      return true;
    }

    // A true/false item must provide something to verify against. A bare spoken
    // statement that is always marked True is not a meaningful question.
    if (type.includes("truefalse")) {
      const hasPicture = !!compactText(q.picture || q.image || q.look);
      const hasReadableReference = !!compactText(q.text || q.passage || q.reference);
      if (skill === "listening" && !hasPicture && !hasReadableReference && isGenericListeningTruthContext(q)) {
        return true;
      }
      if (skill !== "listening" && !hasPicture && !hasReadableReference && !compactText(q.context)) {
        return true;
      }
    }

    // Fill-in questions need the actual sentence or passage, not only the answer.
    if (type.includes("fill") || /missing word/.test(question)) {
      const hasContext =
        !!compactText(q.context || q.passage || q.sentence || q.text) ||
        /_{2,}|\bblank\b/.test(String(q.question || ""));
      if (!hasContext) return true;
    }

    if (Array.isArray(q.options) && (q.answer == null || q.options[Number(q.answer)] == null)) {
      return true;
    }

    return false;
  }

  function normalizeTrueFalseAnswer(q) {
    if (!isPlainObject(q)) return q;
    const type = compactText(q.type);
    if (!type.includes("truefalse") || !Array.isArray(q.options)) return q;

    const picture = String(q.picture || "").trim();
    const target = TRUE_FALSE_WORDS[picture];
    if (!target) return q;

    const said = compactText(q.say);
    if (!said) return q;

    const shouldBeTrue = said.includes(target);
    const trueIndex = q.options.findIndex((opt) => compactText(opt) === "true");
    const falseIndex = q.options.findIndex((opt) => compactText(opt) === "false");
    if (trueIndex < 0 || falseIndex < 0) return q;

    return {
      ...q,
      answer: shouldBeTrue ? trueIndex : falseIndex
    };
  }

  function sanitizeQuestionsForBank(slug, questions) {
    const s = normalizeSlug(slug);
    const age = ageFromSlug(s);
    const skill = skillFromSlug(s);
    const seenId = new Set();
    const seenQuestion = new Set();
    const seenAudio = new Set();
    const out = [];

    (Array.isArray(questions) ? questions : []).forEach((raw, idx) => {
      if (shouldDropQuestion(raw, s)) return;

      const q = normalizeTrueFalseAnswer(raw);
      const id = String(q.id != null ? q.id : `${s}::${idx}`).trim();
      if (seenId.has(id)) return;

      const questionKey = compactText(q.question || q.prompt);
      const audioKey = compactText(q.say || q.model);
      const semanticKey = [questionKey, audioKey].filter(Boolean).join(" :: ");

      if (semanticKey && seenQuestion.has(semanticKey)) return;
      if (skill === "listening" && age !== "13-18" && age !== "ielts" && audioKey && seenAudio.has(audioKey)) return;

      seenId.add(id);
      if (semanticKey) seenQuestion.add(semanticKey);
      if (audioKey) seenAudio.add(audioKey);
      out.push({ ...q, id });
    });

    return out;
  }

  function installBankSanitizer() {
    const existing = window.UEAH_TEST_BANKS;
    if (existing && existing.__ueahSanitizedProxy) return;

    const target = isPlainObject(existing) ? existing : {};
    const proxy = new Proxy(target, {
      set(obj, prop, value) {
        const key = String(prop);
        obj[prop] = Array.isArray(value) ? sanitizeQuestionsForBank(key, value) : value;
        return true;
      }
    });

    Object.defineProperty(proxy, "__ueahSanitizedProxy", {
      value: true,
      enumerable: false
    });

    Object.keys(target).forEach((key) => {
      if (Array.isArray(target[key])) target[key] = sanitizeQuestionsForBank(key, target[key]);
    });

    window.UEAH_TEST_BANKS = proxy;
  }

  function upsertTest(test) {
    if (!isPlainObject(test)) return;

    const slug = normalizeSlug(test.slug);
    if (!slug) return;

    if (state.bySlug.has(slug)) {
      const idx = state.bySlug.get(slug);
      const prev = state.tests[idx] || {};

      // Merge fields, then normalize (keeps stable slug)
      const merged = { ...prev, ...test, slug };
      state.tests[idx] = normalizeTest(merged, slug);
    } else {
      const idx = state.tests.length;
      state.tests.push(normalizeTest({ ...test, slug }, slug));
      state.bySlug.set(slug, idx);
    }
  }

  /**
   * Add tests metadata to the store.
   * Accepts:
   *   - { tests: [ ... ] }
   *   - [ ... ]
   */
  function add(input) {
    if (Array.isArray(input)) {
      input.forEach(upsertTest);
      return;
    }

    if (isPlainObject(input) && Array.isArray(input.tests)) {
      input.tests.forEach(upsertTest);
    }
  }

  function getAll() {
    return state.tests.slice();
  }

  function getTest(slug) {
    const s = normalizeSlug(slug);
    if (!state.bySlug.has(s)) return null;
    return state.tests[state.bySlug.get(s)] || null;
  }

  /**
   * Register a runner (implementation) for a given test slug.
   *
   * runner can be:
   *   - an object: { render(ctx) => htmlString, afterRender?(rootEl, ctx) }
   *   - a function: (ctx) => htmlString
   *
   * Note:
   * - This does NOT auto-load modules; it just registers what a module provides.
   * - If the test metadata doesn't exist yet, we create a minimal placeholder.
   */
  function registerRunner(slug, runner) {
    const s = normalizeSlug(slug);
    if (!s) return;

    if (typeof runner !== "function" && !isPlainObject(runner)) return;

    // Ensure test exists (helps when modules load before metadata)
    if (!state.bySlug.has(s)) {
      upsertTest({
        slug: s,
        title: s, // will be normalized into "IELTS X" when applicable
        subtitle: "Test your ability",
        skill: inferSkillFromSlug(s) || ""
      });
    } else {
      // If it exists, still normalize (in case older placeholder had slug-title)
      const existing = getTest(s);
      if (existing) upsertTest(existing);
    }

    state.runners.set(s, runner);
  }

  function getRunner(slug) {
    const s = normalizeSlug(slug);
    if (!s) return null;
    return state.runners.get(s) || null;
  }

  function hasRunner(slug) {
    const s = normalizeSlug(slug);
    return !!(s && state.runners.has(s));
  }

  // Optional helper for consumers that want a safe render call.
  function render(slug, ctx) {
    const runner = getRunner(slug);
    if (!runner) return null;

    if (typeof runner === "function") {
      return { html: runner(ctx), afterRender: null };
    }

    const html = typeof runner.render === "function" ? runner.render(ctx) : "";
    const afterRender = typeof runner.afterRender === "function" ? runner.afterRender : null;
    return { html, afterRender };
  }

  window.UEAH_TESTS_STORE = {
    add,
    getAll,
    getTest,
    upsertTest,        // exposed for convenience (optional)
    registerRunner,
    getRunner,
    hasRunner,
    render             // optional convenience wrapper
  };

  installBankSanitizer();
})();
