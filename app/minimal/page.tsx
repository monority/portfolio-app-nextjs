"use client";

import DarkModeToggle from "../components/DarkModeToggle";
import { motion } from "framer-motion";
export default function MinimalPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      className="page-shell"
    >
      <div className="minimal-page__content">
        <div className="minimal-page__header">
          <DarkModeToggle />
        </div>
        <h1 className="minimal-page__title">Ronan Chenu</h1>
        <p className="minimal-page__subtitle">Creative Developer</p>
      </div>
    </motion.div>
  );
}
