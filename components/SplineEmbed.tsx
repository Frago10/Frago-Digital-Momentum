"use client";

/**
 * Placeholder wrapper for the @splinetool/react-spline embed.
 *
 * NOT WIRED YET — the package's `exports` field in package.json restricts
 * what paths webpack can resolve, and the standard `@splinetool/react-spline/next`
 * import fails under Next.js 15 + App Router.
 *
 * When the user provides a Spline scene URL:
 *  1. Add this webpack alias to next.config.mjs:
 *
 *     import path from 'node:path';
 *     webpack: (config) => {
 *       config.resolve.alias['@splinetool/react-spline/next'] = path.resolve(
 *         './node_modules/@splinetool/react-spline/dist/react-spline-next.js'
 *       );
 *       return config;
 *     }
 *
 *  2. Re-enable the import below and the dynamic loader in Manifesto.tsx.
 */

// import Spline from "@splinetool/react-spline/next";

export default function SplineEmbed({ scene }: { scene: string }) {
  return (
    <div className="absolute inset-0 grid place-items-center text-momentum-mist/40">
      Spline wrapper · scene: {scene}
    </div>
  );
}
