import * as THREE from "three";

/**
 * Draws `0` and `1` side by side into a canvas texture.
 * Uses the site's mono font (exposed by next/font as --font-mono) once it has loaded.
 */
export async function createGlyphAtlas(): Promise<THREE.CanvasTexture> {
  const cellW = 64;
  const cellH = 92;
  const family =
    getComputedStyle(document.documentElement).getPropertyValue("--font-mono").trim() ||
    "ui-monospace, monospace";
  const font = `300 ${Math.round(cellH * 0.72)}px ${family}`;

  try {
    await document.fonts.load(font, "01");
  } catch {
    /* fall back to whatever is available */
  }

  const canvas = document.createElement("canvas");
  canvas.width = cellW * 2;
  canvas.height = cellH;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#fff";
  ctx.font = font;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("0", cellW * 0.5, cellH * 0.54);
  ctx.fillText("1", cellW * 1.5, cellH * 0.54);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.NoColorSpace;
  tex.minFilter = THREE.LinearMipmapLinearFilter;
  tex.magFilter = THREE.LinearFilter;
  tex.generateMipmaps = true;
  tex.needsUpdate = true;
  return tex;
}
