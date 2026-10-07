import manifest from '../data/image-manifest.json';

type Entry = { width: number; height: number; variants: { w: number; src: string }[] };
const images = manifest as Record<string, Entry>;

/**
 * Responsive attributes for an image under /public, using the WebP variants made by `npm run images`.
 * Falls back to the original file if the image hasn't been processed yet.
 */
export function responsive(src: string, sizes: string) {
  const entry = images[src];
  if (!entry) return { src, sizes };
  const largest = entry.variants[entry.variants.length - 1];
  return {
    src: largest.src,
    srcset: entry.variants.map((v) => `${v.src} ${v.w}w`).join(', '),
    sizes,
    width: entry.width,
    height: entry.height,
  };
}

/** Smallest variant at least `minWidth` wide (for tiny fixed-size uses like avatars). */
export function variantAtLeast(src: string, minWidth: number) {
  const entry = images[src];
  if (!entry) return src;
  return (entry.variants.find((v) => v.w >= minWidth) ?? entry.variants[entry.variants.length - 1]).src;
}
