/* Static question-bank validation for the no-build GitHub Pages app. */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.join(__dirname, '..');
const dataDir = path.join(root, 'assets', 'data');
const files = fs.readdirSync(dataDir).filter((name) => name.startsWith('tests-') && name.endsWith('.js'));
const errors = [];
const warnings = [];
let bankCount = 0;
let questionCount = 0;

function compact(value) {
  return String(value == null ? '' : value).trim().replace(/\s+/g, ' ').toLowerCase();
}

function issue(list, file, slug, index, message) {
  list.push(`${file} :: ${slug}[${index}] ${message}`);
}

for (const file of files) {
  const filePath = path.join(dataDir, file);
  const window = { UEAH_TEST_BANKS: {} };
  try {
    vm.runInNewContext(fs.readFileSync(filePath, 'utf8'), { window }, { filename: filePath, timeout: 5000 });
  } catch (error) {
    errors.push(`${file} could not execute: ${error.message}`);
    continue;
  }

  const entries = Object.entries(window.UEAH_TEST_BANKS || {});
  if (entries.length !== 1) {
    errors.push(`${file} must register exactly one bank; found ${entries.length}`);
    continue;
  }

  const [slug, questions] = entries[0];
  bankCount += 1;
  if (!Array.isArray(questions) || questions.length === 0) {
    errors.push(`${file} :: ${slug} must contain a non-empty question array`);
    continue;
  }

  const seenIds = new Set();
  questions.forEach((question, index) => {
    questionCount += 1;
    if (!question || typeof question !== 'object' || Array.isArray(question)) {
      issue(errors, file, slug, index, 'must be an object');
      return;
    }

    const id = String(question.id == null ? '' : question.id).trim();
    if (id) {
      if (seenIds.has(id)) issue(errors, file, slug, index, `duplicates id "${id}"`);
      seenIds.add(id);
    } else {
      issue(warnings, file, slug, index, 'has no explicit id');
    }

    const type = compact(question.type);
    if (!type) issue(warnings, file, slug, index, 'has no type');

    if (Array.isArray(question.options)) {
      if (question.options.length < 2) issue(errors, file, slug, index, 'must provide at least two options');
      // Preserve case: capitalization exercises intentionally contrast values
      // such as "A" and "a".
      const normalized = question.options.map((option) => String(option == null ? '' : option).trim());
      if (new Set(normalized).size !== normalized.length) issue(errors, file, slug, index, 'contains duplicate options');
      const answer = Number(question.answer);
      if (!Number.isInteger(answer) || answer < 0 || answer >= question.options.length) {
        issue(errors, file, slug, index, `has invalid answer index "${question.answer}"`);
      }
    }

    const prompt = compact(question.question || question.prompt || question.say || question.task || question.cueCard);
    if (!prompt) issue(warnings, file, slug, index, 'has no recognizable prompt text');
  });
}

console.log(`BANKS=${bankCount} QUESTIONS=${questionCount} ERRORS=${errors.length} WARNINGS=${warnings.length}`);
for (const error of errors.slice(0, 50)) console.log(`ERROR\t${error}`);
for (const warning of warnings.slice(0, 25)) console.log(`WARN\t${warning}`);
if (errors.length > 50) console.log(`ERROR\t... +${errors.length - 50} more`);
if (warnings.length > 25) console.log(`WARN\t... +${warnings.length - 25} more`);
process.exitCode = errors.length ? 2 : 0;
