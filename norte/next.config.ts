import type { NextConfig } from "next";

// NEXT_BASE_PATH is injected by the CI workflow via actions/configure-pages output.
// e.g. "" (custom domain) → basePath = "/norte"
//      "/awscommunitydaybrasil" (fork) → basePath = "/awscommunitydaybrasil/norte"
// In dev (next dev / Turbopack), basePath is skipped — static files are served from root.
const isDev = process.env.NODE_ENV === "development";
const basePath = isDev ? "" : (process.env.NEXT_BASE_PATH ?? "") + "/norte";

const nextConfig: NextConfig = {
  output: "export",
  distDir: "dist",
  basePath,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  poweredByHeader: false,
};

export default nextConfig;
