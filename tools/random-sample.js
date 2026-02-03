const fs = require('fs');
const path = require('path');

function sample(arr, n) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a.slice(0, n);
}

const repo = path.join(__dirname, '..');

// Pages/features (hand-defined routes)
const features = [
  'Home (/)',
  'Resources index (/resources)',
  'Resources detail (/resources/:age/:skill/:slug)',
  'Tests index (/tests)',
  'Test runner (/tests/:slug)',
  'Profile (/profile)',
  'Certificates (/profile/certificates/all)',
  'Games (/games)'
];

const dataDir = path.join(repo, 'assets', 'data');
const bankFiles = fs.readdirSync(dataDir).filter(f => f.startsWith('tests-') && f.endsWith('.js'));

const resourcesDir = path.join(repo, 'assets', 'js', 'resources');
const resourceFiles = fs.readdirSync(resourcesDir).filter(f => f.endsWith('.js'));
const urls = [];
for (const f of resourceFiles) {
  const s = fs.readFileSync(path.join(resourcesDir, f), 'utf8');
  for (const m of s.matchAll(/https?:\/\/[^\"'\s)]+/g)) {
    urls.push(m[0]);
  }
}
const uniqueUrls = Array.from(new Set(urls));

console.log('FEATURE_DEEP_DIVES=' + JSON.stringify(sample(features, 3), null, 0));
console.log('BANKS_TO_VALIDATE=' + JSON.stringify(sample(bankFiles, 3), null, 0));
console.log('EXTERNAL_LINKS_SPOTCHECK=' + JSON.stringify(sample(uniqueUrls, 10), null, 0));
