import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
              protocol: 'https',
              hostname: 'content.skyscnr.com',
            },
          ],    },
};

export default nextConfig;
