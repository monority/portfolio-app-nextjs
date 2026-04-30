'use client'

import { useState } from "react"
import Image from "next/image"
import { AnimatePresence, motion } from "framer-motion"
import { PROJECTS } from "@constants/projects.data"
import Icon from "@/components/ui/icon/Icon"
import type { IconName } from "@/components/ui/icon/types"
import Badge from "@/components/ui/badge"
import { useLocale, useTranslations } from "next-intl"
import type { Project } from "../../../../types/index"
import "./projects.css"
import ProjectVisual from "./ProjectVisual"
import { SectionEyebrow, SectionHeader } from "@/components/ui/section"
import Button from "@/components/ui/button"

const PROJECT_ICON_BY_ID: Record<string, IconName> = {
    "human-work-force": "humanworkforce",
    "dashboard-rch": "dashboard",
    skillswap: "skyllswap",
    horloges: "horloges",
    "cesar-lezard": "cesarlezard",
    "monority-base": "library",
}

function getProjectAccentColor(project: Project) {
    return project.palette?.dark.accent ?? project.palette?.light?.accent ?? "var(--foreground)"
}

function getProjectTheme(project: Project) {
    const palette = project.palette?.dark ?? project.palette?.light

    return {
        accent: palette?.accent ?? "var(--foreground)",
        bg: palette?.bg ?? "var(--background)",
        surface: palette?.surface ?? "var(--card)",
        fg: palette?.fg ?? "var(--foreground)",
    }
}

function getProjectThemeStyle(project: Project): React.CSSProperties {
    const theme = getProjectTheme(project)

    return {
        "--project-accent": theme.accent,
        "--project-bg": theme.bg,
        "--project-surface": theme.surface,
        "--project-fg": theme.fg,
        "--project-accent-soft": `color-mix(in srgb, ${theme.accent} 24%, transparent)`,
        "--project-accent-strong": `color-mix(in srgb, ${theme.accent} 72%, white 28%)`,
    } as React.CSSProperties
}

type ProjectPaletteMode = "dark" | "light"

function getProjectPalette(project: Project, mode: ProjectPaletteMode) {
    if (mode === "light" && project.palette?.light) {
        return project.palette.light
    }

    return project.palette?.dark ?? project.palette?.light ?? null
}

function getProjectIcon(project: Project): IconName {
    return PROJECT_ICON_BY_ID[project.id] ?? "arrowRight"
}

const TECH_ICON_BY_LABEL: Record<string, IconName> = {
    react: "react",
    "react 19": "react",
    "next.js": "nextjs",
    typescript: "typescript",
    "node.js": "node",
    websocket: "websocket",
    "d3.js": "d3js",
    postgresql: "sql",
    prisma: "prisma",
    stripe: "arrowRight",
    gsap: "gsap",
    "three.js": "threejs",
    css: "css",
    storybook: "storybook",
    i18n: "i18n",
    "framer motion": "motion",
}

function getTechIcon(tech: string): IconName | null {
    return TECH_ICON_BY_LABEL[tech.trim().toLowerCase()] ?? null
}

function getProjectPaletteSwatches(project: Project, mode: ProjectPaletteMode) {
    const palette = getProjectPalette(project, mode)
    if (!palette) return []

    return [
        { label: "Accent", color: palette.accent },
        { label: "BG", color: palette.bg },
        { label: "Surface", color: palette.surface },
        { label: "FG", color: palette.fg },
    ]
}

function formatColor(color: string) {
    return color.startsWith("#") ? color.toUpperCase() : color
}

export default function Projects() {
    const t = useTranslations("projects")
    const locale = useLocale() as "fr" | "en"
    const [activeId, setActiveId] = useState<string>(PROJECTS[0].id)

    const activeProject = PROJECTS.find((p) => p.id === activeId) ?? PROJECTS[0]

    return (
        <section className="projects" id="projects">
            <div className="projects-shell">
                <motion.div className="projects-header" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
                    <SectionEyebrow number="02" label={t("sectionLabel")} />
                    <SectionHeader title={t("heading")} intro={t("intro")} titleClassName="projects-title" introClassName="projects-intro" />
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.15 }}>
                    <ProjectPicker projects={PROJECTS} activeId={activeId} onSelect={setActiveId} locale={locale} />
                </motion.div>

                <AnimatePresence mode="wait">
                    <ProjectBento key={activeProject.id} project={activeProject} locale={locale} />
                </AnimatePresence>
            </div>
        </section>
    )
}

function ProjectPicker({ projects, activeId, onSelect, locale }: { projects: Project[]; activeId: string; onSelect: (id: string) => void; locale: "fr" | "en" }) {
    return (
        <div className="projects-picker">
            <span className="projects-picker__label">{locale === "fr" ? "Choisir un projet :" : "Pick a project:"}</span>
            <div className="projects-picker__list">
                {projects.map((project) => {
                    const accentColor = getProjectAccentColor(project)

                    return (
                        <button
                            key={project.id}
                            className={`projects-picker__item${activeId === project.id ? " projects-picker__item--active" : ""}`}
                            onClick={() => onSelect(project.id)}
                            style={activeId === project.id ? ({ "--project-accent": accentColor } as React.CSSProperties) : undefined}
                            aria-label={project.titleDisplay}
                            aria-pressed={activeId === project.id}
                        >
                            <div className="projects-picker__thumb">
                                <Image src={project.visual} alt={project.titleDisplay} fill sizes="72px" className="projects-picker__thumb-img" />
                                <span className="projects-picker__thumb-badge" aria-hidden="true">
                                    <Icon name={getProjectIcon(project)} sizeClass="icon-sm" className="projects-picker__thumb-icon" />
                                </span>
                            </div>
                            <span className="projects-picker__meta">
                                <span className="projects-picker__name">{project.titleDisplay}</span>
                            </span>
                        </button>
                    )
                })}
            </div>
        </div>
    )
}

function ProjectBento({ project, locale }: { project: Project; locale: "fr" | "en" }) {
    const [paletteMode, setPaletteMode] = useState<ProjectPaletteMode>("dark")
    const hasLightPalette = Boolean(project.palette?.light)
    const palette = getProjectPaletteSwatches(project, paletteMode)

    return (
        <motion.div className="project-bento" style={getProjectThemeStyle(project)} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}>
            <div className="project-bento__ambient" aria-hidden="true" />

            <ProjectVisual project={project} locale={locale} />

            <div className="project-bento__card project-bento__palette">
                <div className="project-bento__card-head">
                    <span className="project-bento__card-label">{locale === "fr" ? "Palette" : "Colour palette"}</span>
                    {hasLightPalette && (
                        <button
                            type="button"
                            className="project-bento__palette-toggle"
                            onClick={() => setPaletteMode((current) => (current === "dark" ? "light" : "dark"))}
                            aria-pressed={paletteMode === "light"}
                        >
                            {paletteMode === "light"
                                ? (locale === "fr" ? "Mode clair" : "Light mode")
                                : (locale === "fr" ? "Mode sombre" : "Dark mode")}
                        </button>
                    )}
                </div>
                <div className="project-bento__swatches">
                    {palette.map((swatch) => (
                        <div
                            key={swatch.label}
                            className="project-bento__swatch"
                            style={{
                                "--swatch-color": swatch.color,
                                "--swatch-border": `color-mix(in srgb, ${swatch.color} 58%, var(--foreground) 42%)`,
                                "--swatch-border-soft": `color-mix(in srgb, ${swatch.color} 22%, var(--background) 78%)`,
                            } as React.CSSProperties}
                        >
                            <span className="project-bento__swatch-block" aria-hidden="true" />
                            <div className="project-bento__swatch-meta">
                                <span className="project-bento__swatch-name">{swatch.label}</span>
                                <span className="project-bento__swatch-code">{formatColor(swatch.color)}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="project-bento__card project-bento__scope">
                <span className="project-bento__card-label">{locale === "fr" ? "Périmètre" : "Project scope"}</span>
                <ul className="project-bento__scope-list">
                    {project.tags.map((tag) => (
                        <li key={tag} className="project-bento__scope-item">
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="project-bento__check" aria-hidden="true">
                                <path d="M2 6.5L4.5 9L10 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            {tag}
                        </li>
                    ))}
                </ul>
                {project.live && (
                    <Button rel="noopener noreferrer" className="project-bento__open-btn">
                        {locale === "fr" ? "Voir le site" : "Open site"}
                        <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
                            <path d="M2 9L9 2M9 2H4M9 2V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </Button>
                )}
            </div>

            <div className="project-bento__card project-bento__title-card">
                <div className="project-bento__title-main">
                    <h3 className="project-bento__title">{project.titleDisplay}</h3>
                    <p className="project-bento__tagline">{project.tagline}</p>
                    <p className="project-bento__description">{project.description[locale]}</p>
                </div>
                <div className="project-bento__ctas">
                    {project.live && (
                        <Button rel="noopener noreferrer" className="btn btn-primary">
                            {locale === "fr" ? "Voir le site live" : "Check live site"}
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                                <path d="M2.5 7H11.5M11.5 7L7 2.5M11.5 7L7 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </Button>
                    )}
                    {project.github && (
                        <Button rel="noopener noreferrer" className="btn btn-ghost">
                            GitHub
                        </Button>
                    )}
                </div>
            </div>

            <div className="project-bento__card project-bento__tech">
                <span className="project-bento__card-label">{locale === "fr" ? "Stack technique" : "Tech stack"}</span>
                <div className="project-bento__tech-list">
                    {project.tech.map((tech) => {
                        const techIcon = getTechIcon(tech)

                        return (
                            <Badge
                                key={tech}
                                variant="outline"
                                size="sm"
                                icon={techIcon ? <Icon name={techIcon} sizeClass="icon-sm" aria-hidden="true" /> : undefined}
                            >
                                {tech}
                            </Badge>
                        )
                    })}
                </div>
            </div>
        </motion.div>
    )
}