import Triangle from "@/components/ui/Triangle";
import { SITE } from "./site";

/** The name returns at full width; the site index and the demo disclaimer sit underneath. */
export default function Footer() {
  return (
    <footer className="footer">
      <p className="footer-word display" aria-label="Quadrature">
        <Triangle size={64} />
        <span>Quadrature</span>
      </p>

      <nav className="footer-index" aria-label="Site index">
        {SITE.map((group) => (
          <div key={group.title}>
            <p className="mono dim">{group.title}</p>
            <ul>
              {group.items.map((item) => (
                <li key={item.label}>
                  {item.href ? (
                    <a href={item.href} {...(item.external ? { target: "_blank", rel: "noreferrer" } : {})}>
                      {item.label}
                      {item.external ? " ↗" : ""}
                    </a>
                  ) : (
                    <span className="soon" title="Built in phase 3">
                      {item.label}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      <div className="footer-base mono">
        <span>Concept demo, not affiliated with Quadrature Capital. Copy adapted from quadrature.ai.</span>
        <span className="dim">Private prototype · noindex</span>
      </div>
    </footer>
  );
}
