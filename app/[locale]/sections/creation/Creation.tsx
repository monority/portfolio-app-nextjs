'use client'

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { useLocale, useTranslations } from "next-intl"
import Image from "next/image"
import { CREATIONS } from "@constants/creations.data"
import type { CreationItem } from "../../../../types"
import type { IconName } from "@/components/ui/icon/types"
import { SectionEyebrow, SectionHeader } from "@/components/ui/section"
import { sectionFadeUp, sectionStagger, sectionViewport } from "@/components/ui/section/motion"
import { useTheme } from "@/components/ThemeProvider"
import Badge from "@/components/ui/badge"
import Button from "@/components/ui/button"
import Icon from "@/components/ui/icon/Icon"
import ActionLink from "@/components/ui/action-link"

import "./creation.css"

const CREATION_ICON_BY_ID: Record<string, IconName> = {
    "source-maps": "source",
    "source-guis": "gui",
    "video-game": "game",
}

const CREATION_TOOL_ICON_BY_LABEL: Record<string, IconName> = {
    "hammer editor": "hammer",
    "source engine": "source",
    "level design": "unity",
    vgui: "gui",
    photoshop: "photoshop",
    "ui design": "figma",
    "game design": "unity",
    ui: "figma",
    worldbuilding: "unity",
}

function getModuleTheme(creation: CreationItem, resolvedTheme: "light" | "dark") {
    const palette =
        resolvedTheme === "light"
            ? creation.palette?.light ?? creation.palette?.dark
            : creation.palette?.dark ?? creation.palette?.light

    return {
        accent: palette?.accent ?? "var(--foreground)",
        bg: palette?.bg ?? "var(--background)",
        surface: palette?.surface ?? "var(--card)",
        fg: palette?.fg ?? "var(--foreground)",
    }
}

function getModuleThemeStyle(creation: CreationItem, resolvedTheme: "light" | "dark"): React.CSSProperties {
    const theme = getModuleTheme(creation, resolvedTheme)
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

function getCreationIcon(id: string): IconName {
    return CREATION_ICON_BY_ID[id] ?? "arrowRight"
}

function getToolIcon(tool: string): IconName | null {
    return CREATION_TOOL_ICON_BY_LABEL[tool.trim().toLowerCase()] ?? null
}

export default function Creation() {
    const t = useTranslations("creation")
    const locale = useLocale() as "fr" | "en"
    const { resolvedTheme } = useTheme()
    const [activeId, setActiveId] = useState<string>(CREATIONS[0].id)

    const activeCreation = CREATIONS.find((item) => item.id === activeId) ?? CREATIONS[0]

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
                    <SectionEyebrow number="03" label={t("sectionLabel")} />
                    <SectionHeader
                        title={t("heading")}
                        intro={t("intro")}
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
                            <span className="creation-rail__eyebrow">{locale === "fr" ? "Exploration" : "Exploration"}</span>
                            <p className="creation-rail__copy">
                                {locale === "fr"
                                    ? "Une partie plus libre, plus monde, plus interface, plus ambiance."
                                    : "A freer space for worldbuilding, interface direction, and atmosphere."}
                            </p>
                        </div>

                        <div className="creation-picker">
                            {CREATIONS.map((item, index) => {
                                const iconName = getCreationIcon(item.id)

                                return (
                                    <motion.div
                                        key={item.id}
                                        variants={sectionFadeUp}
                                        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: index * 0.05 }}
                                    >
                                        <Button
                                            variant={activeId === item.id ? "primary" : "outline"}
                                            className={`creation-picker__item${activeId === item.id ? " creation-picker__item--active" : ""}`}
                                            onClick={() => setActiveId(item.id)}
                                            aria-pressed={activeId === item.id}
                                            style={activeId === item.id ? getModuleThemeStyle(item, resolvedTheme) : undefined}
                                            leftIcon={<Icon name={iconName} sizeClass="icon-sm" aria-hidden="true" />}
                                        >
                                            <span className="creation-picker__index">{String(index + 1).padStart(2, "0")}</span>
                                            <span className="creation-picker__content">
                                                <span className="creation-picker__label">{t(`titles.${item.title}`)}</span>
                                                <span className="creation-picker__meta">{t(`categories.${item.id}`)}</span>
                                            </span>
                                        </Button>
                                    </motion.div>
                                )
                            })}
                        </div>
                    </motion.aside>

                    <AnimatePresence mode="wait">
                        <CreationPanel key={activeCreation.id} creation={activeCreation} locale={locale} t={t} resolvedTheme={resolvedTheme} />
                    </AnimatePresence>
                </div>
            </div>
        </section>
    )
}

function CreationPanel({
    creation,
    locale,
    t,
    resolvedTheme,
}: {
    creation: CreationItem
    locale: "fr" | "en"
    t: ((key: string) => string) & { raw: (key: string) => unknown }
    resolvedTheme: "light" | "dark"
}) {
    return (
        <motion.div
            className="creation-panel panel-container"
            style={getModuleThemeStyle(creation, resolvedTheme)}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
            <div className="panel-ambient" aria-hidden="true" />

            <article className="creation-panel__card creation-panel__hero panel-card">
                <div className="creation-panel__hero-frame" aria-hidden="true">
                    <span className="creation-panel__hero-code">{creation.title}</span>
                </div>
                <div className="panel-hero-top">
                    <div className="panel-hero-copy">
                        <div className="panel-badges">
                            <Badge variant="premium" size="sm">{t(`categories.${creation.id}`)}</Badge>
                            <Badge variant="outline" size="sm">{t(`status.${creation.id}`)}</Badge>
                        </div>
                        <h3 className="panel-title creation-panel__title">{t(`titles.${creation.title}`)}</h3>
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

                <div className="panel-outputs-list creation-panel__outputs-list--hero">
                    {(t.raw(`outputsData.${creation.id}`) as string[]).map((output, index) => (
                        <Badge key={index} variant="info" size="sm">
                            {output}
                        </Badge>
                    ))}
                </div>

                <div className="panel-actions">
                    <ActionLink
                        href={`/${locale}#projects`}
                        label={t("explore")}
                        icon="arrowRight"
                        variant="solid"
                        className="creation-panel__action-link"
                    />
                </div>
            </article>

            <article className="creation-panel__card creation-panel__card--stacked panel-card">
                <span className="panel-label">{t("highlights")}</span>
                <ul className="panel-list">
                    {(t.raw(`highlightsData.${creation.id}`) as string[]).map((highlight, index) => (
                        <li key={index} className="panel-list-item">
                            <span className="panel-list-bullet" aria-hidden="true" />
                            <span>{highlight}</span>
                        </li>
                    ))}
                </ul>
            </article>

            <article className="creation-panel__card creation-panel__card--accent panel-card">
                <span className="panel-label">{t("tools")}</span>
                <div className="panel-tech">
                    {creation.tools.map((tool) => {
                        const iconName = getToolIcon(tool)
                        const toolKey = tool.toLowerCase().replace(/\s+/g, '-')

                        return (
                            <Badge
                                key={tool}
                                variant="outline"
                                size="sm"
                                icon={iconName ? <Icon name={iconName} sizeClass="icon-sm" aria-hidden="true" /> : undefined}
                            >
                                {t(`toolsData.${toolKey}`)}
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
                            alt={t(`titles.${creation.title}`)}
                            fill
                            className="panel-visual-img"
                            sizes="(max-width: 768px) 100vw, 400px"
                        />
                    </div>
                </article>
            )}
        </motion.div>
    )
}
