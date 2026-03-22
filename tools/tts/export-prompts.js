/* tools/tts/export-prompts.js
   Export unique TTS prompts from the shared test banks plus reusable game
   speech pulled from fixed literals, prompt pools, and simple templates.

   Usage:
     node tools/tts/export-prompts.js
     node tools/tts/export-prompts.js --out tmp/tts-prompts.json
*/

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const repoRoot = path.resolve(__dirname, "..", "..");
const dataDir = path.join(repoRoot, "assets", "data");
const gamesDir = path.join(repoRoot, "assets", "js", "games");

function parseArgs(argv) {
  const out = { out: path.join(repoRoot, "tmp", "tts-prompts.json") };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--out" && argv[i + 1]) {
      out.out = path.resolve(repoRoot, argv[i + 1]);
      i += 1;
    }
  }
  return out;
}

function normalizeText(text) {
  return String(text == null ? "" : text).replace(/[\s\u00A0]+/g, " ").trim();
}

function loadBanks() {
  const sandbox = { window: {}, console };
  vm.createContext(sandbox);

  for (const file of fs.readdirSync(dataDir).filter((name) => /^tests-.*\.js$/.test(name))) {
    const fullPath = path.join(dataDir, file);
    const code = fs.readFileSync(fullPath, "utf8");
    vm.runInContext(code, sandbox, { filename: fullPath });
  }

  return sandbox.window.UEAH_TEST_BANKS || {};
}

function collectPrompts(banks) {
  const unique = new Map();

  for (const [bank, questions] of Object.entries(banks)) {
    for (const q of questions) {
      for (const key of ["say", "model"]) {
        if (typeof q[key] !== "string") continue;
        const text = normalizeText(q[key]);
        if (!text) continue;

        if (!unique.has(text)) {
          unique.set(text, {
            text,
            keys: new Set(),
            banks: new Set(),
            ids: new Set(),
          });
        }

        const entry = unique.get(text);
        entry.keys.add(key);
        entry.banks.add(bank);
        if (q && q.id) entry.ids.add(String(q.id));
      }
    }
  }

  return Array.from(unique.values())
    .map((entry) => ({
      text: entry.text,
      keys: Array.from(entry.keys).sort(),
      banks: Array.from(entry.banks).sort(),
      ids: Array.from(entry.ids).sort(),
    }))
    .sort((a, b) => a.text.localeCompare(b.text));
}

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (entry.isFile() && full.endsWith(".js")) out.push(full);
  }
  return out;
}

function addPrompt(map, text, meta) {
  const normalized = normalizeText(text);
  if (!normalized) return;
  if (!/[A-Za-z0-9]/.test(normalized)) return;

  if (!map.has(normalized)) {
    map.set(normalized, {
      text: normalized,
      keys: new Set(),
      banks: new Set(),
      ids: new Set(),
      sources: new Set(),
    });
  }

  const entry = map.get(normalized);
  for (const key of meta.keys || []) entry.keys.add(key);
  for (const bank of meta.banks || []) entry.banks.add(bank);
  for (const id of meta.ids || []) entry.ids.add(id);
  for (const source of meta.sources || []) entry.sources.add(source);
}

function getGamePropertyValues(code) {
  const propNames = [
    "name",
    "word",
    "text",
    "phrase",
    "lyric",
    "sound",
    "question",
    "argument",
    "sentence",
    "prompt",
    "verb",
    "target",
  ];

  const out = {};
  for (const prop of propNames) {
    const values = new Set();
    const patterns = [
      new RegExp(`${prop}\\s*:\\s*"([^"\\n]{1,240})"`, "g"),
      new RegExp(`${prop}\\s*:\\s*'([^'\\n]{1,240})'`, "g"),
      new RegExp(`${prop}\\s*:\\s*` + "`" + `([^$\\n]{1,240})` + "`", "g"),
    ];

    for (const re of patterns) {
      let match = null;
      while ((match = re.exec(code))) {
        const text = normalizeText(
          String(match[1] || "")
            .replace(/\\"/g, "\"")
            .replace(/\\'/g, "'")
            .replace(/\\n/g, " ")
            .replace(/\\t/g, " ")
        );
        if (!text) continue;
        if (!/[A-Za-z0-9]/.test(text)) continue;
        values.add(text);
      }
    }

    if (values.size) out[prop] = Array.from(values);
  }

  return out;
}

function resolveTemplateCandidates(expr, props) {
  const normalizedExpr = String(expr || "").trim().toLowerCase();
  const propCandidates = normalizedExpr.split(".").map((part) => part.replace(/[^a-z]/g, ""));
  const lastProp = propCandidates[propCandidates.length - 1] || "";

  if (lastProp && props[lastProp] && props[lastProp].length) {
    return props[lastProp];
  }

  if (normalizedExpr.includes("currentword") || normalizedExpr.endsWith("word") || normalizedExpr === "char") {
    return props.word || [];
  }

  if (
    normalizedExpr.includes("currentpart") ||
    normalizedExpr.includes("currentfruit") ||
    normalizedExpr.includes("currentpet") ||
    normalizedExpr.includes("currentshape") ||
    normalizedExpr.includes("currentcolor") ||
    normalizedExpr.endsWith(".name") ||
    normalizedExpr === "petname"
  ) {
    return props.name || [];
  }

  if (normalizedExpr.includes("sentence")) {
    return props.sentence || props.text || [];
  }

  if (normalizedExpr.includes("phrase")) return props.phrase || [];
  if (normalizedExpr.includes("lyric")) return props.lyric || [];
  if (normalizedExpr.includes("question")) return props.question || [];
  if (normalizedExpr.includes("argument")) return props.argument || [];
  if (normalizedExpr.includes("target")) return props.target || [];
  if (normalizedExpr.includes("sound")) return props.sound || [];
  if (normalizedExpr.includes("verb")) return props.verb || [];

  return props.text || [];
}

function collectGamePrompts() {
  const unique = new Map();
  const files = walk(gamesDir);
  const literalPatterns = [
    /(?:this|window\.UEAH_TTS)\.speak\(\s*"([^"\\]*(?:\\.[^"\\]*)*)"/g,
    /(?:this|window\.UEAH_TTS)\.speak\(\s*'([^'\\]*(?:\\.[^'\\]*)*)'/g,
    /(?:this|window\.UEAH_TTS)\.speak\(\s*`([^`$\\]*(?:\\.[^`$\\]*)*)`/g,
  ];
  const templateSpeakPattern = /(?:this|window\.UEAH_TTS)\.speak\(\s*`([^`]+)`/g;
  const variableSpeakPattern = /(?:this|window\.UEAH_TTS)\.speak\(\s*([A-Za-z_$][A-Za-z0-9_$.]*)\s*(?:,|\))/g;
  const concatSpeakPatterns = [
    /(?:this|window\.UEAH_TTS)\.speak\(\s*"([^"\\]*(?:\\.[^"\\]*)*)"\s*\+\s*([A-Za-z_$][A-Za-z0-9_$.]*)\s*(?:,|\))/g,
    /(?:this|window\.UEAH_TTS)\.speak\(\s*'([^'\\]*(?:\\.[^'\\]*)*)'\s*\+\s*([A-Za-z_$][A-Za-z0-9_$.]*)\s*(?:,|\))/g,
    /(?:this|window\.UEAH_TTS)\.speak\(\s*([A-Za-z_$][A-Za-z0-9_$.]*)\s*\+\s*"([^"\\]*(?:\\.[^"\\]*)*)"\s*(?:,|\))/g,
    /(?:this|window\.UEAH_TTS)\.speak\(\s*([A-Za-z_$][A-Za-z0-9_$.]*)\s*\+\s*'([^'\\]*(?:\\.[^'\\]*)*)'\s*(?:,|\))/g,
  ];

  for (const file of files) {
    const code = fs.readFileSync(file, "utf8");
    const rel = path.relative(repoRoot, file).replace(/\\/g, "/");
    const props = getGamePropertyValues(code);

    for (const values of Object.values(props)) {
      for (const text of values) {
        addPrompt(unique, text, {
          keys: ["game-pool"],
          banks: ["games"],
          sources: [rel],
        });
      }
    }

    for (const re of literalPatterns) {
      let match = null;
      while ((match = re.exec(code))) {
        addPrompt(
          unique,
          String(match[1] || "")
            .replace(/\\"/g, "\"")
            .replace(/\\'/g, "'")
            .replace(/\\n/g, " ")
            .replace(/\\t/g, " "),
          {
            keys: ["game-literal"],
            banks: ["games"],
            sources: [rel],
          }
        );
      }
    }

    let variableMatch = null;
    while ((variableMatch = variableSpeakPattern.exec(code))) {
      const expr = variableMatch[1];
      const candidates = resolveTemplateCandidates(expr, props);
      for (const text of candidates) {
        addPrompt(unique, text, {
          keys: ["game-derived"],
          banks: ["games"],
          sources: [rel],
        });
      }
    }

    for (const re of concatSpeakPatterns) {
      let concatMatch = null;
      while ((concatMatch = re.exec(code))) {
        const startsWithLiteral = re === concatSpeakPatterns[0] || re === concatSpeakPatterns[1];
        const literalText = startsWithLiteral ? concatMatch[1] : concatMatch[2];
        const expr = startsWithLiteral ? concatMatch[2] : concatMatch[1];
        const candidates = resolveTemplateCandidates(expr, props);
        for (const candidate of candidates) {
          const text = startsWithLiteral
            ? `${literalText}${candidate}`
            : `${candidate}${literalText}`;
          addPrompt(unique, text, {
            keys: ["game-concat"],
            banks: ["games"],
            sources: [rel],
          });
        }
      }
    }

    let templateMatch = null;
    while ((templateMatch = templateSpeakPattern.exec(code))) {
      const tpl = templateMatch[1];
      const exprRegex = /\$\{([^}]+)\}/g;
      const parts = [];
      const exprs = [];
      let lastIndex = 0;
      let exprMatch = null;

      while ((exprMatch = exprRegex.exec(tpl))) {
        parts.push(tpl.slice(lastIndex, exprMatch.index));
        exprs.push(exprMatch[1]);
        lastIndex = exprMatch.index + exprMatch[0].length;
      }
      parts.push(tpl.slice(lastIndex));

      if (!exprs.length) continue;

      let combos = [""];
      let valid = true;
      for (let i = 0; i < exprs.length; i += 1) {
        const candidates = resolveTemplateCandidates(exprs[i], props).slice(0, 40);
        if (!candidates.length) {
          valid = false;
          break;
        }

        const next = [];
        for (const prefix of combos) {
          for (const candidate of candidates) {
            next.push(prefix + parts[i] + candidate);
            if (next.length > 1000) break;
          }
          if (next.length > 1000) break;
        }
        combos = next;
      }

      if (!valid) continue;

      for (const prefix of combos) {
        addPrompt(unique, prefix + parts[exprs.length], {
          keys: ["game-template"],
          banks: ["games"],
          sources: [rel],
        });
      }
    }
  }

  return Array.from(unique.values())
    .map((entry) => ({
      text: entry.text,
      keys: Array.from(entry.keys).sort(),
      banks: Array.from(entry.banks).sort(),
      ids: [],
      sources: Array.from(entry.sources).sort(),
    }))
    .sort((a, b) => a.text.localeCompare(b.text));
}

function mergePromptSets(...sets) {
  const merged = new Map();

  for (const set of sets) {
    for (const entry of set) {
      if (!merged.has(entry.text)) {
        merged.set(entry.text, {
          text: entry.text,
          keys: new Set(),
          banks: new Set(),
          ids: new Set(),
          sources: new Set(),
        });
      }

      const target = merged.get(entry.text);
      for (const key of entry.keys || []) target.keys.add(key);
      for (const bank of entry.banks || []) target.banks.add(bank);
      for (const id of entry.ids || []) target.ids.add(id);
      for (const source of entry.sources || []) target.sources.add(source);
    }
  }

  return Array.from(merged.values())
    .map((entry) => ({
      text: entry.text,
      keys: Array.from(entry.keys).sort(),
      banks: Array.from(entry.banks).sort(),
      ids: Array.from(entry.ids).sort(),
      sources: Array.from(entry.sources).sort(),
    }))
    .sort((a, b) => a.text.localeCompare(b.text));
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const banks = loadBanks();
  const testPrompts = collectPrompts(banks);
  const gamePrompts = collectGamePrompts();
  const prompts = mergePromptSets(testPrompts, gamePrompts);

  fs.mkdirSync(path.dirname(args.out), { recursive: true });
  fs.writeFileSync(
    args.out,
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        testPromptCount: testPrompts.length,
        gamePromptCount: gamePrompts.length,
        promptCount: prompts.length,
        prompts,
      },
      null,
      2
    ) + "\n",
    "utf8"
  );

  console.log(`Exported ${prompts.length} unique prompts to ${args.out}`);
}

main();
