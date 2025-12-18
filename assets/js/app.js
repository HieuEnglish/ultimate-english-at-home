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

    if (parts[0] === "favourites" && parts.length === 1) return viewFavourites();
    if (parts[0] === "games" && parts.length === 1) return viewGames();
    if (parts[0] === "tests" && parts.length === 1) return viewTests();

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
            text: "Improve a skill",
            icon: iconLeaf(),
            primary: true,
            ctaText: "",
            glow: "green"
          })}

          ${card({
            href: hrefFor("/games"),
            title: "Games",
            text: "Improve with fun",
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
    const breadcrumb = breadcrumbs([
      { label: "Home", href: hrefFor("/") },
      { label: "Favourites" }
    ]);

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
    const breadcrumb = breadcrumbs([
      { label: "Home", href: hrefFor("/") },
      { label: "Resources" }
    ]);

    const glowKeys = ["green", "yellow", "red", "blue"];

    const cards = AGE_GROUPS.map((age, i) =>
      card({
        href: hrefFor(`/resources/${age}`),
        title: age,
        text: "Choose a skill area next.",
        icon: iconAge(age),
        ctaText: "",
        glow: glowKeys[i % glowKeys.length]
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
        text: "Open placeholder page (coming soon).",
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
        <h1 class="page-title">${capitalize(skill)} <span aria-hidden="true">·</span> <span class="muted">Age ${escapeHtml(
          age
        )}</span></h1>
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
