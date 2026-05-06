'use client'

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Button from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { SectionEyebrow, SectionShell } from "@/components/ui/section";
import {
    sectionFadeLeft,
    sectionFadeUp,
    sectionViewport,
} from "@/components/ui/section/motion";
import type { TechStackGroup } from "@/components/ui/tech-stack";
import { ABOUT_TECH_CONTAINER, ABOUT_TECH_GROUPS, MARQUEE_ITEMS } from "./data";

import "./about.css";

export default function About() {
    const t = useTranslations("about");
    const viewport = { ...sectionViewport, amount: 0.2 } as const;

    const localizedTechGroups: TechStackGroup[] = ABOUT_TECH_GROUPS.map((group) => ({
        ...group,
        title: group.id === "frontend" ? "Front-end" : t(`tech.${group.id}`),
    }));

    const stats = [
        { value: t("stats.years"), label: t("stats.yearsLabel") },
        { value: t("stats.projects"), label: t("stats.projectsLabel") },
        { value: t("stats.location"), label: t("stats.locationLabel") },
    ] as const;

    return (
        <SectionShell id="about" className="about">
            <motion.div variants={sectionFadeLeft} initial="hidden" whileInView="visible" viewport={viewport} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
                <SectionEyebrow number="01" label={t("title")} />
            </motion.div>

            <div className="about-content">
                <div className="about-left">
                    <div className="about-stats">
                        {stats.map((stat, index) => (
                            <motion.div key={stat.label} className="about-stat" variants={sectionFadeUp} initial="hidden" whileInView="visible" viewport={viewport} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: index * 0.12 }}>
                                <span className="about-stat__value">{stat.value}</span>
                                <span className="about-stat__label">{stat.label}</span>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div className="about-available" variants={sectionFadeUp} initial="hidden" whileInView="visible" viewport={viewport} transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}>
                        <span className="about-available__dot" aria-hidden="true" />
                        <span className="about-available__text">{t("availability")}</span>
                    </motion.div>
                </div>

                <motion.p className="about-bio" variants={sectionFadeUp} initial="hidden" whileInView="visible" viewport={viewport} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
                    {t("description")}
                </motion.p>
            </div>

            <div className="about-marquee" aria-hidden="true">
                <ul className="about-marquee__track">
                    {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, index) => (
                        <li key={`${item.label}-${index}`} className="about-marquee__item">
                            <Icon name={item.icon} sizeClass="icon-sm" />
                            <span>{item.label}</span>
                        </li>
                    ))}
                </ul>
            </div>

            <motion.div className="about-tech" variants={ABOUT_TECH_CONTAINER} initial="hidden" whileInView="visible" viewport={viewport}>
                {localizedTechGroups.map((group) => (
                    <motion.div key={group.id} className={group.wrapperClassName} variants={sectionFadeUp} transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}>
                        <h2 className={group.titleClassName}>{group.title}</h2>
                        <ul className={group.listClassName}>
                            {group.items.map((tech) => (
                                <li key={tech} className={group.itemClassName}>
                                    <Button className="btn-primary btn-tech">
                                        <Icon name={tech} aria-hidden="true" focusable="false" />
                                        <span style={{ textTransform: 'capitalize' }}>{tech}</span>
                                    </Button>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                ))}
            </motion.div>
        </SectionShell>
    );
}