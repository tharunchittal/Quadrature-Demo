/**
 * GLSL for the Integral Surface.
 *
 * Pass 1 (surface + curve) renders into a low-resolution target, one texel per glyph cell:
 *   R = luminance, G = activity (steepness, drives bit flipping), B = curve flag.
 * Pass 2 (glyph pass) draws a `0` or `1` per cell from a two-glyph atlas.
 */

const common = /* glsl */ `
  float f(float x) {
    return 0.42 + 0.18 * sin(2.3 * x + 0.7) + 0.09 * sin(5.7 * x - 1.1);
  }
`;

export const surfaceVertex = /* glsl */ `
  uniform float uTime;
  uniform float uRise;      // 0..1 bars growing out of the floor
  uniform float uN0;        // current bar count
  uniform float uN1;        // next bar count
  uniform float uNMix;      // blend between the two
  uniform float uSurface;   // 0..1 slab -> 2D surface
  uniform float uPeaks;     // 0..1 three office peaks
  uniform float uLogo;      // 0..1 collapse into the triangle
  uniform float uFlatten;   // 0..1 calm the surface behind text
  uniform vec2  uPointer;   // pointer on the floor plane (x, z)
  uniform float uDent;      // 0..1 pointer influence
  uniform float uA;
  uniform float uB;
  uniform float uHeight;

  varying vec3 vWorld;
  varying float vH;
  varying float vDepth;
  varying vec2 vPlane;

  ${common}

  float bars(float x, float n) {
    float w = (uB - uA) / n;
    float k = (x - uA) / w;
    float mid = uA + (floor(k) + 0.5) * w;
    float gap = 0.14 * clamp((72.0 - n) / 64.0, 0.0, 1.0);
    float fr = fract(k);
    float inBar = step(gap * 0.5, fr) * step(fr, 1.0 - gap * 0.5);
    return f(mid) * inBar;
  }

  // A volatility-surface-like terrain: a smile across strike (x) that flattens with maturity (z).
  float terrain(float x, float z, float t) {
    float k = x / 1.45;
    float T = clamp((1.05 - z) / 2.1, 0.0, 1.0);
    float smile = 0.62 * k * k * (1.0 - 0.6 * T) - 0.14 * k * (1.0 - T);
    float base = 0.2 + 0.12 * T;
    float waves = 0.035 * sin(2.4 * x + 1.7 * z + t * 0.35)
                + 0.02 * sin(4.3 * z - 3.1 * x - t * 0.45);
    float foot = (1.0 - smoothstep(1.3, 1.6, abs(x))) * (1.0 - smoothstep(0.85, 1.12, abs(z)));
    return (base + smile + waves) * foot;
  }

  float peaks(float x, float z) {
    float p = 0.0;
    p += 0.95 * exp(-((x + 1.0) * (x + 1.0) + (z - 0.15) * (z - 0.15)) / 0.09); // London
    p += 0.80 * exp(-((x - 0.05) * (x - 0.05) + (z + 0.35) * (z + 0.35)) / 0.07); // Singapore
    p += 0.88 * exp(-((x - 1.05) * (x - 1.05) + (z - 0.25) * (z - 0.25)) / 0.08); // New York
    return p;
  }

  float wedge(float x, float z) {
    // Right-triangle profile: area under a straight line, extruded in depth.
    float x0 = -0.95, x1 = 0.95;
    float inX = step(x0, x) * step(x, x1);
    float inZ = 1.0 - smoothstep(0.32, 0.34, abs(z));
    return inX * inZ * (x - x0) / (x1 - x0) * 1.25;
  }

  void main() {
    vec3 p = position;          // plane in XY, rotated so Z becomes depth
    float x = p.x;
    float z = -p.y;
    float t = uTime;

    // Act 2: Riemann bars inside a thin slab under the curve.
    float inInterval = step(uA, x) * step(x, uB);
    float slab = 1.0 - smoothstep(0.2, 0.215, abs(z));
    float hb = mix(bars(x, uN0), bars(x, uN1), uNMix) * inInterval * slab * uRise;

    // Act 3: the slab spreads into a 2D surface.
    float s = uSurface;
    float width = mix(0.215, 1.2, s);
    float spread = 1.0 - smoothstep(width - 0.08, width, abs(z));
    float xEdge = mix(0.0, 1.0, s);
    float inWide = mix(inInterval, 1.0, xEdge);
    float shape = mix(f(x), terrain(x, z, t), smoothstep(0.0, 1.0, s));
    float hs = shape * spread * inWide;
    float h = mix(hb, hs, smoothstep(0.0, 0.35, s));

    // Act 4: calmer behind long text, three peaks for the offices.
    h = mix(h, h * 0.55 + 0.05, uFlatten);
    h = mix(h, peaks(x, z) * 0.95 + terrain(x, z, t) * 0.18, uPeaks);

    // Act 5: collapse into the triangle mark.
    h = mix(h, wedge(x, z), uLogo);

    // Pointer dent with a soft ripple.
    vec2 d2 = vec2(x, z) - uPointer;
    float d = length(d2);
    float dent = exp(-d * d / 0.05);
    float ripple = sin(d * 26.0 - t * 5.0) * exp(-d * 2.6) * 0.035;
    h += uDent * (ripple - dent * 0.16) * (h > 0.01 ? 1.0 : 0.25);

    h = max(h, 0.0) * uHeight;
    p.z = h;
    vPlane = vec2(x, z);
    vH = h;

    vec4 world = modelMatrix * vec4(p, 1.0);
    vWorld = world.xyz;
    vec4 mv = viewMatrix * world;
    vDepth = -mv.z;
    gl_Position = projectionMatrix * mv;
  }
`;

export const surfaceFragment = /* glsl */ `
  uniform float uHeight;
  uniform float uGrid;
  uniform float uMesh;
  uniform float uBarDim;
  varying vec3 vWorld;
  varying float vH;
  varying float vDepth;
  varying vec2 vPlane;

  float gridLine(vec2 p, float step, float width) {
    vec2 g = abs(fract(p / step - 0.5) - 0.5) * step;
    vec2 fw = fwidth(p);
    vec2 l = 1.0 - smoothstep(vec2(0.0), fw * width, g);
    return max(l.x, l.y);
  }

  void main() {
    vec3 n = normalize(cross(dFdx(vWorld), dFdy(vWorld)));
    if (n.y < 0.0) n = -n;
    // Hard top light: tops bright, fronts dim, sides in between.
    vec3 L = normalize(vec3(-0.55, 1.0, 0.22));
    float diff = max(dot(n, L), 0.0);
    float hN = clamp(vH / (uHeight * 0.85), 0.0, 1.0);
    float raised = smoothstep(0.004, 0.03, vH);

    // Floor: faint coordinate plane with grid lines, fading to the edges.
    float edge = 1.0 - smoothstep(1.2, 2.5, abs(vWorld.x));
    edge *= 1.0 - smoothstep(0.6, 2.2, -vWorld.z);
    edge *= 1.0 - 0.8 * smoothstep(0.7, 1.9, vWorld.z);   // clear the area under the text
    float grid = gridLine(vWorld.xz, 0.25, 1.2) * uGrid;
    float floorLum = (0.045 + 0.08 * grid) * mix(0.2, 1.0, edge);

    float shade = 0.08 + 0.92 * pow(diff, 1.6);
    float body = shade * (0.55 + 0.45 * hN) * uBarDim;
    // Surface act: faces recede, plotted mesh lines carry the form.
    float mesh = gridLine(vPlane, 0.2, 1.3);
    body = mix(body, body * 0.16 + mesh * (0.55 + 0.4 * shade), uMesh);
    float lum = mix(floorLum, body, raised);
    float rim = pow(1.0 - abs(n.y), 3.0) * raised;
    lum += rim * 0.08;

    float fog = 1.0 - smoothstep(3.4, 7.0, vDepth);
    lum *= mix(0.3, 1.0, fog);

    float activity = clamp(length(n.xz) * 1.4 * raised + 0.04, 0.0, 1.0);
    gl_FragColor = vec4(clamp(lum, 0.0, 1.0), activity, 0.0, 1.0);
  }
`;

export const curveVertex = /* glsl */ `
  varying float vU;
  void main() {
    vU = uv.x;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const curveFragment = /* glsl */ `
  uniform float uDraw;
  uniform float uFade;
  varying float vU;
  void main() {
    if (vU > uDraw || uFade <= 0.001) discard;
    gl_FragColor = vec4(uFade, 0.25, uFade, 1.0);
  }
`;

export const glyphVertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

export const glyphFragment = /* glsl */ `
  uniform sampler2D tScene;
  uniform sampler2D tAtlas;
  uniform vec2 uCells;
  uniform float uTime;
  uniform float uDim;
  uniform float uFlicker;
  varying vec2 vUv;

  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  void main() {
    vec2 grid = vUv * uCells;
    vec2 cell = floor(grid);
    vec2 cuv = fract(grid);
    vec4 s = texture2D(tScene, (cell + 0.5) / uCells);

    float curve = s.b;
    float l = s.r * mix(uDim, 1.0, curve);
    float a = pow(clamp((l - 0.02) / 0.8, 0.0, 1.0), 0.85);

    // Bright cells read as 1, mid cells as 0; steep cells flip faster.
    float g = step(0.5, l);
    float rate = 0.6 + 9.0 * s.g;
    float h = hash(cell + floor(uTime * rate + hash(cell) * 7.0) * 0.731);
    float flip = step(1.0 - (0.03 + 0.3 * s.g) * uFlicker, h);
    g = mix(abs(g - flip), 1.0, curve);

    float m = texture2D(tAtlas, vec2((cuv.x + g) * 0.5, cuv.y)).r;
    float alpha = m * max(a, curve);
    gl_FragColor = vec4(vec3(0.957, 0.957, 0.941), alpha);
  }
`;
