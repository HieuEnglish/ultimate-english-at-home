/* assets/js/views/resources-index.js
   Resources index view for Ultimate English At Home.
   Presents cards for each age group so users can choose a skill area next.
*/

import { AGE_GROUPS } from '../constants.js';
import { breadcrumbs, card, iconAge } from '../common.js';

/**
 * Build the resources index page.
 * @param {Object} ctx - context containing helpers
 * @param {Function} ctx.hrefFor - resolves app paths to hrefs
 * @returns {{title: string, description: string, html: string}}
 */
export function getView(ctx) {
  const { hrefFor } = ctx;
  const title = 'Resources — UEAH';
  const description = 'Browse free English learning resources by age group and skill.';

  const breadcrumb = breadcrumbs([
    { label: 'Home', href: hrefFor('/') },
    { label: 'Resources' },
  ]);

  // Assign a colour glow per age group, matching the original UI
  const glowByAge = {
    '0-3': 'green',
    '4-7': 'yellow',
    '8-10': 'red',
    '11-12': 'blue',
    '13-18': 'pink',
  };

  const cardsHtml = AGE_GROUPS.map((age) =>
    card({
      href: hrefFor(`/resources/${age}`),
      title: age,
      text: 'Choose a skill area next.',
      icon: iconAge(age),
      ctaText: '',
      glow: glowByAge[age] || 'green',
    })
  ).join('');

  const html = `
    <section class="page-top">
      ${breadcrumb}
      <h1 class="page-title">Resources</h1>
      <p class="page-subtitle">Pick an age group to see skill areas.</p>
      <div class="card-grid" role="list">
        ${cardsHtml}
      </div>
      <div class="actions">
        <a class="btn" href="${hrefFor('/') }" data-nav>← Back to Home</a>
      </div>
    </section>
  `;
  return { title, description, html };
}
