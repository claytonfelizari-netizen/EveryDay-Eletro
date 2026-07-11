/** @type {import('next').NextConfig} */
const repoBasePath = process.env.SITE_BASE_PATH || "";

const nextConfig = {
  output: "export",
  basePath: repoBasePath || undefined,
  assetPrefix: repoBasePath || undefined,
};

export default nextConfig;
