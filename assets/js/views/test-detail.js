/* assets/js/views/test-detail.js
   Test detail view for Ultimate English At Home.
   Shows details for an individual test. If the tests store is missing or
   the test cannot be found, delegates to appropriate fallback views.
*/

import { breadcrumbs, escapeHtml, iconSkill } from '../common.js';
import { getTestsMissingView } from './error.js';
import { getView as getNotFoundView } from './not-found.js';

function isAudioSkill(skill) {
  return skill === 'listening' || skill === 'speaking';
}

function audioSettingsPanelHtml(slug) {
  const voiceId = `tts-voice-${slug}`;
  const rateId = `tts-rate-${slug}`;

  return `
    <div
      class="note"
      data-tts-panel="${slug}"
      role="region"
      aria-label="Audio settings"
      style="margin-top:14px"
    >
      <div style="display:flex; align-items:flex-start; justify-content:space-between; gap:12px; flex-wrap:wrap">
        <div style="min-width:240px; flex:1">
          <strong>Audio settings</strong>
          <div style="margin-top:10px; display:grid; gap:12px">
            <div style="display:grid; gap:6px">
              <label for="${voiceId}">Voice</label>
              <select id="${voiceId}" data-tts-voice-select aria-label="Voice selection" style="min-height:38px">
                <option value="">Loading voices…</option>
              </select>
              <small data-tts-voice-hint style="opacity:.85">
                Tip: If you don’t see many voices, try a different browser/device.
              </small>
            </div>

            <div style="display:grid; gap:6px">
              <label for="${rateId}">Speed: <span data-tts-rate-value>1.00×</span></label>
              <input
                id="${rateId}"
                data-tts-rate
                type="range"
                min="0.7"
                max="1.2"
                step="0.05"
                value="1.0"
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
    </div>
  `;
}

/**
 * Build the test detail page for the given slug.
 *
 * @param {Object} ctx Context containing helpers and store functions
 * @param {string} slug Test slug
 */
export async function getView(ctx, slug) {
  // If the tests store is not loaded, show the missing tests view
  if (!ctx.testsStoreAvailable) {
    return getTestsMissingView(ctx);
  }

  // Find the test object
  const test = typeof ctx.testsGetTest === 'function' ? ctx.testsGetTest(slug) : null;
  if (!test) {
    return getNotFoundView(ctx, `/tests/${slug}`);
  }

  // Attempt to load the test runner if available.
  // Load the runner module if the test declares one. Safe to call even if already loaded.
  try {
    if (typeof ctx.ensureTestRunnerLoaded === 'function') {
      await ctx.ensureTestRunnerLoaded(test);
    }
  } catch (_) {
    // ignore loading errors; we’ll show a placeholder below
  }

  const { hrefFor } = ctx;
  const safeTitle = test.title || 'Test';
  const safeSubtitle = test.subtitle || 'Test your ability';

  const title = `${safeTitle} — UEAH`;
  const description = test.subtitle ? `${safeTitle}: ${safeSubtitle}` : `${safeTitle} practice test.`;

  const breadcrumb = breadcrumbs([
    { label: 'Home', href: hrefFor('/') },
    { label: 'Tests', href: hrefFor('/tests') },
    { label: safeTitle },
  ]);

  const showAudioPanel = isAudioSkill(test.skill);

  // If a runner exists and registers a renderer, render it via the store.
  // Otherwise fall back to the placeholder.
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
  } catch (_) {
    // ignore render errors; keep placeholder
  }

  const html = `
    <section class="page-top tests-page">
      ${breadcrumb}
      <h1 class="page-title">${escapeHtml(safeTitle)}</h1>
      <p class="page-subtitle">${escapeHtml(safeSubtitle)}</p>

      <div class="detail-card" role="region" aria-label="Test details">
        <div style="display:flex; gap:12px; align-items:flex-start">
          <div class="card-icon" aria-hidden="true" style="width:44px; height:44px">${iconSkill(test.skill)}</div>
          <div>
            <h2 class="detail-title" style="font-size:18px; margin:0">Test</h2>
            <p class="detail-desc" style="margin-top:10px">${escapeHtml(safeSubtitle)}</p>
          </div>
        </div>

        ${showAudioPanel ? audioSettingsPanelHtml(slug) : ''}

        <div style="margin-top:14px">
          <div data-test-runner-root="${slug}">
            ${runnerHtml}
          </div>
        </div>

        <div class="actions" style="margin-top:16px">
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
    // Cleanup any previous controls listener (single-view SPA).
    try {
      if (typeof window.__ueahTtsControlsCleanup === 'function') {
        window.__ueahTtsControlsCleanup();
      }
    } catch (_) {
      // ignore
    } finally {
      window.__ueahTtsControlsCleanup = null;
    }

    // Wire audio controls (listening/speaking only)
    if (showAudioPanel) {
      const panel = document.querySelector(`[data-tts-panel="${slug}"]`);
      const tts = window.UEAH_TTS;

      const unsupportedEl = panel?.querySelector('[data-tts-unsupported]');
      const voiceSelect = panel?.querySelector('[data-tts-voice-select]');
      const rateInput = panel?.querySelector('[data-tts-rate]');
      const rateValue = panel?.querySelector('[data-tts-rate-value]');
      const btnTest = panel?.querySelector('[data-tts-test]');
      const btnStop = panel?.querySelector('[data-tts-stop]');
      const voiceHint = panel?.querySelector('[data-tts-voice-hint]');

      const supported = !!(tts && typeof tts.isSupported === 'function' && tts.isSupported());

      if (!supported) {
        if (unsupportedEl) unsupportedEl.hidden = false;
        if (voiceSelect) voiceSelect.disabled = true;
        if (rateInput) rateInput.disabled = true;
        if (btnTest) btnTest.disabled = true;
        if (btnStop) btnStop.disabled = true;
      } else {
        if (unsupportedEl) unsupportedEl.hidden = true;

        const applyRateUI = (rate) => {
          const r = Number(rate);
          if (rateInput) rateInput.value = String(r);
          if (rateValue) rateValue.textContent = `${r.toFixed(2)}×`;
        };

        const populateVoices = () => {
          if (!voiceSelect || !tts) return;

          const list = typeof tts.getVoices === 'function' ? tts.getVoices() : [];
          const current = typeof tts.getSettings === 'function' ? tts.getSettings() : { voiceURI: '', rate: 1.0 };

          // Keep current selection where possible
          const selectedValue = voiceSelect.value;

          voiceSelect.innerHTML = '';

          // Auto option uses the helper's "best voice" logic.
          const optAuto = document.createElement('option');
          optAuto.value = '';
          optAuto.textContent = 'Auto (recommended)';
          voiceSelect.appendChild(optAuto);

          if (!list || list.length === 0) {
            const opt = document.createElement('option');
            opt.value = '';
            opt.textContent = 'No voices found (browser default may still work)';
            voiceSelect.appendChild(opt);
            voiceSelect.value = '';
            if (voiceHint) voiceHint.textContent = 'Voices are loaded by your device/browser. Some devices provide only a few.';
            return;
          }

          // Sort: English first, then by name.
          const sorted = list
            .slice()
            .sort((a, b) => {
              const al = String(a?.lang || '');
              const bl = String(b?.lang || '');
              const aEn = al.toLowerCase().startsWith('en') ? 0 : 1;
              const bEn = bl.toLowerCase().startsWith('en') ? 0 : 1;
              if (aEn !== bEn) return aEn - bEn;
              return String(a?.name || '').localeCompare(String(b?.name || ''));
            });

          for (const v of sorted) {
            const opt = document.createElement('option');
            opt.value = String(v.voiceURI || '');
            opt.textContent = `${String(v.name || 'Voice')} (${String(v.lang || '').toLowerCase() || 'unknown'})`;
            voiceSelect.appendChild(opt);
          }

          // Restore selection priority:
          // 1) stored setting if available
          // 2) currently selected value (if still available)
          // 3) auto
          const storedVoice = String(current.voiceURI || '');
          const hasStored = storedVoice && sorted.some((v) => String(v.voiceURI || '') === storedVoice);
          const hasSelected = selectedValue && sorted.some((v) => String(v.voiceURI || '') === selectedValue);

          voiceSelect.value = hasStored ? storedVoice : hasSelected ? selectedValue : '';
          if (voiceHint) voiceHint.textContent = 'Pick a voice (or keep Auto). The list depends on the device/browser.';
        };

        // Initialize controls from persisted settings
        try {
          const s = typeof tts.getSettings === 'function' ? tts.getSettings() : { voiceURI: '', rate: 1.0 };
          applyRateUI(Number(s.rate || 1.0));
          populateVoices();
        } catch (_) {
          // ignore
        }

        // Populate after voices are ready as well
        try {
          if (typeof tts.ready === 'function') {
            tts.ready().then(() => populateVoices()).catch(() => {});
          }
        } catch (_) {
          // ignore
        }

        // Listen for later voice list updates (some browsers load voices late)
        const onVoicesChanged = () => populateVoices();
        const voicesEventName = tts?.EVENTS?.voicesChanged;

        if (voicesEventName) {
          window.addEventListener(voicesEventName, onVoicesChanged);
        }

        // Bind UI events
        const onVoiceChange = () => {
          if (!tts || typeof tts.setSettings !== 'function' || !voiceSelect) return;
          const v = String(voiceSelect.value || '');
          tts.setSettings({ voiceURI: v }); // empty string = Auto
        };

        const onRateInput = () => {
          if (!tts || typeof tts.setSettings !== 'function' || !rateInput) return;
          const r = Number(rateInput.value);
          applyRateUI(r);
          tts.setSettings({ rate: r });
        };

        const onTest = () => {
          if (!tts || typeof tts.speak !== 'function') return;
          const s = typeof tts.getSettings === 'function' ? tts.getSettings() : { voiceURI: '', rate: 1.0 };
          const voiceURI = voiceSelect ? String(voiceSelect.value || '') : String(s.voiceURI || '');
          const rate = rateInput ? Number(rateInput.value) : Number(s.rate || 1.0);

          tts.stop?.();
          tts.speak('Hello! This is your selected voice. Adjust the speed if needed.', {
            lang: 'en-US',
            chunk: false,
            rate,
            voiceURI: voiceURI || undefined,
          });
        };

        const onStop = () => {
          tts.stop?.();
        };

        if (voiceSelect) voiceSelect.addEventListener('change', onVoiceChange);
        if (rateInput) rateInput.addEventListener('input', onRateInput);
        if (btnTest) btnTest.addEventListener('click', onTest);
        if (btnStop) btnStop.addEventListener('click', onStop);

        // Provide cleanup for SPA navigation
        window.__ueahTtsControlsCleanup = () => {
          try {
            tts.stop?.();
          } catch (_) {
            // ignore
          }

          if (voicesEventName) {
            try {
              window.removeEventListener(voicesEventName, onVoicesChanged);
            } catch (_) {
              // ignore
            }
          }

          try {
            if (voiceSelect) voiceSelect.removeEventListener('change', onVoiceChange);
            if (rateInput) rateInput.removeEventListener('input', onRateInput);
            if (btnTest) btnTest.removeEventListener('click', onTest);
            if (btnStop) btnStop.removeEventListener('click', onStop);
          } catch (_) {
            // ignore
          }
        };
      }
    }

    // Run runner hook last (so runners can read any persisted TTS settings if they want)
    try {
      if (typeof runnerAfterRender === 'function') {
        const root = document.querySelector(`[data-test-runner-root="${slug}"]`);
        runnerAfterRender(root, ctx);
      }
    } catch (_) {
      // ignore runner hook errors
    }
  };

  return { title, description, html, afterRender };
}
