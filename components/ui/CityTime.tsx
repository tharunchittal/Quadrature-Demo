"use client";

import { useEffect, useState } from "react";

/** Live local time (HH:MM:SS) for an IANA time zone. */
export default function CityTime({ tz }: { tz: string }) {
  const [t, setT] = useState("--:--:--");
  useEffect(() => {
    const tick = () =>
      setT(new Date().toLocaleTimeString("en-GB", { timeZone: tz, hour12: false }));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [tz]);
  return <>{t}</>;
}
