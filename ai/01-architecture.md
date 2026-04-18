# 01 — Architecture

## Stack

| Outil | Rôle |
|---|---|
| Next.js 15 App Router | Framework, routing, SSG |
| TypeScript 5 strict | Typage end-to-end |
| CSS natif + variables | Styling — zéro framework |
| Framer Motion 11 | Animations React |
| GSAP + ScrollTrigger | Scroll avancé, scrub, pin |
| Lenis | Smooth scroll premium |
| Three.js / R3F | WebGL optionnel (hero shader) |
| Splitting.js | Text animations lettre/mot |

---

## Structure du projet

```
/
├── app/
│   ├── layout.tsx              ← RootLayout : fonts, metadata, providers
│   ├── page.tsx                ← Page unique (portfolio one-page)
│   └── globals.css             ← Reset + variables CSS + tokens
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx          ← Navigation fixe, toggles
│   │   └── Footer.tsx          ← Contact footer
│   │
│   ├── sections/               ← Une section = un composant
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Timeline.tsx
│   │   ├── Projects.tsx
│   │   └── Contact.tsx
│   │
│   ├── ui/                     ← Atomiques réutilisables
│   │   ├── SectionLabel.tsx    ← Label "01 — Titre section"
│   │   ├── AnimatedText.tsx    ← Wrapper reveal texte
│   │   ├── MagneticButton.tsx  ← Bouton magnétique
│   │   ├── ProjectEntry.tsx    ← Ligne projet éditoriale
│   │   ├── TechIcon.tsx        ← Icône SVG tech colorée
│   │   └── icons/
│   │       └── index.tsx       ← Tous les SVG inline (GitHub, Mail, etc.)
│   │
│   ├── animations/             ← Wrappers animation réutilisables
│   │   ├── FadeIn.tsx
│   │   ├── StaggerChildren.tsx
│   │   ├── TextReveal.tsx      ← Clip-path reveal
│   │   └── ParallaxLayer.tsx
│   │
│   └── canvas/                 ← WebGL (optionnel)
│       ├── NoiseBackground.tsx ← Shader bruit/grain animé
│       └── FloatingSphere.tsx  ← Sphère de particules hero
│
├── lib/
│   ├── useTheme.ts             ← Dark/light toggle + localStorage
│   ├── useLang.ts              ← i18n FR/EN + localStorage
│   ├── useScrollDirection.ts   ← Header hide/show au scroll
│   ├── useMagneticEffect.ts    ← Lerp magnétique pour boutons
│   ├── lenis.ts                ← Instance Lenis singleton
│   └── utils.ts                ← cn(), formatIndex(), lerp(), clamp()
│
├── constants/
│   ├── data.ts                 ← Toute la data (projets, skills, timeline)
│   ├── skillIcons.ts           ← Mapping simple-icons → SKILL_ICONS
│   └── meta.ts                 ← SEO metadata, OG image
│
├── i18n/
│   ├── fr.ts
│   └── en.ts
│
├── types/
│   └── index.ts                ← Tous les types TypeScript
│
└── public/
    ├── fonts/                  ← woff2 auto-hébergées
    ├── images/
    │   ├── projects/           ← webp, 800×600 min
    │   └── avatar.webp         ← 400×400 min
    ├── cv.pdf
    └── og-image.jpg            ← 1200×630
```

---

## Patterns d'architecture

### Separation of concerns
- **Data** → `/constants/data.ts` uniquement. Jamais hardcodée dans les composants.
- **Logic** → hooks dans `/lib/`. Composants purement UI.
- **Animation** → wrappers dans `/components/animations/`. Jamais inline.
- **Styles** → variables CSS dans `globals.css`. Jamais de style inline sauf valeurs dynamiques JS.

### Composition over inheritance
```tsx
// ✅ Composition
<FadeIn delay={0.2}>
  <SectionLabel>À propos</SectionLabel>
</FadeIn>

// ❌ Éviter — logique d'animation couplée au composant UI
<SectionLabel animated delay={0.2}>À propos</SectionLabel>
```

### Dynamic imports pour les sections lourdes
```tsx
// app/page.tsx
import dynamic from 'next/dynamic'

const Projects    = dynamic(() => import('@/components/sections/Projects'))
const NoiseBackground = dynamic(() => import('@/components/canvas/NoiseBackground'),
  { ssr: false }) // WebGL = client only
```

### Types globaux
```typescript
// types/index.ts

export interface Project {
  id: string
  title: string            // "HUMAN_WORK_FORCE" — SCREAMING_SNAKE_CASE affiché
  titleDisplay: string     // "Human Work Force" — usage texte courant
  tagline: string
  description: { fr: string; en: string }
  tech: string[]
  live?: string
  github?: string
  year: string
  tags: string[]
  featured?: boolean
  visual: string           // '/images/projects/xxx.webp'
  accentColor?: string     // couleur d'accent spécifique au projet
}

export interface TimelineEntry {
  id: string
  year: string
  title: string
  subtitle: string
  description: { fr: string; en: string }
  type: 'work' | 'project' | 'education'
}

export interface Skill {
  name: string
  category: 'frontend' | 'backend' | 'tools' | 'learning'
  level: 'expert' | 'confirmed' | 'learning'
}

export interface Quality {
  id: string
  number: string
  title: { fr: string; en: string }
  description: { fr: string; en: string }
}

export type Theme = 'light' | 'dark'
export type Lang  = 'fr' | 'en'
```

### Config Next.js
```typescript
// next.config.ts
import type { NextConfig } from 'next'

const config: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    optimizeCss: true,
  },
}

export default config
```

### tsconfig paths
```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "paths": {
      "@/*":            ["./src/*"],
      "@components/*":  ["./src/components/*"],
      "@lib/*":         ["./src/lib/*"],
      "@constants/*":   ["./src/constants/*"],
      "@types/*":       ["./src/types/*"]
    }
  }
}
```
