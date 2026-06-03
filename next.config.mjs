/** @type {import('next').NextConfig} */

// Static-export mode is opt-in via env var so local `npm run dev` stays normal.
// GitHub Actions sets GITHUB_PAGES=true to build a static site for Pages.
const isGithubPages = process.env.GITHUB_PAGES === "true";
const repoBase = "/Frago-Digital-Momentum"; // repo name → Pages subpath

const nextConfig = {
  reactStrictMode: false,
  transpilePackages: ["three", "@splinetool/react-spline", "@splinetool/runtime"],
  experimental: {
    optimizePackageImports: ["motion", "@react-three/drei", "lenis"],
  },
  // Tell next/image to skip server-side optimization — required for static export.
  images: { unoptimized: true },
  // Static export config — only applied when targeting GitHub Pages.
  ...(isGithubPages && {
    output: "export",
    basePath: repoBase,
    assetPrefix: `${repoBase}/`,
    trailingSlash: true,
  }),
  // Expose base path to client components so we can prefix asset URLs ourselves.
  env: {
    NEXT_PUBLIC_BASE_PATH: isGithubPages ? repoBase : "",
  },
};

export default nextConfig;
