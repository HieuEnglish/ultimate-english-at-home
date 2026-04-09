/* assets/js/views/games-skill.js
   Games skill view - List of games for age + skill.
*/

import { breadcrumbs, capitalize } from '../common.js';

// Age labels
const AGE_LABELS = {
    "0-3": "Ages 0-3",
    "4-7": "Ages 4-7",
    "8-10": "Ages 8-10",
    "11-12": "Ages 11-12",
    "13-18": "Ages 13-18",
};

// Skill labels
const SKILL_LABELS = {
    vocabulary: "Vocabulary",
    listening: "Listening",
    spelling: "Spelling",
    grammar: "Grammar",
    speaking: "Speaking",
};

// Difficulty stars
function renderDifficulty(level) {
    const filled = "⭐".repeat(Math.min(level, 5));
    const empty = "☆".repeat(Math.max(0, 5 - level));
    return `<span class="difficulty-stars" title="Difficulty ${level}/5">${filled}${empty}</span>`;
}

// Glow colors based on difficulty
const DIFFICULTY_GLOW = {
    1: "green",
    2: "yellow",
    3: "orange",
    4: "red",
    5: "pink",
};

export function getView(ctx, age, skill) {
    const { hrefFor } = ctx;
    const ageLabel = AGE_LABELS[age] || age;
    const skillLabel = SKILL_LABELS[skill] || capitalize(skill);
    const title = `${skillLabel} Games (${ageLabel}) — UEAH`;
    const description = `Play ${skillLabel.toLowerCase()} games for ${ageLabel}`;

    const breadcrumb = breadcrumbs([
        { label: 'Home', href: hrefFor('/') },
        { label: 'Games', href: hrefFor('/games') },
        { label: ageLabel, href: hrefFor(`/games/${age}`) },
        { label: skillLabel },
    ]);

    let games = [];
    if (window.UEAH_GAMES_STORE) {
        games = window.UEAH_GAMES_STORE.getGamesByAgeSkill(age, skill);
    }

    const cardsHtml = games.length > 0
        ? games.map((game) => {
            let highScore = 0;
            if (window.UEAH_GAME_SCORES) {
                highScore = window.UEAH_GAME_SCORES.getHighScore(game.slug);
            }

            const glow = DIFFICULTY_GLOW[game.difficulty] || 'green';

            return `
          <a class="games-list-card" href="${hrefFor(`/games/${age}/${skill}/${game.slug}`)}" data-nav role="listitem" data-glow="${glow}">
            <div class="games-list-card__icon" aria-hidden="true">${game.emoji}</div>
            <div class="games-list-card__top">
              <span class="games-list-card__difficulty">${renderDifficulty(game.difficulty)}</span>
              ${highScore > 0 ? `<span class="games-list-card__score">🏆 ${highScore}</span>` : '<span class="games-list-card__score is-muted">New</span>'}
            </div>
            <h2 class="games-list-card__title">${game.title}</h2>
            <p class="games-list-card__desc">${game.description}</p>
            <div class="games-list-card__chips">
              <span class="games-list-card__chip">${skillLabel}</span>
              ${game.usesMicrophone ? '<span class="games-list-card__chip">🎤 Mic</span>' : ''}
              ${game.hasTimer ? '<span class="games-list-card__chip">⏱ Timed</span>' : '<span class="games-list-card__chip">✨ Replayable</span>'}
            </div>
            <span class="games-list-card__cta">Play game</span>
          </a>
        `;
        }).join('')
        : `<div class="note">No games available for this skill yet. Check back soon!</div>`;

    const html = `
    <section class="page-top games-page games-skill-nextgen">
      ${breadcrumb}
      <div class="subpage-hero games-skill-nextgen__hero">
        <span class="resources-hero__label">${ageLabel} • ${skillLabel}</span>
        <h1 class="page-title">${skillLabel} Games</h1>
        <p class="page-subtitle">Choose a game to play and jump into a more polished challenge screen.</p>
      </div>
      <div class="games-list-grid" role="list">
        ${cardsHtml}
      </div>
      <div class="actions">
        <a class="btn" href="${hrefFor(`/games/${age}`)}" data-nav>← Back to Skills</a>
        <a class="btn btn--primary" href="${hrefFor('/games')}" data-nav>All Games</a>
      </div>
    </section>
  `;

    return { title, description, html };
}
