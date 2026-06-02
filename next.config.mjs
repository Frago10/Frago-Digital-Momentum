/** @type {import('next').NextConfig} */
const nextConfig = {
  // Strict Mode is off in dev because it forces double-mount which fires
  // the first-visit intro's sessionStorage flag prematurely. Production
  // builds always run single-mount anyway.
  reactStrictMode: false,
  transpilePackages: ["three", "@splinetool/react-spline", "@splinetool/runtime"],
  experimental: {
    optimizePackageImports: ["motion", "@react-three/drei", "lenis"],
  },
};

export default nextConfig;
