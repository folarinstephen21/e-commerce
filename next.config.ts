import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "files.stripe.com",
        pathname: "/**", // Allows all images from Stripe
      },
    ],
  },
};

export default nextConfig;
