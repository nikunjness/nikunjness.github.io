// Photos for /moments/. Drop a new image into public/assets/img/gallery/, run `npm run images`,
// then add an entry here. Captions come from the original LinkedIn post or blog post.

export type Category = 'community' | 'speaking' | 'travel';

export type Moment = {
  src: string;
  alt: string;
  caption: string;
  place?: string;
  date: string; // YYYY-MM or YYYY
  category: Category;
  /** Promotional poster rather than a photo; shown on the event wall */
  poster?: boolean;
};

export const CATEGORIES: { key: Category; label: string }[] = [
  { key: 'community', label: 'Community' },
  { key: 'speaking', label: 'Speaking' },
  { key: 'travel', label: 'Travel' },
];

export const photos: Moment[] = [
  {
    src: '/assets/img/gallery/headstart-mou-gujarat.webp',
    alt: 'Nikunj and Headstart team members exchanging signed MoU documents with Government of Gujarat officials',
    caption: 'Headstart Network Foundation signs an MoU with the Government of Gujarat',
    date: '2019-05',
    category: 'community',
  },
  {
    src: '/assets/img/gallery/nirma-ai-tech-talk.webp',
    alt: 'Nikunj speaking on stage at Nirma University, slides on artificial intelligence behind him',
    caption: 'Tech talk on artificial intelligence, organized by eChai Ventures and IEEE Gujarat Section',
    place: 'Nirma University, Ahmedabad',
    date: '2019-02',
    category: 'speaking',
  },
  {
    src: '/assets/img/gallery/gdg-cloud-ahmedabad.webp',
    alt: 'Nikunj wearing a GDG Cloud jacket',
    caption: 'GDG Cloud Ahmedabad grew to 2,400+ members in its first year',
    place: 'Ahmedabad',
    date: '2020-01',
    category: 'community',
  },
  {
    src: '/assets/img/gallery/ignite-mentor-recognition.webp',
    alt: 'Nikunj receiving a certificate of appreciation in front of an IGNITE Incubator backdrop',
    caption: 'Recognized as a mentor at IGNITE Incubator',
    date: '2020-01',
    category: 'community',
  },
  {
    src: '/assets/img/gallery/google-developers-thank-you.webp',
    alt: 'A thank-you letter from the Google India Developer Ecosystem team in a gift box',
    caption: 'A thank-you from Google’s India Developer Ecosystem team for GDG Cloud Ahmedabad’s first year',
    date: '2020-01',
    category: 'community',
  },
  {
    src: '/assets/img/fossasia_group.webp',
    alt: 'Hundreds of FOSSASIA 2015 attendees waving in a large group photo',
    caption: 'FOSSASIA 2015 group photo',
    place: 'Singapore',
    date: '2015-03',
    category: 'community',
  },
  {
    src: '/assets/img/otres.webp',
    alt: 'A person sitting on the sand at Otres Beach at dusk',
    caption: 'Otres Beach, after FOSSASIA 2014',
    place: 'Sihanoukville, Cambodia',
    date: '2014',
    category: 'travel',
  },
  {
    src: '/assets/img/silver-pagoda.webp',
    alt: 'The Silver Pagoda in Phnom Penh',
    caption: 'Silver Pagoda',
    place: 'Phnom Penh, Cambodia',
    date: '2014',
    category: 'travel',
  },
  {
    src: '/assets/img/kohrong.webp',
    alt: 'Koh Rong island shoreline with wooden huts among palm trees',
    caption: 'Koh Rong island',
    place: 'Cambodia',
    date: '2014',
    category: 'travel',
  },
  {
    src: '/assets/img/longbeach.webp',
    alt: 'Long Beach on Koh Rong, white sand and turquoise water',
    caption: 'Long Beach, reached after a jungle trek across Koh Rong',
    place: 'Cambodia',
    date: '2014',
    category: 'travel',
  },
  {
    src: '/assets/img/wat-phnom.webp',
    alt: 'The large flower clock in the gardens at Wat Phnom',
    caption: 'Wat Phnom',
    place: 'Phnom Penh, Cambodia',
    date: '2014',
    category: 'travel',
  },
  {
    src: '/assets/img/serendipity.webp',
    alt: 'Serendipity Beach in Sihanoukville',
    caption: 'Serendipity Beach',
    place: 'Sihanoukville, Cambodia',
    date: '2014',
    category: 'travel',
  },
];

export const posters: Moment[] = [
  {
    src: '/assets/img/gallery/google-cloud-community-day-2019.webp',
    alt: 'Google Cloud Community Day poster, 7 December 2019, Ahmedabad',
    caption: 'Google Cloud Community Day, the first hosted by GDG Cloud Ahmedabad. Sold out.',
    date: '2019-12',
    category: 'community',
    poster: true,
  },
  {
    src: '/assets/img/gallery/gccd-2019-speakers.webp',
    alt: 'Speaker lineup for Google Cloud Community Day 2019 in Ahmedabad',
    caption: 'Community Day speaker lineup',
    date: '2019-12',
    category: 'community',
    poster: true,
  },
  {
    src: '/assets/img/gallery/hsx-2018-bengaluru.webp',
    alt: 'HSX poster reading 10/02/18, You better be in Bengaluru',
    caption: 'HSX, Headstart’s startup conclave',
    place: 'Bengaluru',
    date: '2018-02',
    category: 'community',
    poster: true,
  },
  {
    src: '/assets/img/gallery/hsx-2019-panel.webp',
    alt: 'HSX 2019 panel poster on the role of business incubators and accelerators',
    caption: 'HSX 2019: the role of incubators and accelerators for startups',
    date: '2019-06',
    category: 'community',
    poster: true,
  },
  {
    src: '/assets/img/gallery/startup-saturday-growth-hacking.webp',
    alt: 'Startup Saturday poster on growth hacking for business in 2020',
    caption: 'Startup Saturday: growth hacking for business in 2020',
    place: 'Ahmedabad',
    date: '2019-11',
    category: 'community',
    poster: true,
  },
  {
    src: '/assets/img/gallery/women-entrepreneurs-potluck.webp',
    alt: 'Headstart Women Entrepreneurs Potluck poster, 9 November 2019 at DevX, Ahmedabad',
    caption: 'Women Entrepreneurs Potluck by Headstart Ahmedabad',
    place: 'DevX, Ahmedabad',
    date: '2019-11',
    category: 'community',
    poster: true,
  },
  {
    src: '/assets/img/gallery/webinar-ecommerce-brands.webp',
    alt: 'Headstart online session poster on building great eCommerce brands',
    caption: 'Startup Saturday online: how Beardo, The Beauty Co., Rey Naturals and Food Memories were built',
    date: '2020-06',
    category: 'community',
    poster: true,
  },
  {
    src: '/assets/img/gallery/headstart-virtual-kickstart.webp',
    alt: 'Headstart Virtual Kickstart poster: pitch to angels, VCs and HNIs from home',
    caption: 'Virtual Kickstart, Headstart’s investor-connect program, moved online',
    date: '2020-04',
    category: 'community',
    poster: true,
  },
  {
    src: '/assets/img/gallery/echai-ecommerce-meet.webp',
    alt: 'eChai Social eCommerce Entrepreneurs Meet poster, presented with Shoppr',
    caption: 'eChai Social: eCommerce Entrepreneurs Meet, with Shoppr',
    date: '2020-02',
    category: 'community',
    poster: true,
  },
  {
    src: '/assets/img/gallery/talk-human-intuition-ai.webp',
    alt: 'Speaker poster for Nikunj Thakkar: relevance of human intuition in an AI-driven world',
    caption: 'Talk: the relevance of human intuition in an AI-driven world',
    date: '2020-02',
    category: 'speaking',
    poster: true,
  },
  {
    src: '/assets/img/gallery/talk-future-ready-digital-finance.webp',
    alt: 'Bank of Baroda session poster with Nikunj Thakkar as speaker',
    caption: 'Big Data in banking workshop at Bank of Baroda’s Baroda Apex Academy',
    place: 'Gandhinagar',
    date: '2019-10',
    category: 'speaking',
    poster: true,
  },
];
