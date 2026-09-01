import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  poweredByHeader: false,
  reactStrictMode: true,
  allowedDevOrigins: [
    'openhack.dev',
    'www.openhack.dev',
  ],
  turbopack: {
    rules: {
      "*.py": {
        loaders: ["raw-loader"],
        as: "*.js",
      },
      "*.md": {
        loaders: ["raw-loader"],
        as: "*.js",
      },
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },
};

export default nextConfig;