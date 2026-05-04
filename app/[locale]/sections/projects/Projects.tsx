'use client'

import { useState } from "react"
import Image from "next/image"
import { AnimatePresence, motion } from "framer-motion"
import { PROJECT_ICON_BY_ID, PROJECT_TECH_ICON_BY_LABEL, PROJECTS, PROJECTS_COPY } from "@constants/projects.data"
import Icon from "@/components/ui/icon/Icon"
import type { IconName } from "@/components/ui/icon/types"
import Badge from "@/components/ui/badge"
import { useLocale } from "next-intl"
import type { Project } from "../../../../types/index"
import ProjectVisual from "./ProjectVisual"
import { SectionEyebrow, SectionHeader } from "@/components/ui/section"
import Button from "@/components/ui/button"
import { useActiveShowcaseItem } from "../shared/showcase"

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

function getTechIcon(tech: string): IconName | null {
    return PROJECT_TECH_ICON_BY_LABEL[tech.trim().toLowerCase()] ?? null
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

function openExternalUrl(url?: string) {
    if (!url) return

    window.open(url, "_blank", "noopener,noreferrer")
}

export default function Projects() {
    const locale = useLocale() as "fr" | "en"
    const { activeId, setActiveId, activeItem: activeProject } = useActiveShowcaseItem(PROJECTS)
    const copy = PROJECTS_COPY[locale]

    return (
        <section className="projects" id="projects">
            <div className="projects-shell">
                <motion.div className="projects-header" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
                    <SectionEyebrow number="02" label={copy.sectionLabel} />
                    <SectionHeader title={copy.heading} intro={copy.intro} titleClassName="projects-title" introClassName="projects-intro" />
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.15 }}>
                    <ProjectPicker projects={PROJECTS} activeId={activeId} onSelect={setActiveId} copy={copy} />
                </motion.div>

                <AnimatePresence mode="wait">
                    <ProjectBento key={activeProject.id} project={activeProject} locale={locale} copy={copy} />
                </AnimatePresence>
            </div>
        </section>
    )
}

function ProjectPicker({ projects, activeId, onSelect, copy }: { projects: Project[]; activeId: string; onSelect: (id: string) => void; copy: (typeof PROJECTS_COPY)["fr"] }) {
    return (
        <div className="projects-picker">
            <span className="projects-picker__label">{copy.pickerLabel}</span>
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

function ProjectBento({ project, locale, copy }: { project: Project; locale: "fr" | "en"; copy: (typeof PROJECTS_COPY)["fr"] }) {
    const [paletteMode, setPaletteMode] = useState<ProjectPaletteMode>("dark")
    const hasLightPalette = Boolean(project.palette?.light)
    const palette = getProjectPaletteSwatches(project, paletteMode)
    const openLiveProject = () => openExternalUrl(project.live)
    const openGithubProject = () => openExternalUrl(project.github)

    return (
        <motion.div className="project-bento" style={getProjectThemeStyle(project)} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}>
            <div className="project-bento__ambient" aria-hidden="true" />

            <ProjectVisual project={project} locale={locale} />

            <div className="project-bento__card project-bento__palette">
                <div className="project-bento__card-head">
                    <span className="project-bento__card-label">{copy.paletteLabel}</span>
                    {hasLightPalette && (
                        <button
                            type="button"
                            className="project-bento__palette-toggle"
                            onClick={() => setPaletteMode((current) => (current === "dark" ? "light" : "dark"))}
                            aria-pressed={paletteMode === "light"}
                        >
                            {paletteMode === "light" ? copy.lightMode : copy.darkMode}
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
                <span className="project-bento__card-label">{copy.scopeLabel}</span>
                <ul className="project-bento__scope-list">
                    {project.tags.map((tag) => (
                        <li key={tag[locale]} className="project-bento__scope-item">
                            <Icon name="arrowRight" sizeClass="icon-sm" aria-hidden="true" focusable="false" />
                            {tag[locale]}
                        </li>
                    ))}
                </ul>

            </div>

            <div className="project-bento__card project-bento__title-card">
                <div className="project-bento__title-main">
                    <h3 className="project-bento__title">{project.titleDisplay}</h3>
                    <p className="project-bento__tagline">{project.tagline[locale]}</p>
                    <p className="project-bento__description">{project.description[locale]}</p>
                </div>
                <div className="project-bento__ctas">
                    {project.live && (
                        <Button
                            className="btn btn-primary"
                            onClick={openLiveProject}
                            leftIcon={<Icon name="arrowRight" sizeClass="icon-sm" aria-hidden="true" focusable="false" />}
                        >
                            {copy.liveSite}
                        </Button>
                    )}
                    {project.github && (
                        <Button
                            className="btn btn-ghost"
                            onClick={openGithubProject}
                            leftIcon={<Icon name="github" sizeClass="icon-sm" aria-hidden="true" focusable="false" />}
                        >
                            {copy.github}
                        </Button>
                    )}
                </div>
            </div>

            <div className="project-bento__card project-bento__tech">
                <span className="project-bento__card-label">{copy.techStack}</span>
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