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

    // Get games for this age + skill
    let games = [];
    if (window.UEAH_GAMES_STORE) {
        games = window.UEAH_GAMES_STORE.getGamesByAgeSkill(age, skill);
    }

    // Build game cards
    const cardsHtml = games.length > 0
        ? games.map((game) => {
            // Get high score if available
            let highScore = 0;
            if (window.UEAH_GAME_SCORES) {
                highScore = window.UEAH_GAME_SCORES.getHighScore(game.slug);
            }

            const glow = DIFFICULTY_GLOW[game.difficulty] || "green";

            return `
          <a class="card game-card" href="${hrefFor(`/games/${age}/${skill}/${game.slug}`)}" data-nav role="listitem" data-glow="${glow}">
            <div class="card-icon game-emoji-icon" aria-hidden="true">
              <span class="game-emoji">${game.emoji}</span>
            </div>
            <div class="card-body">
              <h2 class="card-title">${game.title}</h2>
              <p class="card-text">${game.description}</p>
              <div class="game-meta">
                ${renderDifficulty(game.difficulty)}
                ${highScore > 0 ? `<span class="high-score-badge">🏆 ${highScore}</span>` : ''}
                ${game.usesMicrophone ? '<span class="mic-badge" title="Uses microphone">🎤</span>' : ''}
              </div>
            </div>
          </a>
        `;
        }).join("")
        : `<div class="note">No games available for this skill yet. Check back soon!</div>`;

    const html = `
    <section class="page-top games-page">
      ${breadcrumb}
      <h1 class="page-title">
        <span class="emoji" aria-hidden="true">🎮</span> 
        ${skillLabel} Games
      </h1>
      <p class="page-subtitle">Choose a game to play!</p>
      <div class="card-grid games-list" role="list">
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
