/* assets/js/views/age.js
   Age-group view for Ultimate English At Home.
   Displays skill areas for a given age group.
*/

import { SKILLS } from '../constants.js';
import { breadcrumbs, card, iconSkill, capitalize } from '../common.js';

/**
 * Build the page for a specific age group.
 * @param {Object} ctx - context with helpers
 * @param {string} age - age group slug (e.g. "8-10")
 */
export function getView(ctx, age) {
  const { hrefFor } = ctx;
  const title = `${age} Resources — UEAH`;
  const breadcrumb = breadcrumbs([
    { label: 'Home', href: hrefFor('/') },
    { label: 'Resources', href: hrefFor('/resources') },
    { label: age },
  ]);
  const glowBySkill = {
    reading: 'blue',
    listening: 'green',
    writing: 'yellow',
    speaking: 'red',
  };
  const cardsHtml = SKILLS.map((skill) =>
    card({
      href: hrefFor(`/resources/${age}/${skill}`),
      title: capitalize(skill),
      text: 'Open this skill page.',
      icon: iconSkill(skill),
      ctaText: '',
      glow: glowBySkill[skill] || 'green',
    })
  ).join('');
  const html = `
    <section class="page-top">
      ${breadcrumb}
      <h1 class="page-title">Age ${age}</h1>
      <p class="page-subtitle">Choose a skill area.</p>
      <div class="card-grid" role="list">
        ${cardsHtml}
      </div>
      <div class="actions">
        <a class="btn" href="${hrefFor('/resources')}" data-nav>← Back to Age Groups</a>
        <a class="btn btn--primary" href="${hrefFor('/') }" data-nav>Home</a>
      </div>
    </section>
  `;
  return { title, html };
}