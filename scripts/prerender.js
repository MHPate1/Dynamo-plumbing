// Post-build step: render every route (home + each location page) to static
// HTML and write one index.html per route, each with its own title/meta/canonical
// and local schema. Crawlers (and no-JS visitors) get real, page-specific content
// in the source; on load, React re-renders over it as normal.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const distDir = path.join(root, 'dist');
const SITE = 'https://dynomoplumbing.co.uk';

const template = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8');
const { render, locations } = await import(
  pathToFileURL(path.join(root, 'dist-server', 'entry-server.js')).href
);

if (!template.includes('<div id="root"></div>')) {
  throw new Error('prerender: could not find <div id="root"></div> in dist/index.html');
}

// Neutralise framer-motion's initial opacity:0 so the static (pre-JS) snapshot is
// fully visible to crawlers. React re-renders on load and runs the animations.
const renderBody = (url) => render(url).replace(/opacity:0/g, 'opacity:1');

function inject(html, body) {
  return html.replace('<div id="root"></div>', `<div id="root">${body}</div>`);
}

// Swap the per-page head tags and append location schema.
function applyMeta(html, { title, description, canonical, areaSchema }) {
  let out = html
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`)
    .replace(/(<meta name="description" content=")[^"]*(")/, `$1${description}$2`)
    .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${canonical}$2`)
    .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${canonical}$2`)
    .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${title}$2`)
    .replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${description}$2`)
    .replace(/(<meta property="twitter:url" content=")[^"]*(")/, `$1${canonical}$2`)
    .replace(/(<meta property="twitter:title" content=")[^"]*(")/, `$1${title}$2`)
    .replace(/(<meta property="twitter:description" content=")[^"]*(")/, `$1${description}$2`);
  if (areaSchema) {
    out = out.replace('</head>', `    <script type="application/ld+json">\n    ${areaSchema}\n    </script>\n  </head>`);
  }
  return out;
}

// --- Home page ---
fs.writeFileSync(path.join(distDir, 'index.html'), inject(template, renderBody('/')));
console.log('prerender: wrote /');

// --- Location pages ---
for (const loc of locations) {
  const url = `/${loc.slug}`;
  const canonical = `${SITE}/${loc.slug}`;
  const title = `${loc.area} Plumber & Heating Engineer | Dynomo`;
  const description = `Gas Safe registered plumber in ${loc.area}. Boiler installation, repair & servicing, gas safety checks and central heating. Free quotes — call Dynomo.`;
  const areaSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Plumbing & Heating',
    url: canonical,
    provider: {
      '@type': 'Plumber',
      name: 'Dynomo Plumbing & Heating Services',
      telephone: '+447758951924',
      '@id': `${SITE}/#business`,
    },
    areaServed: { '@type': 'Place', name: `${loc.area}, ${loc.region}` },
  });

  const html = inject(applyMeta(template, { title, description, canonical, areaSchema }), renderBody(url));
  const dir = path.join(distDir, loc.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), html);
  console.log(`prerender: wrote ${url}`);
}

// --- Sitemap (kept in sync with the routes above) ---
const today = template.match(/<lastmod>(\d{4}-\d{2}-\d{2})<\/lastmod>/)?.[1] ?? '2026-06-08';
const urls = [
  { loc: `${SITE}/`, priority: '1.0', changefreq: 'weekly' },
  ...locations.map((l) => ({ loc: `${SITE}/${l.slug}`, priority: '0.8', changefreq: 'monthly' })),
];
const sitemap =
  '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  urls
    .map(
      (u) =>
        `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`,
    )
    .join('\n') +
  '\n</urlset>\n';
fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemap);
console.log(`prerender: wrote sitemap.xml (${urls.length} urls)`);

console.log(`prerender: done (${locations.length + 1} pages)`);
