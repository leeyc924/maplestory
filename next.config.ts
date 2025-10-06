import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        destination: `/maple/api/:path*`,
        source: "/api/maple/:path*",
      },
    ];
  },
  typedRoutes: true,
};
export default nextConfig;
