"use client";

import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { IntegralSurface } from "./IntegralSurface";
import { heroState } from "./state";

type Quality = { cell: [number, number]; segments: [number, number]; dpr: [number, number] };

function pickQuality(): Quality {
  const small = window.innerWidth < 760;
  return small
    ? { cell: [6, 9], segments: [260, 220], dpr: [1, 2] }
    : { cell: [8, 12], segments: [440, 360], dpr: [1, 1.5] };
}

function hasWebGL2() {
  try {
    return !!document.createElement("canvas").getContext("webgl2");
  } catch {
    return false;
  }
}

/** Fixed, full-screen WebGL layer behind all page content. */
export default function HeroCanvas() {
  const [quality, setQuality] = useState<Quality | null>(null);
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    setSupported(hasWebGL2());
    setQuality(pickQuality());

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const applyMotion = () => (heroState.reducedMotion = mq.matches);
    applyMotion();
    mq.addEventListener("change", applyMotion);

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      heroState.pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      heroState.pointer.y = -(e.clientY / window.innerHeight) * 2 + 1;
      heroState.pointer.active = true;
      heroState.pointer.lastMove = performance.now() / 1000;
    };
    const onLeave = () => (heroState.pointer.active = false);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);

    let resizeTimer = 0;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => setQuality(pickQuality()), 200);
    };
    window.addEventListener("resize", onResize);

    return () => {
      mq.removeEventListener("change", applyMotion);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  if (!supported) return <div className="hero-fallback" aria-hidden="true" />;
  if (!quality) return null;

  return (
    <div className="hero-canvas" aria-hidden="true">
      <Canvas
        dpr={quality.dpr}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
        camera={{ fov: 34, near: 0.1, far: 30, position: [0, 1.25, 3.4] }}
        frameloop="always"
      >
        <IntegralSurface cell={quality.cell} segments={quality.segments} />
      </Canvas>
    </div>
  );
}
