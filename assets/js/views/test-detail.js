/* assets/js/views/test-detail.js
   Test detail view for Ultimate English At Home.
   Shows details for an individual test. If the tests store is missing or
   the test cannot be found, delegates to appropriate fallback views.
*/

import { breadcrumbs, escapeHtml, iconSkill } from '../common.js';
import { getTestsMissingView } from './error.js';
import { getView as getNotFoundView } from './not-found.js';

/**
 * Build the test detail page for the given slug.
 *
 * @param {Object} ctx Context containing helpers and store functions
 * @param {string} slug Test slug
 */
export async function getView(ctx, slug) {
  // If the tests store is not loaded, show the missing tests view
  if (!ctx.testsStoreAvailable) {
    return getTestsMissingView(ctx);
  }

  // Find the test object
  const test = typeof ctx.testsGetTest === 'function' ? ctx.testsGetTest(slug) : null;
  if (!test) {
    return getNotFoundView(ctx, `/tests/${slug}`);
  }

  // Attempt to load the test runner if available.
  // Load the runner module if the test declares one. Safe to call even if already loaded.
  try {
    if (typeof ctx.ensureTestRunnerLoaded === 'function') {
      await ctx.ensureTestRunnerLoaded(test);
    }
  } catch (_) {
    // ignore loading errors; we’ll show a placeholder below
  }

  const { hrefFor } = ctx;
  const safeTitle = test.title || 'Test';
  const safeSubtitle = test.subtitle || 'Test your ability';

  const title = `${safeTitle} — UEAH`;
  const description = test.subtitle ? `${safeTitle}: ${safeSubtitle}` : `${safeTitle} practice test.`;

  const breadcrumb = breadcrumbs([
    { label: 'Home', href: hrefFor('/') },
    { label: 'Tests', href: hrefFor('/tests') },
    { label: safeTitle },
  ]);

  // If a runner exists and registers a renderer, render it via the store.
  // Otherwise fall back to the placeholder.
  let runnerHtml = `
    <div class="note">
      <strong>Coming soon:</strong> this test is not implemented yet.
    </div>
  `;
  let afterRender = null;

  try {
    const rendered = ctx.testsStore?.render?.(slug, ctx);
    if (rendered?.html) {
      runnerHtml = rendered.html;
      if (typeof rendered.afterRender === 'function') {
        // main.js calls view.afterRender() with no args, so we wrap and
        // pass the runner root element + ctx into the runner hook.
        afterRender = () => {
          const root = document.querySelector(`[data-test-runner-root="${slug}"]`);
          try {
            rendered.afterRender(root, ctx);
          } catch (_) {
            // ignore runner hook errors
          }
        };
      }
    }
  } catch (_) {
    // ignore render errors; keep placeholder
  }

  const html = `
    <section class="page-top">
      ${breadcrumb}
      <h1 class="page-title">${escapeHtml(safeTitle)}</h1>
      <p class="page-subtitle">${escapeHtml(safeSubtitle)}</p>
      <div class="detail-card" role="region" aria-label="Test details">
        <div style="display:flex; gap:12px; align-items:flex-start">
          <div class="card-icon" aria-hidden="true" style="width:44px; height:44px">${iconSkill(test.skill)}</div>
          <div>
            <h2 class="detail-title" style="font-size:18px; margin:0">Test</h2>
            <p class="detail-desc" style="margin-top:10px">${escapeHtml(safeSubtitle)}</p>
          </div>
        </div>
        <div style="margin-top:14px">
          <div data-test-runner-root="${slug}">
            ${runnerHtml}
          </div>
        </div>
        <div class="actions" style="margin-top:16px">
          <a class="btn" href="${hrefFor('/tests')}" data-nav>← Back</a>
        </div>
      </div>
      <div class="actions">
        <a class="btn" href="${hrefFor('/tests')}" data-nav>← Back to Tests</a>
        <a class="btn" href="${hrefFor('/resources')}" data-nav>Resources</a>
        <a class="btn btn--primary" href="${hrefFor('/')}" data-nav>Home</a>
      </div>
    </section>
  `;

  return { title, description, html, afterRender };
}
