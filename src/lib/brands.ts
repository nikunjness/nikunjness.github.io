// Logos and monograms used in chips, the marquee and the work timeline.
export type Brand = { name: string; icon?: string; mono?: string; color?: string; href?: string };

export const BRANDS: Record<string, Brand> = {
  snezzi: { name: 'Snezzi', icon: '/assets/img/brand/snezzi.png', href: 'https://snezzi.com' },
  whatfix: { name: 'Whatfix', icon: '/assets/img/brand/whatfix.png' },
  plivo: { name: 'Plivo', icon: '/assets/img/brand/plivo.png' },
  shoppr: { name: 'Shoppr.ai', icon: '/assets/img/brand/shoppr.png' },
  dataone: { name: 'DataOne Innovation Labs', icon: '/assets/img/brand/dataone.png' },
  upsurge: { name: 'UpSurge Ventures', mono: 'U', color: '#7b61ff' },
  gsoc: { name: 'Google Summer of Code', icon: '/assets/img/brand/gsoc.png' },
  startupog: { name: 'Startup OG', mono: 'OG', color: '#ff4d8d' },
  gdg: { name: 'GDG Cloud Ahmedabad', icon: '/assets/img/brand/gdg.png' },
  headstart: { name: 'Headstart Gujarat', mono: 'H', color: '#ffb020' },
  ishi: { name: 'Ishi Systems', icon: '/assets/img/brand/ishi.svg' },
  independent: { name: 'Independent', mono: 'IN', color: '#64748b' },
  daiict: { name: 'DA-IICT', mono: 'DA', color: '#16a34a' },
};
