"use client";

import { useEffect, useRef } from "react";
import { INTEGRAL, barLevel, heroState, riemannSum, smooth } from "../hero/state";

const ACTS = ["RIEMANN SUM", "SURFACE", "FIELD", "OFFICES", "CLOSE"] as const;

/** Live mono readout of what the hero is computing. Real numbers, not decoration. */
export default function Readout() {
  const act = useRef<HTMLSpanElement>(null);
  const n = useRef<HTMLSpanElement>(null);
  const sum = useRef<HTMLSpanElement>(null);
  const err = useRef<HTMLSpanElement>(null);
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    let raf = 0;
    let last = "";
    const cache = new Map<number, number>();
    const tick = () => {
      const lvl = barLevel(smooth(0.08, 0.92, heroState.riemann));
      const count = lvl.mix < 0.5 ? lvl.n0 : lvl.n1;
      if (!cache.has(count)) cache.set(count, riemannSum(count));
      const s = cache.get(count)!;

      let a = 0;
      if (heroState.logo > 0.15) a = 4;
      else if (heroState.peaks > 0.5) a = 3;
      else if (heroState.background > 0.5) a = 2;
      else if (heroState.surface > 0.05) a = 1;

      if (root.current) {
        const show = heroState.scene ? 0 : 1 - heroState.background * 1.6;
        root.current.style.opacity = Math.max(0, Math.min(1, show)).toFixed(3);
      }

      const key = `${a}|${count}`;
      if (key !== last) {
        last = key;
        if (act.current) act.current.textContent = `ACT ${String(a + 1).padStart(2, "0")} · ${ACTS[a]}`;
        if (n.current) n.current.textContent = a === 0 ? String(count) : "∞";
        if (sum.current) sum.current.textContent = (a === 0 ? s : INTEGRAL).toFixed(6);
        if (err.current)
          err.current.textContent = a === 0 ? Math.abs(s - INTEGRAL).toExponential(2) : "0.00e+0";
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <aside ref={root} className="readout mono" aria-label="Integral readout">
      <div className="readout-row readout-act">
        <span ref={act}>ACT 01 · RIEMANN SUM</span>
      </div>
      <div className="readout-row">
        <span className="dim">f(x)</span>
        <span>0.42 + 0.18 sin(2.3x + 0.7) + 0.09 sin(5.7x − 1.1)</span>
      </div>
      <div className="readout-row">
        <span className="dim">n</span>
        <span ref={n}>8</span>
      </div>
      <div className="readout-row">
        <span className="dim">Σ f(xᵢ)Δx</span>
        <span ref={sum}>0.000000</span>
      </div>
      <div className="readout-row">
        <span className="dim">|Σ − ∫|</span>
        <span ref={err}>—</span>
      </div>
      <div className="readout-row">
        <span className="dim">∫ f(x) dx, [−1.2, 1.2]</span>
        <span>{INTEGRAL.toFixed(6)}</span>
      </div>
    </aside>
  );
}
