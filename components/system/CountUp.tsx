"use client";

import { useEffect, useRef } from "react";

type Props = {
  to: number;
  from?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  /** group thousands (off for years) */
  group?: boolean;
  className?: string;
};

/** A figure that counts up once when it scrolls into view. Renders the final value without script. */
export default function CountUp({
  to,
  from = 0,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 1400,
  group = true,
  className,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const fmt = (v: number) =>
    prefix +
    v.toLocaleString("en-GB", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
      useGrouping: group,
    }) +
    suffix;

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    el.textContent = fmt(from);
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - t0) / duration);
          const eased = 1 - Math.pow(1 - t, 4);
          el.textContent = fmt(from + (to - from) * eased);
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      el.textContent = fmt(to);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [to, from, decimals, prefix, suffix, duration, group]);

  return (
    <span ref={ref} className={className} aria-label={fmt(to)}>
      {fmt(to)}
    </span>
  );
}
