export type Office = {
  slug: "london" | "singapore" | "new-york";
  city: string;
  code: string;
  tz: string;
  lat: string;
  lon: string;
  title: string;
  opened?: string;
  district: string;
  facts: string[];
  body: string[];
};

const SOCIALS =
  "We want to make the most of our amazing office so, while we host some of our socials off-site, we’ll also have plenty here. This might be a casual games night, or a bigger event such as our annual Oktoberfest or Pride celebrations.";

export const OFFICES: Office[] = [
  {
    slug: "london",
    city: "London",
    code: "LDN",
    tz: "Europe/London",
    lat: "51.51° N",
    lon: "0.08° W",
    title: "A beautifully designed office in the heart of the City",
    district: "The City",
    facts: ["Four floors", "Barista bar", "Games room, with karaoke", "Wellness floor", "Chalet, beach and lake meeting rooms"],
    body: [
      "We’re fortunate enough to have a fantastic office in the City. Set over four floors and overlooking the London skyline, our office includes a big breakout space, an open plan kitchen with breakfast choices and a barista bar, our own games room (kitted out with karaoke), chalet, beach and lake themed meeting rooms, and a wellness floor with a state-of-the-art gym, coaching, meditation and music rooms.",
      SOCIALS,
    ],
  },
  {
    slug: "singapore",
    city: "Singapore",
    code: "SGP",
    tz: "Asia/Singapore",
    lat: "1.28° N",
    lon: "103.85° E",
    title: "A distinctive space in Singapore’s CBD",
    opened: "2023",
    district: "Central Business District",
    facts: ["Opened 2023", "APAC market coverage", "Camper van meeting room", "Harbour view breakout space"],
    body: [
      "Our first overseas office launched in Singapore in 2023. We trade markets globally, and wanted to establish a presence somewhere our trading and technology teams would be able to support our growth, providing coverage for the APAC markets.",
      "Located in the heart of the Central Business District, our office offers a vibrant, dynamic space. The office is designed to foster collaboration, with amazing views of the Singapore skyline. The meeting rooms share this spectacular view and our most unique meeting room across all locations is the camper van located in the centre of the office.",
      "Like our New York and London offices, the Singapore team uses the breakout space in the office for social events. The breakout space overlooks the harbour, and it provides one of the best views to watch the national day fireworks, parade, and other festivities every 9th August.",
      SOCIALS,
    ],
  },
  {
    slug: "new-york",
    city: "New York",
    code: "NYC",
    tz: "America/New_York",
    lat: "40.72° N",
    lon: "74.00° W",
    title: "A contemporary office space in vibrant Soho",
    opened: "September 2024",
    district: "Soho",
    facts: ["Opened September 2024", "Gym, with pilates, PT and classes", "Large breakout spaces", "Music room"],
    body: [
      "In September 2024, we launched our third office, in New York. We’re thrilled to be in Soho where our office, like our spaces in London and Singapore, was thoughtfully designed to bring people together, collaborate, and do great work. The office is set up to make this easy, with areas to connect with colleagues, work on projects and whiteboard ideas.",
      "We want to support people’s physical and mental well-being, with a gym (and regular pilates, PT and classes), large breakout spaces for daily lunches and fun social events, music room and more.",
      SOCIALS,
    ],
  },
];
