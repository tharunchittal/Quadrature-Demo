"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";

/**
 * Between pages a field of 0s and 1s covers the screen and wipes off to the right.
 * The WebGL canvas underneath persists, so the scene morphs while the wipe passes.
 */
export default function PageTransition() {
  const pathname = usePathname();
  const first = useRef(true);
  const [run, setRun] = useState(0);

  const field = useMemo(() => {
    // Deterministic so server and client agree; the wipe only shows after navigation anyway.
    let seed = 7;
    const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
    return Array.from({ length: 64 }, () =>
      Array.from({ length: 220 }, () => (rnd() < 0.5 ? "0" : "1")).join(""),
    ).join("\n");
  }, []);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setRun((r) => r + 1);
  }, [pathname]);

  if (!run) return null;
  return (
    <div key={run} className="wipe" aria-hidden="true">
      <pre className="wipe-field">{field}</pre>
    </div>
  );
}
