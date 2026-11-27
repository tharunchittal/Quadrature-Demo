import type { Metadata } from "next";
import SectionHead from "@/components/system/SectionHead";
import PageHero from "@/components/templates/PageHero";
import NextPage from "@/components/templates/NextPage";

export const metadata: Metadata = { title: "Our culture · Quadrature concept demo" };

const LEARNING = [
  ["Townhall meetings", "Where we share updates and host talks"],
  ["Speaker Series", "Monthly, with interesting speakers from all walks of life"],
  ["Free books", "And membership of the How To Academy"],
  ["Individual development", "Workshops, development programmes, personal coaching and funded study"],
];

const PARTNERS = ["Teach First", "The Access Project", "Stemettes", "St Giles Trust"];

export default function CulturePage() {
  return (
    <main data-scene="surface" className="page" id="content">
      <PageHero
        crumbs={[{ label: "Working here" }, { label: "Our culture" }]}
        title="Our culture"
        lede="We exist to put People First and Innovate Together."
        aside={
          <p className="body">
            We know that talented individuals can contribute a lot, but we believe that when they collaborate and
            innovate together, the results compound.
          </p>
        }
      />

      <section className="section" aria-labelledby="teams-lede">
        <SectionHead num="01" title="How we work" note="Small teams, big projects" />
        <p id="teams-lede" className="statement" data-reveal>
          We work in small, collaborative teams on ambitious projects that add real value.
        </p>
        <div className="split">
          <p className="body" data-reveal style={{ ["--i" as string]: 1 }}>
            We encourage everyone to take ownership of their work, ask questions, understand what the business
            needs, debate ideas and experiment. Innovation relies on experimentation. If you can make a case for
            the radically new, we&rsquo;ll pursue it and provide the support to take it from prototype to
            production.
          </p>
          <div data-reveal style={{ ["--i" as string]: 2 }}>
            <p className="body">
              We have a long list of stuff we&rsquo;d love to do and build, as well as a growing business and
              infrastructure that deserves our attention and focus. We prioritise and discuss trade offs often so
              that everyone is on the same page.
            </p>
            <p className="body">
              We don&rsquo;t believe in structuring our business in a way that creates rigid hierarchy or stops
              people from making an impact. We prefer to keep things flexible. We share ideas, learn and pivot along
              the way so that we keep our entrepreneurial and collaborative culture alive.
            </p>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="learning-lede">
        <SectionHead num="02" title="Learning" note="Learning and development" />
        <div className="tech">
          <div className="tech-copy tech-copy-left">
            <p id="learning-lede" className="statement-sm" data-reveal>
              Deep, career-defining, impactful, long-lasting learning happens through the work.
            </p>
            <p className="body" data-reveal style={{ ["--i" as string]: 1 }}>
              Solving problems, researching, debating opinions, spotting insights, anticipating what&rsquo;s
              needed, collaborating, leading a project, coordinating work across different people, mentoring and
              teaching: these are all the best ways to learn, and they&rsquo;re all a core part of how we work.
            </p>
          </div>
          <ul className="facts">
            {LEARNING.map(([name, detail], i) => (
              <li key={name} data-reveal style={{ ["--i" as string]: i }}>
                <span className="display fact-name">{name}</span>
                <span className="body">{detail}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="stack-lede">
        <SectionHead num="03" title="Our tech stack" note="Front and centre" />
        <div className="tech">
          <ul className="tech-stack display" aria-label="Languages we build in">
            {["C++", "Python", "Rust"].map((l, i) => (
              <li key={l} data-reveal style={{ ["--i" as string]: i }}>
                {l}
              </li>
            ))}
          </ul>
          <div className="tech-copy">
            <p id="stack-lede" className="statement-sm" data-reveal>
              Tech isn&rsquo;t a department that supports the business. It is core to our business and sits front
              and centre of what we do.
            </p>
            <p className="body" data-reveal style={{ ["--i" as string]: 1 }}>
              Our technology teams collaborate closely with our research and operations teams to develop the
              software and infrastructure we need to promptly turn ideas into reality. We make our proprietary
              systems high performing, scalable and intuitive.
            </p>
            <p className="body" data-reveal style={{ ["--i" as string]: 2 }}>
              Our trading is entirely automated and we look to bring automation to everything we do. We have
              travelled from using Linux on a few machines we built ourselves, to scaling out to thousands of
              servers for research, simulation and testing, all coordinated by our own grid scheduling system.
            </p>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="inclusion-lede">
        <SectionHead num="04" title="Inclusion" note="Inclusion and belonging" />
        <p id="inclusion-lede" className="statement" data-reveal>
          We want to build and grow a successful, inclusive business that we can all be proud of.
        </p>
        <div className="split">
          <p className="body" data-reveal style={{ ["--i" as string]: 1 }}>
            We aim to remove barriers so that people with different experiences and from different backgrounds see
            us as somewhere they&rsquo;d love to work. We work closely with partners through education, and run
            regular events that encourage candidates to see a career in tech or finance as a viable option.
          </p>
          <div data-reveal style={{ ["--i" as string]: 2 }}>
            <p className="mono dim">Current partners</p>
            <ul className="partners display">
              {PARTNERS.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <NextPage current="/working-here/our-culture" />
    </main>
  );
}
