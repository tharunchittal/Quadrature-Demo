import type { Metadata } from "next";
import SectionHead from "@/components/system/SectionHead";
import Button from "@/components/system/Button";
import PageHero from "@/components/templates/PageHero";
import NextPage from "@/components/templates/NextPage";

export const metadata: Metadata = { title: "Internships · Quadrature concept demo" };

const FACTS: [string, string][] = [
  ["11 weeks", "Each summer"],
  ["2 cities", "London and New York"],
  ["Sep to Dec", "Hiring season"],
  ["Housed", "Serviced apartments near the office"],
];

export default function InternshipsPage() {
  return (
    <main data-scene="bars" className="page" id="content">
      <PageHero
        crumbs={[{ label: "Careers" }, { label: "Internships" }]}
        title="Internships"
        lede="Students from a variety of backgrounds, applying their skills and curiosity to real-world, interesting problems."
        aside={
          <Button href="https://www.quadrature.ai/careers/join-us/" external>
            Apply on quadrature.ai
          </Button>
        }
      />

      <section className="section" aria-label="At a glance">
        <ul className="figures">
          {FACTS.map(([fig, label], i) => (
            <li key={fig} data-reveal style={{ ["--i" as string]: i }}>
              <span className="display figure">{fig}</span>
              <span className="mono dim">{label}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="section" aria-labelledby="tracks-lede">
        <SectionHead num="01" title="Two tracks" note="Paid, mentored, real work" />
        <p id="tracks-lede" className="intro" data-reveal>
          We offer competitively paid summer internships to university students from across the globe. The
          experience helps students understand our industry, our work and our culture.
        </p>
        <div className="routes">
          <article className="route" data-reveal>
            <p className="mono dim">Research and Technology</p>
            <h3 className="display route-title">Quant Development</h3>
            <p className="body">Programming experience is a must if you are applying to the Quant Developer internship.</p>
          </article>
          <article className="route" data-reveal style={{ ["--i" as string]: 1 }}>
            <p className="mono dim">Systems and Platform Engineering</p>
            <h3 className="display route-title">Core Technology</h3>
            <p className="body">Internships across Systems Engineering and Platform Engineering, inside our Core Technology domain.</p>
          </article>
        </div>
      </section>

      <section className="section" aria-labelledby="mentored-lede">
        <SectionHead num="02" title="What to expect" note="Learn, experiment, deliver" />
        <p id="mentored-lede" className="statement" data-reveal>
          Our interns are mentored closely and deliver work that has real-world results.
        </p>
        <div className="split">
          <p className="body" data-reveal style={{ ["--i" as string]: 1 }}>
            We proactively look for people that might not have considered a career in quantitative finance, so if
            you don&rsquo;t have experience with markets or our industry, don&rsquo;t worry.
          </p>
          <p className="body" data-reveal style={{ ["--i" as string]: 2 }}>
            Our hiring season runs from September to December each year. Send your CV and we will be in touch
            during the hiring period if your experience is a relevant fit. We are not always able to respond
            individually to each application due to the high volumes we receive.
          </p>
        </div>
      </section>

      <NextPage current="/careers/internships" />
    </main>
  );
}
