/* assets/js/views/games.js
   Games index view - Age selection for Ultimate English At Home.
*/

import { GAME_AGE_GROUPS } from '../constants.js';
import { breadcrumbs, card, ageGroupLabel } from '../common.js';

// Age group icons and labels with emojis
const AGE_INFO = {
  "0-3": { emoji: "👶", label: "Ages 0-3", sublabel: "Tap + Listen", glow: "green" },
  "4-7": { emoji: "🧒", label: "Ages 4-7", sublabel: "Early Reading", glow: "yellow" },
  "8-10": { emoji: "🧑", label: "Ages 8-10", sublabel: "Vocabulary Builder", glow: "red" },
  "11-12": { emoji: "🧑‍🎓", label: "Ages 11-12", sublabel: "Grammar Master", glow: "blue" },
  "13-18": { emoji: "🧑‍💻", label: "Ages 13-18", sublabel: "Speaking Pro", glow: "pink" },
};

// Generate age icon SVG
function iconAge(age) {
  const info = AGE_INFO[age];
  if (!info) return "";
  return `<span class="game-age-emoji" aria-hidden="true">${info.emoji}</span>`;
}

export function getView(ctx) {
  const { hrefFor } = ctx;
  const title = 'Games — UEAH';
  const description = 'Play interactive English learning games by age group!';

  const breadcrumb = breadcrumbs([
    { label: 'Home', href: hrefFor('/') },
    { label: 'Games' },
  ]);

  // Build age selection cards
  const cardsHtml = GAME_AGE_GROUPS.map((age) => {
    const info = AGE_INFO[age] || { emoji: "🎮", label: age, sublabel: "Games", glow: "green" };
    return `
      <a class="card" href="${hrefFor(`/games/${age}`)}" data-nav role="listitem" data-glow="${info.glow}">
        <div class="card-icon game-age-icon" aria-hidden="true">
          <span class="game-age-emoji">${info.emoji}</span>
        </div>
        <div class="card-body">
          <h2 class="card-title">${info.label}</h2>
          <p class="card-text">${info.sublabel}</p>
        </div>
      </a>
    `;
  }).join("");

  // IELTS Game card (styled like IELTS test cards)
  const ieltsCard = `
    <a class="card" href="${hrefFor('/games/featured/comprehensive/ielts-runner')}" data-nav role="listitem" data-glow="iels">
      <div class="card-icon game-age-icon" aria-hidden="true">
        <span class="game-age-emoji">🏆</span>
      </div>
      <div class="card-body">
        <h2 class="card-title">IELTS BuildUp</h2>
        <p class="card-text">The Ultimate Challenge</p>
      </div>
    </a>
  `;

  // Get stats if available
  let statsHtml = "";
  if (window.UEAH_GAME_SCORES) {
    const stats = window.UEAH_GAME_SCORES.getTotalStats();
    if (stats.totalPlays > 0) {
      statsHtml = `
        <div class="games-stats-summary">
          <div class="stat-pill"><span class="stat-emoji">🎮</span> ${stats.gamesPlayed} games played</div>
          <div class="stat-pill"><span class="stat-emoji">🏆</span> ${stats.totalScore} total points</div>
        </div>
      `;
    }
  }

  const html = `
    <section class="page-top games-page games-nextgen">
      ${breadcrumb}
      <div class="subpage-hero">
        <h1 class="page-title"><span class="emoji" aria-hidden="true">🎮</span> Games</h1>
        <p class="page-subtitle">Choose your age group to find fun learning games!</p>
      </div>
      ${statsHtml}
      <div class="card-grid games-age-grid" role="list">
        ${cardsHtml}
        ${ieltsCard}
      </div>
      <div class="actions">
        <a class="btn" href="${hrefFor('/')}" data-nav>← Back to Home</a>
      </div>
    </section>
  `;

  return { title, description, html };
}
