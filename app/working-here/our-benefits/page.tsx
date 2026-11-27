import type { Metadata } from "next";
import SectionHead from "@/components/system/SectionHead";
import PageHero from "@/components/templates/PageHero";
import NextPage from "@/components/templates/NextPage";
import BenefitsTable, { type Benefit } from "@/components/pages/BenefitsTable";

export const metadata: Metadata = { title: "Our benefits · Quadrature concept demo" };

const BENEFITS: Benefit[] = [
  { name: "30 days holiday", detail: "30 days per year, with the option of carrying over up to 5 days to the next year", group: "Time" },
  { name: "Sabbatical", detail: "3-month paid sabbatical once you’ve been with us for 5 years, and every 5 years thereafter", group: "Time" },
  { name: "Supporting parents", detail: "12 months of fully paid leave for all parents, up to 15 nights of a night nanny, and coaching sessions to support you when coming back to work", group: "Time" },
  { name: "Flexible working", detail: "Flexibility to work from home occasionally", group: "Time" },
  { name: "Private medical", detail: "Comprehensive private medical cover for employees and their families", group: "Health" },
  { name: "Private dental", detail: "Comprehensive private dental cover for employees and their families", group: "Health" },
  { name: "Private GP", detail: "Free access to a local private GP to make it easy and convenient for you to see a doctor", group: "Health" },
  { name: "Health checks", detail: "Every two years, a free, comprehensive health check up through a leading provider", group: "Health" },
  { name: "Mental health", detail: "Free and confidential private therapy sessions, mindfulness sessions and a free Headspace subscription", group: "Health" },
  { name: "Family planning", detail: "Comprehensive family planning treatment coverage for employees and their partners", group: "Health" },
  { name: "Eye tests and glasses", detail: "Free annual eye tests and money towards glasses", group: "Health" },
  { name: "Onsite gym", detail: "Our own gym in the office, complete with showers, towels and lockers", group: "Health" },
  { name: "Gym membership", detail: "International memberships at gyms in our office locations", group: "Health" },
  { name: "Yoga and Pilates", detail: "Free weekly teacher-led yoga and pilates sessions in our offices", group: "Health" },
  { name: "Retirement fund", detail: "10% of your annual basic salary (up to a cap). You don’t have to contribute yourself", group: "Money" },
  { name: "Insurances", detail: "Life insurance and income protection for stability and peace of mind", group: "Money" },
  { name: "Travel insurance", detail: "Individual and family travel cover for both business and personal trips", group: "Money" },
  { name: "Commuter benefits", detail: "An interest free loan for a rail ticket so you can benefit from the cost saving", group: "Money" },
  { name: "Tax return support", detail: "We work with an accounting firm to offer everyone support for annual tax returns", group: "Money" },
  { name: "Funded training", detail: "Tailored tuition, training and coaching, including post-grad funding", group: "Growth" },
  { name: "Personal development fund", detail: "A yearly allowance for any kind of course or learning activity outside of work", group: "Growth" },
  { name: "Free books", detail: "Request any book and it will be added to our in-house library within a few days", group: "Growth" },
  { name: "Music lessons", detail: "Subsidised teacher-led piano, guitar and drum lessons in our music room", group: "Growth" },
  { name: "Annual winter trip", detail: "A weekend away to enjoy winter sports and mountain air", group: "Together" },
  { name: "Annual summer trip", detail: "A weekend away to relax and unwind", group: "Together" },
  { name: "Monthly social events", detail: "Free events in the office or an offsite activity. +1s are often welcome", group: "Together" },
  { name: "Breakfast, snacks and drinks", detail: "Free breakfast (cereal and yoghurt), fruit, snacks and drinks", group: "Together" },
];

export default function BenefitsPage() {
  return (
    <main data-scene="surface" className="page" id="content">
      <PageHero
        crumbs={[{ label: "Working here" }, { label: "Our benefits" }]}
        title="Our benefits"
        lede="Learning, mentoring, wellbeing, health and great perks."
        aside={
          <p className="body">
            {BENEFITS.length} benefits, from 12 months of fully paid parental leave to a 3-month sabbatical every
            five years.
          </p>
        }
      />

      <section className="section" aria-label="All benefits">
        <SectionHead num="01" title="Everything we offer" note={`${BENEFITS.length} benefits`} />
        <BenefitsTable items={BENEFITS} />
        <p className="body footnote" data-reveal>
          Benefits vary slightly by office; ask about what&rsquo;s on offer where you&rsquo;re interviewing. We
          carbon offset all business related travel.
        </p>
      </section>

      <section className="section" aria-labelledby="together-lede">
        <SectionHead num="02" title="Spending time together" note="At least once a month" />
        <p id="together-lede" className="statement" data-reveal>
          Socials at least once a month, two trips a year, and a big Christmas party where everyone can bring their
          friends.
        </p>
        <div className="split">
          <p className="body" data-reveal style={{ ["--i" as string]: 1 }}>
            We bring people together often for social events, or just to hang out. We enjoy spending time together
            and have a lot of fun, but we&rsquo;re also trying to help everyone get to know one another in a
            growing, global business.
          </p>
          <p className="body" data-reveal style={{ ["--i" as string]: 2 }}>
            Over the years we have organised go karting, axe throwing, white water rafting, laser tag, cocktail
            making, cooking classes and escape rooms, to name a few. Many of our socials are open to +1s, so
            friends or partners can enjoy them too.
          </p>
        </div>
      </section>

      <NextPage current="/working-here/our-benefits" />
    </main>
  );
}
