/* assets/js/views/contact.js
   Contact view for Ultimate English At Home.
   Friendly, emoji-forward contact form that opens a pre-filled GitHub issue.
*/

import { breadcrumbs, escapeHtml } from '../common.js';

const MAX_NAME = 80;
const MAX_SUBJECT = 140;
const MAX_MESSAGE = 4000;

function sanitizeText(value, maxLen) {
  const s = String(value || '').trim();
  if (!maxLen) return s;
  return s.length > maxLen ? s.slice(0, maxLen) : s;
}

function buildCopyText({ name, subject, message, pageUrl }) {
  const lines = [];
  if (subject) lines.push(`Subject: ${subject}`);
  if (name) lines.push(`Name: ${name}`);
  if (pageUrl) lines.push(`Page: ${pageUrl}`);
  lines.push('');
  lines.push(message || '-');
  return lines.join('\n');
}

function safePageUrl() {
  try {
    return window.location && window.location.href ? String(window.location.href) : '';
  } catch (_) {
    return '';
  }
}

/**
 * Build the contact page view.
 * @param {Object} ctx - context with helpers and store functions
 * @returns {{title: string, description: string, html: string, afterRender: Function}}
 */
export function getView(ctx) {
  const { hrefFor, profileGet, contactSend } = ctx;

  const title = 'Contact — UEAH';
  const description = 'Send feedback, report a bug, or share an idea.';

  const breadcrumb = breadcrumbs([
    { label: 'Home', href: hrefFor('/') },
    { label: 'Contact' },
  ]);

  const html = `
    <section class="page-top">
      ${breadcrumb}
      <h1 class="page-title"><span class="emoji" aria-hidden="true">💌</span> Contact</h1>
      <p class="page-subtitle">
        Share an idea <span class="emoji" aria-hidden="true">💡</span>, report a bug <span class="emoji" aria-hidden="true">🐞</span>, or ask a question <span class="emoji" aria-hidden="true">❓</span>
      </p>

      <div class="detail-card" role="region" aria-label="Contact form">
        <div class="chips" style="margin: 0 0 12px" aria-label="Quick subject presets">
          <button class="chip" type="button" data-preset="Idea" aria-label="Preset: Idea">
            <span class="emoji" aria-hidden="true">💡</span> Idea
          </button>
          <button class="chip" type="button" data-preset="Bug" aria-label="Preset: Bug">
            <span class="emoji" aria-hidden="true">🐞</span> Bug
          </button>
          <button class="chip" type="button" data-preset="Question" aria-label="Preset: Question">
            <span class="emoji" aria-hidden="true">❓</span> Question
          </button>
          <span class="chip">
            <span class="emoji" aria-hidden="true">✨</span> No email needed
          </span>
        </div>

        <form id="contact-form" novalidate>
          <div id="contact-error-summary" class="field-error" role="alert" aria-live="polite" style="margin: 0 0 12px; display:none;"></div>

          <div class="form-grid">
            <div class="field" data-field>
              <label class="label" for="contact-name"><span class="emoji" aria-hidden="true">🙋</span> Your name (optional)</label>
              <input
                class="input"
                id="contact-name"
                name="name"
                type="text"
                autocomplete="name"
                maxlength="${MAX_NAME}"
                placeholder="e.g., Alex"
                aria-describedby="contact-name-hint contact-name-error"
              />
              <p id="contact-name-hint" class="muted" style="margin:8px 0 10px;">Add a name if you want it included in the message.</p>
              <div class="field-error" id="contact-name-error" data-error aria-live="polite"></div>
            </div>

            <div class="field" data-field>
              <label class="label" for="contact-subject"><span class="emoji" aria-hidden="true">🏷️</span> Subject</label>
              <input
                class="input"
                id="contact-subject"
                name="subject"
                type="text"
                required
                maxlength="${MAX_SUBJECT}"
                placeholder="What is this about?"
                aria-describedby="contact-subject-hint contact-subject-error"
              />
              <p id="contact-subject-hint" class="muted" style="margin:8px 0 10px;">Short summary (max ${MAX_SUBJECT} characters).</p>
              <div class="field-error" id="contact-subject-error" data-error aria-live="polite"></div>
            </div>

            <div class="field" data-field style="grid-column: 1 / -1">
              <label class="label" for="contact-message"><span class="emoji" aria-hidden="true">📝</span> Message</label>
              <textarea
                class="textarea"
                id="contact-message"
                name="message"
                rows="7"
                required
                maxlength="${MAX_MESSAGE}"
                placeholder="Tell us what happened, what you want to see, or what we should improve…"
                aria-describedby="contact-message-hint contact-message-error"
              ></textarea>
              <p id="contact-message-hint" class="muted" style="margin:8px 0 10px;">Details help a lot! (max ${MAX_MESSAGE} characters) <span class="emoji" aria-hidden="true">🙏</span></p>
              <div class="field-error" id="contact-message-error" data-error aria-live="polite"></div>
            </div>
          </div>

          <div class="actions">
            <button class="btn btn--primary" type="submit"><span class="emoji" aria-hidden="true">🚀</span> Send</button>
            <button class="btn" type="button" id="contact-copy"><span class="emoji" aria-hidden="true">📋</span> Copy</button>
            <a class="btn" href="${hrefFor('/') }" data-nav><span class="emoji" aria-hidden="true">🏠</span> Home</a>
          </div>

          <p class="muted" style="margin:12px 0 0">
            When you press <strong>Send</strong>, this opens a GitHub form in a new tab so you can review everything before submitting.
            <span class="emoji" aria-hidden="true">🔗</span>
          </p>

          <div id="contact-fallback" class="muted" style="margin:10px 0 0; display:none;">
            If a popup blocker stops the new tab, use this link:
            <a id="contact-fallback-link" href="#" target="_blank" rel="noopener noreferrer">Open the form</a>.
          </div>

          <p id="contact-status" class="muted" style="margin:12px 0 0" aria-live="polite"></p>
        </form>
      </div>
    </section>
  `;

  const afterRender = function () {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const nameEl = document.getElementById('contact-name');
    const subjectEl = document.getElementById('contact-subject');
    const messageEl = document.getElementById('contact-message');

    const errName = document.getElementById('contact-name-error');
    const errSubject = document.getElementById('contact-subject-error');
    const errMessage = document.getElementById('contact-message-error');

    const statusEl = document.getElementById('contact-status');
    const summaryEl = document.getElementById('contact-error-summary');

    const copyBtn = document.getElementById('contact-copy');

    const fallbackWrap = document.getElementById('contact-fallback');
    const fallbackLink = document.getElementById('contact-fallback-link');

    // Prefill the name field from the profile store if available
    const prof = typeof profileGet === 'function' ? profileGet() || {} : {};
    if (prof.name && nameEl && !nameEl.value) nameEl.value = String(prof.name);

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
      if (fallbackLink) fallbackLink.setAttribute('href', '#');
    }

    function clearErrors() {
      [nameEl, subjectEl, messageEl].forEach((el) => {
        if (!el) return;
        el.removeAttribute('aria-invalid');
      });

      [errName, errSubject, errMessage].forEach((errEl) => {
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

      const nameVal = nameEl ? sanitizeText(nameEl.value, MAX_NAME) : '';
      if (nameEl && String(nameEl.value || '').trim().length > MAX_NAME) {
        showError(nameEl, errName, `Name is too long (max ${MAX_NAME} characters).`);
        problems.push({ id: 'contact-name', msg: `Name is too long (max ${MAX_NAME} characters).` });
      }

      const subjVal = subjectEl ? sanitizeText(subjectEl.value, MAX_SUBJECT) : '';
      if (!subjVal) {
        showError(subjectEl, errSubject, 'Subject is required.');
        problems.push({ id: 'contact-subject', msg: 'Subject is required.' });
      }

      const msgVal = messageEl ? sanitizeText(messageEl.value, MAX_MESSAGE) : '';
      if (!msgVal) {
        showError(messageEl, errMessage, 'Message is required.');
        problems.push({ id: 'contact-message', msg: 'Message is required.' });
      }

      if (problems.length) buildErrorSummary(problems);
      return { ok: problems.length === 0, nameVal, subjVal, msgVal };
    }

    async function copyToClipboard(text) {
      const t = String(text || '');
      if (!t) return false;

      try {
        if (navigator && navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
          await navigator.clipboard.writeText(t);
          return true;
        }
      } catch (_) {
        // fall back
      }

      // Fallback: temporary textarea
      try {
        const ta = document.createElement('textarea');
        ta.value = t;
        ta.setAttribute('readonly', '');
        ta.style.position = 'absolute';
        ta.style.left = '-9999px';
        document.body.appendChild(ta);
        ta.select();
        const ok = document.execCommand('copy');
        document.body.removeChild(ta);
        return !!ok;
      } catch (_) {
        return false;
      }
    }

    // Subject presets (chips)
    document.querySelectorAll('button[data-preset]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const preset = btn.getAttribute('data-preset');
        if (!subjectEl) return;

        const base = String(preset || '').trim();
        const current = String(subjectEl.value || '').trim();

        if (!current) subjectEl.value = `${base}: `;
        else if (!current.toLowerCase().startsWith(base.toLowerCase())) subjectEl.value = `${base}: ${current}`;

        if (messageEl && typeof messageEl.focus === 'function') messageEl.focus();
      });
    });

    if (copyBtn) {
      copyBtn.addEventListener('click', async () => {
        clearErrors();
        const nameVal = nameEl ? sanitizeText(nameEl.value, MAX_NAME) : '';
        const subjVal = subjectEl ? sanitizeText(subjectEl.value, MAX_SUBJECT) : '';
        const msgVal = messageEl ? sanitizeText(messageEl.value, MAX_MESSAGE) : '';

        if (!subjVal && !msgVal) {
          setStatus('Type a subject or message first, then copy.');
          if (subjectEl && typeof subjectEl.focus === 'function') subjectEl.focus();
          return;
        }

        const ok = await copyToClipboard(
          buildCopyText({
            name: nameVal,
            subject: subjVal,
            message: msgVal,
            pageUrl: safePageUrl(),
          })
        );

        setStatus(ok ? 'Copied to clipboard ✅' : 'Could not copy from this browser.');
      });
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      clearErrors();

      const { ok, nameVal, subjVal, msgVal } = validate();
      if (!ok) {
        const firstInvalid = [subjectEl, messageEl, nameEl].find(
          (el) => el && el.getAttribute('aria-invalid') === 'true'
        );
        if (firstInvalid && typeof firstInvalid.focus === 'function') firstInvalid.focus();
        setStatus('Please fix the highlighted fields.');
        return;
      }

      try {
        if (typeof contactSend === 'function') {
          const res = contactSend({ name: nameVal, subject: subjVal, message: msgVal });
          const url = res && typeof res === 'object' ? String(res.url || '') : '';
          if (url && fallbackLink) fallbackLink.setAttribute('href', url);
          if (url && fallbackWrap) fallbackWrap.style.display = 'block';
          setStatus('Opening GitHub…');
        } else {
          setStatus('Contact is not configured on this page.');
        }
      } catch (_) {
        setStatus('Could not open the form automatically. Use the link below.');
        if (fallbackWrap) fallbackWrap.style.display = 'block';
      }
    });

    // Clear per-field error on input
    [
      [nameEl, errName],
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

  return { title, description, html, afterRender };
}
