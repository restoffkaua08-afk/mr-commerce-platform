import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "imgnike-a.akamaihd.net",
      },
      {
        protocol: "https",
        hostname: "imagesa1.lacoste.com",
      },
      {
        protocol: "https",
        hostname: "assets.adidas.com",
      },
    ],
  },

  poweredByHeader: false,
  reactStrictMode: true,
};

export default nextConfig;
