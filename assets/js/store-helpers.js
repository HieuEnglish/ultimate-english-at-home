/* assets/js/store-helpers.js
   Thin wrappers around global stores + safe fallbacks.

   Uses (if present):
   - window.UEAH_RESOURCES_STORE (assets/js/resources-store.js)
   - window.UEAH_TESTS_STORE (assets/js/tests-store.js)
   Optional:
   - window.UEAH_PROFILE_STORE (assets/js/profile-store.js)
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
