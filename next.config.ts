import type { NextConfig } from "next";

const nextConfig: NextConfig = {

};

module.exports = {
  typescript: {
    ignoreBuildErrors: true,
    tsconfigPath: 'tsconfig.json',
  },
  allowedDevOrigins: ['127.0.0.1'],
}


export default nextConfig;
