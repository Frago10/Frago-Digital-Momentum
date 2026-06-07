import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */

// Static-export mode is opt-in via env var.
// Vercel deploys (default) use standard Next.js server rendering, no basePath.
// GitHub Actions sets GITHUB_PAGES=true to build a subpath static site.
const isGithubPages = process.env.GITHUB_PAGES === "true";
const repoBase = "/Frago-Digital-Momentum";

const nextConfig = {
  reactStrictMode: false,
  transpilePackages: ["three", "@splinetool/react-spline", "@splinetool/runtime"],
  experimental: {
    optimizePackageImports: ["motion", "@react-three/drei", "lenis"],
  },
  // Required for static export (no-op on Vercel since Vercel handles images).
  images: { unoptimized: true },

  // Webpack alias — bypasses @splinetool/react-spline's restrictive `exports`
  // field so Next/webpack can actually resolve the next-aware build.
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "@splinetool/react-spline/next": path.resolve(
        __dirname,
        "node_modules/@splinetool/react-spline/dist/react-spline-next.js",
      ),
    };
    return config;
  },

  // Static-export overrides — only active when targeting GitHub Pages.
  ...(isGithubPages && {
    output: "export",
    basePath: repoBase,
    assetPrefix: `${repoBase}/`,
    trailingSlash: true,
  }),

  env: {
    NEXT_PUBLIC_BASE_PATH: isGithubPages ? repoBase : "",
  },
};

export default nextConfig;
