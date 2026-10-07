# nikunjthakkar.com

Personal site and writing of Nikunj Thakkar. Built with [Astro](https://astro.build), hosted on Cloudflare.

## Develop

```sh
npm install
npm run dev        # http://localhost:4321
```

## Ship

```sh
npm run build      # static site in dist/
npm run preview    # serve dist/ with wrangler, redirects included
npm run deploy     # build and deploy to Cloudflare (needs `wrangler login` once)
```

## Where things live

- `src/content/posts/`: blog posts in Markdown. The filename (minus the date) is the URL: `/posts/<slug>/`.
- `src/pages/`: Home, Writing, Work (`work.astro`), and About, Now, Community (Markdown).
- `src/lib/site.ts`: name, nav, social links.
- `src/styles/global.css`: colors, type, and shared styles for light and dark themes.
- `public/_redirects`: old Jekyll URLs mapped to new ones (Cloudflare format).

## New post

Add `src/content/posts/YYYY-MM-DD-my-post.md`:

```md
---
title: "My post"
date: 2026-10-07 10:00:00
tags: [saas, product]
description: "Optional one-line summary for previews and SEO."
---
```
