// Social preview images (1200×630 JPEG) for every post and main page.
// Run with `npm run og` after adding or retitling a post, then commit public/og/.
// Cards are rendered by headless Chrome so they use the site's real fonts.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const PUBLIC = path.join(ROOT, 'public');
const OUT = path.join(PUBLIC, 'og');
const MANIFEST = path.join(ROOT, 'src/data/og-manifest.json');
const CHROME = process.env.CHROME ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const TMP = fs.mkdtempSync(path.join(os.tmpdir(), 'og-'));

const file = (p) => 'file://' + p;
const font = (p) => file(path.join(ROOT, 'node_modules', p));
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const PAGES = [
  { url: '/', eyebrow: 'Product builder & entrepreneur', title: 'I build products, companies & communities.', lead: 'Building since 2013, with 200+ events hosted for founders.' },
  { url: '/writing/', eyebrow: 'Writing', title: 'Notes from building.', lead: 'Startups, product, and GTM, including the failures.' },
  { url: '/work/', eyebrow: 'Work', title: `${new Date().getFullYear() - 2013} years of building, zero to one.`, lead: 'Engineer, founder, product leader, and founder again.' },
  { url: '/talks/', eyebrow: 'Talks & podcasts', title: 'Conversations with builders.', lead: 'Startup OG, plus talks on startups, failure, and AI search.' },
  { url: '/about/', eyebrow: 'About', title: 'Engineer, founder, product leader, founder again.', lead: 'Building things professionally since 2013.' },
  { url: '/community/', eyebrow: 'Community', title: 'Bringing builders together.', lead: 'Startup OG, Headstart, GDG Cloud Ahmedabad, and 200+ events.' },
  { url: '/moments/', eyebrow: 'Moments', title: 'Out in the room.', lead: 'Meetups, talks, and travels along the way.' },
  { url: '/now/', eyebrow: 'Now', title: 'What I’m focused on right now.', lead: 'Building Snezzi and hosting Startup OG.' },
];

function posts() {
  const dir = path.join(ROOT, 'src/content/posts');
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => {
      const src = fs.readFileSync(path.join(dir, f), 'utf8');
      const fm = src.slice(0, src.indexOf('\n---', 4));
      if (/^draft:\s*true/m.test(fm)) return null;
      const title = fm.match(/^title:\s*["']?(.*?)["']?\s*$/m)[1].replace(/\\"/g, '"');
      const date = new Date(fm.match(/^date:\s*(\S+)/m)[1]);
      const cover = fm.match(/^\s+path:\s*(\/assets\/img\/\S+)$/m)?.[1];
      const slug = f.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.md$/, '');
      return { url: `/posts/${slug}/`, slug, title, date, cover };
    })
    .filter(Boolean);
}

const shell = (body) => `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:Display;src:url(${font('@fontsource-variable/bricolage-grotesque/files/bricolage-grotesque-latin-wght-normal.woff2')}) format('woff2');font-weight:200 800}
@font-face{font-family:Body;src:url(${font('@fontsource-variable/inter/files/inter-latin-wght-normal.woff2')}) format('woff2');font-weight:100 900}
@font-face{font-family:Serif;font-style:italic;src:url(${font('@fontsource/instrument-serif/files/instrument-serif-latin-400-italic.woff2')}) format('woff2')}
*{box-sizing:border-box;margin:0}
html,body{width:1200px;height:630px;overflow:hidden}
body{font-family:Body,sans-serif;color:#0f0e0c;background:#fbfaf7;position:relative}
.blob{position:absolute;border-radius:50%;filter:blur(90px);opacity:.55}
.b1{width:520px;height:520px;background:#ff5b1f;right:-120px;top:-160px}
.b2{width:520px;height:520px;background:#ff4d8d;right:180px;bottom:-280px;opacity:.35}
.b3{width:460px;height:460px;background:#7b61ff;right:-160px;bottom:-200px;opacity:.45}
.dots{position:absolute;inset:0;background-image:radial-gradient(rgba(15,14,12,.09) 1px,transparent 1px);background-size:22px 22px}
.wrap{position:absolute;inset:0;padding:64px 72px;display:flex;flex-direction:column}
.brand{display:flex;align-items:center;gap:14px;font-family:Display;font-weight:700;font-size:26px}
.mark{width:50px;height:50px;padding:3px;border-radius:50%;background:linear-gradient(135deg,#ff5b1f,#ff4d8d 55%,#7b61ff)}.mark img{display:block;width:100%;height:100%;border-radius:50%;object-fit:cover;background:#111}
.eyebrow{display:flex;align-items:center;gap:12px;font-weight:600;font-size:20px;letter-spacing:.08em;text-transform:uppercase;color:#6b665e}
.eyebrow:before{content:"";width:34px;height:2px;background:linear-gradient(90deg,#ff5b1f,#ff4d8d)}
h1{font-family:Display;font-weight:800;letter-spacing:-.025em;line-height:1.04}
.it{font-family:Serif;font-weight:400;font-style:italic;letter-spacing:0;background:linear-gradient(120deg,#ff5b1f,#ff4d8d 45%,#7b61ff);-webkit-background-clip:text;color:transparent;padding-right:6px}
.foot{margin-top:auto;display:flex;align-items:center;gap:18px;font-size:22px;color:#4a463f}
.pill{display:inline-flex;align-items:center;gap:10px;padding:10px 18px;border:1px solid rgba(15,14,12,.14);border-radius:999px;background:rgba(255,255,255,.8)}
.dot{width:10px;height:10px;border-radius:50%;background:#20b26b}
</style></head><body><div class="blob b1"></div><div class="blob b2"></div><div class="blob b3"></div><div class="dots"></div>${body}</body></html>`;

// Last word of a heading gets the italic gradient treatment, like the site's hero headings.
function accent(title) {
  const m = title.match(/^(.*\s)(\S+)$/);
  return m ? `${esc(m[1])}<span class="it">${esc(m[2])}</span>` : esc(title);
}

function postCard(p) {
  const n = p.title.length;
  const size = n > 72 ? 46 : n > 52 ? 52 : n > 34 ? 60 : 68;
  const date = p.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
  const cover = p.cover && fs.existsSync(path.join(PUBLIC, p.cover)) ? file(path.join(PUBLIC, p.cover)) : null;
  return shell(`<div class="wrap" style="padding-right:${cover ? 560 : 72}px">
    <div class="brand"><span class="mark"><img src="${file(path.join(PUBLIC, 'assets/img/avatar-mark.webp'))}"></span>Nikunj Thakkar</div>
    <div style="margin-top:auto;margin-bottom:auto">
      <p class="eyebrow">Writing · ${date}</p>
      <h1 style="font-size:${size}px;margin-top:22px">${esc(p.title)}</h1>
    </div>
    <div class="foot">nikunjthakkar.com</div>
  </div>
  ${cover ? `<div style="position:absolute;right:56px;top:50%;transform:translateY(-50%);width:470px;height:470px;border-radius:32px;overflow:hidden;box-shadow:0 30px 70px rgba(40,20,60,.22);background:#f3efe8"><img src="${cover}" style="width:100%;height:100%;object-fit:cover"></div>` : ''}`);
}

function pageCard(p) {
  const portrait = file(path.join(PUBLIC, 'assets/img/portrait.webp'));
  const size = p.title.length > 34 ? 64 : 78;
  return shell(`<div class="wrap" style="padding-right:470px">
    <div class="brand"><span class="mark"><img src="${file(path.join(PUBLIC, 'assets/img/avatar-mark.webp'))}"></span>Nikunj Thakkar</div>
    <div style="margin-top:auto;margin-bottom:auto">
      <p class="eyebrow">${esc(p.eyebrow)}</p>
      <h1 style="font-size:${size}px;margin-top:22px">${accent(p.title)}</h1>
      <p style="margin-top:24px;font-size:26px;line-height:1.4;color:#4a463f">${esc(p.lead)}</p>
    </div>
    <div class="foot"><span class="pill"><span class="dot"></span>Now building <b>Snezzi</b></span>nikunjthakkar.com</div>
  </div>
  <div style="position:absolute;right:70px;top:50%;transform:translateY(-50%);width:360px;height:360px;border-radius:50%;padding:8px;background:linear-gradient(135deg,#ff5b1f,#ff4d8d 55%,#7b61ff);box-shadow:0 30px 70px rgba(40,20,60,.25)">
    <img src="${portrait}" style="width:100%;height:100%;border-radius:50%;object-fit:cover;background:#111">
  </div>`);
}

async function render(html, out) {
  const htmlFile = path.join(TMP, 'card.html');
  const png = path.join(TMP, 'card.png');
  fs.writeFileSync(htmlFile, html);
  execFileSync(CHROME, [
    '--headless=new', '--disable-gpu', '--hide-scrollbars', '--allow-file-access-from-files',
    '--force-device-scale-factor=1', '--window-size=1200,630', '--virtual-time-budget=3000',
    `--screenshot=${png}`, file(htmlFile),
  ], { stdio: 'ignore' });
  await sharp(png).resize(1200, 630, { fit: 'cover', position: 'top' }).jpeg({ quality: 84, mozjpeg: true }).toFile(out);
}

fs.mkdirSync(path.join(OUT, 'posts'), { recursive: true });
const manifest = {};
for (const p of PAGES) {
  const name = (p.url.replace(/\//g, '') || 'home') + '.jpg';
  await render(pageCard(p), path.join(OUT, name));
  manifest[p.url] = `/og/${name}`;
}
for (const p of posts()) {
  await render(postCard(p), path.join(OUT, 'posts', `${p.slug}.jpg`));
  manifest[p.url] = `/og/posts/${p.slug}.jpg`;
}
fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + '\n');
fs.rmSync(TMP, { recursive: true, force: true });
console.log('wrote', Object.keys(manifest).length, 'social images');
