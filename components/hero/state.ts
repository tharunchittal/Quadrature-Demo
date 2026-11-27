/**
 * Shared, mutable state read by the WebGL frame loop.
 * Written by the scroll driver and pointer listeners; never triggers React renders.
 */
export const heroState = {
  /** 0..1 progress through the Riemann-sum section */
  riemann: 0,
  /** 0..1 progress through the surface section */
  surface: 0,
  /** 0..1 how far the page has moved past the hero acts (dims the field) */
  background: 0,
  /** 0..1 bell-shaped weight while the offices section is in view */
  peaks: 0,
  /** 0..1 progress through the closing section */
  logo: 0,
  /** pointer in normalised device coords (-1..1) */
  pointer: { x: 0, y: 0, active: false, lastMove: 0 },
  /** set when the user prefers reduced motion */
  reducedMotion: false,
};

export type HeroState = typeof heroState;

/** The four Riemann refinements shown while scrolling. */
export const BAR_LEVELS = [8, 32, 128, 512] as const;

/** Integration interval [a, b] in surface units. */
export const INTERVAL = { a: -1.2, b: 1.2 } as const;

/** Vertical scale applied to f(x) in the scene. */
export const HEIGHT = 0.9;

/**
 * The curve being integrated. Must match `f()` in the vertex shader.
 * Returns a value in roughly 0.15..0.75.
 */
export function f(x: number): number {
  return 0.42 + 0.18 * Math.sin(2.3 * x + 0.7) + 0.09 * Math.sin(5.7 * x - 1.1);
}

/** Midpoint Riemann sum of f over [a, b] with n bars. */
export function riemannSum(n: number): number {
  const { a, b } = INTERVAL;
  const w = (b - a) / n;
  let s = 0;
  for (let i = 0; i < n; i++) s += f(a + (i + 0.5) * w);
  return s * w;
}

/** Reference value of the integral (very fine midpoint sum). */
export const INTEGRAL = riemannSum(20000);

export const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
export const smooth = (e0: number, e1: number, v: number) => {
  const t = clamp01((v - e0) / (e1 - e0));
  return t * t * (3 - 2 * t);
};

/** Current Riemann level as (n0, n1, mix) from riemann progress. */
export function barLevel(p: number) {
  const span = BAR_LEVELS.length - 1;
  const t = clamp01(p) * span;
  const i = Math.min(span - 1, Math.floor(t));
  const local = t - i;
  return {
    n0: BAR_LEVELS[i],
    n1: BAR_LEVELS[i + 1],
    mix: smooth(0.25, 0.75, local),
  };
}
