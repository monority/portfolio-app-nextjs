import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { JetBrains_Mono } from "next/font/google";
import { getLocale } from "next-intl/server";
import { ThemeProvider } from "@/components/ThemeProvider";
import { GradientBackground } from "@/components/GradientBackground";
import { AnimationProvider } from "@components/animations/AnimationProvider";
import "./styles/index.css";
const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const jetMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jet-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ronan Chenu — Creative Developer",
  description: "Full-stack creative developer based in Lille.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html lang={locale} className={`${geist.variable} ${jetMono.variable}`}>
      <body>
        <GradientBackground />
        <ThemeProvider>
          <AnimationProvider>{children}</AnimationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
