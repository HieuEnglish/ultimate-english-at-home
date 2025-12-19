/* assets/js/contact.js
   UEAH Contact helpers

   What this does:
   - Renders/controls a simple contact form (used by app.js "Contact" route)
   - Uses a "mailto:" fallback by default (works on GitHub Pages with no backend)
   - Optional hook points if you later add a serverless endpoint

   IMPORTANT:
   - GitHub Pages cannot send email directly from client-side JS without a backend.
   - This uses `mailto:hieuenglishapps@gmail.com` which opens the user's email app.
*/

(function () {
  "use strict";

  const DEFAULT_TO = "hieuenglishapps@gmail.com";
  const MAX_MESSAGE = 4000;
  const MAX_SUBJECT = 140;
  const MAX_NAME = 80;
  const MAX_EMAIL = 120;

  function sanitizeText(value, maxLen) {
    const s = String(value || "").trim();
    if (!maxLen) return s;
    return s.length > maxLen ? s.slice(0, maxLen) : s;
  }

  function normalizeEmail(value) {
    const s = String(value || "").trim();
    return s ? s.toLowerCase() : "";
  }

  function buildMailto({ to, subject, body }) {
    const _to = to || DEFAULT_TO;
    const qs = new URLSearchParams();
    if (subject) qs.set("subject", subject);
    if (body) qs.set("body", body);
    return `mailto:${encodeURIComponent(_to)}?${qs.toString()}`;
  }

  function composeBody({ name, email, message, pageUrl }) {
    const lines = [];
    lines.push("UEAH Contact Message");
    lines.push("-------------------");
    lines.push(`Name: ${name || "-"}`);
    lines.push(`Email: ${email || "-"}`);
    if (pageUrl) lines.push(`Page: ${pageUrl}`);
    lines.push("");
    lines.push("Message:");
    lines.push(message || "-");
    lines.push("");
    lines.push(`Sent: ${new Date().toLocaleString()}`);
    return lines.join("\n");
  }

  function validate({ name, email, message }) {
    const errors = {};

    if (!message || message.trim().length < 3) errors.message = "Please write a message.";
    if (message && message.length > MAX_MESSAGE) errors.message = `Message is too long (max ${MAX_MESSAGE} characters).`;

    // Optional fields, but basic sanity if provided
    if (name && name.length > MAX_NAME) errors.name = `Name is too long (max ${MAX_NAME} characters).`;
    if (email && email.length > MAX_EMAIL) errors.email = `Email is too long (max ${MAX_EMAIL} characters).`;

    // Minimal email check (only if user filled it)
    if (email) {
      const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if (!ok) errors.email = "That email address doesn’t look valid.";
    }

    return errors;
  }

  function setFieldError(fieldEl, message) {
    if (!fieldEl) return;
    fieldEl.setAttribute("aria-invalid", message ? "true" : "false");

    const wrap = fieldEl.closest("[data-field]");
    if (!wrap) return;
    const err = wrap.querySelector("[data-error]");
    if (err) err.textContent = message || "";
  }

  function setStatus(root, text, kind) {
    const el = root.querySelector("[data-contact-status]");
    if (!el) return;
    el.textContent = text || "";
    el.dataset.kind = kind || "";
  }

  function readForm(root) {
    const name = sanitizeText(root.querySelector("[name='name']")?.value, MAX_NAME);
    const email = normalizeEmail(sanitizeText(root.querySelector("[name='email']")?.value, MAX_EMAIL));
    const subject = sanitizeText(root.querySelector("[name='subject']")?.value, MAX_SUBJECT);
    const message = sanitizeText(root.querySelector("[name='message']")?.value, MAX_MESSAGE);

    return { name, email, subject, message };
  }

  function clearErrors(root) {
    const fields = root.querySelectorAll("[data-field] input, [data-field] textarea");
    fields.forEach((f) => setFieldError(f, ""));
  }

  function attach(root, opts) {
    if (!root) return () => {};

    const options = {
      to: (opts && opts.to) || DEFAULT_TO,
      // Optional: for future serverless
      // endpoint: (opts && opts.endpoint) || "",
      onSent: (opts && opts.onSent) || null
    };

    const form = root.querySelector("[data-contact-form]");
    if (!form) return () => {};

    const nameEl = form.querySelector("[name='name']");
    const emailEl = form.querySelector("[name='email']");
    const subjectEl = form.querySelector("[name='subject']");
    const messageEl = form.querySelector("[name='message']");

    function onSubmit(e) {
      e.preventDefault();
      clearErrors(root);
      setStatus(root, "", "");

      const data = readForm(form);
      const errors = validate(data);

      setFieldError(nameEl, errors.name || "");
      setFieldError(emailEl, errors.email || "");
      setFieldError(messageEl, errors.message || "");

      const hasErrors = Object.keys(errors).length > 0;
      if (hasErrors) {
        setStatus(root, "Please fix the highlighted fields.", "error");
        const first =
          (errors.name && nameEl) || (errors.email && emailEl) || (errors.message && messageEl) || null;
        if (first && typeof first.focus === "function") first.focus();
        return;
      }

      const pageUrl = window.location.href;
      const subject = data.subject || "UEAH Contact";
      const body = composeBody({ ...data, pageUrl });

      // Default behavior: open mail client
      const href = buildMailto({ to: options.to, subject, body });

      setStatus(root, "Opening your email app…", "info");
      window.location.href = href;

      // Let caller hook in (optional)
      if (typeof options.onSent === "function") {
        try {
          options.onSent({ ...data, subject, body, to: options.to, mode: "mailto" });
        } catch (_) {}
      }
    }

    form.addEventListener("submit", onSubmit);

    // Basic realtime clearing
    function onInput(e) {
      const el = e.target;
      if (!(el instanceof HTMLElement)) return;
      if (el.matches("[name='name'], [name='email'], [name='message'], [name='subject']")) {
        setFieldError(el, "");
      }
    }
    form.addEventListener("input", onInput);

    return function detach() {
      form.removeEventListener("submit", onSubmit);
      form.removeEventListener("input", onInput);
    };
  }

  // Optional helper for app.js to render a consistent form block
  function renderContactFormHtml({ title, subtitle } = {}) {
    const safeTitle = escapeHtml(title || "Contact");
    const safeSubtitle = escapeHtml(subtitle || "Send a message to hieuenglishapps@gmail.com.");

    return `
      <section class="page-top">
        <h1 class="page-title">${safeTitle}</h1>
        <p class="page-subtitle">${safeSubtitle}</p>

        <div class="detail-card" role="region" aria-label="Contact form">
          <form data-contact-form>
            <div class="form-grid">
              <div class="field" data-field>
                <label class="label" for="contact-name">Name (optional)</label>
                <input class="input" id="contact-name" name="name" type="text" autocomplete="name" />
                <div class="field-error" data-error aria-live="polite"></div>
              </div>

              <div class="field" data-field>
                <label class="label" for="contact-email">Email (optional)</label>
                <input class="input" id="contact-email" name="email" type="email" autocomplete="email" />
                <div class="field-error" data-error aria-live="polite"></div>
              </div>

              <div class="field" data-field style="grid-column: 1 / -1">
                <label class="label" for="contact-subject">Subject (optional)</label>
                <input class="input" id="contact-subject" name="subject" type="text" />
                <div class="field-error" data-error aria-live="polite"></div>
              </div>

              <div class="field" data-field style="grid-column: 1 / -1">
                <label class="label" for="contact-message">Message</label>
                <textarea class="textarea" id="contact-message" name="message" rows="7" required></textarea>
                <div class="field-error" data-error aria-live="polite"></div>
              </div>
            </div>

            <div class="actions">
              <button class="btn btn--primary" type="submit">Send</button>
              <a class="btn" href="${escapeAttr("/")} " data-nav>Home</a>
            </div>

            <p class="muted" style="margin-top:12px">
              This opens your email app (no backend required).
            </p>

            <div class="contact-status" data-contact-status aria-live="polite"></div>
          </form>
        </div>
      </section>
    `;
  }

  function escapeHtml(s) {
    return String(s)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }

  function escapeAttr(s) {
    return escapeHtml(String(s)).replaceAll("\n", " ");
  }

  // Expose
  window.UEAH_CONTACT = {
    attach,
    renderContactFormHtml,
    buildMailto,
    composeBody
  };
})();```
