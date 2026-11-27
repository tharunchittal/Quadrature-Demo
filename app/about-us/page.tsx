import type { Metadata } from "next";
import SectionHead from "@/components/system/SectionHead";
import PageHero from "@/components/templates/PageHero";
import NextPage from "@/components/templates/NextPage";
import ValueCard from "@/components/home/ValueCard";
import { VALUES } from "@/content/values";

export const metadata: Metadata = { title: "About us · Quadrature concept demo" };

const PRINCIPLES = [
  {
    name: "Finding and keeping the best people",
    body: "People are at the heart of our business, and we do all we can to create a culture people both enjoy being a part of, and where they can flourish and grow.",
  },
  {
    name: "Maximising opportunities",
    body: "Many businesses consider this to mean maximising short-term profits. We don’t mean that. We focus on opportunities that support the long term growth, health and success of our business. Reliable, sustainable revenue is more important to us than short-term gains.",
  },
  {
    name: "Automating repetitive activities",
    body: "Automating what we can frees up our time to work on new and innovative projects, so we like developing tools that optimise everyone’s workflow. Whilst we can’t automate everything, and sometimes there are trade-offs that mean we need to prioritise where our efforts go, we highly value this work and make room for it wherever possible.",
  },
  {
    name: "Embracing robust processes and technology",
    body: "We aim for quality and scalability in everything we do, not just in tech. We’re pragmatic, but we don’t just hack things together. We build things to last and sweat the details.",
  },
];

export default function AboutPage() {
  return (
    <main data-scene="surface" className="page" id="content">
      <PageHero
        crumbs={[{ label: "About us" }]}
        title="About us"
        lede="Our vision is to build the Ultimate Automated Trading Business."
        aside={
          <ul className="jump mono">
            <li><a href="#vision">Vision</a></li>
            <li><a href="#principles">Guiding principles</a></li>
            <li><a href="#values">Values</a></li>
          </ul>
        }
      />

      <section className="section" id="vision" aria-labelledby="vision-lede">
        <SectionHead num="01" title="Vision" note="Where we are going" />
        <p id="vision-lede" className="statement" data-reveal>
          All liquid, electronically tradeable asset classes, across all horizons.
        </p>
        <div className="split">
          <p className="body" data-reveal style={{ ["--i" as string]: 1 }}>
            We see a future where Quadrature trades all liquid electronically tradeable asset classes across all
            horizons to generate consistent, significant returns on our proprietary capital.
          </p>
          <div data-reveal style={{ ["--i" as string]: 2 }}>
            <p className="body">
              The technology we&rsquo;re building is based on modular components shared across as many of our
              trading strategies as possible to maximise impact.
            </p>
            <p className="body">
              The highly automated nature of our systems will mean that our people can focus on the most
              meaningful creative tasks, working collaboratively across all parts of our business to add value.
            </p>
          </div>
        </div>
      </section>

      <section className="section" id="principles" aria-labelledby="principles-intro">
        <SectionHead num="02" title="Guiding principles" note="Our anchors" />
        <p id="principles-intro" className="intro" data-reveal>
          Our guiding principles influence the decisions that we make and how we think about our work. They act as
          our anchors: they remind us of what&rsquo;s important.
        </p>
        <ol className="rows">
          {PRINCIPLES.map((p, i) => (
            <li key={p.name} className="row" data-reveal style={{ ["--i" as string]: i }}>
              <span className="mono dim">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="display row-title">{p.name}</h3>
              <p className="body">{p.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="section" id="values" aria-labelledby="values-intro">
        <SectionHead num="03" title="Values" note="Kept alive at all costs" />
        <p id="values-intro" className="intro" data-reveal>
          Our values are the foundation upon which our business is built. They are the behavioural traits that
          are special to us, critical to our success and that we ensure are kept alive at all costs.
        </p>
        <ol className="values">
          {VALUES.map((v, i) => (
            <ValueCard key={v.name} index={i} {...v} />
          ))}
        </ol>
      </section>

      <NextPage current="/about-us" />
    </main>
  );
}
