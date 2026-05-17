import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const htmlPath = path.join(root, 'mindmap.html');

function fail(message) {
  console.error(message);
  process.exit(1);
}

function scriptSafeJson(value) {
  return JSON.stringify(value).replace(/<\/script/gi, '<\\/script');
}

if (!fs.existsSync(htmlPath)) {
  fail('mindmap.html not found. Run this script from the project root.');
}

const jsxFiles = fs.readdirSync(root)
  .filter((name) => name.endsWith('.jsx'))
  .sort((a, b) => a.localeCompare(b));

const sources = {};
for (const file of jsxFiles) {
  sources[file] = fs.readFileSync(path.join(root, file), 'utf8');
}

let html = fs.readFileSync(htmlPath, 'utf8');
const next = html.replace(
  /(<script id="jsx-data" type="application\/json">)([\s\S]*?)(<\/script>)/,
  `$1${scriptSafeJson(sources)}$3`
);

if (next === html) {
  fail('Could not find the jsx-data script block in mindmap.html.');
}

fs.writeFileSync(htmlPath, next, 'utf8');
console.log(`Synced ${jsxFiles.length} JSX files into mindmap.html.`);

