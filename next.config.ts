import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Pin the project root so Next.js does not pick up a stray
  // package-lock.json from a parent/home directory.
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
