/* assets/js/profile-store.js
   UEAH Profile Store (localStorage helpers)

   Purpose:
   - Store basic user profile info (email, name, etc.)
   - Store IELTS-related results/summary (future use)
   - Safe defaults + schema versioning
   - Compatibility: get()/set() for store-helpers
   - Export/import for cross-device sync
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

  function dispatchProfileChanged() {
    try {
      window.dispatchEvent(
        new CustomEvent("ueah:profile-changed", { detail: { at: nowIso() } })
      );
    } catch (_) {
      // ignore
    }
  }

  function defaultProfile() {
    return {
      schemaVersion: SCHEMA_VERSION,
      updatedAt: nowIso(),

      // Basic user identity (optional)
      name: "",
      email: "",

      // Optional preferences / goals
      targetScore: "",

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
    return s ? s.toLowerCase() : "";
  }

  function sanitizeText(value, maxLen) {
    const s = String(value || "").trim();
    if (!maxLen) return s;
    return s.length > maxLen ? s.slice(0, maxLen) : s;
  }

  function numberOrNull(v) {
    if (v === null || v === undefined || v === "") return null;
    const n = Number(v);
    return Number.isFinite(n) ? n : null;
  }

  function sanitizeScoreEntry(entry) {
    if (!isPlainObject(entry)) return null;

    const overall = numberOrNull(entry.overall);
    const reading = numberOrNull(entry.reading);
    const listening = numberOrNull(entry.listening);
    const speaking = numberOrNull(entry.speaking);
    const writing = numberOrNull(entry.writing);

    const at = entry.at ? String(entry.at) : nowIso();

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

  function loadRaw() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      return safeJsonParse(raw);
    } catch (_) {
      return null;
    }
  }

  function isLegacyProfileObject(data) {
    // Legacy shape: { email, name, targetScore } (no schemaVersion)
    return (
      isPlainObject(data) &&
      !("schemaVersion" in data) &&
      (("email" in data) || ("name" in data) || ("targetScore" in data))
    );
  }

  function migrateIfNeeded(data) {
    const base = defaultProfile();

    // No data -> fresh default
    if (!isPlainObject(data)) return base;

    // Legacy object (no schemaVersion) -> wrap into schema v1
    if (isLegacyProfileObject(data)) {
      const migrated = {
        ...base,
        name: sanitizeText(data.name, 80),
        email: normalizeEmail(data.email),
        targetScore: sanitizeText(data.targetScore, 40),
        locale: sanitizeText(data.locale, 40),
        notes: sanitizeText(data.notes, 2000),
        updatedAt: nowIso()
      };

      // Preserve IELTS block if legacy happened to have it
      if (isPlainObject(data.iels)) {
        migrated.iels = { ...base.iels, ...data.iels };
        migrated.iels.history = Array.isArray(migrated.iels.history) ? migrated.iels.history.slice() : [];
        migrated.iels.lastScore = isPlainObject(migrated.iels.lastScore) ? migrated.iels.lastScore : null;
      }

      return migrated;
    }

    // Future versions: migrate here. For now, accept v1 only.
    if (data.schemaVersion !== SCHEMA_VERSION) return base;

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
    out.targetScore = sanitizeText(out.targetScore, 40);
    out.locale = sanitizeText(out.locale, 40);
    out.notes = sanitizeText(out.notes, 2000);

    return out;
  }

  function persist(profileObj, shouldDispatch) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profileObj));
    } catch (_) {
      // ignore write errors (private mode/quota)
    }
    if (shouldDispatch) dispatchProfileChanged();
  }

  function save(profile, opts) {
    const base = defaultProfile();
    const p = isPlainObject(profile) ? profile : {};

    const out = {
      ...base,
      ...pickKnownKeys(p, base),
      updatedAt: nowIso()
    };

    out.name = sanitizeText(out.name, 80);
    out.email = normalizeEmail(out.email);
    out.targetScore = sanitizeText(out.targetScore, 40);
    out.locale = sanitizeText(out.locale, 40);
    out.notes = sanitizeText(out.notes, 2000);

    // IELTS
    out.iels = isPlainObject(p.iels) ? { ...base.iels, ...p.iels } : { ...base.iels };
    out.iels.history = Array.isArray(out.iels.history) ? out.iels.history.slice() : [];
    out.iels.lastScore = isPlainObject(out.iels.lastScore) ? out.iels.lastScore : null;

    const dispatch = !(opts && opts.dispatch === false);
    persist(out, dispatch);

    return out;
  }

  function update(patch) {
    const current = load();
    const next = deepMerge(current, isPlainObject(patch) ? patch : {});
    return save(next);
  }

  function clear() {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (_) {
      // ignore
    }
    dispatchProfileChanged();
  }

  function setProfileInfo({ name, email, locale, notes, targetScore } = {}) {
    const patch = {};
    if (name !== undefined) patch.name = name;
    if (email !== undefined) patch.email = email;
    if (locale !== undefined) patch.locale = locale;
    if (notes !== undefined) patch.notes = notes;
    if (targetScore !== undefined) patch.targetScore = targetScore;
    return update(patch);
  }

  function addIelsScore(scoreEntry) {
    const current = load();
    const entry = sanitizeScoreEntry(scoreEntry);
    if (!entry) return current;

    const history = Array.isArray(current.iels.history) ? current.iels.history.slice() : [];
    history.unshift(entry);

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

  // Compatibility API expected by store-helpers.js patterns
  function get() {
    return load();
  }

  function set(data) {
    // set() should behave like a full save with sanitation/migration support
    return save(data);
  }

  // Export/import for sync (kept small and predictable)
  function exportData() {
    const current = load();
    return {
      schemaVersion: SCHEMA_VERSION,
      updatedAt: current.updatedAt || nowIso(),
      profile: {
        // export only user-facing + stable fields
        name: current.name || "",
        email: current.email || "",
        targetScore: current.targetScore || "",
        locale: current.locale || "",
        notes: current.notes || "",
        iels: current.iels || { lastScore: null, history: [] }
      }
    };
  }

  function importData(payload, opts) {
    // Accept string JSON or object.
    const mode = (opts && opts.mode) === "replace" ? "replace" : "merge";

    let incoming = payload;
    if (typeof payload === "string") {
      incoming = safeJsonParse(payload);
      if (!incoming) return { ok: false, reason: "Invalid JSON" };
    }

    if (!isPlainObject(incoming)) return { ok: false, reason: "Invalid payload shape" };

    // Accept:
    // - { profile: {...} } (preferred)
    // - full stored object (legacy/export) with top-level fields (name/email/targetScore)
    const incomingProfile = isPlainObject(incoming.profile) ? incoming.profile : incoming;

    const current = load();

    let next;
    if (mode === "replace") {
      next = defaultProfile();
      next = deepMerge(next, incomingProfile);
    } else {
      // merge
      next = deepMerge(current, incomingProfile);
    }

    const saved = save(next, { dispatch: true });
    return { ok: true, mode, updatedAt: saved.updatedAt };
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

  // Initialize storage normalization/migration once on load:
  // If legacy data exists, we migrate and write back in v1 shape (without dispatch).
  (function initNormalize() {
    const raw = loadRaw();
    if (!raw) return;

    const migrated = migrateIfNeeded(raw);
    if (!isPlainObject(raw) || raw.schemaVersion !== SCHEMA_VERSION || isLegacyProfileObject(raw)) {
      // Persist silently (no event) so we don't surprise on first page load
      const saved = save(migrated, { dispatch: false });
      // Ensure a clean write even if save() didn't dispatch
      persist(saved, false);
    }
  })();

  // Expose on window
  window.UEAH_PROFILE_STORE = {
    key: STORAGE_KEY,
    schemaVersion: SCHEMA_VERSION,

    // Existing API
    getProfile: load,
    save,
    update,
    clear,

    setProfileInfo,

    addIelsScore,
    getIelsHistory,

    // Compatibility API (store-helpers)
    get,
    set,

    // Sync helpers
    exportData,
    importData
  };
})();
