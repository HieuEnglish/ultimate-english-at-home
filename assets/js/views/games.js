/* assets/js/views/games.js
   Games index view - Age selection for Ultimate English At Home.
*/

import { GAME_AGE_GROUPS } from '../constants.js';
import { breadcrumbs } from '../common.js';

const AGE_INFO = {
  '0-3': { emoji: '🧒', label: 'Kids', range: '0-3', sublabel: 'Tap, listen, and playful first wins', glow: 'green' },
  '4-7': { emoji: '🎨', label: 'Kids+', range: '4-7', sublabel: 'Phonics, early reading, and quick fun loops', glow: 'yellow' },
  '8-10': { emoji: '🚀', label: 'Pre-Teens', range: '8-10', sublabel: 'Vocabulary building and confidence games', glow: 'blue' },
  '11-12': { emoji: '🧠', label: 'Teens', range: '11-12', sublabel: 'Grammar, strategy, and sharper challenge play', glow: 'purple' },
  '13-18': { emoji: '🎓', label: 'Adults', range: '13-18', sublabel: 'Advanced speaking and stronger skill drills', glow: 'pink' },
};

function buildStats() {
  if (!window.UEAH_GAME_SCORES) return null;
  const stats = window.UEAH_GAME_SCORES.getTotalStats();
  if (!stats || stats.totalPlays <= 0) return null;

  return {
    gamesPlayed: Number(stats.gamesPlayed || 0),
    totalScore: Number(stats.totalScore || 0),
  };
}

export function getView(ctx) {
  const { hrefFor } = ctx;
  const title = 'Games — UEAH';
  const description = 'Play interactive English learning games by age group!';

  const breadcrumb = breadcrumbs([
    { label: 'Home', href: hrefFor('/') },
    { label: 'Games' },
  ]);

  const ageCards = GAME_AGE_GROUPS.map((age) => {
    const info = AGE_INFO[age] || { emoji: '🎮', label: age, range: age, sublabel: 'Games', glow: 'green' };
    return `
      <a class="games-hub-card" href="${hrefFor(`/games/${age}`)}" data-nav role="listitem" data-glow="${info.glow}">
        <div class="games-hub-card__avatar" aria-hidden="true">${info.emoji}</div>
        <div class="games-hub-card__meta">
          <span class="games-hub-card__range">${info.range}</span>
          <span class="games-hub-card__badge">❤</span>
        </div>
        <h2 class="games-hub-card__title">${info.label}</h2>
        <p class="games-hub-card__desc">${info.sublabel}</p>
      </a>
    `;
  }).join('');

  const ieltsGames = [
    { slug: 'ielts-runner', icon: '✈️', title: 'IELTS Sky Quest', tag: 'Open world', desc: 'Explore the skies and collect IELTS challenges.' },
    { slug: 'ielts-invaders', icon: '🚀', title: 'IELTS Invaders', tag: 'Arcade shooter', desc: 'Answer accurately to charge shields and rapid fire.' },
    { slug: 'ielts-snake', icon: '🐍', title: 'Band Score Snake', tag: 'Classic snake', desc: 'Collect academic words and unlock slow time.' },
    { slug: 'ielts-breakout', icon: '🧱', title: 'IELTS Breakout', tag: 'Brick breaker', desc: 'Win multiball and smash through vocabulary blocks.' },
  ];
  const featuredCard = `
    <section class="ielts-arcade" aria-labelledby="ielts-arcade-title">
      <div class="ielts-arcade__heading">
        <div><span class="resources-hero__label">IELTS level</span><h2 id="ielts-arcade-title">IELTS Arcade</h2></div>
        <p>Classic hits. Academic English power-ups.</p>
      </div>
      <div class="ielts-arcade__grid" role="list">
        ${ieltsGames.map((item) => `
          <a class="ielts-arcade-card" href="${hrefFor(`/games/featured/comprehensive/${item.slug}`)}" data-nav role="listitem">
            <span class="ielts-arcade-card__icon" aria-hidden="true">${item.icon}</span>
            <span class="ielts-arcade-card__tag">${item.tag}</span>
            <strong>${item.title}</strong><span>${item.desc}</span>
            <em>Play now →</em>
          </a>`).join('')}
      </div>
    </section>`;

  const stats = buildStats();
  const statsHtml = stats
    ? `
      <section class="games-dashboard">
        <h2 class="games-dashboard__title">Game Stats</h2>
        <div class="games-dashboard__grid">
          <div class="games-dashboard__panel games-dashboard__panel--violet">
            <div class="games-dashboard__ring">🎮</div>
            <div class="games-dashboard__content">
              <div class="games-dashboard__row"><strong>Games played</strong><span>${stats.gamesPlayed}</span></div>
              <div class="games-dashboard__bar"><span style="width:${Math.min(100, stats.gamesPlayed * 8)}%"></span></div>
            </div>
          </div>
          <div class="games-dashboard__panel games-dashboard__panel--gold">
            <div class="games-dashboard__ring">🏆</div>
            <div class="games-dashboard__content">
              <div class="games-dashboard__row"><strong>Total points</strong><span>${stats.totalScore}</span></div>
              <div class="games-dashboard__bar"><span style="width:${Math.min(100, Math.max(10, stats.totalScore / 10))}%"></span></div>
            </div>
          </div>
          <div class="games-dashboard__achievements">
            <div class="games-badge-card"><span aria-hidden="true">🏆</span><strong>Champion</strong></div>
            <div class="games-badge-card"><span aria-hidden="true">💎</span><strong>Perfect Streak</strong></div>
            <div class="games-badge-card"><span aria-hidden="true">💡</span><strong>Fast Learner</strong></div>
          </div>
        </div>
      </section>
    `
    : '';

  const html = `
    <section class="page-top games-page games-nextgen games-hub">
      ${breadcrumb}
      <div class="subpage-hero games-hub__hero">
        <span class="resources-hero__label">Play + practice</span>
        <h1 class="page-title">Next-Gen Games</h1>
        <p class="page-subtitle">Learning English through play and skill-building games.</p>
      </div>

      <div class="games-hub-grid" role="list">
        <div class="games-hub-grid__ages">${ageCards}</div>
        <div class="games-hub-grid__featured">${featuredCard}</div>
      </div>

      ${statsHtml}

      <div class="actions">
        <a class="btn" href="${hrefFor('/')}" data-nav>← Back to Home</a>
      </div>
    </section>
  `;

  return { title, description, html };
}
