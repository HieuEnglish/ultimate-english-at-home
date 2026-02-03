const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'assets', 'data');
const files = fs.readdirSync(dir).filter(f => f.startsWith('tests-') && f.endsWith('.js'));

for (const f of files) {
  const s = fs.readFileSync(path.join(dir, f), 'utf8');
  const ids = Array.from(s.matchAll(/id:\s*"([^"]+)"/g), m => m[1]);
  let maxN = 0;
  for (const id of ids) {
    const mm = id.match(/(\d+)$/);
    if (mm) maxN = Math.max(maxN, parseInt(mm[1], 10));
  }
  console.log(`${f}\tids=${ids.length}\tmaxN=${maxN}\tlast=${ids[ids.length - 1]}`);
}
