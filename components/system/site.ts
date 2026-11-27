/** Site index. Items without href are pages scheduled for phase 3. */
export type SiteItem = { label: string; href?: string; external?: boolean };
export type SiteGroup = { title: string; items: SiteItem[] };

export const SITE: SiteGroup[] = [
  {
    title: "About us",
    items: [{ label: "Our vision" }, { label: "Guiding principles" }, { label: "Our values" }],
  },
  {
    title: "Working here",
    items: [{ label: "Our culture" }, { label: "Our offices" }, { label: "Our benefits" }],
  },
  {
    title: "Careers",
    items: [{ label: "Join us" }, { label: "Internships" }, { label: "How we hire" }],
  },
  {
    title: "Elsewhere",
    items: [
      { label: "Contact" },
      { label: "Foundation", href: "https://www.qc.foundation/", external: true },
    ],
  },
  {
    title: "Legal",
    items: [
      { label: "Corporate social responsibility" },
      { label: "Data vendors" },
      { label: "Scam warning" },
      { label: "Regulatory disclosures" },
    ],
  },
];

/** Anchors on the home page, in reading order. */
export const HOME_SECTIONS = [
  ["01", "What we do", "#what-we-do"],
  ["02", "Vision", "#vision"],
  ["03", "Purpose", "#purpose"],
  ["04", "Values", "#values"],
  ["05", "Technology", "#technology"],
  ["06", "Offices", "#offices"],
  ["07", "Foundation", "#foundation"],
  ["08", "Join us", "#join"],
] as const;
