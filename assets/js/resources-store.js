/* assets/js/resources-store.js
   Lightweight global store + loader for per-age resource data files.

   Design goals:
   - Keep index payload small.
   - Lazy-load only the age group data file needed for the current route.
   - Stable slugs: dedupe by (age + skill + slug). New data updates existing entries.
   - No build step; works on GitHub Pages with the existing basePath logic in app.js.
*/
(function () {
  // Keep in sync with assets/js/constants.js
  const AGE_GROUPS = ["0-3", "4-7", "8-10", "11-12", "13-18", "ielts"];

  const state = {
    packs: {}, // key: "age/skill" => pack meta
    resources: [], // array of resource items
    // fast lookup: "age|skill|slug" => index in resources[]
    byKey: new Map(),
    // loader tracking
    loadedAges: new Set(),
    loadingAges: new Map() // age => Promise
  };

  function makeKey(age, skill, slug) {
    return `${age}|${skill}|${slug}`;
  }

  function normalizeAge(age) {
    return String(age || "").trim();
  }

  function normalizeSkill(skill) {
    return String(skill || "").trim().toLowerCase();
  }

  function normalizeSlug(slug) {
    return String(slug || "").trim().toLowerCase();
  }

  function add(input) {
    if (!input || typeof input !== "object") return;

    // Merge packs
    if (input.packs && typeof input.packs === "object") {
      Object.keys(input.packs).forEach((k) => {
        state.packs[k] = input.packs[k];
      });
    }

    // Merge resources with dedupe/update behavior
    const arr = Array.isArray(input.resources) ? input.resources : [];
    arr.forEach((r) => {
      if (!r || typeof r !== "object") return;

      const age = normalizeAge(r.age);
      const skill = normalizeSkill(r.skill);
      const slug = normalizeSlug(r.slug);

      if (!age || !skill || !slug) return;

      const key = makeKey(age, skill, slug);

      if (state.byKey.has(key)) {
        const idx = state.byKey.get(key);
        // Update existing entry in-place (keeps stable ordering unless file changes it)
        state.resources[idx] = { ...state.resources[idx], ...r };
      } else {
        const idx = state.resources.length;
        state.resources.push(r);
        state.byKey.set(key, idx);
      }
    });
  }

  function getPack(age, skill) {
    const a = normalizeAge(age);
    const s = normalizeSkill(skill);
    return state.packs[`${a}/${s}`] || null;
  }

  function getResourcesFor(age, skill) {
    const a = normalizeAge(age);
    const s = normalizeSkill(skill);
    return state.resources.filter((r) => normalizeAge(r.age) === a && normalizeSkill(r.skill) === s);
  }

  function getResource(age, skill, slug) {
    const a = normalizeAge(age);
    const s = normalizeSkill(skill);
    const sl = normalizeSlug(slug);
    const key = makeKey(a, s, sl);
    if (!state.byKey.has(key)) return null;
    return state.resources[state.byKey.get(key)] || null;
  }

  function ensureAgeLoaded(age, opts) {
    const a = normalizeAge(age);
    if (!AGE_GROUPS.includes(a)) return Promise.resolve(false);

    if (state.loadedAges.has(a)) return Promise.resolve(true);
    if (state.loadingAges.has(a)) return state.loadingAges.get(a);

    const basePath = (opts && opts.basePath) || "";
    const src = `${basePath}/assets/js/resources/${a}.js`;

    const p = new Promise((resolve) => {
      const s = document.createElement("script");
      s.defer = true;
      s.src = src;
      s.onload = () => {
        state.loadedAges.add(a);
        state.loadingAges.delete(a);
        resolve(true);
      };
      s.onerror = () => {
        // Don't block the app if a file is missing; resolve false.
        state.loadingAges.delete(a);
        resolve(false);
      };
      document.head.appendChild(s);
    });

    state.loadingAges.set(a, p);
    return p;
  }

  function isAgeLoaded(age) {
    return state.loadedAges.has(normalizeAge(age));
  }

  // Expose store
  window.UEAH_RESOURCES_STORE = {
    add,
    getPack,
    getResourcesFor,
    getResource,
    ensureAgeLoaded,
    isAgeLoaded
  };
})();
