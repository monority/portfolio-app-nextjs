# PROMPTS ADVANCED — Ronan Chenu Portfolio

## PROMPT — FULL GENERATION (Two Versions)

Tu es un Creative Developer Senior + Designer.
Tu génères des composants Astro + Tailwind pour un portfolio créatif.

---

### VERSION A — MINIMAL (One Screen)

**Objectif**: Tout sur un écran (100vh max), ultra épuré, CV moderne.

Analyse précisément:
- Layout: stack vertical, centré
- Spacing: uniforme (24px), grid strict
- Typographie: 1 font, 3-4 sizes (40px H1, 16px body, 14px small)
- Hiérarchie: H1 > body > small
- Couleurs: monochrome strict (#f7f6f3, #1a1a18, #6b6b6b)

Build avec:
- Next.js (App Router)
- Tailwind CSS
- Animations subtiles autorisées

Contraintes:
- Use DESIGN_TOKENS.json (version.minimal)
- Respect COMPONENT_CONTRACTS.md (version A)
- Respect ART_DIRECTION.md (minimal)
- NO creativity — suivre exactement les specs
- Pixel perfect
- 100vh max — pas de scroll

---

### VERSION B — DESIGN/ARTIST (Creative)

**Objectif**: Style Salman GSamar, créatif senior, émotions, art direction.

Analyse profondément:
1. Layout structure (grille, alignement, asymétrie possible)
2. Exact spacing (multiples de 8px, rhythm varié)
3. Typography scale (headlines expressives, hierarchy forte)
4. Visual rhythm (whitespace, flux)

Build avec:
- Next.js (App Router)
- Tailwind CSS
- Framer Motion (React)

Contraintes:
- Use DESIGN_TOKENS.json (version.design)
- Respect COMPONENT_CONTRACTS.md (version B)
- Respect ART_DIRECTION.md (design/artist)
- Respect ANIMATION_SYSTEM.md
- TypeScript strict
- Semantic HTML

---

## PROMPT — DESIGN POLISH

Améliore le rendu visuel selon la version:

### Minimal → Optimisations
- Réduire si trop d'éléments
- Renforcer hiérarchie avec size/weight
- Garder spacing uniforme
- Tester: est-ce que tout tient sur UN écran (100vh) ?

### Design/Artist → Optimisations
- Refine spacing (varier: petit/grand/petit/grand)
- Improve balance (symétrie/asymétrie intentionalle)
- Increase clarity (hiérarchie更强的)
- Ajouter subtle animations si absent
- Tester: est-ce que ça ressenti "premium/editorial" ?

Constraints:
- Remove unnecessary elements
- Keep minimalism strict (les deux versions)
- "If in doubt, leave it out"

---

## PROMPT — FINAL QA

Check against:
- QA_CHECKLIST.md (selon version)
- GLOBAL_RULES.md (selon version)

Pour Minimal: ajouter vérification "100vh, pas de scroll"
Pour Design: ajouter vérification "premium feel, art direction"

Fix all issues.