"use client";

import { useEffect, useState } from "react";
import Triangle from "./Triangle";
import { HOME_SECTIONS, SITE } from "@/components/system/site";

const CITIES = [
  { code: "LDN", tz: "Europe/London" },
  { code: "SGP", tz: "Asia/Singapore" },
  { code: "NYC", tz: "America/New_York" },
] as const;



function useClock() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return now;
}

const fmt = (d: Date, tz: string) =>
  d.toLocaleTimeString("en-GB", { timeZone: tz, hour: "2-digit", minute: "2-digit", hour12: false });

/** Floating navigation bar: mark, three city clocks, menu. */
export default function Nav() {
  const now = useClock();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("menu-open", open);
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header className="nav mono">
        <a className="nav-mark" href="#top" aria-label="Quadrature, back to top">
          <Triangle size={16} />
          <span>QUADRATURE</span>
        </a>
        <span className="nav-clock" aria-label="Office times">
          {CITIES.map((c) => (
            <span key={c.code}>
              <span className="dim">{c.code}</span> {now ? fmt(now, c.tz) : "--:--"}
            </span>
          ))}
        </span>
        <button
          className="nav-menu"
          aria-expanded={open}
          aria-controls="site-menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? "CLOSE" : "MENU"}
        </button>
      </header>

      <nav id="site-menu" className={`menu ${open ? "is-open" : ""}`} aria-hidden={!open} aria-label="Menu">
        <div className="menu-grid">
          <ol className="menu-main">
            {HOME_SECTIONS.map(([num, label, href], i) => (
              <li key={href} style={{ ["--i" as string]: i }}>
                <a href={href} onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>
                  <span className="mono dim">{num}</span>
                  <span className="menu-label">{label}</span>
                </a>
              </li>
            ))}
          </ol>
          <div className="menu-site">
            {SITE.map((g) => (
              <div key={g.title}>
                <p className="mono dim">{g.title}</p>
                <ul>
                  {g.items.map((it) => (
                    <li key={it.label}>
                      {it.href ? (
                        <a href={it.href} target="_blank" rel="noreferrer" tabIndex={open ? 0 : -1}>
                          {it.label} ↗
                        </a>
                      ) : (
                        <span className="soon">{it.label}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <p className="mono dim menu-note">Greyed pages arrive in phase 3.</p>
          </div>
        </div>
      </nav>
    </>
  );
}
