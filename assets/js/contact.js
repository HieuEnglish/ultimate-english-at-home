/* assets/js/contact.js
   UEAH Contact helpers (progressive enhancement)

   What this does:
   - Provides a safe, dependency-free "mailto:" sender that works on GitHub Pages (no backend)
   - Exposes a stable API used by the SPA:
       window.UEAH_CONTACT.send({ to, fromEmail, subject, message })
   - Also includes optional helpers for rendering/attaching a standalone contact form
     (kept for backward compatibility, but the SPA view can validate on its own)

   IMPORTANT:
   - GitHub Pages cannot send email directly from client-side JS without a backend.
   - This uses a mailto: fallback which opens the user's email app.
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

  function isValidEmail(email) {
    // Pragmatic check for client-side UX.
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || "").trim());
  }

  function buildMailto({ to, subject, body }) {
    const _to = (to || DEFAULT_TO || "").trim();
    const qs = new URLSearchParams();
    if (subject) qs.set("subject", subject);
    if (body) qs.set("body", body);
    const query = qs.toString();
    return query
      ? `mailto:${encodeURIComponent(_to)}?${query}`
      : `mailto:${encodeURIComponent(_to)}`;
  }

  function composeBody({ name, email, message, pageUrl }) {
    const lines = [];
    lines.push("UEAH Contact Message");
    lines.push("-------------------");
    if (name) lines.push(`Name: ${name}`);
    if (email) lines.push(`Email: ${email}`);
    if (pageUrl) lines.push(`Page: ${pageUrl}`);
    lines.push("");
    lines.push("Message:");
    lines.push(message || "-");
    lines.push("");
    lines.push(`Sent: ${new Date().toLocaleString()}`);
    return lines.join("\n");
  }

  /**
   * Validation for the helper API (send/attach).
   * The SPA view may also validate independently; this ensures safety if called directly.
   */
  function validateSend({ fromEmail, subject, message }) {
    const errors = {};
    const email = String(fromEmail || "").trim();
    const subj = String(subject || "").trim();
    const msg = String(message || "").trim();

    if (!email) errors.fromEmail = "Email is required.";
    else if (email.length > MAX_EMAIL) errors.fromEmail = `Email is too long (max ${MAX_EMAIL} characters).`;
    else if (!isValidEmail(email)) errors.fromEmail = "Please enter a valid email address.";

    if (!subj) errors.subject = "Subject is required.";
    else if (subj.length > MAX_SUBJECT) errors.subject = `Subject is too long (max ${MAX_SUBJECT} characters).`;

    if (!msg) errors.message = "Message is required.";
    else if (msg.length > MAX_MESSAGE) errors.message = `Message is too long (max ${MAX_MESSAGE} characters).`;

    return errors;
  }

  function setFieldError(fieldEl, message) {
    if (!fieldEl) return;
    // Prefer removing aria-invalid when valid; but keep "false" if you rely on it elsewhere.
    if (message) fieldEl.setAttribute("aria-invalid", "true");
    else fieldEl.removeAttribute("aria-invalid");

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

  /**
   * Primary API expected by the SPA (store-helpers.js / views/contact.js).
   * Opens a mailto link. Throws a descriptive Error if input is invalid.
   */
  function send({ to, fromEmail, subject, message } = {}) {
    const email = sanitizeText(fromEmail, MAX_EMAIL);
    const subj = sanitizeText(subject, MAX_SUBJECT);
    const msg = sanitizeText(message, MAX_MESSAGE);

    const errors = validateSend({ fromEmail: email, subject: subj, message: msg });
    if (Object.keys(errors).length) {
      const err = new Error("CONTACT_VALIDATION_ERROR");
      err.code = "CONTACT_VALIDATION_ERROR";
      err.details = errors;
      throw err;
    }

    const pageUrl = window.location && window.location.href ? window.location.href : "";
    const body = composeBody({
      name: "",
      email,
      message: msg,
      pageUrl
    });

    const href = buildMailto({
      to: String(to || DEFAULT_TO || "").trim(),
      subject: subj || "UEAH Contact",
      body
    });

    window.location.href = href;
    return true;
  }

  /**
   * Optional: attach behavior to a standalone form markup (kept for backward compatibility).
   * Note: this older form supports name/email optional; your SPA view now enforces required fields.
   */
  function attach(root, opts) {
    if (!root) return () => {};

    const options = {
      to: (opts && opts.to) || DEFAULT_TO,
      onSent: (opts && opts.onSent) || null
    };

    const form = root.querySelector("[data-contact-form]");
    if (!form) return () => {};

    const nameEl = form.querySelector("[name='name']");
    const emailEl = form.querySelector("[name='email']");
    const subjectEl = form.querySelector("[name='subject']");
    const messageEl = form.querySelector("[name='message']");

    function validateLegacy({ name, email, message, subject }) {
      const errors = {};

      // Legacy form: name/email/subject optional, but sanity check if provided
      if (name && name.length > MAX_NAME) errors.name = `Name is too long (max ${MAX_NAME} characters).`;

      if (email && email.length > MAX_EMAIL) errors.email = `Email is too long (max ${MAX_EMAIL} characters).`;
      if (email && !isValidEmail(email)) errors.email = "That email address doesn’t look valid.";

      if (subject && subject.length > MAX_SUBJECT) errors.subject = `Subject is too long (max ${MAX_SUBJECT} characters).`;

      if (!message || message.trim().length < 3) errors.message = "Please write a message.";
      if (message && message.length > MAX_MESSAGE) errors.message = `Message is too long (max ${MAX_MESSAGE} characters).`;

      return errors;
    }

    function onSubmit(e) {
      e.preventDefault();
      clearErrors(root);
      setStatus(root, "", "");

      const data = readForm(form);
      const errors = validateLegacy(data);

      setFieldError(nameEl, errors.name || "");
      setFieldError(emailEl, errors.email || "");
      setFieldError(subjectEl, errors.subject || "");
      setFieldError(messageEl, errors.message || "");

      const hasErrors = Object.keys(errors).length > 0;
      if (hasErrors) {
        setStatus(root, "Please fix the highlighted fields.", "error");
        const first =
          (errors.name && nameEl) ||
          (errors.email && emailEl) ||
          (errors.subject && subjectEl) ||
          (errors.message && messageEl) ||
          null;
        if (first && typeof first.focus === "function") first.focus();
        return;
      }

      const pageUrl = window.location.href;
      const subject = data.subject || "UEAH Contact";
      const body = composeBody({
        name: data.name,
        email: data.email,
        message: data.message,
        pageUrl
      });

      const href = buildMailto({ to: options.to, subject, body });

      setStatus(root, "Opening your email app…", "info");
      window.location.href = href;

      if (typeof options.onSent === "function") {
        try {
          options.onSent({ ...data, subject, body, to: options.to, mode: "mailto" });
        } catch (_) {}
      }
    }

    form.addEventListener("submit", onSubmit);

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
    const safeSubtitle = escapeHtml(subtitle || `Send a message to ${DEFAULT_TO}.`);

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
    // Primary SPA API
    send,

    // Optional/legacy helpers
    attach,
    renderContactFormHtml,
    buildMailto,
    composeBody,
    validateSend
  };
})();
