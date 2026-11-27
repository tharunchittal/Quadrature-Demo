import Button from "@/components/system/Button";
import CountUp from "@/components/system/CountUp";
import Footer from "@/components/system/Footer";
import SectionHead from "@/components/system/SectionHead";
import OfficeCard from "@/components/home/OfficeCard";
import ValueCard from "@/components/home/ValueCard";
import Scramble from "@/components/ui/Scramble";
import { OFFICES } from "@/content/offices";
import { VALUES } from "@/content/values";





const STACK = ["C++", "Python", "Rust"];

export default function Home() {
  return (
    <main id="top">
      {/* ACTS 1–2 · the curve draws, then the Riemann sum refines with scroll */}
      <section data-stage="riemann" className="stage stage-riemann" aria-labelledby="hero-title">
        <div className="sticky">
          <div className="hero-copy">
            <h1 id="hero-title" className="display hero-title lines">
              <span className="line">
                <span data-line style={{ ["--i" as string]: 0 }}>
                  We&rsquo;re building the ultimate
                </span>
              </span>
              <span className="line">
                <span data-line style={{ ["--i" as string]: 1 }}>
                  automated trading business
                </span>
              </span>
            </h1>
            <div className="hero-foot" data-rise style={{ ["--i" as string]: 2 }}>
              <p className="hero-sub">
                A systematic trading firm founded by programmers in 2010. London, Singapore, New York.
              </p>
              <div className="actions">
                <Button href="/careers/join-us">Come and join us</Button>
                <Button href="#what-we-do" variant="line">
                  What we do
                </Button>
              </div>
            </div>
          </div>

          <div className="stage-copy stage-copy-what" id="what-we-do">
            <div className="what-head">
              <p className="mono tag">§ 01 · What we do</p>
              <h2 className="display stage-title">Founded by programmers in 2010</h2>
            </div>
            <div className="what-body">
              <p className="body">
                We&rsquo;re a systematic trading firm made up of smart, collaborative people who are
                passionate about using technology to solve complex problems.
              </p>
              <p className="body">
                By combining cutting-edge technology with deep quantitative research, we build automated
                trading systems that generate consistent, significant returns on our proprietary capital.
              </p>
            </div>
          </div>

          <p className="scroll-cue mono">
            <span className="dim">Scroll to integrate</span> ↓
          </p>
        </div>
      </section>

      {/* ACT 3 · the area spreads into a surface */}
      <section data-stage="surface" className="stage stage-surface" id="vision" aria-labelledby="vision-title">
        <div className="sticky">
          <div className="stage-copy stage-copy-vision">
            <p className="mono tag">§ 02 · Our vision</p>
            <h2 id="vision-title" className="display stage-title">
              All asset classes. All horizons.
            </h2>
            <p className="body">
              At Quadrature, we envision a future where we trade all liquid, electronically tradeable asset
              classes across all horizons.
            </p>
            <p className="body">
              The technology we&rsquo;re building is based on modular components shared across as many of our
              trading strategies as possible to maximise impact.
            </p>
            <p className="body dim-serif">This is our vision, but it&rsquo;s not our purpose&hellip;</p>
          </div>
        </div>
      </section>

      {/* ACT 4 · the field sinks behind the content */}
      <div data-stage="background" className="content">
        <section className="section section-purpose" id="purpose" aria-labelledby="purpose-title">
          <SectionHead num="03" title="Purpose" note="Who we are" />
          <p id="purpose-title" className="statement" data-reveal>
            Our purpose is to Put People First and Innovate Together.
          </p>
          <div className="split">
            <p className="body" data-reveal style={{ ["--i" as string]: 1 }}>
              We originally started our business because we wanted to work on really interesting problems
              with people that we enjoyed spending time with.
            </p>
            <p className="body" data-reveal style={{ ["--i" as string]: 2 }}>
              We have worked hard to build an environment where evolution is constant, we&rsquo;re always
              moving forwards, people like working together and we all look out for one another. We&rsquo;re
              committed to slowly building and nourishing a strong culture that promotes learning, creativity,
              kindness, and mutual trust and respect. These beliefs are as true today as they were when we
              started.
            </p>
          </div>
        </section>

        <section className="section section-values" id="values" aria-labelledby="values-intro">
          <SectionHead num="04" title="Values" note="Four traits we keep alive" />
          <p id="values-intro" className="intro" data-reveal>
            Our values are the foundation upon which our business is built. They support our vision, shape our
            culture and reflect the personality of our people.
          </p>
          <ol className="values">
            {VALUES.map((v, i) => (
              <ValueCard key={v.name} index={i} {...v} />
            ))}
          </ol>
          <div className="section-more" data-reveal>
            <Button href="/about-us" variant="line">
              Vision, principles and values
            </Button>
          </div>
        </section>

        <section className="section section-tech" id="technology" aria-labelledby="tech-title">
          <SectionHead num="05" title="Technology" note="Our tech stack" />
          <div className="tech">
            <ul className="tech-stack display" aria-label="Languages we build in">
              {STACK.map((lang, i) => (
                <li key={lang} data-reveal style={{ ["--i" as string]: i }}>
                  {lang}
                </li>
              ))}
            </ul>
            <div className="tech-copy">
              <p id="tech-title" className="statement-sm" data-reveal>
                Tech isn&rsquo;t a department that supports the business. It is core to our business and sits
                front and centre of what we do.
              </p>
              <p className="body" data-reveal style={{ ["--i" as string]: 1 }}>
                Our technology teams collaborate closely with our research and operations teams to develop the
                software and infrastructure we need to promptly turn ideas into reality. Our trading is entirely
                automated and we look to bring automation to everything we do.
              </p>
              <p className="body" data-reveal style={{ ["--i" as string]: 2 }}>
                We have travelled from using Linux on a few machines we built ourselves, to scaling out to
                thousands of servers for research, simulation and testing, all coordinated by our own grid
                scheduling system. And we embrace open source software.
              </p>
              <div data-reveal style={{ ["--i" as string]: 3 }}>
                <Button href="/working-here/our-culture" variant="line">
                  Our culture
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="section section-offices" id="offices" data-stage="peaks" aria-labelledby="offices-intro">
          <SectionHead num="06" title="Offices" note="Where we are" />
          <p id="offices-intro" className="statement" data-reveal>
            Vibrant spaces in London, Singapore and New York, one close-knit organisation built on collaboration.
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
          <div className="section-more" data-reveal>
            <Button href="/working-here/our-offices" variant="line">
              Inside our offices
            </Button>
          </div>
        </section>

        <section className="section section-foundation" id="foundation" aria-labelledby="qcf-title">
          <SectionHead num="07" title="Foundation" note="Since 2019" />
          <div className="qcf">
            <p className="qcf-figure display" data-reveal>
              <CountUp to={1.7} decimals={1} prefix="$" suffix="bn+" duration={1600} />
            </p>
            <div className="qcf-copy">
              <p className="mono dim" data-reveal>
                Committed to partners since inception
              </p>
              <p id="qcf-title" className="statement-sm" data-reveal style={{ ["--i" as string]: 1 }}>
                Strengthening resilience for people and communities facing intersecting challenges.
              </p>
              <p className="body" data-reveal style={{ ["--i" as string]: 2 }}>
                Established in 2019 by Quadrature Capital Limited as an independent charitable foundation, QCF
                works across human security, poverty and inequality, and climate risk. Its focus is the United
                Kingdom and Europe, and Sub-Saharan Africa, alongside targeted global work where system-level
                change can influence outcomes across regions.
              </p>
              <div data-reveal style={{ ["--i" as string]: 3 }}>
                <Button href="https://www.qc.foundation/" variant="line" external>
                  Find out more at qc.foundation
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="section section-work" aria-labelledby="work-title">
          <Scramble as="h2" className="display work-title" text="Interesting problems. Kind, talented people." />
          <div className="work-row" data-reveal>
            <p className="body">
              We like to work with people who are collaborative, driven and want their work to have real
              impact. We care far more about curiosity, attitude and mindset than existing knowledge of our
              industry.
            </p>
            <Button href="/careers/join-us">Come and join us</Button>
          </div>
        </section>
      </div>

      {/* ACT 5 · everything collapses into the triangle */}
      <section data-stage="logo" className="close" id="join" aria-labelledby="join-title">
        <div className="close-inner">
          <p className="mono tag">§ 08 · Join us</p>
          <h2 id="join-title" className="display close-title">
            Join us on our journey
          </h2>
          <p className="body">
            There&rsquo;s so much more we&rsquo;ve imagined that we want to build, and we&rsquo;ve only just
            begun.
          </p>
          <div className="actions">
            <Button href="/careers/join-us">Come and join us</Button>
            <Button href="/contact" variant="line">
              Or get in touch
            </Button>
          </div>
        </div>
        <Footer />
      </section>
    </main>
  );
}
