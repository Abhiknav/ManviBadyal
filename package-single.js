/**
 * Bundles the production Angular build into ONE self-contained .html file,
 * with every script, stylesheet and image inlined. Used to publish a shareable
 * preview; the real project still builds and deploys normally.
 *
 *   npm run build:single
 *
 * Google Fonts are intentionally left as remote @font-face rules — they are the
 * one external host the Artifact CSP allows.
 */
const fs = require('fs');
const path = require('path');

const DIST = path.join(__dirname, 'dist', 'manvi-portfolio', 'browser');
const OUT = path.join(__dirname, 'dist', 'manvi-badyal-portfolio.html');

const read = (f) => fs.readFileSync(path.join(DIST, f), 'utf8');
const exists = (f) => fs.existsSync(path.join(DIST, f));
const clean = (href) => href.replace(/^\.?\//, '').split('?')[0];
const attr = (tag, name) => {
  const m = tag.match(new RegExp(`${name}="([^"]*)"`, 'i'));
  return m ? m[1] : null;
};

let html = read('index.html');

// Portrait becomes a data URI; the bundle references it by path at runtime.
const imgUri =
  'data:image/jpeg;base64,' +
  fs.readFileSync(path.join(DIST, 'assets', 'img', 'manvi.jpg')).toString('base64');

// 1. Drop the <noscript> stylesheet fallback — everything is inline after this.
html = html.replace(/<noscript>[\s\S]*?<\/noscript>/gi, '');

// 2. Inline every stylesheet link, whatever attribute order or media/onload
//    trick Angular's critical-CSS step used. Drop the favicon link.
html = html.replace(/<link\b[^>]*>/gi, (tag) => {
  const rel = (attr(tag, 'rel') || '').toLowerCase();
  const href = attr(tag, 'href');
  if (rel === 'icon' || rel === 'shortcut icon') return '';
  if (rel !== 'stylesheet' || !href) return tag;          // keep preconnect etc.
  const file = clean(href);
  if (!exists(file)) return tag;                          // remote font CSS
  return `<style>${read(file)}</style>`;
});

// 3. Inline every local script.
html = html.replace(/<script\b([^>]*)><\/script>/gi, (tag, attrs) => {
  const src = attr(tag, 'src');
  if (!src) return tag;
  const file = clean(src);
  if (!exists(file)) return tag;
  const keep = attrs.replace(/\ssrc="[^"]*"/i, '').replace(/\sdefer\b/gi, '').trim();
  let code = read(file);
  code = code.replace(/<\/script>/gi, '<\\/script>');     // don't close early
  code = code.split('assets/img/manvi.jpg').join(imgUri);
  return `<script ${keep}>${code}</script>`;
});

// 4. <base href="/"> is meaningless inline and breaks in-page anchors.
html = html.replace(/<base\b[^>]*>/i, '');

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, html, 'utf8');

// Report anything still pointing at a local file.
const leftovers = (html.match(/(?:src|href)="(?!data:|https:|http:|mailto:|tel:|#)[^"]*"/g) || []);
console.log(`Wrote ${OUT} (${(fs.statSync(OUT).size / 1024).toFixed(0)} KB)`);
console.log(
  leftovers.length ? `UNRESOLVED local refs: ${leftovers.join(', ')}` : 'All local refs inlined.'
);
