"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import DarkModeToggle from "@/components/DarkModeToggle";
import { Icon } from "@/components/ui/icon";

const NAV_KEYS = ["about", "tech", "timeline", "projects", "contact"] as const;

export default function Header() {
    const locale = useLocale();
    const tNav = useTranslations("header.nav");


    return (
        <>
            <AnimatePresence>
                <motion.div>
                    <motion.header>
                        <div className="header-shell">
                            <div className="header-layout">

                                <div className="header-title">
                                    <Link href={`/${locale}`} className="header-title__link">

                                        <div className="header-title__text">
                                            <h3>ronan</h3>
                                        </div>
                                    </Link>
                                </div>
                                <nav id="nav">
                                    <ul className="header-nav__list">
                                        {NAV_KEYS.map((key) => (
                                            <li key={key} className="header-nav__item">
                                                <Link href={`/${locale}#${key}`} className="header-nav__link">
                                                    {tNav(key)}

                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </nav>
                                <nav className="header-network">
                                    <DarkModeToggle />
                                    <Link href="https://www.linkedin.com/in/ronan-davies/" target="_blank" className="header-network__link">
                                        <Icon name="linkedin" title="linkedin" sizeClass="icon-sm" className="header-network__icon" />
                                    </Link>
                                </nav>
                            </div>
                        </div>

                    </motion.header>

                </motion.div>
            </AnimatePresence>
        </>
    );
}
