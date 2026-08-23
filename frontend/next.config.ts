import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/predict",
        destination: "http://127.0.0.1:8000/predict",
      },
    ];
  },
};

export default nextConfig;