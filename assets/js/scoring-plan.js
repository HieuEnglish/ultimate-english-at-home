/* assets/js/scoring-plan.js
   Human-readable scoring plan tables for UEAH.

   Why this exists:
   - scoring.js contains the *rules* (normalize, derive level, compute overall)
   - this file contains the *explanation tables* for the UI (/scoring)

   Notes:
   - IELTS-related outputs are "practice estimates" only (not official IELTS).
   - This module is loaded as a plain script (IIFE) and exposes:
     window.UEAH_SCORING_PLAN = { getPlan(), getAgePlan(age) }
*/

(function () {
  "use strict";

  function nowIso() {
    return new Date().toISOString();
  }

  function isPlainObject(x) {
    return !!x && typeof x === "object" && !Array.isArray(x);
  }

  function safeNum(n) {
    const x = Number(n);
    return Number.isFinite(x) ? x : null;
  }

  function pct(n) {
    const x = safeNum(n);
    if (x == null) return "";
    return `${Math.round(x * 100)}%`;
  }

  function displayAgeLabel(age) {
    const a = String(age || "").trim().toLowerCase();
    if (a === "ielts") return "IELTS";
    return `Ages ${String(age || "").replace("-", "–")}`;
  }

  function clampInt(n, lo, hi) {
    const x = Number(n);
    const v = Number.isFinite(x) ? Math.round(x) : 0;
    return Math.min(Math.max(v, lo), hi);
  }

  function toRange(min, max) {
    const a = clampInt(min, 0, 100);
    const b = clampInt(max, 0, 100);
    if (a === b) return `${a}`;
    return `${a}–${b}`;
  }

  // Mirror the mapping in assets/js/scoring.js (0–100 -> 3.0–9.0 in 0.5 steps)
  function bandRanges() {
    return [
      { min: 0, max: 9, band: 3.0 },
      { min: 10, max: 14, band: 3.5 },
      { min: 15, max: 21, band: 4.0 },
      { min: 22, max: 27, band: 4.5 },
      { min: 28, max: 35, band: 5.0 },
      { min: 36, max: 41, band: 5.5 },
      { min: 42, max: 49, band: 6.0 },
      { min: 50, max: 55, band: 6.5 },
      { min: 56, max: 63, band: 7.0 },
      { min: 64, max: 69, band: 7.5 },
      { min: 70, max: 77, band: 8.0 },
      { min: 78, max: 85, band: 8.5 },
      { min: 86, max: 100, band: 9.0 },
    ];
  }

  function getScoringConfig() {
    const s = window.UEAH_SCORING;
    const cfg = s && isPlainObject(s._config) ? s._config : null;

    const difficultyWeights =
      cfg && isPlainObject(cfg.DIFFICULTY_WEIGHTS)
        ? cfg.DIFFICULTY_WEIGHTS
        : { easy: 1, medium: 1.5, hard: 2 };

    const fullConfidencePoints =
      cfg && isPlainObject(cfg.FULL_CONFIDENCE_POINTS)
        ? cfg.FULL_CONFIDENCE_POINTS
        : { "0-3": 8, "4-7": 10, "8-10": 12, "11-12": 14, "13-18": 18, ielts: 20 };

    const difficultyGates =
      cfg && isPlainObject(cfg.DIFFICULTY_GATES) ? cfg.DIFFICULTY_GATES : {};

    const levelDefs =
      cfg && isPlainObject(cfg.LEVEL_DEFS) ? cfg.LEVEL_DEFS : null;

    return { difficultyWeights, fullConfidencePoints, difficultyGates, levelDefs };
  }

  // Friendly “can do” descriptors (not claims of official standards)
  const CAN_DO = {
    "0-3": [
      "Recognizes familiar sounds/words with support from an adult.",
      "Responds to simple words/sounds; begins matching pictures and words.",
      "Understands common words/phrases in everyday routines; begins simple choices.",
      "Uses short phrases with support; understands simple questions in context.",
      "Communicates basic needs and ideas; follows simple multi-step routines with support.",
    ],
    "4-7": [
      "Understands very common classroom/home words with pictures.",
      "Follows simple instructions; recognizes common sight words and phrases.",
      "Reads/listens for main idea in short content; uses basic sentences with prompts.",
      "Understands key details; uses clearer sentences and simple linking words.",
      "Handles longer tasks with confidence; shows accuracy on harder items when present.",
    ],
    "8-10": [
      "Understands basic texts/audio with support; can answer direct questions.",
      "Finds main idea and some details; uses simple paragraphs/speaking turns with prompts.",
      "Understands a wider range of topics; explains ideas with examples sometimes.",
      "Uses more accurate grammar/vocab; handles multi-step questions and longer responses.",
      "Shows control and flexibility; performs strongly on harder items when present.",
    ],
    "11-12": [
      "Understands straightforward content; can complete basic tasks reliably.",
      "Finds details and makes simple inferences; produces clearer structured responses.",
      "Handles typical school-level tasks; maintains accuracy and coherence more often.",
      "Explains and supports answers; uses better structure and vocabulary range.",
      "Strong, consistent performance including harder items when present.",
    ],
    "13-18": [
      "Handles very simple tasks; needs support for accuracy and detail.",
      "Completes basic tasks with partial accuracy; limited range/consistency.",
      "Completes common tasks with reasonable accuracy; some flexibility.",
      "More consistent performance; clearer structure and stronger detail control.",
      "Strong performance with harder items when present; higher practice band estimates.",
    ],
    "ielts": [
      "Handles very simple tasks; needs support for accuracy and detail.",
      "Completes basic tasks with partial accuracy; limited range/consistency.",
      "Completes common tasks with reasonable accuracy; some flexibility.",
      "More consistent performance; clearer structure and stronger detail control.",
      "Strong performance with harder items when present; higher practice band estimates.",
    ],
  };

  function buildLevelsForAge(age, scoringPlanObj, cfg) {
    const a = String(age || "").trim().toLowerCase();

    // IELTS-like: show band table instead of 5 levels
    if (a === "13-18" || a === "ielts") {
      const gates = cfg.difficultyGates[a] || {};
      const gateNotes = [];

      if (gates.band80) {
        gateNotes.push(
          `To keep Band 8.0+ when hard items exist: ≥ ${gates.band80.minHardPoints} hard points and ≥ ${pct(
            gates.band80.minHardAcc
          )} hard accuracy; otherwise capped.`
        );
      }
      if (gates.band75) {
        gateNotes.push(
          `To keep Band 7.5+ when hard items exist: ≥ ${gates.band75.minHardPoints} hard points and ≥ ${pct(
            gates.band75.minHardAcc
          )} hard accuracy; otherwise capped.`
        );
      }
      if (gates.band70) {
        gateNotes.push(
          `To keep Band 7.0+ when medium items exist: ≥ ${gates.band70.minMedPoints} medium points and ≥ ${pct(
            gates.band70.minMedAcc
          )} medium accuracy; otherwise capped.`
        );
      }

      return {
        type: "bands",
        rows: bandRanges().map((r) => ({
          range: toRange(r.min, r.max),
          title: `Band ${String(r.band).replace(/\.0$/, "")} (practice estimate)`,
          requirements: "",
          canDo: "",
        })),
        notes: [
          "Bands are practice estimates only (not official IELTS).",
          ...(gateNotes.length ? gateNotes : []),
        ],
      };
    }

    // Non-IELTS: 5 levels from scoring.js plan (preferred) or fallback definitions
    let thresholds = null;
    let titles = null;

    if (window.UEAH_SCORING && typeof window.UEAH_SCORING.getScoringPlan === "function") {
      const p = window.UEAH_SCORING.getScoringPlan(a);
      if (p && p.type === "levels") {
        thresholds = Array.isArray(p.thresholds) ? p.thresholds.slice() : null;
        titles = Array.isArray(p.titles) ? p.titles.slice() : null;
      }
    }

    // Fallback if scoring.js is not available
    if (!thresholds || !titles) {
      const defs = cfg.levelDefs && cfg.levelDefs[a] ? cfg.levelDefs[a] : null;
      thresholds = defs && Array.isArray(defs.thresholds) ? defs.thresholds.slice() : [20, 40, 60, 80];
      titles = defs && Array.isArray(defs.titles) ? defs.titles.slice() : ["Level 1", "Level 2", "Level 3", "Level 4", "Level 5"];
    }

    const th = thresholds;
    const tt = titles;

    const gates = cfg.difficultyGates[a] || {};
    const l5 = gates.level5 || null;
    const l4 = gates.level4 || null;

    const canDo = Array.isArray(CAN_DO[a]) ? CAN_DO[a] : ["", "", "", "", ""];

    const ranges = [
      { min: 0, max: (th[0] || 0) - 1 },
      { min: th[0] || 0, max: (th[1] || 0) - 1 },
      { min: th[1] || 0, max: (th[2] || 0) - 1 },
      { min: th[2] || 0, max: (th[3] || 0) - 1 },
      { min: th[3] || 0, max: 100 },
    ].map((r) => ({ min: Math.max(0, r.min), max: Math.max(0, r.max) }));

    const rows = tt.slice(0, 5).map((title, idx) => {
      const level = idx + 1;
      const rr = ranges[idx] || { min: 0, max: 100 };

      let requirements = "No special difficulty requirements.";
      if (level === 4 && l4) {
        requirements = `If medium items exist: ≥ ${l4.minMedPoints} medium points AND ≥ ${pct(l4.minMedAcc)} medium accuracy (otherwise capped).`;
      }
      if (level === 5 && l5) {
        requirements = `If hard items exist: ≥ ${l5.minHardPoints} hard points AND ≥ ${pct(l5.minHardAcc)} hard accuracy (otherwise capped).`;
      }

      return {
        level,
        range: toRange(rr.min, rr.max),
        title: String(title || `Level ${level}`),
        requirements,
        canDo: String(canDo[idx] || ""),
      };
    });

    return {
      type: "levels",
      thresholds: th.slice(),
      titles: tt.slice(),
      rows,
      notes: [],
    };
  }

  // Cache computed plan (so views can call getPlan() repeatedly)
  let _cached = null;

  function buildPlan() {
    const cfg = getScoringConfig();

    const plan = {
      version: 1,
      updatedAt: nowIso(),
      disclaimer: {
        general:
          "All scores and levels in UEAH are practice-based and are not official certifications.",
        ielts:
          "IELTS-related bands shown in UEAH are practice estimates only and are not official IELTS band scores.",
      },
      method: {
        normalizedScore:
          "Normalized score is 0–100. It is calculated from correctness using difficulty weighting (easy/medium/hard) and question points.",
        difficultyWeights: {
          easy: cfg.difficultyWeights.easy,
          medium: cfg.difficultyWeights.medium,
          hard: cfg.difficultyWeights.hard,
        },
        stability:
          "Short tests are less stable. UEAH applies a confidence adjustment that shrinks extreme scores toward 50 when the run has low 'effective points'.",
        caregiverMarking:
          "For caregiver-marked speaking/writing tasks, an item marked “said” counts as correct.",
      },
      overall: {
        nonIelts:
          "Overall certification score = average of the 4 saved skill scores (Reading/Listening/Writing/Speaking). Overall title is derived from the overall score.",
        ielts:
          "Overall practice band = average of the 4 practice bands, rounded to the nearest 0.5. The profile may also display a 0–100 overall score (average of normalized scores).",
      },
      ageGroups: {},
      order: ["0-3", "4-7", "8-10", "11-12", "13-18", "ielts"],
    };

    const ages = plan.order.slice();
    ages.forEach((age) => {
      const a = String(age).toLowerCase();

      const fullPts =
        safeNum(cfg.fullConfidencePoints[a]) != null
          ? cfg.fullConfidencePoints[a]
          : 12;

      const isIeltsLike = a === "13-18" || a === "ielts";

      const levelsOrBands = buildLevelsForAge(a, plan, cfg);

      plan.ageGroups[a] = {
        id: a,
        label: displayAgeLabel(a),
        type: isIeltsLike ? "ielts-like" : "age-levels",
        stabilityTarget: {
          fullConfidencePoints: fullPts,
          meaning:
            "At or above this many effective points, results are treated as full-confidence (no shrink). Below it, results are partially shrunk toward 50 for stability.",
        },
        plannedAchievement: {
          comparableAcrossTests:
            "Scores are comparable because they are normalized (0–100) using weighted difficulty and points. Short runs are adjusted for stability using the confidence rule.",
          minimumForTopAwards:
            isPlainObject(cfg.difficultyGates[a])
              ? "Top titles/bands may be capped when harder items exist but performance on those items is weak (difficulty gating)."
              : "No extra gating rules.",
        },
        levels: levelsOrBands,
        canDo: Array.isArray(CAN_DO[a]) ? CAN_DO[a].slice() : [],
        notes: isIeltsLike
          ? [
              plan.disclaimer.ielts,
              "Practice bands are derived from the normalized score and may be capped by difficulty requirements when medium/hard items exist.",
            ]
          : [],
        overall: isIeltsLike
          ? {
              formula: plan.overall.ielts,
              titleRule:
                "Overall title uses the computed overall practice band (rounded to nearest 0.5) and is labeled as a practice estimate.",
            }
          : {
              formula: plan.overall.nonIelts,
              titleRule:
                "Overall title is derived from the overall 0–100 score using the same age-group level titles.",
            },
      };
    });

    return plan;
  }

  function getPlan() {
    if (_cached) return _cached;
    _cached = buildPlan();
    return _cached;
  }

  function getAgePlan(ageGroup) {
    const plan = getPlan();
    const key = String(ageGroup || "").trim().toLowerCase();
    return plan.ageGroups && plan.ageGroups[key] ? plan.ageGroups[key] : null;
  }

  window.UEAH_SCORING_PLAN = {
    getPlan,
    getAgePlan,
  };
})();
