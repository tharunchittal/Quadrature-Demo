import Link from "next/link";
import type { ReactNode } from "react";

type Crumb = { label: string; href?: string };
type Props = {
  crumbs: Crumb[];
  title: string;
  lede?: ReactNode;
  aside?: ReactNode;
};

/** Sub-page opening: the scene shows above, the title sits low, the lede and an aside share the foot. */
export default function PageHero({ crumbs, title, lede, aside }: Props) {
  return (
    <header className="page-hero">
      <nav className="crumbs mono" aria-label="Breadcrumb" data-rise style={{ ["--i" as string]: 0 }}>
        <Link href="/">Home</Link>
        {crumbs.map((c) => (
          <span key={c.label}>
            <span className="dim" aria-hidden="true">
              {" / "}
            </span>
            {c.href ? <Link href={c.href}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}
          </span>
        ))}
      </nav>
      <h1 className="display page-title lines">
        <span className="line">
          <span data-line style={{ ["--i" as string]: 0 }}>
            {title}
          </span>
        </span>
      </h1>
      {(lede || aside) && (
        <div className="page-hero-foot" data-rise style={{ ["--i" as string]: 2 }}>
          {lede && <p className="page-lede">{lede}</p>}
          {aside && <div className="page-aside">{aside}</div>}
        </div>
      )}
    </header>
  );
}
