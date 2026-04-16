"use client";

import { motion } from "framer-motion";
import Header from '@/[locale]/minimal/features/Header';
import Hero from "@/[locale]/minimal/Hero";
export default function MinimalPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      className="page-shell"
    >
      <div className="minimal-page__content">

        <Header />
        <Hero />
      </div>
    </motion.div>
  );
}
