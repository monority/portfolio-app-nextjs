import type { IconName } from "@/components/ui/icon/types"
import type { Module } from "../types/index"

export const MODULES: Module[] = [
    {
        id: 'convert-img',
        title: 'CONVERT_IMG',
        titleDisplay: 'Convert Img',
        tagline: {
            fr: 'Conversion d images rapide et sans friction.',
            en: 'Fast image conversion without friction.',
        },
        description: {
            fr: 'Petit outil focalise sur une tache simple: convertir des images proprement, avec une interface claire et un parcours direct.',
            en: 'A focused utility built for one simple job: converting images cleanly with a clear interface and a direct flow.',
        },
        details: {
            fr: 'Le module a ete pense comme une brique autonome: peu de bruit visuel, actions immediates et structure facile a enrichir si de nouveaux formats ou options sont ajoutes.',
            en: 'This module was designed as a self-contained building block: low visual noise, immediate actions, and a structure that stays easy to extend when new formats or options are added.',
        },
        highlights: [
            { fr: 'Conversion rapide', en: 'Fast conversion' },
            { fr: 'Parcours minimal', en: 'Minimal flow' },
            { fr: 'Base extensible', en: 'Extensible base' },
        ],
        tech: ['Next.js', 'TypeScript', 'CSS'],
        year: '2025',
        category: 'Utility',
        github: 'https://github.com/monority/convert-img',
        npm: 'https://github.com/monority/convert-img',
        palette: {
            dark: {
                accent: '#8bb9d1',
                bg: '#0b0c0d',
                surface: '#121417',
                fg: '#e8edf1',
            },
            light: {
                accent: '#94adc0',
                bg: '#fdfdfd',
                surface: '#f7f8f9',
                fg: '#17191c',
            },
        },
    },
    {
        id: 'screenshot-api',
        title: 'SCREENSHOT_API',
        titleDisplay: 'Screenshot API',
        tagline: {
            fr: 'Capturer une page ou un etat produit a la demande.',
            en: 'Capture a page or product state on demand.',
        },
        description: {
            fr: 'Module oriente service pour generer des captures depuis une URL ou un contexte donne, utile pour automatiser des usages produit ou marketing.',
            en: 'A service-oriented module that generates screenshots from a URL or a given state, useful for product and marketing automation.',
        },
        details: {
            fr: 'L objectif est d offrir une brique claire a brancher dans un workflow plus large: generation, export et reutilisation, sans surcharger l experience.',
            en: 'The goal is to provide a clean building block that plugs into a broader workflow for generation, export, and reuse without overcomplicating the experience.',
        },
        highlights: [
            { fr: 'Generation a la demande', en: 'On-demand generation' },
            { fr: 'Usage API first', en: 'API-first usage' },
            { fr: 'Integration facile', en: 'Easy integration' },
        ],
        tech: ['Node.js', 'API', 'TypeScript'],
        year: '2025',
        category: 'Automation',
        github: 'https://github.com/monority/screenshot-api',
        npm: 'https://github.com/monority/screenshot-api',
        palette: {
            dark: {
                accent: '#c8a16b',
                bg: '#0c0c0b',
                surface: '#151412',
                fg: '#f0ebe3',
            },
            light: {
                accent: '#b69367',
                bg: '#fefdfb',
                surface: '#f8f6f2',
                fg: '#1d1a16',
            },
        },
    },
    {
        id: 'git-quality-commit',
        title: 'GIT_QUALITY_COMMIT',
        titleDisplay: 'Git Quality Commit',
        tagline: {
            fr: 'Mieux cadrer la qualite avant le commit.',
            en: 'Improve quality before the commit.',
        },
        description: {
            fr: 'Outil centre sur le confort de developpement pour verifier, structurer ou guider la qualite des commits avant envoi.',
            en: 'A developer-focused tool designed to improve commit quality by checking, structuring, or guiding changes before they are sent.',
        },
        details: {
            fr: 'Le module met l accent sur la lisibilite et les garde-fous: une logique simple a maintenir, utile seul ou comme etape d un workflow plus grand.',
            en: 'This module emphasizes readability and guardrails: simple logic to maintain, useful on its own or as a step inside a larger workflow.',
        },
        highlights: [
            { fr: 'Workflow dev', en: 'Dev workflow' },
            { fr: 'Qualite de commit', en: 'Commit quality' },
            { fr: 'Usage quotidien', en: 'Daily usage' },
        ],
        tech: ['Git', 'Node.js', 'CLI'],
        year: '2025',
        category: 'Developer tool',
        github: 'https://github.com/monority/git-quality-commit',
        npm: 'https://www.npmjs.com/package/commit-quality-check',
        palette: {
            dark: {
                accent: '#739b8a',
                bg: '#0a0c0b',
                surface: '#151816',
                fg: '#e8f0ec',
            },
            light: {
                accent: '#7ea792',
                bg: '#fcfdfc',
                surface: '#f5f7f5',
                fg: '#171b18',
            },
        },
    },
]

export const MODULE_ICON_BY_ID: Record<string, IconName> = {
    "convert-img": "theme",
    "screenshot-api": "dashboard",
    "git-quality-commit": "github",
}

export const MODULE_TECH_ICON_BY_LABEL: Record<string, IconName> = {
    "next.js": "nextjs",
    typescript: "typescript",
    css: "css",
    "node.js": "node",
    api: "websocket",
    git: "github",
    cli: "arrowRight",
}
