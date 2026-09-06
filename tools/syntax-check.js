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
const fsTmp = require('os').tmpdir();
let ok = 0;
let bad = 0;
for (const p of files) {
  const f = path.relative(root, p);
  try {
    const src = fs.readFileSync(p, 'utf8');
    // node --check parses .js as CommonJS and misses ESM-only errors
    // (e.g. illegal return). Re-check module-syntax files as ESM.
    if (/^\s*(import|export)\b/m.test(src)) {
      const tmp = path.join(fsTmp, `ueah-syntax-${process.pid}-${ok + bad}.mjs`);
      fs.writeFileSync(tmp, src);
      try {
        execSync(`node --check "${tmp}"`, { stdio: 'pipe' });
      } finally {
        try { fs.unlinkSync(tmp); } catch (_) {}
      }
    } else {
      execSync(`node --check "${p}"`, { stdio: 'pipe' });
    }
    ok++;
  } catch (e) {
    bad++;
    const msg = (e.stderr || e.stdout || '').toString() || e.message;
    console.log(`FAIL\t${f}\t${msg.split(/\r?\n/).slice(0,6).join(' | ')}`);
  }
}
console.log(`SYNTAX_OK=${ok} SYNTAX_FAIL=${bad}`);
