"use client";

import { useEffect, useState } from "react";
import Triangle from "./Triangle";

const CITIES = [
  { code: "LDN", tz: "Europe/London" },
  { code: "SGP", tz: "Asia/Singapore" },
  { code: "NYC", tz: "America/New_York" },
] as const;

const LINKS = [
  ["01", "What we do", "#what-we-do"],
  ["02", "Vision", "#vision"],
  ["03", "Purpose", "#purpose"],
  ["04", "Values", "#values"],
  ["05", "Technology", "#technology"],
  ["06", "Offices", "#offices"],
  ["07", "Foundation", "#foundation"],
  ["08", "Join us", "#join"],
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

      <nav id="site-menu" className={`menu ${open ? "is-open" : ""}`} aria-hidden={!open}>
        <ol>
          {LINKS.map(([num, label, href]) => (
            <li key={href}>
              <a href={href} onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>
                <span className="mono dim">{num}</span>
                <span className="menu-label">{label}</span>
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
