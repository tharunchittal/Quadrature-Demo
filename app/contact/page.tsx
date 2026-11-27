import type { Metadata } from "next";
import Button from "@/components/system/Button";
import PageHero from "@/components/templates/PageHero";
import NextPage from "@/components/templates/NextPage";
import OfficeCard from "@/components/home/OfficeCard";
import { OFFICES } from "@/content/offices";

export const metadata: Metadata = { title: "Contact · Quadrature concept demo" };

const CONTACT = "https://www.quadrature.ai/contact/";

export default function ContactPage() {
  return (
    <main data-scene="logo" className="page" id="content">
      <PageHero
        crumbs={[{ label: "Contact" }]}
        title="Contact"
        lede="There’s so much that we want to build, and we’ve only just begun."
      />

      <section className="section section-tight" aria-label="Ways to reach us">
        <div className="routes routes-3">
          <article className="route" data-reveal>
            <p className="mono dim">Careers</p>
            <h3 className="display route-title">Send us your CV</h3>
            <p className="body">If you are interested in working with us, apply through the join us page.</p>
            <Button href="/careers/join-us">Join us</Button>
          </article>
          <article className="route" data-reveal style={{ ["--i" as string]: 1 }}>
            <p className="mono dim">Everything else</p>
            <h3 className="display route-title">General enquiries</h3>
            <p className="body">Addresses for general enquiries are published on quadrature.ai. They are not monitored by the recruitment team.</p>
            <Button href={CONTACT} variant="line" external>
              Contact page
            </Button>
          </article>
          <article className="route" data-reveal style={{ ["--i" as string]: 2 }}>
            <p className="mono dim">Journalists</p>
            <h3 className="display route-title">Press enquiries</h3>
            <p className="body">Press contacts are listed alongside general enquiries on quadrature.ai.</p>
            <Button href={CONTACT} variant="line" external>
              Contact page
            </Button>
          </article>
        </div>
      </section>

      <section className="section" aria-label="Offices">
        <p className="mono dim contact-addr" data-reveal>
          Registered office · The Leadenhall Building, 122 Leadenhall Street, London EC3V 4AB
        </p>
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

      <NextPage current="/contact" />
    </main>
  );
}
