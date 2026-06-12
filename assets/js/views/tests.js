/* assets/js/views/tests.js
   Tests listing view for Ultimate English At Home.
   Groups Age+Skill tests by age, and moves IELTS tests to the end.
*/

import { breadcrumbs, card, escapeHtml, iconSkill } from '../common.js';
import { getTestsMissingView } from './error.js';

export function getView(ctx) {
  const { hrefFor } = ctx;

  if (!ctx.testsStoreAvailable) {
    return getTestsMissingView(ctx);
  }

  const allTests = typeof ctx.testsGetAll === 'function' ? ctx.testsGetAll() : [];
  const tests = Array.isArray(allTests) ? allTests : [];
  const hasTests = tests.length > 0;

  const title = 'Tests - UEAH';
  const description = 'Take free practice tests for reading, listening, writing, and speaking.';

  const breadcrumb = breadcrumbs([
    { label: 'Home', href: hrefFor('/') },
    { label: 'Tests' },
  ]);

  const AGE_ORDER = ['0-3', '4-7', '8-10', '11-12', '13-18'];
  const SKILL_ORDER = ['reading', 'listening', 'writing', 'speaking'];

  const GLOW_BY_SKILL = {
    reading: 'green',
    listening: 'blue',
    writing: 'orange',
    speaking: 'red',
  };

  const HERO_META = {
    '0-3': { label: 'Little Learners', tag: 'Kids', avatar: '0-3', tone: 'kids', glow: 'orange', desc: 'Big buttons, warm prompts, and caregiver-friendly practice.', jump: 'age-0-3' },
    '4-7': { label: 'Early Explorers', tag: 'Kids', avatar: '4-7', tone: 'kids', glow: 'yellow', desc: 'Friendly skills practice for new readers and listeners.', jump: 'age-4-7' },
    '8-10': { label: 'Skill Builders', tag: 'Pre-teens', avatar: '8-10', tone: 'bridge', glow: 'blue', desc: 'Balanced tests for stronger reading, listening, and writing.', jump: 'age-8-10' },
    '11-12': { label: 'Junior Pathway', tag: 'Teens', avatar: '11-12', tone: 'teen', glow: 'green', desc: 'Modern practice for more independent learners.', jump: 'age-11-12' },
    '13-18': { label: 'Exam Ready', tag: 'Teens & adults', avatar: '13-18', tone: 'adult', glow: 'purple', desc: 'Sleek IELTS-inspired work for advanced progress.', jump: 'age-13-18' },
    ielts: { label: 'IELTS Studio', tag: 'Advanced', avatar: 'IELTS', tone: 'adult', glow: 'purple', desc: 'Focused IELTS-style practice across all four skills.', jump: 'age-ielts' },
  };

  function isIeltsTest(t) {
    const slug = String(t?.slug || '').toLowerCase();
    return slug.startsWith('iels-') || slug.startsWith('ielts-');
  }

  function displayAge(age) {
    return String(age || '').replace('-', '-');
  }

  function safeSkillKey(skill) {
    return String(skill || '').toLowerCase();
  }

  function getProfileSummary() {
    const empty = { name: 'Learner', completed: 0, average: 0, streak: 0 };
    try {
      const store = window.UEAH_PROFILE_STORE;
      const profile = store && typeof store.getProfile === 'function' ? store.getProfile() : null;
      const resultsByAge = profile && profile.resultsByAge && typeof profile.resultsByAge === 'object'
        ? profile.resultsByAge
        : {};
      const scores = [];
      const days = new Set();

      Object.values(resultsByAge).forEach((bucket) => {
        if (!bucket || typeof bucket !== 'object') return;
        SKILL_ORDER.forEach((skill) => {
          const last = bucket[skill] && bucket[skill].lastScore;
          const score = Number(last && last.score);
          if (Number.isFinite(score)) {
            scores.push(score);
            const day = String(last.at || '').slice(0, 10);
            if (day) days.add(day);
          }
        });
      });

      const average = scores.length
        ? Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length)
        : 0;

      return {
        name: profile && profile.name ? String(profile.name).trim() || empty.name : empty.name,
        completed: scores.length,
        average,
        streak: days.size,
      };
    } catch (_) {
      return empty;
    }
  }

  function getFeaturedTestForHero(key) {
    if (key === 'ielts') return ieltsTests[0] || null;
    return (byAge.get(key) || [])[0] || null;
  }

  function renderTestCard(t, { glow } = {}) {
    const skillKey = safeSkillKey(t.skill);
    const cardGlow = glow || GLOW_BY_SKILL[skillKey] || 'blue';
    const html = card({
      href: hrefFor(`/tests/${t.slug}`),
      title: t.title || 'Test',
      text: t.subtitle || 'Test your ability',
      icon: iconSkill(skillKey),
      ctaText: '',
      glow: cardGlow,
    });

    return html.replace('class="card"', `class="card test-skill-card" data-skill="${escapeHtml(skillKey)}"`);
  }

  const ieltsTests = [];
  const regularTests = [];

  tests.forEach((t) => {
    if (isIeltsTest(t)) ieltsTests.push(t);
    else regularTests.push(t);
  });

  const byAge = new Map();
  AGE_ORDER.forEach((age) => byAge.set(age, []));

  regularTests.forEach((t) => {
    const age = String(t?.age || '');
    if (!byAge.has(age)) byAge.set(age, []);
    byAge.get(age).push(t);
  });

  for (const [, group] of byAge.entries()) {
    group.sort((a, b) => {
      const aSkill = safeSkillKey(a.skill);
      const bSkill = safeSkillKey(b.skill);
      const ai = SKILL_ORDER.indexOf(aSkill);
      const bi = SKILL_ORDER.indexOf(bSkill);
      const aRank = ai === -1 ? 999 : ai;
      const bRank = bi === -1 ? 999 : bi;
      if (aRank !== bRank) return aRank - bRank;
      return String(a.title || '').toLowerCase().localeCompare(String(b.title || '').toLowerCase());
    });
  }

  ieltsTests.sort((a, b) => {
    const aSkill = safeSkillKey(a.skill);
    const bSkill = safeSkillKey(b.skill);
    const ai = SKILL_ORDER.indexOf(aSkill);
    const bi = SKILL_ORDER.indexOf(bSkill);
    const aRank = ai === -1 ? 999 : ai;
    const bRank = bi === -1 ? 999 : bi;
    if (aRank !== bRank) return aRank - bRank;
    return String(a.title || '').toLowerCase().localeCompare(String(b.title || '').toLowerCase());
  });

  const profileSummary = getProfileSummary();
  const progressPercent = Math.max(0, Math.min(100, profileSummary.average || 0));

  const heroCards = [
    ...AGE_ORDER.filter((age) => (byAge.get(age) || []).length),
    ...(ieltsTests.length ? ['ielts'] : []),
  ];

  const heroHtml = heroCards
    .map((key) => {
      const meta = HERO_META[key];
      const count = key === 'ielts' ? ieltsTests.length : (byAge.get(key) || []).length;
      const featuredTest = getFeaturedTestForHero(key);
      const heroHref = featuredTest ? hrefFor(`/tests/${featuredTest.slug}`) : `#${meta.jump}`;
      const heroAttrs = featuredTest
        ? `href="${heroHref}" data-nav aria-label="Open ${escapeHtml(meta.label)} featured test"`
        : `href="${heroHref}" data-tests-jump aria-label="Open ${escapeHtml(meta.label)} tests"`;

      return `
        <a class="tests-hero-card" ${heroAttrs} data-glow="${meta.glow}" data-age-tone="${meta.tone}">
          <div class="tests-hero-card__top">
            <div class="tests-hero-card__avatar" aria-hidden="true">${escapeHtml(meta.avatar)}</div>
            <span class="tests-hero-card__tag">${escapeHtml(meta.tag)}</span>
          </div>
          <h2 class="tests-hero-card__title">${escapeHtml(meta.label)}</h2>
          <p class="tests-hero-card__desc">${escapeHtml(meta.desc)}</p>
          <div class="tests-hero-card__footer">
            <span class="tests-hero-card__count">${count} test${count === 1 ? '' : 's'}</span>
            <span class="tests-hero-card__cta">Open path</span>
          </div>
        </a>
      `;
    })
    .join('');

  let sectionsHtml = '';

  if (hasTests) {
    AGE_ORDER.forEach((age) => {
      const group = byAge.get(age) || [];
      if (!group.length) return;

      const ageLabel = displayAge(age);
      const cardsHtml = group.map((t) => renderTestCard(t)).join('');

      sectionsHtml += `
        <section id="age-${age}" class="tests-section tests-section--nextgen" aria-label="Tests for ages ${ageLabel}">
          <div class="tests-section__head">
            <h2 class="section-title">Ages ${ageLabel}</h2>
            <p class="tests-section__meta">${group.length} test${group.length === 1 ? '' : 's'} available</p>
          </div>
          <div class="card-grid" role="list">${cardsHtml}</div>
        </section>
      `;
    });

    for (const [age, group] of byAge.entries()) {
      if (AGE_ORDER.includes(age)) continue;
      if (!group.length) continue;

      const ageLabel = displayAge(age) || 'Not specified';
      const cardsHtml = group.map((t) => renderTestCard(t)).join('');

      sectionsHtml += `
        <section id="age-${age}" class="tests-section tests-section--nextgen" aria-label="Tests for ages ${ageLabel}">
          <div class="tests-section__head">
            <h2 class="section-title">Ages ${ageLabel}</h2>
            <p class="tests-section__meta">${group.length} test${group.length === 1 ? '' : 's'} available</p>
          </div>
          <div class="card-grid" role="list">${cardsHtml}</div>
        </section>
      `;
    }

    if (ieltsTests.length) {
      const ieltsCards = ieltsTests.map((t) => renderTestCard(t, { glow: 'purple' })).join('');
      sectionsHtml += `
        <section id="age-ielts" class="tests-section tests-section--nextgen" aria-label="IELTS tests">
          <div class="tests-section__head">
            <h2 class="section-title">IELTS</h2>
            <p class="tests-section__meta">${ieltsTests.length} test${ieltsTests.length === 1 ? '' : 's'} available</p>
          </div>
          <div class="card-grid" role="list">${ieltsCards}</div>
        </section>
      `;
    }
  }

  const html = `
    <section class="page-top tests-page tests-nextgen">
      ${breadcrumb}
      <div class="tests-hero">
        <div>
          <span class="tests-hero__eyebrow">Practice dashboard</span>
          <h1 class="page-title tests-hero__title">Choose your English test path</h1>
          <p class="page-subtitle tests-hero__subtitle">
            Age-specific, IELTS-inspired tests with clearer skill paths, encouraging progress, and live browser audio.
          </p>
        </div>
        <aside class="tests-dashboard-card" aria-label="Learner progress">
          <div>
            <p class="tests-dashboard-card__welcome">Welcome back, ${escapeHtml(profileSummary.name)}! <span aria-hidden="true">&#10024;</span></p>
            <p class="tests-dashboard-card__meta">${profileSummary.completed} completed test${profileSummary.completed === 1 ? '' : 's'} | ${profileSummary.streak} active day${profileSummary.streak === 1 ? '' : 's'}</p>
          </div>
          <div class="tests-progress-ring" style="--progress:${progressPercent}" aria-label="Average score ${progressPercent}%">
            <span>${progressPercent}%</span>
          </div>
        </aside>
      </div>

      ${
        hasTests
          ? `
            <div class="tests-hero-grid" aria-label="Featured test paths">${heroHtml}</div>
            <div class="tests-sections-wrap" aria-label="Tests">${sectionsHtml}</div>
          `
          : `
            <div class="note">
              <strong>Coming soon:</strong> tests will appear here.
            </div>
          `
      }

      <div class="actions">
        <a class="btn" href="${hrefFor('/')}" data-nav>Back to Home</a>
        <a class="btn" href="${hrefFor('/resources')}" data-nav>Resources</a>
      </div>
    </section>
  `;

  const afterRender = () => {
    const links = Array.from(document.querySelectorAll('[data-tests-jump]'));
    links.forEach((link) => {
      link.addEventListener('click', (e) => {
        const href = String(link.getAttribute('href') || '');
        if (!href.startsWith('#')) return;
        const target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  };

  return { title, description, html, afterRender };
}
