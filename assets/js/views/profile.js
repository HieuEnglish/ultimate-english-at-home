/* assets/js/views/profile.js
   Profile view for Ultimate English At Home.

   - Saves personal info (email, display name, target score) on this device.
   - Shows test progress by age group using profile.resultsByAge:
     • completion per skill (R/L/W/S)
     • last saved score per skill (score + level title + timestamp)
     • overall certification when all 4 skills are present (computed by profile-store)
     • reset per age group + reset all saved scores
   - Adds Certification printing entrypoints:
     • /profile/certificates (best unlocked)
     • /profile/certificates/all (all unlocked)
     • /profile/certificates/:age (single age)
   - Printing is unlocked per age group only when all 4 skills are saved AND each is 100/100.
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

function emojiSpan(e) {
  const t = String(e || '').trim();
  if (!t) return '';
  return `<span aria-hidden="true">${safeText(t)}</span>`;
}

function skillEmoji(skill) {
  const s = String(skill || '').trim().toLowerCase();
  if (s === 'reading') return '📖';
  if (s === 'listening') return '🎧';
  if (s === 'writing') return '✍️';
  if (s === 'speaking') return '🗣️';
  return '';
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

function isPerfectScore(n) {
  const v = Number(n);
  if (!Number.isFinite(v)) return false;
  return Math.abs(v - 100) < 1e-9;
}

function ageCertificateStatus(resultsByAge, age) {
  const saved = SKILLS.map((skill) => ({
    skill,
    last: getLastScore(resultsByAge, age, skill),
  }));

  const missing = saved.filter((x) => !x.last).map((x) => x.skill);
  const notPerfect = saved
    .filter((x) => x.last && !isPerfectScore(x.last.score))
    .map((x) => x.skill);

  const allSaved = missing.length === 0;
  const allPerfect = allSaved && notPerfect.length === 0;

  return {
    allSaved,
    allPerfect,
    missing,
    notPerfect,
  };
}

function getUnlockedAges(resultsByAge) {
  return AGE_GROUPS.filter((age) => ageCertificateStatus(resultsByAge, age).allPerfect);
}

function pickBestUnlockedAge(resultsByAge, ages) {
  const list = Array.isArray(ages) ? ages.slice() : [];
  if (list.length === 0) return '';

  // Prefer highest overall score; tie-breaker: most recent overall.at; fallback: order
  list.sort((a, b) => {
    const oa = getOverall(resultsByAge, a);
    const ob = getOverall(resultsByAge, b);

    const sa = oa && Number.isFinite(Number(oa.score)) ? Number(oa.score) : 0;
    const sb = ob && Number.isFinite(Number(ob.score)) ? Number(ob.score) : 0;

    if (sb !== sa) return sb - sa;

    const ta = oa && oa.at ? parseDateMaybe(oa.at) : null;
    const tb = ob && ob.at ? parseDateMaybe(ob.at) : null;

    const da = ta ? ta.getTime() : 0;
    const db = tb ? tb.getTime() : 0;

    return db - da;
  });

  return String(list[0] || '');
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
    <section class="page-top profile-page profile-nextgen">
      ${breadcrumb}

      <div class="profile-hero-shell">
        <div class="profile-panel profile-panel--identity" role="region" aria-label="Profile form">
          <div class="profile-identity-head">
            <div class="profile-avatar-xl" id="profile-avatar-xl" aria-hidden="true">👤</div>
            <div>
              <p class="profile-kicker">Learner profile</p>
              <h1 class="page-title profile-nextgen__title" id="profile-hero-name">Your profile</h1>
              <p class="profile-nextgen__subtitle" id="profile-hero-email">Saved on this device.</p>
            </div>
          </div>

          <form id="profile-form" novalidate class="profile-form-grid">
            <div class="detail-section field">
              <label class="label" for="profile-email">${emojiSpan('📧')} Email</label>
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
              <label class="label" for="profile-name">${emojiSpan('🏷️')} Display name</label>
              <input
                id="profile-name"
                name="name"
                type="text"
                autocomplete="name"
                class="input"
                placeholder="Optional"
              />
            </div>

            <div class="detail-section field profile-form-grid__full">
              <label class="label" for="profile-target">${emojiSpan('🎯')} Target IELTS score</label>
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

            <div class="profile-actions-bar profile-form-grid__full">
              <button class="btn btn--primary" type="submit" aria-label="Save profile">${emojiSpan('💾')} Save</button>
              <button class="btn" type="button" id="profile-clear" aria-label="Reset profile on this device">${emojiSpan('🔄')} Reset profile</button>
              <a class="btn" href="${hrefFor('/scoring')}" data-nav aria-label="Open scoring plan">${emojiSpan('📋')} Scoring plan</a>
              <a class="btn" href="${hrefFor('/')}" data-nav>${emojiSpan('🏠')} Home</a>
            </div>

            <p id="profile-status" class="muted profile-form-grid__full" aria-live="polite" role="status"></p>
          </form>
        </div>

        <div class="profile-panel profile-panel--dashboard" role="region" aria-label="Progress overview">
          <div class="profile-dashboard-grid">
            <div class="profile-score-card">
              <div class="profile-score-ring" id="profile-score-ring">
                <div class="profile-score-ring__inner">
                  <span class="profile-score-ring__number" id="profile-best-score">—</span>
                  <span class="profile-score-ring__label" id="profile-best-label">Best overall score</span>
                </div>
              </div>
            </div>

            <div class="profile-achievements-block">
              <p class="profile-kicker">Overview</p>
              <div class="profile-stat-pills">
                <div class="profile-stat-pill">
                  <span class="profile-stat-pill__value" id="profile-saved-skills">0</span>
                  <span class="profile-stat-pill__label">Saved skills</span>
                </div>
                <div class="profile-stat-pill">
                  <span class="profile-stat-pill__value" id="profile-active-paths">0</span>
                  <span class="profile-stat-pill__label">Active paths</span>
                </div>
                <div class="profile-stat-pill">
                  <span class="profile-stat-pill__value" id="profile-cert-count">0</span>
                  <span class="profile-stat-pill__label">Certificates</span>
                </div>
              </div>

              <div class="profile-achievements-grid">
                <div class="profile-achievement-card" data-accent="blue">
                  <div class="profile-achievement-card__icon">🎯</div>
                  <div>
                    <div class="profile-achievement-card__title">Target</div>
                    <div class="profile-achievement-card__text" id="profile-hero-target">Not set yet</div>
                  </div>
                </div>
                <div class="profile-achievement-card" data-accent="pink">
                  <div class="profile-achievement-card__icon">📚</div>
                  <div>
                    <div class="profile-achievement-card__title">Learning paths</div>
                    <div class="profile-achievement-card__text" id="profile-hero-active">No saved progress yet</div>
                  </div>
                </div>
                <a class="profile-quick-link" href="${hrefFor('/resources')}" data-nav>
                  <span aria-hidden="true">📚</span>
                  <span>Resources</span>
                </a>
                <a class="profile-quick-link" href="${hrefFor('/favourites')}" data-nav>
                  <span aria-hidden="true">⭐</span>
                  <span>Favourites</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="profile-panel profile-panel--progress" role="region" aria-labelledby="progress-title">
        <div class="profile-panel__header">
          <div>
            <h2 class="detail-title" id="progress-title">${emojiSpan('📈')} Progress & certifications</h2>
            <p class="detail-desc" id="progress-desc">
              Save scores from skill tests to track progress by age group (${emojiSpan('📖')} Reading / ${emojiSpan('🎧')} Listening / ${emojiSpan('✍️')} Writing / ${emojiSpan('🗣️')} Speaking).
            </p>
          </div>
          <div class="profile-actions-bar">
            <button type="button" class="btn" id="progress-reset-all" aria-controls="profile-progress">
              ${emojiSpan('🧹')} Reset all saved scores
            </button>
            <a class="btn" href="${hrefFor('/tests')}" data-nav>${emojiSpan('🧪')} Go to Tests</a>
            <a class="btn" href="${hrefFor('/scoring')}" data-nav aria-label="Open scoring plan">${emojiSpan('📋')} Scoring plan</a>
          </div>
        </div>

        <div id="profile-progress" class="profile-progress-host" aria-describedby="progress-desc"></div>
        <p class="muted profile-status-line" id="progress-status" aria-live="polite" role="status"></p>
      </div>

      <div class="profile-panel profile-panel--sync" role="region" aria-label="Move profile and favourites to another device">
        <div class="profile-panel__header">
          <div>
            <h2 class="detail-title">${emojiSpan('🔁')} Move to another device</h2>
            <p class="detail-desc">Save your <strong>Profile + Favourites</strong> to a file, then load it on another device.</p>
          </div>
        </div>

        ${
          canSync
            ? `
              <div class="profile-actions-bar">
                <button type="button" class="btn btn--primary" data-sync-export>
                  ${emojiSpan('📤')} Save to file
                </button>

                <label class="btn profile-file-btn">
                  ${emojiSpan('📥')} Load from file
                  <input
                    type="file"
                    accept=".json,application/json"
                    data-sync-import
                    aria-label="Load a saved file to copy your profile and favourites"
                  />
                </label>

                <button type="button" class="btn btn--small" data-sync-mode aria-pressed="false">
                  ${emojiSpan('⚙️')} Load option: Add (keep current)
                </button>
              </div>

              <p class="muted profile-status-line" id="sync-status" aria-live="polite" role="status"></p>
            `
            : `
              <div class="note">
                <strong>Not available.</strong>
                <p style="margin:8px 0 0">This feature is not available in this build.</p>
              </div>
            `
        }
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

    function renderOverview(profile) {
      const p = profile || {};
      const resultsByAge = getResultsByAge(p);
      const unlockedAges = getUnlockedAges(resultsByAge);

      const name = String(p.name || '').trim() || 'Your profile';
      const email = String(p.email || '').trim() || 'Saved on this device.';
      const initials = name
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part.charAt(0).toUpperCase())
        .join('') || '👤';

      const activeAges = AGE_GROUPS.filter((age) => SKILLS.some((skill) => !!getLastScore(resultsByAge, age, skill)));
      const savedSkills = AGE_GROUPS.reduce(
        (total, age) => total + SKILLS.filter((skill) => !!getLastScore(resultsByAge, age, skill)).length,
        0
      );

      let bestOverall = null;
      let bestAge = '';
      AGE_GROUPS.forEach((age) => {
        const overall = getOverall(resultsByAge, age);
        if (!overall) return;
        if (!bestOverall || Number(overall.score) > Number(bestOverall.score)) {
          bestOverall = overall;
          bestAge = age;
        }
      });

      const avatarEl = document.getElementById('profile-avatar-xl');
      const nameElView = document.getElementById('profile-hero-name');
      const emailElView = document.getElementById('profile-hero-email');
      const targetElView = document.getElementById('profile-hero-target');
      const activeElView = document.getElementById('profile-hero-active');
      const bestScoreEl = document.getElementById('profile-best-score');
      const bestLabelEl = document.getElementById('profile-best-label');
      const savedSkillsEl = document.getElementById('profile-saved-skills');
      const activePathsEl = document.getElementById('profile-active-paths');
      const certCountEl = document.getElementById('profile-cert-count');
      const scoreRingEl = document.getElementById('profile-score-ring');

      if (avatarEl) avatarEl.textContent = initials;
      if (nameElView) nameElView.textContent = name;
      if (emailElView) emailElView.textContent = email;
      if (targetElView) {
        targetElView.textContent = p.targetScore || p.targetScore === 0 ? `IELTS target ${formatScore(p.targetScore)}` : 'Not set yet';
      }
      if (activeElView) {
        activeElView.textContent = activeAges.length ? `${activeAges.length} path${activeAges.length === 1 ? '' : 's'} in progress` : 'No saved progress yet';
      }
      if (bestScoreEl) bestScoreEl.textContent = bestOverall ? formatScore(bestOverall.score) : '—';
      if (bestLabelEl) {
        bestLabelEl.textContent = bestOverall && bestAge ? `${ageLabelFor(bestAge)} best overall` : 'Best overall score';
      }
      if (savedSkillsEl) savedSkillsEl.textContent = String(savedSkills);
      if (activePathsEl) activePathsEl.textContent = String(activeAges.length);
      if (certCountEl) certCountEl.textContent = String(unlockedAges.length);
      if (scoreRingEl) {
        const score = bestOverall ? Math.max(0, Math.min(100, Number(bestOverall.score) || 0)) : 0;
        scoreRingEl.style.setProperty('--score-angle', `${score * 3.6}deg`);
      }
    }

    function renderProgress(profile) {
      const p = profile || {};
      const resultsByAge = getResultsByAge(p);

      const anySaved = AGE_GROUPS.some((age) =>
        SKILLS.some((skill) => !!getLastScore(resultsByAge, age, skill))
      );

      const unlockedAges = getUnlockedAges(resultsByAge);
      const bestUnlockedAge = pickBestUnlockedAge(resultsByAge, unlockedAges);

      const certPanel = (() => {
        const unlockedCount = unlockedAges.length;
        const canPrintBest = unlockedCount >= 1;
        const canPrintAll = unlockedCount >= 2;
        const bestLabel = bestUnlockedAge ? ageLabelFor(bestUnlockedAge) : '';
        const ruleLine =
          'Printing unlocks only when all 4 skills are saved and each score is 100/100 for an age group.';

        const bestAria = canPrintBest
          ? `View and print your best unlocked certificate${bestLabel ? ` (${bestLabel})` : ''}`
          : 'Locked. Complete all skills with 100/100 in one age group to unlock printing.';

        const allAria = canPrintAll
          ? 'View and print all unlocked certificates'
          : 'Locked. Unlock at least two age groups to print all certificates at once.';

        return `
          <div class="profile-cert-panel" role="region" aria-label="Certification printing">
            <div>
              <p class="profile-kicker">Certification hub</p>
              <h3 class="profile-cert-panel__title">${emojiSpan('🏆')} Print-ready milestones</h3>
              <p class="profile-cert-panel__text">${safeText(ruleLine)}</p>
            </div>

            <div class="profile-actions-bar">
              <a
                class="btn btn--primary"
                href="${hrefFor('/profile/certificates')}"
                data-nav
                aria-label="${safeText(bestAria)}"
                aria-disabled="${canPrintBest ? 'false' : 'true'}"
                data-disabled="${canPrintBest ? 'false' : 'true'}"
                style="${canPrintBest ? '' : 'pointer-events:none; opacity:.55; filter:saturate(.6)'}"
              >
                ${emojiSpan('🖨️')} Print / Save PDF (best)
              </a>

              <a
                class="btn"
                href="${hrefFor('/profile/certificates/all')}"
                data-nav
                aria-label="${safeText(allAria)}"
                aria-disabled="${canPrintAll ? 'false' : 'true'}"
                data-disabled="${canPrintAll ? 'false' : 'true'}"
                style="${canPrintAll ? '' : 'pointer-events:none; opacity:.55; filter:saturate(.6)'}"
              >
                ${emojiSpan('🧾')} Print all unlocked
              </a>
            </div>

            <p class="muted profile-cert-panel__meta">
              ${
                canPrintBest
                  ? `Unlocked: <strong>${safeText(String(unlockedCount))}</strong> age group${unlockedCount === 1 ? '' : 's'}.${
                      bestLabel ? ` Best unlocked: <strong>${safeText(bestLabel)}</strong>.` : ''
                    }`
                  : 'No unlocked certificates yet.'
              }
            </p>
          </div>
        `;
      })();

      if (!anySaved) {
        progressHost.innerHTML = `
          ${certPanel}
          <div class="note">
            <strong>${emojiSpan('📝')} No saved scores yet</strong>
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
          const certStatus = ageCertificateStatus(resultsByAge, age);
          const unlocked = certStatus.allPerfect;
          const completionPct = Math.round((completedCount / SKILLS.length) * 100);

          const skillGrid = savedSkills
            .map(({ skill, last }) => {
              const skLabelPlain = titleCase(skill);
              const skIcon = skillEmoji(skill);
              const skLabelDisplay = skIcon ? `${skIcon} ${skLabelPlain}` : skLabelPlain;

              if (last) {
                const when = last.at ? formatDateTime(last.at) : 'Saved';
                const levelLine = last.levelTitle ? ` • ${safeText(last.levelTitle)}` : '';
                const ok = isPerfectScore(last.score);
                return `
                  <div class="profile-skill-card profile-skill-card--saved" data-state="${ok ? 'perfect' : 'saved'}">
                    <div class="profile-skill-card__top">
                      <div>
                        <div class="profile-skill-card__title">${safeText(skLabelDisplay)}</div>
                        <div class="profile-skill-card__score">${safeText(formatScore(last.score))}/100${levelLine}</div>
                      </div>
                      <span class="profile-skill-card__badge">${ok ? '✓' : 'Saved'}</span>
                    </div>
                    <div class="profile-skill-card__meta">${safeText(when)}</div>
                  </div>
                `;
              }

              const testSlug = testSlugFor(age, skill);
              const testPath = testSlug ? `/tests/${testSlug}` : '/tests';
              const testAria = testSlug ? `Go to ${skLabelPlain} test for ${label}` : 'Go to test';

              return `
                <div class="profile-skill-card">
                  <div class="profile-skill-card__top">
                    <div>
                      <div class="profile-skill-card__title">${safeText(skLabelDisplay)}</div>
                      <div class="profile-skill-card__meta">No score saved yet</div>
                    </div>
                    <span class="profile-skill-card__badge profile-skill-card__badge--muted">—</span>
                  </div>
                  <a class="btn btn--small" href="${hrefFor(testPath)}" data-nav aria-label="${safeText(testAria)}">
                    ${emojiSpan('🧪')} Go to test
                  </a>
                </div>
              `;
            })
            .join('');

          const certHints = (() => {
            if (unlocked) {
              return `
                <p class="profile-cert-status profile-cert-status--ok">${emojiSpan('✅')} Unlocked for printing (all skills are 100/100).</p>
                <div class="profile-actions-bar">
                  <a class="btn btn--small btn--primary" href="${hrefFor(`/profile/certificates/${age}`)}" data-nav aria-label="View and print certificate for ${safeText(label)}">
                    ${emojiSpan('🖨️')} View / Print certificate
                  </a>
                </div>
              `;
            }

            if (certStatus.allSaved) {
              const needs = certStatus.notPerfect.map(titleCase).join(', ');
              return `
                <p class="profile-cert-status">${emojiSpan('🔒')} Locked for printing.</p>
                <p class="muted">All skills are saved, but certificates require <strong>100/100</strong> in each skill.${
                  needs ? ` Skills to improve: <strong>${safeText(needs)}</strong>.` : ''
                }</p>
              `;
            }

            const missing = certStatus.missing.map(titleCase).join(', ');
            return `
              <p class="profile-cert-status">${emojiSpan('🔒')} Locked for printing.</p>
              <p class="muted">Save all 4 skills to unlock certification.${missing ? ` Missing: <strong>${safeText(missing)}</strong>.` : ''}</p>
            `;
          })();

          const overallBlock = overall
            ? `
              <div class="profile-overall-card">
                <div>
                  <p class="profile-kicker">Overall result</p>
                  <h4 class="profile-overall-card__title">${safeText(formatScore(overall.score))}/100${
                overall.title ? ` • ${safeText(overall.title)}` : ''
              }</h4>
                  ${isIeltsLikeAge(age) ? `<p class="muted">Bands shown are practice estimates (not official IELTS).</p>` : ''}
                  ${overallWhen ? `<p class="muted">Last updated: ${safeText(overallWhen)}</p>` : ''}
                </div>
                <div>${certHints}</div>
              </div>
            `
            : `
              <div class="profile-overall-card">
                <div>
                  <p class="profile-kicker">Overall result</p>
                  <h4 class="profile-overall-card__title">Complete all 4 skills</h4>
                  <p class="muted">Finish every skill to unlock an overall score for this path.</p>
                </div>
                <div>${certHints}</div>
              </div>
            `;

          return `
            <div class="profile-progress-card" data-age-card="${safeText(age)}" role="region" aria-label="${safeText(label)} progress">
              <div class="profile-progress-card__head">
                <div>
                  <div class="profile-progress-card__title">${safeText(label)}</div>
                  <div class="profile-progress-card__meta">Completed: ${completedCount} / ${SKILLS.length} skills</div>
                </div>
                <div class="profile-actions-bar">
                  <a class="btn btn--small" href="${hrefFor(`/resources/${age}`)}" data-nav aria-label="Open resources for ${safeText(label)}">${emojiSpan('📚')} Open resources</a>
                  <button
                    type="button"
                    class="btn btn--small"
                    data-action="reset-age"
                    data-age="${safeText(age)}"
                    aria-label="Reset saved scores for ${safeText(label)}"
                  >
                    ${emojiSpan('🔄')} Reset this age group
                  </button>
                </div>
              </div>

              <div class="profile-progress-track" aria-label="Completion for ${safeText(label)}: ${completedCount} of ${SKILLS.length} skills.">
                <span class="profile-progress-track__fill" style="width:${completionPct}%"></span>
              </div>

              <div class="profile-skill-grid">
                ${skillGrid}
              </div>

              ${overallBlock}
            </div>
          `;
        })
        .join('');

      progressHost.innerHTML = `${certPanel}<div class="profile-progress-stack">${cards}</div>`;
    }

    function refreshAll(msgPersonal, msgProgress, focusTarget) {
      const p = getProfile();
      loadPersonalFields(p);
      renderOverview(p);
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

    // Prevent navigation on disabled cert links
    progressHost.addEventListener('click', (e) => {
      const a = e.target && e.target.closest ? e.target.closest('a[data-disabled="true"]') : null;
      if (!a) return;
      e.preventDefault();
      e.stopPropagation();
      setProgressStatus('Certificates are locked. Unlock an age group by saving all 4 skills at 100/100.', true);
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
      modeBtn.textContent =
        importMode === 'replace'
          ? '⚙️ Load option: Replace (overwrite)'
          : '⚙️ Load option: Add (keep current)';
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
