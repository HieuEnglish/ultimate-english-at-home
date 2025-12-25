/* assets/js/scoring.js
   Shared scoring helpers for Ultimate English At Home (UEAH).

   Purpose:
   - Normalize test outcomes into a comparable 0–100 score (practice)
   - Derive age-appropriate level titles for age groups 0–3, 4–7, 8–10, 11–12
   - Derive IELTS-inspired practice bands for 13–18 and ielts categories
   - Compute overall certification once all four skills are saved

   Notes:
   - This is NOT official IELTS scoring.
   - Any band outputs are labelled "practice estimate".
*/

(function () {
  "use strict";

  // -----------------------------
  // Configuration
  // -----------------------------

  // Harder questions contribute more to the normalized score.
  const DIFFICULTY_WEIGHTS = {
    easy: 1,
    medium: 1.5,
    hard: 2
  };

  // Minimum "effective points" (sum of question points) needed for full confidence.
  // Below this, we shrink extreme scores toward 50 to reduce volatility on short tests.
  const FULL_CONFIDENCE_POINTS = {
    "0-3": 8,
    "4-7": 10,
    "8-10": 12,
    "11-12": 14,
    "13-18": 18,
    "ielts": 20
  };

  // Level titles by age group (5 levels). Thresholds are minimum score for each step-up.
  // thresholds [20,40,60,80] means:
  //   <20  -> titles[0]
  //   20+  -> titles[1]
  //   40+  -> titles[2]
  //   60+  -> titles[3]
  //   80+  -> titles[4]
  const LEVEL_DEFS = {
    "0-3": {
      thresholds: [20, 40, 60, 80],
      titles: ["Curious Starter", "Sound Explorer", "Word Builder", "Little Communicator", "Confident Learner"]
    },
    "4-7": {
      thresholds: [25, 45, 65, 85],
      titles: ["Starter", "Explorer", "Developing", "Young Achiever", "Junior Champion"]
    },
    "8-10": {
      thresholds: [25, 45, 65, 85],
      titles: ["Starter", "Developing", "Capable", "Proficient", "Advanced"]
    },
    "11-12": {
      thresholds: [30, 50, 70, 85],
      titles: ["Foundation", "Developing", "Competent", "Proficient", "Advanced"]
    }
  };

  // Difficulty gating (optional fairness):
  // Prevent "top" awards if hard questions exist but performance on hard is weak.
  // (If a test has no hard items, gating does not apply.)
  const DIFFICULTY_GATES = {
    "4-7": {
      // To be a "Junior Champion" (L5) when hard exists, need some hard exposure + accuracy.
      level5: { minHardPoints: 2, minHardAcc: 0.6 }
    },
    "8-10": {
      level5: { minHardPoints: 3, minHardAcc: 0.65 },
      level4: { minMedPoints: 3, minMedAcc: 0.6 }
    },
    "11-12": {
      level5: { minHardPoints: 3, minHardAcc: 0.7 },
      level4: { minMedPoints: 3, minMedAcc: 0.65 }
    },
    "13-18": {
      // For practice bands: higher bands require stronger hard/medium performance IF those items exist.
      band75: { minHardPoints: 4, minHardAcc: 0.6 }, // >=7.5
      band80: { minHardPoints: 5, minHardAcc: 0.7 }, // >=8.0
      band70: { minMedPoints: 6, minMedAcc: 0.7 } // >=7.0
    },
    "ielts": {
      band75: { minHardPoints: 4, minHardAcc: 0.6 },
      band80: { minHardPoints: 5, minHardAcc: 0.7 },
      band70: { minMedPoints: 6, minMedAcc: 0.7 }
    }
  };

  // IELTS-inspired mapping: convert 0–100 score to a practice band (3.0–9.0) in 0.5 steps.
  // This is intentionally stable (no claim of real IELTS conversion).
  function scoreToPracticeBand(score0to100) {
    const pct = clampInt(score0to100, 0, 100);

    // Piecewise thresholds in 0.5 increments.
    // 0–100 mapped to 3.0–9.0 with more resolution mid-range.
    if (pct < 10) return 3.0;
    if (pct < 15) return 3.5;
    if (pct < 22) return 4.0;
    if (pct < 28) return 4.5;
    if (pct < 36) return 5.0;
    if (pct < 42) return 5.5;
    if (pct < 50) return 6.0;
    if (pct < 56) return 6.5;
    if (pct < 64) return 7.0;
    if (pct < 70) return 7.5;
    if (pct < 78) return 8.0;
    if (pct < 86) return 8.5;
    return 9.0;
  }

  // -----------------------------
  // Utilities
  // -----------------------------

  function clampInt(n, lo, hi) {
    const x = Number(n);
    const v = Number.isFinite(x) ? Math.round(x) : 0;
    return Math.min(Math.max(v, lo), hi);
  }

  function clamp01(n) {
    const x = Number(n);
    if (!Number.isFinite(x)) return 0;
    return Math.min(Math.max(x, 0), 1);
  }

  function normDiff(raw) {
    const d = String(raw || "").trim().toLowerCase();
    return d === "medium" || d === "hard" ? d : "easy";
  }

  function isPlainObject(x) {
    return !!x && typeof x === "object" && !Array.isArray(x);
  }

  function ratio(correct, total) {
    const c = Number(correct);
    const t = Number(total);
    if (!Number.isFinite(c) || !Number.isFinite(t) || t <= 0) return null;
    return Math.min(Math.max(c / t, 0), 1);
  }

  function formatBand(band) {
    const n = Number(band);
    if (!Number.isFinite(n)) return "Band ? (practice estimate)";
    // Avoid trailing .0
    const txt = Math.round(n * 2) / 2;
    return "Band " + (txt % 1 === 0 ? String(Math.round(txt)) : String(txt)) + " (practice estimate)";
  }

  // Resolve point value for a question:
  // - use q.points if present
  // - else if q.rubric.checks is an array, use checks.length (fallback 1)
  // - else fallback 1
  function resolvePoints(q) {
    const qp = q && q.points != null ? Number(q.points) : NaN;
    if (Number.isFinite(qp) && qp > 0) return qp;

    const checks = q && q.rubric && Array.isArray(q.rubric.checks) ? q.rubric.checks : null;
    if (checks) return Math.max(1, checks.length);

    return 1;
  }

  function getQuestionId(q) {
    if (!q) return null;
    if (q.id != null) return String(q.id);
    return null;
  }

  function getFullConfidencePoints(ageGroup) {
    const grp = String(ageGroup || "").trim().toLowerCase();
    return Number(FULL_CONFIDENCE_POINTS[grp] || 12);
  }

  function applyConfidenceShrink(rawScore0to100, effectivePoints, fullPoints) {
    const raw = clampInt(rawScore0to100, 0, 100);
    const fp = Number.isFinite(fullPoints) && fullPoints > 0 ? fullPoints : 12;
    const ep = Number.isFinite(effectivePoints) && effectivePoints >= 0 ? effectivePoints : 0;
    const conf = clamp01(ep / fp);

    // Shrink toward 50 for low-confidence results.
    const shrunk = 50 + (raw - 50) * conf;
    return {
      score: clampInt(shrunk, 0, 100),
      confidence: conf
    };
  }

  // Determine earned ratio (0..1) for question i using any available shape.
  // Supported input shapes:
  // - review[i].isCorrect (objective)
  // - review[i].ratio or review[i].scoreRatio (partial credit)
  // - review[i].pointsEarned/pointsPossible or earned/possible (partial credit)
  // - review as an object keyed by question id:
  //    - value can be { pointsEarned, pointsPossible }, { earned, possible }, { isCorrect }, or a ratio number
  // - answers[i] boolean
  // - resultsById[q.id] where "said" => 1, otherwise 0
  function getEarnedRatioForIndex(i, q, opts) {
    const o = opts || {};
    const qid = getQuestionId(q);

    // 1) review array aligned to questions
    if (Array.isArray(o.review)) {
      const row = o.review[i];
      if (row != null) {
        if (typeof row === "number") return clamp01(row);
        if (typeof row === "boolean") return row ? 1 : 0;

        if (typeof row.isCorrect === "boolean") return row.isCorrect ? 1 : 0;

        if (row.ratio != null) return clamp01(row.ratio);
        if (row.scoreRatio != null) return clamp01(row.scoreRatio);

        if (row.pointsEarned != null || row.pointsPossible != null) {
          const r = ratio(row.pointsEarned, row.pointsPossible);
          return r == null ? 0 : clamp01(r);
        }

        if (row.earned != null || row.possible != null) {
          const r = ratio(row.earned, row.possible);
          return r == null ? 0 : clamp01(r);
        }
      }
    }

    // 2) review object keyed by question id
    if (isPlainObject(o.review) && qid != null) {
      const v = o.review[qid];
      if (v != null) {
        if (typeof v === "number") return clamp01(v);
        if (typeof v === "boolean") return v ? 1 : 0;

        if (isPlainObject(v)) {
          if (typeof v.isCorrect === "boolean") return v.isCorrect ? 1 : 0;

          if (v.ratio != null) return clamp01(v.ratio);
          if (v.scoreRatio != null) return clamp01(v.scoreRatio);

          if (v.pointsEarned != null || v.pointsPossible != null) {
            const r = ratio(v.pointsEarned, v.pointsPossible);
            return r == null ? 0 : clamp01(r);
          }

          if (v.earned != null || v.possible != null) {
            const r = ratio(v.earned, v.possible);
            return r == null ? 0 : clamp01(r);
          }
        }
      }
    }

    // 3) answers boolean array aligned to questions
    if (Array.isArray(o.answers) && typeof o.answers[i] === "boolean") {
      return o.answers[i] ? 1 : 0;
    }

    // 4) caregiver / observational keyed by id
    if (isPlainObject(o.resultsById) && qid != null) {
      const raw = o.resultsById[qid];
      const s = String(raw || "").toLowerCase();

      // Standard caregiver marks used in speaking/writing runners
      if (s === "said") return 1;

      // Optional compatibility (future / variations)
      if (s === "correct" || s === "true" || s === "yes") return 1;

      return 0;
    }

    return 0;
  }

  function capLevelByDifficulty(ageGroup, requestedLevel, breakdown) {
    const grp = String(ageGroup || "").trim().toLowerCase();
    const gate = DIFFICULTY_GATES[grp];
    if (!gate || !breakdown || !isPlainObject(breakdown)) return requestedLevel;

    const hardTotal = breakdown.hard && Number.isFinite(breakdown.hard.total) ? breakdown.hard.total : 0;
    const hardCorrect = breakdown.hard && Number.isFinite(breakdown.hard.correct) ? breakdown.hard.correct : 0;
    const medTotal = breakdown.medium && Number.isFinite(breakdown.medium.total) ? breakdown.medium.total : 0;
    const medCorrect = breakdown.medium && Number.isFinite(breakdown.medium.correct) ? breakdown.medium.correct : 0;

    const hardAcc = ratio(hardCorrect, hardTotal);
    const medAcc = ratio(medCorrect, medTotal);

    // Only gate if that difficulty exists in the test (total > 0).
    if (requestedLevel >= 5 && gate.level5 && hardTotal > 0) {
      const okHardPoints = hardTotal >= gate.level5.minHardPoints;
      const okHardAcc = hardAcc != null && hardAcc >= gate.level5.minHardAcc;
      if (!(okHardPoints && okHardAcc)) return 4;
    }

    if (requestedLevel >= 4 && gate.level4 && medTotal > 0) {
      const okMedPoints = medTotal >= gate.level4.minMedPoints;
      const okMedAcc = medAcc != null && medAcc >= gate.level4.minMedAcc;
      if (!(okMedPoints && okMedAcc)) return 3;
    }

    return requestedLevel;
  }

  function capBandByDifficulty(ageGroup, requestedBand, breakdown) {
    const grp = String(ageGroup || "").trim().toLowerCase();
    const gate = DIFFICULTY_GATES[grp];
    if (!gate || !breakdown || !isPlainObject(breakdown)) return requestedBand;

    const hardTotal = breakdown.hard && Number.isFinite(breakdown.hard.total) ? breakdown.hard.total : 0;
    const hardCorrect = breakdown.hard && Number.isFinite(breakdown.hard.correct) ? breakdown.hard.correct : 0;
    const medTotal = breakdown.medium && Number.isFinite(breakdown.medium.total) ? breakdown.medium.total : 0;
    const medCorrect = breakdown.medium && Number.isFinite(breakdown.medium.correct) ? breakdown.medium.correct : 0;

    const hardAcc = ratio(hardCorrect, hardTotal);
    const medAcc = ratio(medCorrect, medTotal);

    let band = Number(requestedBand);
    if (!Number.isFinite(band)) return requestedBand;

    // If the test has hard items, require stronger hard performance for higher bands.
    if (hardTotal > 0) {
      if (band >= 8.0 && gate.band80) {
        const okHardPoints = hardTotal >= gate.band80.minHardPoints;
        const okHardAcc = hardAcc != null && hardAcc >= gate.band80.minHardAcc;
        if (!(okHardPoints && okHardAcc)) band = Math.min(band, 7.5);
      }
      if (band >= 7.5 && gate.band75) {
        const okHardPoints = hardTotal >= gate.band75.minHardPoints;
        const okHardAcc = hardAcc != null && hardAcc >= gate.band75.minHardAcc;
        if (!(okHardPoints && okHardAcc)) band = Math.min(band, 7.0);
      }
    }

    // If the test has medium items, require decent medium performance for 7.0+
    if (medTotal > 0 && band >= 7.0 && gate.band70) {
      const okMedPoints = medTotal >= gate.band70.minMedPoints;
      const okMedAcc = medAcc != null && medAcc >= gate.band70.minMedAcc;
      if (!(okMedPoints && okMedAcc)) band = Math.min(band, 6.5);
    }

    // Clamp to 0.5 increments
    band = Math.round(band * 2) / 2;
    band = Math.min(Math.max(band, 3.0), 9.0);

    return band;
  }

  // -----------------------------
  // Public API
  // -----------------------------

  /**
   * Normalize skill score to 0–100 (practice).
   *
   * Supports:
   * - objective boolean correctness
   * - caregiver observational ("said"/etc.)
   * - partial credit pointsEarned/pointsPossible (or ratio)
   *
   * @param {Object} opts
   * @param {string} [opts.ageGroup]        Optional; used for confidence calibration
   * @param {string} [opts.skill]           Optional; reserved for future calibration
   * @param {Array<Object>} opts.questions  Bank questions used in the run
   * @param {Array|Object} [opts.review]    Either an array aligned to questions OR an object keyed by question id
   * @param {Object} [opts.resultsById]     Caregiver results keyed by question id (e.g. {id:"said"})
   * @param {Array<boolean>} [opts.answers] Optional array of booleans, aligned to questions
   * @returns {{ score:number, breakdown:Object, meta:Object }}
   */
  function normalizeSkillScore(opts) {
    const ageGroup = opts && typeof opts.ageGroup === "string" ? opts.ageGroup : "";
    const questions = Array.isArray(opts && opts.questions) ? opts.questions : [];

    // Breakdown counts are tracked by POINTS (not by number of questions) to respect resolved points.
    const breakdown = {
      easy: { correct: 0, total: 0 },
      medium: { correct: 0, total: 0 },
      hard: { correct: 0, total: 0 }
    };

    let totalWeight = 0;
    let earnedWeight = 0;
    let effectivePoints = 0;

    for (let i = 0; i < questions.length; i++) {
      const q = questions[i] || {};
      const diff = normDiff(q.difficulty);
      const points = resolvePoints(q);

      effectivePoints += points;

      const w = (DIFFICULTY_WEIGHTS[diff] || 1) * points;
      totalWeight += w;
      breakdown[diff].total += points;

      const r = getEarnedRatioForIndex(i, q, opts || {});
      const rr = clamp01(r);

      earnedWeight += w * rr;
      breakdown[diff].correct += points * rr;
    }

    const rawScore = totalWeight > 0 ? Math.round((earnedWeight / totalWeight) * 100) : 0;

    // Confidence shrink to stabilize short tests.
    const fullPts = getFullConfidencePoints(ageGroup);
    const shrunk = applyConfidenceShrink(rawScore, effectivePoints, fullPts);

    // Attach a tiny meta object that callers may optionally pass into deriveLevel by setting breakdown.__meta = meta.
    const meta = {
      totalQuestions: questions.length,
      effectivePoints: Math.round(effectivePoints),
      confidence: shrunk.confidence,
      rawScore: clampInt(rawScore, 0, 100)
    };

    // Non-breaking: some callers pass breakdown only; allow them to carry meta if they want.
    breakdown.__meta = meta;

    return {
      score: shrunk.score,
      breakdown,
      meta
    };
  }

  /**
   * Derive level title from score for age group + skill.
   * For 13–18 and ielts, returns practice Band label (0.5 steps) with difficulty gating.
   *
   * @returns {{ level:number, title:string, note?:string }}
   */
  function deriveLevel(ageGroup, skill, score, breakdown) {
    const grp = String(ageGroup || "").trim().toLowerCase();
    const pct = clampInt(score, 0, 100);

    // IELTS-inspired pathway (practice estimate)
    if (grp === "13-18" || grp === "ielts") {
      let band = scoreToPracticeBand(pct);
      band = capBandByDifficulty(grp, band, breakdown);

      return {
        level: band,
        title: formatBand(band),
        note: "Practice estimate (not official IELTS)."
      };
    }

    // Age levels (1–5)
    const def = LEVEL_DEFS[grp] || LEVEL_DEFS["8-10"];
    const th = Array.isArray(def.thresholds) ? def.thresholds : [20, 40, 60, 80];
    const titles = Array.isArray(def.titles) ? def.titles : ["Level 1", "Level 2", "Level 3", "Level 4", "Level 5"];

    let idx = 0;
    for (let i = 0; i < th.length; i++) {
      if (pct >= th[i]) idx = i + 1;
    }
    idx = Math.min(Math.max(idx, 0), titles.length - 1);

    // Difficulty gating for top levels where hard/medium exist.
    const requestedLevel = idx + 1;
    const cappedLevel = capLevelByDifficulty(grp, requestedLevel, breakdown);

    const finalIdx = Math.min(Math.max(cappedLevel - 1, 0), titles.length - 1);
    return {
      level: cappedLevel,
      title: String(titles[finalIdx] || "Level " + cappedLevel)
    };
  }

  /**
   * Compute overall certification once all four skills exist.
   *
   * Non-IELTS ages:
   * - Overall score = average of 4 normalized skill scores (0–100), then deriveLevel(ageGroup, ...)
   *
   * IELTS / 13–18:
   * - Overall band (practice estimate) = average of the 4 practice bands, rounded to nearest 0.5
   * - Also returns overall normalized score (0–100) as the average of normalized scores
   *
   * @param {string} ageGroup
   * @param {Object} skillScores { reading, listening, writing, speaking } each 0–100
   * @returns {{ complete:boolean, score:number|null, title:string|null, band?:number, skillBands?:Object }}
   */
  function computeOverall(ageGroup, skillScores) {
    const grp = String(ageGroup || "").trim().toLowerCase();
    const keys = ["reading", "listening", "writing", "speaking"];
    const vals = [];

    for (let i = 0; i < keys.length; i++) {
      const v = Number(skillScores && skillScores[keys[i]]);
      if (!Number.isFinite(v)) return { complete: false, score: null, title: null };
      vals.push(clampInt(v, 0, 100));
    }

    const avg = vals.reduce((a, b) => a + b, 0) / vals.length;
    const score = clampInt(avg, 0, 100);

    // IELTS pathway: compute average band (0.5 steps) and label as practice estimate.
    if (grp === "13-18" || grp === "ielts") {
      const skillBands = {
        reading: scoreToPracticeBand(vals[0]),
        listening: scoreToPracticeBand(vals[1]),
        writing: scoreToPracticeBand(vals[2]),
        speaking: scoreToPracticeBand(vals[3])
      };

      const bandAvg = (skillBands.reading + skillBands.listening + skillBands.writing + skillBands.speaking) / 4;
      const band = Math.round(bandAvg * 2) / 2; // nearest 0.5
      const safeBand = Math.min(Math.max(band, 3.0), 9.0);

      return {
        complete: true,
        score,
        band: safeBand,
        skillBands,
        title: "Overall " + formatBand(safeBand)
      };
    }

    const info = deriveLevel(grp, "", score, null);
    return { complete: true, score, title: info.title };
  }

  /**
   * Optional helper for UI: return level/band plan details.
   * This is NOT a full spec document; it’s structured enough for UI display/tooltips.
   */
  function getScoringPlan(ageGroup) {
    const grp = String(ageGroup || "").trim().toLowerCase();

    if (grp === "13-18" || grp === "ielts") {
      return {
        type: "band",
        note: "Bands shown are practice estimates (not official IELTS). Higher bands may require strong performance on harder items when present.",
        bands: [3.0, 3.5, 4.0, 4.5, 5.0, 5.5, 6.0, 6.5, 7.0, 7.5, 8.0, 8.5, 9.0],
        confidence: {
          fullConfidencePoints: getFullConfidencePoints(grp),
          behavior: "Short tests shrink extreme scores toward 50 to improve stability."
        },
        gates: DIFFICULTY_GATES[grp] || null
      };
    }

    const def = LEVEL_DEFS[grp] || LEVEL_DEFS["8-10"];
    return {
      type: "levels",
      thresholds: def.thresholds.slice(),
      titles: def.titles.slice(),
      confidence: {
        fullConfidencePoints: getFullConfidencePoints(grp),
        behavior: "Short tests shrink extreme scores toward 50 to improve stability."
      },
      gates: DIFFICULTY_GATES[grp] || null
    };
  }

  // Expose globally for IIFE runners and ES module views.
  window.UEAH_SCORING = {
    normalizeSkillScore,
    deriveLevel,
    computeOverall,
    getScoringPlan,
    // exported for debugging/testing
    _config: {
      DIFFICULTY_WEIGHTS: { ...DIFFICULTY_WEIGHTS },
      FULL_CONFIDENCE_POINTS: { ...FULL_CONFIDENCE_POINTS },
      LEVEL_DEFS: JSON.parse(JSON.stringify(LEVEL_DEFS)),
      DIFFICULTY_GATES: JSON.parse(JSON.stringify(DIFFICULTY_GATES))
    }
  };
})();
