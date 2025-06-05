import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // GitHub Pages에서 작동하도록 basePath 설정
  basePath: '/Team-assignment',
};

export default nextConfig;
