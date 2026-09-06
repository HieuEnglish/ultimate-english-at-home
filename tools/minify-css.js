/* tools/minify-css.js — naive dependency-free CSS minifier for Pages.
   Reads assets/css/*.css (excluding *.min.css) and writes *.min.css.
   Strips comments, collapses whitespace, removes trailing semicolons before }. */
const fs = require('fs');
const path = require('path');

const dir = path.resolve(__dirname, '..', 'assets', 'css');
const files = fs.readdirSync(dir).filter((f) => f.endsWith('.css') && !f.endsWith('.min.css'));

let totalBefore = 0;
let totalAfter = 0;
for (const f of files) {
  const full = path.join(dir, f);
  const src = fs.readFileSync(full, 'utf8');
  totalBefore += Buffer.byteLength(src);
  let out = src
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\s+/g, ' ')
    .replace(/\s*([{}:;,>~+])\s*/g, '$1')
    .replace(/;}/g, '}')
    .trim();
  const minName = f.replace(/\.css$/, '.min.css');
  fs.writeFileSync(path.join(dir, minName), out);
  totalAfter += Buffer.byteLength(out);
  console.log(`${f} -> ${minName}: ${Buffer.byteLength(src)} -> ${Buffer.byteLength(out)} bytes`);
}
console.log(`CSS_MINIFY_OK ${totalBefore} -> ${totalAfter} bytes`);
