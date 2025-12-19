/* assets/js/views/profile.js
   Profile view for Ultimate English At Home.
   Allows users to save their email, display name and target score on this device.
   Uses ctx.profileGet, profileSet and profileClear to persist data.
*/

import { breadcrumbs } from '../common.js';

/**
 * Build the profile page view.
 * @param {Object} ctx - context with helpers and store functions
 * @returns {{title: string, html: string, afterRender: Function}}
 */
export function getView(ctx) {
  const { hrefFor, profileGet, profileSet, profileClear } = ctx;

  const title = 'Profile — UEAH';
  const breadcrumb = breadcrumbs([
    { label: 'Home', href: hrefFor('/') },
    { label: 'Profile' },
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
            <a class="btn" href="${hrefFor('/')}" data-nav>Home</a>
          </div>
          <p id="profile-status" class="muted" style="margin:12px 0 0"></p>
        </form>
      </div>
    </section>
  `;

  const afterRender = function () {
    const form = document.getElementById('profile-form');
    const emailEl = document.getElementById('profile-email');
    const nameEl = document.getElementById('profile-name');
    const targetEl = document.getElementById('profile-target');
    const clearBtn = document.getElementById('profile-clear');
    const statusEl = document.getElementById('profile-status');
    if (!form || !emailEl || !nameEl || !targetEl || !clearBtn || !statusEl) return;
    const existing = (typeof profileGet === 'function' && profileGet()) || {};
    emailEl.value = existing.email || '';
    nameEl.value = existing.name || '';
    targetEl.value = typeof existing.targetScore === 'number'
      ? String(existing.targetScore)
      : existing.targetScore || '';
    function setStatus(msg) {
      statusEl.textContent = msg || '';
    }
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = String(emailEl.value || '').trim();
      const name = String(nameEl.value || '').trim();
      const targetRaw = String(targetEl.value || '').trim();
      let targetScore = null;
      if (targetRaw) {
        const n = Number(targetRaw);
        targetScore = Number.isFinite(n) ? n : null;
      }
      const data = { email, name, targetScore };
      const ok = typeof profileSet === 'function' ? profileSet(data) : false;
      setStatus(ok ? 'Saved.' : 'Could not save on this device.');
    });
    clearBtn.addEventListener('click', () => {
      const ok = typeof profileClear === 'function' ? profileClear() : false;
      emailEl.value = '';
      nameEl.value = '';
      targetEl.value = '';
      setStatus(ok ? 'Cleared.' : 'Could not clear on this device.');
    });
  };
  return { title, html, afterRender };
}