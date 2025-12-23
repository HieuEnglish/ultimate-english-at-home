/* assets/js/views/profile.js
   Profile view for Ultimate English At Home.
   Allows users to save their email, display name and target score on this device.
   Uses ctx.profileGet, profileSet and profileClear to persist data.
   Includes Sync export/import for cross-device persistence.
*/

import { breadcrumbs, escapeHtml } from '../common.js';

function safeNowName() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  const y = d.getFullYear();
  const m = pad(d.getMonth() + 1);
  const day = pad(d.getDate());
  const hh = pad(d.getHours());
  const mm = pad(d.getMinutes());
  return `ueah-sync-${y}${m}${day}-${hh}${mm}.json`;
}

function downloadJsonFile(obj, filename) {
  const json = JSON.stringify(obj, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = filename || 'ueah-sync.json';
  document.body.appendChild(a);
  a.click();
  a.remove();

  setTimeout(() => URL.revokeObjectURL(url), 3000);
}

function readFileAsText(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.onload = () => resolve(String(reader.result || ''));
    reader.readAsText(file);
  });
}

/**
 * Build the profile page view.
 * @param {Object} ctx - context with helpers and store functions
 * @returns {{title: string, description: string, html: string, afterRender: Function}}
 */
export function getView(ctx) {
  const { hrefFor, profileGet, profileSet, profileClear, syncExport, syncImport } = ctx;

  const title = 'Profile — UEAH';
  const description = 'Save and review your learning profile.';

  const breadcrumb = breadcrumbs([
    { label: 'Home', href: hrefFor('/') },
    { label: 'Profile' },
  ]);

  const canSync = typeof syncExport === 'function' && typeof syncImport === 'function';

  const html = `
    <section class="page-top">
      ${breadcrumb}
      <h1 class="page-title">Profile</h1>
      <p class="page-subtitle">Saved on this device.</p>

      <div class="detail-card" role="region" aria-label="Profile form">
        <form id="profile-form" novalidate>
          <div class="detail-section field">
            <label class="label" for="profile-email">Email</label>
            <p class="muted">Used for score tracking and contact.</p>
            <input
              id="profile-email"
              name="email"
              type="email"
              autocomplete="email"
              inputmode="email"
              class="input"
              placeholder="name@example.com"
            />
          </div>

          <div class="detail-section field">
            <label class="label" for="profile-name">Display name</label>
            <input
              id="profile-name"
              name="name"
              type="text"
              autocomplete="name"
              class="input"
              placeholder="Optional"
            />
          </div>

          <div class="detail-section field">
            <label class="label" for="profile-target">Target IELTS score</label>
            <input
              id="profile-target"
              name="targetScore"
              type="number"
              inputmode="decimal"
              min="0"
              max="9"
              step="0.5"
              class="input"
              placeholder="Optional (e.g., 6.5)"
            />
          </div>

          <div class="actions">
            <button class="btn btn--primary" type="submit">Save</button>
            <button class="btn" type="button" id="profile-clear">Clear</button>
            <a class="btn" href="${hrefFor('/')}" data-nav>Home</a>
          </div>

          <p id="profile-status" class="muted" style="margin:12px 0 0" aria-live="polite"></p>
        </form>
      </div>

      <div class="detail-card" style="margin-top:18px" role="region" aria-label="Sync profile and favourites">
        <h2 class="detail-title" style="font-size:18px; margin:0">Sync</h2>
        <p class="detail-desc" style="margin-top:10px">
          Export your <strong>Profile + Favourites</strong> to a JSON file, then import it on another device.
        </p>

        ${
          canSync
            ? `
              <div class="actions" style="margin-top:12px; flex-wrap:wrap">
                <button type="button" class="btn btn--primary" data-sync-export>
                  Export profile + favourites
                </button>

                <label class="btn" style="position:relative; overflow:hidden">
                  Import from JSON
                  <input
                    type="file"
                    accept="application/json"
                    data-sync-import
                    style="position:absolute; inset:0; opacity:0; cursor:pointer"
                    aria-label="Import profile and favourites from a JSON file"
                  />
                </label>

                <button type="button" class="btn btn--small" data-sync-mode>
                  Import mode: Merge
                </button>
              </div>

              <p class="muted" id="sync-status" aria-live="polite" style="margin:10px 0 0"></p>
            `
            : `
              <div class="note" style="margin-top:12px">
                <strong>Sync not available.</strong>
                <p style="margin:8px 0 0">This build does not include sync helpers yet.</p>
              </div>
            `
        }
      </div>

      <div class="actions">
        <a class="btn" href="${hrefFor('/favourites')}" data-nav>Favourites</a>
        <a class="btn" href="${hrefFor('/resources')}" data-nav>Resources</a>
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
    targetEl.value =
      typeof existing.targetScore === 'number'
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

      let targetScore = '';
      if (targetRaw) {
        const n = Number(targetRaw);
        targetScore = Number.isFinite(n) ? n : '';
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

    // Sync wiring
    const syncStatusEl = document.getElementById('sync-status');
    const exportBtn = document.querySelector('[data-sync-export]');
    const importInput = document.querySelector('[data-sync-import]');
    const modeBtn = document.querySelector('[data-sync-mode]');

    if (!syncStatusEl || !canSync) return;

    function setSyncStatus(msg) {
      syncStatusEl.textContent = String(msg || '');
    }

    let importMode = 'merge';
    function updateModeUi() {
      if (!modeBtn) return;
      modeBtn.textContent = importMode === 'replace' ? 'Import mode: Replace' : 'Import mode: Merge';
    }
    updateModeUi();

    if (modeBtn) {
      modeBtn.addEventListener('click', (ev) => {
        ev.preventDefault();
        importMode = importMode === 'merge' ? 'replace' : 'merge';
        updateModeUi();
      });
    }

    if (exportBtn) {
      exportBtn.addEventListener('click', (ev) => {
        ev.preventDefault();
        try {
          const payload = syncExport();
          downloadJsonFile(payload, safeNowName());
          setSyncStatus('Exported sync file.');
        } catch (_) {
          setSyncStatus('Export failed.');
        }
      });
    }

    if (importInput) {
      importInput.addEventListener('change', async () => {
        const file = importInput.files && importInput.files[0] ? importInput.files[0] : null;
        if (!file) return;

        setSyncStatus('Importing…');

        try {
          const text = await readFileAsText(file);
          const result = syncImport(text, { mode: importMode });

          if (!result || result.ok === false) {
            setSyncStatus(result && result.reason ? `Import failed: ${escapeHtml(result.reason)}` : 'Import failed.');
          } else {
            setSyncStatus('Import complete. Your profile and favourites were updated.');
          }
        } catch (_) {
          setSyncStatus('Import failed (could not read or parse file).');
        } finally {
          importInput.value = '';
        }
      });
    }
  };

  return { title, description, html, afterRender };
}
