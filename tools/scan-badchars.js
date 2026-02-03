const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');

function walk(dir) {
  const out = [];
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) out.push(...walk(p));
    else out.push(p);
  }
  return out;
}

const files = walk(path.join(root, 'assets')).filter(p => p.endsWith('.js'));

const bad = [];
for (const f of files) {
  const s = fs.readFileSync(f, 'utf8');
  const idx = s.indexOf('�');
  if (idx !== -1) {
    const before = s.slice(Math.max(0, idx - 40), idx).replace(/\s+/g, ' ');
    const after = s.slice(idx, Math.min(s.length, idx + 60)).replace(/\s+/g, ' ');
    bad.push({ file: path.relative(root, f), snippet: before + after });
  }
}

for (const b of bad) {
  console.log(`${b.file}\t${b.snippet}`);
}

console.log(`TOTAL_FILES_WITH_REPLACEMENT_CHAR=${bad.length}`);
