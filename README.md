# Quadrature — concept demo

A private concept redesign of quadrature.ai. **Not affiliated with Quadrature Capital.** All pages are `noindex`.

All three phases are built: the Integral Surface hero, the design system and home page, and every other page of quadrature.ai (18 routes).

## Pages

| Route | Template | Canvas scene |
| --- | --- | --- |
| `/` | Home | Five scroll-driven acts |
| `/about-us` | Content | Surface |
| `/working-here/our-culture` | Content | Surface |
| `/working-here/our-offices` | Content | Peaks |
| `/working-here/our-offices/[london, singapore, new-york]` | Office | Peaks |
| `/working-here/our-benefits` | Content, with a filterable benefits table | Surface |
| `/careers/join-us` · `/careers/internships` | Content | Bars (the integral) |
| `/careers/how-we-hire` | Content, with a four-stage stepper | Bars |
| `/contact` | Content | Triangle |
| `/corporate-social-responsibility` · `/data-vendors` · `/scam-warning` · `/regulatory-disclosures` · `/legal/cookies-policy` · `/legal/terms-and-conditions` | Legal | Flat |

Sub-pages ask for a resting scene with `<main data-scene="…">`. The canvas lives in the root layout, so on client navigation the scene morphs while a field of digits wipes across the screen. Legal and CSR pages summarise Quadrature's text and link to the authoritative version on quadrature.ai. The demo publishes no contact email addresses and has no live forms.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
```

Production build: `npm run build && npm start`.

## The hero: Integral Surface

One fixed WebGL canvas sits behind every section. Scroll drives five acts:

| Act | Where | What happens |
| --- | --- | --- |
| 1 Idle | page load | A curve of `1`s draws itself; 8 bars of `0`s rise under it |
| 2 Riemann sum | `#what-we-do` | Bars refine 8 → 32 → 128 → 512; the readout shows the real Σ and its error |
| 3 Surface | `#vision` | The area spreads into a volatility-style surface plotted as mesh lines |
| 4 Field | content sections | The surface sinks to ~28% brightness; three peaks rise for `#offices` |
| 5 Close | `#join` | Everything collapses into the triangle mark |

The pointer dents the surface with a soft ripple. With `prefers-reduced-motion` the scene is static, with no flicker or smooth scroll.

### How it is drawn

1. **Surface pass**: a subdivided plane whose vertex shader blends bars → surface → peaks → wedge from a handful of uniforms (`components/hero/shaders.ts`). It renders into a **low-resolution target with one texel per glyph cell**: R = brightness, G = steepness, B = curve.
2. **Glyph pass**: a full-screen shader draws a `0` or `1` per cell from a two-glyph atlas drawn in JetBrains Mono. Bright cells show `1`, mid cells `0`; steep cells flip bits faster.

Because the scene renders at cell resolution (about 180×75 texels on a laptop), the cost is tiny regardless of screen size.

### Files

- `components/hero/state.ts`: shared state, `f(x)`, the Riemann maths
- `components/hero/shaders.ts`: GLSL for both passes
- `components/hero/IntegralSurface.tsx`: scene, camera choreography, render loop
- `components/hero/HeroCanvas.tsx`: canvas, quality tiers, pointer, WebGL2 fallback
- `components/ScrollDriver.tsx`: Lenis plus section progress → hero state
- `components/ui/*`: nav, frame, readout, binary text scramble

Debug: append `?debug=scene` to see the raw surface pass without glyphs.

## Design doc

Decisions (monochrome, free fonts, no photos, simple triangle mark, Foundation as an external link, private hosting) live in the design doc.
