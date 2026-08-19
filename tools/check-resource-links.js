/* Scheduled audit for definitively broken (404/410) curated resource links. */
const fs = require('fs');
const path = require('path');

const dir = path.resolve(__dirname, '..', 'assets', 'js', 'resources');
const urls = new Set();
for (const name of fs.readdirSync(dir).filter((name) => name.endsWith('.js'))) {
  const text = fs.readFileSync(path.join(dir, name), 'utf8');
  for (const match of text.matchAll(/https?:\/\/[^\s"'`<>]+/g)) urls.add(match[0].replace(/[),.;]+$/, ''));
}

async function check(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 12000);
  try {
    const response = await fetch(url, { method: 'GET', redirect: 'follow', signal: controller.signal });
    return { url, status: response.status, broken: response.status === 404 || response.status === 410 };
  } catch (error) {
    return { url, status: 0, warning: error.name || 'network error' };
  } finally {
    clearTimeout(timer);
  }
}

(async () => {
  const queue = [...urls];
  const results = [];
  const workers = Array.from({ length: 8 }, async () => {
    while (queue.length) results.push(await check(queue.shift()));
  });
  await Promise.all(workers);
  const broken = results.filter((item) => item.broken);
  const warnings = results.filter((item) => item.warning);
  console.log(`RESOURCE_LINKS=${results.length} BROKEN=${broken.length} WARNINGS=${warnings.length}`);
  broken.forEach((item) => console.error(`${item.status} ${item.url}`));
  if (broken.length) process.exitCode = 2;
})();
