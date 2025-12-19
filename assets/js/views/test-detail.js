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
 * This view is kept intentionally simple: it displays the test title and
 * subtitle along with a placeholder note if the test runner is not
 * implemented. It delegates missing store or missing test to fallback views.
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
  // Attempt to load the test runner if available. We ignore errors here and
  // display a placeholder if the test is not implemented. If a runner
  // exists, the global tests store will handle rendering on a separate
  // page load or a future enhancement.
  if (typeof ctx.testsHasRunner === 'function' && ctx.testsHasRunner(slug)) {
    try {
      if (typeof ctx.ensureTestRunnerLoaded === 'function') {
        await ctx.ensureTestRunnerLoaded(test);
      }
    } catch (_) {
      // ignore loading errors; we’ll show a placeholder below
    }
  }
  const { hrefFor } = ctx;
  const title = `${test.title || 'Test'} — UEAH`;
  const breadcrumb = breadcrumbs([
    { label: 'Home', href: hrefFor('/') },
    { label: 'Tests', href: hrefFor('/tests') },
    { label: test.title || 'Test' },
  ]);
  // Build the runner placeholder. Future enhancements could call
  // ctx.testsStore.render() or ctx.testsStore.getRunner() if provided.
  const runnerHtml = `
    <div class="note">
      <strong>Coming soon:</strong> this test is not implemented yet.
    </div>
  `;
  const html = `
    <section class="page-top">
      ${breadcrumb}
      <h1 class="page-title">${escapeHtml(test.title || 'Test')}</h1>
      <p class="page-subtitle">${escapeHtml(test.subtitle || 'Test your ability')}</p>
      <div class="detail-card" role="region" aria-label="Test details">
        <div style="display:flex; gap:12px; align-items:flex-start">
          <div class="card-icon" aria-hidden="true" style="width:44px; height:44px">${iconSkill(test.skill)}</div>
          <div>
            <h2 class="detail-title" style="font-size:18px; margin:0">Test</h2>
            <p class="detail-desc" style="margin-top:10px">${escapeHtml(test.subtitle || 'Test your ability')}</p>
          </div>
        </div>
        <div style="margin-top:14px">
          ${runnerHtml}
        </div>
        <div class="actions" style="margin-top:16px">
          <a class="btn" href="${hrefFor('/tests') }" data-nav>← Back</a>
        </div>
      </div>
      <div class="actions">
        <a class="btn" href="${hrefFor('/tests') }" data-nav>← Back to Tests</a>
        <a class="btn" href="${hrefFor('/resources') }" data-nav>Resources</a>
        <a class="btn btn--primary" href="${hrefFor('/') }" data-nav>Home</a>
      </div>
    </section>
  `;
  return { title, html };
}