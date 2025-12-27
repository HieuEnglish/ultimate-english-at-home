/* assets/js/views/profile.js
   Profile view for Ultimate English At Home.

   - Saves personal info (email, display name, target score) on this device.
   - Shows test progress by age group using profile.resultsByAge:
     • completion per skill (R/L/W/S)
     • last saved score per skill (score + level title + timestamp)
     • overall certification when all 4 skills are present (computed by profile-store)
     • reset per age group + reset all saved scores
   - Uses ctx.profileGet, profileSet and profileClear to persist data.
   - Includes Sync export/import for cross-device persistence.
*/

import { AGE_GROUPS, SKILLS } from '../constants.js';
import { breadcrumbs } from '../common.js';

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

function isPlainObject(v) {
  return v && typeof v === 'object' && !Array.isArray(v);
}

function safeText(v) {
  return String(v == null ? '' : v)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function formatScore(v) {
  const n = Number(v);
  if (!Number.isFinite(n)) return '—';
  const isInt = Math.abs(n - Math.round(n)) < 1e-9;
  if (isInt) return String(Math.round(n));
  const isHalf = Math.abs(n * 2 - Math.round(n * 2)) < 1e-9;
  if (isHalf) return n.toFixed(1);
  return n.toFixed(2);
}

function parseDateMaybe(v) {
  if (!v) return null;
  const d = new Date(v);
  return Number.isFinite(d.getTime()) ? d : null;
}

function formatDateTime(v) {
  const d = parseDateMaybe(v);
  if (!d) return '';
  try {
    return d.toLocaleString();
  } catch (_) {
    return d.toISOString();
  }
}

function titleCase(s) {
  const t = String(s || '').trim();
  return t ? t.charAt(0).toUpperCase() + t.slice(1) : t;
}

function ageLabelFor(age) {
  const a = String(age || '').trim().toLowerCase();
  if (a === 'ielts') return 'IELTS Practice';
  if (a === '0-3') return 'Ages 0–3';
  if (a === '4-7') return 'Ages 4–7';
  if (a === '8-10') return 'Ages 8–10';
  if (a === '11-12') return 'Ages 11–12';
  if (a === '13-18') return 'Ages 13–18';
  return a || 'Age group';
}

function testSlugFor(age, skill) {
  const a = String(age || '').trim().toLowerCase();
  const s = String(skill || '').trim().toLowerCase();
  if (!a || !s) return '';

  // "ielts" is a special category that uses the dedicated IELTS test slugs.
  if (a === 'ielts') return `iels-${s}`;

  return `age-${a}-${s}`;
}

function isIeltsLikeAge(age) {
  const a = String(age || '').trim().toLowerCase();
  return a === '13-18' || a === 'ielts';
}

function focusForA11y(el) {
  if (!el) return;
  try {
    const hadTabindex = el.hasAttribute('tabindex');
    if (!hadTabindex) el.setAttribute('tabindex', '-1');
    requestAnimationFrame(() => {
      try {
        el.focus({ preventScroll: false });
      } catch (_) {
        el.focus();
      }
      if (!hadTabindex) {
        // keep focusable for subsequent announcements (status regions)
      }
    });
  } catch (_) {}
}

function getResultsByAge(profile) {
  const p = isPlainObject(profile) ? profile : {};
  return isPlainObject(p.resultsByAge) ? p.resultsByAge : {};
}

function getLastScore(resultsByAge, age, skill) {
  const byAge = isPlainObject(resultsByAge) ? resultsByAge : {};
  const bucket = isPlainObject(byAge[age]) ? byAge[age] : null;
  if (!bucket) return null;

  const sk = isPlainObject(bucket[skill]) ? bucket[skill] : null;
  const last = sk && isPlainObject(sk.lastScore) ? sk.lastScore : null;

  if (!last) return null;
  const score = Number(last.score);
  if (!Number.isFinite(score)) return null;

  return {
    score,
    levelTitle: String(last.levelTitle || ''),
    at: String(last.at || ''),
  };
}

function getOverall(resultsByAge, age) {
  const byAge = isPlainObject(resultsByAge) ? resultsByAge : {};
  const bucket = isPlainObject(byAge[age]) ? byAge[age] : null;
  if (!bucket) return null;

  const ov = isPlainObject(bucket.overall) ? bucket.overall : null;
  if (!ov) return null;

  const score = Number(ov.score);
  if (!Number.isFinite(score)) return null;

  return {
    score,
    title: String(ov.title || ''),
    at: String(ov.at || ''),
  };
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
    <section class="page-top profile-page">
      ${breadcrumb}
      <h1 class="page-title">Profile</h1>
      <p class="page-subtitle">Saved on this device.</p>

      <div class="detail-card" role="region" aria-label="Profile form">
        <form id="profile-form" novalidate>
          <div class="detail-section field">
            <label class="label" for="profile-email">Email</label>
            <p class="muted" id="profile-email-help">Used for score tracking and contact.</p>
            <input
              id="profile-email"
              name="email"
              type="email"
              autocomplete="email"
              inputmode="email"
              class="input"
              placeholder="name@example.com"
              aria-describedby="profile-email-help"
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
            <p class="muted" id="profile-target-help">For Ages 13–18 and IELTS Practice only (practice).</p>
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
              aria-describedby="profile-target-help"
            />
          </div>

          <div class="actions">
            <button class="btn btn--primary" type="submit" aria-label="Save profile">Save</button>
            <button class="btn" type="button" id="profile-clear" aria-label="Reset profile on this device">Reset profile</button>
            <a class="btn" href="${hrefFor('/scoring')}" data-nav aria-label="Open scoring plan">Scoring plan</a>
            <a class="btn" href="${hrefFor('/')}" data-nav>Home</a>
          </div>

          <p id="profile-status" class="muted" style="margin:12px 0 0" aria-live="polite" role="status"></p>
        </form>
      </div>

      <div class="detail-card" style="margin-top:18px" role="region" aria-labelledby="progress-title">
        <h2 class="detail-title" id="progress-title" style="font-size:18px; margin:0">Progress & certifications</h2>
        <p class="detail-desc" id="progress-desc" style="margin-top:10px">
          Save scores from skill tests to track progress by age group (Reading / Listening / Writing / Speaking).
        </p>

        <div id="profile-progress" style="margin-top:12px" aria-describedby="progress-desc"></div>

        <div class="actions" style="margin-top:12px; flex-wrap:wrap">
          <button type="button" class="btn" id="progress-reset-all" aria-controls="profile-progress">
            Reset all saved scores
          </button>
          <a class="btn" href="${hrefFor('/tests')}" data-nav>Go to Tests</a>
          <a class="btn" href="${hrefFor('/scoring')}" data-nav aria-label="Open scoring plan">Scoring plan</a>
        </div>

        <p class="muted" id="progress-status" aria-live="polite" role="status" style="margin:10px 0 0"></p>
      </div>

      <div class="detail-card" style="margin-top:18px" role="region" aria-label="Move profile and favourites to another device">
        <h2 class="detail-title" style="font-size:18px; margin:0">Move to another device</h2>
        <p class="detail-desc" style="margin-top:10px">
          Save your <strong>Profile + Favourites</strong> to a file. On your other device, load the file to copy them.
        </p>

        ${
          canSync
            ? `
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

                <button type="button" class="btn btn--small" data-sync-mode aria-pressed="false">
                  Load option: Add (keep current)
                </button>
              </div>

              <p class="muted" id="sync-status" aria-live="polite" role="status" style="margin:10px 0 0"></p>
            `
            : `
              <div class="note" style="margin-top:12px">
                <strong>Not available.</strong>
                <p style="margin:8px 0 0">This feature is not available in this build.</p>
              </div>
            `
        }
      </div>

      <div class="actions">
        <a class="btn" href="${hrefFor('/favourites')}" data-nav>Favourites</a>
        <a class="btn" href="${hrefFor('/scoring')}" data-nav>Scoring plan</a>
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

    const progressHost = document.getElementById('profile-progress');
    const progressStatusEl = document.getElementById('progress-status');
    const resetAllBtn = document.getElementById('progress-reset-all');

    if (!form || !emailEl || !nameEl || !targetEl || !clearBtn || !statusEl || !progressHost) return;

    function getProfile() {
      return (typeof profileGet === 'function' && profileGet()) || {};
    }

    function setProfile(next) {
      return typeof profileSet === 'function' ? profileSet(next) : false;
    }

    function setStatus(msg, moveFocus) {
      statusEl.textContent = String(msg || '');
      if (moveFocus) focusForA11y(statusEl);
    }

    function setProgressStatus(msg, moveFocus) {
      if (!progressStatusEl) return;
      progressStatusEl.textContent = String(msg || '');
      if (moveFocus) focusForA11y(progressStatusEl);
    }

    function loadPersonalFields(profile) {
      const p = profile || {};
      emailEl.value = p.email || '';
      nameEl.value = p.name || '';
      targetEl.value = typeof p.targetScore === 'number' ? String(p.targetScore) : p.targetScore || '';
    }

    function renderProgress(profile) {
      const p = profile || {};
      const resultsByAge = getResultsByAge(p);

      const anySaved = AGE_GROUPS.some((age) =>
        SKILLS.some((skill) => !!getLastScore(resultsByAge, age, skill))
      );

      if (!anySaved) {
        progressHost.innerHTML = `
          <div class="note" style="margin-top:0">
            <strong>No saved scores yet</strong>
            <p style="margin:8px 0 0; opacity:.92">
              Complete a skill test and click <strong>Save score to Profile</strong> to track progress here.
            </p>
          </div>
        `;
        return;
      }

      const cards = AGE_GROUPS
        .map((age) => {
          const label = ageLabelFor(age);

          const savedSkills = SKILLS.map((skill) => ({
            skill,
            last: getLastScore(resultsByAge, age, skill),
          }));

          const completedCount = savedSkills.filter((x) => !!x.last).length;

          const overall = completedCount === SKILLS.length ? getOverall(resultsByAge, age) : null;
          const overallWhen = overall && overall.at ? formatDateTime(overall.at) : '';

          const skillGrid = savedSkills
            .map(({ skill, last }) => {
              const skLabel = titleCase(skill);

              if (last) {
                const when = last.at ? formatDateTime(last.at) : '';
                const levelLine = last.levelTitle
                  ? ` • <span style="opacity:.92">${safeText(last.levelTitle)}</span>`
                  : '';
                const aria = `${skLabel} saved. Score ${formatScore(last.score)} out of 100.`;

                return `
                <div style="border:1px solid var(--border); border-radius:14px; padding:10px 12px; background: var(--surface2)">
                  <div style="display:flex; align-items:flex-start; justify-content:space-between; gap:10px">
                    <div>
                      <div style="font-weight:900">${safeText(skLabel)}</div>
                      <div style="margin-top:6px; opacity:.92">
                        Score: <strong>${safeText(formatScore(last.score))}</strong>/100
                        ${levelLine}
                      </div>
                      ${
                        when
                          ? `<div class="muted" style="margin-top:4px">${safeText(when)}</div>`
                          : `<div class="muted" style="margin-top:4px">Saved</div>`
                      }
                    </div>
                    <span class="chip chip--ok" style="font-weight:900" aria-label="${safeText(
                      aria
                    )}" title="${safeText(aria)}">✓</span>
                  </div>
                </div>
              `;
              }

              const aria = `${skLabel} not saved.`;
              const testSlug = testSlugFor(age, skill);
              const testPath = testSlug ? `/tests/${testSlug}` : '/tests';
              const testAria = testSlug ? `Go to ${skLabel} test for ${label}` : 'Go to test';

              return `
              <div style="border:1px solid var(--border); border-radius:14px; padding:10px 12px; background: var(--surface2)">
                <div style="display:flex; align-items:flex-start; justify-content:space-between; gap:10px">
                  <div>
                    <div style="font-weight:900">${safeText(skLabel)}</div>
                    <div class="muted" style="margin-top:6px">No score saved yet</div>
                  </div>
                  <span class="chip" style="font-weight:900" aria-label="${safeText(
                    aria
                  )}" title="${safeText(aria)}">—</span>
                </div>
                <div style="margin-top:10px">
                  <a class="btn btn--small" href="${hrefFor(
                    testPath
                  )}" data-nav aria-label="${safeText(testAria)}">
                    Go to test
                  </a>
                </div>
              </div>
            `;
            })
            .join('');

          const progressLabel = `Completion for ${label}: ${completedCount} of ${SKILLS.length} skills.`;

          const overallBlock = overall
            ? `
            <div class="note" style="margin:12px 0 0; padding:10px 12px">
              <strong>Certification</strong>
              <p style="margin:8px 0 0; opacity:.92">
                Overall score: <strong>${safeText(formatScore(overall.score))}</strong>/100
                ${overall.title ? ` • <span style="opacity:.92">${safeText(overall.title)}</span>` : ''}
              </p>
              ${
                isIeltsLikeAge(age)
                  ? `<p class="muted" style="margin:8px 0 0">Bands shown are practice estimates (not official IELTS).</p>`
                  : ''
              }
              ${overallWhen ? `<p class="muted" style="margin:8px 0 0">Last updated: ${safeText(overallWhen)}</p>` : ''}
            </div>
          `
            : `
            <div class="note" style="margin:12px 0 0; padding:10px 12px">
              <strong>Certification</strong>
              <p style="margin:8px 0 0; opacity:.92">
                Complete all 4 skills to unlock an overall score for this group.
              </p>
            </div>
          `;

          return `
          <div class="detail-card" style="margin-top:12px" data-age-card="${safeText(
            age
          )}" role="region" aria-label="${safeText(label)} progress">
            <div style="display:flex; align-items:flex-start; justify-content:space-between; gap:10px; flex-wrap:wrap">
              <div>
                <div style="font-weight:900">${safeText(label)}</div>
                <div class="muted" style="margin-top:4px">Completed: ${completedCount} / ${SKILLS.length}</div>
              </div>
              <div style="display:flex; gap:8px; flex-wrap:wrap">
                <a class="btn btn--small" href="${hrefFor(
                  `/resources/${age}`
                )}" data-nav aria-label="Open resources for ${safeText(label)}">Open resources</a>
                <button
                  type="button"
                  class="btn btn--small"
                  data-action="reset-age"
                  data-age="${safeText(age)}"
                  aria-label="Reset saved scores for ${safeText(label)}"
                >
                  Reset this age group
                </button>
              </div>
            </div>

            <div style="margin-top:10px">
              <progress value="${completedCount}" max="${SKILLS.length}" style="width:100%; height:14px" aria-label="${safeText(
            progressLabel
          )}"></progress>
            </div>

            <div style="margin-top:12px; display:grid; gap:10px; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr))">
              ${skillGrid}
            </div>

            ${overallBlock}
          </div>
        `;
        })
        .join('');

      progressHost.innerHTML = cards;
    }

    function refreshAll(msgPersonal, msgProgress, focusTarget) {
      const p = getProfile();
      loadPersonalFields(p);
      renderProgress(p);

      if (msgPersonal) setStatus(msgPersonal, focusTarget === 'profile');
      if (msgProgress) setProgressStatus(msgProgress, focusTarget === 'progress');
    }

    // Initial load
    refreshAll('', '');

    // Live updates when profile-store dispatches changes (e.g., Save score from tests)
    window.addEventListener('ueah:profile-changed', () => {
      refreshAll('', '', '');
    });

    // Save personal fields (preserve resultsByAge and any other fields)
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

      const existing = getProfile();
      const next = { ...existing, email, name, targetScore };

      const ok = setProfile(next);
      refreshAll(ok ? 'Saved.' : 'Could not save on this device.', '', 'profile');
    });

    // Reset entire profile (personal + saved scores)
    clearBtn.addEventListener('click', () => {
      const confirmReset = window.confirm
        ? window.confirm('Reset your profile on this device? This clears personal info and saved scores.')
        : true;

      if (!confirmReset) return;

      const ok = typeof profileClear === 'function' ? profileClear() : setProfile({});

      emailEl.value = '';
      nameEl.value = '';
      targetEl.value = '';

      refreshAll(ok ? 'Reset.' : 'Could not reset on this device.', ok ? 'Saved scores cleared.' : '', 'profile');
    });

    // Reset this age group (resultsByAge only)
    progressHost.addEventListener('click', (e) => {
      const btn = e.target && e.target.closest ? e.target.closest('[data-action="reset-age"]') : null;
      if (!btn) return;

      const age = String(btn.getAttribute('data-age') || '').trim();
      if (!age) return;

      const confirmReset = window.confirm ? window.confirm(`Reset saved scores for ${ageLabelFor(age)}?`) : true;

      if (!confirmReset) return;

      const STORE = window.UEAH_PROFILE_STORE;
      if (STORE && typeof STORE.clearAgeResults === 'function') {
        STORE.clearAgeResults(age);
        refreshAll('', `Reset scores for ${ageLabelFor(age)}.`, 'progress');
        return;
      }

      // Fallback (should not be needed if profile-store.js is loaded)
      const existing = getProfile();
      const next = { ...(existing || {}) };
      if (isPlainObject(next.resultsByAge)) {
        const r = { ...next.resultsByAge };
        delete r[age];
        next.resultsByAge = r;
      }
      const ok = setProfile(next);
      refreshAll('', ok ? `Reset scores for ${ageLabelFor(age)}.` : 'Could not reset scores on this device.', 'progress');
    });

    // Reset all saved scores (resultsByAge only)
    if (resetAllBtn) {
      resetAllBtn.addEventListener('click', () => {
        const confirmReset = window.confirm
          ? window.confirm('Reset all saved test scores on this device? (Personal info is kept.)')
          : true;

        if (!confirmReset) return;

        const STORE = window.UEAH_PROFILE_STORE;
        if (STORE && typeof STORE.clearAgeResults === 'function') {
          STORE.clearAgeResults();
          refreshAll('', 'All saved scores were reset.', 'progress');
          return;
        }

        // Fallback
        const existing = getProfile();
        const next = { ...(existing || {}), resultsByAge: {} };
        const ok = setProfile(next);
        refreshAll('', ok ? 'All saved scores were reset.' : 'Could not reset scores on this device.', 'progress');
      });
    }

    // Sync wiring
    const syncStatusEl = document.getElementById('sync-status');
    const exportBtn = document.querySelector('[data-sync-export]');
    const importInput = document.querySelector('[data-sync-import]');
    const modeBtn = document.querySelector('[data-sync-mode]');

    function setSyncStatus(msg) {
      if (!syncStatusEl) return;
      syncStatusEl.textContent = String(msg || '');
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

    let importMode = 'merge';
    function updateModeUi() {
      if (!modeBtn) return;
      modeBtn.textContent = importMode === 'replace' ? 'Load option: Replace (overwrite)' : 'Load option: Add (keep current)';
      modeBtn.setAttribute('aria-pressed', importMode === 'replace' ? 'true' : 'false');
    }
    updateModeUi();

    if (canSync && modeBtn) {
      modeBtn.addEventListener('click', (ev) => {
        ev.preventDefault();
        importMode = importMode === 'merge' ? 'replace' : 'merge';
        updateModeUi();
      });
    }

    if (canSync && exportBtn) {
      exportBtn.addEventListener('click', (ev) => {
        ev.preventDefault();
        try {
          const payload = syncExport();
          downloadJsonFile(payload, safeNowName());
          setSyncStatus('File saved. Use it on your other device.');
          focusForA11y(syncStatusEl);
        } catch (_) {
          setSyncStatus('Could not save file.');
          focusForA11y(syncStatusEl);
        }
      });
    }

    if (canSync && importInput) {
      importInput.addEventListener('change', async () => {
        const file = importInput.files && importInput.files[0] ? importInput.files[0] : null;
        if (!file) return;

        setSyncStatus('Loading file…');

        try {
          const text = await readFileAsText(file);
          const result = syncImport(text, { mode: importMode });

          if (!result || result.ok === false) {
            const reason = result && result.reason ? String(result.reason) : '';
            setSyncStatus(friendlySyncError(reason));
            focusForA11y(syncStatusEl);
          } else {
            setSyncStatus('Done. Your profile and favourites are now on this device.');
            refreshAll('', 'Imported profile data.', 'progress');
            focusForA11y(syncStatusEl);
          }
        } catch (_) {
          setSyncStatus('Could not load this file.');
          focusForA11y(syncStatusEl);
        } finally {
          importInput.value = '';
        }
      });
    }
  };

  return { title, description, html, afterRender };
}
