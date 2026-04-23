'use client'

import type { CSSProperties } from "react";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ActionLink from "@/components/ui/action-link";
import Badge from "@/components/ui/badge";
import { SectionEyebrow, SectionHeader } from "@/components/ui/section";
import {
    sectionFadeLeft,
    sectionFadeUp,
    sectionViewport,
} from "@/components/ui/section/motion";
import { PROJECTS } from "@constants/data";
import { useLocale, useTranslations } from "next-intl";

const FILTERS = ["all", "featured", "saas", "plateforme", "vitrine", "dashboard", "open source"] as const;
const PROJECTS_STAGGER = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

type FilterKey = (typeof FILTERS)[number];

export default function Projects() {
    const t = useTranslations("projects");
    const locale = useLocale() as "fr" | "en";
    const viewport = { ...sectionViewport, amount: 0.1 } as const;
    const [active, setActive] = useState<FilterKey>("all");

    const filters = FILTERS.map((key) => ({
        key,
        label: t(`filters.${key}`),
    }));

    const filtered = useMemo(() => {
        if (active === "all") return PROJECTS;
        if (active === "featured") return PROJECTS.filter((project) => project.featured);

        return PROJECTS.filter((project) =>
            project.tags.some((tag) => tag.toLowerCase() === active)
        );
    }, [active]);

    return (
        <section className="projects" id="projects">
            <div className="projects-shell">
                <motion.div
                    className="projects-label"
                    variants={sectionFadeLeft}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewport}
                    transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
                >
                    <SectionEyebrow number="03" label={t("sectionLabel")} />
                </motion.div>

                <motion.div
                    variants={sectionFadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewport}
                    transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
                >
                    <SectionHeader
                        title={t("heading")}
                        intro={t("intro")}
                        className="projects-hero"
                        titleClassName="projects-heading"
                        introClassName="projects-intro"
                    />
                </motion.div>

                <motion.div
                    className="projects-filters"
                    variants={sectionFadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewport}
                    transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
                    role="tablist"
                    aria-label={t("filterLabel")}
                >
                    {filters.map((filter) => (
                        <button
                            key={filter.key}
                            role="tab"
                            aria-selected={active === filter.key}
                            className={`btn projects-filter${active === filter.key ? " projects-filter--active" : ""}`}
                            onClick={() => setActive(filter.key)}
                        >
                            {filter.label}
                        </button>
                    ))}
                    <span className="projects-filters__count">
                        {filtered.length} / {PROJECTS.length}
                    </span>
                </motion.div>

                <motion.div
                    className="projects-grid"
                    variants={PROJECTS_STAGGER}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewport}
                    layout
                >
                    <AnimatePresence mode="popLayout">
                        {filtered.map((project, index) => (
                            <motion.article
                                key={project.id}
                                className={`project-card${project.featured ? " project-card--featured" : ""}`}
                                variants={sectionFadeUp}
                                initial="hidden"
                                animate="visible"
                                exit={{ opacity: 0, y: 12, transition: { duration: 0.35 } }}
                                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
                                layout
                                style={
                                    project.accentColor
                                        ? ({ "--project-accent": project.accentColor } as CSSProperties)
                                        : undefined
                                }
                            >
                                <div className="project-card__visual" aria-hidden="true">
                                    <div className="project-card__visual-bar" />
                                    {project.featured ? (
                                        <span className="project-card__selection">{t("selection")}</span>
                                    ) : null}
                                </div>

                                <div className="project-card__body">
                                    <div className="project-card__top">
                                        <span className="project-card__year">{project.year}</span>
                                        <h3 className="project-card__title">{project.title}</h3>
                                        <p className="project-card__tagline">{project.tagline}</p>
                                    </div>

                                    <p className="project-card__desc">{project.description[locale]}</p>

                                    <ul className="project-card__tech" aria-label="Stack">
                                        {project.tech.map((tech) => (
                                            <li key={tech}>
                                                <Badge size="sm" variant="secondary">{tech}</Badge>
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="project-card__links">
                                        {project.live ? (
                                            <ActionLink
                                                href={project.live}
                                                icon="arrowRight"
                                                label={t("live")}
                                                aria-label={`${t("live")} - ${project.titleDisplay}`}
                                                className="project-card__link"
                                            />
                                        ) : null}

                                        {project.github ? (
                                            <ActionLink
                                                href={project.github}
                                                icon="github"
                                                label="Repo"
                                                aria-label={`${t("github")} - ${project.titleDisplay}`}
                                                className="project-card__link"
                                                variant="ghost"
                                            />
                                        ) : null}
                                    </div>
                                </div>
                            </motion.article>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
}
