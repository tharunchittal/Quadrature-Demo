/** Site index: one source for the menu, the footer and next-page links. */
export type SiteItem = { label: string; href: string; external?: boolean };
export type SiteGroup = { title: string; items: SiteItem[] };

export const SITE: SiteGroup[] = [
  {
    title: "About us",
    items: [
      { label: "Our vision", href: "/about-us#vision" },
      { label: "Guiding principles", href: "/about-us#principles" },
      { label: "Our values", href: "/about-us#values" },
    ],
  },
  {
    title: "Working here",
    items: [
      { label: "Our culture", href: "/working-here/our-culture" },
      { label: "Our offices", href: "/working-here/our-offices" },
      { label: "Our benefits", href: "/working-here/our-benefits" },
    ],
  },
  {
    title: "Careers",
    items: [
      { label: "Join us", href: "/careers/join-us" },
      { label: "Internships", href: "/careers/internships" },
      { label: "How we hire", href: "/careers/how-we-hire" },
    ],
  },
  {
    title: "Elsewhere",
    items: [
      { label: "Contact", href: "/contact" },
      { label: "Foundation", href: "https://www.qc.foundation/", external: true },
    ],
  },
  {
    title: "Legal",
    items: [
      { label: "Corporate social responsibility", href: "/corporate-social-responsibility" },
      { label: "Data vendors", href: "/data-vendors" },
      { label: "Scam warning", href: "/scam-warning" },
      { label: "Regulatory disclosures", href: "/regulatory-disclosures" },
      { label: "Cookie policy", href: "/legal/cookies-policy" },
      { label: "Terms and conditions", href: "/legal/terms-and-conditions" },
    ],
  },
];

/** Anchors on the home page, in reading order. */
export const HOME_SECTIONS = [
  ["01", "What we do", "/#what-we-do"],
  ["02", "Vision", "/#vision"],
  ["03", "Purpose", "/#purpose"],
  ["04", "Values", "/#values"],
  ["05", "Technology", "/#technology"],
  ["06", "Offices", "/#offices"],
  ["07", "Foundation", "/#foundation"],
  ["08", "Join us", "/#join"],
] as const;

/** Reading order for "next page" links at the foot of each page. */
export const READING_ORDER: { label: string; href: string }[] = [
  { label: "About us", href: "/about-us" },
  { label: "Our culture", href: "/working-here/our-culture" },
  { label: "Our offices", href: "/working-here/our-offices" },
  { label: "London", href: "/working-here/our-offices/london" },
  { label: "Singapore", href: "/working-here/our-offices/singapore" },
  { label: "New York", href: "/working-here/our-offices/new-york" },
  { label: "Our benefits", href: "/working-here/our-benefits" },
  { label: "Join us", href: "/careers/join-us" },
  { label: "Internships", href: "/careers/internships" },
  { label: "How we hire", href: "/careers/how-we-hire" },
  { label: "Contact", href: "/contact" },
  { label: "Corporate social responsibility", href: "/corporate-social-responsibility" },
  { label: "Data vendors", href: "/data-vendors" },
  { label: "Scam warning", href: "/scam-warning" },
  { label: "Regulatory disclosures", href: "/regulatory-disclosures" },
  { label: "Cookie policy", href: "/legal/cookies-policy" },
  { label: "Terms and conditions", href: "/legal/terms-and-conditions" },
];

export function nextAfter(href: string) {
  const i = READING_ORDER.findIndex((p) => p.href === href);
  return READING_ORDER[(i + 1) % READING_ORDER.length] ?? READING_ORDER[0];
}
