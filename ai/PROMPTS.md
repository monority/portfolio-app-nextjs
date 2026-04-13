# PROMPTS — Ronan Chenu Portfolio

## PROMPT 1 — GENERATION

Tu es un Creative Developer Senior + Designer.
Tu génères des composants Next.js + Tailwind pour un portfolio créatif.

### Quelle version ?

#### VERSION A — MINIMAL (One Screen)
**Objectif**: Tout sur un écran (100vh max), ultra épuré, CV moderne.

Contraintes strictes :
- Header (logo + nav) + Hero + Projects list + Contact = TOUT visible sans scroll
- Max 4-5 projets affichés
- Typographie: 1 font family, 3-4 tailles max
- Couleurs: palette définie (bg: #f7f6f3, text: #1a1a18, muted: #6b6b6b)
- Spacing: uniforme, grid strict
- Animations subtiles autorisées
- Layout: vertical stack, centré, max-width 600px
- NO decorations, NO bg shapes, NO flourish

#### VERSION B — DESIGN/ARTIST (Creative)
**Objectif**: Style Salman GSamar, créatif senior, emotions, art direction.

Contraintes strictes :
- Scroll allowed (page complète)
- Typographie: expressive, headlines forts, plusieurs weights
- Couleurs: palette définie dans DESIGN_TOKENS.json avec accent color
- Spacing: rhythmique,varié (petit/grand/petit/grand)
- Animations: fade-in on scroll, hover states, transitions fluides
- Layout: asymmetry possible, grid breaks, interesting compositions
- Feelings: émotion, storytelling, chaque section a une identité
- References: https://salmangsamar.com/, awwwards, éditorial design

### Analyse commune à faire :
- Layout structure (grille, alignement)
- Spacing (marges, padding, gaps - BASE 8px)
- Typographie (font, size, weight, line-height, letter-spacing)
- Hiérarchie visuelle (ordre de lecture, focalisation)
- Couleurs (palette, contrastes)
- Animations (timing, easing, triggers)

### Contraintes absolues (LES DEUX VERSIONS)
- Utilise DESIGN_TOKENS.json pour toutes les valeurs
- Respecte COMPONENT_CONTRACTS.md à la lettre
- TypeScript strict
- Semantic HTML
- Responsive (mobile + desktop)
- Pixel perfect

---

## PROMPT 2 — IMPROVEMENT

Améliore le rendu selon la version demandée :

### MINIMAL → Optimisations
- Réduire si trop d'éléments
- Renforcer hiérarchie avec size/weight
- Garder spacing uniforme
- Tester: est-ce que tout tient sur UN écran ?

### DESIGN/ARTIST → Optimisations
- Ajouter du rhythm dans le spacing
- Renforcer typographie (plus grosses headlines)
- Vérifier animations (subtiles mais présentes)
- Tester: est-ce que ça ressenti "créatif senior" ?

Garde le minimalisme strict dans les deux cas.

---

## PROMPT 3 — QA

Analyse le code selon QA_CHECKLIST.md.

Pour MINIMAL: ajouter vérification "tout tient sur 100vh"
Pour DESIGN/ARTIST: ajouter vérification "ressenti premium/art direction"

Liste les erreurs puis corrige-les.