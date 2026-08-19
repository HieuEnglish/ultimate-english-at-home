/* Small dependency-free checks for security invariants in this static app. */
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const files = [
  'index.html',
  'assets/js/games/engine.js',
  'assets/js/landing-particles.js',
  'assets/css/nextgen.css',
];
const errors = [];
for (const relative of files) {
  const text = fs.readFileSync(path.join(root, relative), 'utf8');
  if (/fonts\.(googleapis|gstatic)\.com/i.test(text)) errors.push(`${relative}: remote Google Font dependency`);
  if (/cdnjs\.cloudflare\.com\/ajax\/libs\/three|cdn\.jsdelivr\.net\/npm\/three/i.test(text)) {
    errors.push(`${relative}: remote Three.js runtime dependency`);
  }
  if (/document\.write\s*\(/.test(text)) errors.push(`${relative}: document.write is not allowed`);
}
if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(2);
}
console.log('SECURITY_CHECK_OK');
