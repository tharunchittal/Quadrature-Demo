import type { Metadata } from "next";
import SectionHead from "@/components/system/SectionHead";
import PageHero from "@/components/templates/PageHero";
import NextPage from "@/components/templates/NextPage";
import HiringSteps, { type Step } from "@/components/pages/HiringSteps";

export const metadata: Metadata = { title: "How we hire · Quadrature concept demo" };

const STEPS: Step[] = [
  {
    name: "Sending your CV",
    length: "Reply within 48 hours",
    body: [
      "When you apply, please send your CV along with a cover letter describing what kind of role and business you’re looking for in a bit more detail.",
      "We receive a high number of applications every week, but we aim to get back to people within 48 hours.",
    ],
  },
  {
    name: "Phone interview",
    length: "20 to 45 minutes",
    body: [
      "With a member of the Strategic Growth team or a member of the team recruiting the role. It will focus at a high level on your experience, your aspirations and your interest in Quadrature.",
      "For some roles there may be a few technical questions too.",
    ],
  },
  {
    name: "Onsite interviews",
    length: "Two or three rounds",
    body: [
      "Next we invite candidates to our office in London for a morning or afternoon of face to face interviews. You’ll meet 2-3 people from the team to work through technical or case study questions.",
      "You’ll work with your interviewer to solve these problems; they are there to guide and brainstorm with you, so don’t be afraid to ask questions and be receptive to hints. We won’t ask you to interview with us for weeks on end.",
    ],
  },
  {
    name: "Final interviews",
    length: "Ending with our CEO",
    body: [
      "If the first round of onsite interviews goes well, we will invite you back to meet a few more people, ending with Aidan, our CEO.",
      "There is nothing you need to prepare unless specifically asked to: just try to relax and be yourself. You’ll be meeting the leaders of our business, so try to bring some questions too.",
    ],
  },
];

const TIPS: [string, string][] = [
  ["Be prepared", "We’re not easy to find online, but you can research our industry and get a sense of what we do before you meet with us."],
  ["Think out loud", "We want to hear how you think, learn, problem solve and explore. Hearing what is spinning around your head is helpful."],
  ["Ask questions", "This is a two way street: we’re being interviewed too. We try to be as transparent as possible."],
  ["Be pragmatic", "Start small, build up, discuss the trade offs, ask clarifying questions, try and fail. You’ll get to a much better answer much faster."],
  ["Be concise", "Focus on the most important points, and circle back to the original question if you hear yourself going off topic."],
];

export default function HowWeHirePage() {
  return (
    <main data-scene="bars" className="page" id="content">
      <PageHero
        crumbs={[{ label: "Careers" }, { label: "How we hire" }]}
        title="How we hire"
        lede="Applying for a job can seem like a black hole, so here’s how we do things."
        aside={
          <p className="body">
            We don&rsquo;t have a set number of seats to fill. We hire in a considered and thoughtful way, and
            we&rsquo;re happy to fly people over for interviews and organise visas where they&rsquo;re needed.
          </p>
        }
      />

      <section className="section" aria-label="The four stages">
        <SectionHead num="01" title="Four stages" note="Face to face where we can" />
        <HiringSteps steps={STEPS} />
      </section>

      <section className="section" aria-labelledby="fit-lede">
        <SectionHead num="02" title="What we look for" note="Fit and potential" />
        <p id="fit-lede" className="statement" data-reveal>
          We look at potential: what a candidate might be able to do.
        </p>
        <div className="split">
          <p className="body" data-reveal style={{ ["--i" as string]: 1 }}>
            Cultural fit doesn&rsquo;t mean we want to hire people just like us. We&rsquo;re looking at how people
            think, behave and communicate, which helps us understand what that person might be like to work with.
            All we ask is that you be yourself, tell us what&rsquo;s important to you and ask what we&rsquo;re like.
          </p>
          <p className="body" data-reveal style={{ ["--i" as string]: 2 }}>
            Your knowledge and experience are very important, but they aren&rsquo;t the only things we&rsquo;re
            looking for. We look at your approach to learning, how you solve problems, how you think, what you ask
            and what you do when you&rsquo;re not sure.
          </p>
        </div>
      </section>

      <section className="section" aria-label="Interviewing tips">
        <SectionHead num="03" title="Interviewing tips" note="Five to remember" />
        <ol className="rows">
          {TIPS.map(([name, body], i) => (
            <li key={name} className="row" data-reveal style={{ ["--i" as string]: i }}>
              <span className="mono dim">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="display row-title">{name}</h3>
              <p className="body">{body}</p>
            </li>
          ))}
        </ol>
      </section>

      <NextPage current="/careers/how-we-hire" />
    </main>
  );
}
