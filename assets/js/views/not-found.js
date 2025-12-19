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
  const breadcrumb = breadcrumbs([
    { label: 'Home', href: hrefFor('/') },
    { label: 'Not Found' },
  ]);
  const html = `
    <section class="page-top">
      ${breadcrumb}
      <h1 class="page-title">Page not found</h1>
      <p class="page-subtitle">We couldn’t find: <code>${escapeHtml(path)}</code></p>
      <div class="actions">
        <a class="btn btn--primary" href="${hrefFor('/') }" data-nav>Go Home</a>
        <a class="btn" href="${hrefFor('/resources') }" data-nav>Resources</a>
      </div>
    </section>
  `;
  return { title, html };
}