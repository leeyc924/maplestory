import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        destination: `/api/maple/:path*`,
        source: "/api/maple/:path*",
      },
    ];
  },
  typedRoutes: true,
};
export default nextConfig;
