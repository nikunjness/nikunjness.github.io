/** Professional career start (Google Summer of Code, 2013). Years shown on the site are computed from this. */
export const SNEZZI_URL = 'https://snezzi.com';

export const CAREER_START = 2013;
export const YEARS_BUILDING = new Date().getFullYear() - CAREER_START;

export const SITE = {
  name: 'Nikunj Thakkar',
  url: 'https://nikunjthakkar.com',
  title: 'Nikunj Thakkar: product builder and entrepreneur',
  description:
    `Product builder and entrepreneur with ${YEARS_BUILDING}+ years across engineering, SaaS, product, and GTM. Currently building Snezzi.`,
  email: 'me@nikunjthakkar.com',
  /** Google Analytics 4 measurement ID (stream: notesofcode - GA4). */
  gaId: 'G-XHHRRTNZ7V',
  /** Analytics only runs on this hostname (not localhost, previews or workers.dev). */
  host: 'nikunjthakkar.com',
  image: '/og-default.jpg',
  imageAlt: 'Nikunj Thakkar: I build products, companies & communities.',
};

export const NAV = [
  { href: '/writing/', label: 'Writing' },
  { href: '/work/', label: 'Work' },
  { href: '/talks/', label: 'Talks' },
  { href: '/about/', label: 'About' },
  { href: '/community/', label: 'Community' },
];

// Pages linked from the footer only
export const FOOTER_EXTRA = [
  { href: '/moments/', label: 'Moments' },
  { href: '/now/', label: 'Now' },
  { href: 'https://poetry.nikunjthakkar.com/', label: 'Poetry' },
];

export const SOCIALS = [
  { href: 'https://www.linkedin.com/in/nikunjness', label: 'LinkedIn' },
  { href: 'https://x.com/nikunjness', label: 'X' },
  { href: 'https://github.com/nikunjness', label: 'GitHub' },
  { href: `mailto:${SITE.email}`, label: 'Email' },
  { href: '/rss.xml', label: 'RSS' },
];


/** schema.org Person used across the site's structured data. */
export const PERSON_LD = {
  '@type': 'Person',
  '@id': `${SITE.url}/#person`,
  name: SITE.name,
  url: SITE.url,
  image: `${SITE.url}/assets/img/avatar.jpg`,
  jobTitle: 'Co-founder',
  worksFor: { '@type': 'Organization', name: 'Snezzi', url: SNEZZI_URL },
  alumniOf: { '@type': 'CollegeOrUniversity', name: 'Dhirubhai Ambani University (DA-IICT)' },
  subjectOf: {
    '@type': 'Book',
    name: 'Where Ideas Take Off',
    datePublished: '2026',
    publisher: { '@type': 'CollegeOrUniversity', name: 'Dhirubhai Ambani University' },
  },
  description: SITE.description,
  knowsAbout: ['SaaS', 'Product management', 'Go-to-market', 'AI search', 'Startups', 'Big Data'],
  sameAs: ['https://www.linkedin.com/in/nikunjness', 'https://x.com/nikunjness', 'https://github.com/nikunjness'],
};
