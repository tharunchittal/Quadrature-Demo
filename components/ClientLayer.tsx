"use client";

import dynamic from "next/dynamic";

const HeroCanvas = dynamic(() => import("./hero/HeroCanvas"), { ssr: false });

/** Client-only layers: the persistent WebGL canvas. */
export default function ClientLayer() {
  return <HeroCanvas />;
}
