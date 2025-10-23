import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },

  // ✅ Proper fix for image domain validation
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.warpcast.com",      // Warpcast posts/media
      },
      {
        protocol: "https",
        hostname: "**.neynar.com",        // Neynar API assets
      },
      {
        protocol: "https",
        hostname: "**.cdn.farcaster.xyz", // Farcaster CDN images
      },
      {
        protocol: "https",
        hostname: "**.ipfs.nftstorage.link", // Optional: IPFS if you host NFTs
      },
    ],
  },
};

export default nextConfig;
