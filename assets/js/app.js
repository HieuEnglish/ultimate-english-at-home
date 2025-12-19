/* assets/js/app.js
   UEAH SPA router + UI renderer (GitHub Pages friendly).
   Uses:
   - window.UEAH_RESOURCES_STORE (loaded via assets/js/resources-store.js).
   - window.UEAH_TESTS_STORE (loaded via assets/js/tests-store.js + data files).
   Optional:
   - window.UEAH_PROFILE_STORE (loaded via assets/js/profile-store.js).
   - window.UEAH_CONTACT (loaded via assets/js/contact.js).
*/

import { AGE_GROUPS, SKILLS } from "./constants.js";
import {
  escapeHtml,
  escapeAttr,
  capitalize,
  breadcrumbs,
  card,
  renderChips,
  iconLeaf,
  iconGamepad,
  iconClipboard,
  iconUser,
  iconHeart,
  iconMail,
  iconSkill,
  iconAge
} from "./common.js";
import {
  detectBasePath,
  rewriteNavHrefs,
  normalizeAppPath,
  hrefFor,
  navigate,
  setActiveNav,
  matchRoute,
  initRouter
} from "./router.js";
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
  CONTACT_TO
} from "./store-helpers.js";

(function () {
  // Grab elements and update dynamic year text.
  const appEl = document.getElementById("app");
  const navLinks = Array.from(document.querySelectorAll("[data-nav-key]"));
  const yearEls = Array.from(document.querySelectorAll("[data-year]"));
  yearEls.forEach((el) => (el.textContent = String(new Date().getFullYear())));

  // Compute the basePath for GitHub Pages project sites and initialise the router.
  let basePath = detectBasePath();
  const routerInfo = initRouter({
    basePath,
    rewriteRoot: document,
    onNavigate: render
  });
  if (routerInfo && typeof routerInfo.basePath === "string") {
    basePath = routerInfo.basePath;
  }

  // Helper to build asset URLs relative to the basePath.
  function assetHref(assetPath) {
    if (!assetPath) return "";
    const s = String(assetPath);
    if (s.startsWith("http://") || s.startsWith("https://")) return s;
    let p = s;
    if (!p.startsWith("/")) p = "/" + p;
    return `${basePath}${p}`;
  }

  let renderToken = 0;

  // Render the appropriate view for the given app path.
  async function render(appPath) {
    const token = ++renderToken;
    const p = normalizeAppPath(appPath);
    // Update active nav state.
    setActiveNav(p, navLinks);

    // Match the route using injected dependencies (views).
    const route = matchRoute(p, {
      AGE_GROUPS,
      SKILLS,
      viewHome,
      viewProfile,
      viewContact,
      viewFavourites,
      viewGames,
      viewTests,
      viewResourcesIndex,
      viewAge,
      viewSkillAsync,
      viewResourceDetailAsync,
      viewTestDetailAsync,
      viewNotFound
    });

    // Show a quick loading state for async routes.
    const isPromise = route && route.view && typeof route.view.then === "function";
    if (isPromise) {
      document.title = "Loading… — UEAH";
      appEl.innerHTML = loadingViewHtml();
      rewriteNavHrefs(appEl, basePath);
    }

    let view;
    try {
      view = await route.view;
    } catch (err) {
      view = viewError("Something went wrong while loading this page.", err).view;
    }

    // If a navigation happened while loading, abort.
    if (token !== renderToken) return;

    document.title = view.title;
    appEl.innerHTML = view.html;

    // Rewrite internal links in newly rendered content to include basePath.
    rewriteNavHrefs(appEl, basePath);

    // Call afterRender if provided.
    if (view && typeof view.afterRender === "function") {
      try {
        view.afterRender();
      } catch (_) {}
    }

    // Move focus to main and first heading for accessibility.
    const main = document.getElementById("main");
    if (main) main.focus({ preventScroll: true });
    const h1 = appEl.querySelector("h1");
    if (h1) {
      h1.setAttribute("tabindex", "-1");
      h1.focus({ preventScroll: true });
      h1.removeAttribute("tabindex");
    }
  }

  // -----------------------------
  // Shared view for loading state
  // -----------------------------
  function loadingViewHtml() {
    return `
      <section class="page-top">
        ${breadcrumbs([{ label: "Home", href: hrefFor("/", basePath) }, { label: "Loading…" }])}
        <h1 class="page-title">Loading…</h1>
        <p class="page-subtitle">Please wait a moment.</p>
      </section>
    `;
  }

  // -----------------------------
  // Error view
  // -----------------------------
  function viewError(message, err) {
    const title = "Error — UEAH";
    const breadcrumb = breadcrumbs([
      { label: "Home", href: hrefFor("/", basePath) },
      { label: "Error" }
    ]);
    const detail = err ? `<p class="muted" style="margin-top:10px"><code>${escapeHtml(String(err))}</code></p>` : "";
    const html = `
      <section class="page-top">
        ${breadcrumb}
        <h1 class="page-title">Error</h1>
        <p class="page-subtitle">${escapeHtml(message || "An error occurred.")}</p>
        ${detail}
        <div class="actions">
          <a class="btn btn--primary" href="${hrefFor("/", basePath)}" data-nav>Home</a>
          <a class="btn" href="${hrefFor("/resources", basePath)}" data-nav>Resources</a>
        </div>
      </section>
    `;
    return { view: { title, html } };
  }

  function viewStoreMissing() {
    const title = "Resources unavailable — UEAH";
    const breadcrumb = breadcrumbs([
      { label: "Home", href: hrefFor("/", basePath) },
      { label: "Resources" }
    ]);
    const html = `
      <section class="page-top">
        ${breadcrumb}
        <h1 class="page-title">Resources unavailable</h1>
        <p class="page-subtitle">The resources store script is not loaded.</p>
        <div class="note">
          <strong>Fix:</strong> Ensure <code>assets/js/resources-store.js</code> is loaded before <code>assets/js/app.js</code>.
        </div>
        <div class="actions">
          <a class="btn btn--primary" href="${hrefFor("/", basePath)}" data-nav>Home</a>
        </div>
      </section>
    `;
    return { view: { title, html } };
  }

  function viewTestsStoreMissing() {
    const title = "Tests unavailable — UEAH";
    const breadcrumb = breadcrumbs([
      { label: "Home", href: hrefFor("/", basePath) },
      { label: "Tests" }
    ]);
    const html = `
      <section class="page-top">
        ${breadcrumb}
        <h1 class="page-title">Tests unavailable</h1>
        <p class="page-subtitle">The tests store script is not loaded.</p>
        <div class="note">
          <strong>Fix:</strong> Ensure <code>assets/js/tests-store.js</code> (and your tests data files) are loaded before <code>assets/js/app.js</code>.
        </div>
        <div class="actions">
          <a class="btn btn--primary" href="${hrefFor("/", basePath)}" data-nav>Home</a>
          <a class="btn" href="${hrefFor("/resources", basePath)}" data-nav>Resources</a>
        </div>
      </section>
    `;
    return { view: { title, html } };
  }

  // -----------------------------
  // Home
  // -----------------------------
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
            href: hrefFor("/resources", basePath),
            title: "Resources",
            text: "Improve a skill",
            icon: iconLeaf(),
            primary: true,
            ctaText: "",
            glow: "green"
          })}

          ${card({
            href: hrefFor("/games", basePath),
            title: "Games",
            text: "Learn with fun",
            icon: iconGamepad(),
            ctaText: "",
            glow: "yellow"
          })}

          ${card({
            href: hrefFor("/tests", basePath),
            title: "Tests",
            text: "Test your skills",
            icon: iconClipboard(),
            ctaText: "",
            glow: "blue"
          })}

          ${card({
            href: hrefFor("/profile", basePath),
            title: "Profile",
            text: "Save IELS info",
            icon: iconUser(),
            ctaText: "",
            glow: "orange"
          })}

          ${card({
            href: hrefFor("/favourites", basePath),
            title: "Favourites",
            text: "Save your favourites",
            icon: iconHeart(),
            ctaText: "",
            glow: "pink"
          })}

          ${card({
            href: hrefFor("/contact", basePath),
            title: "Contact",
            text: "Send a message",
            icon: iconMail(),
            ctaText: "",
            glow: "purple"
          })}
        </div>
      </section>
    `;
    return { view: { title, html } };
  }

  // -----------------------------
  // Profile
  // -----------------------------
  function viewProfile() {
    const title = "Profile — UEAH";
    const breadcrumb = breadcrumbs([
      { label: "Home", href: hrefFor("/", basePath) },
      { label: "Profile" }
    ]);

    const html = `
      <section class="page-top">
        ${breadcrumb}
        <h1 class="page-title">Profile</h1>
        <p class="page-subtitle">Saved on this device.</p>

        <div class="detail-card" role="region" aria-label="Profile form">
          <form id="profile-form" novalidate>
            <div class="detail-section">
              <h2>Email</h2>
              <p class="muted" style="margin-bottom:10px">Used for score tracking and contact.</p>
              <input id="profile-email" name="email" type="email" autocomplete="email" inputmode="email"
                style="width:100%; padding:12px 14px; border-radius:14px; border:1px solid var(--border); background: var(--surface2); color: var(--text);"
                placeholder="name@example.com" />
            </div>

            <div class="detail-section">
              <h2>Display name</h2>
              <input id="profile-name" name="name" type="text" autocomplete="name"
                style="width:100%; padding:12px 14px; border-radius:14px; border:1px solid var(--border); background: var(--surface2); color: var(--text);"
                placeholder="Optional" />
            </div>

            <div class="detail-section">
              <h2>Target IELS score</h2>
              <input id="profile-target" name="targetScore" type="number" inputmode="decimal" min="0" max="9" step="0.5"
                style="width:100%; padding:12px 14px; border-radius:14px; border:1px solid var(--border); background: var(--surface2); color: var(--text);"
                placeholder="Optional (e.g., 6.5)" />
            </div>

            <div class="actions">
              <button class="btn btn--primary" type="submit">Save</button>
              <button class="btn" type="button" id="profile-clear">Clear</button>
              <a class="btn" href="${hrefFor("/", basePath)}" data-nav>Home</a>
            </div>

            <p id="profile-status" class="muted" style="margin:12px 0 0"></p>
          </form>
        </div>
      </section>
    `;

    const afterRender = function () {
      const form = document.getElementById("profile-form");
      const emailEl = document.getElementById("profile-email");
      const nameEl = document.getElementById("profile-name");
      const targetEl = document.getElementById("profile-target");
      const clearBtn = document.getElementById("profile-clear");
      const statusEl = document.getElementById("profile-status");

      if (!form || !emailEl || !nameEl || !targetEl || !clearBtn || !statusEl) return;

      const existing = profileGet() || {};
      emailEl.value = existing.email || "";
      nameEl.value = existing.name || "";
      targetEl.value = typeof existing.targetScore === "number" ? String(existing.targetScore) : existing.targetScore || "";

      function setStatus(msg) {
        statusEl.textContent = msg || "";
      }

      form.addEventListener("submit", (e) => {
        e.preventDefault();

        const email = String(emailEl.value || "").trim();
        const name = String(nameEl.value || "").trim();
        const targetRaw = String(targetEl.value || "").trim();

        let targetScore = null;
        if (targetRaw) {
          const n = Number(targetRaw);
          targetScore = Number.isFinite(n) ? n : null;
        }

        const data = { email, name, targetScore };

        const ok = profileSet(data);
        setStatus(ok ? "Saved." : "Could not save on this device.");
      });

      clearBtn.addEventListener("click", () => {
        const ok = profileClear();
        emailEl.value = "";
        nameEl.value = "";
        targetEl.value = "";
        setStatus(ok ? "Cleared." : "Could not clear on this device.");
      });
    };

    return { view: { title, html, afterRender } };
  }

  // -----------------------------
  // Contact
  // -----------------------------
  function viewContact() {
    const title = "Contact — UEAH";
    const breadcrumb = breadcrumbs([
      { label: "Home", href: hrefFor("/", basePath) },
      { label: "Contact" }
    ]);

    const html = `
      <section class="page-top">
        ${breadcrumb}
        <h1 class="page-title">Contact</h1>
        <p class="page-subtitle">Send a message to <span class="muted">${escapeHtml(CONTACT_TO)}</span>.</p>

        <div class="detail-card" role="region" aria-label="Contact form">
          <form id="contact-form" novalidate>
            <div class="detail-section">
              <label class="label" for="contact-from">Your email (optional)</label>
              <input id="contact-from" name="fromEmail" type="email" autocomplete="email" inputmode="email"
                style="width:100%; padding:12px 14px; border-radius:14px; border:1px solid var(--border); background: var(--surface2); color: var(--text);"
                placeholder="name@example.com" aria-describedby="contact-from-error" />
              <div class="field-error" id="contact-from-error" aria-live="polite"></div>
            </div>

            <div class="detail-section">
              <label class="label" for="contact-subject">Subject (optional)</label>
              <input id="contact-subject" name="subject" type="text"
                style="width:100%; padding:12px 14px; border-radius:14px; border:1px solid var(--border); background: var(--surface2); color: var(--text);"
                placeholder="What is this about?" aria-describedby="contact-subject-error" />
              <div class="field-error" id="contact-subject-error" aria-live="polite"></div>
            </div>

            <div class="detail-section">
              <label class="label" for="contact-message">Message</label>
              <textarea id="contact-message" name="message" rows="6" required
                style="width:100%; padding:12px 14px; border-radius:14px; border:1px solid var(--border); background: var(--surface2); color: var(--text); resize:vertical;"
                placeholder="Write your message..." aria-describedby="contact-message-error"></textarea>
              <div class="field-error" id="contact-message-error" aria-live="polite"></div>
              <p class="muted" style="margin:10px 0 0">If email sending isn’t configured yet, this will open your email app.</p>
            </div>

            <div class="actions">
              <button class="btn btn--primary" type="submit">Send</button>
              <a class="btn" href="${hrefFor("/", basePath)}" data-nav>Home</a>
            </div>

            <p id="contact-status" class="muted" style="margin:12px 0 0" aria-live="polite"></p>
          </form>
        </div>
      </section>
    `;

    const afterRender = function () {
      const form = document.getElementById("contact-form");
      if (!form) return;
      const fromEl = document.getElementById("contact-from");
      const subjectEl = document.getElementById("contact-subject");
      const messageEl = document.getElementById("contact-message");
      const statusEl = document.getElementById("contact-status");
      const errFrom = document.getElementById("contact-from-error");
      const errSubject = document.getElementById("contact-subject-error");
      const errMessage = document.getElementById("contact-message-error");

      // Prefill the email field from the profile store if available
      const prof = profileGet() || {};
      if (prof.email && fromEl && !fromEl.value) fromEl.value = String(prof.email);

      function clearErrors() {
        [fromEl, subjectEl, messageEl].forEach((el) => {
          if (el) el.removeAttribute("aria-invalid");
        });
        [errFrom, errSubject, errMessage].forEach((errEl) => {
          if (errEl) errEl.textContent = "";
        });
        if (statusEl) statusEl.textContent = "";
      }

      function showError(el, errEl, message) {
        if (!el || !errEl) return;
        el.setAttribute("aria-invalid", "true");
        errEl.textContent = message;
      }

      function validate() {
        let valid = true;
        const emailVal = fromEl ? String(fromEl.value || "").trim() : "";
        if (emailVal) {
          const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal);
          if (!emailOk) {
            showError(fromEl, errFrom, "Please enter a valid email address.");
            valid = false;
          }
        }
        const subjVal = subjectEl ? String(subjectEl.value || "") : "";
        if (subjVal.length > 140) {
          showError(subjectEl, errSubject, "Subject is too long (max 140 characters).");
          valid = false;
        }
        const msgVal = messageEl ? String(messageEl.value || "").trim() : "";
        if (!msgVal) {
          showError(messageEl, errMessage, "Please write a message.");
          valid = false;
        } else if (msgVal.length > 4000) {
          showError(messageEl, errMessage, "Message is too long (max 4000 characters).");
          valid = false;
        }
        return valid;
      }

      form.addEventListener("submit", (e) => {
        e.preventDefault();
        clearErrors();
        const ok = validate();
        if (!ok) {
          const firstInvalid = [fromEl, subjectEl, messageEl].find(
            (el) => el && el.hasAttribute("aria-invalid")
          );
          if (firstInvalid && typeof firstInvalid.focus === "function") firstInvalid.focus();
          if (statusEl) statusEl.textContent = "Please fix the highlighted fields.";
          return;
        }
        const fromEmail = String((fromEl && fromEl.value) || "").trim();
        const subject = String((subjectEl && subjectEl.value) || "").trim() || "UEAH Contact";
        const message = String((messageEl && messageEl.value) || "").trim();
        try {
          contactSend({ fromEmail, subject, message });
          if (statusEl) statusEl.textContent = "Opening email…";
        } catch (_) {
          if (statusEl) statusEl.textContent = "Could not send from this page.";
        }
      });

      [
        [fromEl, errFrom],
        [subjectEl, errSubject],
        [messageEl, errMessage]
      ].forEach(([el, errEl]) => {
        if (!el) return;
        el.addEventListener("input", () => {
          el.removeAttribute("aria-invalid");
          if (errEl) errEl.textContent = "";
          if (statusEl) statusEl.textContent = "";
        });
      });
    };

    return { view: { title, html, afterRender } };
  }

  // -----------------------------
  // Favourites
  // -----------------------------
  function viewFavourites() {
    const title = "Favourites — UEAH";
    const breadcrumb = breadcrumbs([
      { label: "Home", href: hrefFor("/", basePath) },
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
          <a class="btn btn--primary" href="${hrefFor("/", basePath)}" data-nav>Home</a>
          <a class="btn" href="${hrefFor("/resources", basePath)}" data-nav>Resources</a>
        </div>
      </section>
    `;
    return { view: { title, html } };
  }

  // -----------------------------
  // Resources index
  // -----------------------------
  function viewResourcesIndex() {
    const title = "Resources — UEAH";
    const breadcrumb = breadcrumbs([
      { label: "Home", href: hrefFor("/", basePath) },
      { label: "Resources" }
    ]);

    const glowByAge = {
      "0-3": "green",
      "4-7": "yellow",
      "8-10": "red",
      "11-12": "blue",
      "13-18": "pink"
    };

    const cardsHtml = AGE_GROUPS.map((age) =>
      card({
        href: hrefFor(`/resources/${age}`, basePath),
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
          ${cardsHtml}
        </div>

        <div class="actions">
          <a class="btn" href="${hrefFor("/", basePath)}" data-nav>← Back to Home</a>
        </div>
      </section>
    `;
    return { view: { title, html } };
  }

  // -----------------------------
  // Games placeholder
  // -----------------------------
  function viewGames() {
    const title = "Games — UEAH";
    const breadcrumb = breadcrumbs([
      { label: "Home", href: hrefFor("/", basePath) },
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
          <a class="btn btn--primary" href="${hrefFor("/", basePath)}" data-nav>Home</a>
          <a class="btn" href="${hrefFor("/resources", basePath)}" data-nav>Resources</a>
        </div>
      </section>
    `;
    return { view: { title, html } };
  }

  // -----------------------------
  // Tests
  // -----------------------------
  function viewTests() {
    // If tests store is not loaded, show missing store message.
    if (!testsGetAll || !testsGetTest) {
      return viewTestsStoreMissing();
    }

    const title = "Tests — UEAH";
    const breadcrumb = breadcrumbs([
      { label: "Home", href: hrefFor("/", basePath) },
      { label: "Tests" }
    ]);

    const tests = testsGetAll();
    const hasTests = tests.length > 0;

    const cardsHtml = hasTests
      ? tests
          .map((t) =>
            card({
              href: hrefFor(`/tests/${t.slug}`, basePath),
              title: t.title || "Test",
              text: t.subtitle || "Test your ability",
              icon: iconSkill(t.skill),
              ctaText: "",
              glow: "iels"
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
            ? `<div class="card-grid" role="list" aria-label="Tests">${cardsHtml}</div>`
            : `
              <div class="note">
                <strong>Coming soon:</strong> tests will appear here.
              </div>
            `
        }

        <div class="actions">
          <a class="btn" href="${hrefFor("/", basePath)}" data-nav>← Back to Home</a>
          <a class="btn" href="${hrefFor("/resources", basePath)}" data-nav>Resources</a>
        </div>
      </section>
    `;
    return { view: { title, html } };
  }

  // -----------------------------
  // Test details
  // -----------------------------
  async function viewTestDetailAsync(slug) {
    // If tests store isn't loaded, show missing store message.
    if (!testsGetTest || !testsHasRunner) return viewTestsStoreMissing();

    const test = testsGetTest(slug);
    if (!test) return viewNotFound(`/tests/${slug}`);

    // Lazy-load the test implementation if needed.
    try {
      await ensureTestRunnerLoaded(test, { basePath, assetHref });
    } catch (err) {
      return viewError("Could not load this test module.", err);
    }

    const title = `${test.title || "Test"} — UEAH`;
    const breadcrumb = breadcrumbs([
      { label: "Home", href: hrefFor("/", basePath) },
      { label: "Tests", href: hrefFor("/tests", basePath) },
      { label: test.title || "Test" }
    ]);

    const ctx = {
      slug: test.slug,
      test,
      hrefFor: (p) => hrefFor(p, basePath),
      assetHref,
      basePath
    };

    // Render via store runner if present.
    let runnerOut = null;
    if (typeof window.UEAH_TESTS_STORE === "object") {
      const TESTS_STORE = window.UEAH_TESTS_STORE;
      if (typeof TESTS_STORE.render === "function") {
        runnerOut = TESTS_STORE.render(test.slug, ctx);
      } else if (typeof TESTS_STORE.getRunner === "function") {
        const r = TESTS_STORE.getRunner(test.slug);
        if (typeof r === "function") runnerOut = { html: r(ctx), afterRender: null };
        else if (r && typeof r.render === "function") runnerOut = { html: r.render(ctx), afterRender: r.afterRender || null };
      }
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
            <a class="btn" href="${hrefFor("/tests", basePath)}" data-nav>← Back</a>
          </div>
        </div>

        <div class="actions">
          <a class="btn" href="${hrefFor("/tests", basePath)}" data-nav>← Back to Tests</a>
          <a class="btn" href="${hrefFor("/resources", basePath)}" data-nav>Resources</a>
          <a class="btn btn--primary" href="${hrefFor("/", basePath)}" data-nav>Home</a>
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

  // -----------------------------
  // View by age group
  // -----------------------------
  function viewAge(age) {
    const title = `${age} Resources — UEAH`;
    const breadcrumb = breadcrumbs([
      { label: "Home", href: hrefFor("/", basePath) },
      { label: "Resources", href: hrefFor("/resources", basePath) },
      { label: age }
    ]);

    const glowBySkill = {
      reading: "blue",
      listening: "green",
      writing: "yellow",
      speaking: "red"
    };

    const cardsHtml = SKILLS.map((skill) =>
      card({
        href: hrefFor(`/resources/${age}/${skill}`, basePath),
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
          ${cardsHtml}
        </div>

        <div class="actions">
          <a class="btn" href="${hrefFor("/resources", basePath)}" data-nav>← Back to Age Groups</a>
          <a class="btn btn--primary" href="${hrefFor("/", basePath)}" data-nav>Home</a>
        </div>
      </section>
    `;
    return { view: { title, html } };
  }

  // -----------------------------
  // View by skill
  // -----------------------------
  async function viewSkillAsync(age, skill) {
    // If resources store isn't loaded, show missing store message.
    if (!ensureAgeLoaded || !storeGetPack || !storeGetResources) return viewStoreMissing();

    // Ensure the age group's resources are loaded.
    await ensureAgeLoaded(age, { basePath });

    const title = `${capitalize(skill)} (${age}) — UEAH`;
    const breadcrumb = breadcrumbs([
      { label: "Home", href: hrefFor("/", basePath) },
      { label: "Resources", href: hrefFor("/resources", basePath) },
      { label: age, href: hrefFor(`/resources/${age}`, basePath) },
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
              const detailHref = hrefFor(detailPath, basePath);
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
                  <a class="btn btn--primary" href="${hrefFor(
                    `/resources/${age}/${skill}/${best.slug}`,
                    basePath
                  )}" data-nav>Open Best Set →</a>
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
          <a class="btn" href="${hrefFor(`/resources/${age}`, basePath)}" data-nav>← Back to Skills</a>
          <a class="btn" href="${hrefFor("/resources", basePath)}" data-nav>Age Groups</a>
          <a class="btn btn--primary" href="${hrefFor("/", basePath)}" data-nav>Home</a>
        </div>
      </section>
    `;
    return { view: { title, html } };
  }

  // -----------------------------
  // Resource detail view
  // -----------------------------
  async function viewResourceDetailAsync(age, skill, slug) {
    // If resources store isn't loaded, show missing store message.
    if (!storeGetResource) return viewStoreMissing();

    await ensureAgeLoaded(age, { basePath });

    const resource = storeGetResource(age, skill, slug);
    if (!resource) return viewNotFound(`/resources/${age}/${skill}/${slug}`);

    const title = `${resource.title} — UEAH`;
    const breadcrumb = breadcrumbs([
      { label: "Home", href: hrefFor("/", basePath) },
      { label: "Resources", href: hrefFor("/resources", basePath) },
      { label: age, href: hrefFor(`/resources/${age}`, basePath) },
      { label: capitalize(skill), href: hrefFor(`/resources/${age}/${skill}`, basePath) },
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
                const internalHref = hrefFor(`/resources/${age}/${skill}/${r.slug}`, basePath);
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
            <a class="btn" href="${hrefFor(`/resources/${age}/${skill}`, basePath)}" data-nav>← Back</a>
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
          <a class="btn" href="${hrefFor(`/resources/${age}/${skill}`, basePath)}" data-nav>← Back to ${capitalize(skill)}</a>
          <a class="btn" href="${hrefFor(`/resources/${age}`, basePath)}" data-nav>Skills</a>
          <a class="btn" href="${hrefFor("/resources", basePath)}" data-nav>Age Groups</a>
        </div>
      </section>
    `;

    return { view: { title, html } };
  }

  // -----------------------------
  // Not found view
  // -----------------------------
  function viewNotFound(appPath) {
    const title = "Not Found — UEAH";
    const breadcrumb = breadcrumbs([
      { label: "Home", href: hrefFor("/", basePath) },
      { label: "Not Found" }
    ]);

    const html = `
      <section class="page-top">
        ${breadcrumb}
        <h1 class="page-title">Page not found</h1>
        <p class="page-subtitle">We couldn’t find: <code>${escapeHtml(appPath)}</code></p>

        <div class="actions">
          <a class="btn btn--primary" href="${hrefFor("/", basePath)}" data-nav>Go Home</a>
          <a class="btn" href="${hrefFor("/resources", basePath)}" data-nav>Resources</a>
        </div>
      </section>
    `;
    return { view: { title, html } };
  }

  // -----------------------------
  // Detail rendering helpers
  // -----------------------------
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
})();