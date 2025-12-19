/* assets/js/views/resource-detail.js
   Resource detail view for Ultimate English At Home.
   Displays detailed information about a specific resource.
*/

import {
  breadcrumbs,
  renderChips,
  capitalize,
  escapeHtml,
  escapeAttr,
} from '../common.js';
import { getStoreMissingView } from './error.js';
import { getView as getNotFoundView } from './not-found.js';

/**
 * Build the resource detail page.
 * @param {Object} ctx - context with helpers and store functions
 * @param {string} age - age group slug
 * @param {string} skill - skill slug
 * @param {string} slug - resource slug
 */
export async function getView(ctx, age, skill, slug) {
  // If the resources store is missing, show a fallback page
  if (!ctx.resourcesStoreAvailable) {
    return getStoreMissingView(ctx);
  }
  // Ensure data for the age group is loaded
  if (typeof ctx.ensureAgeLoaded === 'function') {
    try {
      await ctx.ensureAgeLoaded(age);
    } catch (_) {
      // ignore
    }
  }
  const resource = typeof ctx.storeGetResource === 'function' ? ctx.storeGetResource(age, skill, slug) : null;
  if (!resource) {
    // Delegate to the not-found view with the requested path
    return getNotFoundView(ctx, `/resources/${age}/${skill}/${slug}`);
  }
  const title = `${resource.title} — UEAH`;
  const breadcrumb = breadcrumbs([
    { label: 'Home', href: ctx.hrefFor('/') },
    { label: 'Resources', href: ctx.hrefFor('/resources') },
    { label: age, href: ctx.hrefFor(`/resources/${age}`) },
    { label: capitalize(skill), href: ctx.hrefFor(`/resources/${age}/${skill}`) },
    { label: resource.title },
  ]);
  const chips = renderChips(resource, true);
  const openBtn = resource.link
    ? `<a class="btn btn--primary" href="${escapeAttr(resource.link)}" target="_blank" rel="noopener noreferrer">Open Resource ↗</a>`
    : `<span class="btn btn--primary btn--disabled" aria-disabled="true">MISSING LINK</span>`;
  // Detail fields
  const details = resource.details || {};
  // Helper to render a simple section
  function renderDetailSection(label, value) {
    const safeLabel = escapeHtml(label);
    const body = value ? escapeHtml(value) : '<span class="muted">Not specified</span>';
    return `
      <div class="detail-section">
        <h2>${safeLabel}</h2>
        <p>${body}</p>
      </div>
    `;
  }
  // Helper to render a list section
  function renderDetailListSection(label, items) {
    const safeLabel = escapeHtml(label);
    const arr = Array.isArray(items) ? items.filter(Boolean) : [];
    if (!arr.length) {
      return `
        <div class="detail-section">
          <h2>${safeLabel}</h2>
          <p><span class="muted">Not specified</span></p>
        </div>
      `;
    }
    return `
      <div class="detail-section">
        <h2>${safeLabel}</h2>
        <ul>
          ${arr.map((x) => `<li>${escapeHtml(x)}</li>`).join('')}
        </ul>
      </div>
    `;
  }
  // Extra links
  const otherLinks = Array.isArray(details.otherLinks) ? details.otherLinks : [];
  const otherLinksHtml = otherLinks.length
    ? `
      <div class="detail-section">
        <h2>Extra links</h2>
        <div class="detail-links">
          ${otherLinks
            .map(
              (u) =>
                `<a class="btn btn--small" href="${escapeAttr(u)}" target="_blank" rel="noopener noreferrer">Open extra link ↗</a>`
            )
            .join('')}
        </div>
      </div>
    `
    : '';
  // Bundle items
  const bundleItems = Array.isArray(resource.bundleItems) ? resource.bundleItems : [];
  let bundleHtml = '';
  if (bundleItems.length) {
    const listItems = bundleItems
      .map((s) => {
        const r = ctx.storeGetResource(age, skill, s);
        if (!r) return `<li>${escapeHtml(s)}</li>`;
        const internalHref = ctx.hrefFor(`/resources/${age}/${skill}/${r.slug}`);
        const external = r.link
          ? ` <a href="${escapeAttr(r.link)}" target="_blank" rel="noopener noreferrer">(Open ↗)</a>`
          : ` <span class="muted">(MISSING LINK)</span>`;
        return `<li><a href="${internalHref}" data-nav>${escapeHtml(r.title)}</a>${external}</li>`;
      })
      .join('');
    bundleHtml = `
      <div class="detail-section">
        <h2>Included resources</h2>
        <ul>${listItems}</ul>
      </div>
    `;
  }
  const html = `
    <section class="page-top">
      ${breadcrumb}
      <div class="detail-card">
        <h1 class="detail-title">${escapeHtml(resource.title)}</h1>
        <p class="detail-desc">${escapeHtml(resource.description || `Practice resource for ${skill}.`)}</p>
        ${chips}
        <div class="actions" style="margin-top:14px">
          <a class="btn" href="${ctx.hrefFor(`/resources/${age}/${skill}`)}" data-nav>← Back</a>
          ${openBtn}
        </div>
        ${renderDetailSection('Type', details.type)}
        ${renderDetailSection('What it teaches', details.teaches)}
        ${renderDetailListSection('How to use', details.howTo)}
        ${renderDetailSection('Why it’s a top pick', details.whyTopPick)}
        ${renderDetailSection('Free access check', details.freeAccess)}
        ${renderDetailSection('Age check', details.ageCheck)}
        ${bundleHtml}
        ${otherLinksHtml}
      </div>
      <div class="actions">
        <a class="btn" href="${ctx.hrefFor(`/resources/${age}/${skill}`)}" data-nav>← Back to ${capitalize(skill)}</a>
        <a class="btn" href="${ctx.hrefFor(`/resources/${age}`)}" data-nav>Skills</a>
        <a class="btn" href="${ctx.hrefFor('/resources')}" data-nav>Age Groups</a>
      </div>
    </section>
  `;
  return { title, html };
}