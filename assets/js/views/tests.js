/* assets/js/views/tests.js
   Tests listing view for Ultimate English At Home.
   Lists available tests or shows a placeholder if none are available.
*/

import { breadcrumbs, card, iconSkill } from '../common.js';
import { getTestsMissingView } from './error.js';

export function getView(ctx) {
  const { hrefFor } = ctx;

  // If the tests store is not loaded, show the missing page
  if (!ctx.testsStoreAvailable) {
    return getTestsMissingView(ctx);
  }

  const tests = typeof ctx.testsGetAll === 'function' ? ctx.testsGetAll() : [];
  const hasTests = Array.isArray(tests) && tests.length > 0;

  const title = 'Tests — UEAH';
  const description = 'Take free practice tests for reading, listening, writing, and speaking.';

  const breadcrumb = breadcrumbs([
    { label: 'Home', href: hrefFor('/') },
    { label: 'Tests' },
  ]);

  let cardsHtml = '';
  if (hasTests) {
    cardsHtml = tests
      .map((t) =>
        card({
          href: hrefFor(`/tests/${t.slug}`),
          title: t.title || 'Test',
          text: t.subtitle || 'Test your ability',
          icon: iconSkill(t.skill),
          ctaText: '',
          glow: 'iels',
        })
      )
      .join('');
  }

  const html = `
    <section class="page-top">
      ${breadcrumb}
      <h1 class="page-title">Tests</h1>
      <p class="page-subtitle">Choose a test.</p>
      ${
        hasTests
          ? `<div class="card-grid" role="list" aria-label="Tests">${cardsHtml}</div>`
          : `
        <div class="note">
          <strong>Coming soon:</strong> tests will appear here.
        </div>
      `
      }
      <div class="actions">
        <a class="btn" href="${hrefFor('/') }" data-nav>← Back to Home</a>
        <a class="btn" href="${hrefFor('/resources')}" data-nav>Resources</a>
      </div>
    </section>
  `;

  return { title, description, html };
}
