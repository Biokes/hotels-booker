import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        domains: ['content.skyscnr.com'],
        loader: 'imgix',
    },
};

export default nextConfig;
