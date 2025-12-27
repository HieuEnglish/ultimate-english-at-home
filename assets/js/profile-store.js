/* assets/js/profile-store.js
   UEAH Profile Store (localStorage helpers)

   Purpose:
   - Store basic user profile info (email, name, etc.)
   - Store IELTS-related results/summary (future use)
   - Store age-group + skill results (normalized 0–100 + level titles)
   - Safe defaults + schema versioning + migration
   - Compatibility: get()/set() for store-helpers
   - Export/import for cross-device sync
*/

(function () {
  "use strict";

  const STORAGE_KEY = "UEAH_PROFILE_V1";
  const SCHEMA_VERSION = 2;

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

  function defaultAgeBucket() {
    return {
      reading: { lastScore: null, history: [] },
      listening: { lastScore: null, history: [] },
      writing: { lastScore: null, history: [] },
      speaking: { lastScore: null, history: [] },
      overall: null
    };
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
      },

      // New: age-group practice tracking (0-3, 4-7, 8-10, 11-12, 13-18, ielts)
      // Each age group contains per-skill lastScore + history and an optional overall summary.
      resultsByAge: {}
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

  function clampInt(n, lo, hi) {
    const x = Number(n);
    const v = Number.isFinite(x) ? Math.round(x) : 0;
    return Math.min(Math.max(v, lo), hi);
  }

  function parseIsoMs(s) {
    if (!s) return NaN;
    const ms = Date.parse(String(s));
    return Number.isFinite(ms) ? ms : NaN;
  }

  function latestIso(a, b) {
    const am = parseIsoMs(a);
    const bm = parseIsoMs(b);

    if (Number.isFinite(am) && Number.isFinite(bm)) return bm >= am ? String(b) : String(a);
    if (Number.isFinite(am)) return String(a);
    if (Number.isFinite(bm)) return String(b);

    // Fallback: ISO 8601 strings are lexicographically sortable.
    const as = a ? String(a) : "";
    const bs = b ? String(b) : "";
    return bs > as ? bs : as;
  }

  function maxIso(list) {
    const arr = Array.isArray(list) ? list : [];
    let best = "";
    for (let i = 0; i < arr.length; i++) {
      if (!arr[i]) continue;
      best = best ? latestIso(best, arr[i]) : String(arr[i]);
    }
    return best || "";
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

  function sanitizeAgeSkillEntry(entry) {
    if (!isPlainObject(entry)) return null;

    const score = numberOrNull(entry.score);
    const normalized = score === null ? null : clampInt(score, 0, 100);
    const at = entry.at ? String(entry.at) : nowIso();

    if (normalized === null) return null;

    const rawCorrect = numberOrNull(entry.rawCorrect);
    const rawTotal = numberOrNull(entry.rawTotal);

    const levelTitle = entry.levelTitle ? sanitizeText(entry.levelTitle, 80) : "";
    const level = numberOrNull(entry.level);

    const slug = entry.slug ? sanitizeText(entry.slug, 120) : "";
    const skill = entry.skill ? sanitizeText(entry.skill, 20) : "";

    const breakdown = isPlainObject(entry.breakdown) ? entry.breakdown : null;

    return {
      score: normalized,
      rawCorrect,
      rawTotal,
      levelTitle,
      level,
      breakdown,
      slug,
      skill,
      at
    };
  }

  function sanitizeOverallEntry(entry) {
    if (!isPlainObject(entry)) return null;

    const score = numberOrNull(entry.score);
    const normalized = score === null ? null : clampInt(score, 0, 100);
    if (normalized === null) return null;

    const title = entry.title ? sanitizeText(entry.title, 80) : "";
    const level = numberOrNull(entry.level);
    const at = entry.at ? String(entry.at) : nowIso();

    return {
      score: normalized,
      title,
      level,
      at
    };
  }

  // -----------------------------
  // Overall score synchronization
  // -----------------------------

  function getSkillScoreFromBucket(bucket, skillKey) {
    if (!bucket || !skillKey) return null;
    const sk = bucket[skillKey];
    const last = sk && isPlainObject(sk.lastScore) ? sk.lastScore : null;
    const n = numberOrNull(last && last.score);
    return n === null ? null : clampInt(n, 0, 100);
  }

  function getSkillAtFromBucket(bucket, skillKey) {
    if (!bucket || !skillKey) return "";
    const sk = bucket[skillKey];
    const last = sk && isPlainObject(sk.lastScore) ? sk.lastScore : null;
    return last && last.at ? String(last.at) : "";
  }

  function computeOverallSnapshot(ageGroup, bucket) {
    const reading = getSkillScoreFromBucket(bucket, "reading");
    const listening = getSkillScoreFromBucket(bucket, "listening");
    const writing = getSkillScoreFromBucket(bucket, "writing");
    const speaking = getSkillScoreFromBucket(bucket, "speaking");

    if (
      reading === null ||
      listening === null ||
      writing === null ||
      speaking === null
    ) {
      return null;
    }

    const at =
      maxIso([
        getSkillAtFromBucket(bucket, "reading"),
        getSkillAtFromBucket(bucket, "listening"),
        getSkillAtFromBucket(bucket, "writing"),
        getSkillAtFromBucket(bucket, "speaking")
      ]) || nowIso();

    const scoring = window.UEAH_SCORING;
    if (scoring && typeof scoring.computeOverall === "function") {
      try {
        const res = scoring.computeOverall(ageGroup, { reading, listening, writing, speaking });
        if (res && res.complete) {
          return {
            score: clampInt(res.score, 0, 100),
            title: res.title ? sanitizeText(res.title, 80) : "",
            level: typeof res.band === "number" && Number.isFinite(res.band) ? res.band : null,
            at
          };
        }
      } catch (_) {
        // fall through to simple average
      }
    }

    const avg = Math.round((reading + listening + writing + speaking) / 4);
    return {
      score: clampInt(avg, 0, 100),
      title: "",
      level: null,
      at
    };
  }

  function overallCoreEqual(a, b) {
    const A = sanitizeOverallEntry(a);
    const B = sanitizeOverallEntry(b);
    if (!A || !B) return false;

    const aLevel = numberOrNull(A.level);
    const bLevel = numberOrNull(B.level);

    return A.score === B.score && String(A.title || "") === String(B.title || "") && aLevel === bLevel;
  }

  function syncAgeBucketOverall(ageGroup, bucket) {
    const b = isPlainObject(bucket) ? bucket : defaultAgeBucket();
    const computed = computeOverallSnapshot(ageGroup, b);
    const existing = sanitizeOverallEntry(b.overall);

    if (!computed) {
      if (existing) {
        return { bucket: { ...b, overall: null }, changed: true };
      }
      return { bucket: { ...b, overall: null }, changed: false };
    }

    // If core fields haven't changed, only bump "at" to reflect newest underlying skill score.
    if (existing && overallCoreEqual(existing, computed)) {
      const exAt = existing.at || "";
      const nextAt = computed.at || exAt || nowIso();

      if (nextAt && nextAt !== exAt) {
        return { bucket: { ...b, overall: { ...existing, at: nextAt } }, changed: true };
      }

      return { bucket: { ...b, overall: existing }, changed: false };
    }

    // Core fields changed (score/title/band) — update overall.
    const cleaned = sanitizeOverallEntry(computed);
    return { bucket: { ...b, overall: cleaned }, changed: true };
  }

  function syncAllOveralls(resultsByAge) {
    const src = isPlainObject(resultsByAge) ? resultsByAge : {};
    const out = { ...src };
    let changed = false;

    Object.keys(out).forEach((age) => {
      const bucket = isPlainObject(out[age]) ? out[age] : defaultAgeBucket();
      const s = syncAgeBucketOverall(age, bucket);
      out[age] = s.bucket;
      if (s.changed) changed = true;
    });

    return { resultsByAge: out, changed };
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

  function ensureResultsByAgeShape(obj) {
    const out = isPlainObject(obj) ? { ...obj } : {};

    Object.keys(out).forEach((age) => {
      const bucket = isPlainObject(out[age]) ? out[age] : {};
      const base = defaultAgeBucket();

      const next = {
        reading: normalizeSkillBucket(bucket.reading, base.reading),
        listening: normalizeSkillBucket(bucket.listening, base.listening),
        writing: normalizeSkillBucket(bucket.writing, base.writing),
        speaking: normalizeSkillBucket(bucket.speaking, base.speaking),
        overall: sanitizeOverallEntry(bucket.overall) || null
      };

      out[age] = next;
    });

    return out;
  }

  function normalizeSkillBucket(skillBucket, template) {
    const base = template || { lastScore: null, history: [] };
    const b = isPlainObject(skillBucket) ? skillBucket : {};

    const lastScore = sanitizeAgeSkillEntry(b.lastScore) || null;

    let history = [];
    if (Array.isArray(b.history)) {
      history = b.history
        .map((x) => sanitizeAgeSkillEntry(x))
        .filter(Boolean);
    }

    return {
      lastScore,
      history
    };
  }

  function migrateIfNeeded(data) {
    const base = defaultProfile();

    // No data -> fresh default
    if (!isPlainObject(data)) return base;

    // Legacy object (no schemaVersion) -> wrap into current schema
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
        migrated.iels.history = Array.isArray(migrated.iels.history)
          ? migrated.iels.history.slice()
          : [];
        migrated.iels.lastScore = isPlainObject(migrated.iels.lastScore)
          ? migrated.iels.lastScore
          : null;
      }

      // Preserve resultsByAge if a legacy export already contained it
      if (isPlainObject(data.resultsByAge)) {
        migrated.resultsByAge = ensureResultsByAgeShape(data.resultsByAge);
      }

      return migrated;
    }

    // Version mismatch: merge known fields into new base, preserving what we can.
    if (data.schemaVersion !== SCHEMA_VERSION) {
      const merged = {
        ...base,
        ...pickKnownKeys(data, base),
        updatedAt: nowIso()
      };

      // Preserve nested iels if present
      if (isPlainObject(data.iels)) {
        merged.iels = { ...base.iels, ...data.iels };
        merged.iels.history = Array.isArray(merged.iels.history) ? merged.iels.history.slice() : [];
        merged.iels.lastScore = isPlainObject(merged.iels.lastScore) ? merged.iels.lastScore : null;
      }

      // Preserve resultsByAge if present
      if (isPlainObject(data.resultsByAge)) {
        merged.resultsByAge = ensureResultsByAgeShape(data.resultsByAge);
      }

      // Sanitize core fields
      merged.name = sanitizeText(merged.name, 80);
      merged.email = normalizeEmail(merged.email);
      merged.targetScore = sanitizeText(merged.targetScore, 40);
      merged.locale = sanitizeText(merged.locale, 40);
      merged.notes = sanitizeText(merged.notes, 2000);

      return merged;
    }

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

    // New: resultsByAge
    out.resultsByAge = isPlainObject(data.resultsByAge) ? ensureResultsByAgeShape(data.resultsByAge) : {};

    // Keep overall score in sync with the latest saved skill scores.
    // This fixes legacy/stale overalls and ensures re-takes update certification consistently.
    const synced = syncAllOveralls(out.resultsByAge);
    out.resultsByAge = synced.resultsByAge;
    if (synced.changed) {
      // Persist silently (avoid UI loops) so exports reflect corrected data.
      persist(out, false);
    }

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

    // resultsByAge
    const shaped = isPlainObject(p.resultsByAge) ? ensureResultsByAgeShape(p.resultsByAge) : {};
    out.resultsByAge = syncAllOveralls(shaped).resultsByAge;

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

  function ensureAgeBucket(current, ageGroup) {
    const age = String(ageGroup || "").trim();
    if (!age) return current;

    const resultsByAge = isPlainObject(current.resultsByAge) ? { ...current.resultsByAge } : {};
    const existing = isPlainObject(resultsByAge[age]) ? resultsByAge[age] : null;

    if (!existing) resultsByAge[age] = defaultAgeBucket();
    else {
      resultsByAge[age] = {
        reading: normalizeSkillBucket(existing.reading, defaultAgeBucket().reading),
        listening: normalizeSkillBucket(existing.listening, defaultAgeBucket().listening),
        writing: normalizeSkillBucket(existing.writing, defaultAgeBucket().writing),
        speaking: normalizeSkillBucket(existing.speaking, defaultAgeBucket().speaking),
        overall: sanitizeOverallEntry(existing.overall) || null
      };
    }

    return { ...current, resultsByAge };
  }

  // UPDATED: overall calculation respects scoring.computeOverall() title/level (especially IELTS band overall).
  function computeOverallIfComplete(ageGroup, bucket) {
    const scoring = window.UEAH_SCORING;

    const r = bucket.reading && bucket.reading.lastScore ? bucket.reading.lastScore.score : null;
    const l = bucket.listening && bucket.listening.lastScore ? bucket.listening.lastScore.score : null;
    const w = bucket.writing && bucket.writing.lastScore ? bucket.writing.lastScore.score : null;
    const s = bucket.speaking && bucket.speaking.lastScore ? bucket.speaking.lastScore.score : null;

    if (
      !Number.isFinite(Number(r)) ||
      !Number.isFinite(Number(l)) ||
      !Number.isFinite(Number(w)) ||
      !Number.isFinite(Number(s))
    ) {
      return null;
    }

    const scoresObj = {
      reading: Number(r),
      listening: Number(l),
      writing: Number(w),
      speaking: Number(s)
    };

    // If scoring module exists, use it (keeps the rule centralized).
    if (scoring && typeof scoring.computeOverall === "function") {
      const res = scoring.computeOverall(ageGroup, scoresObj);

      if (res && res.complete) {
        const overallScore = clampInt(res.score, 0, 100);

        // Prefer the title returned by computeOverall (for IELTS it includes "Overall Band X ...").
        let title = res.title ? String(res.title) : "";

        // Prefer explicit band/level returned by computeOverall when present (IELTS uses res.band).
        let level = Number.isFinite(Number(res.band)) ? Number(res.band) : null;

        // Fallback: derive level/title only if needed, and do NOT override computeOverall's title/level.
        if ((level === null || title === "") && scoring && typeof scoring.deriveLevel === "function") {
          const levelInfo = scoring.deriveLevel(ageGroup, "", overallScore, null);
          if (level === null && levelInfo && Number.isFinite(Number(levelInfo.level))) {
            level = levelInfo.level;
          }
          if (!title && levelInfo && levelInfo.title) {
            title = levelInfo.title;
          }
        }

        return {
          score: overallScore,
          title: title ? sanitizeText(title, 80) : "",
          level: level,
          at: nowIso()
        };
      }
      return null;
    }

    // Fallback: simple average without title.
    const avg = (Number(r) + Number(l) + Number(w) + Number(s)) / 4;
    return {
      score: clampInt(avg, 0, 100),
      title: "",
      level: null,
      at: nowIso()
    };
  }

  function addAgeSkillScore(ageGroup, skill, entry) {
    const age = String(ageGroup || "").trim();
    const sk = String(skill || "").trim().toLowerCase();
    if (!age) return load();
    if (!sk || !["reading", "listening", "writing", "speaking"].includes(sk)) return load();

    const current0 = load();
    const current = ensureAgeBucket(current0, age);

    const cleaned = sanitizeAgeSkillEntry({
      ...entry,
      skill: sk
    });
    if (!cleaned) return current;

    const resultsByAge = { ...current.resultsByAge };
    const bucket = resultsByAge[age] || defaultAgeBucket();

    const skillBucket = isPlainObject(bucket[sk]) ? bucket[sk] : { lastScore: null, history: [] };
    const history = Array.isArray(skillBucket.history) ? skillBucket.history.slice() : [];

    // Dedupe: if lastScore is identical (score+rawCorrect+rawTotal+slug),
    // keep overall synchronized but avoid writing a duplicate history entry.
    const last = skillBucket.lastScore;
    if (
      last &&
      last.score === cleaned.score &&
      last.rawCorrect === cleaned.rawCorrect &&
      last.rawTotal === cleaned.rawTotal &&
      String(last.slug || "") === String(cleaned.slug || "")
    ) {
      const syncedExisting = syncAgeBucketOverall(age, bucket);
      if (syncedExisting.changed) {
        resultsByAge[age] = syncedExisting.bucket;
        return save({
          ...current,
          resultsByAge
        });
      }
      return current;
    }

    history.unshift(cleaned);

    const MAX = 50;
    const trimmed = history.slice(0, MAX);

    let nextBucket = {
      ...bucket,
      [sk]: {
        lastScore: cleaned,
        history: trimmed
      }
    };

    // Keep overall score in sync with the latest saved skill scores.
    nextBucket = syncAgeBucketOverall(age, nextBucket).bucket;

    resultsByAge[age] = nextBucket;

    return save({
      ...current,
      resultsByAge
    });
  }

  function clearAgeResults(ageGroup) {
    const current = load();
    const resultsByAge = isPlainObject(current.resultsByAge) ? { ...current.resultsByAge } : {};

    if (!ageGroup) {
      return save({
        ...current,
        resultsByAge: {}
      });
    }

    const age = String(ageGroup || "").trim();
    if (!age) return current;

    if (age in resultsByAge) delete resultsByAge[age];

    return save({
      ...current,
      resultsByAge
    });
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
        iels: current.iels || { lastScore: null, history: [] },
        resultsByAge: current.resultsByAge || {}
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
  // If legacy data exists, we migrate and write back in current shape (without dispatch).
  (function initNormalize() {
    const raw = loadRaw();
    if (!raw) return;

    const migrated = migrateIfNeeded(raw);
    if (
      !isPlainObject(raw) ||
      raw.schemaVersion !== SCHEMA_VERSION ||
      isLegacyProfileObject(raw)
    ) {
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

    // New age-group results API
    addAgeSkillScore,
    clearAgeResults,

    // Compatibility API (store-helpers)
    get,
    set,

    // Sync helpers
    exportData,
    importData
  };
})();
