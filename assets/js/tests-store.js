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
})();
