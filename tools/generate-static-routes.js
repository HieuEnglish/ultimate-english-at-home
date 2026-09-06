/* Generate GitHub Pages route shells and sitemap from one canonical route list.
   Each shell gets per-route title/description/canonical/OG so no-JS crawlers
   see unique content instead of a verbatim copy of index.html. */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const ORIGIN = 'https://hieuenglish.github.io/ultimate-english-at-home';
const ages = ['0-3', '4-7', '8-10', '11-12', '13-18', 'ielts'];
const skills = ['reading', 'listening', 'writing', 'speaking'];
const gameAges = ['0-3', '4-7', '8-10', '11-12', '13-18'];
const gameSkills = ['vocabulary', 'listening', 'spelling', 'grammar', 'speaking', 'reading', 'writing'];

function titleCase(s) {
  const t = String(s || '').trim();
  return t ? t.charAt(0).toUpperCase() + t.slice(1) : t;
}

function seoFor(route) {
  const base = 'UEAH — Ultimate English At Home';
  if (route === '/') return { title: base, desc: 'Free English practice by age group and skill: resources, games, and tests.' };
  if (route === '/resources') return { title: 'Resources — UEAH', desc: 'Browse free English resources by age group and skill.' };
  if (route === '/games') return { title: 'Games — UEAH', desc: 'Play free English learning games for vocabulary, spelling, and listening.' };
  if (route === '/tests') return { title: 'Tests — UEAH', desc: 'Take free English practice tests for Reading, Listening, Writing, and Speaking.' };
  if (route === '/profile') return { title: 'Profile — UEAH', desc: 'Save your learning profile and track progress.', robots: 'noindex,follow' };
  if (route === '/favourites') return { title: 'Favourites — UEAH', desc: 'Your saved favourite resources and games.', robots: 'noindex,follow' };
  if (route === '/scoring') return { title: 'Scoring plan — UEAH', desc: 'Practice scoring levels and certificates by age group and skill.' };
  if (route === '/contact') return { title: 'Contact — UEAH', desc: 'Send feedback, report issues, or suggest resources.' };
  if (route === '/privacy') return { title: 'Privacy and data use — UEAH', desc: 'How UEAH stores progress locally and uses the microphone.' };
  if (route === '/profile/certificates') return { title: 'Certificates — UEAH', desc: 'View your achievement certificates.', robots: 'noindex,follow' };
  if (route === '/profile/certificates/all') return { title: 'All certificates — UEAH', desc: 'View all unlocked certificates.', robots: 'noindex,follow' };
  const parts = route.split('/').filter(Boolean);
  if (parts[0] === 'resources' && parts.length === 2) return { title: `Resources (${parts[1]}) — UEAH`, desc: `Free English resources for ages ${parts[1]}.` };
  if (parts[0] === 'resources' && parts.length === 3) return { title: `${titleCase(parts[2])} resources (${parts[1]}) — UEAH`, desc: `Free ${parts[2]} resources for ages ${parts[1]}.` };
  if (parts[0] === 'games' && parts.length === 2) return { title: `Games (${parts[1]}) — UEAH`, desc: `Free English games for ages ${parts[1]}.` };
  if (parts[0] === 'games' && parts.length === 3) return { title: `${titleCase(parts[2])} games (${parts[1]}) — UEAH`, desc: `Free ${parts[2]} games for ages ${parts[1]}.` };
  if (parts[0] === 'tests' && parts.length === 2) return { title: `Test: ${parts[1]} — UEAH`, desc: `Free English practice test: ${parts[1]}.` };
  return { title: `${titleCase(parts[0])} — UEAH`, desc: 'Free English practice at home.' };
}

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

const routes = [
  '/', '/resources', '/games', '/tests', '/profile', '/favourites',
  '/scoring', '/contact', '/privacy',
  '/profile/certificates', '/profile/certificates/all',
  ...ages.map((age) => `/resources/${age}`),
  ...ages.flatMap((age) => skills.map((skill) => `/resources/${age}/${skill}`)),
  ...skills.map((skill) => `/tests/iels-${skill}`),
  ...gameAges.map((age) => `/games/${age}`),
  ...gameAges.flatMap((age) => gameSkills.map((skill) => `/games/${age}/${skill}`)),
];

const source = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
for (const route of routes) {
  const seo = seoFor(route);
  const canonical = `${ORIGIN}${route === '/' ? '/' : route}`;
  let html = source;
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${esc(seo.title)}</title>`);
  html = html.replace(/(<meta name="description"\s+content=")[^"]*(")/, `$1${esc(seo.desc)}$2`);
  html = html.replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${esc(seo.title)}$2`);
  html = html.replace(/(<meta property="og:description"\s+content=")[^"]*(")/, `$1${esc(seo.desc)}$2`);
  html = html.replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${canonical}$2`);
  html = html.replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${canonical}$2`);
  html = html.replace(/(<meta name="twitter:title" content=")[^"]*(")/, `$1${esc(seo.title)}$2`);
  html = html.replace(/(<meta name="twitter:description" content=")[^"]*(")/, `$1${esc(seo.desc)}$2`);
  if (seo.robots) html = html.replace(/(<meta name="robots" content=")[^"]*(")/, `$1${seo.robots}$2`);
  if (route === '/') continue;
  const dir = path.join(ROOT, ...route.slice(1).split('/'));
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), html);
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
