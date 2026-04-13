# QA CHECKLIST — Ronan Chenu Portfolio

## DEUX VERSIONS

---

## VERSION A — MINIMAL

### FAIL Immediate (Rejeter si présent)
- [ ] Scroll présent (doit tenir sur 100vh)
- [ ] Plus de 5 éléments principaux
- [ ] Images grandes (doit être liste texte ou miniatures)
- [ ] Animations présentes
- [ ] Couleurs autres que monochrome
- [ ] Decorations/shapes présents
- [ ] Spacing inégal

### PASS (Acceptable)
- [ ] Tout tient sur un écran (100vh max)
- [ ] Typographie lisible
- [ ] Hiérarchie claire (H1 plus gros que body)
- [ ] Layout centré
- [ ] Clean et professionnel

### Debug Steps
1. Vérifier: est-ce que ça tient sur 100vh ? (resize browser)
2. Vérifier: pas de scroll ? (overflow: hidden)
3. Vérifier: monochrome strict ?
4. Vérifier: spacing uniforme ?

---

## VERSION B — DESIGN/ARTIST

### FAIL Immediate (Rejeter si présent)
- [ ] Spacing incorrect (pas multiples de 8px)
- [ ] Too many elements (plus de 5-7 par section)
- [ ] SaaS look (gradients, shadows everywhere, too colorful)
- [ ] No hierarchy (tout mismo size)
- [ ] Broken responsive
- [ ] Missing alt text
- [ ] TypeScript errors
- [ ] Console errors
- [ ] Animations trop flashy
- [ ] Trop de couleurs (plus de 4)
- [ ] Gradients présents
- [ ] Templates/SaaS patterns

### PASS (Acceptable)
- [ ] Clean layout
- [ ] Strong hierarchy (headings plus gros que body)
- [ ] Minimal design
- [ ] Proper spacing (multiples de 8)
- [ ] Good typography
- [ ] Subtle animations
- [ ] Working responsive
- [ ] Premium feel
- [ ] Art direction présente

### Premium Checklist (Niveau Salman/Awwwards)
- [ ] Typo parfaitement alignée
- [ ] Espaces cohérents entre sections (multiples de 8px)
- [ ] Couleurs cohérentes (max 3-4, accents précis)
- [ ] Animations subtiles et fluides (GSAP ScrollTrigger, Framer hover)
- [ ] Hover states présents (opacity, scale, reveal)
- [ ] Mobile parfaitement conçu (responsive grid, touch)
- [ ] Pas d'éléments inutiles
- [ ] Rhythm dans le spacing (varié, pas monotone)
- [ ] Storytelling visuel présent (timeline, modals, galleries)

### Debug Steps (Design Version)
1. Vérifier spacing (DEV tools → mesurer en px, multiple de 8 ?)
2. Vérifier responsive (resize browser à 640px, 768px, 1024px)
3. Vérifier animations (scroll GSAP, hover Framer) — subtiles ?
4. Vérifier typographie (Inter font, scale 14-96px, line-height)
5. Vérifier accèsibilité (tab navigation, contrast, alt texts)
6. Vérifier hierarchy visuelle (scanner la page — ordre clair ?)
7. Vérifier storytelling (hero → timeline → projects → about → contact)
8. Feeling test: est-ce que ça fait "prémium" ou "template" ?

---

## COMMUN (Les deux)

### Dev QA
- [ ] TypeScript strict pass
- [ ] ESLint pass
- [ ] Build successful
- [ ] No console errors
- [ ] Semantic HTML correct

### Performance
- [ ] Images optimized (Astro Image)
- [ ] Lazy load working
- [ ] No heavy JS bundles
- [ ] Lighthouse 90+