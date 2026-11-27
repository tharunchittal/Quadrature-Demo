import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/templates/PageHero";
import NextPage from "@/components/templates/NextPage";
import CityTime from "@/components/ui/CityTime";
import { OFFICES } from "@/content/offices";

type Params = { city: string };

export function generateStaticParams() {
  return OFFICES.map((o) => ({ city: o.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { city } = await params;
  const o = OFFICES.find((x) => x.slug === city);
  return { title: `${o?.city ?? "Office"} · Quadrature concept demo` };
}

export default async function CityPage({ params }: { params: Promise<Params> }) {
  const { city } = await params;
  const office = OFFICES.find((o) => o.slug === city);
  if (!office) notFound();
  const path = `/working-here/our-offices/${office.slug}`;

  return (
    <main data-scene="peaks" className="page page-city" id="content">
      <PageHero
        crumbs={[{ label: "Working here" }, { label: "Our offices", href: "/working-here/our-offices" }, { label: office.city }]}
        title={office.city}
        lede={office.title}
        aside={
          <dl className="city-meta mono">
            <div>
              <dt className="dim">Local time</dt>
              <dd className="city-clock">
                <CityTime tz={office.tz} />
              </dd>
            </div>
            <div>
              <dt className="dim">District</dt>
              <dd>{office.district}</dd>
            </div>
            <div>
              <dt className="dim">Coordinates</dt>
              <dd>
                {office.lat} · {office.lon}
              </dd>
            </div>
          </dl>
        }
      />

      <section className="section" aria-label={`Inside ${office.city}`}>
        <div className="city">
          <ul className="facts">
            {office.facts.map((f, i) => (
              <li key={f} data-reveal style={{ ["--i" as string]: i }}>
                <span className="display fact-name">{f}</span>
              </li>
            ))}
          </ul>
          <div className="city-body">
            {office.body.map((p, i) => (
              <p key={i} className={i === 0 ? "statement-sm" : "body"} data-reveal style={{ ["--i" as string]: i }}>
                {p}
              </p>
            ))}
          </div>
        </div>

        <nav className="city-switch" aria-label="Other offices">
          <span className="mono dim">Other offices</span>
          {OFFICES.filter((o) => o.slug !== office.slug).map((o) => (
            <Link key={o.slug} href={`/working-here/our-offices/${o.slug}`} className="display">
              {o.city} <span aria-hidden="true">→</span>
            </Link>
          ))}
        </nav>
      </section>

      <NextPage current={path} />
    </main>
  );
}
