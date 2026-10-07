import type { APIContext } from 'astro';
import { getPosts, postUrl } from '../lib/posts';

// Hand-rolled so it lives at /sitemap.xml (the URL search engines and Search Console expect).
const PAGES = ['/', '/writing/', '/work/', '/talks/', '/about/', '/now/', '/community/'];

export async function GET({ site }: APIContext) {
  const posts = await getPosts(); // drafts are excluded in production builds
  const abs = (path: string) => new URL(path, site).href;
  const entries = [
    ...PAGES.map((p) => `<url><loc>${abs(p)}</loc></url>`),
    ...posts.map(
      (p) => `<url><loc>${abs(postUrl(p))}</loc><lastmod>${p.data.date.toISOString().slice(0, 10)}</lastmod></url>`,
    ),
  ];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join('\n')}
</urlset>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
