/* QA: voice ranking picks the most natural built-in voice (zero downloads).
   Stubs speechSynthesis.getVoices before app scripts load, then checks
   getPreferredVoiceMeta through the real tts.js path.

   Usage: node tools/qa/tts-voices.js --url http://127.0.0.1:4173/
*/
const { chromium } = require('playwright');

function arg(name) {
  const i = process.argv.indexOf(name);
  return i >= 0 ? process.argv[i + 1] : null;
}

const FAKES = [
  { name: 'eSpeak', lang: 'en-US', voiceURI: 'espeak', localService: true },
  { name: 'Google UK English Male', lang: 'en-GB', voiceURI: 'google-uk', localService: false },
  { name: 'Google US English', lang: 'en-US', voiceURI: 'google-us', localService: false },
  { name: 'Microsoft Aria Online (Natural)', lang: 'en-US', voiceURI: 'ms-aria', localService: false },
  { name: 'Microsoft Jenny Neural', lang: 'en-US', voiceURI: 'ms-jenny', localService: true },
];

(async () => {
  const base = arg('--url') || 'http://127.0.0.1:4173/';
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.addInitScript((voices) => {
    const fakes = voices.map((v) => ({ ...v }));
    try {
      Object.defineProperty(window.speechSynthesis, 'getVoices', {
        value: () => fakes.slice(), configurable: true,
      });
    } catch (_) {
      try { window.speechSynthesis.getVoices = () => fakes.slice(); } catch (_) {}
    }
  }, FAKES);

  const errors = [];
  page.on('pageerror', (e) => errors.push(String(e && e.message || e).slice(0, 160)));
  await page.goto(base, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForFunction(() => !!(window.UEAH_TTS && window.UEAH_TTS.ready), null, { timeout: 30000 });
  await page.evaluate(() => window.UEAH_TTS.ready().catch(() => {}));

  const res = await page.evaluate(() => {
    const tts = window.UEAH_TTS;
    const best = tts.getPreferredVoiceMeta('en-US');
    const aria = tts.getVoiceMeta({ name: 'Microsoft Aria Online (Natural)', lang: 'en-US', voiceURI: 'x', localService: false }, 'en-US');
    return {
      bestURI: best && best.voiceURI,
      bestName: best && best.name,
      ariaQuality: aria && aria.quality,
      ariaNatural: aria && aria.isMicrosoftNatural,
    };
  });
  console.log('best:', res.bestName, '| aria quality:', res.ariaQuality);

  await browser.close();
  const ok = res.bestURI === 'ms-aria' && res.ariaNatural === true && errors.length === 0;
  if (!ok && errors.length) for (const e of errors.slice(0, 5)) console.log('PAGEERROR:', e);
  console.log(ok ? 'TTS_VOICES_OK' : 'TTS_VOICES_FAIL');
  process.exit(ok ? 0 : 2);
})().catch((e) => {
  console.error('TTS_VOICES_ERROR', String(e && e.message || e).slice(0, 300));
  process.exit(2);
});
