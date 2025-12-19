/* assets/js/tests-store.js
   Global store for Tests (metadata) + lazy-loaded runners (implementations).

   Goals:
   - No build step (plain <script> tags / dynamic injection)
   - Central list of tests for the /tests page
   - Stable slugs with upsert behavior (update existing instead of duplicates)
   - Separate “runner” registration for big test implementations that load later
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

  function upsertTest(test) {
    if (!isPlainObject(test)) return;

    const slug = normalizeSlug(test.slug);
    if (!slug) return;

    if (state.bySlug.has(slug)) {
      const idx = state.bySlug.get(slug);
      const prev = state.tests[idx] || {};
      // Merge new fields in, keep stable slug.
      state.tests[idx] = { ...prev, ...test, slug };
    } else {
      const idx = state.tests.length;
      state.tests.push({ ...test, slug });
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
      upsertTest({ slug: s, title: s, subtitle: "Test your ability" });
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
