import type { ReactNode } from "react";
import PageHero from "./PageHero";
import NextPage from "./NextPage";

export type LegalSection = { title: string; body: ReactNode };

type Props = {
  path: string;
  title: string;
  lede: ReactNode;
  sections: LegalSection[];
  /** the authoritative page on quadrature.ai */
  source: string;
  sourceNote?: string;
  children?: ReactNode;
};

/** Plain text page: a contents column that stays put beside numbered sections, and the source of truth. */
export default function LegalPage({ path, title, lede, sections, source, sourceNote, children }: Props) {
  const slug = (t: string) => t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  return (
    <main data-scene="flat" className="page page-legal" id="content">
      <PageHero crumbs={[{ label: "Legal" }, { label: title }]} title={title} lede={lede} />

      <div className="legal">
        <aside className="legal-toc" aria-label="On this page" data-reveal>
          <p className="mono dim">On this page</p>
          <ol>
            {sections.map((s) => (
              <li key={s.title}>
                <a href={`#${slug(s.title)}`}>{s.title}</a>
              </li>
            ))}
          </ol>
          <div className="legal-source">
            <p className="mono dim">Authoritative version</p>
            <p className="body-sm">
              {sourceNote ??
                "This concept demo summarises the page. The text that applies is published by Quadrature."}
            </p>
            <a className="btn btn-line" href={source} target="_blank" rel="noreferrer">
              <span className="btn-label">Read on quadrature.ai</span>
              <span className="btn-arrow" aria-hidden="true">
                ↗
              </span>
            </a>
          </div>
        </aside>

        <div className="legal-body">
          {sections.map((s, i) => (
            <section key={s.title} id={slug(s.title)} className="legal-section" data-reveal>
              <h2 className="legal-h">
                <span className="mono dim">{String(i + 1).padStart(2, "0")}</span>
                {s.title}
              </h2>
              <div className="legal-text">{s.body}</div>
            </section>
          ))}
          {children}
        </div>
      </div>

      <NextPage current={path} />
    </main>
  );
}
