/* assets/js/views/age.js
   Age-group view for Ultimate English At Home.
   Displays skill areas for a given age group.
*/

import { SKILLS } from '../constants.js';
import { breadcrumbs, iconSkill, capitalize, ageGroupLabel, ageGroupHeading } from '../common.js';

/**
 * Build the page for a specific age group.
 * @param {Object} ctx - context with helpers
 * @param {string} age - age group slug (e.g. "8-10")
 */
export function getView(ctx, age) {
  const { hrefFor } = ctx;
  const label = ageGroupLabel(age);
  const heading = ageGroupHeading(age);
  const title = `${label} Resources — UEAH`;
  const description = label === 'IELTS'
    ? 'IELTS practice resources. Choose reading, listening, writing, or speaking.'
    : `Resources for ages ${age}. Choose reading, listening, writing, or speaking.`;

  const breadcrumb = breadcrumbs([
    { label: 'Home', href: hrefFor('/') },
    { label: 'Resources', href: hrefFor('/resources') },
    { label: label },
  ]);

  const skillMeta = {
    reading: {
      desc: 'Stories, comprehension, vocabulary, and reading confidence.',
      cta: 'Open reading',
    },
    listening: {
      desc: 'Songs, audio practice, attention, and understanding spoken English.',
      cta: 'Open listening',
    },
    writing: {
      desc: 'Tracing, sentences, structure, and written expression practice.',
      cta: 'Open writing',
    },
    speaking: {
      desc: 'Pronunciation, responses, confidence, and spoken communication.',
      cta: 'Open speaking',
    },
  };

  const cardsHtml = SKILLS.map((skill) => {
    const meta = skillMeta[skill] || { desc: 'Explore this skill area.', cta: 'Open skill' };
    return `
      <a class="skill-card age-skill-card" href="${hrefFor(`/resources/${age}/${skill}`)}" data-nav role="listitem" data-skill="${skill}">
        <div class="skill-card__icon" aria-hidden="true">${iconSkill(skill)}</div>
        <div class="age-skill-card__body">
          <h2 class="skill-card__name">${capitalize(skill)}</h2>
          <p class="age-skill-card__desc">${meta.desc}</p>
          <span class="age-skill-card__cta">${meta.cta}</span>
        </div>
      </a>
    `;
  }).join('');

  const html = `
    <section class="page-top age-nextgen">
      ${breadcrumb}
      <div class="subpage-hero age-nextgen__hero">
        <span class="resources-hero__label">Skill paths</span>
        <h1 class="page-title">${heading}</h1>
        <p class="page-subtitle">Choose a skill area and jump into a more visual learning path for this group.</p>
      </div>
      <div class="skill-grid age-nextgen__grid" role="list">
        ${cardsHtml}
      </div>
      <div class="actions">
        <a class="btn" href="${hrefFor('/resources')}" data-nav>← Back to Resources</a>
        <a class="btn btn--primary" href="${hrefFor('/') }" data-nav>Home</a>
      </div>
    </section>
  `;
  return { title, description, html };
}
