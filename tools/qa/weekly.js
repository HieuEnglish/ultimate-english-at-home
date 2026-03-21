/* Weekly QA smoke: crawl key SPA routes + click primary nav/CTAs.
   Output: human-readable summary + nonzero exit on failures.

   Usage:
     node weekly.js --url "https://hieuenglish.github.io/ultimate-english-at-home/"
     (If omitted, uses site canonical base.)
*/

const { chromium } = require('playwright');

function arg(name) {
  const i = process.argv.indexOf(name);
  return i >= 0 ? process.argv[i + 1] : null;
}

function nowIso() {
  return new Date().toISOString();
}

function asUrl(base, p) {
  const u = new URL(base);
  const raw = String(p || '');

  if (raw.startsWith('/?')) {
    const basePath = u.pathname.endsWith('/') ? u.pathname : u.pathname + '/';
    u.pathname = basePath;
    u.search = raw.slice(2);
    u.hash = '';
    return u.toString();
  }

  // preserve basePath
  const basePath = u.pathname.endsWith('/') ? u.pathname.slice(0, -1) : u.pathname;
  const path = raw.startsWith('/') ? raw : '/' + raw;
  u.pathname = basePath + path;
  u.search = '';
  u.hash = '';
  return u.toString();
}

async function run() {
  const base = arg('--url') || 'https://hieuenglish.github.io/ultimate-english-at-home/';
  const headless = (arg('--headless') || '1') !== '0';

  const targets = [
    { name: 'Home', url: asUrl(base, '/') },
    { name: 'Resources', url: asUrl(base, '/resources') },
    { name: 'Tests', url: asUrl(base, '/tests') },
    { name: 'Games', url: asUrl(base, '/games') },
    { name: 'Profile', url: asUrl(base, '/profile') },
    { name: 'Favourites', url: asUrl(base, '/favourites') },
    { name: 'Scoring', url: asUrl(base, '/scoring') },
    { name: 'Contact', url: asUrl(base, '/contact') }
  ];

  const errors = [];
  const warnings = [];
  const results = [];

  const browser = await chromium.launch({ headless });
  const page = await browser.newPage();

  page.on('pageerror', (e) => errors.push({ area: 'console', msg: String(e) }));
  page.on('console', (m) => {
    const t = m.type();
    const text = m.text();
    if (t === 'error') errors.push({ area: 'console', msg: text });
    if (t === 'warning') warnings.push({ area: 'console', msg: text });
  });

  async function checkPage(t) {
    const started = Date.now();
    const r = { name: t.name, url: t.url, ok: true, http: null, ms: null };

    const resp = await page.goto(t.url, { waitUntil: 'domcontentloaded', timeout: 45000 }).catch((e) => {
      r.ok = false;
      errors.push({ area: 'navigation', msg: `${t.name}: navigation failed: ${e}` });
      return null;
    });

    if (resp) {
      r.http = resp.status();
      if (r.http >= 400) {
        r.ok = false;
        errors.push({ area: 'http', msg: `${t.name}: HTTP ${r.http} at ${t.url}` });
      }
    }

    // Basic smoke: header nav exists
    const hasNav = await page.locator('nav[aria-label="Primary"]').count().catch(() => 0);
    if (!hasNav) {
      r.ok = false;
      errors.push({ area: 'ui', msg: `${t.name}: missing primary nav` });
    }

    // Click-through key CTAs on Home/Resources/Tests
    if (t.name === 'Home') {
      const cards = page.locator('main .card-grid > *');
      if ((await cards.count()) < 3) warnings.push({ area: 'ui', msg: 'Home: expected CTA cards list' });
      // Try click the Tests card heading if present
      const testsCard = page.getByRole('heading', { name: 'Tests' }).first();
      if (await testsCard.count()) {
        await testsCard.click().catch(() => warnings.push({ area: 'ui', msg: 'Home: Tests CTA not clickable' }));
        await page.waitForTimeout(300);
      }
    }

    if (t.name === 'Tests') {
      // If the server doesn't support SPA pushState, /tests can 404 on static servers.
      // The app supports deep-link restore via /?r=/tests. Prefer that.
      if (r.http === 404) {
        warnings.push({ area: 'routing', msg: 'Tests: direct /tests returned 404 (static server may not support SPA routes). Use /?r=/tests.' });
      }

      // Smoke-check the Tests index and then open a known runner directly.
      const testCards = page.locator('main .card-grid .card');
      if ((await testCards.count()) > 0) {
        await page.goto(asUrl(base, '/?r=/tests/age-4-7-listening'), { waitUntil: 'domcontentloaded', timeout: 45000 });

        const start = page.getByRole('button', { name: /^Start$/i }).first();
        await start.waitFor({ state: 'visible', timeout: 3000 }).catch(() => null);
        if (await start.count()) {
          await start.click();

          // Click the first actionable button inside the runner after starting.
          const runnerButtons = page.locator('[data-test-runner-root] button:not([disabled])');
          await runnerButtons.first().waitFor({ state: 'visible', timeout: 3000 }).catch(() => null);

          const buttonCount = await runnerButtons.count().catch(() => 0);
          let clicked = false;
          for (let i = 0; i < buttonCount; i++) {
            const label = ((await runnerButtons.nth(i).textContent().catch(() => '')) || '').trim();
            if (!label || /^Start$/i.test(label) || /^Back$/i.test(label) || /^Stop$/i.test(label) || /^Test voice$/i.test(label)) {
              continue;
            }
            await runnerButtons.nth(i).click().catch(() => null);
            clicked = true;
            break;
          }

          if (!clicked) {
            warnings.push({ area: 'tests', msg: 'Runner: could not find an actionable answer/control button' });
          }
        } else {
          warnings.push({ area: 'tests', msg: 'Runner: Start button not found' });
        }
      } else {
        warnings.push({ area: 'tests', msg: 'Tests page: could not locate any test cards' });
      }
    }

    r.ms = Date.now() - started;
    results.push(r);
  }

  // Prefer SPA-safe deep links for the checks.
  const spaTargets = targets.map((t) => {
    if (t.name === 'Home') return t;
    // Use redirect-param to avoid 404s on static servers
    const p = new URL(t.url).pathname.replace(new URL(base).pathname, '') || '/';
    return { ...t, url: asUrl(base, `/?r=${encodeURIComponent(p)}`) };
  });

  for (const t of spaTargets) {
    await checkPage(t);
  }

  await browser.close();

  // Report
  const okCount = results.filter((r) => r.ok).length;
  console.log(`UEAH weekly QA @ ${nowIso()}`);
  console.log(`Base: ${base}`);
  console.log(`Pages checked: ${results.length} (OK ${okCount}, Fail ${results.length - okCount})`);
  for (const r of results) {
    const status = r.ok ? 'OK' : 'FAIL';
    console.log(`- ${status} ${r.name} (${r.http ?? 'n/a'}) ${r.ms}ms`);
  }

  if (warnings.length) {
    console.log(`\nWarnings (${warnings.length}):`);
    for (const w of warnings.slice(0, 20)) console.log(`- [${w.area}] ${w.msg}`);
    if (warnings.length > 20) console.log(`- ... +${warnings.length - 20} more`);
  }

  if (errors.length) {
    console.log(`\nErrors (${errors.length}):`);
    for (const e of errors.slice(0, 30)) console.log(`- [${e.area}] ${e.msg}`);
    if (errors.length > 30) console.log(`- ... +${errors.length - 30} more`);
    process.exitCode = 2;
  } else {
    process.exitCode = 0;
  }
}

run().catch((e) => {
  console.error('UEAH weekly QA crashed:', e);
  process.exitCode = 3;
});
