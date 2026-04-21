"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import DarkModeToggle from "@/components/DarkModeToggle";
import { Icon } from "@/components/ui/icon";
import Button from "@/components/ui/button";

export default function Header() {
    const locale = useLocale();
    const pathname = usePathname();
    const t = useTranslations("header");
    const nextLocale = locale === "fr" ? "en" : "fr";
    const localizedPath = pathname?.replace(/^\/(fr|en)(?=\/|$)/, `/${nextLocale}`) || `/${nextLocale}`;


    return (
        <>
            <AnimatePresence>
                <motion.div>
                    <motion.header>
                        <div className="header-shell">
                            <div className="header-layout">

                                <div className="header-title">
                                    <Link href={`/${locale}`} className="header-title__link" aria-label={t("brand.homeLabel")}>


                                        <div className="header-title__text">
                                            <h3>{t("brand.name")}</h3>
                                        </div>
                                    </Link>
                                </div>
                                <nav id="header-nav" className="header-nav">

                                    <div className="header-network">
                                        <ul className="header-network__list">

                                            <li className="header-network__item element">
                                                <Icon name="message" title="Message" sizeClass="icon-sm" className="header-network__icon" />
                                                <span className="header-network__user-active">{t("message")}</span>
                                            </li>
                                            <li className="header-network__item">
                                                <DarkModeToggle ariaLabel={t("themeToggle")} />
                                            </li>
                                            <li className="header-network__item">
                                                <Button variant="primary" aria-label={t("github")}>
                                                    <Icon name="github" title={t("github")} sizeClass="icon-sm" className="header-network__icon" />

                                                </Button>

                                            </li>
                                            <li className="header-network__item">
                                                <Link href={localizedPath} className="btn btn-primary" aria-label={t("languageSwitchTo")} >
                                                    <Icon name="language" title={t("language")} sizeClass="icon-sm" className="header-network__icon" />
                                                </Link>

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
