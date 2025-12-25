/* assets/js/router.js
   Client-side routing helpers (GitHub Pages friendly).

   Responsibilities:
   - Detect basePath for GitHub Pages project sites
   - Normalize internal paths
   - Rewrite internal <a data-nav> hrefs to include basePath
   - Handle SPA navigation for <a data-nav> and <button data-nav-to>
   - Provide helpers for active nav state and route matching

   This file is an ES module (no build step).
*/

// -----------------------------
// Base path + path helpers
// -----------------------------

export function detectBasePath() {
  const hostname = window.location.hostname || "";
  const pathname = window.location.pathname || "/";
  if (hostname.endsWith("github.io")) {
    const parts = pathname.split("/").filter(Boolean);
    return parts.length ? `/${parts[0]}` : "";
  }
  return "";
}

export function normalizeAppPath(p) {
  if (!p) return "/";
  let out = String(p);

  // If a full URL is passed, reduce to path
  try {
    const u = new URL(out, window.location.origin);
    if (u.origin === window.location.origin) out = u.pathname;
  } catch (_) {}

  if (!out.startsWith("/")) out = "/" + out;
  if (out.length > 1 && out.endsWith("/")) out = out.slice(0, -1);
  return out;
}

function getAppPath(basePath) {
  const full = window.location.pathname || "/";
  let p = basePath && full.startsWith(basePath) ? full.slice(basePath.length) : full;
  if (!p) p = "/";
  return normalizeAppPath(p);
}

export function hrefFor(appPath, basePath) {
  const p = normalizeAppPath(appPath);
  return `${basePath || ""}${p}`;
}

// Support the existing 404 redirect query param (?r=...)
function restoreRedirectedPath(basePath) {
  const url = new URL(window.location.href);
  const r = url.searchParams.get("r");
  if (!r) return;

  let target = String(r);
  try {
    const parsed = new URL(target, window.location.origin);
    target = parsed.pathname + parsed.search + parsed.hash;
  } catch (_) {}

  if (basePath && target.startsWith(basePath)) target = target.slice(basePath.length);
  target = normalizeAppPath(target);

  history.replaceState({}, "", hrefFor(target, basePath));
}

// Make <a href="/resources"> work on GitHub Pages project URLs (prepend basePath)
export function rewriteNavHrefs(root, basePath) {
  if (!basePath) return;
  const links = root.querySelectorAll("a[data-nav][href]");
  links.forEach((a) => {
    const href = a.getAttribute("href");
    if (!href) return;

    // Ignore full URLs, mailto/tel, hashes
    if (
      href.startsWith("http://") ||
      href.startsWith("https://") ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:") ||
      href.startsWith("#")
    ) {
      return;
    }

    // Only rewrite absolute site paths
    if (href.startsWith("/") && !href.startsWith(basePath + "/") && href !== basePath) {
      a.setAttribute("href", basePath + href);
    }
  });
}

// -----------------------------
// Navigation
// -----------------------------

export function navigate(appPath, basePath, onNavigate) {
  const p = normalizeAppPath(appPath);
  history.pushState({}, "", hrefFor(p, basePath));
  if (typeof onNavigate === "function") onNavigate(p);
}

export function setActiveNav(appPath, navLinks) {
  const key =
    appPath === "/"
      ? "home"
      : appPath.startsWith("/resources")
      ? "resources"
      : appPath.startsWith("/games")
      ? "games"
      : appPath.startsWith("/tests")
      ? "tests"
      : appPath.startsWith("/profile")
      ? "profile"
      : appPath.startsWith("/scoring")
      ? "scoring"
      : appPath.startsWith("/contact")
      ? "contact"
      : appPath.startsWith("/favourites")
      ? "favourites"
      : "";

  (navLinks || []).forEach((el) => {
    const isActive = el.getAttribute("data-nav-key") === key;
    el.classList.toggle("is-active", isActive);
    if (isActive) el.setAttribute("aria-current", "page");
    else el.removeAttribute("aria-current");
  });
}

function onDocumentClick(e, basePath, onNavigate) {
  // Support <button data-nav-to="/resources/..."> navigation (resource cards)
  const navToEl = e.target && e.target.closest ? e.target.closest("[data-nav-to]") : null;
  if (navToEl) {
    const to = navToEl.getAttribute("data-nav-to");
    if (to) {
      e.preventDefault();
      navigate(normalizeAppPath(to), basePath, onNavigate);
      return;
    }
  }

  const a = e.target && e.target.closest ? e.target.closest("a[data-nav]") : null;
  if (!a) return;

  if (a.target === "_blank" || a.hasAttribute("download")) return;
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

  const href = a.getAttribute("href");
  if (!href) return;

  const url = new URL(href, window.location.href);
  if (url.origin !== window.location.origin) return;

  const path = url.pathname || "/";
  if (basePath && !path.startsWith(basePath)) return;

  e.preventDefault();

  let appPath = basePath ? path.slice(basePath.length) : path;
  appPath = normalizeAppPath(appPath);

  navigate(appPath, basePath, onNavigate);
}

/**
 * initRouter attaches listeners and runs the initial render.
 *
 * @param {Object} opts
 * @param {string=} opts.basePath Optional precomputed basePath.
 * @param {Function} opts.onNavigate Called with normalized appPath on navigation.
 * @param {Element|Document=} opts.rewriteRoot Root to apply rewriteNavHrefs to (default: document).
 */
export function initRouter(opts) {
  const options = opts || {};
  const basePath = typeof options.basePath === "string" ? options.basePath : detectBasePath();
  const onNavigateCb = typeof options.onNavigate === "function" ? options.onNavigate : null;
  const rewriteRoot = options.rewriteRoot || document;

  // Ensure internal links work on GitHub Pages project URLs
  rewriteNavHrefs(rewriteRoot, basePath);

  // Support the existing 404 redirect query param (?r=...)
  restoreRedirectedPath(basePath);

  window.addEventListener("popstate", () => {
    if (onNavigateCb) onNavigateCb(getAppPath(basePath));
  });

  document.addEventListener("click", (e) => onDocumentClick(e, basePath, onNavigateCb));

  // Initial render
  if (onNavigateCb) onNavigateCb(getAppPath(basePath));

  return { basePath };
}

// -----------------------------
// Route matching (dependency-injected)
// -----------------------------

/**
 * matchRoute maps an appPath to a view promise using injected handlers.
 * This keeps router.js independent from app.js view implementations.
 *
 * @param {string} appPath
 * @param {Object} deps
 * @param {string[]} deps.AGE_GROUPS
 * @param {string[]} deps.SKILLS
 * @param {Function} deps.viewHome
 * @param {Function} deps.viewProfile
 * @param {Function} deps.viewContact
 * @param {Function} deps.viewFavourites
 * @param {Function} deps.viewGames
 * @param {Function} deps.viewTests
 * @param {Function} deps.viewResourcesIndex
 * @param {Function} deps.viewAge
 * @param {Function} deps.viewSkillAsync
 * @param {Function} deps.viewResourceDetailAsync
 * @param {Function} deps.viewTestDetailAsync
 * @param {Function} deps.viewNotFound
 * @returns {{view: Promise<any>}}
 */
export function matchRoute(appPath, deps) {
  const d = deps || {};
  const AGE_GROUPS = Array.isArray(d.AGE_GROUPS) ? d.AGE_GROUPS : [];
  const SKILLS = Array.isArray(d.SKILLS) ? d.SKILLS : [];
  const parts = normalizeAppPath(appPath).split("/").filter(Boolean);

  if (parts.length === 0) return { view: Promise.resolve(d.viewHome().view) };

  if (parts[0] === "profile" && parts.length === 1) return { view: Promise.resolve(d.viewProfile().view) };
  if (parts[0] === "contact" && parts.length === 1) return { view: Promise.resolve(d.viewContact().view) };

  if (parts[0] === "favourites" && parts.length === 1) return { view: Promise.resolve(d.viewFavourites().view) };
  if (parts[0] === "games" && parts.length === 1) return { view: Promise.resolve(d.viewGames().view) };

  if (parts[0] === "tests" && parts.length === 1) return { view: Promise.resolve(d.viewTests().view) };
  if (parts[0] === "tests" && parts.length === 2 && parts[1]) {
    return { view: d.viewTestDetailAsync(parts[1]).then((x) => x.view) };
  }

  if (parts[0] !== "resources") return { view: Promise.resolve(d.viewNotFound(normalizeAppPath(appPath)).view) };
  if (parts.length === 1) return { view: Promise.resolve(d.viewResourcesIndex().view) };

  const age = parts[1];
  if (!AGE_GROUPS.includes(age)) return { view: Promise.resolve(d.viewNotFound(normalizeAppPath(appPath)).view) };
  if (parts.length === 2) return { view: Promise.resolve(d.viewAge(age).view) };

  const skill = parts[2];
  if (!SKILLS.includes(skill)) return { view: Promise.resolve(d.viewNotFound(normalizeAppPath(appPath)).view) };
  if (parts.length === 3) return { view: d.viewSkillAsync(age, skill).then((x) => x.view) };

  const slug = parts[3];
  if (parts.length === 4 && slug) return { view: d.viewResourceDetailAsync(age, skill, slug).then((x) => x.view) };

  return { view: Promise.resolve(d.viewNotFound(normalizeAppPath(appPath)).view) };
}
