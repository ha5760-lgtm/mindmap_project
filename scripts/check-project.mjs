import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const requiredFiles = [
  'index.html',
  'mindmap.html',
  'vercel.json',
  'package.json',
  'vendor/react.production.min.js',
  'vendor/react-dom.production.min.js',
  'vendor/babel.min.js',
  'vendor/prop-types.min.js',
  'vendor/Recharts.js',
  'vendor/lucide.min.js'
];

let ok = true;
for (const file of requiredFiles) {
  if (!fs.existsSync(path.join(root, file))) {
    console.error(`Missing: ${file}`);
    ok = false;
  }
}

const htmlPath = path.join(root, 'mindmap.html');
if (fs.existsSync(htmlPath)) {
  const html = fs.readFileSync(htmlPath, 'utf8');
  const match = html.match(/<script id="jsx-data" type="application\/json">([\s\S]*?)<\/script>/);
  if (!match) {
    console.error('Missing jsx-data script block in mindmap.html.');
    ok = false;
  } else {
    try {
      const sources = JSON.parse(match[1]);
      const jsxFiles = fs.readdirSync(root).filter((name) => name.endsWith('.jsx')).sort();
      const embeddedFiles = Object.keys(sources).sort();
      const missingEmbedded = jsxFiles.filter((file) => !embeddedFiles.includes(file));
      const missingNode = jsxFiles.filter((file) => !html.includes(`file: '${file}'`) && !html.includes(`file: "${file}"`));

      if (missingEmbedded.length) {
        console.error(`JSX files not embedded: ${missingEmbedded.join(', ')}`);
        ok = false;
      }
      if (missingNode.length) {
        console.error(`JSX files not registered in NODES: ${missingNode.join(', ')}`);
        ok = false;
      }
      console.log(`Embedded JSX files: ${embeddedFiles.length}`);
    } catch (error) {
      console.error(`Invalid jsx-data JSON: ${error.message}`);
      ok = false;
    }
  }
}

if (!ok) process.exit(1);
console.log('Project check passed.');

