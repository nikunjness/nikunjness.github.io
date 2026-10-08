// @ts-check
import { defineConfig } from 'astro/config';
import rehypeResponsiveImages from './src/lib/rehype-responsive-images.mjs';

export default defineConfig({
  site: 'https://nikunjthakkar.com',
  trailingSlash: 'always',
  // Inline page CSS so the first paint doesn't wait on a stylesheet request.
  build: { inlineStylesheets: 'always' },
  markdown: {
    rehypePlugins: [rehypeResponsiveImages],
    shikiConfig: { themes: { light: 'github-light', dark: 'github-dark' } },
  },
});
