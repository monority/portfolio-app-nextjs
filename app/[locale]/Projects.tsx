'use client'

import { useState } from "react"
import Image from "next/image"
import { AnimatePresence, motion } from "framer-motion"
import { PROJECTS } from "@constants/data"
import { useLocale, useTranslations } from "next-intl"
import type { Project } from "../../types/index"
import "./projects.css"

export default function Projects() {
    const t = useTranslations("projects")
    const locale = useLocale() as "fr" | "en"
    const [activeId, setActiveId] = useState<string>(PROJECTS[0].id)

    const activeProject = PROJECTS.find(p => p.id === activeId) ?? PROJECTS[0]

    return (
        <section className="projects" id="projects">
            <div className="projects-shell">
                <motion.div
                    className="projects-header"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                    <span className="projects-eyebrow">03 — {t("sectionLabel")}</span>
                    <h2 className="projects-title">{t("heading")}</h2>
                    <p className="projects-intro">{t("intro")}</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.15 }}
                >
                    <ProjectPicker
                        projects={PROJECTS}
                        activeId={activeId}
                        onSelect={setActiveId}
                        locale={locale}
                    />
                </motion.div>

                <AnimatePresence mode="wait">
                    <ProjectBento
                        key={activeProject.id}
                        project={activeProject}
                        locale={locale}
                    />
                </AnimatePresence>
            </div>
        </section>
    )
}

function ProjectPicker({
    projects,
    activeId,
    onSelect,
    locale,
}: {
    projects: Project[]
    activeId: string
    onSelect: (id: string) => void
    locale: "fr" | "en"
}) {
    return (
        <div className="projects-picker">
            <span className="projects-picker__label">
                {locale === "fr" ? "Choisir un projet :" : "Pick a project:"}
            </span>
            <div className="projects-picker__list">
                {projects.map((project) => (
                    <button
                        key={project.id}
                        className={`projects-picker__item${activeId === project.id ? " projects-picker__item--active" : ""}`}
                        onClick={() => onSelect(project.id)}
                        style={
                            activeId === project.id
                                ? ({ "--project-accent": project.accentColor ?? "var(--foreground)" } as React.CSSProperties)
                                : undefined
                        }
                        aria-label={project.titleDisplay}
                        aria-pressed={activeId === project.id}
                    >
                        <div className="projects-picker__thumb">
                            <Image
                                src={project.visual}
                                alt={project.titleDisplay}
                                fill
                                sizes="72px"
                                className="projects-picker__thumb-img"
                            />
                        </div>
                        <span className="projects-picker__name">{project.titleDisplay}</span>
                    </button>
                ))}
            </div>
        </div>
    )
}

function ProjectBento({
    project,
    locale,
}: {
    project: Project
    locale: "fr" | "en"
}) {
    const accentColor = project.accentColor ?? "var(--foreground)"

    return (
        <motion.div
            className="project-bento"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
            {/* Visual — col 1-2, row 1-2 */}
            <ProjectVisual project={project} locale={locale} />

            {/* Colour Palette — col 3, row 1 */}
            <div className="project-bento__card project-bento__palette">
                <span className="project-bento__card-label">
                    {locale === "fr" ? "Palette de couleurs" : "Colour Palette"}
                </span>
                <div className="project-bento__swatches">
                    <div className="project-bento__swatch-wrap">
                        <div
                            className="project-bento__swatch"
                            style={{ background: accentColor }}
                        />
                        <span className="project-bento__swatch-name">Accent</span>
                    </div>
                    <div className="project-bento__swatch-wrap">
                        <div className="project-bento__swatch project-bento__swatch--bg" />
                        <span className="project-bento__swatch-name">BG</span>
                    </div>
                    <div className="project-bento__swatch-wrap">
                        <div className="project-bento__swatch project-bento__swatch--surface" />
                        <span className="project-bento__swatch-name">Surface</span>
                    </div>
                    <div className="project-bento__swatch-wrap">
                        <div className="project-bento__swatch project-bento__swatch--fg" />
                        <span className="project-bento__swatch-name">FG</span>
                    </div>
                </div>
            </div>

            {/* Project Scope — col 3, row 2 */}
            <div className="project-bento__card project-bento__scope">
                <span className="project-bento__card-label">
                    {locale === "fr" ? "Périmètre" : "Project scope"}
                </span>
                <ul className="project-bento__scope-list">
                    {project.tags.map((tag) => (
                        <li key={tag} className="project-bento__scope-item">
                            <svg
                                width="12"
                                height="12"
                                viewBox="0 0 12 12"
                                fill="none"
                                className="project-bento__check"
                                aria-hidden="true"
                            >
                                <path
                                    d="M2 6.5L4.5 9L10 3"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            {tag}
                        </li>
                    ))}
                </ul>
                {project.live && (
                    <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-bento__open-btn"
                    >
                        {locale === "fr" ? "Voir le site" : "Open site"}
                        <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
                            <path
                                d="M2 9L9 2M9 2H4M9 2V7"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </a>
                )}
            </div>

            {/* Title + CTAs — col 1-2, row 3 */}
            <div className="project-bento__card project-bento__title-card">
                <div className="project-bento__title-main">
                    <h3 className="project-bento__title">{project.titleDisplay}</h3>
                    <p className="project-bento__tagline">{project.tagline}</p>
                </div>
                <div className="project-bento__ctas">
                    {project.live && (
                        <a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="project-bento__cta project-bento__cta--primary"
                        >
                            {locale === "fr" ? "Voir le site live" : "Check live site"}
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                                <path
                                    d="M2.5 7H11.5M11.5 7L7 2.5M11.5 7L7 11.5"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </a>
                    )}
                    {project.github && (
                        <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="project-bento__cta project-bento__cta--ghost"
                        >
                            GitHub
                        </a>
                    )}
                </div>
            </div>

            {/* Tech stack — col 3, row 3 */}
            <div className="project-bento__card project-bento__tech">
                <span className="project-bento__card-label">
                    {locale === "fr" ? "Stack technique" : "Tech stack"}
                </span>
                <div className="project-bento__tech-list">
                    {project.tech.map((tech) => (
                        <span key={tech} className="project-bento__tech-chip">
                            {tech}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    )
}

function ProjectVisual({
    project,
    locale,
}: {
    project: Project
    locale: "fr" | "en"
}) {
    const gallery = project.gallery ?? [project.visual]
    const hasMultiple = gallery.length >= 2
    const urlLabel = project.live
        ? project.live.replace(/^https?:\/\//, "").replace(/\/$/, "")
        : project.titleDisplay.toLowerCase().replace(/\s+/g, "") + ".vercel.app"

    return (
        <div className="project-bento__visual">
            {/* Browser chrome */}
            <div className="project-bento__browser-chrome">
                <div className="project-bento__dots" aria-hidden="true">
                    <span className="project-bento__dot project-bento__dot--red" />
                    <span className="project-bento__dot project-bento__dot--yellow" />
                    <span className="project-bento__dot project-bento__dot--green" />
                </div>
                <span className="project-bento__url">{urlLabel}</span>
                <div className="project-bento__dots project-bento__dots--ghost" aria-hidden="true">
                    <span className="project-bento__dot" />
                    <span className="project-bento__dot" />
                    <span className="project-bento__dot" />
                </div>
            </div>

            {/* Gallery */}
            <div className="project-bento__gallery">
                {/* Main image */}
                <div className="project-bento__gallery-main">
                    <Image
                        src={gallery[0]}
                        alt={project.titleDisplay}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="project-bento__gallery-img project-bento__gallery-img--main"
                        priority
                    />
                    {/* Meta overlay */}
                    <div className="project-bento__hero-meta">
                        <span className="project-bento__hero-year">{project.year}</span>
                        {project.featured && (
                            <span className="project-bento__hero-badge">
                                {locale === "fr" ? "À la une" : "Featured"}
                            </span>
                        )}
                    </div>
                </div>

                {/* Thumbnail row */}
                {hasMultiple && (
                    <div className="project-bento__gallery-row">
                        <div className="project-bento__gallery-thumb">
                            <Image
                                src={gallery[1]}
                                alt={`${project.titleDisplay} — 2`}
                                fill
                                sizes="(max-width: 768px) 50vw, 25vw"
                                className="project-bento__gallery-img project-bento__gallery-img--thumb1"
                            />
                        </div>
                        {gallery[2] && (
                            <div className="project-bento__gallery-thumb">
                                <Image
                                    src={gallery[2]}
                                    alt={`${project.titleDisplay} — 3`}
                                    fill
                                    sizes="(max-width: 768px) 50vw, 25vw"
                                    className="project-bento__gallery-img project-bento__gallery-img--thumb2"
                                />
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}