/* assets/js/views/test-detail.js
   Test detail view for Ultimate English At Home.
   Shows details for an individual test. If the tests store is missing or
   the test cannot be found, delegates to appropriate fallback views.
*/

import { breadcrumbs, escapeHtml, iconAge, iconSkill } from '../common.js';
import { getTestsMissingView } from './error.js';
import { getView as getNotFoundView } from './not-found.js';

function isAudioSkill(skill) {
  return skill === 'listening' || skill === 'speaking';
}

function skillLabel(skill) {
  const key = String(skill || '').trim().toLowerCase();
  if (!key) return 'Practice';
  return key.charAt(0).toUpperCase() + key.slice(1);
}

function ageKeyForTest(test) {
  const raw = String(test && test.age ? test.age : '').trim().toLowerCase();
  if (raw) return raw;
  return String(test && test.slug ? test.slug : '').startsWith('iels-') ? 'ielts' : '13-18';
}

function ageTheme(ageKey) {
  if (ageKey === '0-3') {
    return {
      label: 'Ages 0-3',
      vibe: 'Tiny steps, bright wins',
      accent: '#ff9e6d',
      soft: 'rgba(255, 158, 109, .20)'
    };
  }
  if (ageKey === '4-7') {
    return {
      label: 'Ages 4-7',
      vibe: 'Playful and high-energy',
      accent: '#ffd166',
      soft: 'rgba(255, 209, 102, .20)'
    };
  }
  if (ageKey === '8-10') {
    return {
      label: 'Ages 8-10',
      vibe: 'Curious and adventurous',
      accent: '#34d4c2',
      soft: 'rgba(52, 212, 194, .20)'
    };
  }
  if (ageKey === '11-12') {
    return {
      label: 'Ages 11-12',
      vibe: 'Focused and confident',
      accent: '#59c3ff',
      soft: 'rgba(89, 195, 255, .20)'
    };
  }
  if (ageKey === 'ielts') {
    return {
      label: 'IELTS track',
      vibe: 'Exam-style momentum',
      accent: '#F59E0B',
      soft: 'rgba(245, 158, 11, .18)'
    };
  }
  return {
    label: 'Ages 13-18',
    vibe: 'Sharp and expressive',
    accent: '#8d83ff',
    soft: 'rgba(141, 131, 255, .20)'
  };
}

function skillTheme(skill) {
  const key = String(skill || '').trim().toLowerCase();
  if (key === 'reading') {
    return {
      label: 'Reading focus',
      accent: '#38BDF8',
      accentAlt: '#6C63FF',
      summary: 'Visual prompts, focused choices, and clearer reading flow.'
    };
  }
  if (key === 'listening') {
    return {
      label: 'Listening focus',
      accent: '#00C9A7',
      accentAlt: '#6C63FF',
      summary: 'Audio-led practice with faster controls and stronger cues.'
    };
  }
  if (key === 'writing') {
    return {
      label: 'Writing focus',
      accent: '#FBBF24',
      accentAlt: '#6C63FF',
      summary: 'Cleaner prompts, warmer feedback, and a brighter writing studio.'
    };
  }
  return {
    label: 'Speaking focus',
    accent: '#FB7185',
    accentAlt: '#6C63FF',
    summary: 'More confident speaking flow, richer prompts, and clearer coaching.'
  };
}

function testTheme(test) {
  const ageKey = ageKeyForTest(test);
  const age = ageTheme(ageKey);
  const skill = skillTheme(test && test.skill);
  return {
    ageKey,
    ageLabel: age.label,
    vibe: age.vibe,
    ageAccent: age.accent,
    ageSoft: age.soft,
    skillLabel: skill.label,
    accent: skill.accent,
    accentAlt: skill.accentAlt,
    trackAccent: ageKey === 'ielts' ? age.accent : skill.accent,
    summary: skill.summary,
    mode: isAudioSkill(test && test.skill) ? 'Audio-guided practice' : 'Interactive practice'
  };
}

function skillStatValues(test, theme) {
  const skill = String(test && test.skill ? test.skill : '').toLowerCase();
  const ageKey = theme.ageKey;
  const isIelts = ageKey === 'ielts';
  if (skill === 'listening') {
    return { energy: isIelts ? 'Part-by-part audio' : 'Audio cues', focus: 'Careful listening', feel: 'Steady pace' };
  }
  if (skill === 'reading') {
    return { energy: isIelts ? 'Passage rhythm' : 'Text discovery', focus: 'Details + meaning', feel: 'Calm focus' };
  }
  if (skill === 'writing') {
    return { energy: isIelts ? 'Task practice' : 'Idea builder', focus: 'Clear answers', feel: 'Creative flow' };
  }
  return { energy: isIelts ? 'Interview mode' : 'Voice practice', focus: 'Fluency + clarity', feel: 'Confident reps' };
}

function audioSettingsPanelHtml(slug) {
  const providerId = `tts-provider-${slug}`;
  const voiceId = `tts-voice-${slug}`;
  const rateId = `tts-rate-${slug}`;

  return `
    <details
      class="note test-audio-panel"
      data-tts-panel="${slug}"
      style="margin-top:14px"
    >
      <summary class="test-audio-panel__summary">
        <span>
          <strong>Audio settings</strong>
          <small>
            Playback engine, browser voice, and speed
          </small>
        </span>
        <span class="test-audio-panel__toggle" aria-hidden="true"></span>
      </summary>

      <div class="test-audio-panel__body" style="display:flex; align-items:flex-start; justify-content:space-between; gap:12px; flex-wrap:wrap">
        <div style="min-width:240px; flex:1">
          <small style="display:block; margin-top:6px; opacity:.85">
            These settings apply across tests and games. Audio is generated live by your browser.
          </small>
          <div style="margin-top:10px; display:grid; gap:12px">
            <div style="display:grid; gap:6px">
              <label for="${providerId}">Playback engine</label>
              <select id="${providerId}" data-tts-provider-select aria-label="Playback engine" style="min-height:38px">
                <option value="auto">Auto</option>
                <option value="browser">Browser voice</option>
              </select>
              <small data-tts-provider-hint style="opacity:.9"></small>
            </div>

            <div style="display:grid; gap:6px">
              <label for="${voiceId}">Browser voice</label>
              <select id="${voiceId}" data-tts-voice-select aria-label="Voice selection" style="min-height:38px">
                <option value="">Loading voices...</option>
              </select>
              <small data-tts-quality style="opacity:.9"></small>
              <small data-tts-voice-hint style="opacity:.85">
                Tip: Auto prefers the clearest English browser voice available on this device.
              </small>
            </div>

            <div style="display:grid; gap:6px">
              <label for="${rateId}">Speed: <span data-tts-rate-value>0.88x</span></label>
              <input
                id="${rateId}"
                data-tts-rate
                type="range"
                min="0.7"
                max="1.2"
                step="0.05"
                value="0.88"
                aria-label="Speech speed"
              />
            </div>
          </div>
        </div>

        <div class="actions" style="margin:0; align-self:flex-end; display:flex; gap:10px; flex-wrap:wrap">
          <button type="button" class="btn btn--primary" data-tts-test>
            Test voice
          </button>
          <button type="button" class="btn" data-tts-stop>
            Stop
          </button>
        </div>
      </div>

      <div data-tts-unsupported class="note" hidden style="margin-top:12px">
        <strong>Text-to-speech not available:</strong> your browser does not support speech synthesis.
      </div>
    </details>
  `;
}

function escapeAttr(value) {
  return escapeHtml(String(value == null ? '' : value)).replaceAll('\n', ' ');
}

function inferRunnerState(stage) {
  const text = String(stage?.textContent || '').replace(/\s+/g, ' ').trim();
  if (!text) return { mode: 'idle', label: 'Practice mode' };

  const progressMatch = text.match(/\b(Question|Prompt)\s+(\d+)\s+of\s+(\d+)\b/i);
  if (progressMatch) {
    return {
      mode: 'question',
      label: progressMatch[1],
      current: Number(progressMatch[2] || 0),
      total: Number(progressMatch[3] || 0),
    };
  }

  if (/finished|summary|save score to profile/i.test(text)) {
    return { mode: 'summary', label: 'Summary' };
  }
  if (/\bloading\b|\bpreparing\b/i.test(text)) {
    return { mode: 'loading', label: 'Loading' };
  }
  if (/could not start|unknown error|missing/i.test(text)) {
    return { mode: 'error', label: 'Needs attention' };
  }
  if (/\bstart\b|caregiver-led|practice test|quick prompts|tip:/i.test(text)) {
    return { mode: 'intro', label: 'Ready to begin' };
  }

  return { mode: 'practice', label: 'Practice mode' };
}

function inferRunnerFeedback(stage) {
  const text = String(stage?.textContent || '').replace(/\s+/g, ' ').trim();
  if (!text || /finished|summary|next step/i.test(text)) return { kind: '', key: '' };

  const progressMatch = text.match(/\b(Question|Prompt)\s+(\d+)\s+of\s+(\d+)\b/i);
  const current = progressMatch ? Number(progressMatch[2] || 0) : 0;
  const total = progressMatch ? Number(progressMatch[3] || 0) : 0;

  const negative = /\bnot quite\b|\bincorrect\b|\btry again next time\b|\bcorrect answer\b/i.test(text);
  const normalized = text.replace(/\bcorrect\s*answer\s*:/gi, '');
  const positive = /\bnice work\b|\bgood job\b|\bwell done\b|saved\s*&\s*scored|(?:^|[.!?]\s+)correct(?:[.!?]|\s*$)/i.test(normalized);

  if (negative) return { kind: 'incorrect', key: `incorrect-${current}-${total}` };
  if (positive) return { kind: 'correct', key: `correct-${current}-${total}` };
  return { kind: '', key: '' };
}

function buildRunnerChromeMarkup(title, theme, state) {
  const modeLabel = state.mode === 'question'
    ? `${state.label} ${state.current} of ${state.total}`
    : state.label;
  const progress = state.mode === 'question' && state.total > 0
    ? Math.max(0, Math.min(100, Math.round((state.current / state.total) * 100)))
    : null;

  return `
    <div class="test-runner-chrome" data-test-runner-chrome data-mode="${escapeAttr(state.mode)}">
      <div class="test-runner-chrome__top">
        <div>
          <span class="test-runner-chrome__eyebrow">${escapeHtml(theme.mode)}</span>
          <h3 class="test-runner-chrome__title">${escapeHtml(title)}</h3>
        </div>
        <div class="test-runner-chrome__badge">${escapeHtml(modeLabel)}</div>
      </div>
      ${progress != null ? `
        <div class="test-runner-chrome__progress" aria-label="Progress">
          <div class="test-runner-chrome__progress-meta">
            <span>${escapeHtml(theme.skillLabel)}</span>
            <strong>${progress}%</strong>
          </div>
          <div class="test-runner-chrome__progress-bar"><span style="width:${progress}%"></span></div>
        </div>
      ` : ''}
    </div>
  `;
}

function buildScoreRingMarkup(text) {
  const scoreMatch = String(text || '').match(/Score:\s*(\d+(?:\.\d+)?)\s*\/\s*(\d+(?:\.\d+)?)(?:\s*\((\d+)%\))?/i);
  if (!scoreMatch) return '';
  const earned = Number(scoreMatch[1] || 0);
  const total = Number(scoreMatch[2] || 0);
  const pct = scoreMatch[3] != null ? Number(scoreMatch[3]) : total ? Math.round((earned / total) * 100) : 0;
  const clamped = Math.max(0, Math.min(100, pct));
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (clamped / 100) * circumference;
  return `
    <div class="test-score-ring" aria-label="Score ${clamped}%">
      <svg viewBox="0 0 112 112" role="img" aria-hidden="true">
        <circle class="test-score-ring__track" cx="56" cy="56" r="${radius}"></circle>
        <circle class="test-score-ring__fill" cx="56" cy="56" r="${radius}" style="stroke-dasharray:${circumference.toFixed(2)}; stroke-dashoffset:${offset.toFixed(2)}"></circle>
      </svg>
      <span>${clamped}%</span>
    </div>
  `;
}

function triggerRunnerCelebration(rootEl, stage, theme, options = {}) {
  const key = String(options.key || 'summary');
  if (!rootEl || !stage || stage.dataset.ueahCelebrated === key) return;
  stage.dataset.ueahCelebrated = key;

  const shell = rootEl.closest('.test-detail-shell') || rootEl;
  if (!shell || typeof document === 'undefined') return;

  try {
    shell.classList.add('is-test-complete');
    window.setTimeout(() => {
      try {
        shell.classList.remove('is-test-complete');
      } catch (_) {}
    }, 1800);
  } catch (_) {}

  const layer = document.createElement('div');
  layer.className = 'test-confetti-layer';
  layer.setAttribute('aria-hidden', 'true');
  shell.appendChild(layer);

  const badge = document.createElement('div');
  badge.className = 'test-complete-burst';
  if (options.variant) badge.dataset.variant = String(options.variant);
  badge.textContent = options.label || 'Great work';
  layer.appendChild(badge);

  const runFallback = () => {
    const colors = [theme.accent, theme.accentAlt, theme.ageAccent, '#ffffff', '#fbbf24', '#34d399'];
    const rect = layer.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = Math.max(110, rect.height * 0.34);

    for (let i = 0; i < 120; i += 1) {
      const particle = document.createElement('i');
      const color = colors[i % colors.length];
      const angle = (i / 120) * Math.PI * 2 + (Math.random() - 0.5) * 0.42;
      const distance = 120 + Math.random() * 260;
      const tx = Math.cos(angle) * distance;
      const ty = Math.sin(angle) * distance - Math.random() * 90;
      particle.style.setProperty('--tx', `${tx}px`);
      particle.style.setProperty('--ty', `${ty}px`);
      particle.style.setProperty('--rot', `${Math.random() * 720 - 360}deg`);
      particle.style.cssText += `
        left:${centerX}px;
        top:${centerY}px;
        background:${color};
        animation-delay:${Math.random() * 90}ms;
      `;
      layer.appendChild(particle);
    }
  };

  try {
    const Engine = window.UEAH_GAME_ENGINE;
    if (Engine && typeof Engine.ConfettiExplosion === 'function') {
      const confetti = new Engine.ConfettiExplosion(layer);
      const rect = layer.getBoundingClientRect();
      confetti.explode(
        rect.width / 2,
        Math.max(110, rect.height * (options.originYRatio || 0.34)),
        options.count || 170
      );
    } else {
      runFallback();
    }
  } catch (_) {
    runFallback();
  }

  window.setTimeout(() => {
    try {
      layer.remove();
    } catch (_) {}
  }, 3800);
}

function autoSaveRunnerScore(stage) {
  if (!stage || stage.dataset.ueahAutoSaved === 'summary') return;
  const saveButton = stage.querySelector('button[data-action="save-score"]');
  if (!saveButton || saveButton.disabled) return;

  stage.dataset.ueahAutoSaved = 'summary';
  window.setTimeout(() => {
    try {
      if (document.contains(saveButton)) saveButton.click();
    } catch (_) {}
  }, 0);
}

function enhanceRunnerStage(stage) {
  if (!stage) return;

  const children = Array.from(stage.children || []).filter((el) => !el.hasAttribute('data-test-runner-chrome'));
  children.forEach((el) => {
    el.classList.remove(
      'test-runner-stage__topbar',
      'test-runner-stage__panel',
      'test-runner-stage__formwrap',
      'test-runner-stage__intro',
      'test-runner-stage__summary',
      'test-runner-stage__feedback',
      'test-runner-stage__feedback--correct',
      'test-runner-stage__feedback--incorrect'
    );
  });

  children.forEach((el, index) => {
    const text = String(el.textContent || '').replace(/\s+/g, ' ').trim();
    const hasButton = !!el.querySelector('button');
    const hasFieldset = !!el.querySelector('fieldset');
    const hasDetails = !!el.querySelector('details');
    const styleAttr = String(el.getAttribute('style') || '');
    const looksPanel = /border\s*:\s*1px\s+solid|border-radius|background\s*:\s*var\(--surface/i.test(styleAttr);
    const isSummary = /\bfinished\b|\bsummary\b|\bnext step\b|save score to profile/i.test(text);
    const isIntro = /\bstart\b|caregiver-led|practice test|preparing your test|quick prompts|short reading questions|listen and answer/i.test(text);
    const feedback = inferRunnerFeedback({ textContent: text });
    const isFeedback = !!feedback.kind || /\bpoints earned\b|\btry again tomorrow\b/i.test(text);

    if (/(Question|Prompt)\s+\d+\s+of\s+\d+/i.test(text) && hasButton) {
      el.classList.add('test-runner-stage__topbar');
    } else if (hasFieldset || (looksPanel && index > 0)) {
      el.classList.add('test-runner-stage__panel');
      if (hasFieldset) el.classList.add('test-runner-stage__formwrap');
    }

    if (isSummary || hasDetails) {
      el.classList.add('test-runner-stage__summary');
      if (!el.querySelector('.test-score-ring')) {
        const ring = buildScoreRingMarkup(text);
        if (ring) el.insertAdjacentHTML('afterbegin', ring);
      }
    } else if (isIntro && hasButton) {
      el.classList.add('test-runner-stage__intro');
    } else if (isFeedback) {
      el.classList.add('test-runner-stage__feedback');
      if (feedback.kind === 'correct') {
        el.classList.add('test-runner-stage__feedback--correct');
      } else if (feedback.kind === 'incorrect') {
        el.classList.add('test-runner-stage__feedback--incorrect');
      }
    }

    el.querySelectorAll('.chip[aria-label="Time remaining"]').forEach((chip) => {
      const m = String(chip.textContent || '').trim().match(/^(\d+):(\d{2})$/);
      if (!m) return;
      const seconds = Number(m[1]) * 60 + Number(m[2]);
      if (Number.isFinite(seconds) && seconds < 60) chip.classList.add('is-warning');
      else chip.classList.remove('is-warning');
    });
  });
}

function installRunnerChrome(rootEl, title, theme) {
  const stage = rootEl?.querySelector('[data-stage]');
  if (!stage) return () => {};
  let observer = null;
  let isObserving = false;

  const resumeObserver = () => {
    if (!observer || isObserving) return;
    observer.observe(stage, { childList: true, subtree: true });
    isObserving = true;
  };

  const pauseObserver = () => {
    if (!observer || !isObserving) return;
    observer.disconnect();
    isObserving = false;
  };

  const applyChrome = () => {
    if (stage.__ueahApplyingChrome) return;
    stage.__ueahApplyingChrome = true;
    try {
      pauseObserver();
      const oldChrome = stage.querySelector(':scope > [data-test-runner-chrome]');
      if (oldChrome) oldChrome.remove();

      const state = inferRunnerState(stage);
      const shell = document.createElement('div');
      shell.innerHTML = buildRunnerChromeMarkup(title, theme, state).trim();
      const chrome = shell.firstElementChild;
      if (chrome) stage.prepend(chrome);
      enhanceRunnerStage(stage);

      if (state.mode === 'summary') {
        autoSaveRunnerScore(stage);
        triggerRunnerCelebration(rootEl, stage, theme, {
          key: 'summary',
          label: 'Great work',
          variant: 'summary',
          count: 170,
          originYRatio: 0.34
        });
      } else {
        const feedback = inferRunnerFeedback(stage);
        if (feedback.kind === 'correct') {
          triggerRunnerCelebration(rootEl, stage, theme, {
            key: feedback.key || 'correct',
            label: 'Nice work',
            variant: 'correct',
            count: 96,
            originYRatio: 0.5
          });
        } else if (feedback.kind !== 'correct' && stage.dataset.ueahCelebrated !== 'summary') {
          delete stage.dataset.ueahCelebrated;
        }
        delete stage.dataset.ueahAutoSaved;
      }
    } catch (_) {
      // ignore
    } finally {
      resumeObserver();
      stage.__ueahApplyingChrome = false;
    }
  };

  applyChrome();

  observer = new MutationObserver(() => {
    applyChrome();
  });
  resumeObserver();

  return () => {
    try {
      pauseObserver();
    } catch (_) {}
    try {
      const chrome = stage.querySelector(':scope > [data-test-runner-chrome]');
      if (chrome) chrome.remove();
    } catch (_) {}
  };
}

/**
 * Build the test detail page for the given slug.
 *
 * @param {Object} ctx Context containing helpers and store functions
 * @param {string} slug Test slug
 */
export async function getView(ctx, slug) {
  if (!ctx.testsStoreAvailable) {
    return getTestsMissingView(ctx);
  }

  const test = typeof ctx.testsGetTest === 'function' ? ctx.testsGetTest(slug) : null;
  if (!test) {
    return getNotFoundView(ctx, `/tests/${slug}`);
  }

  try {
    if (typeof ctx.ensureTestRunnerLoaded === 'function') {
      await ctx.ensureTestRunnerLoaded(test);
    }
  } catch (_) {}

  const { hrefFor } = ctx;
  const safeTitle = test.title || 'Test';
  const safeSubtitle = test.subtitle || 'Test your ability';
  const theme = testTheme(test);
  const stats = skillStatValues(test, theme);
  const themeStyle = [
    `--test-accent:${theme.accent}`,
    `--test-accent-2:${theme.accentAlt}`,
    `--test-accent-soft:${theme.ageSoft}`,
    `--test-accent-age:${theme.ageAccent}`,
    `--test-track-accent:${theme.trackAccent}`
  ].join(';');

  const title = `${safeTitle} - UEAH`;
  const description = test.subtitle ? `${safeTitle}: ${safeSubtitle}` : `${safeTitle} practice test.`;

  const breadcrumb = breadcrumbs([
    { label: 'Home', href: hrefFor('/') },
    { label: 'Tests', href: hrefFor('/tests') },
    { label: safeTitle },
  ]);

  const showAudioPanel = isAudioSkill(test.skill);

  let runnerHtml = `
    <div class="note">
      <strong>Coming soon:</strong> this test is not implemented yet.
    </div>
  `;
  let runnerAfterRender = null;

  try {
    const rendered = ctx.testsStore?.render?.(slug, ctx);
    if (rendered?.html) {
      runnerHtml = rendered.html;
      if (typeof rendered.afterRender === 'function') {
        runnerAfterRender = rendered.afterRender;
      }
    }
  } catch (_) {}

  const html = `
    <section class="page-top tests-page test-detail-page" style="${themeStyle}" data-test-age="${escapeHtml(theme.ageKey)}" data-test-skill="${escapeHtml(test.skill || '')}">
      ${breadcrumb}

      <div class="test-hero">
        <div class="test-hero__decor test-hero__decor--one" aria-hidden="true"></div>
        <div class="test-hero__decor test-hero__decor--two" aria-hidden="true"></div>
        <div class="test-hero__copy">
          <div class="test-hero__identity">
            <div class="test-hero__skill-icon" aria-hidden="true">${iconSkill(test.skill)}</div>
            <div>
              <div class="test-hero__eyebrow">Practice lane</div>
              <h1 class="page-title test-hero__title">${escapeHtml(safeTitle)}</h1>
            </div>
          </div>
          <p class="page-subtitle test-hero__subtitle">${escapeHtml(safeSubtitle)}</p>

          <div class="test-chip-row" aria-label="Test summary">
            <span class="test-chip">${escapeHtml(theme.ageLabel)}</span>
            <span class="test-chip">${escapeHtml(skillLabel(test.skill))}</span>
            <span class="test-chip">${escapeHtml(theme.mode)}</span>
          </div>

          <div class="test-stat-grid" aria-label="Test highlights">
            <div class="test-stat-card">
              <span class="test-stat-card__label"><span aria-hidden="true">⚡</span> Energy</span>
              <strong>${escapeHtml(stats.energy)}</strong>
            </div>
            <div class="test-stat-card">
              <span class="test-stat-card__label"><span aria-hidden="true">◎</span> Focus</span>
              <strong>${escapeHtml(stats.focus)}</strong>
            </div>
            <div class="test-stat-card">
              <span class="test-stat-card__label"><span aria-hidden="true">✦</span> Feel</span>
              <strong>${escapeHtml(stats.feel)}</strong>
            </div>
          </div>
        </div>

        <div class="test-hero__art" aria-hidden="true">
          <div class="test-hero__orb test-hero__orb--one"></div>
          <div class="test-hero__orb test-hero__orb--two"></div>
          <div class="test-hero__orb test-hero__orb--three"></div>
          <div class="test-hero__spark test-hero__spark--one"></div>
          <div class="test-hero__spark test-hero__spark--two"></div>
          <div class="test-hero__panel test-hero__panel--main">${iconSkill(test.skill)}</div>
          <div class="test-hero__panel test-hero__panel--side">${iconAge(theme.ageKey)}</div>
        </div>
      </div>

      <div class="detail-card test-detail-shell" role="region" aria-label="Test details">
        <div class="test-detail-shell__header">
          <div class="test-detail-shell__summary">
            <div class="card-icon test-detail-shell__icon" aria-hidden="true">${iconSkill(test.skill)}</div>
            <div>
              <h2 class="detail-title test-detail-shell__title">Ready to practice</h2>
              <p class="detail-desc test-detail-shell__desc">${escapeHtml(theme.summary)}</p>
            </div>
          </div>

          <div class="test-stage-pill">${escapeHtml(theme.vibe)}</div>
        </div>

        ${showAudioPanel ? audioSettingsPanelHtml(slug) : ''}

        <div class="test-runner-shell">
          <div data-test-runner-root="${slug}">
            ${runnerHtml}
          </div>
        </div>

        <div class="actions actions--test-footer" style="margin-top:16px">
          <a class="btn" href="${hrefFor('/tests')}" data-nav>← Back</a>
        </div>
      </div>

      <div class="actions">
        <a class="btn" href="${hrefFor('/tests')}" data-nav>← Back to Tests</a>
        <a class="btn" href="${hrefFor('/resources')}" data-nav>Resources</a>
        <a class="btn btn--primary" href="${hrefFor('/')}" data-nav>Home</a>
      </div>
    </section>
  `;

  const afterRender = () => {
    try {
      if (typeof window.__ueahTtsControlsCleanup === 'function') {
        window.__ueahTtsControlsCleanup();
      }
    } catch (_) {
      // ignore
    } finally {
      window.__ueahTtsControlsCleanup = null;
    }

    try {
      if (typeof window.__ueahTestRunnerChromeCleanup === 'function') {
        window.__ueahTestRunnerChromeCleanup();
      }
    } catch (_) {
      // ignore
    } finally {
      window.__ueahTestRunnerChromeCleanup = null;
    }

    if (showAudioPanel) {
      const panel = document.querySelector(`[data-tts-panel="${slug}"]`);
      const tts = window.UEAH_TTS;

      const unsupportedEl = panel?.querySelector('[data-tts-unsupported]');
      const providerSelect = panel?.querySelector('[data-tts-provider-select]');
      const providerHint = panel?.querySelector('[data-tts-provider-hint]');
      const voiceSelect = panel?.querySelector('[data-tts-voice-select]');
      const rateInput = panel?.querySelector('[data-tts-rate]');
      const rateValue = panel?.querySelector('[data-tts-rate-value]');
      const btnTest = panel?.querySelector('[data-tts-test]');
      const btnStop = panel?.querySelector('[data-tts-stop]');
      const voiceHint = panel?.querySelector('[data-tts-voice-hint]');
      const qualityEl = panel?.querySelector('[data-tts-quality]');

      const supported = !!(tts && typeof tts.isSupported === 'function' && tts.isSupported());

      if (!supported) {
        if (unsupportedEl) unsupportedEl.hidden = false;
        if (voiceSelect) voiceSelect.disabled = true;
        if (rateInput) rateInput.disabled = true;
        if (btnTest) btnTest.disabled = true;
        if (btnStop) btnStop.disabled = true;
      } else {
        if (unsupportedEl) unsupportedEl.hidden = true;

        const preferredLang = 'en-US';

        const applyRateUI = (rate) => {
          const r = Number(rate);
          if (rateInput) rateInput.value = String(r);
          if (rateValue) rateValue.textContent = `${r.toFixed(2)}x`;
        };

        const sortRank = (voice) => {
          const meta = typeof tts.getVoiceMeta === 'function'
            ? tts.getVoiceMeta(voice, preferredLang)
            : null;
          if (!meta) return 99;
          if (meta.isMicrosoftNatural) return 0;
          if (meta.isMicrosoft && meta.isNatural) return 1;
          if (meta.isMicrosoft) return 2;
          if (meta.isGoogle && meta.isNatural) return 3;
          if (meta.isNatural) return 4;
          if (meta.isEnglish) return 5;
          return 6;
        };

        const populateProviders = () => {
          if (!providerSelect || !tts) return;

          const settings = typeof tts.getSettings === 'function'
            ? tts.getSettings()
            : { provider: 'auto' };
          const providerMeta = typeof tts.getProviderMeta === 'function'
            ? tts.getProviderMeta(preferredLang)
            : null;
          providerSelect.innerHTML = '';

          const options = [
            { value: 'auto', label: 'Auto (smart browser voice)' },
            { value: 'browser', label: 'Browser voice' },
          ];

          for (const option of options) {
            const el = document.createElement('option');
            el.value = option.value;
            el.textContent = option.label;
            if (option.disabled) el.disabled = true;
            providerSelect.appendChild(el);
          }

          const current = String(settings.provider || 'auto');
          providerSelect.value = current === 'browser' ? 'browser' : 'auto';
        };

        const updateVoiceMessaging = () => {
          if (!voiceHint && !qualityEl && !providerHint) return;

          const providerMeta = typeof tts.getProviderMeta === 'function'
            ? tts.getProviderMeta(preferredLang)
            : null;

          const selectedVoiceURI = voiceSelect ? String(voiceSelect.value || '') : '';
          const selectedMeta = typeof tts.getVoiceMeta === 'function'
            ? tts.getVoiceMeta(selectedVoiceURI || null, preferredLang)
            : null;
          const autoMeta = typeof tts.getPreferredVoiceMeta === 'function'
            ? tts.getPreferredVoiceMeta(preferredLang)
            : null;

          const activeMeta = selectedVoiceURI ? selectedMeta : autoMeta;
          const usesBrowserVoices = !!providerMeta?.usesBrowserVoices;

          if (providerHint) {
            if (!providerMeta) {
              providerHint.textContent = 'Playback provider information is not available yet.';
            } else {
              providerHint.textContent = 'This static build uses live browser speech synthesis only. Voice quality depends on the browser and OS.';
            }
          }

          if (qualityEl) {
            if (activeMeta && activeMeta.voice) {
              qualityEl.textContent = selectedVoiceURI
                ? `Current voice: ${activeMeta.displayName}. ${activeMeta.summary}`
                : `Auto voice: ${activeMeta.displayName}. ${activeMeta.summary}`;
            } else {
              qualityEl.textContent = 'Voice quality depends on the browser and installed voices.';
            }
          }

          if (voiceHint) {
            if (!autoMeta || !autoMeta.voice) {
              voiceHint.textContent = 'No browser voices were detected yet. Try Chrome or wait a moment for voices to load.';
            } else if (autoMeta.isMicrosoftNatural) {
              voiceHint.textContent = 'Auto is already preferring a Microsoft natural voice on this device.';
            } else if (autoMeta.isMicrosoft) {
              voiceHint.textContent = 'A Microsoft voice is available. For the most natural sound, choose one marked Natural or Online.';
            } else {
              voiceHint.textContent = 'This browser-only build usually sounds best in Chrome on desktop when Google English voices are available.';
            }
          }
        };

        const populateVoices = () => {
          if (!voiceSelect || !tts) return;

          const list = typeof tts.getVoices === 'function' ? tts.getVoices() : [];
          const current = typeof tts.getSettings === 'function'
            ? tts.getSettings()
            : { provider: 'auto', voiceURI: '', rate: 0.95 };
          const providerMeta = typeof tts.getProviderMeta === 'function'
            ? tts.getProviderMeta(preferredLang)
            : null;
          const selectedValue = voiceSelect.value;

          voiceSelect.innerHTML = '';

          const optAuto = document.createElement('option');
          optAuto.value = '';
          optAuto.textContent = 'Auto (prefer Microsoft natural voices)';
          voiceSelect.appendChild(optAuto);

          if (!list || list.length === 0) {
            const opt = document.createElement('option');
            opt.value = '';
            opt.textContent = 'No voices found (browser default may still work)';
            voiceSelect.appendChild(opt);
            voiceSelect.value = '';
            voiceSelect.disabled = !(providerMeta?.usesBrowserVoices);
            updateVoiceMessaging();
            return;
          }

          const sorted = list
            .slice()
            .sort((a, b) => {
              const rankDiff = sortRank(a) - sortRank(b);
              if (rankDiff !== 0) return rankDiff;

              const al = String(a?.lang || '').toLowerCase();
              const bl = String(b?.lang || '').toLowerCase();
              const aEn = al.startsWith('en') ? 0 : 1;
              const bEn = bl.startsWith('en') ? 0 : 1;
              if (aEn !== bEn) return aEn - bEn;

              return String(a?.name || '').localeCompare(String(b?.name || ''));
            });

          for (const v of sorted) {
            const meta = typeof tts.getVoiceMeta === 'function'
              ? tts.getVoiceMeta(v, preferredLang)
              : null;
            const opt = document.createElement('option');
            opt.value = String(v.voiceURI || '');
            opt.textContent = meta && meta.voice
              ? meta.displayName
              : `${String(v.name || 'Voice')} (${String(v.lang || '').toLowerCase() || 'unknown'})`;
            voiceSelect.appendChild(opt);
          }

          const storedVoice = String(current.voiceURI || '');
          const hasStored = storedVoice && sorted.some((v) => String(v.voiceURI || '') === storedVoice);
          const hasSelected = selectedValue && sorted.some((v) => String(v.voiceURI || '') === selectedValue);

          voiceSelect.value = hasStored ? storedVoice : hasSelected ? selectedValue : '';
          voiceSelect.disabled = !(providerMeta?.usesBrowserVoices);
          updateVoiceMessaging();
        };

        try {
          const s = typeof tts.getSettings === 'function' ? tts.getSettings() : { voiceURI: '', rate: 0.95 };
          applyRateUI(Number(s.rate || 0.95));
          populateProviders();
          populateVoices();
        } catch (_) {}

        try {
          if (typeof tts.ready === 'function') {
            tts.ready().then(() => {
              populateProviders();
              populateVoices();
            }).catch(() => {});
          }
        } catch (_) {}

        const onVoicesChanged = () => {
          populateProviders();
          populateVoices();
        };
        const voicesEventName = tts?.EVENTS?.voicesChanged;
        if (voicesEventName) {
          window.addEventListener(voicesEventName, onVoicesChanged);
        }

        const onProviderChange = () => {
          if (!tts || typeof tts.setSettings !== 'function' || !providerSelect) return;
          tts.setSettings({ provider: String(providerSelect.value || 'auto') });
          populateProviders();
          populateVoices();
        };

        const onVoiceChange = () => {
          if (!tts || typeof tts.setSettings !== 'function' || !voiceSelect) return;
          const v = String(voiceSelect.value || '');
          tts.setSettings({ voiceURI: v });
          updateVoiceMessaging();
        };

        const onRateInput = () => {
          if (!tts || typeof tts.setSettings !== 'function' || !rateInput) return;
          const r = Number(rateInput.value);
          applyRateUI(r);
          tts.setSettings({ rate: r });
        };

        const onTest = () => {
          if (!tts || typeof tts.speak !== 'function') return;
          const s = typeof tts.getSettings === 'function' ? tts.getSettings() : { voiceURI: '', rate: 0.95 };
          const provider = providerSelect ? String(providerSelect.value || 'auto') : String(s.provider || 'auto');
          const voiceURI = voiceSelect ? String(voiceSelect.value || '') : String(s.voiceURI || '');
          const rate = rateInput ? Number(rateInput.value) : Number(s.rate || 0.95);

          tts.stop?.();
          tts.speak('Hello! This is your selected voice. Adjust the speed if needed.', {
            lang: preferredLang,
            chunk: false,
            provider,
            rate,
            voiceURI: voiceURI || undefined,
          });
        };

        const onStop = () => {
          tts.stop?.();
        };

        if (providerSelect) providerSelect.addEventListener('change', onProviderChange);
        if (voiceSelect) voiceSelect.addEventListener('change', onVoiceChange);
        if (rateInput) rateInput.addEventListener('input', onRateInput);
        if (btnTest) btnTest.addEventListener('click', onTest);
        if (btnStop) btnStop.addEventListener('click', onStop);

        window.__ueahTtsControlsCleanup = () => {
          try {
            tts.stop?.();
          } catch (_) {}

          if (voicesEventName) {
            try {
              window.removeEventListener(voicesEventName, onVoicesChanged);
            } catch (_) {}
          }

          try {
            if (providerSelect) providerSelect.removeEventListener('change', onProviderChange);
            if (voiceSelect) voiceSelect.removeEventListener('change', onVoiceChange);
            if (rateInput) rateInput.removeEventListener('input', onRateInput);
            if (btnTest) btnTest.removeEventListener('click', onTest);
            if (btnStop) btnStop.removeEventListener('click', onStop);
          } catch (_) {}
        };
      }
    }

    const rootEl = document.querySelector(`[data-test-runner-root="${slug}"]`);

    if (typeof runnerAfterRender === 'function') {
      try {
        runnerAfterRender(rootEl, ctx);
      } catch (_) {}
    }

    try {
      window.__ueahTestRunnerChromeCleanup = installRunnerChrome(rootEl, safeTitle, theme);
    } catch (_) {
      window.__ueahTestRunnerChromeCleanup = null;
    }
  };

  return { title, description, html, afterRender };
}
