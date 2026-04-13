# GLOBAL RULES — Ronan Chenu Portfolio

## DEUX VERSIONS

---

## VERSION A — MINIMAL

### Mandatory
- Pixel perfect
- 100vh max (pas de scroll)
- Suivre DESIGN_TOKENS.json

### Layout
- Container centré, max-width 640px
- Grid strict, spacing uniforme
- Tout visible sans scroll

### UI
- Minimal maximal
- Pas de decorations
- Pas d'animations

### Dev
- Clean code
- TypeScript strict
- Semantic HTML

---

## VERSION B — DESIGN/ARTIST

### Mandatory
- Pixel perfect
- Suivre DESIGN_TOKENS.json
- Suivre COMPONENT_CONTRACTS.md
- Respecter ART_DIRECTION.md

### Layout
- Container centré (max-width varies selon section)
- Responsive: 640px, 768px, 1024px, 1280px
- Mobile first: design mobile puis desktop
- Spacing rhythmé (pas uniforme)

### UI
- Pas de SaaS patterns
- Pas de bruit visuel
- Un seul accent color max
- Typographie expressive

### Dev
- Clean code: toujours
- No duplication: DRY
- Semantic HTML: section, article, nav, main
- TypeScript strict: jamais any
- Accessibility: aria-labels, focus states

### Forbidden Patterns (LES DEUX)
- Gradients everywhere
- Overly rounded corners (max 8px)
- Too many shadows
- Too many colors
- Complex/bouncy animations
- Unnecessary modals
- Heavy frameworks
- Templates/SaaS look

### Performance
- Lighthouse 90+ (performance)
- Lazy load images
- No heavy JS
- Use Astro Image


### Statut

ecrire les étapes au fur et a mesure dans progress.md