import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const htmlPath = path.join(root, 'mindmap.html');

const CATEGORY_META = {
  'cat-semi': { color: '#60a5fa', gradient: 'url(#leaf-blue)', x: -620, y: 300 },
  'cat-invest': { color: '#c084fc', gradient: 'url(#leaf-purple)', x: 0, y: -650 },
  'cat-ai': { color: '#4ade80', gradient: 'url(#leaf-green)', x: 620, y: -60 }
};

function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];
    if (!token.startsWith('--')) continue;
    const key = token.slice(2);
    const value = argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[++i] : 'true';
    args[key] = value;
  }
  return args;
}

function fail(message) {
  console.error(message);
  process.exit(1);
}

function slugify(value) {
  return String(value)
    .replace(/\.jsx$/i, '')
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'dashboard';
}

function scriptSafeJson(value) {
  return JSON.stringify(value).replace(/<\/script/gi, '<\\/script');
}

function splitCsv(value) {
  if (!value) return [];
  return value.split(',').map((item) => item.trim()).filter(Boolean);
}

function lineCount(source) {
  return source.split(/\r\n|\r|\n/).length;
}

function insertBeforeArrayClose(source, arrayName, nextConstName, entry) {
  const start = source.indexOf(`const ${arrayName} = [`);
  if (start < 0) fail(`Could not find ${arrayName}.`);

  const nextConst = source.indexOf(`\nconst ${nextConstName}`, start);
  if (nextConst < 0) fail(`Could not find ${nextConstName} after ${arrayName}.`);

  const close = source.lastIndexOf('];', nextConst);
  if (close < start) fail(`Could not find closing bracket for ${arrayName}.`);

  return source.slice(0, close) + entry + source.slice(close);
}

function syncSources(html) {
  const jsxFiles = fs.readdirSync(root)
    .filter((name) => name.endsWith('.jsx'))
    .sort((a, b) => a.localeCompare(b));

  const sources = {};
  for (const file of jsxFiles) {
    sources[file] = fs.readFileSync(path.join(root, file), 'utf8');
  }

  const next = html.replace(
    /(<script id="jsx-data" type="application\/json">)([\s\S]*?)(<\/script>)/,
    `$1${scriptSafeJson(sources)}$3`
  );

  if (next === html) fail('Could not find the jsx-data script block.');
  return next;
}

function parseImports(source, moduleName) {
  const names = new Set();
  const escaped = moduleName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const namedImport = new RegExp(`import\\s+\\{([^}]+)\\}\\s+from\\s+['"]${escaped}['"];?`, 'g');
  source = source.replace(namedImport, (_, imports) => {
    imports.split(',').forEach((name) => {
      const clean = name.trim().split(/\s+as\s+/i).pop();
      if (clean) names.add(clean);
    });
    return '';
  });
  return { source, names: [...names] };
}

function makeStandaloneHtml(fileName, jsxSource) {
  let source = jsxSource;
  let componentName = path.basename(fileName, '.jsx').replace(/[^A-Za-z0-9_$]/g, '');
  const reactNames = new Set();

  source = source.replace(/import\s+React\s*,\s*\{([^}]+)\}\s*from\s+['"]react['"];?/g, (_, imports) => {
    imports.split(',').forEach((name) => reactNames.add(name.trim().split(/\s+as\s+/i).pop()));
    return '';
  });
  source = source.replace(/import\s+React\s+from\s+['"]react['"];?/g, '');

  let parsed = parseImports(source, 'react');
  source = parsed.source;
  parsed.names.forEach((name) => reactNames.add(name));

  parsed = parseImports(source, 'recharts');
  source = parsed.source;
  const rechartsNames = parsed.names;

  parsed = parseImports(source, 'lucide-react');
  source = parsed.source;
  const lucideNames = parsed.names;

  source = source.replace(/export\s+default\s+function\s+([A-Za-z_$][\w$]*)/m, (_, name) => {
    componentName = name;
    return `function ${name}`;
  });
  source = source.replace(/export\s+default\s+([A-Za-z_$][\w$]*);?/m, (_, name) => {
    componentName = name;
    return '';
  });
  source = source.replace(/export\s+default\s+/g, '');

  const reactLine = reactNames.size ? `const { ${[...reactNames].join(', ')} } = React;` : '';
  const rechartsLine = rechartsNames.length ? `const { ${rechartsNames.join(', ')} } = Recharts;` : '';
  const lucideLine = lucideNames.length ? `const { ${lucideNames.join(', ')} } = LucideReact;` : '';

  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${fileName.replace(/\.jsx$/i, '')}</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="./vendor/react.production.min.js"></script>
  <script src="./vendor/react-dom.production.min.js"></script>
  <script src="./vendor/babel.min.js"></script>
  <script src="./vendor/prop-types.min.js"></script>
  <script src="./vendor/Recharts.js"></script>
  <script src="./vendor/lucide.min.js"></script>
  <script>
  (function(){
    function createLucideReactAdapter(){
      var icons = (window.lucide && window.lucide.icons) || {};
      var attrMap = {'stroke-width':'strokeWidth','stroke-linecap':'strokeLinecap','stroke-linejoin':'strokeLinejoin','fill-rule':'fillRule','clip-rule':'clipRule','class':'className'};
      function toReactAttrs(attrs){
        var out = {};
        attrs = attrs || {};
        Object.keys(attrs).forEach(function(key){ out[attrMap[key] || key] = attrs[key]; });
        return out;
      }
      function renderNode(node, index){
        return React.createElement(node[0], Object.assign({key:index}, toReactAttrs(node[1])), (node[2] || []).map(renderNode));
      }
      function makeIcon(name){
        return function Icon(props){
          props = props || {};
          var size = props.size || 24;
          var iconNode = icons[name] || icons.Circle || [];
          return React.createElement('svg', Object.assign({}, props, {
            xmlns:'http://www.w3.org/2000/svg', width:size, height:size, viewBox:'0 0 24 24',
            fill:props.fill || 'none', stroke:props.color || 'currentColor', strokeWidth:props.strokeWidth || 2,
            strokeLinecap:'round', strokeLinejoin:'round', className:props.className || '', style:props.style || {}
          }), iconNode.map(renderNode));
        };
      }
      window.LucideReact = window.LucideReact || new Proxy({}, { get:function(_, prop){ if(prop === '__esModule') return true; if(prop === 'default') return {}; if(typeof prop === 'string') return makeIcon(prop); } });
    }
    createLucideReactAdapter();
  })();
  </script>
</head>
<body style="margin:0; padding:0; background:#020617;">
  <div id="root"></div>
  <script type="text/babel" data-presets="env,react">
${reactLine}
${rechartsLine}
${lucideLine}
${source}

ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(${componentName}));
  </script>
</body>
</html>
`;
}

const args = parseArgs(process.argv.slice(2));
if (!args.file) {
  fail('Usage: node scripts/add-jsx-dashboard.mjs --file path/to/Dashboard.jsx --id dashboard-id --label "Dashboard\\nTitle" --category cat-ai --topic "Short description"');
}
if (!fs.existsSync(htmlPath)) fail('mindmap.html not found. Run from the project root.');

const sourcePath = path.resolve(args.file);
if (!fs.existsSync(sourcePath)) fail(`JSX file not found: ${sourcePath}`);

const category = args.category || 'cat-ai';
const meta = CATEGORY_META[category];
if (!meta) fail(`Unknown category: ${category}. Use one of ${Object.keys(CATEGORY_META).join(', ')}.`);

const destName = path.basename(sourcePath);
const id = args.id || slugify(destName);
const label = (args.label || destName.replace(/\.jsx$/i, '')).replace(/\\n/g, '\n');
const topic = args.topic || '';
const tags = splitCsv(args.tags || id.replace(/-/g, ','));
const x = Number(args.x || meta.x);
const y = Number(args.y || meta.y);
const r = Number(args.r || 42);

const jsxSource = fs.readFileSync(sourcePath, 'utf8');
const destPath = path.join(root, destName);
if (path.resolve(destPath) !== sourcePath) {
  fs.writeFileSync(destPath, jsxSource, 'utf8');
}

let html = fs.readFileSync(htmlPath, 'utf8');
if (!html.includes(`id: '${id}'`) && !html.includes(`id: "${id}"`)) {
  const nodeEntry = `
  { id: ${JSON.stringify(id)}, type: 'leaf', category: ${JSON.stringify(category)}, color: ${JSON.stringify(meta.color)}, gradient: ${JSON.stringify(meta.gradient)},
    label: ${JSON.stringify(label)}, topic: ${JSON.stringify(topic)},
    file: ${JSON.stringify(destName)}, lines: ${lineCount(jsxSource)}, chars: ${jsxSource.length},
    tags: ${JSON.stringify(tags)}, x: ${x}, y: ${y}, r: ${r} },
`;
  html = insertBeforeArrayClose(html, 'NODES', 'EDGES', nodeEntry);
}

if (!html.includes(`to: '${id}'`) && !html.includes(`to: "${id}"`)) {
  const edgeEntry = `  { from: ${JSON.stringify(category)}, to: ${JSON.stringify(id)} },
`;
  html = insertBeforeArrayClose(html, 'EDGES', 'CAT_LABELS', edgeEntry);
}

html = syncSources(html);
fs.writeFileSync(htmlPath, html, 'utf8');

const standalonePath = path.join(root, destName.replace(/\.jsx$/i, '.html'));
if (!fs.existsSync(standalonePath) || args.force === 'true') {
  fs.writeFileSync(standalonePath, makeStandaloneHtml(destName, jsxSource), 'utf8');
}

console.log(`Added ${destName} as ${id}.`);
console.log(`Updated mindmap.html and ${path.basename(standalonePath)}.`);
