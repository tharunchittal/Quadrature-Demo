import Scramble from "@/components/ui/Scramble";
import Triangle from "@/components/ui/Triangle";
import CityTime from "@/components/ui/CityTime";

const VALUES = [
  {
    name: "Entrepreneurial",
    is: "We take ownership of outcomes at every step and show real grit in getting things done. Incremental improvement is critical to achieving long term results.",
    not: "Being a lone wolf or prioritising your own success.",
  },
  {
    name: "Collaborative",
    is: "We're one global team working towards the same goals, not lots of teams working independently. We share thinking early enough for others to weigh in.",
    not: "Consensus, trying to make everyone happy, or being agreeable in the moment, only to disagree later.",
  },
  {
    name: "Kind",
    is: "We're conscientious and treat each other well. We're also truthful and say the hard thing that needs to be said — this helps others and makes the work better.",
    not: "Being artificially nice and agreeable, or mistaking conflict avoidance for harmony.",
  },
  {
    name: "Humble",
    is: "We embrace the position of learner and are curious about things we don't yet understand.",
    not: "Being overly deferential, or weak when there's something to contribute.",
  },
];

const OFFICES = [
  { city: "London", code: "LDN", tz: "Europe/London", coord: "51.5074° N, 0.1278° W" },
  { city: "Singapore", code: "SGP", tz: "Asia/Singapore", coord: "1.3521° N, 103.8198° E" },
  { city: "New York", code: "NYC", tz: "America/New_York", coord: "40.7128° N, 74.0060° W" },
];

function SectionHead({ num, title }: { num: string; title: string }) {
  return (
    <div className="section-head">
      <span className="mono dim">SEC-{num}</span>
      <span className="section-num">{num}</span>
      <Scramble as="h2" className="section-title display" text={title} />
    </div>
  );
}

export default function Home() {
  return (
    <main id="top">
      {/* ACTS 1–2: idle curve, then the Riemann sum refines as you scroll */}
      <section data-stage="riemann" className="stage stage-riemann" id="what-we-do" aria-labelledby="hero-title">
        <div className="sticky">
          <div className="hero-copy">
            <p className="mono tag">QUADRATURE CAPITAL · SYSTEMATIC TRADING · EST. 2010</p>
            <h1 id="hero-title" className="display hero-title">
              We&rsquo;re building the ultimate automated trading business
            </h1>
          </div>

          <div className="stage-copy stage-copy-what" id="content">
            <p className="mono tag">§ 01 / WHAT WE DO</p>
            <h2 className="display stage-title">Founded by programmers in 2010</h2>
            <p className="body">
              We&rsquo;re a systematic trading firm made up of smart, collaborative people who are passionate
              about using technology to solve complex problems.
            </p>
            <p className="body">
              By combining cutting-edge technology with deep quantitative research, we build automated trading
              systems that generate consistent, significant returns on our proprietary capital.
            </p>
          </div>

          <p className="scroll-cue mono">
            <span className="dim">SCROLL TO INTEGRATE</span> ↓
          </p>
        </div>
      </section>

      {/* ACT 3: the area spreads into a surface */}
      <section data-stage="surface" className="stage stage-surface" id="vision" aria-labelledby="vision-title">
        <div className="sticky">
          <div className="stage-copy stage-copy-vision">
            <p className="mono tag">§ 02 / OUR VISION</p>
            <h2 id="vision-title" className="display stage-title">
              All liquid, electronically tradeable asset classes. All horizons.
            </h2>
            <p className="body">
              At Quadrature, we envision a future where we trade all liquid, electronically tradeable asset
              classes across all horizons.
            </p>
            <p className="body dim-serif">This is our vision, but it&rsquo;s not our purpose…</p>
          </div>
        </div>
      </section>

      {/* ACT 4: the field sinks behind the content */}
      <div data-stage="background" className="content">
        <section className="section" id="purpose">
          <SectionHead num="03" title="Purpose" />
          <p className="lede">
            Our purpose is to <em>Put People First</em> and <em>Innovate Together</em>.
          </p>
          <div className="cols">
            <span className="mono label">WHO WE ARE</span>
            <div>
              <p className="body">
                We originally started our business because we wanted to work on really interesting problems with
                people that we enjoyed spending time with.
              </p>
              <p className="body">
                We have worked hard to build an environment where evolution is constant, we&rsquo;re always moving
                forwards, people like working together and we all look out for one another. We&rsquo;re committed
                to slowly building and nourishing a strong culture that promotes learning, creativity, kindness,
                and mutual trust and respect.
              </p>
            </div>
          </div>
        </section>

        <section className="section" id="values">
          <SectionHead num="04" title="Values" />
          <ol className="values">
            {VALUES.map((v, i) => (
              <li key={v.name} className="value" tabIndex={0}>
                <span className="mono dim">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="display value-name">{v.name}</h3>
                <p className="body-sm">{v.is}</p>
                <p className="value-not mono">
                  <span>≠</span> {v.not}
                </p>
              </li>
            ))}
          </ol>
        </section>

        <section className="section" id="technology">
          <SectionHead num="05" title="Technology" />
          <p className="lede">Tech isn&rsquo;t a department that supports the business — it sits front and centre.</p>
          <div className="cols">
            <span className="mono label">OUR STACK</span>
            <div>
              <p className="body">
                Our trading is entirely automated and we look to bring automation to everything we do. We travelled
                from using Linux on a few machines we built ourselves to scaling out to thousands of servers for
                research and simulation.
              </p>
              <ul className="stack mono">
                <li>C++</li>
                <li>Python</li>
                <li>Rust</li>
                <li>Open source</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="section" id="offices" data-stage="peaks">
          <SectionHead num="06" title="Offices" />
          <p className="lede">
            Three vibrant spaces, one close-knit organisation built on collaboration.
          </p>
          <ul className="offices">
            {OFFICES.map((o) => (
              <li key={o.city} className="office">
                <span className="mono dim">{o.code}</span>
                <h3 className="display office-name">{o.city}</h3>
                <span className="mono">
                  <CityTime tz={o.tz} />
                </span>
                <span className="mono dim">{o.coord}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="section" id="foundation">
          <SectionHead num="07" title="Foundation" />
          <div className="cols">
            <span className="mono label">QCF · EST. 2019</span>
            <div>
              <p className="figure display">$1.7bn+</p>
              <p className="mono dim">COMMITTED TO PARTNERS SINCE INCEPTION</p>
              <p className="body">
                Quadrature Charitable Foundation works on strengthening resilience for people and communities facing
                intersecting challenges across human security, poverty and inequality, and climate risk.
              </p>
              <a className="btn mono" href="https://www.qc.foundation/" target="_blank" rel="noreferrer">
                QC.FOUNDATION ↗
              </a>
            </div>
          </div>
        </section>
      </div>

      {/* ACT 5: the surface collapses into the triangle */}
      <section data-stage="logo" className="close" id="join" aria-labelledby="join-title">
        <div className="close-inner">
          <p className="mono tag">§ 08 / JOIN US</p>
          <Scramble as="h2" className="display close-title" text="Join us on our journey" />
          <p className="body">
            There&rsquo;s so much more we&rsquo;ve imagined that we want to build, and we&rsquo;ve only just begun.
          </p>
          <div className="close-actions">
            <a className="btn mono" href="#join">COME AND JOIN US</a>
            <a className="btn btn-quiet mono" href="#join">OR GET IN TOUCH</a>
          </div>
        </div>

        <footer className="footer mono">
          <span className="footer-mark">
            <Triangle size={14} /> QUADRATURE
          </span>
          <span className="dim">
            Concept demo, not affiliated with Quadrature Capital. Copy adapted from quadrature.ai.
          </span>
          <span className="dim">PROTOTYPE · PHASE 1</span>
        </footer>
      </section>
    </main>
  );
}
