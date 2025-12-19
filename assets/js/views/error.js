/* assets/js/views/error.js
   Error and fallback views for Ultimate English At Home.
   Provides small helper views to display when the resources or tests
   stores are not loaded, or when a generic error occurs.
*/

import { breadcrumbs, escapeHtml } from '../common.js';

/**
 * View shown when the resources store is missing.
 * @param {Object} ctx Context providing hrefFor() and other helpers
 */
export function getStoreMissingView(ctx) {
  const { hrefFor } = ctx;
  const title = 'Resources unavailable — UEAH';
  const breadcrumb = breadcrumbs([
    { label: 'Home', href: hrefFor('/') },
    { label: 'Resources' },
  ]);
  const html = `
    <section class="page-top">
      ${breadcrumb}
      <h1 class="page-title">Resources unavailable</h1>
      <p class="page-subtitle">The resources store script is not loaded.</p>
      <div class="note">
        <strong>Fix:</strong> Ensure <code>assets/js/resources-store.js</code> is loaded before your main script.
      </div>
      <div class="actions">
        <a class="btn btn--primary" href="${hrefFor('/') }" data-nav>Home</a>
      </div>
    </section>
  `;
  return { title, html };
}

/**
 * View shown when the tests store is missing.
 * @param {Object} ctx Context providing hrefFor() and other helpers
 */
export function getTestsMissingView(ctx) {
  const { hrefFor } = ctx;
  const title = 'Tests unavailable — UEAH';
  const breadcrumb = breadcrumbs([
    { label: 'Home', href: hrefFor('/') },
    { label: 'Tests' },
  ]);
  const html = `
    <section class="page-top">
      ${breadcrumb}
      <h1 class="page-title">Tests unavailable</h1>
      <p class="page-subtitle">The tests store script is not loaded.</p>
      <div class="note">
        <strong>Fix:</strong> Ensure <code>assets/js/tests-store.js</code> and your tests data files are loaded before your main script.
      </div>
      <div class="actions">
        <a class="btn btn--primary" href="${hrefFor('/') }" data-nav>Home</a>
        <a class="btn" href="${hrefFor('/resources') }" data-nav>Resources</a>
      </div>
    </section>
  `;
  return { title, html };
}

/**
 * Generic error view. Used when an unexpected error occurs during view loading.
 * @param {Object} ctx Context providing hrefFor() and other helpers
 * @param {string} message Short message to display
 * @param {Error} [err] Optional error to show details
 */
export function getErrorView(ctx, message, err) {
  const { hrefFor } = ctx;
  const title = 'Error — UEAH';
  const breadcrumb = breadcrumbs([
    { label: 'Home', href: hrefFor('/') },
    { label: 'Error' },
  ]);
  const detail = err
    ? `<p class="muted" style="margin-top:10px"><code>${escapeHtml(String(err))}</code></p>`
    : '';
  const html = `
    <section class="page-top">
      ${breadcrumb}
      <h1 class="page-title">Error</h1>
      <p class="page-subtitle">${escapeHtml(message || 'An error occurred.')}</p>
      ${detail}
      <div class="actions">
        <a class="btn btn--primary" href="${hrefFor('/') }" data-nav>Home</a>
        <a class="btn" href="${hrefFor('/resources') }" data-nav>Resources</a>
      </div>
    </section>
  `;
  return { title, html };
}