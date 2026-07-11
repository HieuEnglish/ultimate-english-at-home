const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');

function collectJsFiles(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === '.git' || entry.name === 'node_modules' || full.includes(path.join('assets', 'vendor'))) return [];
      return collectJsFiles(full);
    }
    return entry.isFile() && entry.name.endsWith('.js') ? [full] : [];
  });
}

const files = collectJsFiles(root);
let ok = 0;
let bad = 0;
for (const p of files) {
  const f = path.relative(root, p);
  try {
    execSync(`node --check "${p}"`, { stdio: 'pipe' });
    ok++;
  } catch (e) {
    bad++;
    const msg = (e.stderr || e.stdout || '').toString() || e.message;
    console.log(`FAIL\t${f}\t${msg.split(/\r?\n/).slice(0,6).join(' | ')}`);
  }
}
console.log(`SYNTAX_OK=${ok} SYNTAX_FAIL=${bad}`);
