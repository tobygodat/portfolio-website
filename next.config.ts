import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The dev overlay badge is not part of the site; keep review captures clean.
  devIndicators: false,
  // The site is one page now; the old section routes point at their anchors.
  async redirects() {
    return [
      { source: "/experience", destination: "/#experience", permanent: true },
      { source: "/projects", destination: "/#projects", permanent: true },
      { source: "/education", destination: "/#education", permanent: true },
    ];
  },
};

export default nextConfig;
