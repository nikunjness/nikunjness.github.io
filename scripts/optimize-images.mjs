// Generates responsive WebP versions of the site's larger images.
// Run after adding or changing a post cover or hero image:  npm run images
//
// Output: public/assets/img/opt/<name>-<width>.webp and src/data/image-manifest.json,
// which components use to build srcset/sizes and to set width/height (prevents layout shift).
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const PUBLIC = path.join(ROOT, 'public');
const OUT_DIR = path.join(PUBLIC, 'assets/img/opt');
const MANIFEST = path.join(ROOT, 'src/data/image-manifest.json');
const WIDTHS = [320, 480, 800, 1200, 1600];

// Post covers (from front matter) plus a few hero images used by pages.
const postsDir = path.join(ROOT, 'src/content/posts');
const covers = fs
  .readdirSync(postsDir)
  .map((f) => fs.readFileSync(path.join(postsDir, f), 'utf8').match(/^\s+path:\s*(\/assets\/img\/\S+)$/m)?.[1])
  .filter(Boolean);
// Images used inside post bodies (markdown image syntax)
const inline = fs
  .readdirSync(postsDir)
  .flatMap((f) => [...fs.readFileSync(path.join(postsDir, f), 'utf8').matchAll(/!\[[^\]]*\]\((\/assets\/img\/[^)\s]+)\)/g)].map((m) => m[1]));
const gallery = fs
  .readdirSync(path.join(PUBLIC, 'assets/img/gallery'))
  .filter((f) => /\.(webp|jpe?g|png)$/.test(f))
  .map((f) => `/assets/img/gallery/${f}`);
const extra = ['/assets/img/snezzi-dashboard.webp', '/assets/img/portrait.webp'];
const sources = [...new Set([...covers, ...inline, ...gallery, ...extra])];

fs.mkdirSync(OUT_DIR, { recursive: true });
const manifest = {};

for (const src of sources) {
  const file = path.join(PUBLIC, src);
  if (!fs.existsSync(file)) {
    console.warn('missing', src);
    continue;
  }
  const meta = await sharp(file).metadata();
  const base = path.basename(src).replace(/\.[^.]+$/, '');
  const variants = [];
  for (const w of WIDTHS.filter((w) => w < meta.width).concat(meta.width)) {
    const name = `${base}-${w}.webp`;
    await sharp(file)
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: 78, alphaQuality: 90 })
      .toFile(path.join(OUT_DIR, name));
    variants.push({ w, src: `/assets/img/opt/${name}` });
  }
  manifest[src] = { width: meta.width, height: meta.height, variants };
  console.log(src, `${meta.width}x${meta.height}`, '→', variants.map((v) => v.w).join(', '));
}

fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + '\n');
console.log('wrote', path.relative(ROOT, MANIFEST));
