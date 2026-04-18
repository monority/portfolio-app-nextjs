# 07 — Performance

## Objectifs

| Métrique | Cible |
|---|---|
| LCP | < 1.5s |
| FID / INP | < 100ms |
| CLS | < 0.05 |
| Lighthouse Score | > 95 |
| Bundle JS initial | < 150kb gzippé |

---

## Next.js — optimisations

### Images
```tsx
// Toujours <Image /> de next/image — jamais <img> natif
import Image from 'next/image'

// Obligatoire :
// - width + height explicites (évite CLS)
// - format: webp ou avif (next.config.ts)
// - priority sur les images above the fold (hero uniquement)
// - loading="lazy" pour toutes les autres (défaut)
// - sizes pour les images responsive

<Image
  src="/images/avatar.webp"
  alt="Ronan Chenu"
  width={280} height={280}
  priority              // ← hero only
  sizes="(max-width: 768px) 140px, 280px"
/>

<Image
  src={project.visual}
  alt={project.titleDisplay}
  width={320} height={200}
  loading="lazy"        // ← below fold
  sizes="320px"
/>
```

### Dynamic imports
```typescript
// Sections below the fold → dynamic import
// Composants lourds → dynamic import

import dynamic from 'next/dynamic'

// Sections below the fold
const Projects = dynamic(() => import('@components/sections/Projects'), {
  loading: () => <div style={{ minHeight: '400px' }} />, // skeleton hauteur fixe
})
const Contact  = dynamic(() => import('@components/sections/Contact'))

// WebGL — client only, toujours ssr:false
const NoiseBackground = dynamic(
  () => import('@components/canvas/NoiseBackground'),
  { ssr: false, loading: () => null }
)
const FloatingSphere  = dynamic(
  () => import('@components/canvas/FloatingSphere'),
  { ssr: false, loading: () => null }
)
```

### Fonts
```typescript
// app/layout.tsx — Next.js Font Optimization
// OU auto-hébergement avec @font-face dans globals.css

// Option 1 : Google Fonts via next/font (recommandé)
import { Syne, Inter, JetBrains_Mono } from 'next/font/google'

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
})
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})
const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['400', '500'],
})

// Appliquer sur <html> :
<html lang="fr" className={`${syne.variable} ${inter.variable} ${jetbrains.variable}`}>

// Option 2 : auto-hébergement woff2 (meilleure perf, zéro dépendance externe)
// Fichiers dans /public/fonts/
// @font-face dans globals.css avec font-display: swap
```

### Metadata et SEO
```typescript
// app/layout.tsx
export const metadata: Metadata = {
  metadataBase: new URL('https://ronanchenu.vercel.app'),
  // ... (voir 05-pages.md pour le détail)
}
```

---

## Code splitting

### Règle des sections
```
ABOVE FOLD (import normal, pas de lazy) :
  ✅ Header.tsx
  ✅ Hero.tsx

BELOW FOLD (dynamic import) :
  ✅ About.tsx        → léger, ok en dynamic
  ✅ Timeline.tsx     → dynamic
  ✅ Projects.tsx     → dynamic
  ✅ Contact.tsx      → dynamic

CLIENT ONLY (ssr: false) :
  ✅ NoiseBackground.tsx   → WebGL
  ✅ FloatingSphere.tsx    → WebGL
  ✅ CustomCursor.tsx      → window API
```

### Librairies lourdes — import partiel
```typescript
// GSAP — importer uniquement ce qui est utilisé
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
// NE PAS : import { gsap, ScrollTrigger, ... } from 'gsap/all'

// Three.js — tree-shakeable si utilisé via R3F
import { Canvas } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
// NE PAS : import * as THREE from 'three'

// simple-icons — importer chaque icône individuellement
import { siReact, siNodedotjs } from 'simple-icons'
// NE PAS : import * as si from 'simple-icons'
```

---

## Animations — performance

### GPU only (règle absolue)
```
✅ transform: translate/scale/rotate
✅ opacity
✅ clip-path
✅ filter (sparingly)

❌ top, left, right, bottom
❌ width, height
❌ margin, padding en animation
```

### will-change — usage strict
```css
/* Appliquer uniquement aux éléments en cours d'animation */
/* Framer Motion le gère automatiquement */
/* Manuellement : uniquement si nécessaire prouvé */
.hero__photo { will-change: transform; }

/* Retirer après l'animation via onAnimationComplete */
```

### Lenis — optimisations
```typescript
const lenis = new Lenis({
  duration: 1.2,
  easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: 'vertical',
  smoothWheel: true,
  // NE PAS activer smoothTouch — dégradé perf sur iOS
})

// Un seul ticker, pas de RAF séparé
gsap.ticker.add(time => lenis.raf(time * 1000))
gsap.ticker.lagSmoothing(0)
```

### GSAP — cleanup obligatoire
```typescript
useEffect(() => {
  const ctx = gsap.context(() => {
    // Toutes les animations GSAP ici
  }, containerRef)

  return () => ctx.revert() // Cleanup au unmount
}, [])
```

### ScrollTrigger — éviter les recalculs
```typescript
ScrollTrigger.config({ ignoreMobileResize: true })

// Après resize : debounce + refresh
const handleResize = debounce(() => ScrollTrigger.refresh(), 250)
window.addEventListener('resize', handleResize)
```

### prefers-reduced-motion
```typescript
// Hook Framer Motion
import { useReducedMotion } from 'framer-motion'
const shouldAnimate = !useReducedMotion()

// CSS global (dans globals.css)
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
  }
  .grain::after { display: none; }
}
```

---

## WebGL — limites de performance

```typescript
// Toujours limiter le pixel ratio
<Canvas dpr={[1, 1.5]}>  // jamais window.devicePixelRatio brut

// Désactiver sur mobile si perf insuffisante
const isLowPerf = typeof navigator !== 'undefined'
  && (navigator.hardwareConcurrency <= 4
      || /Android|iPhone/i.test(navigator.userAgent))

// Désactiver si prefers-reduced-motion
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

if (isLowPerf || prefersReduced) return null // pas de WebGL
```

---

## Checklist avant déploiement

### Build
```bash
next build          # 0 erreurs TypeScript
next lint           # 0 warnings ESLint
```

### Images
- [ ] Toutes les images en `.webp` (800×600 min pour projets, 400×400 pour avatar)
- [ ] `priority` uniquement sur la photo hero
- [ ] `alt` descriptif sur toutes les images
- [ ] Aucun `<img>` natif

### Fonts
- [ ] `font-display: swap` sur toutes les fonts
- [ ] Preload des fonts critiques (Syne + Inter)
- [ ] Pas de font externe en runtime (tout auto-hébergé ou next/font)

### JavaScript
- [ ] 0 `console.log` en production
- [ ] Dynamic imports sur toutes les sections below fold
- [ ] `ssr: false` sur tous les composants WebGL
- [ ] Cleanup dans tous les `useEffect` (GSAP ctx.revert, lenis.destroy, etc.)

### Accessibilité
- [ ] `alt` sur toutes les images
- [ ] `aria-label` sur tous les liens icônes
- [ ] Focus visible sur tous les éléments interactifs
- [ ] Contraste WCAG AA sur tous les textes
- [ ] `prefers-reduced-motion` respecté
- [ ] Navigation au clavier fonctionnelle

### SEO
- [ ] `<title>` unique
- [ ] Meta description
- [ ] OG image 1200×630
- [ ] `lang` sur `<html>`
- [ ] Sitemap (optionnel pour one-pager)

### Vercel
```bash
# Variables d'environnement si nécessaire
# Aucune variable sensible dans le code
# NEXT_PUBLIC_ pour les vars exposées au client
```
