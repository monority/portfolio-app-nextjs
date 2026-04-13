"use client";

import { useState, useLayoutEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

type Version = "minimal" | "design";

const versions: { id: Version; label: string; description: string; features: string[] }[] = [
  {
    id: "minimal",
    label: "MINIMAL",
    description: "One screen, ultra épuré, CV moderne",
    features: [
      "100vh max — pas de scroll",
      "Typographie fonctionnelle",
      "Spacing uniforme",
      "Animations subtiles",
    ],
  },
  {
    id: "design",
    label: "DESIGN / ARTIST",
    description: "Créatif senior, émotions, art direction",
    features: [
      "Typographie expressive",
      "70-80% whitespace",
      "Animations GSAP + Framer",
      "Premium / Editorial feel",
    ],
  },
];

export default function Home() {
  const [activeVersion, setActiveVersion] = useState<Version>("minimal");
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("darkMode");
      if (saved !== null) {
        return saved === "true";
      } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        return true;
      }
    }
    return false;
  });

  useLayoutEffect(() => {
    localStorage.setItem("darkMode", String(darkMode));
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#f7f6f3] px-6 dark:bg-[#1a1a18]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        className="w-full max-w-md"
      >
        <header className="mb-16 flex items-center justify-between">
          <div className="flex-1 text-center">
            <h1 className="text-[32px] font-semibold tracking-tight text-[#1a1a18] dark:text-[#f7f6f3]">
              Ronan Chenu
            </h1>
            <p className="mt-2 text-sm text-[#6b6b6b]">Portfolio</p>
          </div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="rounded-lg p-2 transition-colors hover:bg-[#e5e5e5] dark:hover:bg-[#2d2d2a]"
            aria-label="Toggle dark mode"
          >
            <span className="text-[#6b6b6b] dark:text-[#a0a0a0]">
            {darkMode ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
            </span>
          </button>
        </header>

        <nav className="mb-8 flex gap-1 rounded-lg bg-[#eaeaea] p-1 dark:bg-[#2d2d2a]">
          {versions.map((version) => (
            <button
              key={version.id}
              onClick={() => setActiveVersion(version.id)}
              className={`flex-1 rounded-md px-4 py-2.5 text-xs font-medium uppercase tracking-wider transition-all duration-200 ${
                activeVersion === version.id
                  ? "bg-white text-[#1a1a18] shadow-sm dark:bg-[#3d3d3a] dark:text-[#f7f6f3]"
                  : "text-[#6b6b6b] hover:text-[#1a1a18] dark:hover:text-[#f7f6f3]"
              }`}
            >
              {version.label}
            </button>
          ))}
        </nav>

        <motion.div
          key={activeVersion}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="relative rounded-xl border border-[#e5e5e5] bg-white p-8 dark:border-[#3d3d3a] dark:bg-[#2d2d2a]"
        >
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-[#1a1a18] dark:text-[#f7f6f3]">
              {versions.find((v) => v.id === activeVersion)?.label}
            </h2>
            <p className="mt-1 text-sm text-[#6b6b6b]">
              {versions.find((v) => v.id === activeVersion)?.description}
            </p>
          </div>

          <ul className="space-y-4">
            {versions
              .find((v) => v.id === activeVersion)
              ?.features.map((feature, index) => (
                <motion.li
                  key={feature}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  className="flex items-center gap-3 text-sm text-[#1a1a18] dark:text-[#f7f6f3]"
                >
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#f7f6f3] text-[10px] font-medium text-[#6b6b6b] dark:bg-[#3d3d3a] dark:text-[#a0a0a0]">
                    {index + 1}
                  </span>
                  {feature}
                </motion.li>
              ))}
          </ul>

          <Link
            href={`/${activeVersion}`}
            className="mt-8 block rounded-lg bg-[#1a1a18] py-3 text-center text-sm font-medium text-[#f7f6f3] transition-all hover:bg-[#2d2d2a] dark:bg-[#f7f6f3] dark:text-[#1a1a18] dark:hover:bg-[#e5e5e5]"
          >
            Voir la version →
          </Link>
        </motion.div>

        <footer className="mt-12 text-center">
          <p className="text-xs text-[#6b6b6b] dark:text-[#6b6b6b]">
            Deux versions radicalement différentes
          </p>
        </footer>
      </motion.div>
    </div>
  );
}