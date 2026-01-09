import type { NextConfig } from "next";


const nextConfig: NextConfig = {
  /* config options here */
  images: {
    qualities: [75, 90],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
      }
    ]
  },
};

export default nextConfig;
