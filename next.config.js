/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },

  // ✅ Disable optimization to allow all external images
  images: {
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

module.exports = nextConfig;
