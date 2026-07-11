/* assets/js/views/resources-index.js
   Resources index view for Ultimate English At Home.
   Presents cards for each age group so users can choose a skill area next.
*/

import { AGE_GROUPS } from '../constants.js';
import { breadcrumbs, ageGroupLabel } from '../common.js';

/**
 * Build the resources index page.
 * @param {Object} ctx - context containing helpers
 * @param {Function} ctx.hrefFor - resolves app paths to hrefs
 * @returns {{title: string, description: string, html: string}}
 */
export function getView(ctx) {
  const { hrefFor } = ctx;
  const title = 'Resources — UEAH';
  const description = 'Browse free English learning resources by age group and skill, plus IELTS practice.';

  const breadcrumb = breadcrumbs([
    { label: 'Home', href: hrefFor('/') },
    { label: 'Resources' },
  ]);

  const ageMeta = {
    '0-3': {
      emoji: '🧸',
      glow: 'orange',
      subtitle: 'Early exposure',
      desc: 'Songs, sounds, first words, and playful English for the youngest learners.',
    },
    '4-7': {
      emoji: '🎨',
      glow: 'yellow',
      subtitle: 'Foundation skills',
      desc: 'Phonics, beginner reading, vocabulary growth, and simple sentence practice.',
    },
    '8-10': {
      emoji: '🚀',
      glow: 'blue',
      subtitle: 'Skill building',
      desc: 'Reading, listening, writing, and speaking tasks that build confidence step by step.',
    },
    '11-12': {
      emoji: '🧠',
      glow: 'blue',
      subtitle: 'Independent practice',
      desc: 'Stronger grammar, richer texts, and more structured learning pathways.',
    },
    '13-18': {
      emoji: '🎓',
      glow: 'pink',
      subtitle: 'Advanced growth',
      desc: 'Academic-style reading, writing, communication, and exam-focused development.',
    },
    ielts: {
      emoji: '🎯',
      glow: 'purple',
      subtitle: 'IELTS track',
      desc: 'Targeted reading, listening, writing, and speaking practice for IELTS-style preparation.',
    },
  };

  const cardsHtml = AGE_GROUPS.map((age) => {
    const key = String(age || '').trim().toLowerCase();
    const meta = ageMeta[key] || ageMeta['8-10'];
    const label = key === 'ielts' ? 'IELTS Track' : `${ageGroupLabel(age)} years`;
    const browseLabel = key === 'ielts' ? 'Open IELTS path' : `Explore ages ${age}`;

    return `
      <a class="resource-age-card ueah-hover-lift" href="${hrefFor(`/resources/${age}`)}" data-nav data-glow="${meta.glow}" role="listitem" aria-label="${browseLabel}" data-ueah-animate="reveal">
        <div class="resource-age-card__art" data-glow="${meta.glow}">
          <div class="resource-age-card__emoji" aria-hidden="true">${meta.emoji}</div>
          <div class="resource-age-card__orb resource-age-card__orb--one"></div>
          <div class="resource-age-card__orb resource-age-card__orb--two"></div>
        </div>
        <div class="resource-age-card__body">
          <div class="resource-age-card__eyebrow">${meta.subtitle}</div>
          <h2 class="resource-age-card__title">${label}</h2>
          <p class="resource-age-card__desc">${meta.desc}</p>
          <span class="resource-age-card__cta">Explore</span>
        </div>
      </a>
    `;
  }).join('');

  const html = `
    <section class="page-top resources-nextgen">
      ${breadcrumb}

      <div class="resources-hero">
        <div class="resources-hero__copy">
          <span class="resources-hero__label">Learning paths</span>
          <h1 class="page-title resources-hero__title">Resources for every age group</h1>
          <p class="page-subtitle resources-hero__subtitle">
            Find learning paths tailored to each stage, from playful early exposure to more advanced exam-style practice.
          </p>
        </div>
      </div>

      <div class="resources-age-grid" role="list">
        ${cardsHtml}
      </div>

      <div class="resources-footer-note note">
        Pick a path to browse by <strong>Reading</strong>, <strong>Listening</strong>, <strong>Writing</strong>, or <strong>Speaking</strong>.
      </div>

      <div class="actions">
        <a class="btn" href="${hrefFor('/')}" data-nav>← Back to Home</a>
      </div>
    </section>
  `;
  return { title, description, html };
}
