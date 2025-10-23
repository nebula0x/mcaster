import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },

  // ✅ Image settings (TypeScript-safe)
  images: {
    // @ts-expect-error: "unoptimized" is allowed but missing from NextConfig type
    unoptimized: true,
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
