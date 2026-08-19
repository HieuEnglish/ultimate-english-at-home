/* Generate GitHub Pages route shells and sitemap from one canonical route list. */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const ORIGIN = 'https://hieuenglish.github.io/ultimate-english-at-home';
const ages = ['0-3', '4-7', '8-10', '11-12', '13-18', 'ielts'];
const skills = ['reading', 'listening', 'writing', 'speaking'];
const routes = [
  '/', '/resources', '/games', '/tests', '/profile', '/favourites',
  '/scoring', '/contact', '/privacy',
  ...ages.map((age) => `/resources/${age}`),
  ...ages.flatMap((age) => skills.map((skill) => `/resources/${age}/${skill}`)),
  ...skills.map((skill) => `/tests/iels-${skill}`),
];

const source = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
for (const route of routes) {
  if (route === '/') continue;
  const dir = path.join(ROOT, ...route.slice(1).split('/'));
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), source);
}

const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...routes.map((route) => `  <url><loc>${ORIGIN}${route === '/' ? '/' : route}</loc></url>`),
  '</urlset>',
  '',
].join('\n');
fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), xml);
console.log(`Generated ${routes.length - 1} route shells and ${routes.length} sitemap entries.`);
