"use client";

import { useEffect, useRef } from "react";

/** Corner marks with live cursor coordinates and scroll position. */
export default function Frame() {
  const x = useRef<HTMLSpanElement>(null);
  const y = useRef<HTMLSpanElement>(null);
  const p = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (x.current) x.current.textContent = (e.clientX / window.innerWidth).toFixed(3);
      if (y.current) y.current.textContent = (1 - e.clientY / window.innerHeight).toFixed(3);
    };
    let raf = 0;
    const tick = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (p.current) p.current.textContent = (max > 0 ? window.scrollY / max : 0).toFixed(3);
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="frame mono" aria-hidden="true">
      <span className="corner tl">
        x <span ref={x}>0.000</span>
      </span>
      <span className="corner tr">
        y <span ref={y}>0.000</span>
      </span>
      <span className="corner bl">∫ f(x) dx</span>
      <span className="corner br">
        p <span ref={p}>0.000</span>
      </span>
      <i className="cross c1" />
      <i className="cross c2" />
      <i className="cross c3" />
      <i className="cross c4" />
    </div>
  );
}
