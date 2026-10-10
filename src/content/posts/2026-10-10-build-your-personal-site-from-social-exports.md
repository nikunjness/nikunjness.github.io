---
title: "Your social media exports are a personal website waiting to happen"
date: 2026-10-10 10:00:00
description: "Years of posts, photos, and threads are sitting in your LinkedIn, X, and Facebook accounts. Here's how to export them, what's actually inside each archive, and how to turn them into long-form writing and a photo gallery on a site you own."
tags: [build in public, personal branding, ai, tools]
draft: true
image:
  path: /assets/img/covers/2026-10-10-build-your-personal-site-from-social-exports.webp
  alt: "Illustration: three small data boxes pouring into the frame of a simple website"
---

My personal site had been untouched for years. Meanwhile, I had written hundreds of posts on LinkedIn, X, and Facebook: lessons from failed side projects, notes from events, stories about clients and mentors, and thousands of photos from meetups I hosted.

All of that lived on platforms I don't control, buried under feeds that only show the last few weeks.

So when I rebuilt this site, I didn't start with a blank page. I started with three data exports. This post is the technical playbook: how to get the exports, what's really inside them, the traps I hit, and the pipeline that turned them into long-form posts and a [photo gallery](/moments/).

## Why your exports beat a blank page

Most people put off a personal site because of the content problem. What would I even write?

You've probably already written it. A few years of posting gives you:

- **Ideas you've already tested in public.** Posts that got reactions are themes people care about.
- **Dates.** Every post is timestamped, so you can rebuild your timeline accurately.
- **Photos with context.** Event photos usually come with a caption explaining what happened.
- **Your own voice.** Drafts built from your posts sound like you, not like a template.

The work isn't writing from scratch. It's extraction, curation, and expansion.

## Step 1: Request all three exports

Each platform has a self-serve export. Request them all on day one, because some take hours or days to arrive.

**LinkedIn:** Settings, then Data privacy, then Get a copy of your data. Choose the full archive, not just specific categories. LinkedIn sends a smaller "basic" file first and the complete one later, often a day afterwards.

**X:** Settings, then Your account, then Download an archive of your data. It usually takes a day or two.

**Facebook:** Accounts Center, then Your information and permissions, then Download your information. Pick the categories you need (at minimum, posts and photos), set the date range to all time, and choose high media quality. You can pick HTML or JSON; JSON is easier to parse, but HTML works too.

## Step 2: Know what's actually inside

The exports look similar from the outside and are very different inside.

### LinkedIn: great text, weak media

The useful file is `Shares.csv`: one row per post with the date, the post's link, and the full text. My archive had 607 posts going back to 2016.

Media is where it gets tricky. `Rich_Media.csv` lists photos you uploaded, but in my export only a couple of years had downloadable links, and those links expire within days of the export. If you want them, download them immediately.

The bigger source of images is the public post pages themselves. Each row in `Shares.csv` links to a public post page, and that page includes the post's main image (in the `og:image` tag) and, for albums, the first few photos. Fetching those pages slowly and politely recovered almost 400 images that the export itself didn't include.

### X: complete, structured, and easy to parse

The X archive is the most developer-friendly. `tweets.js` is a JavaScript file wrapping a JSON array, so you strip the assignment at the start and parse the rest:

```python
import json

raw = open("data/tweets.js", encoding="utf-8").read()
tweets = [t["tweet"] for t in json.loads(raw[raw.index("["):])]
```

Every image you posted is in `tweets_media/`, named after the tweet it belongs to, so linking a photo to its caption and date is trivial. Long posts written with X's longer post format live separately in `note-tweet.js`, so join those in or you'll only see the first 280 characters.

Threads aren't stored as threads. To rebuild them, follow tweets that reply to your own earlier tweets:

```python
me = account_id  # from data/account.js
children = {}
for t in tweets:
    if t.get("in_reply_to_user_id_str") == me:
        children.setdefault(t["in_reply_to_status_id_str"], []).append(t)

def thread(root):
    parts, current = [root], root
    while current["id_str"] in children:
        current = sorted(children[current["id_str"]], key=lambda t: t["id_str"])[0]
        parts.append(current)
    return parts
```

My X archive had more than 7,000 tweets and about 1,500 images. Threads with five or more parts were some of the best long-form candidates.

### Facebook: the deepest history, the messiest format

Facebook went back the furthest for me, to 2011, and covered the years when I was most active in local communities. In the HTML export, each post is a `<section>` containing the images, the caption, and a date in the footer. Album pages carry the album name in their `<title>`.

Two things to watch for:

- **The same photo appears in several places** (your posts, an album, mobile uploads). Deduplicate by file hash before doing anything else.
- **Not everything is yours to publish.** Facebook archives mix event photos with family, friends, and memes. More on that below.

## Step 3: Build one index of everything

Before writing a single page, normalize all three sources into one list:

```python
{"source": "x", "date": "2019-06-30", "text": "...", "media": ["..."], "url": "..."}
```

Once everything shares the same shape, the rest becomes simple filtering and sorting. I kept the index as a JSON file in a scratch folder, separate from the site's code.

## Step 4: Find your long-form candidates

Not every post deserves an essay. The best candidates usually have at least one of these:

- **Length.** Posts over 600 characters, and threads with several parts.
- **A story.** A specific moment, a decision, a failure, a number.
- **Engagement.** Reactions are a rough signal that the topic resonated.
- **Recurrence.** If you've written about the same theme five times over five years, that theme is a post.

Sort by length and engagement, read the top fifty, and group them into themes. Several of the posts on this site, like [Six side projects that failed](/posts/six-side-projects-that-failed/) and [Customer service is a choice](/posts/customer-service-is-a-choice/), started as a single thread or post that deserved more room.

## Step 5: Expand, without inventing

This is where an AI agent helps the most, and where it needs the firmest rules. I used Claude Code for most of this project, and these guardrails made the difference:

1. **Facts only from sources.** Every name, number, and date in a draft must come from your posts or your own notes. If the source is vague, the draft stays vague, or gets a placeholder for you to fill in.
2. **Date posts by when they happened.** A post built from a 2018 story is dated 2018. Your timeline stays honest, and the archive reads in order.
3. **Check for time travel.** A post dated 2024 shouldn't link to something published in 2025, or mention a company you started later. It's an easy mistake to make when you write everything in one week.
4. **Keep your voice.** Feed in your original posts as the source, not a summary of them.
5. **Review every draft yourself.** The agent is fast at structure and expansion. You're the only one who knows what really happened.

## Step 6: Turn photos into a gallery

Photos were the most rewarding part, and the most work. Out of thousands of images across three archives, about 150 ended up on the [Moments page](/moments/). The pipeline:

**Contact sheets for review.** Reviewing images one at a time is too slow. Tile them into labeled grids, sixty at a time, with an ID and date under each, and scan them by eye:

```js
import sharp from "sharp";

const tiles = await Promise.all(
  batch.map(async (photo, i) => ({
    input: await sharp(photo.file).resize(190, 150, { fit: "contain" }).toBuffer(),
    left: (i % 10) * 193,
    top: Math.floor(i / 10) * 153,
  })),
);
await sharp({ create: { width: 1930, height: 918, channels: 3, background: "#111" } })
  .composite(tiles)
  .jpeg({ quality: 70 })
  .toFile(`sheet-${n}.jpg`);
```

**Perceptual hashing to remove duplicates.** The same event photo often shows up on all three platforms, cropped or recompressed. A difference hash (shrink to 9×8 grayscale, compare neighboring pixels, count differing bits) catches near-duplicates that file hashes miss. A distance of around ten bits out of 64 worked well as a threshold, with a quick manual look at anything borderline.

**Captions from the original post.** The post text tells you what the photo is. Write the caption from it, and leave out details the post doesn't confirm, like a venue or a date.

**Optimize everything.** Convert to WebP, generate several widths for `srcset`, and lazy-load. Around 200 images on one page still load quickly when each one is a 30 to 60 KB WebP at the right size.

## Step 7: Decide what not to publish

Exports contain more than you remember posting. Before anything goes live, filter deliberately:

- **Never touch direct messages.** They're in the archive, and they're not yours alone.
- **Skip close-ups of children,** and photos of other people in private settings.
- **Leave out family, health, and grief posts** unless you're sure you want them on a professional site.
- **Remove anything you can't caption accurately.** An unlabeled group photo adds little and risks getting someone's story wrong.
- **Check old opinions.** You might not hold the same view you did ten years ago.

## Step 8: Ship it on a stack you control

The stack matters less than owning it. Mine is a static site built with Astro, deployed to Cloudflare. Posts are Markdown files, the gallery is a typed data file, and images go through a small optimization script. Each post gets its own social preview card, generated at build time, so links look right when shared.

The point isn't the specific tools. It's that your writing and photos now live on a domain you own, in plain files you can move anywhere.

## What you end up with

Starting from three exports, this site went from 16 old posts to more than 30, filled years of gaps in the timeline, and gained a gallery of more than 150 moments from over a decade of community work. Almost none of it was written from scratch. It was already there, waiting to be organized.

If you've been posting for a few years, you're sitting on the same raw material. Request your exports today. By the time they arrive, you'll know which story to start with.
