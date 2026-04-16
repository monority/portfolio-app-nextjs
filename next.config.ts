import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig: NextConfig = {
  // PostCSS is auto-detected via postcss.config.mjs
};

export default withNextIntl(nextConfig);
