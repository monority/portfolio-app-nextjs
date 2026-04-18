# 06 — Interactions

## Catalogue complet des interactions

---

## Header

### Hide/Show au scroll
```typescript
// useScrollDirection hook
// scroll down > 80px → translateY(-100%), opacity 0.8
// scroll up → translateY(0), opacity 1
// Transition : 300ms var(--ease-smooth)
// Fond : transparent → backdrop-filter:blur(12px) après 80px

const isHidden = direction === 'down'
// style={{ transform: isHidden ? 'translateY(-100%)' : 'translateY(0)' }}
```

### Icônes de contact
```css
.nav-icon-link {
  color: var(--text-2);
  transition: color var(--dur-fast) ease,
              transform var(--dur-fast) var(--ease-elastic);
}
.nav-icon-link:hover {
  color: var(--text);
  transform: translateY(-3px);
}
```

### Toggle dark/light
```tsx
// Icône : SunIcon ↔ MoonIcon
// Click : rotation 180deg + fade crossfade
// Framer Motion AnimatePresence + key sur l'icône
// Persistance : localStorage 'theme'
// Init : prefers-color-scheme si pas de localStorage
```

### Toggle i18n
```tsx
// Label "FR" ↔ "EN" avec GlobeIcon
// Click : fade opacity 0→1 sur le label
// Persistance : localStorage 'lang'
// Défaut : 'fr'
```

---

## Hero

### Scroll indicator
```css
.hero__arrow {
  animation: float 2s ease-in-out infinite;
}
@keyframes float {
  0%,100% { transform: translateY(0); }
  50%      { transform: translateY(8px); }
}
```

### Parallax photo
```typescript
// Framer Motion useScroll (cible la section hero)
// scrollYProgress 0→0.4 → y 0→-30px (photo remonte plus vite que le texte)
// Sensation de profondeur légère
```

### Disponibilité dot
```css
.dot--pulse {
  width: 8px; height: 8px;
  border-radius: 50%;
  background: #22c55e;
  animation: pulse 2s ease-in-out infinite;
}
@keyframes pulse {
  0%,100% { transform: scale(1); opacity: 1; }
  50%     { transform: scale(1.4); opacity: 0.6; }
}
```

---

## Projets — interactions ligne

### Hover complet
```typescript
// State: hoveredId string | null (géré dans Projects.tsx)

// Sur chaque ProjectEntry (CSS) :
.project-entry__num {
  transition: color var(--dur-fast) ease;
}
.project-entry.is-hovered .project-entry__num {
  color: var(--clr-accent);
}

.project-entry__body {
  transition: transform var(--dur-base) var(--ease-out-expo);
}
.project-entry.is-hovered .project-entry__body {
  transform: translateX(8px);
}

.project-entry__link {
  transition: color var(--dur-fast) ease,
              transform var(--dur-fast) var(--ease-elastic);
}
.project-entry.is-hovered .project-entry__link {
  color: var(--clr-accent);
  transform: translateY(-2px) rotate(-8deg);
}

/* Fond ligne */
.project-entry {
  transition: background var(--dur-fast) ease;
}
.project-entry.is-hovered {
  background: var(--bg-2);
}
```

### Image preview flottante
```typescript
// Composant ProjectImagePreview
// position: fixed, right: var(--section-x), top: 50%, transform: translateY(-50%)
// pointer-events: none
// Désactivé si matchMedia('(pointer: coarse)').matches

// Framer Motion AnimatePresence :
// initial:  { opacity: 0, scale: 0.92, y: '-45%' }
// animate:  { opacity: 1, scale: 1,    y: '-50%' }
// exit:     { opacity: 0, scale: 0.95, y: '-48%' }
// transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] }

// Contenu :
// - Image 320×200px, object-fit: cover, border-radius: var(--radius-md)
// - Border: 1px solid var(--border)
// - Placeholder fond var(--bg-2) + initiales projet si image manquante
```

---

## Magnetic button

```typescript
// Applicable à tout élément avec le wrapper MagneticButton
// Zone d'attraction : radius 60px autour du centre
// Force : 0.3 (configurable)
// Lerp spring : stiffness 150, damping 15 (Framer Motion useSpring)

// Hover CSS en plus du magnetic :
.magnetic-btn:hover {
  color: var(--clr-accent);
}
```

---

## Curseur custom

```css
/* Body quand curseur custom actif */
body.cursor-none * { cursor: none; }

/* Le curseur */
.custom-cursor {
  position: fixed;
  top: -5px; left: -5px;
  width: 10px; height: 10px;
  border-radius: 50%;
  background: var(--text);
  opacity: 0.7;
  pointer-events: none;
  z-index: var(--z-cursor);
  will-change: transform;
  /* transform géré en JS via lerp */
}

/* État hover lien/bouton */
.custom-cursor.is-hovering {
  transform: scale(2.5) !important;
  mix-blend-mode: difference;
  opacity: 1;
}
```

```typescript
// Détection hover sur <a> et <button>
const interactives = document.querySelectorAll('a, button')
interactives.forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('is-hovering'))
  el.addEventListener('mouseleave', () => cursor.classList.remove('is-hovering'))
})
```

---

## Timeline

### Révélation au scroll
```typescript
// GSAP ScrollTrigger sur chaque entrée
// opacity: 0 → 1, x: -24 → 0
// Duration: 0.7s, stagger: 0.12s
// start: "top 75%"
// toggleActions: "play none none reverse"
```

### Ligne de connexion
```css
/* La ligne verticale entre les dots grandit au scroll */
.timeline__line {
  height: 0;
  transition: height 0.6s var(--ease-out-expo);
}
/* Quand l'entrée est visible */
.timeline__entry.is-visible .timeline__line {
  height: 100%;
}
```

---

## Texte — animations

### Hover underline (liens)
```css
.hover-line {
  background-image: linear-gradient(currentColor, currentColor);
  background-size: 0% 1px;
  background-repeat: no-repeat;
  background-position: left bottom;
  transition: background-size var(--dur-base) var(--ease-out-expo);
  padding-bottom: 2px;
}
.hover-line:hover { background-size: 100% 1px; }
```

### Hover tag tech
```css
.tech-tag {
  position: relative;
  overflow: hidden;
  background: transparent;
  border: 1px solid var(--border);
  transition: border-color var(--dur-fast) ease,
              color var(--dur-fast) ease;
}
.tech-tag::before {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--bg-2);
  transform: translateX(-101%);
  transition: transform var(--dur-base) var(--ease-out-expo);
}
.tech-tag:hover::before { transform: translateX(0); }
.tech-tag:hover { border-color: var(--text-3); }
```

---

## Stack — icônes SVG colorées

```typescript
// Hover sur chaque item de la stack :
// - icône : scale(1.1), 150ms var(--ease-elastic)
// - item : translateX(4px), 150ms
// - point niveau : color var(--text-3) → var(--clr-accent) si expert

// CSS :
.stack-item { transition: transform var(--dur-fast) ease; }
.stack-item:hover { transform: translateX(4px); }
.stack-item:hover .tech-icon { transform: scale(1.1); }
```

---

## Contact

### Email hover
```css
.contact__email {
  font-family: var(--font-mono);
  color: var(--text-2);
  transition: color var(--dur-fast) ease,
              transform var(--dur-fast) ease;
}
.contact__email:hover {
  color: var(--text);
  transform: translateY(-1px);
}
/* + hover-line class pour l'underline animé */
```

### Liens sociaux footer
```css
.contact__social {
  display: flex; align-items: center; gap: 0.5rem;
  color: var(--text-2);
  transition: color var(--dur-fast) ease,
              transform var(--dur-fast) var(--ease-elastic);
}
.contact__social:hover {
  color: var(--text);
  transform: translateY(-3px);
}
```

---

## Micro-interactions — résumé

| Élément | Trigger | Comportement |
|---|---|---|
| Header | scroll down >80px | `translateY(-100%)` |
| Nav icon | hover | `translateY(-3px)`, color white |
| Dark toggle | click | rotation 180°, fade icône |
| i18n toggle | click | fade label FR↔EN |
| Hero photo | scroll | parallax `y: 0→-30px` |
| Scroll indicator | loop | float `translateY 0↔8px` |
| Dispo dot | loop | scale pulse |
| Projet ligne | hover | num→accent, body+8px, ↗ rotate |
| Image preview | hover | appear scale 0.92→1 |
| Magnetic btn | hover | spring attract |
| Curseur | hover link | scale 2.5 + blend-mode:difference |
| Timeline entry | inView | x -24→0, opacity 0→1 |
| Lien | hover | underline slide |
| Tech tag | hover | fill slide |
| Stack item | hover | translateX 4px |
| Email contact | hover | translateY -1px + underline |
