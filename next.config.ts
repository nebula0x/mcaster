import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },

  // ✅ Fix build: allow remote domains & disable optimization enforcement
  images: {
    unoptimized: true, // <--- This prevents Next.js build errors with external images
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.warpcast.com",
      },
      {
        protocol: "https",
        hostname: "**.neynar.com",
      },
      {
        protocol: "https",
        hostname: "**.cdn.farcaster.xyz",
      },
      {
        protocol: "https",
        hostname: "**.ipfs.nftstorage.link",
      },
    ],
  },
};

export default nextConfig;
