/* assets/js/views/favourites.js
   Favourites view for Ultimate English At Home.
   Shows saved resources and allows export/import for cross-device sync.
*/

import {
  breadcrumbs,
  renderChips,
  escapeHtml,
  escapeAttr,
  capitalize,
  ageGroupHeading,
} from '../common.js';

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

function buildResourceSnapshotForView(f) {
  const age = f && f.age != null ? String(f.age) : '';
  const skill = f && f.skill != null ? String(f.skill) : '';
  const slug = f && f.slug != null ? String(f.slug) : '';
  const title = f && f.title != null ? String(f.title) : 'Untitled resource';
  const description = f && f.description != null ? String(f.description) : '';
  const link = f && f.link != null ? String(f.link) : '';

  const r = {
    age,
    skill,
    slug,
    title,
    description,
    link,
  };

  // Optional chips (renderChips reads these keys)
  if (f && f.format != null) r.format = f.format;
  if (f && f.level != null) r.level = f.level;
  if (f && f.time != null) r.time = f.time;
  if (f && f.focus != null) r.focus = f.focus;

  return r;
}

function renderFavouritesList(items, hrefFor) {
  const safeItems = Array.isArray(items) ? items : [];

  if (!safeItems.length) {
    return `
      <div class="note">
        <strong>No favourites yet.</strong>
        <p style="margin:8px 0 0">Go to Resources and tap <span aria-hidden="true">♥</span> Save on anything you want to keep.</p>
      </div>
    `;
  }

  return `
    <div class="resource-grid" role="list" aria-label="Favourites">
      ${safeItems
        .map((fav) => {
          const r = buildResourceSnapshotForView(fav);
          const safeAge = escapeHtml(r.age || '');
          const ageHeading = r.age ? ageGroupHeading(r.age) : '';
          const safeSkill = escapeHtml(r.skill || '');
          const skillLabel = r.skill ? capitalize(r.skill) : 'Resource';
          const detailPath = r.age && r.skill && r.slug ? `/resources/${r.age}/${r.skill}/${r.slug}` : '';
          const detailHref = detailPath ? hrefFor(detailPath) : '';

          const desc = r.description || (r.skill ? `Practice resource for ${r.skill}.` : 'Practice resource.');
          const chips = renderChips(r);

          const openBtn = r.link
            ? `<a class="btn btn--primary btn--small" href="${escapeAttr(
                r.link
              )}" target="_blank" rel="noopener noreferrer" aria-label="Open ${escapeAttr(
                r.title
              )} in a new tab">Open Resource ↗</a>`
            : `<span class="btn btn--small btn--disabled" aria-disabled="true">MISSING LINK</span>`;

          const detailsBtn = detailHref
            ? `<a class="btn btn--small" href="${detailHref}" data-nav>Details →</a>`
            : `<span class="btn btn--small btn--disabled" aria-disabled="true">No details</span>`;

          const key = String(fav && fav.key ? fav.key : '');

          return `
            <article class="resource-item" role="listitem" data-fav-item="${escapeAttr(key)}">
              <div class="resource-card" role="group" aria-label="${escapeAttr(r.title)}">
                <h2 class="resource-title">${escapeHtml(r.title)}</h2>
                <p class="resource-desc">${escapeHtml(desc)}</p>
                ${
                  safeAge || safeSkill
                    ? `<p class="muted" style="margin:8px 0 0; font-size:13px">
                        ${ageHeading ? `${escapeHtml(ageHeading)}` : ''}
                        ${safeAge && safeSkill ? ' · ' : ''}
                        ${safeSkill ? `${escapeHtml(skillLabel)}` : ''}
                      </p>`
                    : ''
                }
                ${chips}
              </div>
              <div class="resource-actions" aria-label="Favourite actions">
                ${detailsBtn}
                ${openBtn}
                <button
                  type="button"
                  class="btn btn--small"
                  data-fav-remove
                  data-fav-key="${escapeAttr(key)}"
                  aria-label="Remove ${escapeAttr(r.title)} from favourites"
                >
                  Remove
                </button>
              </div>
            </article>
          `;
        })
        .join('')}
    </div>
  `;
}

export function getView(ctx) {
  const { hrefFor } = ctx;
  const title = 'Favourites — UEAH';
  const description = 'Save your favourite resources and sync them across devices.';

  const breadcrumb = breadcrumbs([
    { label: 'Home', href: hrefFor('/') },
    { label: 'Favourites' },
  ]);

  const items =
    ctx && typeof ctx.favouritesGetAll === 'function' ? (ctx.favouritesGetAll() || []) : [];

  const listHtml = renderFavouritesList(items, hrefFor);

  const html = `
    <section class="page-top">
      ${breadcrumb}
      <h1 class="page-title">Favourites</h1>
      <p class="page-subtitle">Your saved resources (stored on this device).</p>

      <div id="favourites-list">
        ${listHtml}
      </div>

      <div class="detail-card" style="margin-top:18px" role="region" aria-label="Move profile and favourites to another device">
        <h2 class="detail-title" style="font-size:18px; margin:0">Move to another device</h2>
        <p class="detail-desc" style="margin-top:10px">
          Save your <strong>Profile + Favourites</strong> to a file. On your other device, load the file to copy them.
        </p>

        <div class="actions" style="margin-top:12px; flex-wrap:wrap">
          <button type="button" class="btn btn--primary" data-sync-export>
            Save to file
          </button>

          <label class="btn" style="position:relative; overflow:hidden">
            Load from file
            <input
              type="file"
              accept=".json,application/json"
              data-sync-import
              style="position:absolute; inset:0; opacity:0; cursor:pointer"
              aria-label="Load a saved file to copy your profile and favourites"
            />
          </label>

          <button type="button" class="btn btn--small" data-sync-import-merge aria-pressed="false">
            Load option: Add (keep current)
          </button>
        </div>

        <p class="muted" id="sync-status" aria-live="polite" style="margin:10px 0 0"></p>
      </div>

      <div class="actions">
        <a class="btn btn--primary" href="${hrefFor('/')}" data-nav>Home</a>
        <a class="btn" href="${hrefFor('/resources')}" data-nav>Resources</a>
        <a class="btn" href="${hrefFor('/profile')}" data-nav>Profile</a>
      </div>
    </section>
  `;

  function afterRender() {
    const statusEl = document.getElementById('sync-status');
    const listRoot = document.getElementById('favourites-list');

    function setStatus(msg) {
      if (!statusEl) return;
      statusEl.textContent = String(msg || '');
    }

    function getItems() {
      return ctx && typeof ctx.favouritesGetAll === 'function' ? (ctx.favouritesGetAll() || []) : [];
    }

    function renderList() {
      if (!listRoot) return;
      listRoot.innerHTML = renderFavouritesList(getItems(), hrefFor);
      bindRemoveButtons();
    }

    function bindRemoveButtons() {
      if (!listRoot) return;
      const removeBtns = Array.from(listRoot.querySelectorAll('[data-fav-remove]'));
      removeBtns.forEach((btn) => {
        btn.addEventListener('click', (ev) => {
          ev.preventDefault();
          const key = String(btn.getAttribute('data-fav-key') || '').trim();
          if (!key) return;

          if (ctx && typeof ctx.favouritesRemoveByKey === 'function') {
            const ok = ctx.favouritesRemoveByKey(key);
            if (ok) renderList();
          }
        });
      });
    }

    // Initial bind
    bindRemoveButtons();

    // Export
    const exportBtn = document.querySelector('[data-sync-export]');
    if (exportBtn) {
      exportBtn.addEventListener('click', (ev) => {
        ev.preventDefault();
        if (!ctx || typeof ctx.syncExport !== 'function') {
          setStatus('Save not available.');
          return;
        }

        try {
          const payload = ctx.syncExport();
          downloadJsonFile(payload, safeNowName());
          setStatus('File saved. Use it on your other device.');
        } catch (_) {
          setStatus('Could not save file.');
        }
      });
    }

    function friendlySyncError(reason) {
      const r = String(reason || '').trim();
      const low = r.toLowerCase();

      if (!r) return 'Could not load this file.';
      if (low.includes('not a ueah')) return 'This file is not from UEAH.';
      if (low.includes('invalid json') || low.includes('payload') || low.includes('shape')) {
        return 'This file is not supported.';
      }
      if (low.includes('failed to save')) return 'Could not save on this device.';
      return 'Could not load this file.';
    }

    // Import mode toggle (merge/replace)
    let importMode = 'merge';
    const modeBtn = document.querySelector('[data-sync-import-merge]');
    function updateModeUi() {
      if (!modeBtn) return;
      modeBtn.textContent =
        importMode === 'replace' ? 'Load option: Replace (overwrite)' : 'Load option: Add (keep current)';
      modeBtn.setAttribute('aria-pressed', importMode === 'replace' ? 'true' : 'false');
    }
    updateModeUi();

    if (modeBtn) {
      modeBtn.addEventListener('click', (ev) => {
        ev.preventDefault();
        importMode = importMode === 'merge' ? 'replace' : 'merge';
        updateModeUi();
      });
    }

    // Import file input
    const fileInput = document.querySelector('[data-sync-import]');
    if (fileInput) {
      fileInput.addEventListener('change', async () => {
        const file = fileInput.files && fileInput.files[0] ? fileInput.files[0] : null;
        if (!file) return;

        if (!ctx || typeof ctx.syncImport !== 'function') {
          setStatus('Load not available.');
          fileInput.value = '';
          return;
        }

        setStatus('Loading file…');

        try {
          const text = await readFileAsText(file);
          const result = ctx.syncImport(text, { mode: importMode });

          if (!result || result.ok === false) {
            const reason = result && result.reason ? String(result.reason) : '';
            setStatus(friendlySyncError(reason));
          } else {
            setStatus('Done. Your profile and favourites are now on this device.');
            // Re-render list
            renderList();
          }
        } catch (_) {
          setStatus('Could not load this file.');
        } finally {
          // Allow importing the same file again
          fileInput.value = '';
        }
      });
    }
  }

  return { title, description, html, afterRender };
}
