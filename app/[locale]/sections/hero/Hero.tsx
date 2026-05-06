"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import ActionLink from "@/components/ui/action-link";
import { Icon } from "@/components/ui/icon";
import { sectionFadeUp, sectionStagger } from "@/components/ui/section/motion";

const heroEase = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
    const t = useTranslations("hero");

    return (
        <section className="hero" id="hero">
            <div className="hero-shell">
                <motion.div
                    className="hero-layout"
                    variants={sectionStagger}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.div
                        className="hero-header"
                        variants={sectionFadeUp}
                        transition={{ duration: 0.7, ease: heroEase }}
                    >
                        <div className="hero-header__titles">
                            <h1 className="hero-header__job heading-title">
                                {t("role").split(" ").map((word, index) => (
                                    <span key={`${word}-${index}`}>
                                        {index > 0 ? <br /> : null}
                                        {word}
                                    </span>
                                ))}
                            </h1>
                        </div>
                        <div className="hero-header__legend">
                            <motion.div
                                className="hero-header__avatar"
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.35, ease: heroEase }}
                            >
                                <Image
                                    src="/images/avatar.webp"
                                    alt={t("imageAlt")}
                                    width={720}
                                    height={960}
                                    className="hero-header__image"
                                    priority
                                />
                            </motion.div>
                        </div>
                    </motion.div>
                    <motion.div
                        className="hero__description"
                        variants={sectionFadeUp}
                        transition={{ duration: 0.65, ease: heroEase }}
                    >
                        <h2>{t("name")}</h2>
                        <p className="hero__description-text">{t("description")}</p>
                    </motion.div>
                    <motion.div
                        className="hero__city"
                        variants={sectionFadeUp}
                        transition={{ duration: 0.6, ease: heroEase }}
                    >
                        <Icon name="location" sizeClass="icon-sm" />
                        <span className="hero__text-muted">{t("city")}</span>
                    </motion.div>
                    <motion.div
                        className="hero__availability"
                        variants={sectionFadeUp}
                        transition={{ duration: 0.6, ease: heroEase }}
                    >
                        <span className="hero__availability-dot" aria-hidden="true" />
                        <p className="hero__text-muted">{t("availability")}</p>
                    </motion.div>
                    <motion.div
                        className="hero__cta"
                        variants={sectionFadeUp}
                        transition={{ duration: 0.55, ease: heroEase }}
                    >
                        <ActionLink href="#projects" label={t("cta")} variant="solid" size="md" />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}