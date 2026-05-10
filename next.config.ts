import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['@keystatic/core', '@keystatic/next'],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },
    ],
  },
  // Required for Keystatic admin UI
  experimental: {
    serverActions: {
      allowedOrigins: [
        "localhost:3000",
        "127.0.0.1:3000",
        "2df6-114-142-165-100.ngrok-free.app",
        "https://pleased-seriously-bullfrog.ngrok-free.app"
      ],
    },
  },
};

// Keystatic UI is mounted on /keystatic instead of next.config.ts adapter in App Router
export default nextConfig;
