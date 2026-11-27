"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { clamp01, heroState, smooth } from "./hero/state";

/**
 * Smooth scrolling (Lenis) plus the bridge from page sections to the hero timeline.
 * Sections opt in with data-stage="riemann|surface|background|peaks|logo".
 * Each stage element also receives a --p custom property (0..1) for CSS-driven fades.
 */
export default function ScrollDriver() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lenis = reduced ? null : new Lenis({ lerp: 0.1, wheelMultiplier: 0.9, anchors: { offset: 0 } });

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

      const riemann = q("riemann");
      const surface = q("surface");
      const background = q("background");
      const peaks = q("peaks");
      const logo = q("logo");

      heroState.riemann = pinned(riemann, vh);
      heroState.surface = pinned(surface, vh);
      heroState.background = entering(background, vh);
      heroState.logo = entering(logo, vh);

      if (peaks) {
        const r = peaks.getBoundingClientRect();
        const center = r.top + r.height / 2;
        const d = Math.abs(center - vh / 2) / (vh * 0.5 + r.height / 2);
        heroState.peaks = 1 - smooth(0.25, 0.95, d);
      }

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
    };
  }, []);

  return null;
}
