// Podcast episodes and talks shown on /talks/. Titles are as published on YouTube.

export const STARTUP_OG_PLAYLIST = 'https://www.youtube.com/playlist?list=PLQpPKpeiauP-6w3TCyqoPyOWNNzQeyKHN';

export type Episode = { id: string; title: string; guest?: string; minutes: number };

export const startupOg: Episode[] = [
  { id: 'pFPprRjKXfk', title: 'Building a LinkedIn SaaS With a Small Team', guest: 'Utsav Patel', minutes: 41 },
  { id: 'kMXPi-egKts', title: 'Building KREO: D2C Gaming Gear in India', guest: 'Himanshu Gupta', minutes: 45 },
  { id: 'MV10D4EHaHg', title: 'Bootstrapping 3 SaaS Companies as a Non-Tech Founder', guest: 'Ankit Dudhwewala', minutes: 45 },
  { id: 'Z-9boeTQIUA', title: 'Merchant of Record for Global SaaS Payments', guest: 'Rishabh Goel', minutes: 50 },
  { id: 'drWNBRD9nFk', title: 'Bootstrapping Dyrect: Pivots and Global Growth', guest: 'Abhishek Agarwal', minutes: 37 },
  { id: '1XZ1bp0pLUY', title: 'Building and Selling MyClassCampus to Teachmint', guest: 'Raj Kothari', minutes: 46 },
  { id: 'lL7VIqzk9ZY', title: 'How Superjoin Reached #1 on Product Hunt', minutes: 43 },
  { id: 'WNZLA3OT384', title: 'Building SmartTask in a Crowded SaaS Market', guest: 'Shyamal Parikh', minutes: 50 },
  { id: '6JlfkIFDzeo', title: 'Why Interactive Demos Matter for SaaS Sales', guest: 'Robin Singhvi', minutes: 40 },
  { id: '9k0hH_6PYXs', title: "Xobin's Pivots, VC Funding and $500K ARR", guest: 'Guruprakash Sivabalan', minutes: 56 },
  { id: 'mSsMl0z0NzM', title: 'How Superblog Reached $4.5K MRR', guest: 'Sai Krishna', minutes: 45 },
];

export type Talk = {
  id: string;
  title: string;
  host: string;
  date: string;
  minutes: number;
  kind: string;
  note: string;
  thumb?: 'hqdefault';
};

export const talks: Talk[] = [
  {
    id: '0PZ1CJnu_Ls',
    title: 'Building Organic Marketing in the Age of AI',
    host: 'Dashcoin Research',
    date: '2025-06-16',
    minutes: 36,
    kind: 'Podcast guest',
    note: 'AI search visibility for small businesses, research-backed content, and building with a tight customer feedback loop.',
  },
  {
    id: 'H362kPYEl6E',
    thumb: 'hqdefault',
    title: 'Learnings from Failures',
    host: 'eChai Ventures',
    date: '2022-01-20',
    minutes: 4,
    kind: 'Talk',
    note: 'An early DataOne partnership that went wrong, and what it taught me about due diligence and contracts.',
  },
  {
    id: '9t_NYGbwsnE',
    title: 'Bright Business Beginnings',
    host: 'Silver Oak University IEEE SB',
    date: '2020-04-30',
    minutes: 67,
    kind: 'Guest session',
    note: 'A practical session for students on starting a business, from the Genesis: Beyond Learning series.',
  },
];
