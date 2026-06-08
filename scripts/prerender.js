// Post-build step: render the React app to static HTML and inject it into the
// built index.html. Crawlers (and no-JS visitors) get real content in the
// source; on load, React re-renders over it as normal.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const templatePath = path.join(root, 'dist', 'index.html');
const serverEntry = path.join(root, 'dist-server', 'entry-server.js');

const template = fs.readFileSync(templatePath, 'utf-8');
const { render } = await import(pathToFileURL(serverEntry).href);
// Neutralise framer-motion's initial opacity:0 so the static (pre-JS) snapshot
// is fully visible to crawlers and no-JS visitors. React re-renders on load and
// runs the animations as normal.
const appHtml = render().replace(/opacity:0/g, 'opacity:1');

if (!template.includes('<div id="root"></div>')) {
  throw new Error('prerender: could not find <div id="root"></div> in dist/index.html');
}

const html = template.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);
fs.writeFileSync(templatePath, html);

console.log(`prerender: injected ${appHtml.length} chars of HTML into dist/index.html`);
