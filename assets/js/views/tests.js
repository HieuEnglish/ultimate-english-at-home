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

  // Split IELTS tests (always last)
  const ieltsTests = [];
  const regularTests = [];

  tests.forEach((t) => {
    if (isIeltsTest(t)) ieltsTests.push(t);
    else regularTests.push(t);
  });

  // Group regular tests by age
  const byAge = new Map();
  AGE_ORDER.forEach((age) => byAge.set(age, []));

  regularTests.forEach((t) => {
    const age = String(t?.age || '');
    if (!byAge.has(age)) byAge.set(age, []);
    byAge.get(age).push(t);
  });

  // Sort each age group by skill order, then title
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

  // Sort IELTS tests (keep stable, but also consistent order)
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

  let sectionsHtml = '';

  if (hasTests) {
    // Preferred: 5 age sections (only if there are tests for that age)
    AGE_ORDER.forEach((age) => {
      const group = byAge.get(age) || [];
      if (!group.length) return;

      const ageLabel = displayAge(age);
      const cardsHtml = group.map((t) => renderTestCard(t)).join('');

      sectionsHtml += `
        <section class="tests-section" aria-label="Tests for ages ${ageLabel}">
          <h2 class="section-title">Ages ${ageLabel}</h2>
          <div class="card-grid" role="list">${cardsHtml}</div>
        </section>
      `;
    });

    // Any additional (non-standard) ages, if present
    for (const [age, group] of byAge.entries()) {
      if (AGE_ORDER.includes(age)) continue;
      if (!group.length) continue;

      const ageLabel = displayAge(age) || 'Not specified';
      const cardsHtml = group.map((t) => renderTestCard(t)).join('');

      sectionsHtml += `
        <section class="tests-section" aria-label="Tests for ages ${ageLabel}">
          <h2 class="section-title">Ages ${ageLabel}</h2>
          <div class="card-grid" role="list">${cardsHtml}</div>
        </section>
      `;
    }

    // IELTS section last (robust even if load order changes)
    if (ieltsTests.length) {
      const ieltsCards = ieltsTests
        .map((t) => renderTestCard(t, { glow: 'iels' }))
        .join('');

      sectionsHtml += `
        <section class="tests-section" aria-label="IELTS tests">
          <h2 class="section-title">IELTS</h2>
          <div class="card-grid" role="list">${ieltsCards}</div>
        </section>
      `;
    }
  }

  const html = `
    <section class="page-top tests-page">
      ${breadcrumb}
      <h1 class="page-title">Tests</h1>
      <p class="page-subtitle">Choose a test.</p>

      ${
        hasTests
          ? `<div aria-label="Tests">${sectionsHtml}</div>`
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

  return { title, description, html };
}
