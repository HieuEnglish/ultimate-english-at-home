/* assets/js/views/games-age.js
   Games age view - Skill selection for chosen age group.
*/

import { GAME_SKILLS } from '../constants.js';
import { breadcrumbs, capitalize } from '../common.js';

// Skill info with emojis and descriptions
const SKILL_INFO = {
    vocabulary: { emoji: "📚", label: "Vocabulary", description: "Learn new words!", glow: "green" },
    listening: { emoji: "👂", label: "Listening", description: "Practice hearing English!", glow: "blue" },
    spelling: { emoji: "🔤", label: "Spelling", description: "Spell words correctly!", glow: "yellow" },
    grammar: { emoji: "📝", label: "Grammar", description: "Master sentence structure!", glow: "red" },
    speaking: { emoji: "🎙️", label: "Speaking", description: "Practice pronunciation!", glow: "pink" },
};

// Age labels
const AGE_LABELS = {
    "0-3": "Ages 0-3",
    "4-7": "Ages 4-7",
    "8-10": "Ages 8-10",
    "11-12": "Ages 11-12",
    "13-18": "Ages 13-18",
};

export function getView(ctx, age) {
    const { hrefFor } = ctx;
    const ageLabel = AGE_LABELS[age] || age;
    const title = `${ageLabel} Games — UEAH`;
    const description = `Interactive English games for ${ageLabel}`;

    const breadcrumb = breadcrumbs([
        { label: 'Home', href: hrefFor('/') },
        { label: 'Games', href: hrefFor('/games') },
        { label: ageLabel },
    ]);

    // Get skills that have games for this age
    let availableSkills = GAME_SKILLS;
    if (window.UEAH_GAMES_STORE) {
        availableSkills = window.UEAH_GAMES_STORE.getSkillsForAge(age);
    }

    // Build skill cards
    const cardsHtml = availableSkills.map((skill) => {
        const info = SKILL_INFO[skill] || { emoji: "🎮", label: capitalize(skill), description: "Games", glow: "green" };

        // Get game count for this skill
        let gameCount = 0;
        if (window.UEAH_GAMES_STORE) {
            gameCount = window.UEAH_GAMES_STORE.getGamesByAgeSkill(age, skill).length;
        }

        return `
      <a class="card" href="${hrefFor(`/games/${age}/${skill}`)}" data-nav role="listitem" data-glow="${info.glow}">
        <div class="card-icon" aria-hidden="true">
          <span class="emoji">${info.emoji}</span>
        </div>
        <div class="card-body">
          <h2 class="card-title">${info.label}</h2>
          <p class="card-text">${info.description}</p>
          ${gameCount > 0 ? `<span class="game-count-badge">${gameCount} game${gameCount > 1 ? 's' : ''}</span>` : ''}
        </div>
      </a>
    `;
    }).join("");

    const html = `
    <section class="page-top games-page">
      ${breadcrumb}
      <h1 class="page-title"><span class="emoji" aria-hidden="true">🎮</span> ${ageLabel} Games</h1>
      <p class="page-subtitle">Choose a skill to practice!</p>
      <div class="card-grid" role="list">
        ${cardsHtml}
      </div>
      <div class="actions">
        <a class="btn" href="${hrefFor('/games')}" data-nav>← Back to Games</a>
        <a class="btn btn--primary" href="${hrefFor('/')}" data-nav>Home</a>
      </div>
    </section>
  `;

    return { title, description, html };
}
