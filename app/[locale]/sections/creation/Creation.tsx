'use client'

import { motion } from "framer-motion"
import { useLocale } from "next-intl"
import Image from "next/image"
import { CREATION_ICON_BY_ID, CREATION_TOOL_ICON_BY_LABEL, CREATIONS, CREATIONS_COPY } from "@constants/creations.data"
import type { CreationItem } from "../../../../types"
import type { IconName } from "@/components/ui/icon/types"
import { SectionEyebrow, SectionHeader } from "@/components/ui/section"
import { sectionFadeUp, sectionStagger, sectionViewport } from "@/components/ui/section/motion"
import { useTheme } from "@/components/ThemeProvider"
import Badge from "@/components/ui/badge"
import Button from "@/components/ui/button"
import Icon from "@/components/ui/icon/Icon"
import ActionLink from "@/components/ui/action-link"
import { getPanelThemeStyle } from "../shared/panelTheme"
import { getShowcasePickerTransition, ShowcasePanel, useActiveShowcaseItem } from "../shared/showcase"

import "./creation.css"

function getCreationIcon(id: string): IconName {
    return CREATION_ICON_BY_ID[id] ?? "arrowRight"
}

function getToolIcon(tool: string): IconName | null {
    return CREATION_TOOL_ICON_BY_LABEL[tool.trim().toLowerCase()] ?? null
}

export default function Creation() {
    const locale = useLocale() as "fr" | "en"
    const { resolvedTheme } = useTheme()
    const { activeId, setActiveId, activeItem: activeCreation } = useActiveShowcaseItem(CREATIONS)
    const copy = CREATIONS_COPY[locale]

    return (
        <section className="creation" id="creation">
            <div className="creation-shell">
                <motion.div
                    className="creation-header"
                    initial="hidden"
                    whileInView="visible"
                    viewport={sectionViewport}
                    variants={sectionFadeUp}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                    <SectionEyebrow number="03" label={copy.sectionLabel} />
                    <SectionHeader
                        title={copy.heading}
                        intro={copy.intro}
                        titleClassName="creation-title"
                        introClassName="creation-intro"
                    />
                </motion.div>

                <div className="creation-stage">
                    <motion.aside
                        className="creation-rail"
                        initial="hidden"
                        whileInView="visible"
                        viewport={sectionViewport}
                        variants={sectionStagger}
                    >
                        <div className="creation-rail__intro">
                            <span className="creation-rail__eyebrow">{copy.railLabel}</span>
                            <p className="creation-rail__copy">{copy.railIntro}</p>
                        </div>

                        <div className="creation-picker">
                            {CREATIONS.map((item, index) => {
                                const iconName = getCreationIcon(item.id)

                                return (
                                    <motion.div
                                        key={item.id}
                                        variants={sectionFadeUp}
                                        transition={getShowcasePickerTransition(index)}
                                    >
                                        <Button
                                            variant={activeId === item.id ? "primary" : "outline"}
                                            className={`creation-picker__item${activeId === item.id ? " creation-picker__item--active" : ""}`}
                                            onClick={() => setActiveId(item.id)}
                                            aria-pressed={activeId === item.id}
                                            style={activeId === item.id ? getPanelThemeStyle(item, resolvedTheme) : undefined}
                                            leftIcon={<Icon name={iconName} sizeClass="icon-sm" aria-hidden="true" />}
                                        >
                                            <span className="creation-picker__index">{String(index + 1).padStart(2, "0")}</span>
                                            <span className="creation-picker__content">
                                                <span className="creation-picker__label">{item.titleDisplay[locale]}</span>
                                                <span className="creation-picker__meta">{item.category[locale]}</span>
                                            </span>
                                        </Button>
                                    </motion.div>
                                )
                            })}
                        </div>
                    </motion.aside>

                    <CreationPanel creation={activeCreation} locale={locale} copy={copy} resolvedTheme={resolvedTheme} />
                </div>
            </div>
        </section>
    )
}

function CreationPanel({
    creation,
    locale,
    copy,
    resolvedTheme,
}: {
    creation: CreationItem
    locale: "fr" | "en"
    copy: (typeof CREATIONS_COPY)["fr"]
    resolvedTheme: "light" | "dark"
}) {
    return (
        <ShowcasePanel
            panelKey={creation.id}
            className="creation-panel panel-container"
            style={getPanelThemeStyle(creation, resolvedTheme)}
        >
            <div className="panel-ambient" aria-hidden="true" />

            <article className="creation-panel__card creation-panel__hero panel-card">
                <div className="panel-hero-top">
                    <div className="panel-hero-copy">
                        <div className="panel-badges">
                            <Badge variant="premium" size="sm">{creation.category[locale]}</Badge>
                            <Badge variant="outline" size="sm">{creation.status[locale]}</Badge>
                        </div>
                        <h3 className="panel-title creation-panel__title">{creation.titleDisplay[locale]}</h3>
                        <p className="panel-tagline">{creation.tagline[locale]}</p>
                    </div>
                    <div className="panel-meta">
                        <span>{creation.year}</span>
                        <span className="panel-meta-dot" aria-hidden="true" />
                        <span>{creation.title}</span>
                    </div>
                </div>

                <p className="panel-description">{creation.description[locale]}</p>
                <p className="panel-details">{creation.details[locale]}</p>

                <div className="creation-panel__hero-footer">
                    <div className="panel-outputs-list creation-panel__outputs-list--hero">
                        {creation.outputs.map((output) => (
                            <Badge key={output[locale]} variant="info" size="sm">
                                {output[locale]}
                            </Badge>
                        ))}
                    </div>

                    <div className="panel-actions creation-panel__actions">
                        <ActionLink
                            href="https://example.com"
                            label={copy.explore}
                            icon="arrowRight"
                            variant="solid"
                            className="creation-panel__action-link"
                            external
                        />
                    </div>
                </div>
            </article>

            <article className="creation-panel__card creation-panel__card--stacked panel-card">
                <span className="panel-label">{copy.highlights}</span>
                <ul className="panel-list">
                    {creation.highlights.map((highlight) => (
                        <li key={highlight[locale]} className="panel-list-item">
                            <span className="panel-list-bullet" aria-hidden="true" />
                            <span>{highlight[locale]}</span>
                        </li>
                    ))}
                </ul>
            </article>

            <article className="creation-panel__card creation-panel__card--accent panel-card">
                <span className="panel-label">{copy.tools}</span>
                <div className="panel-tech">
                    {creation.tools.map((tool) => {
                        const iconName = getToolIcon(tool)

                        return (
                            <Badge
                                key={tool}
                                variant="outline"
                                size="sm"
                                icon={iconName ? <Icon name={iconName} sizeClass="icon-sm" aria-hidden="true" /> : undefined}
                            >
                                {tool}
                            </Badge>
                        )
                    })}
                </div>
            </article>

            {creation.visual && (
                <article className="creation-panel__card creation-panel__card--visual panel-card panel-card--visual">
                    <div className="panel-visual-frame">
                        <Image
                            src={creation.visual}
                            alt={creation.titleDisplay[locale]}
                            fill
                            className="panel-visual-img"
                            sizes="(max-width: 768px) 100vw, 400px"
                        />
                    </div>
                </article>
            )}
        </ShowcasePanel>
    )
}
