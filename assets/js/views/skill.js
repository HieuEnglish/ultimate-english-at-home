/* assets/js/views/skill.js
   Skill view for Ultimate English At Home.
   Shows resources for a given age group and skill area (reading, listening, writing, speaking).
*/

import {
  breadcrumbs,
  renderChips,
  capitalize,
  escapeHtml,
  escapeAttr,
} from '../common.js';
import { getStoreMissingView } from './error.js';

/**
 * Build the skill page for an age group and skill.
 * This function is async because resources may need to be lazy-loaded.
 *
 * @param {Object} ctx - context with helpers and store functions
 * @param {string} age - age group slug (e.g. "8-10")
 * @param {string} skill - skill slug (e.g. "reading")
 */
export async function getView(ctx, age, skill) {
  // If the resources store is missing, show an error page
  if (!ctx.resourcesStoreAvailable) {
    return getStoreMissingView(ctx);
  }

  // Ensure data for the age group is loaded
  if (typeof ctx.ensureAgeLoaded === 'function') {
    try {
      await ctx.ensureAgeLoaded(age);
    } catch (_) {
      // ignore; missing packs will be handled below
    }
  }

  const pack = typeof ctx.storeGetPack === 'function' ? ctx.storeGetPack(age, skill) : null;

  // Retrieve and normalise the list of resources for this age and skill. If the
  // store function is not available, fall back to an empty array. Normalising
  // ensures the "best set" appears last and items are alphabetically sorted.
  const resources =
    typeof ctx.storeGetResources === 'function'
      ? ctx.normalizeResourcesList(ctx.storeGetResources(age, skill) || [])
      : [];

  const skillLabel = capitalize(skill);
  const title = `${skillLabel} (${age}) — UEAH`;
  const description = `Free ${skillLabel} resources for ages ${age}.`;

  const breadcrumb = breadcrumbs([
    { label: 'Home', href: ctx.hrefFor('/') },
    { label: 'Resources', href: ctx.hrefFor('/resources') },
    { label: age, href: ctx.hrefFor(`/resources/${age}`) },
    { label: skillLabel },
  ]);

  const heading =
    pack && pack.title
      ? escapeHtml(pack.title)
      : `${skillLabel} <span aria-hidden="true">·</span> <span class="muted">Age ${escapeHtml(age)}</span>`;

  const subtitle =
    pack && pack.overview
      ? escapeHtml(pack.overview)
      : `Resources for ${skillLabel} — ages ${escapeHtml(age)}.`;

  // Overview section
  let packHtml = '';
  if (pack) {
    const objectives =
      Array.isArray(pack.objectives) && pack.objectives.length
        ? `<div class="detail-section"><h2>Objectives</h2><ul>${pack.objectives
            .map((o) => `<li>${escapeHtml(o)}</li>`)
            .join('')}</ul></div>`
        : '';

    const materials =
      Array.isArray(pack.materials) && pack.materials.length
        ? `<div class="detail-section"><h2>Materials / Resources</h2><ul>${pack.materials
            .map((m) => `<li>${escapeHtml(m)}</li>`)
            .join('')}</ul></div>`
        : '';

    packHtml = `
      <div class="detail-card" role="region" aria-label="Pack overview">
        <h2 class="detail-title" style="font-size:18px; margin:0">Overview</h2>
        <p class="detail-desc" style="margin-top:10px">${escapeHtml(pack.overview || '')}</p>
        ${objectives}
        ${materials}
      </div>
    `;
  }

  // Resources grid
  let gridHtml = '';
  if (resources && resources.length) {
    gridHtml = `
      <div class="resource-grid" role="list" aria-label="Resources">
        ${resources
          .map((r) => {
            const detailPath = `/resources/${age}/${skill}/${r.slug}`;
            const detailHref = ctx.hrefFor(detailPath);
            const chips = renderChips(r);
            const isFeatured = r.isBestSet ? ' is-featured' : '';
            const openBtn = r.link
              ? `<a class="btn btn--primary btn--small" href="${escapeAttr(
                  r.link
                )}" target="_blank" rel="noopener noreferrer" aria-label="Open ${escapeAttr(
                  r.title
                )} in a new tab">Open Resource ↗</a>`
              : `<span class="btn btn--small btn--disabled" aria-disabled="true">MISSING LINK</span>`;
            return `
              <article class="resource-item${isFeatured}" role="listitem">
                <button class="resource-card" type="button" data-nav-to="${escapeAttr(
                  detailPath
                )}" aria-label="View details: ${escapeAttr(r.title)}">
                  <h2 class="resource-title">${escapeHtml(r.title)}</h2>
                  <p class="resource-desc">${escapeHtml(
                    r.description || `Practice resource for ${skill}.`
                  )}</p>
                  ${chips}
                </button>
                <div class="resource-actions" aria-label="Resource actions">
                  <a class="btn btn--small" href="${detailHref}" data-nav>Details →</a>
                  ${openBtn}
                </div>
              </article>
            `;
          })
          .join('')}
      </div>
    `;
  } else {
    gridHtml = `
      <div class="note">
        <strong>Coming soon:</strong> ${skillLabel} resources for ages ${escapeHtml(age)}.
      </div>
    `;
  }

  // Best set note (if defined)
  let bestSetNote = '';
  if (pack && pack.bestSetSlug) {
    const best = resources.find((r) => r.slug === pack.bestSetSlug);
    if (best) {
      bestSetNote = `
        <div class="note" style="margin-top:20px">
          <strong>${escapeHtml(best.title)}</strong>
          <p style="margin:8px 0 0">${escapeHtml(best.description || '')}</p>
          <div class="actions" style="margin-top:12px">
            <a class="btn btn--primary" href="${ctx.hrefFor(
              `/resources/${age}/${skill}/${best.slug}`
            )}" data-nav>Open Best Set →</a>
          </div>
        </div>
      `;
    }
  }

  const html = `
    <section class="page-top">
      ${breadcrumb}
      <h1 class="page-title">${heading}</h1>
      <p class="page-subtitle">${subtitle}</p>
      ${packHtml}
      <h2 class="page-title" style="margin-top:22px; font-size:20px">Resources</h2>
      ${gridHtml}
      ${bestSetNote}
      <div class="actions">
        <a class="btn" href="${ctx.hrefFor(`/resources/${age}`)}" data-nav>← Back to Skills</a>
        <a class="btn" href="${ctx.hrefFor('/resources')}" data-nav>Age Groups</a>
        <a class="btn btn--primary" href="${ctx.hrefFor('/') }" data-nav>Home</a>
      </div>
    </section>
  `;

  return { title, description, html };
}
