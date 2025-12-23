/* assets/js/main.js
   Entry point for the Ultimate English At Home web app.
   This module bootstraps the SPA by detecting the basePath, configuring
   client-side routing, constructing a shared context for views, and
   dynamically importing view modules on demand. It replaces the old
   monolithic app.js and leverages ES modules to split views and logic.
*/

import { AGE_GROUPS, SKILLS } from './constants.js';
import {
  detectBasePath,
  rewriteNavHrefs,
  normalizeAppPath,
  initRouter,
  setActiveNav,
} from './router.js';
import {
  ensureAgeLoaded,
  storeGetPack,
  storeGetResources,
  storeGetResource,
  normalizeResourcesList,
  testsGetAll,
  testsGetTest,
  testsHasRunner,
  ensureTestRunnerLoaded,
  profileGet,
  profileSet,
  profileClear,
  contactSend,
  // New: favourites + sync helpers
  favouritesGetAll,
  favouritesHas,
  favouritesToggle,
  favouritesRemoveByKey,
  favouritesExportData,
  favouritesImportData,
  syncExport,
  syncImport,
} from './store-helpers.js';
import { breadcrumbs } from './common.js';
import { applySEO } from './seo.js';

// Get references to the root app element and navigation links
const appEl = document.getElementById('app');
const navLinks = Array.from(document.querySelectorAll('[data-nav-key]'));
const yearEls = Array.from(document.querySelectorAll('[data-year]'));

const DEFAULT_SEO_DESCRIPTION =
  'A clean, pastel, responsive English learning hub. Browse resources by age group and skill.';

// Update year in footer
yearEls.forEach((el) => (el.textContent = String(new Date().getFullYear())));

// Detect the basePath for GitHub Pages project sites
const basePath = detectBasePath();

// -----------------------------
// Optional nav badge helpers
// -----------------------------

function setFavBadgeCount(count) {
  const badge = document.querySelector('[data-fav-badge]');
  if (!badge) return;

  const n = Number(count);
  const safe = Number.isFinite(n) && n > 0 ? n : 0;

  if (safe <= 0) {
    badge.textContent = '0';
    badge.hidden = true;
    return;
  }

  // Cap for UI neatness
  badge.textContent = safe > 99 ? '99+' : String(safe);
  badge.hidden = false;
}

function refreshFavBadge() {
  try {
    const items = favouritesGetAll();
    setFavBadgeCount(Array.isArray(items) ? items.length : 0);
  } catch (_) {
    setFavBadgeCount(0);
  }
}

// Initialize badge on first load
refreshFavBadge();

// Listen for changes from favourites-store.js
window.addEventListener('ueah:favourites-changed', (ev) => {
  const detail = ev && ev.detail ? ev.detail : null;
  if (detail && typeof detail.count === 'number') {
    setFavBadgeCount(detail.count);
  } else {
    refreshFavBadge();
  }
});

// Shared context passed to all views; functions call store helpers with basePath
const ctx = {
  // Convert an app-relative path to an href with basePath prepended
  hrefFor(appPath) {
    const p = normalizeAppPath(appPath);
    return `${basePath}${p}`;
  },
  // Convert an asset path to a full URL; respects basePath and leaves full URLs untouched
  assetHref(assetPath) {
    if (!assetPath) return '';
    const s = String(assetPath);
    if (s.startsWith('http://') || s.startsWith('https://')) return s;
    let p = s;
    if (!p.startsWith('/')) p = '/' + p;
    return `${basePath}${p}`;
  },
  basePath,
  resourcesStoreAvailable: !!window.UEAH_RESOURCES_STORE,
  testsStoreAvailable: !!window.UEAH_TESTS_STORE,

  // Store helpers bound with basePath when needed
  ensureAgeLoaded: (age) => ensureAgeLoaded(age, { basePath }),
  storeGetPack,
  storeGetResources,
  storeGetResource,
  normalizeResourcesList,

  testsGetAll,
  testsGetTest,
  testsHasRunner,
  ensureTestRunnerLoaded: (test) => ensureTestRunnerLoaded(test, { basePath }),

  // Profile / contact
  profileGet,
  profileSet,
  profileClear,
  contactSend,

  // New: favourites
  favouritesGetAll,
  favouritesHas,
  favouritesToggle,
  favouritesRemoveByKey,
  favouritesExportData,
  favouritesImportData,

  // New: sync (profile + favourites)
  syncExport,
  syncImport,

  // Expose the underlying tests store (if any) for advanced views
  testsStore: window.UEAH_TESTS_STORE || null,

  AGE_GROUPS,
  SKILLS,
};

// Token used to discard outdated renders when navigation happens quickly
let renderToken = 0;

/**
 * Shows a simple loading indicator while asynchronous views are fetched.
 * Uses breadcrumbs for consistent navigation.
 */
function loadingHtml() {
  return `
    <section class="page-top">
      ${breadcrumbs([
        { label: 'Home', href: ctx.hrefFor('/') },
        { label: 'Loading…' },
      ])}
      <h1 class="page-title">Loading…</h1>
      <p class="page-subtitle">Please wait a moment.</p>
    </section>
  `;
}

/**
 * Renders a view based on the current appPath. Dynamically imports
 * the corresponding view module and updates the DOM. Handles errors
 * gracefully by delegating to the error view.
 * @param {string} appPath Normalised app path (e.g. '/resources/8-10/reading')
 */
async function render(appPath) {
  const token = ++renderToken;
  const normalizedPath = normalizeAppPath(appPath);

  // Highlight the active navigation link
  setActiveNav(normalizedPath, navLinks);

  // Show loading state while resolving the view
  appEl.innerHTML = loadingHtml();

  // Ensure links in loading state respect basePath
  rewriteNavHrefs(appEl, basePath);

  // Determine which view module to load
  const parts = normalizedPath.split('/').filter(Boolean);
  let viewModule;
  let viewResult;

  try {
    if (parts.length === 0) {
      viewModule = await import('./views/home.js');
      viewResult = viewModule.getView(ctx);
    } else if (parts[0] === 'profile' && parts.length === 1) {
      viewModule = await import('./views/profile.js');
      viewResult = viewModule.getView(ctx);
    } else if (parts[0] === 'contact' && parts.length === 1) {
      viewModule = await import('./views/contact.js');
      viewResult = viewModule.getView(ctx);
    } else if (parts[0] === 'favourites' && parts.length === 1) {
      viewModule = await import('./views/favourites.js');
      viewResult = viewModule.getView(ctx);
    } else if (parts[0] === 'games' && parts.length === 1) {
      viewModule = await import('./views/games.js');
      viewResult = viewModule.getView(ctx);
    } else if (parts[0] === 'tests' && parts.length === 1) {
      viewModule = await import('./views/tests.js');
      viewResult = viewModule.getView(ctx);
    } else if (parts[0] === 'tests' && parts.length === 2) {
      viewModule = await import('./views/test-detail.js');
      viewResult = await viewModule.getView(ctx, parts[1]);
    } else if (parts[0] === 'resources') {
      if (parts.length === 1) {
        viewModule = await import('./views/resources-index.js');
        viewResult = viewModule.getView(ctx);
      } else if (parts.length === 2) {
        const age = parts[1];
        if (!AGE_GROUPS.includes(age)) {
          viewModule = await import('./views/not-found.js');
          viewResult = viewModule.getView(ctx, normalizedPath);
        } else {
          viewModule = await import('./views/age.js');
          viewResult = viewModule.getView(ctx, age);
        }
      } else if (parts.length === 3) {
        const age = parts[1];
        const skill = parts[2];
        if (!AGE_GROUPS.includes(age) || !SKILLS.includes(skill)) {
          viewModule = await import('./views/not-found.js');
          viewResult = viewModule.getView(ctx, normalizedPath);
        } else {
          viewModule = await import('./views/skill.js');
          viewResult = await viewModule.getView(ctx, age, skill);
        }
      } else if (parts.length === 4) {
        const age = parts[1];
        const skill = parts[2];
        const slug = parts[3];
        if (!AGE_GROUPS.includes(age) || !SKILLS.includes(skill)) {
          viewModule = await import('./views/not-found.js');
          viewResult = viewModule.getView(ctx, normalizedPath);
        } else {
          viewModule = await import('./views/resource-detail.js');
          viewResult = await viewModule.getView(ctx, age, skill, slug);
        }
      } else {
        viewModule = await import('./views/not-found.js');
        viewResult = viewModule.getView(ctx, normalizedPath);
      }
    } else {
      // Unknown route: 404
      viewModule = await import('./views/not-found.js');
      viewResult = viewModule.getView(ctx, normalizedPath);
    }
  } catch (err) {
    // On error, load the error view
    const errorModule = await import('./views/error.js');
    viewResult = errorModule.getErrorView(ctx, 'Something went wrong while loading this page.', err);
  }

  // If navigation happened during the async load, discard this render
  if (token !== renderToken) return;

  // Update the page title and content
  document.title = viewResult.title || 'UEAH — Ultimate English At Home';

  // Apply SEO on every navigation (fallbacks if a view doesn't specify description/robots)
  applySEO(
    {
      title: viewResult.title || document.title,
      description: viewResult.description || DEFAULT_SEO_DESCRIPTION,
      canonicalPath: normalizedPath,
      robots: viewResult.robots || 'index,follow',
    },
    { basePath }
  );

  appEl.innerHTML = viewResult.html;

  // Rewrite internal links in the new content
  rewriteNavHrefs(appEl, basePath);

  // Call afterRender hook if provided
  if (viewResult.afterRender && typeof viewResult.afterRender === 'function') {
    try {
      viewResult.afterRender();
    } catch (_) {
      // ignore errors in afterRender
    }
  }

  // Manage focus for accessibility
  const main = document.getElementById('main');
  if (main) main.focus({ preventScroll: true });
  const h1 = appEl.querySelector('h1');
  if (h1) {
    h1.setAttribute('tabindex', '-1');
    h1.focus({ preventScroll: true });
    h1.removeAttribute('tabindex');
  }
}

// Initialise the router; onNavigate calls render()
initRouter({ basePath, onNavigate: render, rewriteRoot: document });
