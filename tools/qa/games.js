/* Catalogue-wide game smoke audit.
   Usage: node games.js --url http://127.0.0.1:4173/
*/

const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

function arg(name) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : null;
}

function gameUrl(base, game) {
  const route = game.age === 'featured'
    ? `/games/featured/comprehensive/${game.slug}`
    : `/games/${game.age}/${game.skill}/${game.slug}`;
  const url = new URL(base);
  url.search = `r=${encodeURIComponent(route)}`;
  return url.toString();
}

async function run() {
  const base = arg('--url') || 'http://127.0.0.1:4173/';
  const root = path.resolve(__dirname, '..', '..');
  const outputPath = path.join(root, 'tmp', 'games-audit-report.json');
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 },
    permissions: ['microphone'],
  });
  await context.addInitScript(() => {
    class MockRecognition {
      start() {}
      stop() {}
      abort() {}
    }
    window.SpeechRecognition ||= MockRecognition;
    window.webkitSpeechRecognition ||= MockRecognition;
  });

  const indexPage = await context.newPage();
  await indexPage.goto(new URL('?r=%2Fgames', base).toString(), { waitUntil: 'domcontentloaded' });
  await indexPage.waitForFunction(() => Boolean(window.UEAH_GAMES_STORE?.getAllGames));
  let games = await indexPage.evaluate(() => window.UEAH_GAMES_STORE.getAllGames());
  const requestedSlugs = (arg('--slugs') || '').split(',').map((slug) => slug.trim()).filter(Boolean);
  if (requestedSlugs.length) games = games.filter((game) => requestedSlugs.includes(game.slug));
  await indexPage.close();

  const results = [];
  for (let index = 0; index < games.length; index += 1) {
    const game = games[index];
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', (error) => errors.push(`pageerror: ${String(error)}`));
    page.on('console', (message) => {
      const text = message.text();
      if (message.type() === 'error' && !text.startsWith('Failed to load resource:')) {
        errors.push(`console: ${text}`);
      }
    });

    const result = { slug: game.slug, age: game.age, skill: game.skill, ok: false, errors };
    process.stdout.write(`[${index + 1}/${games.length}] ${game.slug} `);
    try {
      await page.goto(gameUrl(base, game), { waitUntil: 'domcontentloaded', timeout: 20000 });
      await page.locator('#game-container').waitFor({ state: 'visible', timeout: 10000 });
      await page.locator('#game-status-pill').waitFor({ state: 'visible', timeout: 10000 });
      await page.waitForTimeout(250);

      const start = page.locator('#game-start-btn:visible');
      if (await start.count()) {
        await start.click({ timeout: 3000 }).catch((error) => errors.push(`start: ${error.message}`));
        await page.waitForTimeout(400);
      }

      result.loadError = await page.locator('.game-error').count() > 0;
      result.status = (await page.locator('#game-status-pill').textContent().catch(() => ''))?.trim();
      result.controls = await page.locator('#game-container button, #game-container input, #game-container textarea, #game-container canvas, #game-container iframe, #game-container .grid-cell').count();
      if (result.controls === 0) {
        // Some games intentionally create their first control on a short timer.
        await page.waitForTimeout(1000);
        result.controls = await page.locator('#game-container button, #game-container input, #game-container textarea, #game-container canvas, #game-container iframe, #game-container .grid-cell').count();
      }
      if (game.slug === 'word-search') {
        const endpoints = await page.evaluate(() => {
          const size = 9;
          const cells = Array.from(document.querySelectorAll('.grid-cell'));
          const grid = Array.from({ length: size }, () => Array(size).fill(''));
          cells.forEach((cell) => { grid[Number(cell.dataset.r)][Number(cell.dataset.c)] = cell.textContent.trim(); });
          const words = Array.from(document.querySelectorAll('.word-item')).map((item) => item.textContent.trim());
          const directions = [[0, 1], [1, 0], [1, 1], [-1, 1]];
          for (const word of words) {
            for (let r = 0; r < size; r += 1) for (let c = 0; c < size; c += 1) for (const [dr, dc] of directions) {
              const endR = r + (word.length - 1) * dr;
              const endC = c + (word.length - 1) * dc;
              if (endR < 0 || endR >= size || endC < 0 || endC >= size) continue;
              let candidate = '';
              for (let i = 0; i < word.length; i += 1) candidate += grid[r + i * dr][c + i * dc];
              if (candidate === word) return { word, r, c, endR, endC };
            }
          }
          return null;
        });
        if (!endpoints) {
          errors.push('keyboard: could not locate a placed word');
        } else {
          await page.locator(`.grid-cell[data-r="${endpoints.r}"][data-c="${endpoints.c}"]`).focus();
          await page.keyboard.press('Enter');
          await page.locator(`.grid-cell[data-r="${endpoints.endR}"][data-c="${endpoints.endC}"]`).focus();
          await page.keyboard.press('Enter');
          result.keyboardFound = await page.locator(`.word-item[data-word="${endpoints.word}"].found`).count() > 0;
          if (!result.keyboardFound) errors.push('keyboard: selecting a word did not mark it found');
        }
      }
      if (['ielts-invaders', 'ielts-snake', 'ielts-breakout'].includes(game.slug)) {
        const quiz = page.locator('.ia-quiz:not([hidden])');
        await quiz.waitFor({ state: 'visible', timeout: 3000 });
        result.ieltsAnswers = await quiz.locator('[data-answer]').count();
        result.ieltsCanvas = await page.locator('.ia-canvas').count();
        if (result.ieltsAnswers !== 4) errors.push(`ielts: expected 4 answers, found ${result.ieltsAnswers}`);
        if (result.ieltsCanvas !== 1) errors.push(`ielts: expected one game canvas, found ${result.ieltsCanvas}`);
        await quiz.locator('[data-answer]').first().click();
        await quiz.waitFor({ state: 'hidden', timeout: 3000 });
        await page.locator('.ia-canvas').focus();
        await page.keyboard.press('ArrowRight');
        result.ieltsRoundActive = await page.locator('.ia-power').count() === 1;
        if (!result.ieltsRoundActive) errors.push('ielts: round did not continue after answering');
      }
      result.ok = !result.loadError && errors.length === 0 && result.controls > 0;
    } catch (error) {
      errors.push(`fatal: ${error.message}`);
    } finally {
      await page.close();
    }
    results.push(result);
    process.stdout.write(`${result.ok ? 'OK' : 'FAIL'}\n`);
  }

  await browser.close();
  const failed = results.filter((result) => !result.ok);
  const report = { total: results.length, passed: results.length - failed.length, failed: failed.length, results };
  fs.writeFileSync(outputPath, JSON.stringify(report, null, 2));
  console.log(`Games checked: ${report.total} (OK ${report.passed}, Fail ${report.failed})`);
  console.log(`Report: ${outputPath}`);
  for (const result of failed.slice(0, 20)) {
    console.log(`- ${result.slug}: ${result.errors.join(' | ') || `status=${result.status}, controls=${result.controls}`}`);
  }
  process.exitCode = failed.length ? 2 : 0;
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 3;
});
