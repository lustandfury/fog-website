const withBuilderDevTools = require("@builder.io/dev-tools/next")();

/** @type {import('next').NextConfig} */
const nextConfig = withBuilderDevTools({
  output: 'export',
  images: {
    unoptimized: true,
    domains: ['cdn.builder.io', 'www.google.com'],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(ico|png|svg|jpg|jpeg|gif)$/i,
      type: 'asset/resource',
    });
    return config;
  },
});

module.exports = nextConfig;
