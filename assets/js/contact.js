/* assets/js/contact.js
   UEAH Contact helpers (Google Forms)

   What this does:
   - Opens a Google Form in a new tab (works on GitHub Pages / no backend)
   - Exposes a stable API used by the SPA:
       window.UEAH_CONTACT.send(payload)

   Supported payload shapes (backward compatible):
   1) New (recommended):
      { category, name, subject, message }
   2) Older (from store-helpers.js fallback):
      { repo, name, subject, message }
   3) Legacy mailto-style callers (accepted but ignored fields):
      { to, fromEmail, subject, message }

   Configuration:
   - assets/js/contact-config.js should define:
       window.UEAH_CONTACT_FORM = { formUrl, entry: { category, name, subject, message, pageUrl, userAgent } }

   Notes:
   - If entry IDs are not configured yet, this still opens the form normally.
   - Prefill happens via querystring; very long messages may be truncated for URL safety.
*/

(function () {
  "use strict";

  // Public form URL (safe to hardcode as fallback if config fails to load)
  const FALLBACK_FORM_URL =
    "https://docs.google.com/forms/d/e/1FAIpQLSdPI4D3ctNZTcGZHqGGWkjBOiEgpN5R8WWd6ON4fml-PifvMw/viewform";

  const MAX_CATEGORY = 40;
  const MAX_NAME = 80;
  const MAX_SUBJECT = 140;
  const MAX_MESSAGE = 4000;

  // URL prefill safety (querystring length limits vary by browser)
  const MAX_PREFILL_MESSAGE = 1500;
  const MAX_PREFILL_SUBJECT = 180;
  const MAX_PREFILL_NAME = 120;
  const MAX_PREFILL_META = 800;

  function sanitizeText(value, maxLen) {
    const s = String(value || "").trim();
    if (!maxLen) return s;
    return s.length > maxLen ? s.slice(0, maxLen) : s;
  }

  function safePageUrl() {
    try {
      return typeof window !== "undefined" && window.location ? String(window.location.href || "") : "";
    } catch (_) {
      return "";
    }
  }

  function safeUserAgent() {
    try {
      return typeof navigator !== "undefined" ? String(navigator.userAgent || "") : "";
    } catch (_) {
      return "";
    }
  }

  function getConfig() {
    const cfg = typeof window !== "undefined" ? window.UEAH_CONTACT_FORM : null;
    if (!cfg || typeof cfg !== "object") {
      return {
        formUrl: FALLBACK_FORM_URL,
        entry: {},
      };
    }
    const formUrl = String(cfg.formUrl || "").trim() || FALLBACK_FORM_URL;
    const entry = cfg.entry && typeof cfg.entry === "object" ? cfg.entry : {};
    return { formUrl, entry };
  }

  function normalizeFormUrl(url) {
    const s = String(url || "").trim();
    if (!s) return "";
    try {
      const u = new URL(s);
      u.search = "";
      u.hash = "";
      return u.toString();
    } catch (_) {
      return s;
    }
  }

  function entryKey(v) {
    const s = String(v || "").trim();
    if (!s) return "";
    if (s.startsWith("entry.")) return s;
    if (/^\d+$/.test(s)) return `entry.${s}`;
    return s;
  }

  function hasAnyEntryIds(entry) {
    if (!entry || typeof entry !== "object") return false;
    return Object.values(entry).some((v) => !!String(v || "").trim());
  }

  function inferCategory(category, subject) {
    const c = String(category || "").trim();
    if (c) return c;

    const s = String(subject || "").trim().toLowerCase();
    if (s.startsWith("idea:")) return "Idea";
    if (s.startsWith("bug:")) return "Bug";
    if (s.startsWith("question:")) return "Question";
    return "";
  }

  function composeMessageWithContext(message, { pageUrl, userAgent, name }) {
    const msg = String(message || "").trim();
    const lines = [];
    lines.push(msg || "-");

    const meta = [];
    if (name) meta.push(`Name: ${name}`);
    if (pageUrl) meta.push(`Page: ${pageUrl}`);
    if (userAgent) meta.push(`Device/Browser: ${userAgent}`);

    if (meta.length) {
      lines.push("");
      lines.push("---");
      meta.forEach((m) => lines.push(m));
    }

    return lines.join("\n");
  }

  function buildGoogleFormUrl(payload) {
    const { formUrl, entry } = getConfig();
    const base = normalizeFormUrl(formUrl);
    if (!base) return "";

    let u;
    try {
      u = new URL(base);
    } catch (_) {
      return base;
    }

    const wantsPrefill = hasAnyEntryIds(entry);

    // If we can prefill, use pp_url; otherwise keep a clean open.
    // (Some shared links use usp=dialog; not required.)
    if (wantsPrefill) u.searchParams.set("usp", "pp_url");
    else u.searchParams.set("usp", "dialog");

    // Backward-compatible payload parsing
    const name = sanitizeText(payload.name, MAX_NAME);
    const subject = sanitizeText(payload.subject, MAX_SUBJECT);
    const category = sanitizeText(inferCategory(payload.category, subject), MAX_CATEGORY);

    // "message" is the canonical field across all payload shapes
    const rawMessage = sanitizeText(payload.message, MAX_MESSAGE);

    const pageUrl = sanitizeText(payload.pageUrl || safePageUrl(), MAX_PREFILL_META);
    const userAgent = sanitizeText(payload.userAgent || safeUserAgent(), MAX_PREFILL_META);

    // If the form doesn't have separate fields mapped for page/userAgent,
    // include context inside the message so you still receive it.
    const hasPageField = !!entryKey(entry.pageUrl);
    const hasUaField = !!entryKey(entry.userAgent);

    let message = rawMessage;
    if (!hasPageField || !hasUaField) {
      message = composeMessageWithContext(rawMessage, {
        pageUrl: hasPageField ? "" : pageUrl,
        userAgent: hasUaField ? "" : userAgent,
        name: name || "",
      });
    }

    // Prefill caps (avoid huge URLs)
    const prefillName = sanitizeText(name, MAX_PREFILL_NAME);
    const prefillSubject = sanitizeText(subject, MAX_PREFILL_SUBJECT);
    const prefillMessage = sanitizeText(message, MAX_PREFILL_MESSAGE);

    function setIf(key, value) {
      const k = entryKey(key);
      const v = String(value || "").trim();
      if (!k || !v) return;
      u.searchParams.set(k, v);
    }

    // Optional prefill fields (only used if entry IDs are configured)
    setIf(entry.category, category);
    setIf(entry.name, prefillName);
    setIf(entry.subject, prefillSubject);
    setIf(entry.message, prefillMessage);
    setIf(entry.pageUrl, pageUrl);
    setIf(entry.userAgent, userAgent);

    return u.toString();
  }

  function openNewTab(url) {
    try {
      const w = window.open(url, "_blank", "noopener,noreferrer");
      return !!w;
    } catch (_) {
      return false;
    }
  }

  /**
   * Minimal validation for form UX safety.
   * (Your SPA view already validates; this protects direct callers.)
   */
  function validateSend({ subject, message }) {
    const errors = {};
    const subj = String(subject || "").trim();
    const msg = String(message || "").trim();

    if (!subj) errors.subject = "Subject is required.";
    else if (subj.length > MAX_SUBJECT) errors.subject = `Subject is too long (max ${MAX_SUBJECT} characters).`;

    if (!msg) errors.message = "Message is required.";
    else if (msg.length > MAX_MESSAGE) errors.message = `Message is too long (max ${MAX_MESSAGE} characters).`;

    return errors;
  }

  /**
   * Primary API expected by the SPA (store-helpers.js / views/contact.js).
   * Opens Google Forms in a new tab.
   *
   * Returns: { ok, url }
   */
  function send(payload = {}) {
    const data = payload && typeof payload === "object" ? payload : {};

    // Backward compatibility: some callers pass { fromEmail } or { repo }.
    // We ignore those fields (no email required, no GitHub needed).
    const subject = sanitizeText(data.subject, MAX_SUBJECT);
    const message = sanitizeText(data.message, MAX_MESSAGE);

    const errors = validateSend({ subject, message });
    if (Object.keys(errors).length) {
      const err = new Error("CONTACT_VALIDATION_ERROR");
      err.code = "CONTACT_VALIDATION_ERROR";
      err.details = errors;
      throw err;
    }

    const { formUrl } = getConfig();
    const base = normalizeFormUrl(formUrl) || FALLBACK_FORM_URL;

    const url = buildGoogleFormUrl({
      category: data.category,
      name: data.name,
      subject,
      message,
      pageUrl: data.pageUrl,
      userAgent: data.userAgent,
    }) || base;

    const ok = openNewTab(url);
    if (!ok) {
      // Do not force navigation away from the SPA; return url for fallback link UI.
      return { ok: false, url };
    }

    return { ok: true, url };
  }

  // ---------------------------------------------------------------------------
  // Legacy helpers kept for backward compatibility (not used by the SPA today)
  // ---------------------------------------------------------------------------

  function setFieldError(fieldEl, message) {
    if (!fieldEl) return;
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
    const email = sanitizeText(root.querySelector("[name='email']")?.value, 120);
    const subject = sanitizeText(root.querySelector("[name='subject']")?.value, MAX_SUBJECT);
    const message = sanitizeText(root.querySelector("[name='message']")?.value, MAX_MESSAGE);

    // If someone uses the legacy email field, fold it into the message (form has no email field)
    const mergedMessage = email
      ? `Email: ${email}\n\n${message || ""}`.trim()
      : message;

    return { name, subject, message: mergedMessage };
  }

  function clearErrors(root) {
    const fields = root.querySelectorAll("[data-field] input, [data-field] textarea");
    fields.forEach((f) => setFieldError(f, ""));
  }

  /**
   * Optional: attach behavior to a standalone form markup (legacy).
   * Opens Google Forms and returns URL for fallback.
   */
  function attach(root, opts) {
    if (!root) return () => {};

    const form = root.querySelector("[data-contact-form]");
    if (!form) return () => {};

    function onSubmit(e) {
      e.preventDefault();
      clearErrors(root);
      setStatus(root, "", "");

      const data = readForm(form);
      const errors = validateSend({ subject: data.subject, message: data.message });

      const nameEl = form.querySelector("[name='name']");
      const subjectEl = form.querySelector("[name='subject']");
      const messageEl = form.querySelector("[name='message']");

      setFieldError(subjectEl, errors.subject || "");
      setFieldError(messageEl, errors.message || "");

      const hasErrors = Object.keys(errors).length > 0;
      if (hasErrors) {
        setStatus(root, "Please fix the highlighted fields.", "error");
        const first = (errors.subject && subjectEl) || (errors.message && messageEl) || null;
        if (first && typeof first.focus === "function") first.focus();
        return;
      }

      setStatus(root, "Opening the form…", "info");

      let res;
      try {
        res = send({
          category: (opts && opts.category) || "",
          name: data.name,
          subject: data.subject,
          message: data.message,
        });
      } catch (_) {
        res = { ok: false, url: normalizeFormUrl(getConfig().formUrl) || FALLBACK_FORM_URL };
      }

      if (typeof opts?.onSent === "function") {
        try {
          opts.onSent({ ...data, url: res.url, mode: "google-form" });
        } catch (_) {}
      }
    }

    function onInput(e) {
      const el = e.target;
      if (!(el instanceof HTMLElement)) return;
      if (el.matches("[name='name'], [name='email'], [name='message'], [name='subject']")) {
        setFieldError(el, "");
      }
    }

    form.addEventListener("submit", onSubmit);
    form.addEventListener("input", onInput);

    return function detach() {
      form.removeEventListener("submit", onSubmit);
      form.removeEventListener("input", onInput);
    };
  }

  function renderContactFormHtml({ title, subtitle } = {}) {
    const safeTitle = escapeHtml(title || "Contact");
    const safeSubtitle = escapeHtml(subtitle || "Send feedback via our contact form.");

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
                <label class="label" for="contact-subject">Subject</label>
                <input class="input" id="contact-subject" name="subject" type="text" required />
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
              This opens a Google Form in a new tab.
            </p>

            <div class="contact-status" data-contact-status aria-live="polite"></div>
          </form>
        </div>
      </section>
    `;
  }

  // Legacy utility: keep escape helpers (used by renderContactFormHtml)
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

  // Legacy utility: keep buildMailto (no default email), in case something external still uses it
  function buildMailto({ to, subject, body }) {
    const _to = String(to || "").trim();
    if (!_to) return "";
    const qs = new URLSearchParams();
    if (subject) qs.set("subject", String(subject));
    if (body) qs.set("body", String(body));
    const query = qs.toString();
    return query ? `mailto:${encodeURIComponent(_to)}?${query}` : `mailto:${encodeURIComponent(_to)}`;
  }

  // Expose
  window.UEAH_CONTACT = {
    // Primary SPA API
    send,

    // New helpers
    buildGoogleFormUrl,
    getConfig,

    // Optional/legacy helpers
    attach,
    renderContactFormHtml,
    validateSend,
    buildMailto,
  };
})();
