"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import DarkModeToggle from "@/components/DarkModeToggle";
import { Icon } from "@/components/ui/icon";
import Button from "@/components/ui/button";

const NAV_KEYS = ["about", "tech", "projects", "contact"] as const;

export default function Header() {
    const locale = useLocale();


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
                                <nav id="header-nav" className="header-nav">

                                    <div className="header-network">
                                        <ul className="header-network__list">
                                            <li className="header-network__item">
                                                <span className="header-network__user-active">1</span>
                                                <Icon name="user" title="User" sizeClass="icon-sm" className="header-network__icon" />
                                            </li>
                                            <li className="header-network__item element">
                                                <Icon name="message" title="Message" sizeClass="icon-sm" className="header-network__icon" />
                                                <span className="header-network__user-active">message</span>
                                            </li>
                                            <li className="header-network__item">
                                                <DarkModeToggle />
                                            </li>
                                            <li className="header-network__item">
                                                <Button variant="primary" >
                                                    <Icon name="github" title="GitHub" sizeClass="icon-sm" className="header-network__icon" />

                                                </Button>

                                            </li>
                                            <li className="header-network__item">
                                                <Button variant="primary" >
                                                    <Icon name="language" title="Language" sizeClass="icon-sm" className="header-network__icon" />

                                                </Button>

                                            </li>

                                        </ul>

                                    </div>

                                </nav>



                            </div>
                        </div>

                    </motion.header>

                </motion.div>
            </AnimatePresence>
        </>
    );
}
