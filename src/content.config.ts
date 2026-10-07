import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Post ids keep the original Jekyll slug (case included) so /posts/<slug>/ URLs never change.
const posts = defineCollection({
  loader: glob({
    pattern: '*.md',
    base: './src/content/posts',
    generateId: ({ entry }) => entry.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.md$/, ''),
  }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string().optional(),
    category: z.string().optional(),
    tags: z.array(z.string()).default([]),
    image: z.object({ path: z.string(), alt: z.string().optional() }).optional(),
    draft: z.boolean().default(false),
    // Original URL when the post was first published as a LinkedIn article
    linkedin: z.string().url().optional(),
  }),
});

export const collections = { posts };
