/* assets/js/views/scoring.js
   Scoring plan view (/scoring) for Ultimate English At Home.

   Renders the scoring tables per age group using window.UEAH_SCORING_PLAN.
   This is an ES module view (no build step).
*/

import { breadcrumbs, escapeHtml } from "../common.js";

const AGE_ORDER = ["0-3", "4-7", "8-10", "11-12", "13-18", "ielts"];

// Friendly, relevant emojis for the scoring UI (view-only; does not affect scoring logic)
const AGE_EMOJI = {
  "0-3": "🧸",
  "4-7": "🎈",
  "8-10": "📚",
  "11-12": "🧠",
  "13-18": "🎓",
  ielts: "🏁",
};

const LEVEL_EMOJI = {
  1: "🌱",
  2: "🐣",
  3: "🌟",
  4: "🚀",
  5: "🏆",
};

function ageEmoji(age) {
  const a = String(age || "").trim().toLowerCase();
  return AGE_EMOJI[a] || "📘";
}

function levelEmoji(levelsType, row) {
  if (levelsType === "bands") {
    // Map practice bands to a simple progression.
    const m = String(row && row.title ? row.title : "").match(/Band\s*(\d+(?:\.\d+)?)/i);
    const band = m ? Number(m[1]) : NaN;
    if (!Number.isFinite(band)) return "🎯";
    if (band >= 8) return "🏆";
    if (band >= 7) return "🎯";
    if (band >= 6) return "🚀";
    if (band >= 5) return "🌟";
    return "🌱";
  }

  const lvl = Number(row && row.level);
  return LEVEL_EMOJI[lvl] || "⭐";
}

function displayAgeHeading(age) {
  const a = String(age || "").trim().toLowerCase();
  if (a === "ielts") return "IELTS Scoring (Practice)";
  return `Ages ${String(age || "").replace("-", "–")} Scoring`;
}

function isIeltsLike(age) {
  const a = String(age || "").trim().toLowerCase();
  return a === "13-18" || a === "ielts";
}

function getPlanApi() {
  return window.UEAH_SCORING_PLAN && typeof window.UEAH_SCORING_PLAN.getPlan === "function"
    ? window.UEAH_SCORING_PLAN
    : null;
}

function renderQuickNav(plan) {
  const links = AGE_ORDER.map((age) => {
    const label = age === "ielts" ? "IELTS" : String(age).replace("-", "–");
    const id = `age-${String(age)}`;
    const aria = age === "ielts" ? "Jump to IELTS scoring" : `Jump to ages ${String(age)} scoring`;
    return `<a class="btn btn--small scoring-age-btn" data-age-jump href="#${escapeHtml(
      id
    )}" aria-label="${escapeHtml(aria)}"><span class="emoji" aria-hidden="true">${ageEmoji(
      age
    )}</span> ${escapeHtml(label)}</a>`;
  }).join("");

  return `
    <div class="actions scoring-age-nav" aria-label="Jump to age group">
      ${links}
    </div>
  `;
}

function renderPathShowcase(api) {
  const palette = {
    "0-3": "green",
    "4-7": "blue",
    "8-10": "pink",
    "11-12": "pink",
    "13-18": "yellow",
    ielts: "purple",
  };

  const cards = AGE_ORDER.map((age) => {
    const agePlan = api.getAgePlan(age);
    if (!agePlan) return "";
    const rows = Array.isArray(agePlan.levels?.rows) ? agePlan.levels.rows : [];
    const entry = rows[0] || {};
    const label = age === "ielts" ? "IELTS" : `Ages ${String(age).replace("-", "–")}`;
    const title = String(entry.title || "Path");
    const desc = String(entry.canDo || entry.requirements || "Build your next English milestone.");
    const color = palette[age] || "blue";

    return `
      <a class="scoring-showcase-card" data-age-jump href="#age-${escapeHtml(String(age))}" data-glow="${escapeHtml(
        color
      )}" aria-label="Open ${escapeHtml(label)} scoring details">
        <div class="scoring-showcase-card__age">${escapeHtml(label)}</div>
        <div class="scoring-showcase-card__badge">${escapeHtml(title)}</div>
        <p class="scoring-showcase-card__desc">${escapeHtml(desc)}</p>
      </a>
    `;
  }).join("");

  return `<div class="scoring-showcase-grid" aria-label="Scoring path overview">${cards}</div>`;
}

function prefersReducedMotion() {
  try {
    return !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  } catch (_) {
    return false;
  }
}

function scrollToId(id, behavior) {
  const target = id ? document.getElementById(id) : null;
  if (!target) return false;

  const useBehavior = behavior || (prefersReducedMotion() ? "auto" : "smooth");

  try {
    target.scrollIntoView({ behavior: useBehavior, block: "start" });
  } catch (_) {
    // Older browsers: just jump
    target.scrollIntoView(true);
  }

  // Keep the URL hash in sync without adding extra history entries.
  try {
    const url = new URL(window.location.href);
    url.hash = `#${id}`;
    history.replaceState(history.state, "", url.toString());
  } catch (_) {
    // Fallback
    try {
      window.location.hash = `#${id}`;
    } catch (_) {}
  }

  return true;
}

function renderScoringPageStyles() {
  // Kept inline so the scoring page can ship small, self-contained enhancements
  // without changing the global stylesheet.
  return `
    <style>
      .scoring-page a[data-age-jump]:hover,
      .scoring-page a[data-age-jump]:focus-visible{
        box-shadow:
          0 0 0 3px rgba(47, 124, 255, .16),
          0 0 22px rgba(47, 124, 255, .30),
          var(--shadow);
        border-color: rgba(47, 124, 255, .52);
      }
      /* Ensure anchored sections aren't hidden under the sticky header */
      .scoring-page .tests-section{ scroll-margin-top: 96px; }
      @media (prefers-color-scheme: dark){
        .scoring-page a[data-age-jump]:hover,
        .scoring-page a[data-age-jump]:focus-visible{
          box-shadow:
            0 0 0 3px rgba(122, 176, 255, .18),
            0 0 22px rgba(122, 176, 255, .28),
            var(--shadow);
          border-color: rgba(122, 176, 255, .58);
        }
      }
    </style>
  `;
}

function renderMethod(plan) {
  const m = plan.method || {};
  const w = m.difficultyWeights || {};
  const weightsText = `easy=${escapeHtml(String(w.easy))}, medium=${escapeHtml(
    String(w.medium)
  )}, hard=${escapeHtml(String(w.hard))}`;

  return `
    <section class="note" aria-label="How scoring works">
      <p><strong><span class="emoji" aria-hidden="true">🧮</span> How scoring works (practice):</strong> ${escapeHtml(
        m.normalizedScore || ""
      )}</p>
      <p><strong><span class="emoji" aria-hidden="true">⚖️</span> Difficulty weighting:</strong> ${weightsText}</p>
      <p><strong><span class="emoji" aria-hidden="true">🎯</span> Stability:</strong> ${escapeHtml(
        m.stability || ""
      )}</p>
      <p><strong><span class="emoji" aria-hidden="true">👨‍👩‍👧‍👦</span> Caregiver marking:</strong> ${escapeHtml(
        m.caregiverMarking || ""
      )}</p>
    </section>
  `;
}

function renderLevelCards(agePlan) {
  const levels = agePlan.levels || {};
  const rows = Array.isArray(levels.rows) ? levels.rows : [];

  if (!rows.length) {
    return `<div class="note">No scoring table available for this age group.</div>`;
  }

  const cardHtml = rows
    .map((r) => {
      const iconText =
        levels.type === "bands"
          ? String(r.title || "").replace("Band ", "").replace(" (practice estimate)", "")
          : `L${r.level}`;

      const title = r.title || "";
      const range = r.range || "";
      const req = r.requirements || "";
      const canDo = r.canDo || "";

      return `
        <div class="card" role="listitem">
          <div class="card-icon" aria-hidden="true"><span>${escapeHtml(iconText)}</span></div>
          <div class="card-body">
            <h3 class="card-title"><span class="emoji" aria-hidden="true">${levelEmoji(
              levels.type,
              r
            )}</span> ${escapeHtml(title)}</h3>
            <p class="card-text"><strong><span class="emoji" aria-hidden="true">📊</span> Score range:</strong> ${escapeHtml(
              range
            )}</p>
            ${
              req
                ? `<p class="card-text"><strong><span class="emoji" aria-hidden="true">✅</span> Requirements:</strong> ${escapeHtml(
                    req
                  )}</p>`
                : ""
            }
            ${
              canDo
                ? `<p class="card-text"><strong><span class="emoji" aria-hidden="true">💡</span> Can do:</strong> ${escapeHtml(
                    canDo
                  )}</p>`
                : ""
            }
          </div>
        </div>
      `;
    })
    .join("");

  const notes = Array.isArray(levels.notes) ? levels.notes : [];
  const notesHtml = notes.length
    ? `<div class="note"><strong><span class="emoji" aria-hidden="true">📝</span> Notes:</strong><ul>${notes
        .map((n) => `<li>${escapeHtml(n)}</li>`)
        .join("")}</ul></div>`
    : "";

  return `
    <div class="card-grid" role="list" aria-label="Scoring table">${cardHtml}</div>
    ${notesHtml}
  `;
}

function renderAgeSection(agePlan) {
  const stability = agePlan.stabilityTarget || {};
  const overall = agePlan.overall || {};
  const notes = Array.isArray(agePlan.notes) ? agePlan.notes : [];

  return `
    <section id="age-${escapeHtml(agePlan.id)}" class="tests-section" aria-label="${escapeHtml(
      agePlan.label
    )} scoring">
      <h2 class="section-title"><span class="emoji" aria-hidden="true">${ageEmoji(
        agePlan.id
      )}</span> ${escapeHtml(displayAgeHeading(agePlan.id))}</h2>

      <div class="note">
        <p><strong><span class="emoji" aria-hidden="true">🎯</span> Stability target:</strong> Full confidence at <strong>${escapeHtml(
          String(stability.fullConfidencePoints || "")
        )}</strong> effective points. ${escapeHtml(stability.meaning || "")}</p>

        <p><strong><span class="emoji" aria-hidden="true">🏅</span> Overall certification:</strong> ${escapeHtml(
          overall.formula || ""
        )}</p>

        ${
          isIeltsLike(agePlan.id)
            ? `<p><strong><span class="emoji" aria-hidden="true">⚠️</span> Disclaimer:</strong> ${escapeHtml(
                (window.UEAH_SCORING_PLAN && window.UEAH_SCORING_PLAN.getPlan().disclaimer.ielts) || ""
              )}</p>`
            : ""
        }

        ${
          notes.length
            ? `<ul>${notes
                .map((n) => `<li><span class="emoji" aria-hidden="true">📝</span> ${escapeHtml(n)}</li>`)
                .join("")}</ul>`
            : ""
        }
      </div>

      ${renderLevelCards(agePlan)}
    </section>
  `;
}

export function getView(ctx) {
  const { hrefFor } = ctx;

  const title = "Scoring Plan — UEAH";
  const description =
    "See how UEAH practice scores, levels, and overall certifications are calculated for each age group.";

  const breadcrumb = breadcrumbs([
    { label: "Home", href: hrefFor("/") },
    { label: "Profile", href: hrefFor("/profile") },
    { label: "Scoring plan" },
  ]);

  const api = getPlanApi();
  if (!api) {
    const html = `
      <section class="page-top scoring-page">
        ${renderScoringPageStyles()}
        ${breadcrumb}
        <h1 class="page-title"><span class="emoji" aria-hidden="true">📋</span> Scoring plan</h1>

        <div class="note">
          <strong>Missing scoring plan data.</strong>
          <p>This page requires <code>assets/js/scoring-plan.js</code> to be loaded.</p>
        </div>

        <div class="actions">
          <a class="btn" href="${hrefFor("/profile")}" data-nav>← Back to Profile</a>
          <a class="btn" href="${hrefFor("/")}" data-nav>Home</a>
        </div>
      </section>
    `;
    return { title, description, html };
  }

  const plan = api.getPlan();
  const sections = AGE_ORDER.map((age) => api.getAgePlan(age)).filter(Boolean);

  const html = `
    <section class="page-top scoring-page scoring-nextgen">
      ${renderScoringPageStyles()}
      ${breadcrumb}

      <div class="scoring-nextgen__hero">
        <h1 class="page-title scoring-nextgen__title">Next-Gen Scoring Plan</h1>
        <p class="page-subtitle scoring-nextgen__subtitle">
          Choose a path to level up your English — tailored to the expected skill level for each age group.
        </p>
      </div>

      ${renderPathShowcase(api)}

      <div class="note" aria-label="Disclaimer">
        <p><strong><span class="emoji" aria-hidden="true">⚠️</span> General:</strong> ${escapeHtml(
          plan.disclaimer && plan.disclaimer.general ? plan.disclaimer.general : ""
        )}</p>
        <p><strong><span class="emoji" aria-hidden="true">⚠️</span> IELTS:</strong> ${escapeHtml(
          plan.disclaimer && plan.disclaimer.ielts ? plan.disclaimer.ielts : ""
        )}</p>
      </div>

      ${renderMethod(plan)}
      ${renderQuickNav(plan)}

      <div aria-label="Scoring tables">
        ${sections
          .map((agePlan) => {
            return `
              <div class="note" aria-hidden="true" style="display:none"></div>
              ${renderAgeSection(agePlan)}
            `;
          })
          .join("")}
      </div>

      <div class="actions">
        <a class="btn" href="${hrefFor("/profile")}" data-nav>← Back to Profile</a>
        <a class="btn" href="${hrefFor("/tests")}" data-nav>Tests</a>
      </div>
    </section>
  `;

  const afterRender = () => {
    const root = document.querySelector(".scoring-page");
    if (!root) return;

    // Intercept age jump links so they work reliably within the SPA and
    // can apply smooth scrolling without breaking deep links.
    const jumpLinks = Array.from(root.querySelectorAll("a[data-age-jump][href^='#']"));
    jumpLinks.forEach((a) => {
      a.addEventListener("click", (e) => {
        const href = a.getAttribute("href") || "";
        const id = href.replace(/^#/, "");
        if (!id) return;

        const ok = scrollToId(id);
        if (ok) e.preventDefault();
      });
    });

    // Support loading /scoring#age-... (initial hash) by scrolling after the
    // SPA renders the DOM.
    const initialHash = window.location.hash || "";
    if (initialHash.startsWith("#age-")) {
      const id = initialHash.replace(/^#/, "");
      // Wait one frame so layout is ready.
      requestAnimationFrame(() => scrollToId(id, prefersReducedMotion() ? "auto" : "smooth"));
    }
  };

  return { title, description, html, afterRender };
}
