'use client'

import { motion } from "framer-motion";
import Button from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import type { IconName } from "@/components/ui/icon/types";
import { SectionEyebrow } from "@/components/ui/section";
import {
    sectionFadeLeft,
    sectionFadeUp,
    sectionViewport,
} from "@/components/ui/section/motion";
import type { TechStackGroup } from "@/components/ui/tech-stack";
import capitalizeFirstLetter from "@/components/utils/capitalizeFirstLetter";
import { useTranslations } from "next-intl";

const TECH_CONTAINER = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const marqueeItems: { icon: IconName; label: string }[] = [
    { icon: "react", label: "React" },
    { icon: "nextjs", label: "Next.js" },
    { icon: "astro", label: "Astro" },
    { icon: "tailwind", label: "Tailwind CSS" },
    { icon: "sass", label: "Sass" },
    { icon: "motion", label: "Motion" },
    { icon: "node", label: "Node.js" },
    { icon: "express", label: "Express" },
    { icon: "mongo", label: "MongoDB" },
    { icon: "typescript", label: "TypeScript" },
    { icon: "javascript", label: "JavaScript" },
    { icon: "docker", label: "Docker" },
    { icon: "figma", label: "Figma" },
    { icon: "github", label: "GitHub" },
    { icon: "vercel", label: "Vercel" },
    { icon: "railway", label: "Railway" },
];

const techGroups: readonly Omit<TechStackGroup, "title">[] = [
    {
        id: "frontend",
        items: ["react", "nextjs", "astro", "tailwind", "sass", "motion"],
        wrapperClassName: "about-tech-row",
        titleClassName: "about-tech-row__title",
        listClassName: "about-tech-row__list",
        itemClassName: "about-tech-row__item",
    },
    {
        id: "backend",
        items: ["node", "express", "mongo", "jwt", "nodemon", "sql"],
        wrapperClassName: "about-tech-row",
        titleClassName: "about-tech-row__title",
        listClassName: "about-tech-row__list",
        itemClassName: "about-tech-row__item",
    },
    {
        id: "hosting",
        items: ["vercel", "railway", "supabase", "render", "neon"],
        wrapperClassName: "about-tech-row",
        titleClassName: "about-tech-row__title",
        listClassName: "about-tech-row__list",
        itemClassName: "about-tech-row__item",
    },
    {
        id: "languages",
        items: ["typescript", "javascript", "csharp"],
        wrapperClassName: "about-tech-row",
        titleClassName: "about-tech-row__title",
        listClassName: "about-tech-row__list",
        itemClassName: "about-tech-row__item",
    },
    {
        id: "tools",
        items: ["github", "vscode", "postman", "figma", "docker", "photoshop"],
        wrapperClassName: "about-tech-row",
        titleClassName: "about-tech-row__title",
        listClassName: "about-tech-row__list",
        itemClassName: "about-tech-row__item",
    },
] as const;

export default function About() {
    const t = useTranslations("about");
    const viewport = { ...sectionViewport, amount: 0.2 } as const;

    const localizedTechGroups: TechStackGroup[] = techGroups.map((group) => ({
        ...group,
        title: group.id === "frontend" ? "Front-end" : t(`tech.${group.id}`),
    }));

    const stats = [
        { value: t("stats.years"), label: t("stats.yearsLabel") },
        { value: t("stats.projects"), label: t("stats.projectsLabel") },
        { value: t("stats.location"), label: t("stats.locationLabel") },
    ] as const;

    return (
        <section className="about" id="about">
            <div className="about-shell">
                <motion.div
                    className="about-label"
                    variants={sectionFadeLeft}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewport}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                    <SectionEyebrow number="01" label={t("title")} />
                </motion.div>

                <div className="about-content">
                    <div className="about-left">
                        <div className="about-stats">
                            {stats.map((stat, index) => (
                                <motion.div
                                    key={stat.label}
                                    className="about-stat"
                                    variants={sectionFadeUp}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={viewport}
                                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: index * 0.12 }}
                                >
                                    <span className="about-stat__value">{stat.value}</span>
                                    <span className="about-stat__label">{stat.label}</span>
                                </motion.div>
                            ))}
                        </div>

                        <motion.div
                            className="about-available"
                            variants={sectionFadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={viewport}
                            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                        >
                            <span className="about-available__dot" aria-hidden="true" />
                            <span className="about-available__text">{t("availability")}</span>
                        </motion.div>
                    </div>

                    <div className="about-right">
                        <motion.p
                            className="about-bio"
                            variants={sectionFadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={viewport}
                            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                        >
                            {t("description")}
                        </motion.p>
                    </div>
                </div>

                <div className="about-marquee" aria-hidden="true">
                    <ul className="about-marquee__track">
                        {[...marqueeItems, ...marqueeItems].map((item, index) => (
                            <li key={`${item.label}-${index}`} className="about-marquee__item">
                                <Icon name={item.icon} sizeClass="icon-sm" />
                                <span>{item.label}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <motion.div
                    className="about-tech"
                    variants={TECH_CONTAINER}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewport}
                >
                    {localizedTechGroups.map((group) => (
                        <motion.div
                            key={group.id}
                            className={group.wrapperClassName}
                            variants={sectionFadeUp}
                            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <h2 className={group.titleClassName}>{group.title}</h2>
                            <ul className={group.listClassName}>
                                {group.items.map((tech) => (
                                    <li key={tech} className={group.itemClassName}>
                                        <Button className="btn-primary btn-tech">
                                            <Icon name={tech} aria-hidden="true" focusable="false" />
                                            <span className="sr-only">{capitalizeFirstLetter(tech)}</span>
                                        </Button>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
