# 05 — Pages

## Structure — `app/page.tsx`

```tsx
import dynamic from 'next/dynamic'
import Hero     from '@components/sections/Hero'
import About    from '@components/sections/About'
import Timeline from '@components/sections/Timeline'

// Dynamic imports pour les sections lourdes (below the fold)
const Projects = dynamic(() => import('@components/sections/Projects'))
const Contact  = dynamic(() => import('@components/sections/Contact'))

// WebGL — client only
const NoiseBackground = dynamic(
  () => import('@components/canvas/NoiseBackground'),
  { ssr: false }
)

export default function HomePage() {
  return (
    <main>
      <Hero />
      <About />
      <Timeline />
      <Projects />
      <Contact />
    </main>
  )
}
```

---

## [01] HERO

### Objectif
Première impression absolue. Le nom envahit l'écran.
Déclaration d'identité, pas introduction. 3 secondes pour sentir qui est Ronan.

### Layout — `min-height: 100dvh`
```
[fond var(--bg) + grain CSS + WebGL optionnel z=0]

┌─────────────────────────────────────────────────────┐
│                                          padding-top │
│  Creative                                 = header   │
│  Developer.                    [photo]               │
│                                140×140, radius 8px   │
│  ─────────────────                                   │
│  Ronan Chenu                                         │
│  LILLE · 3 ANS · FULL-STACK                          │
│                                                      │
│  "Je fais la jonction entre                          │
│   le design et l'ingénierie."                        │
│                                                      │
│  [→ Voir les projets]   ● Disponible CDI             │
│                                                      │
│                                              ↓ scroll│
└─────────────────────────────────────────────────────┘
```

### Détail typographique
```
"Creative"      → Syne, clamp(4rem,12vw,10rem), weight 300, color var(--text-2)
"Developer"     → même, weight 800, color var(--text)
"."             → color var(--clr-accent)

Ligne —         → 1px solid var(--border), width 60px, margin 2rem 0

"Ronan Chenu"   → Inter, text-xl, weight 500
Meta ligne      → JetBrains Mono, text-xs, tracking 0.12em, uppercase, color var(--text-3)
Bio             → Inter, text-lg, weight 300, line-height 1.8, max-width 480px
                  "ingénierie." en <em style="color:var(--clr-accent); font-style:italic">
```

### Séquence d'animation (GSAP)
```
0.0s  → fond + grain visible (no animation)
0.1s  → chaque lettre de "Creative" : yPercent 110→0, stagger 0.04s
0.5s  → chaque lettre de "Developer." : idem
0.9s  → ligne separator : scaleX 0→1 depuis left, 0.5s
1.1s  → "Ronan Chenu" + meta : fadeUp y:16, 0.5s
1.2s  → bio : fadeUp y:12, 0.4s
1.3s  → CTA + badge : fade, 0.4s
1.5s  → photo : opacity+scale 0.96→1, 0.6s
1.8s  → scroll indicator : fade, puis loop translateY 0→8px
```

### Parallax photo
```typescript
// useScroll Framer Motion, target: heroSectionRef
// y: scrollYProgress 0→0.4 → translateY 0→-30px
// Sensation de profondeur entre texte et photo
```

---

## [02] ABOUT

### Objectif
Raconter qui est Ronan en un coup d'œil.
Layout asymétrique pour briser la monotonie verticale.

### Layout desktop (grid 12 colonnes)
```
Col 1-7                          Col 9-12
─────────────────────────────    ──────────────────────
[label "01 — À propos"]

Bio développée
(2-3 phrases, text-lg, weight 300)
La phrase clé en weight 600.

                                 01 — Écrans & parcours
                                 Interfaces qui tiennent.

                                 02 — Composants
                                 Briques réutilisables.

                                 03 — Branchement
                                 APIs et logique métier.

                                 04 — Finition
                                 Responsive, a11y.
```

### Layout mobile
Empilé verticalement. Bio en premier, qualités en dessous.

### Animation
`staggerContainer` Framer Motion sur la section.
Qualités : `fadeUp` avec stagger 0.1s, `whileInView`.

---

## [03] TIMELINE

### Objectif
Storytelling chronologique — inspiré salmangsamar.com.
Montrer la progression, l'histoire, la personnalité.
Pas une liste de jobs — une narration.

### Données à afficher (depuis `constants/data.ts`)
```typescript
export const TIMELINE: TimelineEntry[] = [
  {
    id: 'now',
    year: '2024 →',
    title: 'Creative Developer',
    subtitle: 'Freelance · Lille',
    description: { fr: 'Interfaces pensées produit...', en: '...' },
    type: 'work',
  },
  {
    id: 'skillswap',
    year: '2024',
    title: 'SkillSwap',
    subtitle: 'Projet personnel',
    description: { fr: 'Plateforme d\'échange de compétences...', en: '...' },
    type: 'project',
  },
  // ... autres entrées
]
```

### Layout
```
[label "02 — Parcours"]

2024 →  ●────────────────  Creative Developer
                           Freelance · Lille
                           Description...

2024    ●────────────────  SkillSwap
                           Projet personnel
                           Description...

2023    ●────────────────  ...
```

### Détail visuel
```css
/* Ligne verticale de connexion */
.timeline__connector {
  display: flex; flex-direction: column; align-items: center;
  width: 1px;
}
.timeline__dot  { width: 8px; height: 8px; border-radius: 50%;
                  background: var(--clr-accent); flex-shrink: 0; }
.timeline__line { width: 1px; flex: 1; background: var(--border); margin-top: 8px; }

/* Année */
.timeline__year { font-family: var(--font-mono); font-size: var(--text-xs);
                  color: var(--clr-accent); letter-spacing: 0.1em; width: 5rem; flex-shrink: 0; }

/* Type badge */
[data-type="project"] .timeline__dot { background: var(--text-3); }
[data-type="education"] .timeline__dot { border: 1px solid var(--clr-accent);
                                          background: transparent; }
```

### Animation GSAP
```typescript
// Chaque entrée : opacity 0→1, x -20→0, stagger 0.12s
// scrollTrigger start: "top 70%"
// toggleActions: "play none none reverse"
```

---

## [04] PROJECTS

### Objectif
Montrer le travail sans diluer. Pas de cards — une liste éditoriale.
Chaque projet est un statement. L'image arrive au hover, pas par défaut.

### Layout complet
```
[label "03 — Projets"]

────────────────────────────────────────────────────── (border-top)

01          HUMAN_WORK_FORCE                         ↗
            _Les IA embauchent des humains.
            _React 19 · TypeScript · i18n
            _2024 → live

────────────────────────────────────────────────────── (separator)

02          DASHBOARD_RCH
            _Données de marché en temps réel.
            _React · D3.js · WebSocket
            _2024 → live

────────────────────────────────────────────────────── (separator)

... (6 projets au total)
```

### Comportement hover desktop
```
1. Fond ligne : transparent → rgba(var(--bg-2), 0.6)
2. Numéro "01" : var(--text-3) → var(--clr-accent)
3. Titre : translateX(0 → 8px), 300ms ease-out-expo
4. "↗" : translateY(-2px) + rotate(-8deg) + color accent
5. Image preview : apparaît en position fixed/absolute 320×200px
   → AnimatePresence : opacity 0→1, scale 0.92→1, 250ms
```

### Image preview (desktop only)
```tsx
// Composant ProjectImagePreview
// position: fixed, right: var(--section-x), top: 50%
// Dépend du projet actif (state remonté dans Projects.tsx)
// Masqué sur mobile (pointer: coarse → display:none)
// Placeholder élégant si image manquante :
//   fond var(--bg-2), initiales du projet, font-mono text-xs
```

### Ordre des projets
```
1. Human Work Force     ← featured, position 1 toujours
2. Dashboard RCH
3. SkillSwap
4. Sneakara
5. César Lézard
6. Monority Base
```

---

## [05] CONTACT

### Objectif
Clore le portfolio avec impact. Une seule action évidente.
Inspiré scalzodesign.be — grand, épuré, mémorable.

### Layout
```
[fond var(--bg-2) — différent du reste pour marquer la fin]

        Travaillons
        ensemble.

        contact@ronanchenu.dev

        [GitHub ↗]   [LinkedIn ↗]

        LILLE, FRANCE · REMOTE · ● DISPONIBLE CDI
```

### Typographie
```
"Travaillons"   → Syne, clamp(3rem,8vw,7rem), weight 800
"ensemble."     → idem, "." en var(--clr-accent)
Email           → JetBrains Mono, text-base, hover-line animé
Liens           → SVG inline 20px + texte, hover translateY(-3px)
Meta            → label-caps
```

### Animation
```typescript
// TextReveal (clip-path) sur "Travaillons" puis "ensemble."
// stagger 0.2s entre les deux lignes
// Déclenché whileInView, once: true
```

---

## SEO & Metadata — `app/layout.tsx`

```typescript
export const metadata = {
  title: 'Ronan Chenu — Creative Developer',
  description:
    'Creative developer basé à Lille. Je fais la jonction entre le design et l\'ingénierie.',
  openGraph: {
    title: 'Ronan Chenu — Creative Developer',
    description: 'Interfaces pensées produit, construites pour durer.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ronan Chenu — Creative Developer',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
}
```
