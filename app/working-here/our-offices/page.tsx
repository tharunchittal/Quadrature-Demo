import type { Metadata } from "next";
import SectionHead from "@/components/system/SectionHead";
import PageHero from "@/components/templates/PageHero";
import NextPage from "@/components/templates/NextPage";
import OfficeCard from "@/components/home/OfficeCard";
import { OFFICES } from "@/content/offices";

export const metadata: Metadata = { title: "Our offices · Quadrature concept demo" };

export default function OfficesPage() {
  return (
    <main data-scene="peaks" className="page" id="content">
      <PageHero
        crumbs={[{ label: "Working here" }, { label: "Our offices" }]}
        title="Our offices"
        lede="London, Singapore and New York. Each space has its own character; all of them are Quadrature."
        aside={
          <p className="body">
            It&rsquo;s really important to us that we stay connected with people in other offices. We encourage
            this through everything from our office design, plenty of travel, and our investment in sophisticated
            tech that ensures seamless global collaboration.
          </p>
        }
      />

      <section className="section" aria-label="Three offices">
        <SectionHead num="01" title="Three cities" note="Live local time" />
        <ul className="offices">
          {OFFICES.map((o, i) => (
            <OfficeCard
              key={o.slug}
              index={i}
              city={o.city}
              code={o.code}
              tz={o.tz}
              lat={o.lat}
              lon={o.lon}
              href={`/working-here/our-offices/${o.slug}`}
            />
          ))}
        </ul>
      </section>

      <section className="section" aria-labelledby="design-lede">
        <SectionHead num="02" title="Engaging spaces" note="How we design them" />
        <p id="design-lede" className="statement" data-reveal>
          Every design decision, from spatial layout to material palette, is guided by a consistent set of values.
        </p>
        <ul className="three">
          <li data-reveal>
            <h3 className="display three-title">Open and airy</h3>
            <p className="body">
              Our working spaces are open and airy, with dedicated areas for collaborative work, and quiet spaces
              for focus work.
            </p>
          </li>
          <li data-reveal style={{ ["--i" as string]: 1 }}>
            <h3 className="display three-title">Rooms for every meeting</h3>
            <p className="body">
              Team meetings, project kick offs, workshops, demos and presentations: intentional interior planning
              with integrated technology for each of them.
            </p>
          </li>
          <li data-reveal style={{ ["--i" as string]: 2 }}>
            <h3 className="display three-title">A breakout space</h3>
            <p className="body">
              Each of our offices has a breakout space where we eat, spend time together and host socials.
            </p>
          </li>
        </ul>
      </section>

      <NextPage current="/working-here/our-offices" />
    </main>
  );
}
