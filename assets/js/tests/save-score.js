/* assets/js/tests/save-score.js
   Global helper to save a completed test score into the profile store.

   Exposes:
     window.UEAH_SAVE_SCORE.save(payload)

   Payload shape (minimal):
     {
       slug: "age-4-7-reading" | "iels-reading" | ...,
       ageGroup: "0-3" | "4-7" | "8-10" | "11-12" | "13-18" | "ielts",
       skill: "reading" | "listening" | "writing" | "speaking",
       questions: [ ...questionObjectsUsedInRun ],
       review:   [ { isCorrect: boolean }, ... ]             // objective
       // OR (writing partial credit)
       review:   { [questionId]: { pointsEarned, pointsPossible } | { earned, possible } | { isCorrect } | number },
       // OR
       answers:  [ boolean, boolean, ... ]                   // objective alt
       // OR
       resultsById: { [questionId]: "said"|"again"|"skip" }   // caregiver-scored
       at: "2025-12-24T..." (optional)
       timestamp: "2025-12-24T..." (optional alias)
       rawCorrect: <number> (optional)
       totalQuestions: <number> (optional)
     }

   Requirements:
   - window.UEAH_SCORING must be loaded (assets/js/scoring.js)
   - window.UEAH_PROFILE_STORE must be loaded (assets/js/profile-store.js)
*/

(function () {
  "use strict";

  function nowIso() {
    return new Date().toISOString();
  }

  function isPlainObject(x) {
    return !!x && typeof x === "object" && !Array.isArray(x);
  }

  function normSkill(skill) {
    const s = String(skill || "").trim().toLowerCase();
    if (s === "reading" || s === "listening" || s === "writing" || s === "speaking") return s;
    return "";
  }

  function normAge(ageGroup) {
    return String(ageGroup || "").trim().toLowerCase();
  }

  function safeString(v, maxLen) {
    const s = String(v || "").trim();
    if (!maxLen) return s;
    return s.length > maxLen ? s.slice(0, maxLen) : s;
  }

  function titleCase(s) {
    const t = String(s || "").trim();
    return t ? t.charAt(0).toUpperCase() + t.slice(1) : t;
  }

  function ageLabelFromAgeGroup(ageGroup) {
    const a = String(ageGroup || "").trim().toLowerCase();
    if (a === "ielts") return "IELTS Practice";
    if (a === "13-18") return "Ages 13–18";
    if (a === "11-12") return "Ages 11–12";
    if (a === "8-10") return "Ages 8–10";
    if (a === "4-7") return "Ages 4–7";
    if (a === "0-3") return "Ages 0–3";
    return "Age group";
  }

  function skillLabelFromSkill(skill) {
    return titleCase(skill);
  }

  function clamp01(n) {
    const x = Number(n);
    if (!Number.isFinite(x)) return 0;
    return Math.min(Math.max(x, 0), 1);
  }

  function ratio(correct, total) {
    const c = Number(correct);
    const t = Number(total);
    if (!Number.isFinite(c) || !Number.isFinite(t) || t <= 0) return null;
    return Math.min(Math.max(c / t, 0), 1);
  }

  // Minimal correctness check for raw counting (objective/caregiver/writing map).
  // This is intentionally conservative: rawCorrect is mainly used for UI display.
  function getIsCorrectForIndex(i, q, payload) {
    // objective review array
    if (Array.isArray(payload.review) && payload.review[i] && typeof payload.review[i].isCorrect === "boolean") {
      return !!payload.review[i].isCorrect;
    }

    // objective boolean answers
    if (Array.isArray(payload.answers) && typeof payload.answers[i] === "boolean") {
      return !!payload.answers[i];
    }

    // caregiver results by id
    if (isPlainObject(payload.resultsById) && q && q.id != null) {
      const v = String(payload.resultsById[String(q.id)] || "").toLowerCase();
      if (v === "said") return true;
      if (v === "correct" || v === "true" || v === "yes") return true;
      return false;
    }

    // writing review object keyed by id
    if (isPlainObject(payload.review) && q && q.id != null) {
      const v = payload.review[String(q.id)];
      if (v == null) return false;

      if (typeof v === "boolean") return v;
      if (typeof v === "number") return v >= 1;

      if (isPlainObject(v)) {
        if (typeof v.isCorrect === "boolean") return v.isCorrect;

        // treat full-credit as correct for raw counts
        if (v.pointsEarned != null || v.pointsPossible != null) {
          const r = ratio(v.pointsEarned, v.pointsPossible);
          return r != null && r >= 1;
        }
        if (v.earned != null || v.possible != null) {
          const r = ratio(v.earned, v.possible);
          return r != null && r >= 1;
        }
        if (v.ratio != null) return clamp01(v.ratio) >= 1;
        if (v.scoreRatio != null) return clamp01(v.scoreRatio) >= 1;
      }
    }

    return false;
  }

  function computeRawCountsFromRun(payload) {
    const questions = Array.isArray(payload.questions) ? payload.questions : [];
    let rawTotal = questions.length;
    let rawCorrect = 0;

    for (let i = 0; i < questions.length; i++) {
      if (getIsCorrectForIndex(i, questions[i], payload)) rawCorrect++;
    }

    return { rawCorrect, rawTotal };
  }

  function save(payload) {
    const scoring = window.UEAH_SCORING;
    const store = window.UEAH_PROFILE_STORE;

    if (!scoring || typeof scoring.normalizeSkillScore !== "function" || typeof scoring.deriveLevel !== "function") {
      return { ok: false, reason: "SCORING_NOT_AVAILABLE" };
    }
    if (!store || typeof store.addAgeSkillScore !== "function") {
      return { ok: false, reason: "PROFILE_STORE_NOT_AVAILABLE" };
    }

    const ageGroup = normAge(payload && payload.ageGroup);
    const skill = normSkill(payload && payload.skill);
    const slug = safeString(payload && payload.slug, 160);

    if (!ageGroup) return { ok: false, reason: "MISSING_AGE_GROUP" };
    if (!skill) return { ok: false, reason: "MISSING_SKILL" };

    // Timestamp compatibility: payload.timestamp aliases to payload.at
    const at = payload && (payload.at || payload.timestamp) ? String(payload.at || payload.timestamp) : nowIso();

    // Normalization priority:
    // 1) Use questions (required for stable scoring after runner fixes)
    const questions = Array.isArray(payload && payload.questions) ? payload.questions : [];
    if (!questions.length) {
      return { ok: false, reason: "MISSING_QUESTIONS" };
    }

    // Pass review through unchanged (array OR object keyed by question id)
    const normRes = scoring.normalizeSkillScore({
      ageGroup,
      skill,
      questions,
      review: payload.review,
      answers: payload.answers,
      resultsById: payload.resultsById
    });

    const levelInfo = scoring.deriveLevel(ageGroup, skill, normRes.score, normRes.breakdown);

    // Raw counts stored in profile:
    // - If payload.rawCorrect + payload.totalQuestions exist, trust them
    // - Else compute a conservative fallback from questions + markers
    let rawCorrect = Number(payload && payload.rawCorrect);
    let rawTotal = Number(payload && payload.totalQuestions);

    if (!(Number.isFinite(rawCorrect) && Number.isFinite(rawTotal))) {
      const rc = computeRawCountsFromRun({
        questions,
        review: payload.review,
        answers: payload.answers,
        resultsById: payload.resultsById
      });
      rawCorrect = rc.rawCorrect;
      rawTotal = rc.rawTotal;
    }

    const entry = {
      score: normRes.score,
      rawCorrect,
      rawTotal,
      breakdown: normRes.breakdown || null,
      levelTitle: levelInfo && levelInfo.title ? String(levelInfo.title) : "",
      level: levelInfo && typeof levelInfo.level === "number" ? levelInfo.level : null,
      slug,
      skill,
      at
    };

    const updatedProfile = store.addAgeSkillScore(ageGroup, skill, entry);

    // Response contract: include fields runners expect
    return {
      ok: true,
      ageGroup,
      skill,
      normalizedScore: entry.score,
      levelTitle: entry.levelTitle,
      level: entry.level,
      ageLabel: ageLabelFromAgeGroup(ageGroup),
      skillLabel: skillLabelFromSkill(skill),
      entry,
      profile: updatedProfile
    };
  }

  window.UEAH_SAVE_SCORE = {
    save,
    version: "1.1.0"
  };
})();
