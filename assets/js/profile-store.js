/* assets/js/profile-store.js
   UEAH Profile Store (localStorage helpers)

   Purpose:
   - Store basic user profile info (email, name, etc.)
   - Store IELTS-related results/summary (future use)
   - Safe defaults + schema versioning
*/

(function () {
  "use strict";

  const STORAGE_KEY = "UEAH_PROFILE_V1";
  const SCHEMA_VERSION = 1;

  function nowIso() {
    return new Date().toISOString();
  }

  function safeJsonParse(raw) {
    try {
      return JSON.parse(raw);
    } catch (_) {
      return null;
    }
  }

  function isPlainObject(x) {
    return !!x && typeof x === "object" && !Array.isArray(x);
  }

  function defaultProfile() {
    return {
      schemaVersion: SCHEMA_VERSION,
      updatedAt: nowIso(),

      // Basic user identity (optional)
      name: "",
      email: "",

      // Optional preferences
      locale: "",
      notes: "",

      // IELTS tracking (optional; can evolve)
      iels: {
        lastScore: null, // { overall, reading, listening, speaking, writing, at }
        history: [] // array of score entries
      }
    };
  }

  function normalizeEmail(value) {
    const s = String(value || "").trim();
    // Lowercase is standard for emails; keep empty if not provided
    return s ? s.toLowerCase() : "";
  }

  function sanitizeText(value, maxLen) {
    const s = String(value || "").trim();
    if (!maxLen) return s;
    return s.length > maxLen ? s.slice(0, maxLen) : s;
  }

  function sanitizeScoreEntry(entry) {
    if (!isPlainObject(entry)) return null;

    const overall = numberOrNull(entry.overall);
    const reading = numberOrNull(entry.reading);
    const listening = numberOrNull(entry.listening);
    const speaking = numberOrNull(entry.speaking);
    const writing = numberOrNull(entry.writing);

    const at = entry.at ? String(entry.at) : nowIso();

    // Keep entry only if at least one field exists
    if (
      overall === null &&
      reading === null &&
      listening === null &&
      speaking === null &&
      writing === null
    ) {
      return null;
    }

    return {
      overall,
      reading,
      listening,
      speaking,
      writing,
      at
    };
  }

  function numberOrNull(v) {
    if (v === null || v === undefined || v === "") return null;
    const n = Number(v);
    return Number.isFinite(n) ? n : null;
  }

  function loadRaw() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return safeJsonParse(raw);
  }

  function migrateIfNeeded(data) {
    // If future versions exist, migrate here.
    // For now, accept v1 only; otherwise reset.
    if (!isPlainObject(data)) return defaultProfile();
    if (data.schemaVersion !== SCHEMA_VERSION) return defaultProfile();
    return data;
  }

  function load() {
    const raw = loadRaw();
    const data = migrateIfNeeded(raw);

    // Ensure required shape
    const base = defaultProfile();

    const out = {
      ...base,
      ...pickKnownKeys(data, base),
      updatedAt: nowIso()
    };

    // Nested iels
    out.iels = isPlainObject(data.iels) ? { ...base.iels, ...data.iels } : { ...base.iels };
    out.iels.history = Array.isArray(out.iels.history) ? out.iels.history.slice() : [];
    out.iels.lastScore = isPlainObject(out.iels.lastScore) ? out.iels.lastScore : null;

    // Sanitize
    out.name = sanitizeText(out.name, 80);
    out.email = normalizeEmail(out.email);
    out.locale = sanitizeText(out.locale, 40);
    out.notes = sanitizeText(out.notes, 2000);

    return out;
  }

  function save(profile) {
    const base = defaultProfile();
    const p = isPlainObject(profile) ? profile : {};

    const out = {
      ...base,
      ...pickKnownKeys(p, base),
      updatedAt: nowIso()
    };

    out.name = sanitizeText(out.name, 80);
    out.email = normalizeEmail(out.email);
    out.locale = sanitizeText(out.locale, 40);
    out.notes = sanitizeText(out.notes, 2000);

    // IELTS
    out.iels = isPlainObject(p.iels) ? { ...base.iels, ...p.iels } : { ...base.iels };
    out.iels.history = Array.isArray(out.iels.history) ? out.iels.history.slice() : [];
    out.iels.lastScore = isPlainObject(out.iels.lastScore) ? out.iels.lastScore : null;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(out));
    return out;
  }

  function update(patch) {
    const current = load();
    const next = deepMerge(current, isPlainObject(patch) ? patch : {});
    return save(next);
  }

  function clear() {
    localStorage.removeItem(STORAGE_KEY);
  }

  function setProfileInfo({ name, email, locale, notes } = {}) {
    const patch = {};
    if (name !== undefined) patch.name = name;
    if (email !== undefined) patch.email = email;
    if (locale !== undefined) patch.locale = locale;
    if (notes !== undefined) patch.notes = notes;
    return update(patch);
  }

  function addIelsScore(scoreEntry) {
    const current = load();
    const entry = sanitizeScoreEntry(scoreEntry);
    if (!entry) return current;

    const history = Array.isArray(current.iels.history) ? current.iels.history.slice() : [];
    history.unshift(entry);

    // Keep history size reasonable
    const MAX = 50;
    const trimmed = history.slice(0, MAX);

    return save({
      ...current,
      iels: {
        ...current.iels,
        lastScore: entry,
        history: trimmed
      }
    });
  }

  function getIelsHistory() {
    const current = load();
    return Array.isArray(current.iels.history) ? current.iels.history.slice() : [];
  }

  function getProfile() {
    return load();
  }

  // Utilities
  function pickKnownKeys(source, template) {
    const out = {};
    Object.keys(template).forEach((k) => {
      if (k in source) out[k] = source[k];
    });
    return out;
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

  // Expose on window
  window.UEAH_PROFILE_STORE = {
    key: STORAGE_KEY,
    schemaVersion: SCHEMA_VERSION,

    getProfile,
    save,
    update,
    clear,

    setProfileInfo,

    addIelsScore,
    getIelsHistory
  };
})();
