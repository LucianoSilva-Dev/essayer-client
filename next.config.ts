import { API_BASE_URL } from "@/app/constants";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '**',
      }
    ],
  },
  rewrites: async () => {
    return [
      {
        source: '/admin/:path*',
        destination: '/admin/:path*',
      },
      {
        source: '/api/:path*',
        destination: `${API_BASE_URL}/:path*`,
      },
    ];
  },
};

export default nextConfig;
