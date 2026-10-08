import fs from 'node:fs';

const MANIFEST = new URL('../data/image-manifest.json', import.meta.url);

/**
 * Gives markdown images the WebP variants made by `npm run images`:
 * srcset, sizes, intrinsic width/height (no layout shift), lazy loading.
 */
export default function rehypeResponsiveImages({ sizes = '(max-width: 760px) 100vw, 720px' } = {}) {
  return (tree) => {
    const manifest = JSON.parse(fs.readFileSync(MANIFEST, 'utf8'));
    const visit = (node) => {
      if (node.type === 'element' && node.tagName === 'img') {
        const entry = manifest[node.properties?.src];
        if (entry) {
          const largest = entry.variants[entry.variants.length - 1];
          Object.assign(node.properties, {
            src: largest.src,
            srcSet: entry.variants.map((v) => `${v.src} ${v.w}w`).join(', '),
            sizes,
            width: entry.width,
            height: entry.height,
          });
        }
        node.properties.loading ??= 'lazy';
        node.properties.decoding ??= 'async';
      }
      node.children?.forEach(visit);
    };
    visit(tree);
  };
}
