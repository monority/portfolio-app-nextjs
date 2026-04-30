'use client'

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { useLocale, useTranslations } from "next-intl"
import type { Module } from "../../../../types/index"
import type { IconName } from "@/components/ui/icon/types"
import { SectionEyebrow, SectionHeader } from "@/components/ui/section"
import {
    sectionFadeUp,
    sectionStagger,
    sectionViewport,
} from "@/components/ui/section/motion"
import Badge from "@/components/ui/badge"
import Icon from "@/components/ui/icon/Icon"
import { MODULE_ICON_BY_ID, MODULES, MODULE_TECH_ICON_BY_LABEL } from "@constants/modules.data"
import { useTheme } from "@/components/ThemeProvider"

import "./modules.css"

function getModuleTheme(module: Module, resolvedTheme: "light" | "dark") {
    const palette =
        resolvedTheme === "light"
            ? module.palette?.light ?? module.palette?.dark
            : module.palette?.dark ?? module.palette?.light

    return {
        accent: palette?.accent ?? "var(--foreground)",
        bg: palette?.bg ?? "var(--background)",
        surface: palette?.surface ?? "var(--card)",
        fg: palette?.fg ?? "var(--foreground)",
    }
}

function getModuleThemeStyle(module: Module, resolvedTheme: "light" | "dark"): React.CSSProperties {
    const theme = getModuleTheme(module, resolvedTheme)
    const isLight = resolvedTheme === "light"

    return {
        "--module-accent": theme.accent,
        "--module-bg": theme.bg,
        "--module-surface": theme.surface,
        "--module-fg": theme.fg,
        "--module-accent-soft": `color-mix(in srgb, ${theme.accent} ${isLight ? "18%" : "10%"}, transparent)`,
        "--module-accent-strong": `color-mix(in srgb, ${theme.accent} ${isLight ? "72%" : "58%"}, white ${isLight ? "28%" : "42%"})`,
        "--module-accent-border": `color-mix(in srgb, ${theme.accent} ${isLight ? "18%" : "8%"}, var(--border))`,
        "--module-accent-border-strong": `color-mix(in srgb, ${theme.accent} ${isLight ? "34%" : "14%"}, var(--border))`,
        "--module-accent-wash": `color-mix(in srgb, ${theme.accent} ${isLight ? "16%" : "8%"}, transparent)`,
        "--module-accent-glow": `color-mix(in srgb, ${theme.accent} ${isLight ? "12%" : "6%"}, transparent)`,
        "--module-surface-fill": isLight
            ? `color-mix(in srgb, ${theme.surface} 92%, ${theme.accent} 8%)`
            : `color-mix(in srgb, ${theme.surface} 96%, transparent)`,
    } as React.CSSProperties
}

function getModuleIcon(module: Module): IconName {
    return MODULE_ICON_BY_ID[module.id] ?? "arrowRight"
}

function getTechIcon(tech: string): IconName | null {
    return MODULE_TECH_ICON_BY_LABEL[tech.trim().toLowerCase()] ?? null
}

export default function Modules() {
    const t = useTranslations("modules")
    const locale = useLocale() as "fr" | "en"
    const { resolvedTheme } = useTheme()
    const [activeId, setActiveId] = useState<string>(MODULES[0].id)

    const activeModule = MODULES.find((module) => module.id === activeId) ?? MODULES[0]

    return (
        <section className="modules" id="modules">
            <div className="modules-shell">
                <motion.div
                    className="modules-header"
                    initial="hidden"
                    whileInView="visible"
                    viewport={sectionViewport}
                    variants={sectionFadeUp}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                    <SectionEyebrow number="04" label={t("sectionLabel")} />
                    <SectionHeader
                        title={t("heading")}
                        intro={t("intro")}
                        titleClassName="modules-title"
                        introClassName="modules-intro"
                    />
                </motion.div>

                <motion.div
                    className="modules-picker"
                    initial="hidden"
                    whileInView="visible"
                    viewport={sectionViewport}
                    variants={sectionStagger}
                >
                    {MODULES.map((module, index) => (
                        <motion.button
                            key={module.id}
                            type="button"
                            className={`modules-picker__item${activeId === module.id ? " modules-picker__item--active" : ""}`}
                            onClick={() => setActiveId(module.id)}
                            aria-pressed={activeId === module.id}
                            aria-label={module.titleDisplay}
                            style={activeId === module.id ? getModuleThemeStyle(module, resolvedTheme) : undefined}
                            variants={sectionFadeUp}
                            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: index * 0.05 }}
                        >
                            <span className="modules-picker__icon">
                                <Icon name={getModuleIcon(module)} sizeClass="icon-sm" aria-hidden="true" />
                            </span>
                            <span className="modules-picker__copy">
                                <span className="modules-picker__name">{module.titleDisplay}</span>
                                <span className="modules-picker__meta">{module.category}</span>
                            </span>
                        </motion.button>
                    ))}
                </motion.div>

                <AnimatePresence mode="wait">
                    <ModulePanel key={activeModule.id} module={activeModule} locale={locale} t={t} resolvedTheme={resolvedTheme} />
                </AnimatePresence>
            </div>
        </section>
    )
}

function ModulePanel({
    module,
    locale,
    t,
    resolvedTheme,
}: {
    module: Module
    locale: "fr" | "en"
    t: (key: string) => string
    resolvedTheme: "light" | "dark"
}) {
    return (
        <motion.div
            className="module-panel"
            style={getModuleThemeStyle(module, resolvedTheme)}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
            <div className="module-panel__ambient" aria-hidden="true" />

            <article className="module-panel__card module-panel__hero">
                <div className="module-panel__hero-top">
                    <div className="module-panel__hero-copy">
                        <span className="module-panel__kicker">{module.category}</span>
                        <h3 className="module-panel__title">{module.titleDisplay}</h3>
                        <p className="module-panel__tagline">{module.tagline[locale]}</p>
                    </div>
                    <div className="module-panel__meta">
                        <span>{module.year}</span>
                        <span className="module-panel__meta-dot" aria-hidden="true" />
                        <span>{t("miniLabel")}</span>
                    </div>
                </div>

                <p className="module-panel__description">{module.description[locale]}</p>
                <p className="module-panel__details">{module.details[locale]}</p>

                {(module.live || module.github || module.npm) && (
                    <div className="module-panel__actions">
                        {module.live && (
                            <a href={module.live} target="_blank" rel="noopener noreferrer" className="module-panel__link module-panel__link--primary">
                                {t("live")}
                                <Icon name="arrowRight" sizeClass="icon-sm" aria-hidden="true" />
                            </a>
                        )}
                        {module.github && (
                            <a href={module.github} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                                {t("github")}
                            </a>
                        )}
                        {module.npm && (
                            <a href={module.npm} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                                {t("npm")}
                            </a>
                        )}
                    </div>
                )}
            </article>

            <article className="module-panel__card">
                <span className="module-panel__label">{t("highlights")}</span>
                <ul className="module-panel__highlights">
                    {module.highlights.map((highlight) => (
                        <li key={highlight[locale]} className="module-panel__highlight">
                            <span className="module-panel__highlight-bullet" aria-hidden="true" />
                            <span>{highlight[locale]}</span>
                        </li>
                    ))}
                </ul>
            </article>

            <article className="module-panel__card">
                <span className="module-panel__label">{t("stack")}</span>
                <div className="module-panel__tech">
                    {module.tech.map((tech) => {
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
            </article>
        </motion.div >
    )
}
