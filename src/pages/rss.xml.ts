import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPosts, postUrl, excerpt } from '../lib/posts';
import { SITE } from '../lib/site';

export async function GET(context: APIContext) {
  const posts = await getPosts();
  return rss({
    title: SITE.name,
    description: SITE.description,
    site: context.site!,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: excerpt(post, 280),
      link: postUrl(post),
      categories: post.data.tags,
    })),
  });
}
