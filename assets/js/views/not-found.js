/* assets/js/views/not-found.js
   404 Not Found view for Ultimate English At Home.
*/

import { breadcrumbs, escapeHtml } from '../common.js';

/**
 * Returns a 404 page when a requested route cannot be matched.
 * @param {Object} ctx Context providing hrefFor() helper
 * @param {string} path The unmatched app path (e.g. '/resources/99')
 */
export function getView(ctx, path) {
  const { hrefFor } = ctx;
  const title = 'Not Found — UEAH';
  const description = 'Page not found.';
  const robots = 'noindex,follow';

  const breadcrumb = breadcrumbs([
    { label: 'Home', href: hrefFor('/') },
    { label: 'Not Found' },
  ]);

  const html = `
    <section class="page-top error-nextgen">
      ${breadcrumb}
      <div class="error-nextgen__shell">
        <div class="error-nextgen__code">404</div>
        <h1 class="page-title error-nextgen__title">Oops! Page not found</h1>
        <p class="page-subtitle error-nextgen__subtitle">We couldn’t find: <code>${escapeHtml(path)}</code></p>
        <div class="error-nextgen__owl" aria-hidden="true">🦉</div>
        <div class="error-nextgen__actions">
          <a class="btn btn--primary error-nextgen__btn" href="${hrefFor('/')}" data-nav>Go Home</a>
          <a class="btn error-nextgen__btn" href="${hrefFor('/contact')}" data-nav>Contact Us</a>
        </div>
      </div>
    </section>
  `;

  return { title, description, robots, html };
}
