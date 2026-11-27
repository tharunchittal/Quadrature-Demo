import type { NextConfig } from "next";

/**
 * Static export for GitHub Pages. The workflow sets NEXT_PUBLIC_BASE_PATH to "/Quadrature-Demo"
 * (the project-page path); locally it is empty so `npm run dev` serves from the root.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
