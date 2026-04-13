# COMPONENT CONTRACTS — Ronan Chenu Portfolio

## DEUX VERSIONS

---

## VERSION A — MINIMAL (One Screen, 100vh)

### Conteneur Global
- Max-height: 100vh (pas de scroll)
- Max-width: 640px, centré
- Padding: 24px (mobile), 48px (desktop)
- Background: #f7f6f3 (warm white)

### Header
- Logo (texte): "Ronan Chenu" — top-left
- Nav (minimal): Projects | Contact — top-right
- Font: même que body, 14px, uppercase
- Position: fixed ou sticky dans le container
- Height: max 60px

### Hero
- Position: sous header, partie haute
- Éléments: H1 + tagline
- H1: "Creative Developer" ou "Ronan Chenu"
- Tagline: une ligne max
- Align: left ou center
- Size: H1 32-48px, Tagline 16px
- Color: text #1a1a18, muted #6b6b6b

### Projects (Mini List)
- Position: milieu de page
- Max 4-5 projets seulement
- Format: texte list (pas de grandes images)
- Layout: vertical list, 24px gap
- Éléments par item: Project name + category
- Hover: underline ou opacity change
- Click: scroll to contact ou modal

### Contact
- Position: bas de page
- Éléments: Email (gros) + petit texte
- Email: link direct mailto:
- Size: email 20-24px,体重 bold

### Pas de:
- Pas de grandes images
- Pas de scrolls
- Pas d'animations complexes
- Pas de decorations
- Pas de background shapes

---

## VERSION B — DESIGN/ARTIST (Creative, Immersive)

### HERO
- Full viewport height (100vh) ou large (80vh min)
- Éléments: H1 (gros), subtitle, CTA, optional background image/illustration
- Layout: créatif, peut être asymétrique
- Typographie: expressive, headlines 64-96px
- Spacing: rhythmé
- Animation: fade-in séquence (H1 → subtitle → CTA)
- Background: possible shapes, images, particles optionnelles

**Props:**
- title: string (obligatoire)
- subtitle: string (optionnel)
- cta: { label: string, href: string }
- image: { src: string, alt: string } (optionnel)
- showParticles: boolean (optionnel)
- align: 'left' | 'center' | 'right'

### PROJECT CARD (Grid)
- Éléments: image (grande), title, category, year
- Layout: image top (ou left), texte bottom (ou overlay)
- Aspect: 4:3 ou 16:9 ou carré
- Hover: scale(1.02), opacity change, possible overlay reveal
- Grid: 2 columns (desktop), 1 column (mobile)
- Gap: 24px ou 32px

**Props:**
- title: string
- category: string
- year: string
- image: { src: string, alt: string }
- href: string
- layout: 'stack' | 'overlay'

### PROJECT SHOWCASE (Single)
- Pour un projet en particulier
- Images multiples, scroll horizontal possible
- Description longue, Credits
- Layout: full width, aéré

**Props:**
- title: string
- category: string
- year: string
- description: string
- images: { src: string, alt: string }[]
- credits: string[]
- tech: string[]
- link: string

### SECTION (Content Block)
- One idea only
- Spacing: large (120px+ entre sections)
- Max-width: 800px (texte), full (images)
- Padding: 48px (mobile), 80px (desktop)
- Typographie: headline + body + optional CTA

**Props:**
- title: string
- content: string
- cta: { label: string, href: string } (optionnel)
- align: 'left' | 'center'

### NAVIGATION
- Minimal: logo (gauche) + links (droite)
- Position: sticky ou fixed
- Background: transparent ou blur (#f7f6f3/80 with backdrop-blur)
- Links: uppercase, small (12-14px), spaced (24px+)
- Mobile: hamburger menu

**Props:**
- logo: string
- links: { label: string, href: string }[]
- variant: 'transparent' | 'solid' | 'blur'

### FOOTER
- Minimal: copyright + links
- Grande marge: 120px+ du contenu
- Links simples (LinkedIn, GitHub, Email)
- Optional: "Made with..." ou small credit
- Layout: flex, space-between

**Props:**
- copyright: string
- links: { label: string, href: string }[]
- socialLinks: { platform: string, href: string }[]

### TIMELINE (Design Version)
- Horizontal layout avec dates, icons, descriptions
- Hover tooltips pour détails
- Animation: scroll reveal

**Props:**
- items: { date: string, icon: string, title: string, description: string }[]

### PROJECT MODAL (Design Version)
- Overlay sombre, close button
- Détails projet: scope, tools, metrics, live link
- Images gallery

**Props:**
- project: { title, scope, tools, metrics, images, link }

### PHOTO GALLERY (Design Version)
- Masonry grid, lazy load, filter catégories
- Lightbox on click

**Props:**
- photos: { src: string, alt: string, category: string }[]
- filters: string[]

### TESTIMONIAL SLIDER (Design Version)
- Carousel Framer Motion, prev/next
- Cursors colorés

**Props:**
- testimonials: { name, rating, quote }[]

### CONTACT (Design Version)
- Section entière, pas juste un bloc
- Grosse typographie pour email
- Petit formulaire (name, email, message) OU juste email link
- Background: différent ou accent

**Props:**
- email: string
- formEnabled: boolean

### TYPOGRAPHY SECTION
- Pour afficher les skills/stack
- Layout: grid ou list
- Format: icons + labels ou just labels
- Style: minimal, petit

**Props:**
- skills: string[]
- variant: 'icons' | 'list' | 'tags'

---

## SHARED (Les deux versions)

### Spacing System
- Base: 8px
- xs: 4px, sm: 8px, md: 16px, lg: 24px, xl: 32px, 2xl: 48px, 3xl: 64px, 4xl: 80px, 5xl: 120px

### Responsive
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px
- Breakpoints: 640px, 768px, 1024px

### No Decorations
- Pas de shapes aléatoires
- Pas de lignes décoratives
- Pas de patterns de fond