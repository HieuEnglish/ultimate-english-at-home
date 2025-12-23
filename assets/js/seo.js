/* assets/js/seo.js
   Lightweight SEO helpers for a client-side routed GitHub Pages SPA (no build step).

   Responsibilities:
   - Update/ensure meta description
   - Update/ensure canonical link
   - Update/ensure Open Graph tags (og:title, og:description, og:url)
   - Update/ensure robots meta (defaults to index,follow)

   Intended usage:
     import { applySEO } from './seo.js';
     applySEO(
       { title, description, canonicalPath: appPath, robots },
       { basePath }
     );
*/

// -----------------------------
// Small internal utilities
// -----------------------------

function detectBasePathFallback() {
  const hostname = window.location.hostname || '';
  const pathname = window.location.pathname || '/';
  if (hostname.endsWith('github.io')) {
    const parts = pathname.split('/').filter(Boolean);
    return parts.length ? `/${parts[0]}` : '';
  }
  return '';
}

function normalizeAppPath(p) {
  if (!p) return '/';
  let out = String(p);

  // If a full URL is passed, reduce to path (same-origin only)
  try {
    const u = new URL(out, window.location.origin);
    if (u.origin === window.location.origin) out = u.pathname;
  } catch (_) {
    // ignore
  }

  if (!out.startsWith('/')) out = '/' + out;
  if (out.length > 1 && out.endsWith('/')) out = out.slice(0, -1);
  return out;
}

function squashWhitespace(s) {
  return String(s || '').replace(/\s+/g, ' ').trim();
}

function truncateDescription(input, maxLen = 160) {
  const s = squashWhitespace(input);
  if (!s) return '';
  if (s.length <= maxLen) return s;

  // Try to cut at a word boundary.
  const cutoff = Math.max(0, maxLen - 1); // reserve for ellipsis
  let slice = s.slice(0, cutoff);
  const lastSpace = slice.lastIndexOf(' ');
  if (lastSpace >= 60) slice = slice.slice(0, lastSpace);
  return slice.replace(/[\s\.,;:!\-]+$/g, '') + '…';
}

function cssEscape(s) {
  try {
    if (window.CSS && typeof window.CSS.escape === 'function') return window.CSS.escape(String(s));
  } catch (_) {
    // ignore
  }
  // Minimal fallback for our known-safe attribute values (names/properties are controlled).
  return String(s).replace(/\"/g, '\\"');
}

function getOrCreateMetaByName(name) {
  const head = document.head || document.getElementsByTagName('head')[0];
  if (!head) return null;
  const sel = `meta[name="${cssEscape(name)}"]`;
  let el = head.querySelector(sel);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('name', name);
    head.appendChild(el);
  }
  return el;
}

function getOrCreateMetaByProperty(property) {
  const head = document.head || document.getElementsByTagName('head')[0];
  if (!head) return null;
  const sel = `meta[property="${cssEscape(property)}"]`;
  let el = head.querySelector(sel);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('property', property);
    head.appendChild(el);
  }
  return el;
}

function getOrCreateLinkCanonical() {
  const head = document.head || document.getElementsByTagName('head')[0];
  if (!head) return null;
  let el = head.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    head.appendChild(el);
  }
  return el;
}

function safeSetAttr(el, attr, value) {
  if (!el) return;
  const v = value == null ? '' : String(value);
  el.setAttribute(attr, v);
}

function currentMetaContent(nameOrProperty, kind) {
  const head = document.head || document.getElementsByTagName('head')[0];
  if (!head) return '';
  const sel =
    kind === 'property'
      ? `meta[property="${cssEscape(nameOrProperty)}"]`
      : `meta[name="${cssEscape(nameOrProperty)}"]`;
  const el = head.querySelector(sel);
  return el ? squashWhitespace(el.getAttribute('content') || '') : '';
}

// -----------------------------
// Public API
// -----------------------------

/**
 * Apply SEO tags for the current route.
 *
 * @param {Object} data
 * @param {string=} data.title Document/page title.
 * @param {string=} data.description Meta description (will be truncated to ~160 chars).
 * @param {string=} data.canonicalPath App-relative path (e.g. '/games').
 * @param {string=} data.robots Robots directive (e.g. 'index,follow' or 'noindex,follow').
 * @param {Object=} options
 * @param {string=} options.basePath GitHub Pages basePath (e.g. '/ultimate-english-at-home').
 */
export function applySEO(data, options) {
  const d = data || {};
  const opts = options || {};

  const basePath = typeof opts.basePath === 'string' ? opts.basePath : detectBasePathFallback();

  // Title
  const title = squashWhitespace(d.title || document.title || '');
  if (title) document.title = title;

  // Description
  const incomingDesc = d.description == null ? '' : d.description;
  const desc = truncateDescription(
    incomingDesc || currentMetaContent('description', 'name') || '',
    160
  );
  const descMeta = getOrCreateMetaByName('description');
  if (descMeta && desc) safeSetAttr(descMeta, 'content', desc);

  // Robots
  const robotsValue = squashWhitespace(d.robots || '') || 'index,follow';
  const robotsMeta = getOrCreateMetaByName('robots');
  if (robotsMeta) safeSetAttr(robotsMeta, 'content', robotsValue);

  // Canonical URL
  let canonicalPath = normalizeAppPath(d.canonicalPath || window.location.pathname || '/');
  // Ensure appPath does NOT include basePath twice
  if (basePath && canonicalPath.startsWith(basePath + '/')) {
    canonicalPath = canonicalPath.slice(basePath.length);
    canonicalPath = normalizeAppPath(canonicalPath);
  }

  const canonicalUrl = `${window.location.origin}${basePath || ''}${canonicalPath}`;
  const canonicalLink = getOrCreateLinkCanonical();
  if (canonicalLink) safeSetAttr(canonicalLink, 'href', canonicalUrl);

  // Open Graph
  const ogTitle = getOrCreateMetaByProperty('og:title');
  const ogDesc = getOrCreateMetaByProperty('og:description');
  const ogUrl = getOrCreateMetaByProperty('og:url');
  if (ogTitle && title) safeSetAttr(ogTitle, 'content', title);
  if (ogDesc && desc) safeSetAttr(ogDesc, 'content', desc);
  if (ogUrl) safeSetAttr(ogUrl, 'content', canonicalUrl);
}

/**
 * Optional helper: derive an applySEO payload from a route + view result.
 * This does not perform any DOM updates.
 *
 * @param {string} appPath Normalised app path (e.g. '/resources/8-10/reading')
 * @param {Object=} ctx Optional view ctx (not required; reserved for future use)
 * @param {Object=} viewResult Return value from view.getView (expects title/description/robots)
 */
export function deriveSEOForRoute(appPath, ctx, viewResult) {
  const vr = viewResult || {};
  return {
    title: vr.title || document.title || 'UEAH — Ultimate English At Home',
    description:
      vr.description ||
      currentMetaContent('description', 'name') ||
      'Free English learning resources, games, and tests.',
    canonicalPath: normalizeAppPath(appPath || '/'),
    robots: vr.robots || 'index,follow',
  };
}
