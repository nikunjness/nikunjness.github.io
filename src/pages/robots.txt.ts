import type { APIContext } from 'astro';

// Everything is public, including for AI crawlers: being readable is the point.
export function GET({ site }: APIContext) {
  const body = `User-agent: *
Allow: /

Sitemap: ${new URL('/sitemap.xml', site).href}
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
