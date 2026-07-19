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

    const randomSequences = await page.evaluate(async () => {
      const vehicle = document.createElement('button');
      vehicle.dataset.vehicle = 'boat';
      vehicle.setAttribute('aria-disabled', 'false');
      document.body.appendChild(vehicle);
      const score = document.createElement('strong');
      score.dataset.ieltsScore = '';
      score.textContent = '0';
      document.body.appendChild(score);
      vehicle.click();

      const boatPrompts = [];
      let answerCount = 0;
      for (let index = 0; index < 6; index += 1) {
        window.UEAH_BOAT_IELTS.forceCheckpoint();
        const modal = document.querySelector('.ueah-boat-ielts-modal');
        boatPrompts.push(modal?.querySelector('h2')?.textContent || '');
        answerCount = modal?.querySelectorAll('.ielts-quest-option').length || 0;
        modal?.querySelector('.ielts-quest-option')?.click();
        await new Promise((resolve) => window.setTimeout(resolve, 1150));
      }

      const arcadeModule = await import('/assets/js/games/featured/ielts-arcade.js');
      const arcade = new arcadeModule.IeltsArcadeGame(null, {}, 'snake');
      const arcadePrompts = Array.from({ length: 10 }, () => arcade.nextQuestion().q);
      return {
        answerCount,
        selectedVehicle: window.UEAH_BOAT_IELTS.getSelectedVehicle(),
        closed: !document.querySelector('.ueah-boat-ielts-modal'),
        boatUnique: new Set(boatPrompts).size,
        arcadeUnique: new Set(arcadePrompts).size,
      };
    });

    console.log(`Sky Quest question pause: ${frozen ? 'OK' : 'FAIL'}`);
    console.log(`Sky Quest answer resume: ${resumed ? 'OK' : 'FAIL'}`);
    const boatOk = randomSequences.answerCount === 4
      && randomSequences.selectedVehicle === 'boat'
      && randomSequences.closed
      && randomSequences.boatUnique === 6;
    const arcadeOk = randomSequences.arcadeUnique === 10;
    console.log(`Sky Quest boat shuffled questions: ${boatOk ? 'OK' : 'FAIL'}`);
    console.log(`IELTS Arcade shuffled questions: ${arcadeOk ? 'OK' : 'FAIL'}`);
    if (!frozen || !resumed || !boatOk || !arcadeOk) process.exitCode = 2;
  } finally {
    await browser.close();
  }
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 3;
});
