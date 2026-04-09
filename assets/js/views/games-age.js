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

    let availableSkills = GAME_SKILLS;
    if (window.UEAH_GAMES_STORE) {
        availableSkills = window.UEAH_GAMES_STORE.getSkillsForAge(age);
    }

    const cardsHtml = availableSkills.map((skill) => {
        const info = SKILL_INFO[skill] || { emoji: '🎮', label: capitalize(skill), description: 'Games', glow: 'green' };

        let gameCount = 0;
        if (window.UEAH_GAMES_STORE) {
            gameCount = window.UEAH_GAMES_STORE.getGamesByAgeSkill(age, skill).length;
        }

        return `
      <a class="games-skill-card" href="${hrefFor(`/games/${age}/${skill}`)}" data-nav role="listitem" data-glow="${info.glow}">
        <div class="games-skill-card__icon" aria-hidden="true">${info.emoji}</div>
        <div class="games-skill-card__count">${gameCount} game${gameCount === 1 ? '' : 's'}</div>
        <h2 class="games-skill-card__title">${info.label}</h2>
        <p class="games-skill-card__desc">${info.description}</p>
        <span class="games-skill-card__cta">Explore skill</span>
      </a>
    `;
    }).join('');

    const html = `
    <section class="page-top games-page games-age-nextgen">
      ${breadcrumb}
      <div class="subpage-hero games-age-nextgen__hero">
        <span class="resources-hero__label">${ageLabel}</span>
        <h1 class="page-title">${ageLabel} Games</h1>
        <p class="page-subtitle">Choose a skill to practice and open a more focused game path.</p>
      </div>
      <div class="games-skill-grid" role="list">
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
