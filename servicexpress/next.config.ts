import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    appDir: true, // Ensures Next.js handles the App Router correctly
  },
};

export default nextConfig;
