"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import {
  HEIGHT,
  INTERVAL,
  barLevel,
  clamp01,
  f,
  heroState,
  smooth,
} from "./state";
import {
  curveFragment,
  curveVertex,
  glyphFragment,
  glyphVertex,
  surfaceFragment,
  surfaceVertex,
} from "./shaders";
import { createGlyphAtlas } from "./glyphAtlas";

type Props = {
  /** CSS pixels per glyph cell (width, height) */
  cell: [number, number];
  /** plane subdivisions (x, z) */
  segments: [number, number];
};

const INTRO_CURVE = 1.6; // seconds for the curve to draw
const INTRO_RISE = [1.5, 2.7] as const; // seconds for the first 8 bars to rise

const damp = (current: number, target: number, lambda: number, dt: number) =>
  THREE.MathUtils.lerp(current, target, 1 - Math.exp(-lambda * dt));

export function IntegralSurface({ cell, segments }: Props) {
  const { gl, size, camera } = useThree();
  const persp = camera as THREE.PerspectiveCamera;

  // ---------- Pass 1: surface + curve ----------
  const surfaceUniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uRise: { value: 0 },
      uN0: { value: 8 },
      uN1: { value: 32 },
      uNMix: { value: 0 },
      uSurface: { value: 0 },
      uPeaks: { value: 0 },
      uLogo: { value: 0 },
      uFlatten: { value: 0 },
      uPointer: { value: new THREE.Vector2(9, 9) },
      uDent: { value: 0 },
      uA: { value: INTERVAL.a },
      uB: { value: INTERVAL.b },
      uHeight: { value: HEIGHT },
      uGrid: { value: 1 },
      uMesh: { value: 0 },
      uBarDim: { value: 0.8 },
    }),
    [],
  );

  const surfaceGeometry = useMemo(
    () => new THREE.PlaneGeometry(5.2, 4.4, segments[0], segments[1]),
    [segments],
  );

  const curveGeometry = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    const steps = 240;
    for (let i = 0; i <= steps; i++) {
      const x = INTERVAL.a + ((INTERVAL.b - INTERVAL.a) * i) / steps;
      pts.push(new THREE.Vector3(x, f(x) * HEIGHT + 0.02, 0.24));
    }
    return new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 400, 0.022, 6, false);
  }, []);

  const curveUniforms = useMemo(() => ({ uDraw: { value: 0 }, uFade: { value: 1 } }), []);

  const sceneTarget = useMemo(() => {
    const rt = new THREE.WebGLRenderTarget(4, 4, {
      minFilter: THREE.NearestFilter,
      magFilter: THREE.NearestFilter,
      depthBuffer: true,
    });
    return rt;
  }, []);

  // ---------- Pass 2: glyphs ----------
  const glyphUniforms = useMemo(
    () => ({
      tScene: { value: sceneTarget.texture },
      tAtlas: { value: null as THREE.Texture | null },
      uCells: { value: new THREE.Vector2(1, 1) },
      uTime: { value: 0 },
      uDim: { value: 1 },
      uFlicker: { value: 1 },
    }),
    [sceneTarget],
  );

  const glyphScene = useMemo(() => {
    const scene = new THREE.Scene();
    const geo = new THREE.BufferGeometry();
    // One full-screen triangle.
    geo.setAttribute("position", new THREE.Float32BufferAttribute([-1, -1, 0, 3, -1, 0, -1, 3, 0], 3));
    geo.setAttribute("uv", new THREE.Float32BufferAttribute([0, 0, 2, 0, 0, 2], 2));
    const mat = new THREE.ShaderMaterial({
      uniforms: glyphUniforms,
      vertexShader: glyphVertex,
      fragmentShader: glyphFragment,
      transparent: true,
      depthTest: false,
      depthWrite: false,
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.frustumCulled = false;
    scene.add(mesh);
    return scene;
  }, [glyphUniforms]);
  const orthoCam = useMemo(() => new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1), []);

  // Atlas once fonts are ready.
  useEffect(() => {
    let disposed = false;
    createGlyphAtlas().then((tex) => {
      if (disposed) return tex.dispose();
      glyphUniforms.tAtlas.value = tex;
    });
    return () => {
      disposed = true;
      glyphUniforms.tAtlas.value?.dispose();
    };
  }, [glyphUniforms]);

  // Resize the low-res target to one texel per cell.
  useEffect(() => {
    const cols = Math.max(1, Math.ceil(size.width / cell[0]));
    const rows = Math.max(1, Math.ceil(size.height / cell[1]));
    sceneTarget.setSize(cols, rows);
    glyphUniforms.uCells.value.set(cols, rows);
  }, [size.width, size.height, cell, sceneTarget, glyphUniforms]);

  useEffect(
    () => () => {
      sceneTarget.dispose();
      surfaceGeometry.dispose();
      curveGeometry.dispose();
    },
    [sceneTarget, surfaceGeometry, curveGeometry],
  );

  // ---------- Animation ----------
  const live = useRef({
    rise: 0,
    surface: 0,
    peaks: 0,
    logo: 0,
    flatten: 0,
    dim: 1,
    dent: 0,
    flat: 0,
    pointer: new THREE.Vector2(9, 9),
    camPos: new THREE.Vector3(0, 1.25, 3.4),
    camLook: new THREE.Vector3(0, -0.1, 0),
    clock: 0,
    age: 0,
    lastMs: 0,
  });
  const raycaster = useMemo(() => new THREE.Raycaster(), []);
  const floor = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 1, 0), -0.25), []);
  const hit = useMemo(() => new THREE.Vector3(), []);
  const ndc = useMemo(() => new THREE.Vector2(), []);
  const tmpPos = useMemo(() => new THREE.Vector3(), []);
  const tmpLook = useMemo(() => new THREE.Vector3(), []);

  const surfaceScene = useMemo(() => new THREE.Scene(), []);
  // Materials are built here (not as JSX props) so the uniform objects we mutate are the ones on the GPU.
  const surfaceMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: surfaceUniforms,
        vertexShader: surfaceVertex,
        fragmentShader: surfaceFragment,
        side: THREE.DoubleSide,
      }),
    [surfaceUniforms],
  );
  const curveMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: curveUniforms,
        vertexShader: curveVertex,
        fragmentShader: curveFragment,
      }),
    [curveUniforms],
  );
  useEffect(
    () => () => {
      surfaceMaterial.dispose();
      curveMaterial.dispose();
    },
    [surfaceMaterial, curveMaterial],
  );
  const debugMode = useMemo(
    () => (typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("debug") : null),
    [],
  );
  useEffect(() => {
    if (debugMode) (window as unknown as { __hero: unknown }).__hero = { live: live.current, surfaceUniforms, persp };
  }, [debugMode, surfaceUniforms, persp]);

  useFrame(() => {
    // Own clock: robust to renderer clock changes and paused tabs.
    const nowMs = performance.now();
    const rawDt = live.current.lastMs ? (nowMs - live.current.lastMs) / 1000 : 0;
    live.current.lastMs = nowMs;
    const dt = Math.min(Math.max(rawDt, 0), 1 / 20);
    const L = live.current;
    const reduced = heroState.reducedMotion;
    L.clock += reduced ? 0 : dt;
    const t = reduced ? 20 : L.clock;
    L.age += dt;
    const elapsed = L.age;

    // Intro: curve draws, then the first bars rise. Scroll can only push forward.
    const introDraw = reduced ? 1 : clamp01(elapsed / INTRO_CURVE);
    const introRise = reduced ? 1 : smooth(INTRO_RISE[0], INTRO_RISE[1], elapsed);
    const rp = heroState.riemann;
    L.flat = damp(L.flat, heroState.flat, 3, dt);
    const riseTarget = Math.max(introRise, smooth(0, 0.08, rp)) * (1 - heroState.flat);
    L.rise = damp(L.rise, riseTarget, 6, dt);

    const lvl = barLevel(smooth(0.08, 0.92, rp));
    L.surface = damp(L.surface, smooth(0.05, 0.85, heroState.surface), 4, dt);
    L.peaks = damp(L.peaks, heroState.peaks, 3, dt);
    L.logo = damp(L.logo, smooth(0.1, 0.8, heroState.logo), 4, dt);
    const bgTarget = heroState.background * (1 - heroState.peaks * 0.6) * (1 - heroState.logo);
    L.flatten = damp(L.flatten, bgTarget, 3, dt);
    L.dim = damp(L.dim, 1 - 0.72 * bgTarget, 3, dt);

    // Pointer -> floor plane.
    const p = heroState.pointer;
    const idle = performance.now() / 1000 - p.lastMove > 2.5;
    L.dent = damp(L.dent, p.active && !idle ? 1 : 0, 3, dt);
    if (p.active) {
      ndc.set(p.x, p.y);
      raycaster.setFromCamera(ndc, persp);
      if (raycaster.ray.intersectPlane(floor, hit)) {
        L.pointer.x = damp(L.pointer.x, hit.x, 10, dt);
        L.pointer.y = damp(L.pointer.y, hit.z, 10, dt);
      }
    }

    // Camera: front view for the bars, slow orbit for the surface, front again for the logo.
    const s = L.surface;
    const orbit = reduced ? 0.5 : 0.35 * Math.sin(t * 0.07) + heroState.surface * 0.6;
    const r = THREE.MathUtils.lerp(3.4, 5.0, s);
    tmpPos.set(
      Math.sin(orbit * s) * r,
      THREE.MathUtils.lerp(1.25, 2.2, s),
      Math.cos(orbit * s) * r,
    );
    tmpLook.set(-0.55 * s * (1 - L.logo), THREE.MathUtils.lerp(-0.1, -0.05, s), 0);
    // Offices: lift a little to see three peaks.
    tmpPos.y += L.peaks * 0.6;
    // Logo: square up to the front so the wedge reads as a triangle.
    tmpPos.lerp(new THREE.Vector3(0, 0.62, 3.3), L.logo);
    tmpLook.lerp(new THREE.Vector3(0, 0.5, 0), L.logo);
    L.camPos.lerp(tmpPos, 1 - Math.exp(-3 * dt));
    L.camLook.lerp(tmpLook, 1 - Math.exp(-3 * dt));

    // Narrow screens: pull back so the whole interval fits, and lens-shift the scene up.
    const aspect = size.width / Math.max(1, size.height);
    const distScale = Math.max(1, Math.pow(1.6 / aspect, 0.8));
    persp.position.copy(L.camLook).addScaledVector(tmpPos.copy(L.camPos).sub(L.camLook), distScale);
    persp.lookAt(L.camLook);
    const shift = aspect < 1 ? 0.17 : 0;
    if (!persp.view || persp.view.offsetY !== shift || persp.view.fullWidth !== aspect) {
      persp.setViewOffset(aspect, 1, 0, shift, aspect, 1);
    }

    // Uniforms.
    const u = surfaceUniforms;
    u.uTime.value = t;
    u.uRise.value = L.rise;
    u.uN0.value = lvl.n0;
    u.uN1.value = lvl.n1;
    u.uNMix.value = lvl.mix;
    u.uSurface.value = s;
    u.uPeaks.value = L.peaks;
    u.uLogo.value = L.logo;
    u.uFlatten.value = L.flatten;
    u.uPointer.value.copy(L.pointer);
    u.uDent.value = reduced ? 0 : L.dent;
    u.uGrid.value = 1 - s * 0.7;
    u.uMesh.value = smooth(0.15, 0.7, s) * (1 - L.logo);

    curveUniforms.uDraw.value = introDraw;
    curveUniforms.uFade.value = clamp01(1 - s * 3) * (1 - L.logo) * (1 - L.flat);

    glyphUniforms.uTime.value = t;
    glyphUniforms.uDim.value = L.dim;
    glyphUniforms.uFlicker.value = reduced ? 0 : 1;

    // Debug: ?debug=scene shows the raw surface pass.
    if (debugMode === "scene") {
      gl.setRenderTarget(null);
      gl.setClearColor(0x202020, 1);
      gl.clear();
      gl.render(surfaceScene, persp);
      return;
    }

    // Render: scene -> low-res target -> glyphs on screen.
    gl.setRenderTarget(sceneTarget);
    gl.setClearColor(0x000000, 1);
    gl.clear();
    gl.render(surfaceScene, persp);
    gl.setRenderTarget(null);
    gl.setClearColor(0x000000, 0);
    gl.clear();
    if (glyphUniforms.tAtlas.value) gl.render(glyphScene, orthoCam);
  }, 1);

  return (
    <>
      {/* Private scene, rendered manually into the low-res target each frame. */}
      <primitive object={surfaceScene}>
        <mesh
          geometry={surfaceGeometry}
          material={surfaceMaterial}
          rotation={[-Math.PI / 2, 0, 0]}
          frustumCulled={false}
        />
        <mesh geometry={curveGeometry} material={curveMaterial} frustumCulled={false} />
      </primitive>
    </>
  );
}
