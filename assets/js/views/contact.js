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
    const statusEl = document.getElementById('contact-status');
    const errFrom = document.getElementById('contact-from-error');
    const errSubject = document.getElementById('contact-subject-error');
    const errMessage = document.getElementById('contact-message-error');
    // Prefill the email field from the profile store if available
    const prof = typeof profileGet === 'function' ? profileGet() || {} : {};
    if (prof.email && fromEl && !fromEl.value) fromEl.value = String(prof.email);
    function clearErrors() {
      [fromEl, subjectEl, messageEl].forEach((el) => {
        if (el) el.removeAttribute('aria-invalid');
      });
      [errFrom, errSubject, errMessage].forEach((errEl) => {
        if (errEl) errEl.textContent = '';
      });
      if (statusEl) statusEl.textContent = '';
    }
    function showError(el, errEl, message) {
      if (!el || !errEl) return;
      el.setAttribute('aria-invalid', 'true');
      errEl.textContent = message;
    }
    function validate() {
      let valid = true;
      const emailVal = fromEl ? String(fromEl.value || '').trim() : '';
      if (emailVal) {
        const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal);
        if (!emailOk) {
          showError(fromEl, errFrom, 'Please enter a valid email address.');
          valid = false;
        }
      }
      const subjVal = subjectEl ? String(subjectEl.value || '') : '';
      if (subjVal.length > 140) {
        showError(subjectEl, errSubject, 'Subject is too long (max 140 characters).');
        valid = false;
      }
      const msgVal = messageEl ? String(messageEl.value || '').trim() : '';
      if (!msgVal) {
        showError(messageEl, errMessage, 'Please write a message.');
        valid = false;
      } else if (msgVal.length > 4000) {
        showError(messageEl, errMessage, 'Message is too long (max 4000 characters).');
        valid = false;
      }
      return valid;
    }
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      clearErrors();
      const ok = validate();
      if (!ok) {
        const firstInvalid = [fromEl, subjectEl, messageEl].find(
          (el) => el && el.hasAttribute('aria-invalid'),
        );
        if (firstInvalid && typeof firstInvalid.focus === 'function') firstInvalid.focus();
        if (statusEl) statusEl.textContent = 'Please fix the highlighted fields.';
        return;
      }
      const fromEmail = String((fromEl && fromEl.value) || '').trim();
      const subject = String((subjectEl && subjectEl.value) || '').trim() || 'UEAH Contact';
      const message = String((messageEl && messageEl.value) || '').trim();
      try {
        if (typeof contactSend === 'function') {
          contactSend({ fromEmail, subject, message });
          if (statusEl) statusEl.textContent = 'Opening email…';
        }
      } catch (_) {
        if (statusEl) statusEl.textContent = 'Could not send from this page.';
      }
    });
    [
      [fromEl, errFrom],
      [subjectEl, errSubject],
      [messageEl, errMessage],
    ].forEach(([el, errEl]) => {
      if (!el) return;
      el.addEventListener('input', () => {
        el.removeAttribute('aria-invalid');
        if (errEl) errEl.textContent = '';
        if (statusEl) statusEl.textContent = '';
      });
    });
  };
  return { title, html, afterRender };
}