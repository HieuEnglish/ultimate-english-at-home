/* assets/js/views/tests.js
   Tests listing view for Ultimate English At Home.
   Groups Age+Skill tests by age, and moves IELTS tests to the end.
*/

import { breadcrumbs, card, iconSkill } from '../common.js';
import { getTestsMissingView } from './error.js';

export function getView(ctx) {
  const { hrefFor } = ctx;

  // If the tests store is not loaded, show the missing page
  if (!ctx.testsStoreAvailable) {
    return getTestsMissingView(ctx);
  }

  const allTests = typeof ctx.testsGetAll === 'function' ? ctx.testsGetAll() : [];
  const tests = Array.isArray(allTests) ? allTests : [];
  const hasTests = tests.length > 0;

  const title = 'Tests — UEAH';
  const description = 'Take free practice tests for reading, listening, writing, and speaking.';

  const breadcrumb = breadcrumbs([
    { label: 'Home', href: hrefFor('/') },
    { label: 'Tests' },
  ]);

  const AGE_ORDER = ['0-3', '4-7', '8-10', '11-12', '13-18'];
  const SKILL_ORDER = ['reading', 'listening', 'writing', 'speaking'];

  const GLOW_BY_SKILL = {
    reading: 'blue',
    listening: 'green',
    writing: 'pink',
    speaking: 'purple',
  };

  const HERO_META = {
    '0-3': { label: 'Kids', emoji: '🤖', glow: 'blue', desc: 'Tests designed for younger learners', jump: 'age-0-3' },
    '4-7': { label: 'Kids+', emoji: '🪁', glow: 'yellow', desc: 'Early foundation tests for beginner readers and listeners', jump: 'age-4-7' },
    '8-10': { label: 'Pre-Teens', emoji: '🚀', glow: 'orange', desc: 'Tests tailored for learners building stronger core skills', jump: 'age-8-10' },
    '11-12': { label: 'Teens', emoji: '🧳', glow: 'blue', desc: 'Tests focused on more independent practice', jump: 'age-11-12' },
    '13-18': { label: 'Adults', emoji: '📋', glow: 'purple', desc: 'Tests suited for advanced learners and exam pathways', jump: 'age-13-18' },
    ielts: { label: 'All Ages', emoji: '🎯', glow: 'purple', desc: 'IELTS-style practice suitable for any advanced learner', jump: 'age-ielts' },
  };

  function isIeltsTest(t) {
    const slug = String(t?.slug || '').toLowerCase();
    return slug.startsWith('iels-') || slug.startsWith('ielts-');
  }

  function displayAge(age) {
    return String(age || '').replace('-', '–');
  }

  function safeSkillKey(skill) {
    return String(skill || '').toLowerCase();
  }

  function getFeaturedTestForHero(key) {
    if (key === 'ielts') return ieltsTests[0] || null;
    return (byAge.get(key) || [])[0] || null;
  }

  function renderTestCard(t, { glow } = {}) {
    const skillKey = safeSkillKey(t.skill);
    const cardGlow = glow || GLOW_BY_SKILL[skillKey] || 'blue';

    return card({
      href: hrefFor(`/tests/${t.slug}`),
      title: t.title || 'Test',
      text: t.subtitle || 'Test your ability',
      icon: iconSkill(skillKey),
      ctaText: '',
      glow: cardGlow,
    });
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

      const at = String(a.title || '').toLowerCase();
      const bt = String(b.title || '').toLowerCase();
      return at.localeCompare(bt);
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

    const at = String(a.title || '').toLowerCase();
    const bt = String(b.title || '').toLowerCase();
    return at.localeCompare(bt);
  });

  const heroCards = [
    ...AGE_ORDER.filter((age) => (byAge.get(age) || []).length).slice(0, 4),
    ...(ieltsTests.length ? ['ielts'] : []),
  ].slice(0, 4);

  const heroHtml = heroCards
    .map((key) => {
      const meta = HERO_META[key];
      const count = key === 'ielts' ? ieltsTests.length : (byAge.get(key) || []).length;
      const featuredTest = getFeaturedTestForHero(key);
      const heroHref = featuredTest ? hrefFor(`/tests/${featuredTest.slug}`) : `#${meta.jump}`;
      const heroAttrs = featuredTest
        ? `href="${heroHref}" data-nav aria-label="Open ${meta.label} featured test"`
        : `href="${heroHref}" data-tests-jump aria-label="Open ${meta.label} tests"`;
      return `
        <a class="tests-hero-card" ${heroAttrs} data-glow="${meta.glow}">
          <div class="tests-hero-card__icon" aria-hidden="true">${meta.emoji}</div>
          <h2 class="tests-hero-card__title">${meta.label}</h2>
          <p class="tests-hero-card__desc">${meta.desc}</p>
          <div class="tests-hero-card__footer">
            <span class="tests-hero-card__count">${count} test${count === 1 ? '' : 's'}</span>
            <span class="tests-hero-card__cta">Start Test</span>
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
        <h1 class="page-title tests-hero__title">Premium English Tests</h1>
        <p class="page-subtitle tests-hero__subtitle">
          Practice advanced English skills through age-specific, IELTS-inspired tests designed for confident home learning.
        </p>
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
        <a class="btn" href="${hrefFor('/')}" data-nav>← Back to Home</a>
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
