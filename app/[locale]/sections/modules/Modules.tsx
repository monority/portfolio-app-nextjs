'use client'

import { motion } from "framer-motion"
import { useLocale } from "next-intl"
import type { Module } from "../../../../types/index"
import type { IconName } from "@/components/ui/icon/types"
import { SectionEyebrow, SectionHeader } from "@/components/ui/section"
import {
    sectionFadeUp,
    sectionStagger,
    sectionViewport,
} from "@/components/ui/section/motion"
import Badge from "@/components/ui/badge"
import Button from "@/components/ui/button"
import Icon from "@/components/ui/icon/Icon"
import { MODULE_ICON_BY_ID, MODULES, MODULES_COPY, MODULE_TECH_ICON_BY_LABEL } from "@constants/modules.data"
import { useTheme } from "@/components/ThemeProvider"
import { getPanelThemeStyle } from "../shared/panelTheme"
import { getShowcasePickerTransition, ShowcasePanel, useActiveShowcaseItem } from "../shared/showcase"

import "./modules.css"

function getModuleIcon(module: Module): IconName {
    return MODULE_ICON_BY_ID[module.id] ?? "arrowRight"
}

function openExternalUrl(url?: string) {
    if (!url) return
    window.open(url, "_blank", "noopener,noreferrer")
}

function getTechIcon(tech: string): IconName | null {
    return MODULE_TECH_ICON_BY_LABEL[tech.trim().toLowerCase()] ?? null
}

export default function Modules() {
    const locale = useLocale() as "fr" | "en"
    const { resolvedTheme } = useTheme()
    const { activeId, setActiveId, activeItem: activeModule } = useActiveShowcaseItem(MODULES)
    const copy = MODULES_COPY[locale]

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
                    <SectionEyebrow number="04" label={copy.sectionLabel} />
                    <SectionHeader
                        title={copy.heading}
                        intro={copy.intro}
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
                            style={activeId === module.id ? getPanelThemeStyle(module, resolvedTheme) : undefined}
                            variants={sectionFadeUp}
                            transition={getShowcasePickerTransition(index)}
                        >
                            <span className="modules-picker__icon">
                                <Icon name={getModuleIcon(module)} sizeClass="icon-sm" aria-hidden="true" />
                            </span>
                            <span className="modules-picker__copy">
                                <span className="modules-picker__name">{module.titleDisplay}</span>
                                <span className="modules-picker__meta">{module.category[locale]}</span>
                            </span>
                        </motion.button>
                    ))}
                </motion.div>

                <ModulePanel module={activeModule} locale={locale} copy={copy} resolvedTheme={resolvedTheme} />
            </div>
        </section>
    )
}

function ModulePanel({
    module,
    locale,
    copy,
    resolvedTheme,
}: {
    module: Module
    locale: "fr" | "en"
    copy: (typeof MODULES_COPY)["fr"]
    resolvedTheme: "light" | "dark"
}) {
    return (
        <ShowcasePanel
            panelKey={module.id}
            className="module-panel panel-container"
            style={getPanelThemeStyle(module, resolvedTheme)}
        >
            <div className="panel-ambient" aria-hidden="true" />

            <article className="module-panel__card module-panel__hero panel-card">
                <div className="panel-hero-top">
                    <div className="panel-hero-copy">
                        <span className="module-panel__kicker">{module.category[locale]}</span>
                        <h3 className="panel-title module-panel__title">{module.titleDisplay}</h3>
                        <p className="panel-tagline module-panel__tagline">{module.tagline[locale]}</p>
                    </div>
                    <div className="panel-meta">
                        <span>{module.year}</span>
                        <span className="panel-meta-dot" aria-hidden="true" />
                        <span>{copy.miniLabel}</span>
                    </div>
                </div>

                <p className="panel-description">{module.description[locale]}</p>
                <p className="panel-details">{module.details[locale]}</p>

                {(module.live || module.github || module.npm) && (
                    <div className="panel-actions">
                        {module.live && (
                            <Button
                                variant="primary"
                                onClick={() => openExternalUrl(module.live)}
                                rightIcon={<Icon name="arrowRight" sizeClass="icon-sm" aria-hidden="true" />}
                            >
                                {copy.live}
                            </Button>
                        )}
                        {module.github && (
                            <Button
                                variant="primary"
                                onClick={() => openExternalUrl(module.github)}
                                leftIcon={<Icon name="github" sizeClass="icon-sm" aria-hidden="true" />}
                            >
                                {copy.github}
                            </Button>
                        )}
                        {module.npm && (
                            <Button
                                variant="secondary"
                                onClick={() => openExternalUrl(module.npm)}
                                leftIcon={<Icon name="npm" sizeClass="icon-sm" aria-hidden="true" />}
                            >
                                {copy.npm}
                            </Button>
                        )}
                    </div>
                )}
            </article>

            <article className="module-panel__card panel-card">
                <span className="panel-label">{copy.highlights}</span>
                <ul className="panel-list">
                    {module.highlights.map((highlight) => (
                        <li key={highlight[locale]} className="panel-list-item">
                            <span className="panel-list-bullet module-panel__highlight-bullet" aria-hidden="true" />
                            <span>{highlight[locale]}</span>
                        </li>
                    ))}
                </ul>
            </article>

            <article className="module-panel__card panel-card">
                <span className="panel-label">{copy.stack}</span>
                <div className="panel-tech">
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
        </ShowcasePanel>
    )
}
