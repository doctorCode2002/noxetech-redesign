import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  experimental: {
    // Client router cache: pages already visited (or prefetched) are reused for 30 minutes
    // instead of being fetched again, so moving back and forth between pages is instant.
    // Every page is static, so there is nothing to go stale within a session.
    staleTimes: { static: 1800 },
  },
  async headers() {
    return [
      {
        // Files in /public (globe poster, logo) have no content hash in their names, so they get a
        // week in the browser cache and are refreshed in the background, instead of being
        // downloaded on every visit. Hashed /_next/static files are already cached for a year.
        source: "/:file*.:ext(webp|png|jpg|jpeg|svg|ico|woff2)",
        headers: [{ key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=2592000" }],
      },
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
