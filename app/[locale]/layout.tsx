import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ThemeProvider";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { AnimationProvider } from '@components/animations/AnimationProvider';
import "../styles/index.css";

import { Geist } from 'next/font/google';
const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
  display: 'swap',
});
export const metadata: Metadata = {
  title: "Ronan Chenu — Creative Developer",
  description: "Full-stack creative developer based in Lille.",
};

export default async function LocaleLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale} className={geist.variable}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            <AnimationProvider>
              {children}
            </AnimationProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

