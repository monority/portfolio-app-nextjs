import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

import "./env";
import "./env.server";

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const isDev = process.env.NODE_ENV === 'development';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compiler: {
    removeConsole: !isDev,
  },
  images: {
    unoptimized: true, // Disable Next.js image optimization for crisp 4K screenshots
    formats: ['image/avif', 'image/webp'],
  },
  modularizeImports: {
    lodash: {
      transform: 'lodash/{{member}}',
    },
  },
};


export default withNextIntl(nextConfig);
