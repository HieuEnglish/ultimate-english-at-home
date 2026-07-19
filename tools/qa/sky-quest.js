const { chromium } = require('playwright');

function arg(name) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : null;
}

async function run() {
  const base = arg('--url') || 'http://127.0.0.1:4173/';
  const pageUrl = new URL('assets/vendor/tinyskies/index.html', base).toString();
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    await page.goto(pageUrl, { waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => Boolean(window.UEAH_SKY_QUEST_PAUSE));
    await page.evaluate(() => {
      const modal = document.createElement('div');
      modal.dataset.ieltsModal = '';
      document.body.appendChild(modal);
      window.__pauseTestFrames = 0;
      window.requestAnimationFrame(() => { window.__pauseTestFrames += 1; });
    });

    await page.waitForTimeout(250);
    const frozen = await page.evaluate(() => (
      window.__pauseTestFrames === 0 && window.UEAH_SKY_QUEST_PAUSE.questionIsOpen()
    ));

    await page.evaluate(() => { document.querySelector('[data-ielts-modal]').hidden = true; });
    await page.waitForFunction(() => window.__pauseTestFrames === 1);
    const resumed = await page.evaluate(() => (
      window.__pauseTestFrames === 1 && !window.UEAH_SKY_QUEST_PAUSE.questionIsOpen()
    ));

    console.log(`Sky Quest question pause: ${frozen ? 'OK' : 'FAIL'}`);
    console.log(`Sky Quest answer resume: ${resumed ? 'OK' : 'FAIL'}`);
    if (!frozen || !resumed) process.exitCode = 2;
  } finally {
    await browser.close();
  }
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 3;
});
