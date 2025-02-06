import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
              protocol: 'https',
              hostname: 'content.skyscnr.com',
            },
            {
                protocol:'https',
                hostname:'media.istockphoto.com'
            },
            {
                protocol:'https',
                hostname:'as2.ftcdn.net'
            },
            {
                protocol: 'https',
                hostname:'exp.cdn-hotels.com'
            },
            {   
                protocol:'https',
                hostname :'ui.cltpstatic.com'
            },
            {
                protocol: 'https',
                hostname:'th.bing.com'
            }

          ],
    },
};

export default nextConfig;
