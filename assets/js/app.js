/* assets/js/app.js
   UEAH SPA router + UI renderer (GitHub Pages friendly).
   Uses:
   - window.UEAH_RESOURCES_STORE (loaded via assets/js/resources-store.js).
   - window.UEAH_TESTS_STORE (loaded via assets/js/tests-store.js + data files).
*/
(function () {
  const AGE_GROUPS = ["0-3", "4-7", "8-10", "11-12", "13-18"];
  const SKILLS = ["reading", "listening", "writing", "speaking"];

  const appEl = document.getElementById("app");
  const navLinks = Array.from(document.querySelectorAll("[data-nav-key]"));
  const yearEls = Array.from(document.querySelectorAll("[data-year]"));

  yearEls.forEach((el) => (el.textContent = String(new Date().getFullYear())));

  const basePath = detectBasePath();

  // Resources store (must be loaded before app.js)
  const STORE = (function getStore() {
    const s = window.UEAH_RESOURCES_STORE;
    if (s && typeof s === "object") return s;
    return null;
  })();

  // Tests store (must be loaded before app.js)
  const TESTS_STORE = (function getTestsStore() {
    const s = window.UEAH_TESTS_STORE;
    if (s && typeof s === "object") return s;
    return null;
  })();

  // Make <a href="/resources"> work on GitHub Pages project URLs (prepend basePath)
  rewriteNavHrefs(document);

  // Support the existing 404 redirect query param (?r=...)
  restoreRedirectedPath();

  window.addEventListener("popstate", () => render(getAppPath()));
  document.addEventListener("click", onDocumentClick);

  render(getAppPath());

  function detectBasePath() {
    const hostname = window.location.hostname || "";
    const pathname = window.location.pathname || "/";
    if (hostname.endsWith("github.io")) {
      const parts = pathname.split("/").filter(Boolean);
      return parts.length ? `/${parts[0]}` : "";
    }
    return "";
  }

  function rewriteNavHrefs(root) {
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

  function hrefFor(appPath) {
    const p = normalizeAppPath(appPath);
    return `${basePath}${p}`;
  }

  // For loading static assets (scripts/css/images) from any route safely.
  // Always returns an absolute path (with basePath for GitHub Pages project sites).
  function assetHref(assetPath) {
    if (!assetPath) return "";
    const s = String(assetPath);

    // Allow full URLs if ever needed
    if (s.startsWith("http://") || s.startsWith("https://")) return s;

    let p = s;
    if (!p.startsWith("/")) p = "/" + p;
    return `${basePath}${p}`;
  }

  function getAppPath() {
    const full = window.location.pathname || "/";
    let p = full.startsWith(basePath) ? full.slice(basePath.length) : full;
    if (!p) p = "/";
    p = normalizeAppPath(p);
    return p;
  }

  function normalizeAppPath(p) {
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

  function restoreRedirectedPath() {
    const url = new URL(window.location.href);

    const r = url.searchParams.get("r");
    if (!r) return;

    let target = String(r);

    try {
      const parsed = new URL(target, window.location.origin);
      target = parsed.pathname + parsed.search + parsed.hash;
    } catch (_) {}

    if (target.startsWith(basePath)) target = target.slice(basePath.length);
    target = normalizeAppPath(target);

    history.replaceState({}, "", hrefFor(target));
  }

  function onDocumentClick(e) {
    // Support <button data-nav-to="/resources/..."> navigation (resource cards)
    const navToEl = e.target && e.target.closest ? e.target.closest("[data-nav-to]") : null;
    if (navToEl) {
      const to = navToEl.getAttribute("data-nav-to");
      if (to) {
        e.preventDefault();
        navigate(normalizeAppPath(to));
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

    navigate(appPath);
  }

  function navigate(appPath) {
    const p = normalizeAppPath(appPath);
    history.pushState({}, "", hrefFor(p));
    render(p);
  }

  function setActiveNav(appPath) {
    const key =
      appPath === "/"
        ? "home"
        : appPath.startsWith("/resources")
        ? "resources"
        : appPath.startsWith("/favourites")
        ? "favourites"
        : appPath.startsWith("/games")
        ? "games"
        : appPath.startsWith("/tests")
        ? "tests"
        : "";

    navLinks.forEach((el) => {
      const isActive = el.getAttribute("data-nav-key") === key;
      el.classList.toggle("is-active", isActive);
      if (isActive) el.setAttribute("aria-current", "page");
      else el.removeAttribute("aria-current");
    });
  }

  let renderToken = 0;

  async function render(appPath) {
    const token = ++renderToken;
    const p = normalizeAppPath(appPath);
    setActiveNav(p);

    const route = matchRoute(p);

    // If view is async, show a quick loading state
    const isPromise = route && route.view && typeof route.view.then === "function";
    if (isPromise) {
      document.title = "Loading… — UEAH";
      appEl.innerHTML = loadingViewHtml();
      rewriteNavHrefs(appEl);
    }

    let view;
    try {
      view = await route.view;
    } catch (err) {
      view = viewError("Something went wrong while loading this page.", err).view;
    }

    // Outdated render (navigation happened)
    if (token !== renderToken) return;

    document.title = view.title;
    appEl.innerHTML = view.html;

    // Ensure any newly-rendered internal links get basePath applied (GitHub Pages)
    rewriteNavHrefs(appEl);

    // Optional hook for views that need to attach listeners after HTML is injected
    if (view && typeof view.afterRender === "function") {
      try {
        view.afterRender();
      } catch (_) {}
    }

    const main = document.getElementById("main");
    if (main) main.focus({ preventScroll: true });

    const h1 = appEl.querySelector("h1");
    if (h1) {
      h1.setAttribute("tabindex", "-1");
      h1.focus({ preventScroll: true });
      h1.removeAttribute("tabindex");
    }
  }

  function matchRoute(appPath) {
    const parts = appPath.split("/").filter(Boolean);

    if (parts.length === 0) return { view: Promise.resolve(viewHome().view) };

    if (parts[0] === "favourites" && parts.length === 1) return { view: Promise.resolve(viewFavourites().view) };
    if (parts[0] === "games" && parts.length === 1) return { view: Promise.resolve(viewGames().view) };

    if (parts[0] === "tests" && parts.length === 1) return { view: Promise.resolve(viewTests().view) };
    if (parts[0] === "tests" && parts.length === 2 && parts[1])
      return { view: viewTestDetailAsync(parts[1]).then((x) => x.view) };

    if (parts[0] !== "resources") return { view: Promise.resolve(viewNotFound(appPath).view) };
    if (parts.length === 1) return { view: Promise.resolve(viewResourcesIndex().view) };

    const age = parts[1];
    if (!AGE_GROUPS.includes(age)) return { view: Promise.resolve(viewNotFound(appPath).view) };
    if (parts.length === 2) return { view: Promise.resolve(viewAge(age).view) };

    const skill = parts[2];
    if (!SKILLS.includes(skill)) return { view: Promise.resolve(viewNotFound(appPath).view) };

    if (parts.length === 3) return { view: viewSkillAsync(age, skill).then((x) => x.view) };

    const slug = parts[3];
    if (parts.length === 4 && slug) return { view: viewResourceDetailAsync(age, skill, slug).then((x) => x.view) };

    return { view: Promise.resolve(viewNotFound(appPath).view) };
  }

  // -----------------------------
  // Store helpers (robust to minor API differences)
  // -----------------------------

  async function ensureAgeLoaded(age) {
    if (!STORE) return;
    if (typeof STORE.ensureAgeLoaded === "function") {
      await STORE.ensureAgeLoaded(age, { basePath });
    }
  }

  function storeGetPack(age, skill) {
    if (!STORE) return null;
    if (typeof STORE.getPack === "function") return STORE.getPack(age, skill);
    if (STORE.packs && typeof STORE.packs === "object") {
      const key = `${age}/${skill}`;
      return STORE.packs[key] || null;
    }
    return null;
  }

  function storeGetResources(age, skill) {
    if (!STORE) return [];
    if (typeof STORE.getResourcesFor === "function") return STORE.getResourcesFor(age, skill) || [];
    if (Array.isArray(STORE.resources)) return STORE.resources.filter((r) => r && r.age === age && r.skill === skill);
    return [];
  }

  function storeGetResource(age, skill, slug) {
    if (!STORE) return null;
    if (typeof STORE.getResource === "function") return STORE.getResource(age, skill, slug);
    const list = storeGetResources(age, skill);
    return list.find((r) => r && r.slug === slug) || null;
  }

  // Tests helpers
  function testsGetAll() {
    if (!TESTS_STORE) return [];
    if (typeof TESTS_STORE.getAll === "function") return TESTS_STORE.getAll() || [];
    if (Array.isArray(TESTS_STORE.tests)) return TESTS_STORE.tests.slice();
    return [];
  }

  function testsGetTest(slug) {
    if (!TESTS_STORE) return null;
    if (typeof TESTS_STORE.getTest === "function") return TESTS_STORE.getTest(slug);
    const list = testsGetAll();
    return list.find((t) => t && String(t.slug || "") === String(slug || "")) || null;
  }

  function testsHasRunner(slug) {
    if (!TESTS_STORE) return false;
    if (typeof TESTS_STORE.hasRunner === "function") return !!TESTS_STORE.hasRunner(slug);
    if (typeof TESTS_STORE.getRunner === "function") return !!TESTS_STORE.getRunner(slug);
    return false;
  }

  // Keep featured “Best Set” at the end
  function normalizeResourcesList(list) {
    const items = Array.isArray(list) ? list.slice() : [];
    items.sort((a, b) => {
      const af = a && a.isBestSet ? 1 : 0;
      const bf = b && b.isBestSet ? 1 : 0;
      if (af !== bf) return af - bf;
      return String(a && a.title ? a.title : "").localeCompare(String(b && b.title ? b.title : ""));
    });
    return items;
  }

  // -----------------------------
  // Script loader (for big tests)
  // -----------------------------

  const loadedScriptPromises = new Map();

  function loadScriptOnce(src) {
    const url = assetHref(src);
    if (!url) return Promise.reject(new Error("Missing script src"));
    if (loadedScriptPromises.has(url)) return loadedScriptPromises.get(url);

    const p = new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = url;
      s.defer = true;
      s.onload = () => resolve(true);
      s.onerror = () => reject(new Error(`Failed to load script: ${url}`));
      document.head.appendChild(s);
    });

    loadedScriptPromises.set(url, p);
    return p;
  }

  async function ensureTestRunnerLoaded(test) {
    if (!test) return;
    if (testsHasRunner(test.slug)) return;
    if (!test.module) return;
    await loadScriptOnce(test.module);
  }

  // -----------------------------
  // Views
  // -----------------------------

  function loadingViewHtml() {
    return `
      <section class="page-top">
        ${breadcrumbs([{ label: "Home", href: hrefFor("/") }, { label: "Loading…" }])}
        <h1 class="page-title">Loading…</h1>
        <p class="page-subtitle">Please wait a moment.</p>
      </section>
    `;
  }

  function viewError(message, err) {
    const title = "Error — UEAH";
    const breadcrumb = breadcrumbs([{ label: "Home", href: hrefFor("/") }, { label: "Error" }]);
    const detail = err ? `<p class="muted" style="margin-top:10px"><code>${escapeHtml(String(err))}</code></p>` : "";
    const html = `
      <section class="page-top">
        ${breadcrumb}
        <h1 class="page-title">Error</h1>
        <p class="page-subtitle">${escapeHtml(message || "An error occurred.")}</p>
        ${detail}
        <div class="actions">
          <a class="btn btn--primary" href="${hrefFor("/")}" data-nav>Home</a>
          <a class="btn" href="${hrefFor("/resources")}" data-nav>Resources</a>
        </div>
      </section>
    `;
    return { view: { title, html } };
  }

  function viewStoreMissing() {
    const title = "Resources unavailable — UEAH";
    const breadcrumb = breadcrumbs([{ label: "Home", href: hrefFor("/") }, { label: "Resources" }]);
    const html = `
      <section class="page-top">
        ${breadcrumb}
        <h1 class="page-title">Resources unavailable</h1>
        <p class="page-subtitle">The resources store script is not loaded.</p>
        <div class="note">
          <strong>Fix:</strong> Ensure <code>assets/js/resources-store.js</code> is loaded before <code>assets/js/app.js</code>.
        </div>
        <div class="actions">
          <a class="btn btn--primary" href="${hrefFor("/")}" data-nav>Home</a>
        </div>
      </section>
    `;
    return { view: { title, html } };
  }

  function viewTestsStoreMissing() {
    const title = "Tests unavailable — UEAH";
    const breadcrumb = breadcrumbs([{ label: "Home", href: hrefFor("/") }, { label: "Tests" }]);
    const html = `
      <section class="page-top">
        ${breadcrumb}
        <h1 class="page-title">Tests unavailable</h1>
        <p class="page-subtitle">The tests store script is not loaded.</p>
        <div class="note">
          <strong>Fix:</strong> Ensure <code>assets/js/tests-store.js</code> (and your tests data files) are loaded before <code>assets/js/app.js</code>.
        </div>
        <div class="actions">
          <a class="btn btn--primary" href="${hrefFor("/")}" data-nav>Home</a>
          <a class="btn" href="${hrefFor("/resources")}" data-nav>Resources</a>
        </div>
      </section>
    `;
    return { view: { title, html } };
  }

  function viewHome() {
    const title = "UEAH — Ultimate English At Home";
    const html = `
      <section class="hero">
        <p class="eyebrow">Ultimate English At Home</p>
        <h1 class="hero-title">learning paths — by age and skill</h1>
        <p class="hero-subtitle">
          Start with Resources, choose an age group, then pick Reading, Listening, Writing, or Speaking.
        </p>

        <div class="card-grid" role="list">
          ${card({
            href: hrefFor("/resources"),
            title: "Resources",
            text: "Improve a skill",
            icon: iconLeaf(),
            primary: true,
            ctaText: "",
            glow: "green"
          })}

          ${card({
            href: hrefFor("/games"),
            title: "Games",
            text: "Learn with fun",
            icon: iconGamepad(),
            ctaText: "",
            glow: "yellow"
          })}

          ${card({
            href: hrefFor("/tests"),
            title: "Tests",
            text: "Test your skills",
            icon: iconClipboard(),
            ctaText: "",
            glow: "blue"
          })}

          ${card({
            href: hrefFor("/favourites"),
            title: "Favourites",
            text: "Save your favourites",
            icon: iconHeart(),
            ctaText: "",
            glow: "pink"
          })}
        </div>
      </section>
    `;
    return { view: { title, html } };
  }

  function viewFavourites() {
    const title = "Favourites — UEAH";
    const breadcrumb = breadcrumbs([{ label: "Home", href: hrefFor("/") }, { label: "Favourites" }]);

    const html = `
      <section class="page-top">
        ${breadcrumb}
        <h1 class="page-title">Favourites</h1>
        <p class="page-subtitle">This page is a placeholder for now.</p>

        <div class="note">
          <strong>Coming soon:</strong> save resources you like and come back to them later.
        </div>

        <div class="actions">
          <a class="btn btn--primary" href="${hrefFor("/")}" data-nav>Home</a>
          <a class="btn" href="${hrefFor("/resources")}" data-nav>Resources</a>
        </div>
      </section>
    `;
    return { view: { title, html } };
  }

  function viewResourcesIndex() {
    const title = "Resources — UEAH";
    const breadcrumb = breadcrumbs([{ label: "Home", href: hrefFor("/") }, { label: "Resources" }]);

    const glowByAge = {
      "0-3": "green",
      "4-7": "yellow",
      "8-10": "red",
      "11-12": "blue",
      "13-18": "pink"
    };

    const cards = AGE_GROUPS.map((age) =>
      card({
        href: hrefFor(`/resources/${age}`),
        title: age,
        text: "Choose a skill area next.",
        icon: iconAge(age),
        ctaText: "",
        glow: glowByAge[age] || "green"
      })
    ).join("");

    const html = `
      <section class="page-top">
        ${breadcrumb}
        <h1 class="page-title">Resources</h1>
        <p class="page-subtitle">Pick an age group to see skill areas.</p>

        <div class="card-grid" role="list">
          ${cards}
        </div>

        <div class="actions">
          <a class="btn" href="${hrefFor("/")}" data-nav>← Back to Home</a>
        </div>
      </section>
    `;
    return { view: { title, html } };
  }

  function viewGames() {
    const title = "Games — UEAH";
    const breadcrumb = breadcrumbs([{ label: "Home", href: hrefFor("/") }, { label: "Games" }]);

    const html = `
      <section class="page-top">
        ${breadcrumb}
        <h1 class="page-title">Games</h1>
        <p class="page-subtitle">This page is a placeholder for now.</p>

        <div class="note">
          <strong>Coming soon:</strong> interactive games by age group and skill.
        </div>

        <div class="actions">
          <a class="btn btn--primary" href="${hrefFor("/")}" data-nav>Home</a>
          <a class="btn" href="${hrefFor("/resources")}" data-nav>Resources</a>
        </div>
      </section>
    `;
    return { view: { title, html } };
  }

  function viewTests() {
    if (!TESTS_STORE) return viewTestsStoreMissing();

    const title = "Tests — UEAH";
    const breadcrumb = breadcrumbs([{ label: "Home", href: hrefFor("/") }, { label: "Tests" }]);

    const tests = testsGetAll();
    const hasTests = tests.length > 0;

    const cards = hasTests
      ? tests
          .map((t) =>
            card({
              href: hrefFor(`/tests/${t.slug}`),
              title: t.title || "Test",
              text: t.subtitle || "Test your ability",
              icon: iconSkill(t.skill),
              ctaText: "",
              glow: "iels" // special multi-colour glow
            })
          )
          .join("")
      : "";

    const html = `
      <section class="page-top">
        ${breadcrumb}
        <h1 class="page-title">Tests</h1>
        <p class="page-subtitle">Choose a test.</p>

        ${
          hasTests
            ? `<div class="card-grid" role="list" aria-label="Tests">${cards}</div>`
            : `
              <div class="note">
                <strong>Coming soon:</strong> tests will appear here.
              </div>
            `
        }

        <div class="actions">
          <a class="btn" href="${hrefFor("/")}" data-nav>← Back to Home</a>
          <a class="btn" href="${hrefFor("/resources")}" data-nav>Resources</a>
        </div>
      </section>
    `;
    return { view: { title, html } };
  }

  async function viewTestDetailAsync(slug) {
    if (!TESTS_STORE) return viewTestsStoreMissing();

    const test = testsGetTest(slug);
    if (!test) return viewNotFound(`/tests/${slug}`);

    // Lazy-load the test implementation if needed
    try {
      await ensureTestRunnerLoaded(test);
    } catch (err) {
      return viewError("Could not load this test module.", err);
    }

    const title = `${test.title || "Test"} — UEAH`;
    const breadcrumb = breadcrumbs([
      { label: "Home", href: hrefFor("/") },
      { label: "Tests", href: hrefFor("/tests") },
      { label: test.title || "Test" }
    ]);

    const ctx = {
      slug: test.slug,
      test,
      hrefFor,
      assetHref,
      basePath
    };

    // Render via store runner if present
    let runnerOut = null;
    if (typeof TESTS_STORE.render === "function") {
      runnerOut = TESTS_STORE.render(test.slug, ctx);
    } else if (typeof TESTS_STORE.getRunner === "function") {
      const r = TESTS_STORE.getRunner(test.slug);
      if (typeof r === "function") runnerOut = { html: r(ctx), afterRender: null };
      else if (r && typeof r.render === "function") runnerOut = { html: r.render(ctx), afterRender: r.afterRender || null };
    }

    const runnerHtml =
      runnerOut && runnerOut.html
        ? String(runnerOut.html)
        : `
          <div class="note">
            <strong>Coming soon:</strong> this test is not implemented yet.
          </div>
        `;

    const html = `
      <section class="page-top">
        ${breadcrumb}
        <h1 class="page-title">${escapeHtml(test.title || "Test")}</h1>
        <p class="page-subtitle">${escapeHtml(test.subtitle || "Test your ability")}</p>

        <div class="detail-card" role="region" aria-label="Test details">
          <div style="display:flex; gap:12px; align-items:flex-start">
            <div class="card-icon" aria-hidden="true" style="width:44px; height:44px">${iconSkill(test.skill)}</div>
            <div>
              <h2 class="detail-title" style="font-size:18px; margin:0">Test</h2>
              <p class="detail-desc" style="margin-top:10px">${escapeHtml(test.subtitle || "Test your ability")}</p>
            </div>
          </div>

          <div id="test-root" style="margin-top:14px">
            ${runnerHtml}
          </div>

          <div class="actions" style="margin-top:16px">
            <a class="btn" href="${hrefFor("/tests")}" data-nav>← Back</a>
          </div>
        </div>

        <div class="actions">
          <a class="btn" href="${hrefFor("/tests")}" data-nav>← Back to Tests</a>
          <a class="btn" href="${hrefFor("/resources")}" data-nav>Resources</a>
          <a class="btn btn--primary" href="${hrefFor("/")}" data-nav>Home</a>
        </div>
      </section>
    `;

    const afterRender =
      runnerOut && typeof runnerOut.afterRender === "function"
        ? function () {
            const root = document.getElementById("test-root");
            if (!root) return;
            try {
              runnerOut.afterRender(root, ctx);
            } catch (_) {}
          }
        : null;

    return { view: { title, html, afterRender } };
  }

  function viewAge(age) {
    const title = `${age} Resources — UEAH`;
    const breadcrumb = breadcrumbs([
      { label: "Home", href: hrefFor("/") },
      { label: "Resources", href: hrefFor("/resources") },
      { label: age }
    ]);

    const glowBySkill = {
      reading: "blue",
      listening: "green",
      writing: "yellow",
      speaking: "red"
    };

    const cards = SKILLS.map((skill) =>
      card({
        href: hrefFor(`/resources/${age}/${skill}`),
        title: capitalize(skill),
        text: "Open this skill page.",
        icon: iconSkill(skill),
        ctaText: "",
        glow: glowBySkill[skill] || "green"
      })
    ).join("");

    const html = `
      <section class="page-top">
        ${breadcrumb}
        <h1 class="page-title">Age ${escapeHtml(age)}</h1>
        <p class="page-subtitle">Choose a skill area.</p>

        <div class="card-grid" role="list">
          ${cards}
        </div>

        <div class="actions">
          <a class="btn" href="${hrefFor("/resources")}" data-nav>← Back to Age Groups</a>
          <a class="btn btn--primary" href="${hrefFor("/")}" data-nav>Home</a>
        </div>
      </section>
    `;
    return { view: { title, html } };
  }

  async function viewSkillAsync(age, skill) {
    if (!STORE) return viewStoreMissing();

    await ensureAgeLoaded(age);

    const title = `${capitalize(skill)} (${age}) — UEAH`;
    const breadcrumb = breadcrumbs([
      { label: "Home", href: hrefFor("/") },
      { label: "Resources", href: hrefFor("/resources") },
      { label: age, href: hrefFor(`/resources/${age}`) },
      { label: capitalize(skill) }
    ]);

    const pack = storeGetPack(age, skill);
    const resources = normalizeResourcesList(storeGetResources(age, skill));

    const heading =
      pack && pack.title
        ? escapeHtml(pack.title)
        : `${capitalize(skill)} <span aria-hidden="true">·</span> <span class="muted">Age ${escapeHtml(age)}</span>`;

    const subtitle =
      pack && pack.overview
        ? escapeHtml(pack.overview)
        : `Resources for ${capitalize(skill)} — ages ${escapeHtml(age)}.`;

    const packHtml = pack
      ? `
        <div class="detail-card" role="region" aria-label="Pack overview">
          <h2 class="detail-title" style="font-size:18px; margin:0">Overview</h2>
          <p class="detail-desc" style="margin-top:10px">${escapeHtml(pack.overview || "")}</p>

          ${
            Array.isArray(pack.objectives) && pack.objectives.length
              ? `
              <div class="detail-section">
                <h2>Objectives</h2>
                <ul>
                  ${pack.objectives.map((o) => `<li>${escapeHtml(o)}</li>`).join("")}
                </ul>
              </div>
            `
              : ""
          }

          ${
            Array.isArray(pack.materials) && pack.materials.length
              ? `
              <div class="detail-section">
                <h2>Materials / Resources</h2>
                <ul>
                  ${pack.materials.map((m) => `<li>${escapeHtml(m)}</li>`).join("")}
                </ul>
              </div>
            `
              : ""
          }
        </div>
      `
      : "";

    const gridHtml = resources.length
      ? `
        <div class="resource-grid" role="list" aria-label="Resources">
          ${resources
            .map((r) => {
              const detailPath = `/resources/${age}/${skill}/${r.slug}`;
              const detailHref = hrefFor(detailPath);

              const chips = renderChips(r);
              const isFeatured = r.isBestSet ? " is-featured" : "";
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
                    <p class="resource-desc">${escapeHtml(r.description || `Practice resource for ${skill}.`)}</p>
                    ${chips}
                  </button>
                  <div class="resource-actions" aria-label="Resource actions">
                    <a class="btn btn--small" href="${detailHref}" data-nav>Details →</a>
                    ${openBtn}
                  </div>
                </article>
              `;
            })
            .join("")}
        </div>
      `
      : `
        <div class="note">
          <strong>Coming soon:</strong> ${capitalize(skill)} resources for ages ${escapeHtml(age)}.
        </div>
      `;

    const bestSetNote =
      pack && pack.bestSetSlug
        ? (() => {
            const best = resources.find((r) => r.slug === pack.bestSetSlug);
            if (!best) return "";
            return `
              <div class="note" style="margin-top:20px">
                <strong>${escapeHtml(best.title)}</strong>
                <p style="margin:8px 0 0">${escapeHtml(best.description || "")}</p>
                <div class="actions" style="margin-top:12px">
                  <a class="btn btn--primary" href="${hrefFor(`/resources/${age}/${skill}/${best.slug}`)}" data-nav>Open Best Set →</a>
                </div>
              </div>
            `;
          })()
        : "";

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
          <a class="btn" href="${hrefFor(`/resources/${age}`)}" data-nav>← Back to Skills</a>
          <a class="btn" href="${hrefFor("/resources")}" data-nav>Age Groups</a>
          <a class="btn btn--primary" href="${hrefFor("/")}" data-nav>Home</a>
        </div>
      </section>
    `;
    return { view: { title, html } };
  }

  async function viewResourceDetailAsync(age, skill, slug) {
    if (!STORE) return viewStoreMissing();

    await ensureAgeLoaded(age);

    const resource = storeGetResource(age, skill, slug);
    if (!resource) return viewNotFound(`/resources/${age}/${skill}/${slug}`);

    const title = `${resource.title} — UEAH`;
    const breadcrumb = breadcrumbs([
      { label: "Home", href: hrefFor("/") },
      { label: "Resources", href: hrefFor("/resources") },
      { label: age, href: hrefFor(`/resources/${age}`) },
      { label: capitalize(skill), href: hrefFor(`/resources/${age}/${skill}`) },
      { label: resource.title }
    ]);

    const chips = renderChips(resource, true);

    const openBtn = resource.link
      ? `<a class="btn btn--primary" href="${escapeAttr(
          resource.link
        )}" target="_blank" rel="noopener noreferrer">Open Resource ↗</a>`
      : `<span class="btn btn--primary btn--disabled" aria-disabled="true">MISSING LINK</span>`;

    const details = resource.details || {};

    const otherLinks = Array.isArray(details.otherLinks) ? details.otherLinks : [];
    const otherLinksHtml = otherLinks.length
      ? `
        <div class="detail-section">
          <h2>Extra links</h2>
          <div class="detail-links">
            ${otherLinks
              .map(
                (u) =>
                  `<a class="btn btn--small" href="${escapeAttr(
                    u
                  )}" target="_blank" rel="noopener noreferrer">Open extra link ↗</a>`
              )
              .join("")}
          </div>
        </div>
      `
      : "";

    const bundleHtml =
      Array.isArray(resource.bundleItems) && resource.bundleItems.length
        ? `
        <div class="detail-section">
          <h2>Included resources</h2>
          <ul>
            ${resource.bundleItems
              .map((s) => {
                const r = storeGetResource(age, skill, s);
                if (!r) return `<li>${escapeHtml(s)}</li>`;
                const internalHref = hrefFor(`/resources/${age}/${skill}/${r.slug}`);
                const external = r.link
                  ? ` <a href="${escapeAttr(r.link)}" target="_blank" rel="noopener noreferrer">(Open ↗)</a>`
                  : ` <span class="muted">(MISSING LINK)</span>`;
                return `<li><a href="${internalHref}" data-nav>${escapeHtml(r.title)}</a>${external}</li>`;
              })
              .join("")}
          </ul>
        </div>
      `
        : "";

    const html = `
      <section class="page-top">
        ${breadcrumb}

        <div class="detail-card">
          <h1 class="detail-title">${escapeHtml(resource.title)}</h1>
          <p class="detail-desc">${escapeHtml(resource.description || `Practice resource for ${skill}.`)}</p>
          ${chips}

          <div class="actions" style="margin-top:14px">
            <a class="btn" href="${hrefFor(`/resources/${age}/${skill}`)}" data-nav>← Back</a>
            ${openBtn}
          </div>

          ${renderDetailSection("Type", details.type)}
          ${renderDetailSection("What it teaches", details.teaches)}
          ${renderDetailListSection("How to use", details.howTo)}
          ${renderDetailSection("Why it’s a top pick", details.whyTopPick)}
          ${renderDetailSection("Free access check", details.freeAccess)}
          ${renderDetailSection("Age check", details.ageCheck)}
          ${bundleHtml}
          ${otherLinksHtml}
        </div>

        <div class="actions">
          <a class="btn" href="${hrefFor(`/resources/${age}/${skill}`)}" data-nav>← Back to ${capitalize(skill)}</a>
          <a class="btn" href="${hrefFor(`/resources/${age}`)}" data-nav>Skills</a>
          <a class="btn" href="${hrefFor("/resources")}" data-nav>Age Groups</a>
        </div>
      </section>
    `;

    return { view: { title, html } };
  }

  function viewNotFound(appPath) {
    const title = "Not Found — UEAH";
    const breadcrumb = breadcrumbs([{ label: "Home", href: hrefFor("/") }, { label: "Not Found" }]);

    const html = `
      <section class="page-top">
        ${breadcrumb}
        <h1 class="page-title">Page not found</h1>
        <p class="page-subtitle">We couldn’t find: <code>${escapeHtml(appPath)}</code></p>

        <div class="actions">
          <a class="btn btn--primary" href="${hrefFor("/")}" data-nav>Go Home</a>
          <a class="btn" href="${hrefFor("/resources")}" data-nav>Resources</a>
        </div>
      </section>
    `;
    return { view: { title, html } };
  }

  // -----------------------------
  // Resource UI helpers
  // -----------------------------

  function renderChips(resource, showAll) {
    const chips = [];

    if (resource && resource.format) chips.push({ label: "Format", value: resource.format });
    if (resource && resource.level) chips.push({ label: "Level", value: resource.level });
    if (resource && resource.time) chips.push({ label: "Time", value: resource.time });
    if (resource && resource.focus) chips.push({ label: "Focus", value: resource.focus });

    if (!chips.length && !showAll) return "";

    if (!chips.length && showAll) {
      return `<div class="chips" aria-label="Metadata"><span class="chip">Not specified</span></div>`;
    }

    const html = chips.map((c) => `<span class="chip">${escapeHtml(c.label)}: ${escapeHtml(c.value)}</span>`).join("");
    return `<div class="chips" aria-label="Metadata">${html}</div>`;
  }

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
          ${arr.map((x) => `<li>${escapeHtml(x)}</li>`).join("")}
        </ul>
      </div>
    `;
  }

  function escapeAttr(s) {
    return escapeHtml(String(s)).replaceAll("\n", " ");
  }

  // -----------------------------
  // UI helpers
  // -----------------------------

  function breadcrumbs(items) {
    const li = items
      .map((it) => {
        if (it.href) return `<li><a href="${it.href}" data-nav>${escapeHtml(it.label)}</a></li>`;
        return `<li aria-current="page">${escapeHtml(it.label)}</li>`;
      })
      .join("");
    return `<nav aria-label="Breadcrumb"><ol class="breadcrumbs">${li}</ol></nav>`;
  }

  function card({ href, title, text, icon, primary, ctaText = "Open →", glow = "" }) {
    const cls = primary ? "card card--primary" : "card";
    const glowAttr = glow ? ` data-glow="${escapeHtml(glow)}"` : "";
    const ctaHtml = ctaText ? `<span class="card-cta" aria-hidden="true">${escapeHtml(ctaText)}</span>` : "";

    return `
      <a class="${cls}" href="${href}" data-nav role="listitem"${glowAttr}>
        <div class="card-icon" aria-hidden="true">${icon}</div>
        <div class="card-body">
          <h2 class="card-title">${escapeHtml(title)}</h2>
          <p class="card-text">${escapeHtml(text)}</p>
        </div>
        ${ctaHtml}
      </a>
    `;
  }

  // -----------------------------
  // Icons + utils (unchanged)
  // -----------------------------

  function iconAge(age) {
    if (age === "0-3") return iconBabyBottle();
    if (age === "4-7") return iconTeddy();
    if (age === "8-10") return iconPencil();
    if (age === "11-12") return iconHeadphones();
    return iconGradCap();
  }

  function iconLeaf() {
    return `
      <svg viewBox="0 0 24 24" width="24" height="24" focusable="false" aria-hidden="true">
        <path d="M12 2c4.6 2.3 7.7 6.2 8 10.5.3 4.4-2.8 8.3-7.2 9.2-2.4.5-4.8.1-6.7-1.1-1.9-1.2-3.2-3.1-3.7-5.2C1.4 11.1 4.5 6 12 2Z" fill="currentColor" opacity=".18"></path>
        <path d="M12 5c3.7 2 6.2 5 6.3 8.1.2 3.3-2.2 6.3-5.6 7-1.8.4-3.7.1-5.2-.9-1.5-.9-2.5-2.4-2.9-4C3.9 11.7 6.3 8.1 12 5Z" fill="currentColor"></path>
        <path d="M12 7v14" stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity=".75"></path>
        <path d="M12 13c1.2-1.1 2.5-2 4-2.6" stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity=".55"></path>
        <path d="M12 16c-1.1-.9-2.3-1.6-3.6-2.1" stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity=".55"></path>
      </svg>
    `;
  }

  function iconBabyBottle() {
    return `
      <svg viewBox="0 0 24 24" width="24" height="24" focusable="false" aria-hidden="true">
        <path d="M10 2h4v2h-4V2Z" fill="currentColor" opacity=".25"></path>
        <path d="M9 4h6v2H9V4Z" fill="currentColor" opacity=".18"></path>
        <path d="M9 6h6v2.2l-.9.9V19a3 3 0 0 1-6 0V9.1l-.9-.9V6Z" fill="currentColor" opacity=".20"></path>
        <path d="M10 9h4v10a2 2 0 0 1-4 0V9Z" fill="currentColor"></path>
        <path d="M11 12h2v1h-2v-1Zm0 3h2v1h-2v-1Z" fill="currentColor" opacity=".55"></path>
      </svg>
    `;
  }

  function iconTeddy() {
    return `
      <svg viewBox="0 0 24 24" width="24" height="24" focusable="false" aria-hidden="true">
        <circle cx="8" cy="8" r="2" fill="currentColor" opacity=".25"></circle>
        <circle cx="16" cy="8" r="2" fill="currentColor" opacity=".25"></circle>
        <circle cx="12" cy="9.5" r="4.5" fill="currentColor" opacity=".18"></circle>
        <path d="M7.5 20a4.5 4.5 0 0 1 9 0v1H7.5v-1Z" fill="currentColor" opacity=".18"></path>
        <path d="M9.2 13.2a2.8 2.8 0 0 0 5.6 0" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round" opacity=".9"></path>
        <circle cx="10.4" cy="9.6" r=".7" fill="currentColor"></circle>
        <circle cx="13.6" cy="9.6" r=".7" fill="currentColor"></circle>
        <path d="M11.2 11.2h1.6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"></path>
      </svg>
    `;
  }

  function iconPencil() {
    return `
      <svg viewBox="0 0 24 24" width="24" height="24" focusable="false" aria-hidden="true">
        <path d="M15.7 3.9a2 2 0 0 1 2.8 0l1.6 1.6a2 2 0 0 1 0 2.8L10 18.4 5 19l.6-5 10.1-10.1Z" fill="currentColor" opacity=".18"></path>
        <path d="M7.2 16.8 16.9 7.1l2 2-9.7 9.7-2.6.3.6-2.3Z" fill="currentColor"></path>
        <path d="M15.5 5.3 18.7 8.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" opacity=".85"></path>
      </svg>
    `;
  }

  function iconHeadphones() {
    return `
      <svg viewBox="0 0 24 24" width="24" height="24" focusable="false" aria-hidden="true">
        <path d="M4 12a8 8 0 0 1 16 0v5a2 2 0 0 1-2 2h-1v-7h3v-1Z" fill="currentColor" opacity=".18"></path>
        <path d="M4 12v1h3v7H6a2 2 0 0 1-2-2v-6Z" fill="currentColor" opacity=".18"></path>
        <path d="M7 12h2v8H7a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2Z" fill="currentColor"></path>
        <path d="M15 12h2a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2v-8Z" fill="currentColor"></path>
        <path d="M6 12a6 6 0 0 1 12 0" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" opacity=".85"></path>
      </svg>
    `;
  }

  function iconGradCap() {
    return `
      <svg viewBox="0 0 24 24" width="24" height="24" focusable="false" aria-hidden="true">
        <path d="M12 4 2.5 9 12 14l9.5-5L12 4Z" fill="currentColor" opacity=".18"></path>
        <path d="M6.5 12v4.2c0 .8 2.6 2.8 5.5 2.8s5.5-2 5.5-2.8V12l-5.5 2.9L6.5 12Z" fill="currentColor"></path>
        <path d="M21.5 9v6" stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity=".85"></path>
        <path d="M21.5 15c-1.2.6-2.3 1-3.5 1.2" stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity=".65"></path>
      </svg>
    `;
  }

  function iconBook() {
    return `
      <svg viewBox="0 0 24 24" width="24" height="24" focusable="false" aria-hidden="true">
        <path d="M4 5.5C4 4.67 4.67 4 5.5 4H19a1 1 0 0 1 1 1v13.5a1.5 1.5 0 0 1-1.5 1.5H6.25A2.25 2.25 0 0 0 4 22V5.5Z" fill="currentColor" opacity=".18"></path>
        <path d="M6.25 20H18.5a.5.5 0 0 0 .5-.5V6H6.5A.5.5 0 0 0 6 6.5V19a1 1 0 0 0 .25 1Z" fill="currentColor"></path>
      </svg>
    `;
  }

  function iconHeart() {
    return `
      <svg viewBox="0 0 24 24" width="24" height="24" focusable="false" aria-hidden="true">
        <path d="M12 21s-7-4.6-9.2-9C1 8.4 3.4 5.5 6.6 5.5c1.7 0 3.1.8 3.9 2 0 0 .8-2 3.5-2 3.2 0 5.6 2.9 3.8 6.5C19 16.4 12 21 12 21Z" fill="currentColor" opacity=".18"></path>
        <path d="M12 19.6c-1.9-1.3-5.5-4.2-6.8-7C3.7 9.4 5.3 7.5 7.3 7.5c1.5 0 2.6 1.1 3.1 2.1h1.1c.5-1 1.6-2.1 3.1-2.1 2 0 3.6 1.9 2.1 5.1-1.3 2.8-4.9 5.7-6.8 7Z" fill="currentColor"></path>
      </svg>
    `;
  }

  function iconGamepad() {
    return `
      <svg viewBox="0 0 24 24" width="24" height="24" focusable="false" aria-hidden="true">
        <path d="M7 9a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v6a3 3 0 0 1-3 3h-1l-1.2-1.2a1 1 0 0 0-.7-.3h-1.2a1 1 0 0 0-.7.3L9 18H8a3 3 0 0 1-3-3V9Z" fill="currentColor" opacity=".18"></path>
        <path d="M10 11H8v2h2v2h2v-2h2v-2h-2V9h-2v2Z" fill="currentColor"></path>
        <path d="M16.5 11.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" fill="currentColor"></path>
        <path d="M17.75 13a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" fill="currentColor"></path>
      </svg>
    `;
  }

  function iconClipboard() {
    return `
      <svg viewBox="0 0 24 24" width="24" height="24" focusable="false" aria-hidden="true">
        <path d="M7 4h7l3 3v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Z" fill="currentColor" opacity=".18"></path>
        <path d="M14 4v3a1 1 0 0 0 1 1h3" fill="currentColor"></path>
        <path d="M8.5 11.5h7v1.5h-7v-1.5Zm0 3h7V16h-7v-1.5Z" fill="currentColor"></path>
      </svg>
    `;
  }

  function iconSkill(skill) {
    if (skill === "reading") return iconBook();
    if (skill === "listening")
      return `
      <svg viewBox="0 0 24 24" width="24" height="24" focusable="false" aria-hidden="true">
        <path d="M12 3a6 6 0 0 0-6 6v4a4 4 0 0 0 8 0V9a2 2 0 0 0-4 0v4a1 1 0 0 0 2 0V9h2v4a3 3 0 0 1-6 0V9a4 4 0 0 1 8 0v5a5 5 0 0 1-10 0V9H4v5a7 7 0 0 0 14 0V9a6 6 0 0 0-6-6Z" fill="currentColor"></path>
      </svg>
    `;
    if (skill === "writing")
      return `
      <svg viewBox="0 0 24 24" width="24" height="24" focusable="false" aria-hidden="true">
        <path d="M4 20h4l10.5-10.5a2 2 0 0 0 0-3L16.5 4.5a2 2 0 0 0-3 0L3 15v5Z" fill="currentColor" opacity=".18"></path>
        <path d="M14.5 6.5 17.5 9.5" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"></path>
        <path d="M6 18h2l9-9-2-2-9 9v2Z" fill="currentColor"></path>
      </svg>
    `;
    return `
      <svg viewBox="0 0 24 24" width="24" height="24" focusable="false" aria-hidden="true">
        <path d="M12 3a4 4 0 0 0-4 4v5a4 4 0 0 0 8 0V7a4 4 0 0 0-4-4Z" fill="currentColor" opacity=".18"></path>
        <path d="M7 12a5 5 0 0 0 10 0" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"></path>
        <path d="M12 17v3" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"></path>
        <path d="M9 20h6" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"></path>
      </svg>
    `;
  }

  function capitalize(s) {
    return s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
  }

  function escapeHtml(s) {
    return String(s)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }
})();
