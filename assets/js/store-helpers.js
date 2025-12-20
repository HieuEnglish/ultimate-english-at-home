/* assets/js/store-helpers.js
   Thin wrappers around global stores + safe fallbacks.

   Uses (if present):
   - window.UEAH_RESOURCES_STORE (assets/js/resources-store.js)
   - window.UEAH_TESTS_STORE (assets/js/tests-store.js)
   Optional:
   - window.UEAH_PROFILE_STORE (assets/js/profile-store.js)
   - window.UEAH_FAVOURITES_STORE (assets/js/favourites-store.js)
   - window.UEAH_CONTACT (assets/js/contact.js)

   NOTE: This app is static (GitHub Pages) with no build step.
   Keep these helpers dependency-free and browser-safe.
*/

// -----------------------------
// Global store accessors
// -----------------------------

function getResourcesStore() {
  const s = typeof window !== "undefined" ? window.UEAH_RESOURCES_STORE : null;
  return s && typeof s === "object" ? s : null;
}

function getTestsStore() {
  const s = typeof window !== "undefined" ? window.UEAH_TESTS_STORE : null;
  return s && typeof s === "object" ? s : null;
}

function getProfileStore() {
  const s = typeof window !== "undefined" ? window.UEAH_PROFILE_STORE : null;
  return s && typeof s === "object" ? s : null;
}

function getFavouritesStore() {
  const s = typeof window !== "undefined" ? window.UEAH_FAVOURITES_STORE : null;
  return s && typeof s === "object" ? s : null;
}

function getContactHelpers() {
  const s = typeof window !== "undefined" ? window.UEAH_CONTACT : null;
  return s && (typeof s === "object" || typeof s === "function") ? s : null;
}

// -----------------------------
// Resources store wrappers
// -----------------------------

/**
 * Ensures a given age group has its resources loaded.
 * Mirrors previous behaviour in app.js.
 */
export async function ensureAgeLoaded(age, opts = {}) {
  const STORE = getResourcesStore();
  if (!STORE) return;

  if (typeof STORE.ensureAgeLoaded === "function") {
    // resources-store.js can use basePath to resolve JSON safely.
    await STORE.ensureAgeLoaded(age, { basePath: opts.basePath || "" });
  }
}

export function storeGetPack(age, skill) {
  const STORE = getResourcesStore();
  if (!STORE) return null;

  if (typeof STORE.getPack === "function") return STORE.getPack(age, skill);

  if (STORE.packs && typeof STORE.packs === "object") {
    const key = `${age}/${skill}`;
    return STORE.packs[key] || null;
  }

  return null;
}

export function storeGetResources(age, skill) {
  const STORE = getResourcesStore();
  if (!STORE) return [];

  if (typeof STORE.getResourcesFor === "function") return STORE.getResourcesFor(age, skill) || [];

  if (Array.isArray(STORE.resources)) {
    return STORE.resources.filter((r) => r && r.age === age && r.skill === skill);
  }

  return [];
}

export function storeGetResource(age, skill, slug) {
  const STORE = getResourcesStore();
  if (!STORE) return null;

  if (typeof STORE.getResource === "function") return STORE.getResource(age, skill, slug);

  const list = storeGetResources(age, skill);
  return list.find((r) => r && r.slug === slug) || null;
}

/**
 * Keep featured “Best Set” at the end.
 * Useful for consistent UI sorting.
 */
export function normalizeResourcesList(list) {
  const items = Array.isArray(list) ? itemsSafeCopy(list) : [];
  items.sort((a, b) => {
    const af = a && a.isBestSet ? 1 : 0;
    const bf = b && b.isBestSet ? 1 : 0;
    if (af !== bf) return af - bf;
    return String(a && a.title ? a.title : "").localeCompare(String(b && b.title ? b.title : ""));
  });
  return items;
}

function itemsSafeCopy(list) {
  try {
    return list.slice();
  } catch (_) {
    return Array.isArray(list) ? Array.from(list) : [];
  }
}

// -----------------------------
// Tests store wrappers
// -----------------------------

export function testsGetAll() {
  const TESTS_STORE = getTestsStore();
  if (!TESTS_STORE) return [];

  if (typeof TESTS_STORE.getAll === "function") return TESTS_STORE.getAll() || [];
  if (Array.isArray(TESTS_STORE.tests)) return TESTS_STORE.tests.slice();
  return [];
}

export function testsGetTest(slug) {
  const TESTS_STORE = getTestsStore();
  if (!TESTS_STORE) return null;

  if (typeof TESTS_STORE.getTest === "function") return TESTS_STORE.getTest(slug);
  const list = testsGetAll();
  return list.find((t) => t && String(t.slug || "") === String(slug || "")) || null;
}

export function testsHasRunner(slug) {
  const TESTS_STORE = getTestsStore();
  if (!TESTS_STORE) return false;

  if (typeof TESTS_STORE.hasRunner === "function") return !!TESTS_STORE.hasRunner(slug);
  if (typeof TESTS_STORE.getRunner === "function") return !!TESTS_STORE.getRunner(slug);
  return false;
}

// -----------------------------
// Script loader (for tests)
// -----------------------------

const loadedScriptPromises = new Map();

function defaultAssetHref(assetPath, basePath = "") {
  if (!assetPath) return "";
  const s = String(assetPath);

  // Allow full URLs if ever needed
  if (s.startsWith("http://") || s.startsWith("https://")) return s;

  let p = s;
  if (!p.startsWith("/")) p = "/" + p;
  return `${basePath || ""}${p}`;
}

/**
 * Load a script at most once and cache the promise.
 * Useful for tests that are shipped as separate JS files.
 */
export function loadScriptOnce(src, opts = {}) {
  const basePath = opts.basePath || "";
  const assetHref =
    typeof opts.assetHref === "function" ? opts.assetHref : (p) => defaultAssetHref(p, basePath);

  const url = assetHref(src);
  if (!url) return Promise.reject(new Error("Missing script src"));
  if (loadedScriptPromises.has(url)) return loadedScriptPromises.get(url);

  const p = new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = url;
    s.defer = true;
    s.onload = () => resolve(true);
    s.onerror = () => reject(new Error(`Failed to load script: ${url}`));
    document.head.appendChild(s);
  });

  loadedScriptPromises.set(url, p);
  return p;
}

export async function ensureTestRunnerLoaded(test, opts = {}) {
  if (!test) return;
  if (testsHasRunner(test.slug)) return;
  if (!test.module) return;
  await loadScriptOnce(test.module, opts);
}

// -----------------------------
// Profile helpers (fallback to localStorage)
// -----------------------------

export const PROFILE_KEY = "UEAH_PROFILE_V1";

export function profileGet() {
  const PROFILE_STORE = getProfileStore();
  if (PROFILE_STORE && typeof PROFILE_STORE.get === "function") {
    try {
      return PROFILE_STORE.get() || null;
    } catch (_) {
      return null;
    }
  }

  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (_) {
    return null;
  }
}

export function profileSet(data) {
  const PROFILE_STORE = getProfileStore();
  if (PROFILE_STORE && typeof PROFILE_STORE.set === "function") {
    try {
      PROFILE_STORE.set(data);
      return true;
    } catch (_) {
      // fall through
    }
  }

  try {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(data || {}));
    return true;
  } catch (_) {
    return false;
  }
}

export function profileClear() {
  const PROFILE_STORE = getProfileStore();
  if (PROFILE_STORE && typeof PROFILE_STORE.clear === "function") {
    try {
      PROFILE_STORE.clear();
      return true;
    } catch (_) {
      // fall through
    }
  }

  try {
    localStorage.removeItem(PROFILE_KEY);
    return true;
  } catch (_) {
    return false;
  }
}

function profileExportDataSafe() {
  const PROFILE_STORE = getProfileStore();
  if (PROFILE_STORE && typeof PROFILE_STORE.exportData === "function") {
    try {
      return PROFILE_STORE.exportData();
    } catch (_) {
      // fall through
    }
  }

  const p = profileGet() || {};
  return {
    schemaVersion: 1,
    updatedAt: (p && p.updatedAt) || new Date().toISOString(),
    profile: p
  };
}

function profileImportDataSafe(payload, opts = {}) {
  const PROFILE_STORE = getProfileStore();
  if (PROFILE_STORE && typeof PROFILE_STORE.importData === "function") {
    try {
      return PROFILE_STORE.importData(payload, opts);
    } catch (_) {
      // fall through
    }
  }

  // Fallback: merge or replace into stored raw object
  const mode = opts && opts.mode === "replace" ? "replace" : "merge";

  let incoming = payload;
  if (typeof payload === "string") {
    try {
      incoming = JSON.parse(payload);
    } catch (_) {
      return { ok: false, reason: "Invalid JSON" };
    }
  }

  const incomingProfile =
    incoming && typeof incoming === "object" && incoming.profile && typeof incoming.profile === "object"
      ? incoming.profile
      : incoming;

  const current = profileGet() || {};
  const next = mode === "replace" ? (incomingProfile || {}) : deepMerge(current, incomingProfile || {});
  const ok = profileSet(next);
  return ok ? { ok: true, mode } : { ok: false, reason: "Failed to save profile" };
}

// -----------------------------
// Favourites helpers (fallback to localStorage)
// -----------------------------

export const FAVOURITES_KEY = "UEAH_FAVOURITES_V1";

export function favouritesGetAll() {
  const FAV_STORE = getFavouritesStore();
  if (FAV_STORE && typeof FAV_STORE.getAll === "function") {
    try {
      return FAV_STORE.getAll() || [];
    } catch (_) {
      return [];
    }
  }

  // Fallback: best-effort read legacy-ish storage
  try {
    const raw = localStorage.getItem(FAVOURITES_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!parsed) return [];
    if (Array.isArray(parsed.items)) return parsed.items.slice();
    if (parsed.items && typeof parsed.items === "object") return Object.values(parsed.items);
    return [];
  } catch (_) {
    return [];
  }
}

export function favouritesHas(age, skill, slug) {
  const FAV_STORE = getFavouritesStore();
  if (FAV_STORE && typeof FAV_STORE.has === "function") {
    try {
      return !!FAV_STORE.has(age, skill, slug);
    } catch (_) {
      return false;
    }
  }

  const key = `${String(age || "").trim()}|${String(skill || "").trim()}|${String(slug || "").trim()}`;
  const list = favouritesGetAll();
  return list.some((x) => x && String(x.key || "") === key);
}

export function favouritesToggle(snapshot) {
  const FAV_STORE = getFavouritesStore();
  if (FAV_STORE && typeof FAV_STORE.toggle === "function") {
    try {
      return FAV_STORE.toggle(snapshot);
    } catch (_) {
      return { ok: false, on: false, key: "" };
    }
  }

  // Fallback: naive toggle in array storage
  try {
    const list = favouritesGetAll();
    const snap = snapshot && typeof snapshot === "object" ? snapshot : {};
    const key =
      String(snap.key || "").trim() ||
      `${String(snap.age || "").trim()}|${String(snap.skill || "").trim()}|${String(snap.slug || "").trim()}`;

    if (!key || key === "||") return { ok: false, on: false, key: "" };

    const idx = list.findIndex((x) => x && String(x.key || "") === key);
    if (idx >= 0) list.splice(idx, 1);
    else list.unshift({ ...snap, key, addedAt: snap.addedAt || new Date().toISOString() });

    localStorage.setItem(
      FAVOURITES_KEY,
      JSON.stringify({ schemaVersion: 1, updatedAt: new Date().toISOString(), items: list })
    );

    try {
      window.dispatchEvent(
        new CustomEvent("ueah:favourites-changed", { detail: { count: list.length } })
      );
    } catch (_) {
      // ignore
    }

    return { ok: true, on: idx < 0, key };
  } catch (_) {
    return { ok: false, on: false, key: "" };
  }
}

export function favouritesRemoveByKey(key) {
  const FAV_STORE = getFavouritesStore();
  if (FAV_STORE && typeof FAV_STORE.removeByKey === "function") {
    try {
      return !!FAV_STORE.removeByKey(key);
    } catch (_) {
      return false;
    }
  }

  try {
    const list = favouritesGetAll();
    const k = String(key || "").trim();
    const next = list.filter((x) => x && String(x.key || "") !== k);
    localStorage.setItem(
      FAVOURITES_KEY,
      JSON.stringify({ schemaVersion: 1, updatedAt: new Date().toISOString(), items: next })
    );

    try {
      window.dispatchEvent(
        new CustomEvent("ueah:favourites-changed", { detail: { count: next.length } })
      );
    } catch (_) {
      // ignore
    }

    return next.length !== list.length;
  } catch (_) {
    return false;
  }
}

export function favouritesExportData() {
  const FAV_STORE = getFavouritesStore();
  if (FAV_STORE && typeof FAV_STORE.exportData === "function") {
    try {
      return FAV_STORE.exportData();
    } catch (_) {
      // fall through
    }
  }

  const items = favouritesGetAll();
  return { schemaVersion: 1, updatedAt: new Date().toISOString(), items };
}

export function favouritesImportData(payload, opts = {}) {
  const FAV_STORE = getFavouritesStore();
  if (FAV_STORE && typeof FAV_STORE.importData === "function") {
    try {
      return FAV_STORE.importData(payload, opts);
    } catch (_) {
      return { ok: false, reason: "Import failed" };
    }
  }

  // Fallback: store the exported items array; merge/replace by key
  const mode = opts && opts.mode === "replace" ? "replace" : "merge";

  let incoming = payload;
  if (typeof payload === "string") {
    try {
      incoming = JSON.parse(payload);
    } catch (_) {
      return { ok: false, reason: "Invalid JSON" };
    }
  }

  const incomingItems = incoming && typeof incoming === "object" ? incoming.items : null;
  const list = Array.isArray(incomingItems) ? incomingItems.slice() : [];

  const current = favouritesGetAll();
  const map = {};

  if (mode === "merge") {
    current.forEach((x) => {
      if (x && x.key) map[String(x.key)] = x;
    });
  }

  list.forEach((x) => {
    if (!x) return;
    const k = String(x.key || "").trim();
    if (!k) return;
    map[k] = x;
  });

  const merged = Object.keys(map).map((k) => map[k]);

  try {
    localStorage.setItem(
      FAVOURITES_KEY,
      JSON.stringify({ schemaVersion: 1, updatedAt: new Date().toISOString(), items: merged })
    );

    try {
      window.dispatchEvent(
        new CustomEvent("ueah:favourites-changed", { detail: { count: merged.length } })
      );
    } catch (_) {
      // ignore
    }

    return { ok: true, mode, count: merged.length };
  } catch (_) {
    return { ok: false, reason: "Failed to save favourites" };
  }
}

// -----------------------------
// Sync helpers (profile + favourites)
// -----------------------------

function nowIsoSafe() {
  return new Date().toISOString();
}

/**
 * Build a single sync payload (for export to file).
 * Shape is stable for cross-device import.
 */
export function syncExport() {
  return {
    app: "UEAH",
    type: "sync",
    schemaVersion: 1,
    exportedAt: nowIsoSafe(),
    profile: profileExportDataSafe(),
    favourites: favouritesExportData()
  };
}

/**
 * Validate and import a sync payload.
 * - mode: "merge" | "replace" (default merge)
 * - favourites: honours mode (merge union-by-key is recommended)
 * - profile: merge by default (replace if mode === "replace")
 */
export function syncImport(syncJson, opts = {}) {
  const mode = opts && opts.mode === "replace" ? "replace" : "merge";

  let incoming = syncJson;
  if (typeof syncJson === "string") {
    try {
      incoming = JSON.parse(syncJson);
    } catch (_) {
      return { ok: false, reason: "Invalid JSON" };
    }
  }

  if (!incoming || typeof incoming !== "object") return { ok: false, reason: "Invalid payload shape" };

  // Soft validation (don’t hard-block older files; just prefer correct metadata)
  if (incoming.app && String(incoming.app) !== "UEAH") {
    return { ok: false, reason: "Not a UEAH sync file" };
  }
  if (incoming.type && String(incoming.type) !== "sync") {
    return { ok: false, reason: "Not a sync payload" };
  }

  const results = { ok: true, mode, profile: null, favourites: null };

  if (incoming.profile) {
    results.profile = profileImportDataSafe(incoming.profile, { mode });
    if (!results.profile || results.profile.ok === false) results.ok = false;
  }

  if (incoming.favourites) {
    results.favourites = favouritesImportData(incoming.favourites, { mode });
    if (!results.favourites || results.favourites.ok === false) results.ok = false;
  }

  return results;
}

// -----------------------------
// Contact helpers (fallback to mailto)
// -----------------------------

export const CONTACT_TO = "hieuenglishapps@gmail.com";

function buildMailto(to, subject, body) {
  const _to = encodeURIComponent(String(to || ""));
  const qs = new URLSearchParams();
  if (subject) qs.set("subject", String(subject));
  if (body) qs.set("body", String(body));
  const query = qs.toString();
  return query ? `mailto:${_to}?${query}` : `mailto:${_to}`;
}

function safePageUrl() {
  try {
    return typeof window !== "undefined" && window.location ? String(window.location.href || "") : "";
  } catch (_) {
    return "";
  }
}

/**
 * Send a contact message.
 * - Prefers window.UEAH_CONTACT.send if available.
 * - Falls back to mailto when contact.js is unavailable or errors.
 *
 * Payload shape expected by views/contact.js:
 *   { fromEmail, subject, message }
 */
export function contactSend(payload) {
  const data = payload && typeof payload === "object" ? payload : {};
  const fromEmail = String(data.fromEmail || "").trim();
  const subject = String(data.subject || "").trim() || "UEAH Contact";
  const message = String(data.message || "").trim();

  const CONTACT = getContactHelpers();

  // Prefer contact.js helper if present.
  // Expected: window.UEAH_CONTACT.send({ to, fromEmail, subject, message })
  if (CONTACT && typeof CONTACT === "object" && typeof CONTACT.send === "function") {
    try {
      return CONTACT.send({ to: CONTACT_TO, fromEmail, subject, message });
    } catch (_) {
      // Fall back to mailto below.
    }
  }

  // Fallback: mailto (always usable on static hosting)
  const url = safePageUrl();
  const bodyLines = [
    message || "",
    "",
    "---",
    `From: ${fromEmail || "Not provided"}`,
  ];
  if (url) bodyLines.push(`Page: ${url}`);
  const body = bodyLines.join("\n");

  try {
    window.location.href = buildMailto(CONTACT_TO, subject, body);
    return true;
  } catch (_) {
    return false;
  }
}

// -----------------------------
// Small shared utility
// -----------------------------

function isPlainObject(x) {
  return !!x && typeof x === "object" && !Array.isArray(x);
}

function deepMerge(target, patch) {
  if (!isPlainObject(target) || !isPlainObject(patch)) return target;
  const out = { ...target };
  Object.keys(patch).forEach((k) => {
    const tv = out[k];
    const pv = patch[k];
    if (isPlainObject(tv) && isPlainObject(pv)) out[k] = deepMerge(tv, pv);
    else out[k] = pv;
  });
  return out;
}
