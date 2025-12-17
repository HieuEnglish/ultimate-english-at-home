(function () {
  const AGE_GROUPS = ["0-3", "4-7", "8-10", "11-12", "13-18"];
  const SKILLS = ["reading", "listening", "writing", "speaking"];

  const appEl = document.getElementById("app");
  const navLinks = Array.from(document.querySelectorAll("[data-nav-key]"));
  const yearEls = Array.from(document.querySelectorAll("[data-year]"));

  yearEls.forEach((el) => (el.textContent = String(new Date().getFullYear())));

  const basePath = detectBasePath();

  // Make <a href="/resources"> work on GitHub Pages project URLs (prepend basePath)
  rewriteNavHrefs();

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

  function rewriteNavHrefs() {
    if (!basePath) return;
    const links = document.querySelectorAll("a[data-nav]");
    links.forEach((a) => {
      const href = a.getAttribute("href");
      if (!href) return;
      if (href.startsWith("/") && !href.startsWith(basePath + "/")) {
        a.setAttribute("href", basePath + href);
      }
    });
  }

  function hrefFor(appPath) {
    return `${basePath}${appPath}`;
  }

  function getAppPath() {
    const full = window.location.pathname || "/";
    let p = full.startsWith(basePath) ? full.slice(basePath.length) : full;
    if (!p) p = "/";
    if (p.length > 1 && p.endsWith("/")) p = p.slice(0, -1);
    return p;
  }

  function normalizeAppPath(p) {
    if (!p) return "/";
    if (p.length > 1 && p.endsWith("/")) p = p.slice(0, -1);
    return p;
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
    if (!target.startsWith("/")) target = "/" + target;

    history.replaceState({}, "", hrefFor(normalizeAppPath(target)));
  }

  function onDocumentClick(e) {
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
    history.pushState({}, "", hrefFor(appPath));
    render(appPath);
  }

  function setActiveNav(appPath) {
    const key =
      appPath === "/"
        ? "home"
        : appPath.startsWith("/resources")
        ? "resources"
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

  function render(appPath) {
    setActiveNav(appPath);

    const route = matchRoute(appPath);
    const view = route.view;

    document.title = view.title;
    appEl.innerHTML = view.html;

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

    if (parts.length === 0) return viewHome();

    // New placeholders
    if (parts[0] === "games" && parts.length === 1) return viewGames();
    if (parts[0] === "tests" && parts.length === 1) return viewTests();

    // Existing resources routes
    if (parts[0] !== "resources") return viewNotFound(appPath);
    if (parts.length === 1) return viewResourcesIndex();

    const age = parts[1];
    if (!AGE_GROUPS.includes(age)) return viewNotFound(appPath);
    if (parts.length === 2) return viewAge(age);

    const skill = parts[2];
    if (!SKILLS.includes(skill)) return viewNotFound(appPath);
    if (parts.length === 3) return viewSkill(age, skill);

    return viewNotFound(appPath);
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
            text: "Browse by age group, then choose a skill area.",
            icon: iconBook(),
            primary: true
          })}

          ${card({
            href: hrefFor("/games"),
            title: "Games",
            text: "Placeholder for now (coming soon).",
            icon: iconGamepad()
          })}

          ${card({
            href: hrefFor("/tests"),
            title: "Tests",
            text: "Placeholder for now (coming soon).",
            icon: iconClipboard()
          })}
        </div>

        <div class="note">
          <strong>Tip:</strong> deep links work on GitHub Pages via a 404 redirect to this app.
        </div>
      </section>
    `;
    return { view: { title, html } };
  }

  function viewResourcesIndex() {
    const title = "Resources — UEAH";
    const breadcrumb = breadcrumbs([
      { label: "Home", href: hrefFor("/") },
      { label: "Resources" }
    ]);

    const cards = AGE_GROUPS.map((age) =>
      card({
        href: hrefFor(`/resources/${age}`),
        title: age,
        text: "Choose a skill area next.",
        icon: iconUsers()
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
    const breadcrumb = breadcrumbs([
      { label: "Home", href: hrefFor("/") },
      { label: "Games" }
    ]);

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
    const title = "Tests — UEAH";
    const breadcrumb = breadcrumbs([
      { label: "Home", href: hrefFor("/") },
      { label: "Tests" }
    ]);

    const html = `
      <section class="page-top">
        ${breadcrumb}
        <h1 class="page-title">Tests</h1>
        <p class="page-subtitle">This page is a placeholder for now.</p>

        <div class="note">
          <strong>Coming soon:</strong> quizzes and tests by age group and skill.
        </div>

        <div class="actions">
          <a class="btn btn--primary" href="${hrefFor("/")}" data-nav>Home</a>
          <a class="btn" href="${hrefFor("/resources")}" data-nav>Resources</a>
        </div>
      </section>
    `;
    return { view: { title, html } };
  }

  function viewAge(age) {
    const title = `${age} Resources — UEAH`;
    const breadcrumb = breadcrumbs([
      { label: "Home", href: hrefFor("/") },
      { label: "Resources", href: hrefFor("/resources") },
      { label: age }
    ]);

    const cards = SKILLS.map((skill) =>
      card({
        href: hrefFor(`/resources/${age}/${skill}`),
        title: capitalize(skill),
        text: "Open placeholder page (coming soon).",
        icon: iconSkill(skill)
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

  function viewSkill(age, skill) {
    const title = `${capitalize(skill)} (${age}) — UEAH`;
    const breadcrumb = breadcrumbs([
      { label: "Home", href: hrefFor("/") },
      { label: "Resources", href: hrefFor("/resources") },
      { label: age, href: hrefFor(`/resources/${age}`) },
      { label: capitalize(skill) }
    ]);

    const html = `
      <section class="page-top">
        ${breadcrumb}
        <h1 class="page-title">${capitalize(skill)} <span aria-hidden="true">·</span> <span class="muted">Age ${escapeHtml(age)}</span></h1>
        <p class="page-subtitle">This content page is a placeholder for now.</p>

        <div class="note">
          <strong>Coming soon:</strong> ${capitalize(skill)} resources for ages ${escapeHtml(age)}.
        </div>

        <div class="actions">
          <a class="btn" href="${hrefFor(`/resources/${age}`)}" data-nav>← Back to Skills</a>
          <a class="btn" href="${hrefFor("/resources")}" data-nav>Age Groups</a>
          <a class="btn btn--primary" href="${hrefFor("/")}" data-nav>Home</a>
        </div>
      </section>
    `;
    return { view: { title, html } };
  }

  function viewNotFound(appPath) {
    const title = "Not Found — UEAH";
    const breadcrumb = breadcrumbs([
      { label: "Home", href: hrefFor("/") },
      { label: "Not Found" }
    ]);

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

  function breadcrumbs(items) {
    const li = items
      .map((it) => {
        if (it.href) return `<li><a href="${it.href}" data-nav>${escapeHtml(it.label)}</a></li>`;
        return `<li aria-current="page">${escapeHtml(it.label)}</li>`;
      })
      .join("");
    return `<nav aria-label="Breadcrumb"><ol class="breadcrumbs">${li}</ol></nav>`;
  }

  function card({ href, title, text, icon, primary }) {
    const cls = primary ? "card card--primary" : "card";
    return `
      <a class="${cls}" href="${href}" data-nav role="listitem">
        <div class="card-icon" aria-hidden="true">${icon}</div>
        <div class="card-body">
          <h2 class="card-title">${escapeHtml(title)}</h2>
          <p class="card-text">${escapeHtml(text)}</p>
        </div>
        <span class="card-cta" aria-hidden="true">Open →</span>
      </a>
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

  function iconUsers() {
    return `
      <svg viewBox="0 0 24 24" width="24" height="24" focusable="false" aria-hidden="true">
        <path d="M16 11a3 3 0 1 0-3-3 3 3 0 0 0 3 3Z" fill="currentColor"></path>
        <path d="M7.5 12a2.5 2.5 0 1 0-2.5-2.5A2.5 2.5 0 0 0 7.5 12Z" fill="currentColor" opacity=".7"></path>
        <path d="M16 13c-2.76 0-5 1.79-5 4v2h10v-2c0-2.21-2.24-4-5-4Z" fill="currentColor" opacity=".18"></path>
        <path d="M7.5 13C5.02 13 3 14.57 3 16.5V19h7v-2c0-1.3.43-2.5 1.16-3.43A6.4 6.4 0 0 0 7.5 13Z" fill="currentColor" opacity=".12"></path>
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
