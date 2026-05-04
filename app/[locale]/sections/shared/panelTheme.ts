import type { ProjectPalettes, Theme } from "../../../../types"

type ThemedPanelItem = {
    palette?: ProjectPalettes
}

function getPanelTheme(item: ThemedPanelItem, resolvedTheme: Theme) {
    const palette =
        resolvedTheme === "light"
            ? item.palette?.light ?? item.palette?.dark
            : item.palette?.dark ?? item.palette?.light

    return {
        accent: palette?.accent ?? "var(--foreground)",
        bg: palette?.bg ?? "var(--background)",
        surface: palette?.surface ?? "var(--card)",
        fg: palette?.fg ?? "var(--foreground)",
    }
}

export function getPanelThemeStyle(item: ThemedPanelItem, resolvedTheme: Theme): React.CSSProperties {
    const theme = getPanelTheme(item, resolvedTheme)
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