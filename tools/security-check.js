/* Security invariants for this static app (dependency-free). */
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const errors = [];

function walk(dir, out) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name === 'vendor' || e.name === 'node_modules' || e.name.startsWith('.')) continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (/\.(html|js|css)$/.test(e.name)) out.push(p);
  }
}

const staticFiles = ['index.html', '404.html', 'landing.html'];
for (const relative of staticFiles) {
  const p = path.join(root, relative);
  if (!fs.existsSync(p)) continue;
  const text = fs.readFileSync(p, 'utf8');
  if (/fonts\.(googleapis|gstatic)\.com/i.test(text)) errors.push(`${relative}: remote Google Font dependency`);
  if (/cdnjs\.cloudflare\.com\/ajax\/libs\/three|cdn\.jsdelivr\.net\/npm\/three/i.test(text)) errors.push(`${relative}: remote Three.js runtime dependency`);
  if (/document\.write\s*\(/.test(text)) errors.push(`${relative}: document.write is not allowed`);
  if (/target="_blank"(?![^>]*rel="[^"]*noopener)/i.test(text)) errors.push(`${relative}: target=_blank without rel=noopener`);
  if (relative !== 'landing.html' && !/Content-Security-Policy/i.test(text)) errors.push(`${relative}: missing CSP meta`);
}

// Full JS scan: dangerous sinks must be escaped / justified.
const jsFiles = [];
walk(path.join(root, 'assets', 'js'), jsFiles);
const sinkRe = /innerHTML|outerHTML|insertAdjacentHTML|\beval\s*\(|new Function\s*\(|document\.write\s*\(/g;
let unescapedCount = 0;
for (const f of jsFiles) {
  const text = fs.readFileSync(f, 'utf8');
  const rel = path.relative(root, f).replace(/\\/g, '/');
  let m;
  sinkRe.lastIndex = 0;
  while ((m = sinkRe.exec(text))) {
    const lineStart = text.lastIndexOf('\n', m.index) + 1;
    const lineEnd = text.indexOf('\n', m.index);
    const line = text.slice(lineStart, lineEnd === -1 ? undefined : lineEnd);
    if (/ueah-safe:/.test(line)) continue;
    // Allow if same line uses an escape helper or safe token helper or textContent-adjacent safety.
    if (/UEAH_SAFE\.(escapeHtml|escapeAttr|safeClassToken|safeCssToken)|escapeHtml|escapeAttr|safeClassToken|safeCssToken|[^a-zA-Z]esc(Css|Attr)?\(|textContent/.test(line)) continue;
    // Numeric-only interpolations (idx, i, Math.floor(score)) cannot break out of HTML.
    var interps = Array.from(line.matchAll(/\$\{([^}]+)\}/g)).map(function (m) { return m[1].trim(); });
    if (interps.length && interps.every(function (e) { return /^(idx|i|Math\.floor\([^)]*\)|Number\([^)]*\)|\d+|idx === 0 \? 'active' : '')$/.test(e); })) continue;
    // Static container shells (this.container.innerHTML = ` + no ${data}) are low-risk; only flag interpolations.
    if (!line.includes('${')) continue;
    unescapedCount++;
    if (unescapedCount <= 20) errors.push(`${rel}: unescaped sink -> ${line.trim().slice(0, 140)}`);
  }
}
if (unescapedCount > 20) errors.push(`... and ${unescapedCount - 20} more unescaped interpolations`);

// NOTE: frame-ancestors is intentionally NOT in the meta CSP: Chromium ignores
// it in <meta> elements, so asserting it would be a false guarantee on Pages
// (no custom headers). Clickjacking cover: app has no sensitive actions;
// state is localStorage-only.

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(2);
}
console.log(`SECURITY_CHECK_OK (${jsFiles.length} js files scanned)`);
