"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { clamp01, heroState, smooth } from "./hero/state";

/**
 * Smooth scrolling (Lenis) plus the bridge from the page to the hero timeline.
 *
 * Home: sections opt in with data-stage="riemann|surface|background|peaks|logo"; each stage element
 * also receives a --p custom property (0..1) for CSS-driven fades.
 *
 * Sub-pages: <main data-scene="surface|peaks|bars|logo|flat"> asks the canvas for a resting scene.
 * The scene shows at full strength under the page title and dims as the reader scrolls into the text.
 */
const SCENES: Record<string, Partial<Record<"riemann" | "surface" | "peaks" | "logo" | "flat", number>>> = {
  surface: { riemann: 1, surface: 1 },
  peaks: { riemann: 1, surface: 1, peaks: 1 },
  bars: { riemann: 1 },
  logo: { logo: 1 },
  flat: { flat: 1 },
};

export default function ScrollDriver() {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lenis = reduced ? null : new Lenis({ lerp: 0.1, wheelMultiplier: 0.9, anchors: { offset: 0 } });
    lenisRef.current = lenis;

    // Freeze scrolling while the full-screen menu is open.
    const menuWatch = new MutationObserver(() => {
      if (document.documentElement.classList.contains("menu-open")) lenis?.stop();
      else lenis?.start();
    });
    menuWatch.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    const q = (name: string) => document.querySelector<HTMLElement>(`[data-stage="${name}"]`);

    /** 0 when the element's top meets the viewport top, 1 when its bottom meets the viewport bottom. */
    const pinned = (el: HTMLElement | null, vh: number) => {
      if (!el) return 0;
      const r = el.getBoundingClientRect();
      return clamp01(-r.top / Math.max(1, r.height - vh));
    };
    /** 0 when the element's top meets the viewport bottom, 1 when it reaches the viewport top. */
    const entering = (el: HTMLElement | null, vh: number) => {
      if (!el) return 0;
      const r = el.getBoundingClientRect();
      return clamp01((vh - r.top) / vh);
    };

    let raf = 0;
    const tick = (time: number) => {
      lenis?.raf(time);
      const vh = window.innerHeight;

      const sceneName = document.querySelector<HTMLElement>("[data-scene]")?.dataset.scene ?? null;
      const scene = sceneName ? SCENES[sceneName] ?? {} : null;
      heroState.scene = sceneName;

      const riemann = q("riemann");
      const surface = q("surface");
      const background = q("background");
      const peaks = q("peaks");
      const logo = q("logo");

      heroState.riemann = Math.max(scene?.riemann ?? 0, pinned(riemann, vh));
      heroState.surface = Math.max(scene?.surface ?? 0, pinned(surface, vh));
      heroState.logo = Math.max(scene?.logo ?? 0, entering(logo, vh));
      heroState.flat = scene?.flat ?? 0;
      heroState.background = scene
        ? 0.3 + 0.7 * smooth(0.05, 0.7, window.scrollY / vh)
        : entering(background, vh);

      let peakWeight = scene?.peaks ?? 0;
      if (peaks) {
        const r = peaks.getBoundingClientRect();
        const center = r.top + r.height / 2;
        const d = Math.abs(center - vh / 2) / (vh * 0.5 + r.height / 2);
        peakWeight = Math.max(peakWeight, 1 - smooth(0.25, 0.95, d));
      }
      heroState.peaks = peakWeight;

      riemann?.style.setProperty("--p", heroState.riemann.toFixed(4));
      surface?.style.setProperty("--p", heroState.surface.toFixed(4));
      logo?.style.setProperty("--p", heroState.logo.toFixed(4));

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      menuWatch.disconnect();
      lenis?.destroy();
      lenisRef.current = null;
    };
  }, []);

  // New page: start at the top (or at the hash target), without a smooth glide.
  useEffect(() => {
    const lenis = lenisRef.current;
    const hash = window.location.hash;
    const target = hash ? document.querySelector<HTMLElement>(hash) : null;
    if (lenis) {
      lenis.resize();
      lenis.scrollTo(target ?? 0, { immediate: true, force: true });
    } else if (!target) {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
}
