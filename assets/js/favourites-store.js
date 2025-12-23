/* assets/js/favourites-store.js
   Global favourites store (no build step). Loaded via <script defer>.
   Exposes: window.UEAH_FAVOURITES_STORE
*/
(function () {
  "use strict";

  var STORAGE_KEY = "UEAH_FAVOURITES_V1";
  var SCHEMA_VERSION = 1;

  function nowISO() {
    return new Date().toISOString();
  }

  function isPlainObject(v) {
    return !!v && typeof v === "object" && !Array.isArray(v);
  }

  function safeReadRaw() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (_) {
      return null;
    }
  }

  function safeWriteRaw(s) {
    try {
      localStorage.setItem(STORAGE_KEY, s);
      return true;
    } catch (_) {
      return false;
    }
  }

  function safeParseJSON(s) {
    try {
      return JSON.parse(s);
    } catch (_) {
      return null;
    }
  }

  function dispatchChanged(count) {
    try {
      window.dispatchEvent(
        new CustomEvent("ueah:favourites-changed", { detail: { count: count } })
      );
    } catch (_) {
      // ignore
    }
  }

  function makeKey(age, skill, slug) {
    return String(age || "").trim() + "|" + String(skill || "").trim() + "|" + String(slug || "").trim();
  }

  function normalizeSnapshot(snapshot) {
    // Accept minimal inputs; keep unknown fields if provided.
    if (!isPlainObject(snapshot)) return null;

    var age = snapshot.age != null ? String(snapshot.age).trim() : "";
    var skill = snapshot.skill != null ? String(snapshot.skill).trim() : "";
    var slug = snapshot.slug != null ? String(snapshot.slug).trim() : "";
    var key = snapshot.key != null ? String(snapshot.key).trim() : "";

    if (!key) key = makeKey(age, skill, slug);

    // If key is still empty, reject.
    if (!key || key === "||") return null;

    var title = snapshot.title != null ? String(snapshot.title).trim() : "";
    var description = snapshot.description != null ? String(snapshot.description).trim() : "";
    var link = snapshot.link != null ? String(snapshot.link).trim() : "";

    var addedAt = snapshot.addedAt != null ? String(snapshot.addedAt).trim() : "";
    if (!addedAt) addedAt = nowISO();

    // Preserve optional metadata fields if present
    var out = {
      key: key,
      age: age,
      skill: skill,
      slug: slug,
      title: title,
      description: description,
      link: link,
      addedAt: addedAt,
    };

    if (snapshot.format != null) out.format = snapshot.format;
    if (snapshot.level != null) out.level = snapshot.level;
    if (snapshot.time != null) out.time = snapshot.time;
    if (snapshot.focus != null) out.focus = snapshot.focus;

    return out;
  }

  function emptyState() {
    return {
      schemaVersion: SCHEMA_VERSION,
      updatedAt: nowISO(),
      // Store items as a map for dedupe: { [key]: snapshot }
      items: {},
    };
  }

  function coerceState(raw) {
    // Accept:
    // - null/empty => empty
    // - {schemaVersion, updatedAt, items: {..}} (current)
    // - {items: [...] } (older/export-like)
    if (!raw) return emptyState();

    if (!isPlainObject(raw)) return emptyState();

    var sv = Number(raw.schemaVersion || SCHEMA_VERSION);
    var updatedAt = typeof raw.updatedAt === "string" ? raw.updatedAt : nowISO();

    var state = {
      schemaVersion: isFinite(sv) ? sv : SCHEMA_VERSION,
      updatedAt: updatedAt,
      items: {},
    };

    if (isPlainObject(raw.items)) {
      Object.keys(raw.items).forEach(function (k) {
        var snap = normalizeSnapshot(raw.items[k]);
        if (!snap) return;
        // Ensure key alignment
        snap.key = String(k);
        state.items[snap.key] = snap;
      });
      return state;
    }

    if (Array.isArray(raw.items)) {
      raw.items.forEach(function (it) {
        var snap = normalizeSnapshot(it);
        if (!snap) return;
        state.items[snap.key] = snap;
      });
      return state;
    }

    return state;
  }

  var _state = (function init() {
    var raw = safeReadRaw();
    if (!raw) return emptyState();

    var parsed = safeParseJSON(raw);
    var st = coerceState(parsed);

    // If parsing failed or shape was odd, reset to avoid repeated errors.
    // Only write back if we successfully parsed something (parsed != null).
    if (parsed == null) return emptyState();

    // Ensure storage is normalized
    st.schemaVersion = SCHEMA_VERSION;
    st.updatedAt = nowISO();
    safeWriteRaw(JSON.stringify(st));
    return st;
  })();

  function persistAndNotify() {
    _state.schemaVersion = SCHEMA_VERSION;
    _state.updatedAt = nowISO();
    safeWriteRaw(JSON.stringify(_state));
    dispatchChanged(Object.keys(_state.items).length);
  }

  function getAll() {
    var arr = Object.keys(_state.items).map(function (k) {
      return _state.items[k];
    });

    // Sort newest first (addedAt desc); fall back to key.
    arr.sort(function (a, b) {
      var at = Date.parse(a.addedAt || "") || 0;
      var bt = Date.parse(b.addedAt || "") || 0;
      if (bt !== at) return bt - at;
      return String(a.key).localeCompare(String(b.key));
    });

    return arr;
  }

  function hasKey(key) {
    var k = String(key || "").trim();
    if (!k) return false;
    return Object.prototype.hasOwnProperty.call(_state.items, k);
  }

  function has(age, skill, slug) {
    return hasKey(makeKey(age, skill, slug));
  }

  function add(favSnapshot) {
    var snap = normalizeSnapshot(favSnapshot);
    if (!snap) return false;

    var k = snap.key;

    // If exists, preserve existing addedAt and existing fields where possible
    if (hasKey(k)) {
      var existing = _state.items[k];
      // Keep existing values, but fill missing with incoming (incoming provides fallbacks)
      var merged = Object.assign({}, snap, existing);
      merged.key = k;
      _state.items[k] = merged;
    } else {
      _state.items[k] = snap;
    }

    persistAndNotify();
    return true;
  }

  function removeByKey(key) {
    var k = String(key || "").trim();
    if (!k) return false;
    if (!hasKey(k)) return false;

    try {
      delete _state.items[k];
    } catch (_) {
      _state.items[k] = undefined;
      delete _state.items[k];
    }

    persistAndNotify();
    return true;
  }

  function toggle(favSnapshot) {
    var snap = normalizeSnapshot(favSnapshot);
    if (!snap) return { ok: false, on: false, key: "" };

    var k = snap.key;

    if (hasKey(k)) {
      removeByKey(k);
      return { ok: true, on: false, key: k };
    }

    add(snap);
    return { ok: true, on: true, key: k };
  }

  function clear() {
    _state = emptyState();
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (_) {
      // ignore
    }
    dispatchChanged(0);
  }

  function exportData() {
    return {
      schemaVersion: SCHEMA_VERSION,
      updatedAt: _state.updatedAt || nowISO(),
      items: getAll(),
    };
  }

  function importData(payload, opts) {
    var mode = (opts && opts.mode) === "replace" ? "replace" : "merge";

    if (!payload) return { ok: false, reason: "Missing payload" };

    // Accept string JSON or object
    var incoming = payload;
    if (typeof payload === "string") {
      incoming = safeParseJSON(payload);
      if (!incoming) return { ok: false, reason: "Invalid JSON" };
    }

    if (!isPlainObject(incoming)) return { ok: false, reason: "Invalid payload shape" };

    // Accept {items:[...]} or {items:{...}}; ignore unknown fields.
    var incomingState = coerceState(incoming);
    var incomingItemsMap = incomingState.items || {};

    if (mode === "replace") {
      _state = emptyState();
      Object.keys(incomingItemsMap).forEach(function (k) {
        _state.items[k] = incomingItemsMap[k];
      });
      persistAndNotify();
      return { ok: true, mode: mode, count: Object.keys(_state.items).length };
    }

    // merge (union by key)
    Object.keys(incomingItemsMap).forEach(function (k) {
      if (hasKey(k)) {
        // Keep existing values, but fill missing with incoming
        var existing = _state.items[k];
        var incomingSnap = incomingItemsMap[k];
        _state.items[k] = Object.assign({}, incomingSnap, existing);
        _state.items[k].key = k;
      } else {
        _state.items[k] = incomingItemsMap[k];
      }
    });

    persistAndNotify();
    return { ok: true, mode: mode, count: Object.keys(_state.items).length };
  }

  window.UEAH_FAVOURITES_STORE = {
    getAll: getAll,
    has: has,
    hasKey: hasKey,
    add: add,
    removeByKey: removeByKey,
    toggle: toggle,
    clear: clear,
    exportData: exportData,
    importData: importData,
    // exposed for convenience
    makeKey: makeKey,
    STORAGE_KEY: STORAGE_KEY,
    SCHEMA_VERSION: SCHEMA_VERSION,
  };

  // Fire initial count so UI can show badge on first load without waiting for a toggle
  dispatchChanged(Object.keys(_state.items).length);
})();
