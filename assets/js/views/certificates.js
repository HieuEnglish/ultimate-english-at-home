/* assets/js/views/certificates.js
   Certificate preview + print/save view.

   Routes:
   - /profile/certificates           -> best unlocked certificate (highest overall among unlocked)
   - /profile/certificates/all       -> all unlocked certificates (multi-page print)
   - /profile/certificates/:age      -> a single age group certificate

   Unlock rule:
   - A certificate is unlocked per age group only when ALL 4 skills are saved AND EACH is 100/100.

   Output:
   - Print / Save as PDF: uses window.print() (browser print dialog)
   - Save image: exports SVG -> PNG download
   - Share / Email: uses Web Share API with PNG (when available), else mailto fallback
*/

import { AGE_GROUPS, SKILLS } from '../constants.js';
import { breadcrumbs } from '../common.js';

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

function isIeltsLikeAge(age) {
  const a = String(age || '').trim().toLowerCase();
  return a === '13-18' || a === 'ielts';
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

function formatDateLong(v) {
  const d = parseDateMaybe(v) || new Date();
  try {
    return d.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
  } catch (_) {
    return d.toISOString().slice(0, 10);
  }
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
  return v >= 80;
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

  return { allSaved, allPerfect, missing, notPerfect, saved };
}

function getUnlockedAges(resultsByAge) {
  return AGE_GROUPS.filter((age) => ageCertificateStatus(resultsByAge, age).allPerfect);
}

function pickBestUnlockedAge(resultsByAge, ages) {
  const list = Array.isArray(ages) ? ages.slice() : [];
  if (list.length === 0) return '';

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

function certificateFilename(profileName, age) {
  const who = String(profileName || 'learner')
    .trim()
    .toLowerCase()
    .replaceAll(/[^a-z0-9]+/g, '-')
    .replaceAll(/^-+|-+$/g, '')
    .slice(0, 40) || 'learner';
  const a = String(age || 'age').trim().toLowerCase().replaceAll(/[^a-z0-9]+/g, '-');
  return `ueah-certificate-${who}-${a}.png`;
}

function buildCertificateData(profile, resultsByAge, age) {
  const p = isPlainObject(profile) ? profile : {};
  const overall = getOverall(resultsByAge, age);
  const status = ageCertificateStatus(resultsByAge, age);

  const displayName = String(p.name || '').trim();
  const email = String(p.email || '').trim();

  const learnerName = displayName || email || 'Learner';
  const issuedAt = (overall && overall.at) || (status.saved.find((x) => x.last && x.last.at)?.last?.at) || '';

  const skills = status.saved.map((x) => ({
    skill: x.skill,
    score: x.last ? x.last.score : null,
    levelTitle: x.last ? String(x.last.levelTitle || '') : '',
  }));

  const ageLabel = ageLabelFor(age);
  const overallScore = overall ? overall.score : null;
  const overallTitle = overall ? String(overall.title || '') : '';

  const ieltsLine = overallTitle
    ? `UEAH recognizes this achievement to be in line with IELTS-inspired practice level: ${overallTitle}.`
    : `UEAH recognizes this achievement to be in line with IELTS-inspired practice standards.`;

  const disclaimer = isIeltsLikeAge(age)
    ? 'Note: IELTS alignment shown here is a practice estimate (not official IELTS).'
    : 'Note: Levels shown here are UEAH practice levels (IELTS-inspired).';

  return {
    age,
    ageLabel,
    learnerName,
    email,
    issuedDate: formatDateLong(issuedAt || new Date().toISOString()),
    overallScore,
    overallTitle,
    skills,
    ieltsLine,
    disclaimer,
  };
}

function skillLine(data, wantedSkills) {
  const list = Array.isArray(wantedSkills) ? wantedSkills : [];
  const bySkill = new Map();
  (data.skills || []).forEach((s) => {
    bySkill.set(String(s.skill || '').toLowerCase(), s);
  });

  return list
    .map((k) => {
      const s = bySkill.get(String(k).toLowerCase()) || null;
      const icon = skillEmoji(k);
      const label = titleCase(k);
      const score = s && s.score != null ? formatScore(s.score) : '—';
      return `${icon ? icon + ' ' : ''}${label}: ${score}/100`;
    })
    .join('  •  ');
}

function svgCertificateMarkup(data, svgId) {
  const name = safeText(data.learnerName || 'Learner');
  const email = safeText(data.email || '');
  const ageLabel = safeText(data.ageLabel || 'Age group');
  const date = safeText(data.issuedDate || '');
  const overallScore = data.overallScore == null ? '—' : safeText(formatScore(data.overallScore));
  const overallTitle = safeText(data.overallTitle || 'Not specified');
  const ieltsLine = safeText(data.ieltsLine || '');
  const disclaimer = safeText(data.disclaimer || '');

  const skillsTop = safeText(skillLine(data, ['reading', 'listening']));
  const skillsBottom = safeText(skillLine(data, ['writing', 'speaking']));

  return `
    <svg
      id="${safeText(svgId)}"
      class="ueah-certificate-svg"
      viewBox="0 0 1120 792"
      width="100%"
      role="img"
      aria-label="UEAH certificate preview"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="bgGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#0b0824"/>
          <stop offset="1" stop-color="#1b0f43"/>
        </linearGradient>

        <linearGradient id="accentGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stop-color="#7c5cfc"/>
          <stop offset="0.5" stop-color="#4fc3f7"/>
          <stop offset="1" stop-color="#f7b2ff"/>
        </linearGradient>

        <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="14" stdDeviation="16" flood-color="#000000" flood-opacity="0.35"/>
        </filter>
      </defs>

      <rect x="0" y="0" width="1120" height="792" fill="url(#bgGrad)"/>
      <circle cx="140" cy="150" r="125" fill="#7c5cfc" opacity="0.16"/>
      <circle cx="990" cy="150" r="160" fill="#f472b6" opacity="0.12"/>
      <circle cx="980" cy="660" r="180" fill="#4fc3f7" opacity="0.10"/>
      <circle cx="140" cy="650" r="150" fill="#7c5cfc" opacity="0.10"/>

      <rect x="70" y="58" width="980" height="676" rx="26" fill="rgba(24, 16, 64, 0.88)" filter="url(#softShadow)"/>
      <rect x="92" y="80" width="936" height="632" rx="22" fill="none" stroke="url(#accentGrad)" stroke-width="4"/>

      <text x="560" y="128" text-anchor="middle" font-size="18" font-weight="800" fill="#ffffff" opacity="0.95">
        💜 ULTIMATE ENGLISH AT HOME
      </text>
      <text x="560" y="210" text-anchor="middle" font-size="44" font-weight="500" font-family="Georgia, serif" fill="#ffffff">
        CERTIFICATE OF ACHIEVEMENT
      </text>
      <text x="560" y="286" text-anchor="middle" font-size="18" font-weight="500" fill="#d6d4f1" opacity="0.96">
        Presented to
      </text>
      <text x="560" y="420" text-anchor="middle" font-size="72" font-weight="400" font-family="Georgia, serif" fill="#ffffff">
        ${name}
      </text>
      ${email ? `<text x="560" y="450" text-anchor="middle" font-size="15" font-weight="600" fill="#b9b6de" opacity="0.92">${email}</text>` : ''}
      <rect x="250" y="470" width="620" height="2" rx="1" fill="url(#accentGrad)" opacity="0.65"/>
      <text x="560" y="540" text-anchor="middle" font-size="20" font-weight="500" fill="#f0eefb">
        For outstanding achievement
      </text>
      <text x="560" y="584" text-anchor="middle" font-size="22" font-weight="500" fill="#f0eefb">
        in ${ageLabel} English language learning
      </text>

      <rect x="200" y="620" width="720" height="86" rx="20" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.12)"/>
      <text x="235" y="656" text-anchor="start" font-size="15" font-weight="800" fill="#dcd9fb">Overall score</text>
      <text x="235" y="685" text-anchor="start" font-size="28" font-weight="900" fill="#ffffff">${overallScore}/100</text>
      <text x="905" y="653" text-anchor="end" font-size="13" font-weight="700" fill="#d0ccef" opacity="0.96">${skillsTop}</text>
      <text x="905" y="676" text-anchor="end" font-size="13" font-weight="700" fill="#d0ccef" opacity="0.96">${skillsBottom}</text>
      <text x="905" y="698" text-anchor="end" font-size="12" font-weight="700" fill="#9e97cf" opacity="0.92">${overallTitle}</text>

      <text x="560" y="740" text-anchor="middle" font-size="12" font-weight="600" fill="#b4addd" opacity="0.92">${ieltsLine} ${disclaimer}</text>
      <text x="120" y="740" text-anchor="start" font-size="12" font-weight="700" fill="#b4addd" opacity="0.92">Date issued: ${date}</text>
      <text x="1000" y="740" text-anchor="end" font-size="12" font-weight="700" fill="#b4addd" opacity="0.92">UEAH • Practice Certificate</text>
    </svg>
  `;
}

function pageLockedHtml(ctx, titleText, message) {
  return `
    <section class="page-top certificates-page certificates-nextgen certificates-nextgen--locked">
      ${breadcrumbs([
        { label: 'Home', href: ctx.hrefFor('/') },
        { label: 'Profile', href: ctx.hrefFor('/profile') },
        { label: 'Certificate' },
      ])}
      <div class="certificates-nextgen__hero">
        <h1 class="page-title">${emojiSpan('🏆')} ${safeText(titleText || 'Certificate')}</h1>
        <p class="page-subtitle">${emojiSpan('🔒')} Locked</p>
      </div>

      <div class="note" style="margin-top:12px">
        <strong>${emojiSpan('✅')} Unlock rule</strong>
        <p style="margin:8px 0 0; opacity:.92">
          Mastery certificates unlock when <strong>Reading, Listening, Writing, and Speaking</strong> are all saved and each score is <strong>80/100 or higher</strong>.
        </p>
        <p class="muted" style="margin:8px 0 0">${safeText(message || '')}</p>
      </div>

      <div class="actions" style="margin-top:12px; flex-wrap:wrap">
        <a class="btn btn--primary" href="${ctx.hrefFor('/profile')}" data-nav>${emojiSpan('👤')} Back to Profile</a>
        <a class="btn" href="${ctx.hrefFor('/tests')}" data-nav>${emojiSpan('🧪')} Go to Tests</a>
        <a class="btn" href="${ctx.hrefFor('/scoring')}" data-nav>${emojiSpan('📋')} Scoring plan</a>
      </div>
    </section>
  `;
}

async function svgElementToPngBlob(svgEl, scale) {
  const s = Number(scale);
  const ratio = Number.isFinite(s) && s > 0 ? s : 2;

  const clone = svgEl.cloneNode(true);
  clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

  const serializer = new XMLSerializer();
  const svgText = serializer.serializeToString(clone);

  const svgBlob = new Blob([svgText], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(svgBlob);

  try {
    const img = new Image();
    img.decoding = 'async';

    await new Promise((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject(new Error('Failed to load SVG as image'));
      img.src = url;
    });

    const bbox = svgEl.viewBox && svgEl.viewBox.baseVal ? svgEl.viewBox.baseVal : null;
    const w = bbox && bbox.width ? bbox.width : 1120;
    const h = bbox && bbox.height ? bbox.height : 792;

    const canvas = document.createElement('canvas');
    canvas.width = Math.round(w * ratio);
    canvas.height = Math.round(h * ratio);

    const ctx2d = canvas.getContext('2d');
    if (!ctx2d) throw new Error('No canvas context');

    ctx2d.drawImage(img, 0, 0, canvas.width, canvas.height);

    const blob = await new Promise((resolve) =>
      canvas.toBlob((b) => resolve(b), 'image/png', 0.92)
    );

    if (!blob) throw new Error('Failed to export PNG');
    return blob;
  } finally {
    URL.revokeObjectURL(url);
  }
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename || 'ueah-certificate.png';
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}

async function shareOrEmailPng(blob, filename, mail) {
  const subject = String(mail && mail.subject ? mail.subject : 'UEAH Certificate').trim();
  const body = String(mail && mail.body ? mail.body : '').trim();

  // Web Share API (best effort)
  try {
    const file = new File([blob], filename || 'ueah-certificate.png', { type: 'image/png' });
    if (navigator && navigator.canShare && navigator.share && navigator.canShare({ files: [file] })) {
      await navigator.share({
        title: subject,
        text: body,
        files: [file],
      });
      return { ok: true, mode: 'share' };
    }
  } catch (_) {
    // fall through to mailto
  }

  // mailto fallback (cannot attach files via mailto)
  const mailto = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
    body + (body ? '\n\n' : '') + 'Attach the saved certificate image (PNG) or the printed PDF to this email.'
  )}`;

  try {
    window.location.href = mailto;
    return { ok: true, mode: 'mailto' };
  } catch (_) {
    return { ok: false };
  }
}

/**
 * @param {Object} ctx
 * @param {string|null} mode null => best, "all" => all, else age (e.g. "8-10")
 */
export async function getView(ctx, mode) {
  const { hrefFor, profileGet } = ctx;

  const profile = (typeof profileGet === 'function' && profileGet()) || {};
  const resultsByAge = getResultsByAge(profile);

  const unlockedAges = getUnlockedAges(resultsByAge);
  const bestUnlockedAge = pickBestUnlockedAge(resultsByAge, unlockedAges);

  const rawMode = mode == null ? '' : String(mode).trim();
  const kind = rawMode === 'all' ? 'all' : rawMode ? 'age' : 'best';

  // Validate and determine target ages
  let targetAges = [];

  if (kind === 'best') {
    if (!bestUnlockedAge) {
      return {
        title: 'Certificate — UEAH',
        description: 'View and print your achievement certificate.',
        html: pageLockedHtml(
          ctx,
          'Certificate',
          'No age group is unlocked yet. Save all 4 skills at 80/100 or higher for an age group to unlock.'
        ),
        afterRender: () => {},
      };
    }
    targetAges = [bestUnlockedAge];
  } else if (kind === 'all') {
    if (unlockedAges.length === 0) {
      return {
        title: 'All certificates — UEAH',
        description: 'View and print all unlocked achievement certificates.',
        html: pageLockedHtml(
          ctx,
          'All certificates',
          'No unlocked certificates yet. Unlock at least one age group first.'
        ),
        afterRender: () => {},
      };
    }
    targetAges = unlockedAges.slice();
  } else {
    const age = rawMode;
    if (!AGE_GROUPS.includes(age)) {
      return {
        title: 'Certificate not found — UEAH',
        description: 'Certificate page not found.',
        html: `
          <section class="page-top certificates-page">
            ${breadcrumbs([
              { label: 'Home', href: hrefFor('/') },
              { label: 'Profile', href: hrefFor('/profile') },
              { label: 'Not found' },
            ])}
            <h1 class="page-title">${emojiSpan('🔎')} Not found</h1>
            <p class="page-subtitle">This certificate page does not exist.</p>
            <div class="actions" style="margin-top:12px; flex-wrap:wrap">
              <a class="btn btn--primary" href="${hrefFor('/profile')}" data-nav>${emojiSpan('👤')} Back to Profile</a>
              <a class="btn" href="${hrefFor('/')} " data-nav>${emojiSpan('🏠')} Home</a>
            </div>
          </section>
        `,
        afterRender: () => {},
        robots: 'noindex,nofollow',
      };
    }

    const status = ageCertificateStatus(resultsByAge, age);
    if (!status.allPerfect) {
      const missing = status.missing.map(titleCase).join(', ');
      const notPerfect = status.notPerfect.map(titleCase).join(', ');
      const msg = status.allSaved
        ? `All skills are saved, but mastery certificates require 80/100 or higher in each skill. Skills to improve: ${notPerfect || 'Not specified'}.`
        : `Missing saved skills: ${missing || 'Not specified'}.`;

      return {
        title: `Certificate (${age}) — UEAH`,
        description: 'View and print your achievement certificate.',
        html: pageLockedHtml(ctx, `Certificate (${age})`, msg),
        afterRender: () => {},
      };
    }

    targetAges = [age];
  }

  const certData = targetAges.map((age) => buildCertificateData(profile, resultsByAge, age));
  const learnerName = String(
    profile && profile.name ? profile.name : profile && profile.email ? profile.email : 'Learner'
  ).trim() || 'Learner';

  const title =
    kind === 'all'
      ? 'All certificates — UEAH'
      : kind === 'age'
      ? `Certificate (${targetAges[0]}) — UEAH`
      : 'Certificate — UEAH';

  const pageSubtitle =
    kind === 'all'
      ? `${emojiSpan('🧾')} All unlocked certificates`
      : kind === 'age'
      ? `${emojiSpan('🏆')} ${safeText(ageLabelFor(targetAges[0]))}`
      : `${emojiSpan('🏆')} Best unlocked certificate`;

  const topNote = (() => {
    if (kind === 'all') {
      return `
        <div class="note" style="margin-top:12px">
          <strong>${emojiSpan('🖨️')} Print tip</strong>
          <p style="margin:8px 0 0; opacity:.92">
            Use <strong>Print / Save as PDF</strong> and select “Save as PDF” in your browser.
            One certificate will print per page.
          </p>
        </div>
      `;
    }

    const age = targetAges[0];
    const label = ageLabelFor(age);
    const overall = getOverall(resultsByAge, age);
    return `
      <div class="note" style="margin-top:12px">
        <strong>${emojiSpan('✅')} Unlocked</strong>
        <p style="margin:8px 0 0; opacity:.92">
          You unlocked mastery certification for <strong>${safeText(label)}</strong> by saving all skills at <strong>80/100 or higher</strong>.
        </p>
        ${
          overall
            ? `<p class="muted" style="margin:8px 0 0">Overall: <strong>${safeText(
                formatScore(overall.score)
              )}</strong>/100${overall.title ? ` • ${safeText(overall.title)}` : ''}</p>`
            : ''
        }
      </div>
    `;
  })();

  const certSheetsHtml = certData
    .map((d) => {
      const svgId = `cert-svg-${String(d.age).replaceAll(/[^a-z0-9]+/g, '-')}`;
      const label = safeText(d.ageLabel);
      return `
        <article class="ueah-certificate-sheet" data-cert-age="${safeText(d.age)}" aria-label="Certificate for ${label}">
          ${svgCertificateMarkup(d, svgId)}
        </article>
      `;
    })
    .join('');

  const html = `
    <section class="page-top certificates-page certificates-nextgen">
      ${breadcrumbs([
        { label: 'Home', href: hrefFor('/') },
        { label: 'Profile', href: hrefFor('/profile') },
        { label: 'Certificate' },
      ])}
      <h1 class="page-title">${emojiSpan('🏆')} Certificates</h1>
      <p class="page-subtitle">${pageSubtitle}</p>

      <div class="actions" style="margin-top:12px; flex-wrap:wrap">
        <a class="btn" href="${hrefFor('/profile')}" data-nav>${emojiSpan('👤')} Back to Profile</a>

        <button class="btn btn--primary" type="button" id="cert-print" aria-label="Print or save as PDF">
          ${emojiSpan('🖨️')} Print / Save as PDF
        </button>

        ${
          kind === 'all'
            ? `
              <button class="btn" type="button" id="cert-save-png-all" aria-label="Save all certificates as PNG images">
                ${emojiSpan('🖼️')} Save images (PNG)
              </button>
            `
            : `
              <button class="btn" type="button" id="cert-save-png" aria-label="Save this certificate as a PNG image">
                ${emojiSpan('🖼️')} Save image (PNG)
              </button>

              <button class="btn" type="button" id="cert-share" aria-label="Share or email this certificate">
                ${emojiSpan('✉️')} Share / Email
              </button>
            `
        }

        ${
          kind !== 'all' && unlockedAges.length >= 2
            ? `<a class="btn" href="${hrefFor('/profile/certificates/all')}" data-nav aria-label="View and print all unlocked certificates">${emojiSpan('🧾')} Print all</a>`
            : ''
        }
      </div>

      ${topNote}

      <p id="cert-status" class="muted" aria-live="polite" role="status" style="margin:10px 0 0"></p>

      <div class="ueah-certificate-wrap" style="margin-top:14px">
        ${certSheetsHtml}
      </div>

      <div class="note" style="margin-top:14px">
        <strong>${emojiSpan('🛡️')} Note</strong>
        <p style="margin:8px 0 0; opacity:.92">
          This certificate is generated from your saved scores on this device.
          If you clear your browser storage, you may lose your saved profile data.
        </p>
      </div>

      <div class="actions" style="margin-top:12px; flex-wrap:wrap">
        <a class="btn" href="${hrefFor('/tests')}" data-nav>${emojiSpan('🧪')} Go to Tests</a>
        <a class="btn" href="${hrefFor('/resources')}" data-nav>${emojiSpan('📚')} Resources</a>
        <a class="btn" href="${hrefFor('/scoring')}" data-nav>${emojiSpan('📋')} Scoring plan</a>
      </div>
    </section>
  `;

  const afterRender = function () {
    const statusEl = document.getElementById('cert-status');

    function setStatus(msg) {
      if (!statusEl) return;
      statusEl.textContent = String(msg || '');
    }

    const printBtn = document.getElementById('cert-print');
    const saveBtn = document.getElementById('cert-save-png');
    const saveAllBtn = document.getElementById('cert-save-png-all');
    const shareBtn = document.getElementById('cert-share');

    if (printBtn) {
      printBtn.addEventListener('click', () => {
        setStatus('Opening print dialog…');
        try {
          window.print();
        } catch (_) {
          setStatus('Could not open print dialog.');
        }
      });
    }

    // Save single certificate
    if (saveBtn) {
      saveBtn.addEventListener('click', async () => {
        const sheet = document.querySelector('.ueah-certificate-sheet');
        const svg = sheet ? sheet.querySelector('svg') : null;
        if (!svg) {
          setStatus('Could not find certificate preview.');
          return;
        }

        setStatus('Preparing image…');
        try {
          const blob = await svgElementToPngBlob(svg, 2);
          const filename = certificateFilename(learnerName, targetAges[0]);
          downloadBlob(blob, filename);
          setStatus('Saved image.');
        } catch (_) {
          setStatus('Could not save image.');
        }
      });
    }

    // Save all certificates (downloads multiple PNGs)
    if (saveAllBtn) {
      saveAllBtn.addEventListener('click', async () => {
        const sheets = Array.from(document.querySelectorAll('.ueah-certificate-sheet'));
        if (sheets.length === 0) {
          setStatus('Could not find certificate previews.');
          return;
        }

        setStatus('Preparing images…');
        try {
          for (const sheet of sheets) {
            const svg = sheet.querySelector('svg');
            const age = String(sheet.getAttribute('data-cert-age') || '').trim();
            if (!svg || !age) continue;

            const blob = await svgElementToPngBlob(svg, 2);
            const filename = certificateFilename(learnerName, age);
            downloadBlob(blob, filename);

            // small delay to avoid throttling multiple downloads
            // eslint-disable-next-line no-await-in-loop
            await new Promise((r) => setTimeout(r, 250));
          }
          setStatus('Saved images.');
        } catch (_) {
          setStatus('Could not save images.');
        }
      });
    }

    // Share/email single certificate
    if (shareBtn) {
      shareBtn.addEventListener('click', async () => {
        const sheet = document.querySelector('.ueah-certificate-sheet');
        const svg = sheet ? sheet.querySelector('svg') : null;
        if (!svg) {
          setStatus('Could not find certificate preview.');
          return;
        }

        const d = certData && certData[0] ? certData[0] : null;
        const subject = d ? `UEAH Certificate — ${d.ageLabel}` : 'UEAH Certificate';
        const body = d
          ? `Certificate details:\n\nName: ${d.learnerName}\nAge group: ${d.ageLabel}\nOverall: ${d.overallTitle || 'Not specified'} (${d.overallScore == null ? '—' : formatScore(d.overallScore)}/100)\nDate: ${d.issuedDate}\n\n${d.disclaimer}`
          : 'UEAH Certificate';

        setStatus('Preparing share…');
        try {
          const blob = await svgElementToPngBlob(svg, 2);
          const filename = certificateFilename(learnerName, targetAges[0]);

          const result = await shareOrEmailPng(blob, filename, { subject, body });
          if (result && result.ok) {
            setStatus(result.mode === 'share' ? 'Share opened.' : 'Email draft opened.');
          } else {
            setStatus('Could not share or email.');
          }
        } catch (_) {
          setStatus('Could not share or email.');
        }
      });
    }
  };

  return { title, description: 'View and print your achievement certificates.', html, afterRender };
}
