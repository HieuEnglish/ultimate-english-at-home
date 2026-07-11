/* Catalogue-wide test-runner smoke audit for the static GitHub Pages app.
   Usage: node tests.js --url http://127.0.0.1:4173/
*/

const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

function arg(name) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : null;
}

function routeUrl(base, route) {
  const url = new URL(base);
  url.search = `r=${encodeURIComponent(route)}`;
  return url.toString();
}

async function run() {
  const base = arg('--url') || 'http://127.0.0.1:4173/';
  const root = path.resolve(__dirname, '..', '..');
  const outputPath = path.join(root, 'tmp', 'tests-audit-report.json');
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 }, permissions: ['microphone'] });
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
  await indexPage.goto(routeUrl(base, '/tests'), { waitUntil: 'domcontentloaded' });
  await indexPage.waitForFunction(() => Boolean(window.UEAH_TESTS_STORE?.getAll));
  const tests = await indexPage.evaluate(() => window.UEAH_TESTS_STORE.getAll());
  await indexPage.close();

  const results = [];
  for (let index = 0; index < tests.length; index += 1) {
    const test = tests[index];
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', (error) => errors.push(`pageerror: ${String(error)}`));
    page.on('console', (message) => {
      const text = message.text();
      if (message.type() === 'error' && !text.startsWith('Failed to load resource:')) errors.push(`console: ${text}`);
    });
    page.on('requestfailed', (request) => {
      const reason = request.failure()?.errorText || '';
      if (!reason.includes('ERR_ABORTED') && !reason.includes('ERR_CONNECTION_RESET')) {
        errors.push(`request: ${reason}: ${request.url()}`);
      }
    });

    const result = { slug: test.slug, skill: test.skill, age: test.age || 'ielts', ok: false, errors };
    process.stdout.write(`[${index + 1}/${tests.length}] ${test.slug} `);
    try {
      await page.goto(routeUrl(base, `/tests/${test.slug}`), { waitUntil: 'domcontentloaded', timeout: 20000 });
      const rootEl = page.locator(`[data-test-runner-root="${test.slug}"]`);
      await rootEl.waitFor({ state: 'visible', timeout: 20000 });
      result.comingSoon = await rootEl.getByText('Coming soon:', { exact: false }).count() > 0;

      const start = rootEl.locator('[data-action="start"], button').filter({ hasText: /^Start(?:\s|$)/i }).first();
      if (await start.count()) {
        await start.click({ timeout: 5000 }).catch((error) => errors.push(`start: ${error.message}`));
        await page.waitForTimeout(350);
      }

      result.controls = await rootEl.locator('button, input, textarea, select').count();
      result.textLength = ((await rootEl.innerText().catch(() => '')) || '').trim().length;
      result.ok = !result.comingSoon && errors.length === 0 && result.controls > 0 && result.textLength > 20;
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
  console.log(`Tests checked: ${report.total} (OK ${report.passed}, Fail ${report.failed})`);
  console.log(`Report: ${outputPath}`);
  for (const result of failed) {
    console.log(`- ${result.slug}: ${result.errors.join(' | ') || `comingSoon=${result.comingSoon}, controls=${result.controls}`}`);
  }
  process.exitCode = failed.length ? 2 : 0;
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 3;
});
