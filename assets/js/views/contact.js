/* assets/js/views/contact.js
   Contact view for Ultimate English At Home.
   Provides an accessible form to send a message to the app owner.
*/

import { breadcrumbs, escapeHtml } from '../common.js';
import { CONTACT_TO } from '../store-helpers.js';

/**
 * Build the contact page view.
 * @param {Object} ctx - context with helpers and store functions
 * @returns {{title: string, html: string, afterRender: Function}}
 */
export function getView(ctx) {
  const { hrefFor, profileGet, contactSend } = ctx;

  const title = 'Contact — UEAH';
  const breadcrumb = breadcrumbs([
    { label: 'Home', href: hrefFor('/') },
    { label: 'Contact' },
  ]);

  const html = `
    <section class="page-top">
      ${breadcrumb}
      <h1 class="page-title">Contact</h1>
      <p class="page-subtitle">Send a message to <span class="muted">${escapeHtml(CONTACT_TO)}</span>.</p>

      <div class="detail-card" role="region" aria-label="Contact form">
        <form id="contact-form" novalidate>
          <div id="contact-error-summary" class="field-error" role="alert" aria-live="polite" style="margin: 0 0 12px; display:none;"></div>

          <div class="detail-section">
            <label class="label" for="contact-from">Your email</label>
            <p id="contact-from-hint" class="muted" style="margin:8px 0 10px;">
              We’ll use this so we can reply.
            </p>
            <input
              id="contact-from"
              name="fromEmail"
              type="email"
              autocomplete="email"
              inputmode="email"
              required
              style="width:100%; padding:12px 14px; border-radius:14px; border:1px solid var(--border); background: var(--surface2); color: var(--text);"
              placeholder="name@example.com"
              aria-describedby="contact-from-hint contact-from-error"
            />
            <div class="field-error" id="contact-from-error" aria-live="polite"></div>
          </div>

          <div class="detail-section">
            <label class="label" for="contact-subject">Subject</label>
            <p id="contact-subject-hint" class="muted" style="margin:8px 0 10px;">
              Short summary (max 140 characters).
            </p>
            <input
              id="contact-subject"
              name="subject"
              type="text"
              required
              maxlength="140"
              style="width:100%; padding:12px 14px; border-radius:14px; border:1px solid var(--border); background: var(--surface2); color: var(--text);"
              placeholder="What is this about?"
              aria-describedby="contact-subject-hint contact-subject-error"
            />
            <div class="field-error" id="contact-subject-error" aria-live="polite"></div>
          </div>

          <div class="detail-section">
            <label class="label" for="contact-message">Message</label>
            <p id="contact-message-hint" class="muted" style="margin:8px 0 10px;">
              Please include the details (max 4000 characters).
            </p>
            <textarea
              id="contact-message"
              name="message"
              rows="6"
              required
              maxlength="4000"
              style="width:100%; padding:12px 14px; border-radius:14px; border:1px solid var(--border); background: var(--surface2); color: var(--text); resize:vertical;"
              placeholder="Write your message..."
              aria-describedby="contact-message-hint contact-message-error"
            ></textarea>
            <div class="field-error" id="contact-message-error" aria-live="polite"></div>

            <p class="muted" style="margin:10px 0 0">
              If sending isn’t configured, this will open your email app.
              <span id="contact-fallback" style="display:none;">
                You can also <a id="contact-fallback-link" href="#" rel="noopener noreferrer">email directly</a>.
              </span>
            </p>
          </div>

          <div class="actions">
            <button class="btn btn--primary" type="submit">Send</button>
            <a class="btn" href="${hrefFor('/')}" data-nav>Home</a>
          </div>

          <p id="contact-status" class="muted" style="margin:12px 0 0" aria-live="polite"></p>
        </form>
      </div>
    </section>
  `;

  const afterRender = function () {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const fromEl = document.getElementById('contact-from');
    const subjectEl = document.getElementById('contact-subject');
    const messageEl = document.getElementById('contact-message');

    const errFrom = document.getElementById('contact-from-error');
    const errSubject = document.getElementById('contact-subject-error');
    const errMessage = document.getElementById('contact-message-error');

    const statusEl = document.getElementById('contact-status');
    const summaryEl = document.getElementById('contact-error-summary');

    const fallbackWrap = document.getElementById('contact-fallback');
    const fallbackLink = document.getElementById('contact-fallback-link');

    // Prefill the email field from the profile store if available
    const prof = typeof profileGet === 'function' ? profileGet() || {} : {};
    if (prof.email && fromEl && !fromEl.value) fromEl.value = String(prof.email);

    function setStatus(text) {
      if (statusEl) statusEl.textContent = text || '';
    }

    function clearSummary() {
      if (!summaryEl) return;
      summaryEl.innerHTML = '';
      summaryEl.style.display = 'none';
    }

    function clearFallback() {
      if (fallbackWrap) fallbackWrap.style.display = 'none';
      if (fallbackLink) {
        fallbackLink.removeAttribute('target');
        fallbackLink.removeAttribute('rel');
        fallbackLink.setAttribute('href', '#');
      }
    }

    function clearErrors() {
      [fromEl, subjectEl, messageEl].forEach((el) => {
        if (!el) return;
        el.removeAttribute('aria-invalid');
      });

      [errFrom, errSubject, errMessage].forEach((errEl) => {
        if (errEl) errEl.textContent = '';
      });

      clearSummary();
      clearFallback();
      setStatus('');
    }

    function showError(el, errEl, message) {
      if (!el) return;
      el.setAttribute('aria-invalid', 'true');
      if (errEl) errEl.textContent = message;
    }

    function isValidEmail(email) {
      // Pragmatic check: enough for client-side validation UX.
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function buildErrorSummary(items) {
      if (!summaryEl || !items.length) return;
      const links = items
        .map(({ id, msg }) => {
          const safeMsg = escapeHtml(msg);
          const safeId = escapeHtml(id);
          return `<li><a href="#${safeId}" data-focus="${safeId}">${safeMsg}</a></li>`;
        })
        .join('');
      summaryEl.innerHTML = `
        <div style="margin:0 0 6px;">Please fix the following:</div>
        <ul style="margin:0; padding-left:18px;">${links}</ul>
      `;
      summaryEl.style.display = 'block';

      // Allow clicking summary links to focus the field without changing SPA routing.
      summaryEl.querySelectorAll('a[data-focus]').forEach((a) => {
        a.addEventListener('click', (e) => {
          e.preventDefault();
          const id = a.getAttribute('data-focus');
          const el = id ? document.getElementById(id) : null;
          if (el && typeof el.focus === 'function') el.focus();
        });
      });
    }

    function validate() {
      const problems = [];

      const emailVal = fromEl ? String(fromEl.value || '').trim() : '';
      if (!emailVal) {
        showError(fromEl, errFrom, 'Email is required.');
        problems.push({ id: 'contact-from', msg: 'Email is required.' });
      } else if (!isValidEmail(emailVal)) {
        showError(fromEl, errFrom, 'Please enter a valid email address.');
        problems.push({ id: 'contact-from', msg: 'Please enter a valid email address.' });
      }

      const subjVal = subjectEl ? String(subjectEl.value || '').trim() : '';
      if (!subjVal) {
        showError(subjectEl, errSubject, 'Subject is required.');
        problems.push({ id: 'contact-subject', msg: 'Subject is required.' });
      } else if (subjVal.length > 140) {
        showError(subjectEl, errSubject, 'Subject is too long (max 140 characters).');
        problems.push({ id: 'contact-subject', msg: 'Subject is too long (max 140 characters).' });
      }

      const msgVal = messageEl ? String(messageEl.value || '').trim() : '';
      if (!msgVal) {
        showError(messageEl, errMessage, 'Message is required.');
        problems.push({ id: 'contact-message', msg: 'Message is required.' });
      } else if (msgVal.length > 4000) {
        showError(messageEl, errMessage, 'Message is too long (max 4000 characters).');
        problems.push({ id: 'contact-message', msg: 'Message is too long (max 4000 characters).' });
      }

      if (problems.length) buildErrorSummary(problems);
      return problems.length === 0;
    }

    function setFallbackMailto(fromEmail, subject, message) {
      // Use CONTACT_TO directly as requested. (If CONTACT_TO is blank, still degrade safely.)
      const to = String(CONTACT_TO || '').trim();
      const subj = subject || 'UEAH Contact';
      const bodyLines = [
        message || '',
        '',
        '---',
        `From: ${fromEmail || 'Not provided'}`,
      ];
      const body = bodyLines.join('\n');

      const href =
        `mailto:${encodeURIComponent(to)}` +
        `?subject=${encodeURIComponent(subj)}` +
        `&body=${encodeURIComponent(body)}`;

      if (fallbackLink) {
        fallbackLink.setAttribute('href', href);
        fallbackLink.setAttribute('target', '_blank');
        fallbackLink.setAttribute('rel', 'noopener noreferrer');
      }
      if (fallbackWrap) fallbackWrap.style.display = 'inline';
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      clearErrors();

      const ok = validate();
      if (!ok) {
        const firstInvalid = [fromEl, subjectEl, messageEl].find(
          (el) => el && el.getAttribute('aria-invalid') === 'true'
        );
        if (firstInvalid && typeof firstInvalid.focus === 'function') firstInvalid.focus();
        setStatus('Please fix the highlighted fields.');
        return;
      }

      const fromEmail = String((fromEl && fromEl.value) || '').trim();
      const subject = String((subjectEl && subjectEl.value) || '').trim();
      const message = String((messageEl && messageEl.value) || '').trim();

      try {
        if (typeof contactSend === 'function') {
          contactSend({ fromEmail, subject, message });
          setStatus('Opening email…');
        } else {
          // If contact.js / contactSend is unavailable, still provide a usable fallback.
          setFallbackMailto(fromEmail, subject, message);
          setStatus('Email sending is not configured here. Use the direct email link.');
        }
      } catch (_) {
        setFallbackMailto(fromEmail, subject, message);
        setStatus('Could not send from this page. Use the direct email link.');
      }
    });

    // Clear per-field error on input for better UX. Keep summary cleared too.
    [
      [fromEl, errFrom],
      [subjectEl, errSubject],
      [messageEl, errMessage],
    ].forEach(([el, errEl]) => {
      if (!el) return;
      el.addEventListener('input', () => {
        el.removeAttribute('aria-invalid');
        if (errEl) errEl.textContent = '';
        clearSummary();
        clearFallback();
        setStatus('');
      });
    });
  };

  return { title, html, afterRender };
}
