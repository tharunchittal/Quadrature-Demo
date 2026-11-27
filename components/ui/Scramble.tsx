"use client";

import { createElement, useEffect, useRef, type ElementType } from "react";

type Props = {
  text: string;
  as?: ElementType;
  className?: string;
  /** ms each letter spends cycling through 0/1 before settling */
  duration?: number;
};

/**
 * Heading that resolves through binary when it scrolls into view.
 * Screen readers get the final text via aria-label; reduced motion shows it immediately.
 */
export default function Scramble({ text, as = "h2", className, duration = 420 }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let started = false;
    const chars = [...text];
    const stagger = Math.min(28, 900 / Math.max(1, chars.length));

    const run = () => {
      const t0 = performance.now();
      const frame = (now: number) => {
        const t = now - t0;
        let done = true;
        let out = "";
        chars.forEach((c, i) => {
          const settle = i * stagger + duration;
          if (c === " " || t >= settle) out += c;
          else {
            done = false;
            out += t < i * stagger ? " " : Math.random() < 0.5 ? "0" : "1";
          }
        });
        el.textContent = out;
        if (!done) raf = requestAnimationFrame(frame);
      };
      raf = requestAnimationFrame(frame);
    };

    el.textContent = chars.map((c) => (c === " " ? " " : " ")).join("");
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          started = true;
          run();
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      el.textContent = text;
    };
  }, [text, duration]);

  return createElement(as, { ref, className, "aria-label": text }, text);
}
