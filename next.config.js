/** @type {import('next').NextConfig} */
const path = require('path');

const BE_URL = process.env.BE_URL || 'http://localhost:3000';

const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  webpack: config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, 'src'),
      '@/components': path.resolve(__dirname, 'src/components'),
      '@/utils': path.resolve(__dirname, 'src/utils'),
      '@/hooks': path.resolve(__dirname, 'src/hooks'),
      '@/types': path.resolve(__dirname, 'src/types'),
      '@/constants': path.resolve(__dirname, 'src/constants'),
      '@/styles': path.resolve(__dirname, 'src/styles'),
      '@/assets': path.resolve(__dirname, 'src/assets'),
      '@/middleware': path.resolve(__dirname, 'src/middleware'),
    };
    return config;
  },
  async rewrites() {
    return [
      {
        source: '/uploads/:path*',
        destination: `${BE_URL}/uploads/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
