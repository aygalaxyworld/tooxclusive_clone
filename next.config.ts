import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["e32oxuuwzrw.exactdn.com", "tooxclusive.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.mzstatic.com",
      },
    ],
  },
};

export default nextConfig;
