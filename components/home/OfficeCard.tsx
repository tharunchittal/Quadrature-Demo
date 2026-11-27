"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Props = { index: number; city: string; code: string; tz: string; lat: string; lon: string; href?: string };

function localParts(tz: string) {
  const d = new Date();
  const time = d.toLocaleTimeString("en-GB", { timeZone: tz, hour12: false });
  const hour = Number(d.toLocaleString("en-GB", { timeZone: tz, hour: "2-digit", hour12: false }));
  const day = d.toLocaleString("en-GB", { timeZone: tz, weekday: "short" });
  return { time, hour, day };
}

/** City, live local time, and whether it is working hours there right now. */
export default function OfficeCard({ index, city, code, tz, lat, lon, href }: Props) {
  const [now, setNow] = useState<ReturnType<typeof localParts> | null>(null);

  useEffect(() => {
    const tick = () => setNow(localParts(tz));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [tz]);

  const weekend = now ? ["Sat", "Sun"].includes(now.day) : false;
  const open = now ? !weekend && now.hour >= 8 && now.hour < 19 : false;

  return (
    <li className="office" data-reveal style={{ ["--i" as string]: index }}>
      <div className="office-top mono">
        <span className="dim">{code}</span>
        <span className={`office-status ${open ? "is-open" : ""}`}>
          <i aria-hidden="true" /> {now ? (open ? "Working hours" : "After hours") : "—"}
        </span>
      </div>
      <h3 className="display office-name">
        {href ? (
          <Link href={href} className="office-link">
            {city} <span aria-hidden="true">→</span>
          </Link>
        ) : (
          city
        )}
      </h3>
      <p className="office-time" aria-live="off">
        {now ? now.time : "--:--:--"}
        <span className="mono dim"> {now?.day ?? ""} · local</span>
      </p>
      <p className="mono dim office-coord">
        {lat} · {lon}
      </p>
    </li>
  );
}
