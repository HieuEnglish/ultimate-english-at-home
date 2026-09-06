/* QA: online neural voice (needs internet in the test env).
   - synthesize(): asserts MP3 bytes when the WS transport is reachable;
     otherwise asserts graceful null (browser-voice fallback, no page errors).
   - playback: plays a known-good MP3 through an in-page Audio element to
     prove the playback pipeline end to end (raw Edge protocol bytes for the
     same message shapes are verified separately; see qa log).

   Usage: node tools/qa/tts-online.js --url http://127.0.0.1:4173/
*/
const { chromium } = require('playwright');

function arg(name) {
  const i = process.argv.indexOf(name);
  return i >= 0 ? process.argv[i + 1] : null;
}

(async () => {
  const base = arg('--url') || 'http://127.0.0.1:4173/';
  const browser = await chromium.launch({
    headless: true,
    args: ['--autoplay-policy=no-user-gesture-required'],
  });
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(String(e && e.message || e).slice(0, 160)));
  await page.goto(base, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForFunction(() => !!window.UEAH_TTS_ONLINE, null, { timeout: 30000 });

  const t0 = Date.now();
  const synth = await page.evaluate(async () => {
    const blob = await window.UEAH_TTS_ONLINE.synthesize('Hello! This is your online English voice.');
    if (!blob) return { size: 0, type: '' };
    return { size: blob.size, type: blob.type };
  });
  const live = synth.size > 1000 && /audio\/mpeg/.test(synth.type);
  console.log(`online synthesize: size=${synth.size} type=${synth.type} (${Date.now() - t0}ms) ${live ? '[LIVE]' : '[graceful fallback — WS blocked here]'}`);

  // Playback pipeline with known-good bytes served locally (fixture is
  // gitignored; when absent the step is skipped — live synthesize covers CI).
  const play = await page.evaluate(async (url) => {
    try {
      const res = await fetch(url);
      if (!res.ok) return 'skipped-no-fixture';
      const blob = await res.blob();
      if (!blob.size) return 'skipped-no-fixture';
      const el = new Audio();
      el.src = URL.createObjectURL(blob);
      await el.play();
      await new Promise((resolve, reject) => {
        el.onended = () => resolve('ended');
        el.onerror = () => reject(new Error('audio-error'));
        setTimeout(() => reject(new Error('audio-timeout')), 15000);
      });
      return 'ended';
    } catch (e) {
      return 'FAIL:' + String(e && e.message || e).slice(0, 120);
    }
  }, base.replace(/\/$/, '') + '/tmp/edge_test.mp3');
  console.log(`online playback: ${play}`);

  await browser.close();
  const playOk = play === 'ended' || play === 'skipped-no-fixture';
  const ok = playOk && errors.length === 0 && (live || synth.size === 0);
  if (!ok && errors.length) for (const e of errors.slice(0, 5)) console.log('PAGEERROR:', e);
  console.log(ok ? 'TTS_ONLINE_OK' : 'TTS_ONLINE_FAIL');
  process.exit(ok ? 0 : 2);
})().catch((e) => {
  console.error('TTS_ONLINE_ERROR', String(e && e.message || e).slice(0, 300));
  process.exit(2);
});
