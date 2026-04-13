# STACK REQUIREMENTS — Ronan Chenu Portfolio

## Core
- Next.js (App Router, mandatory)
- React (full)
- TypeScript (strict mode, no any)

## Styling
- Tailwind CSS ONLY
- No CSS modules
- No inline styles (except edge cases)
- Design tokens via tailwind config (cf. DESIGN_TOKENS.json)

## Utilities
- clsx (conditional classes)
- tailwind-merge (class merging)
- No styled-components

## Animations
- Minimal Version: Framer Motion (subtil)
- Design/Artist Version:
  - GSAP + ScrollTrigger pour scroll-based reveals (opacity 0→1, y:50→0, ease "power2.out")
  - Framer Motion (React) pour UI interactions (hover, modals)
  - CSS transitions for basic stuff

## i18n (CRITICAL)
- next-intl REQUIRED
- All text must be translatable
- No hardcoded strings in components
- Use translation keys: t('hero.title')

## Performance
- Next.js Image (WebP/AVIF, blur placeholder)
- Lazy load images
- No heavy JS bundles
- Minimal Version: minimal JS
- Design Version: Lighthouse 90+, LCP <2s, Core Web Vitals 90+

## SEO/i18n
- Métadonnées dynamiques, alt texts, structured data
- next-intl pour traduction

## Code Rules
- Clean components: max 200 lignes
- Reusable patterns
- No prop drilling
- Composition over inheritance
- Functional components only

## Folder Structure
```
src/
├── app/
│   ├── minimal/        # Version A - One Screen
│   │   └── page.tsx
│   ├── design/         # Version B - Creative
│   │   └── page.tsx
│   └── layout.tsx
├── components/
│   ├── minimal/        # Version A components
│   ├── design/         # Version B components
│   └── shared/         # Composants partagés
```

## Forbidden
- Bootstrap
- MUI
- Styled Components
- Emotion
- Heavy UI frameworks