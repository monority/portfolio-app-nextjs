"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import DarkModeToggle from "@/components/DarkModeToggle";

export default function Home() {
    return (
        <div className="app-home__container">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                className="app-home__wrapper"
            >
                <header className="app-home__header">
                    <h1 className="app-home__header-title">Ronan Chenu</h1>
                    <DarkModeToggle />
                </header>

                <div className="app-home__content">
                    <Link href="/minimal" className="btn">
                        <div className="app-home__content-item">
                            <h2 className="app-home__content-item-title">Minimal</h2>
                            <svg
                                className="app-home__content-item-icon"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                    </Link>

                    <Link href="/design" className="btn">
                        <div className="app-home__content-item">
                            <h2 className="app-home__content-item-title">Design</h2>
                            <svg
                                className="app-home__content-item-icon"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}
