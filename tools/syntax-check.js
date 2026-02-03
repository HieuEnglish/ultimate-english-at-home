const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'assets', 'data');
const files = fs.readdirSync(dir).filter(f => f.startsWith('tests-') && f.endsWith('.js'));
let ok = 0;
let bad = 0;
for (const f of files) {
  const p = path.join(dir, f);
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
