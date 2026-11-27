import type { Metadata } from "next";
import SectionHead from "@/components/system/SectionHead";
import Button from "@/components/system/Button";
import PageHero from "@/components/templates/PageHero";
import NextPage from "@/components/templates/NextPage";

export const metadata: Metadata = { title: "Join us · Quadrature concept demo" };

const APPLY = "https://www.quadrature.ai/careers/join-us/";

export default function JoinPage() {
  return (
    <main data-scene="bars" className="page" id="content">
      <PageHero
        crumbs={[{ label: "Careers" }, { label: "Join us" }]}
        title="Join us"
        lede="People join us to do work that matters, with people they respect."
        aside={
          <div className="actions">
            <Button href="#apply">How to apply</Button>
            <Button href="/careers/how-we-hire" variant="line">
              How we hire
            </Button>
          </div>
        }
      />

      <section className="section" aria-labelledby="working-lede">
        <SectionHead num="01" title="Working with us" note="Not a cog in a machine" />
        <p id="working-lede" className="statement" data-reveal>
          The smartest person in the room isn&rsquo;t much use if they make the room worse.
        </p>
        <ul className="three">
          <li data-reveal>
            <h3 className="display three-title">See your impact</h3>
            <p className="body">
              We like to work with people who are collaborative, driven and want their work to have real impact. As
              a smaller business, you won&rsquo;t be a cog in a machine: you&rsquo;ll see the results of your
              decisions and be accountable for them. That&rsquo;s not for everyone, but for the right person
              it&rsquo;s deeply motivating.
            </p>
          </li>
          <li data-reveal style={{ ["--i" as string]: 1 }}>
            <h3 className="display three-title">Mindset over pedigree</h3>
            <p className="body">
              We attract exceptional people from the top of their fields, whether that&rsquo;s technology,
              academia, research or finance. We don&rsquo;t expect existing knowledge of our industry. We care far
              more about curiosity, attitude and mindset.
            </p>
          </li>
          <li data-reveal style={{ ["--i" as string]: 2 }}>
            <h3 className="display three-title">Your best work</h3>
            <p className="body">
              We&rsquo;re highly collaborative, genuinely diverse and serious about what we do. You&rsquo;ll be
              encouraged to experiment, challenge ideas and work across different projects and systems, alongside
              people who&rsquo;ll push you and support you in equal measure.
            </p>
          </li>
        </ul>
      </section>

      <section className="section" id="apply" aria-labelledby="apply-lede">
        <SectionHead num="02" title="We’re hiring" note="Always" />
        <p id="apply-lede" className="intro" data-reveal>
          We don&rsquo;t list specific roles. We grow thoughtfully, so that we can shape and protect the culture
          we&rsquo;ve worked so hard to build, and we&rsquo;re always looking for talented people.
        </p>
        <div className="routes">
          <article className="route" data-reveal>
            <p className="mono dim">Open all year</p>
            <h3 className="display route-title">Full time roles</h3>
            <p className="body">
              Send your CV with a note on what kind of work you&rsquo;d like to do and the area you&rsquo;d like to
              work in. It helps us direct you to the right person.
            </p>
            <Button href={APPLY} external>
              Apply on quadrature.ai
            </Button>
          </article>
          <article className="route" data-reveal style={{ ["--i" as string]: 1 }}>
            <p className="mono dim">Applications September to December</p>
            <h3 className="display route-title">Internships</h3>
            <p className="body">
              Eleven-week paid summer internships in London and New York, for undergraduate and postgraduate
              students.
            </p>
            <Button href="/careers/internships" variant="line">
              About internships
            </Button>
          </article>
        </div>
      </section>

      <section className="section" aria-labelledby="belong-lede">
        <SectionHead num="03" title="Belonging" note="Inclusion and belonging" />
        <div className="split">
          <p id="belong-lede" className="body" data-reveal>
            We aim to remove barriers so that people with different experiences and from different backgrounds see
            us as somewhere they&rsquo;d love to work, through education, events, charity partnerships and focused
            recruitment.
          </p>
          <p className="body" data-reveal style={{ ["--i" as string]: 1 }}>
            Our current partners include Teach First, The Access Project, Stemettes and St Giles Trust. Feel free to
            get in touch should you wish to use our office space to host a student or professional event.
          </p>
        </div>
      </section>

      <NextPage current="/careers/join-us" />
    </main>
  );
}
