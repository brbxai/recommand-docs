import type { NextConfig } from "next";
import { createMDX } from "fumadocs-mdx/next";

const nextConfig: NextConfig = {
  output: "standalone",
  reactStrictMode: true,
  turbopack: {
    resolveAlias: {
      "@/.source/*": "./.source/*",
    },
  },
  async redirects() {
    return [
      {
        source: "/api-reference",
        destination: "/reference",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/docs/:path*.md",
        destination: "/llms.mdx/docs/:path*",
      },
      {
        source: "/docs/:path*.mdx",
        destination: "/llms.mdx/docs/:path*",
      },
      {
        source: "/integrations/:path*.md",
        destination: "/llms.mdx/integrations/:path*",
      },
      {
        source: "/integrations/:path*.mdx",
        destination: "/llms.mdx/integrations/:path*",
      },
      {
        source: "/changelog/:path*.md",
        destination: "/llms.mdx/changelog/:path*",
      },
      {
        source: "/changelog/:path*.mdx",
        destination: "/llms.mdx/changelog/:path*",
      },
      {
        source: "/faq/:path*.md",
        destination: "/llms.mdx/faq/:path*",
      },
      {
        source: "/faq/:path*.mdx",
        destination: "/llms.mdx/faq/:path*",
      },
      {
        source: "/reference/:path*.md",
        destination: "/llms.mdx/reference/:path*",
      },
      {
        source: "/reference/:path*.mdx",
        destination: "/llms.mdx/reference/:path*",
      },
    ];
  },
};

const withMDX = createMDX();
export default withMDX(nextConfig);
