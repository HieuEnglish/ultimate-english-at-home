/* Automated WCAG accessibility audit for representative static SPA routes. */

const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');
const AxeBuilder = require('@axe-core/playwright').default;

function arg(name) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : null;
}

function routeUrl(base, route) {
  const url = new URL(base);
  if (route !== '/') url.search = `r=${encodeURIComponent(route)}`;
  return url.toString();
}

const targets = [
  ['Home', '/'],
  ['Resources', '/resources'],
  ['Games', '/games'],
  ['Tests', '/tests'],
  ['Profile', '/profile'],
  ['Favourites', '/favourites'],
  ['Scoring', '/scoring'],
  ['Contact', '/contact'],
  ['Word Search', '/games/8-10/vocabulary/word-search'],
  ['Debate Prep', '/games/13-18/speaking/debate-prep'],
  ['Listening test', '/tests/age-4-7-listening'],
  ['Writing test', '/tests/age-13-18-writing'],
];

async function run() {
  const base = arg('--url') || 'http://127.0.0.1:4173/';
  const root = path.resolve(__dirname, '..', '..');
  const outputPath = path.join(root, 'tmp', 'accessibility-audit-report.json');
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 }, permissions: ['microphone'] });
  const results = [];

  for (const [name, route] of targets) {
    const page = await context.newPage();
    const result = { name, route, violations: [] };
    process.stdout.write(`${name} `);
    try {
      await page.goto(routeUrl(base, route), { waitUntil: 'domcontentloaded', timeout: 30000 });
      await page.locator('main h1').waitFor({ state: 'visible', timeout: 20000 });

      if (route.startsWith('/games/')) {
        const start = page.locator('#game-start-btn:visible');
        if (await start.count()) await start.click();
        await page.waitForTimeout(500);
      }

      const audit = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze();
      result.violations = audit.violations.map((violation) => ({
        id: violation.id,
        impact: violation.impact,
        help: violation.help,
        nodes: violation.nodes.map((node) => ({ target: node.target, summary: node.failureSummary })),
      }));
    } catch (error) {
      result.error = error.message;
    } finally {
      await page.close();
    }
    results.push(result);
    process.stdout.write(`${result.error ? 'ERROR' : `${result.violations.length} violation(s)`}\n`);
  }

  await browser.close();
  const serious = results.flatMap((result) => result.violations.filter((v) => ['serious', 'critical'].includes(v.impact)).map((v) => ({ page: result.name, ...v })));
  const errors = results.filter((result) => result.error);
  fs.writeFileSync(outputPath, JSON.stringify({ targets: results.length, serious: serious.length, errors: errors.length, results }, null, 2));

  console.log(`Pages checked: ${results.length}; serious/critical violations: ${serious.length}; audit errors: ${errors.length}`);
  console.log(`Report: ${outputPath}`);
  for (const violation of serious.slice(0, 30)) {
    console.log(`- ${violation.page}: [${violation.impact}] ${violation.id} - ${violation.help} (${violation.nodes.length} node(s))`);
  }
  process.exitCode = serious.length || errors.length ? 2 : 0;
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 3;
});
