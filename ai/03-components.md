# 03 — Composants

## Règles générales

- **< 120 lignes** par fichier. Au-delà : découper.
- **Props typées** avec `interface`, jamais inline.
- **Aucune data** dans les composants — tout vient de `constants/data.ts`.
- **Aucune logique** dans les composants UI — hooks dans `lib/`.
- **Export nommé** pour les composants partagés, `default` pour les pages/sections.

---

## Layout

### `Header.tsx`

Navigation fixe. Se cache au scroll vers le bas, réapparaît vers le haut.

```typescript
// Aucune prop — consomme useTheme, useLang, useScrollDirection
```

**Contenu :**
- Logo texte : `RONAN CHENU` en Syne 600
- Centre (desktop) : 4 icônes SVG inline — GitHub, LinkedIn, Mail, Phone
- Droite : toggle i18n (Globe + "FR|EN"), toggle theme (Sun/Moon), bouton CV

**Comportement :**
```typescript
// useScrollDirection → translateY(-100%) au scroll down, 0 au scroll up
// Fond : transparent → backdrop-filter:blur(12px) après 80px de scroll
// Transition : transform 300ms var(--ease-smooth)
```

**Code du hook `useScrollDirection`**
```typescript
// lib/useScrollDirection.ts
export function useScrollDirection() {
  const [direction, setDirection] = useState<'up' | 'down'>('up')
  const lastY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY
      setDirection(y > lastY.current && y > 80 ? 'down' : 'up')
      lastY.current = y
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return direction
}
```

---

### `Footer.tsx`

Minimal. Année + copyright + liens sociaux.

---

## Sections

### `Hero.tsx`

```typescript
// Aucune prop — consomme PERSON depuis constants/data.ts
```

Composant : layout fullscreen `100dvh`, fond `var(--bg)` + classe `.grain`.

**Structure DOM :**
```tsx
<section className="hero grain">
  {/* WebGL optionnel en position absolute z-0 */}
  <FloatingSphere /> {/* dynamic import, ssr:false */}

  <div className="hero__content">
    <h1 className="hero__title font-display">
      <span className="hero__line hero__line--light">Creative</span>
      <span className="hero__line hero__line--bold">
        Developer<span className="hero__dot">.</span>
      </span>
    </h1>

    <div className="hero__meta">
      <span className="hero__name">Ronan Chenu</span>
      <span className="hero__sep" aria-hidden>·</span>
      <span className="hero__location label-caps">Lille, France</span>
    </div>

    <p className="hero__bio">{person.bio[lang]}</p>

    <div className="hero__cta">
      <MagneticButton href="#projects">
        Voir les projets
      </MagneticButton>
      <span className="hero__availability">
        <span className="dot dot--pulse" aria-hidden />
        {t('nav.available')}
      </span>
    </div>
  </div>

  {/* Photo avec parallax */}
  <motion.div className="hero__photo" style={{ y: photoParallax }}>
    <Image src="/images/avatar.webp" alt="Ronan Chenu"
           width={280} height={280} priority />
  </motion.div>

  <div className="hero__scroll-indicator" aria-hidden>
    <span className="label-caps">scroll</span>
    <span className="hero__arrow">↓</span>
  </div>
</section>
```

**CSS clé :**
```css
.hero { position: relative; min-height: 100dvh; display: grid;
        grid-template-columns: 1fr auto; align-items: center;
        padding: calc(var(--header-h) + var(--space-8)) var(--section-x) var(--space-8); }
.hero__title { font-size: var(--text-hero); line-height: 0.95; letter-spacing: -0.02em; }
.hero__line--light { font-weight: 300; color: var(--text-2); display: block; }
.hero__line--bold  { font-weight: 800; display: block; }
.hero__dot { color: var(--clr-accent); }
.dot--pulse { width:8px; height:8px; border-radius:50%; background:#22c55e;
              animation: pulse 2s ease-in-out infinite; }
@keyframes pulse { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.3);opacity:0.7} }
```

---

### `About.tsx`

Layout asymétrique 12 colonnes. Col 1-7 : bio. Col 9-12 : qualités.

```typescript
// Aucune prop — consomme PERSON, QUALITIES depuis data.ts
```

**Sous-composant `QualityItem`**
```typescript
interface QualityItemProps {
  quality: Quality
  lang: Lang
}
```

---

### `Timeline.tsx`

Storytelling chronologique — inspiré salmangsamar.com.
Chaque entrée révélée au scroll avec GSAP ScrollTrigger.

```typescript
// Aucune prop — consomme TIMELINE depuis data.ts
```

**Structure d'une entrée**
```tsx
<article className="timeline__entry" data-type={entry.type}>
  <div className="timeline__year font-mono">{entry.year}</div>
  <div className="timeline__connector" aria-hidden>
    <div className="timeline__dot" />
    <div className="timeline__line" />
  </div>
  <div className="timeline__body">
    <h3 className="timeline__title font-display">{entry.title}</h3>
    <span className="timeline__subtitle label-caps">{entry.subtitle}</span>
    <p className="timeline__desc">{entry.description[lang]}</p>
  </div>
</article>
```

**Animation GSAP :**
```typescript
// Chaque entrée : opacity 0→1, x -20→0
// scrollTrigger: start "top 80%", toggleActions "play none none reverse"
// stagger 0.1s entre les entrées
```

---

### `Projects.tsx`

**Pas de cards.** Liste éditoriale pleine largeur — style tr.af.
Image preview flottante au hover (desktop).

```typescript
// Aucune prop — consomme PROJECTS depuis data.ts
// State local : hoveredId: string | null
```

**Sous-composant `ProjectEntry`**
```typescript
interface ProjectEntryProps {
  project: Project
  index: number
  lang: Lang
  onHover: (id: string | null) => void
  isHovered: boolean
}
```

**Structure DOM d'une entrée**
```tsx
<article
  className={`project-entry ${isHovered ? 'is-hovered' : ''}`}
  onMouseEnter={() => onHover(project.id)}
  onMouseLeave={() => onHover(null)}
>
  <div className="project-entry__inner">
    <span className="project-entry__num font-mono">{formatIndex(index)}</span>

    <div className="project-entry__body">
      <h3 className="project-entry__title font-display">
        {project.title}  {/* SCREAMING_SNAKE_CASE depuis data */}
      </h3>
      <div className="project-entry__meta font-mono">
        <span>_{project.description[lang].split('.')[0]}.</span>
        <span>_{project.tech.join(' · ')}</span>
        <span className="project-entry__year">_{project.year} → {project.live ? 'live' : 'wip'}</span>
      </div>
    </div>

    {project.live && (
      <a href={project.live} target="_blank" rel="noopener noreferrer"
         className="project-entry__link" aria-label={`Voir ${project.titleDisplay}`}
         onClick={e => e.stopPropagation()}>
        ↗
      </a>
    )}
  </div>
  <div className="project-entry__separator" role="separator" />
</article>
```

**CSS :**
```css
.project-entry { position: relative; }
.project-entry__inner { display: flex; align-items: flex-start; gap: var(--space-6);
                         padding: var(--space-6) 0; }
.project-entry__num   { color: var(--text-3); transition: color var(--dur-fast); width: 2rem; flex-shrink: 0; }
.project-entry__body  { flex: 1; transition: transform var(--dur-base) var(--ease-out-expo); }
.project-entry__title { font-size: var(--text-2xl); font-weight: 800;
                         letter-spacing: -0.01em; line-height: 1.1; }
.project-entry__meta  { font-size: var(--text-xs); color: var(--text-2);
                         margin-top: var(--space-2); display: flex; flex-direction: column; gap: 0.25rem; }
.project-entry__year  { color: var(--text-3); }
.project-entry__link  { color: var(--text-3); font-size: var(--text-lg);
                         transition: all var(--dur-fast) var(--ease-elastic); flex-shrink: 0; }
.project-entry__separator { height: 1px; background: var(--border); }

/* Hover states */
.project-entry.is-hovered .project-entry__num  { color: var(--clr-accent); }
.project-entry.is-hovered .project-entry__body { transform: translateX(8px); }
.project-entry.is-hovered .project-entry__link { color: var(--clr-accent);
                                                   transform: translateY(-2px) rotate(-8deg); }
```

**Image preview flottante**
```typescript
// Composant ProjectImagePreview
// position: fixed (desktop), suit activeId
// AnimatePresence : opacity 0→1, scale 0.92→1, 250ms
// Désactivé sur mobile (pointer: coarse)
```

---

### `Contact.tsx`

Typographie massive. Une seule action. Inspiré scalzodesign.be.

```typescript
// Aucune prop — consomme PERSON, t()
```

**Structure :**
```tsx
<section className="contact">
  <div className="contact__inner container">
    <hgroup className="contact__heading">
      <TextReveal>
        <h2 className="contact__title font-display">
          {t('contact.heading1')}
        </h2>
      </TextReveal>
      <TextReveal delay={0.15}>
        <h2 className="contact__title font-display">
          {t('contact.heading2')}
          <span className="contact__dot">.</span>
        </h2>
      </TextReveal>
    </hgroup>

    <MagneticButton
      href={`mailto:${person.email}`}
      className="contact__email hover-line"
    >
      {person.email}
    </MagneticButton>

    <div className="contact__links">
      <a href={person.github} target="_blank" rel="noopener"
         className="contact__social">
        <GithubIcon size={20} /> GitHub
      </a>
      <a href={person.linkedin} target="_blank" rel="noopener"
         className="contact__social">
        <LinkedinIcon size={20} /> LinkedIn
      </a>
    </div>

    <p className="contact__meta label-caps">{t('contact.meta')}</p>
  </div>
</section>
```

---

## UI atomiques

### `SectionLabel.tsx`
```typescript
interface SectionLabelProps {
  number: string    // "01"
  children: string  // "À propos"
  className?: string
}
// Rendu : "01 — À propos" en label-caps avec trait 40px en dessous
```

### `MagneticButton.tsx`
```typescript
interface MagneticButtonProps {
  children: React.ReactNode
  href?: string          // si défini → <a>, sinon → <button>
  onClick?: () => void
  strength?: number      // défaut 0.3
  radius?: number        // px, défaut 60
  className?: string
}
// Utilise useMagneticEffect hook (lerp sur rAF)
// Désactivé si pointer: coarse (mobile)
```

### `TechIcon.tsx`
```typescript
interface TechIconProps {
  name: string           // clé dans SKILL_ICONS
  size?: number          // défaut 16
  colored?: boolean      // true = couleur brand, false = currentColor
  className?: string
}
// Importe depuis constants/skillIcons.ts
// Rendu : <svg role="img" aria-label={name} fill={colored ? `#${hex}` : 'currentColor'}>
```

### `AnimatedText.tsx`
```typescript
interface AnimatedTextProps {
  children: string
  as?: keyof JSX.IntrinsicElements   // défaut 'p'
  splitBy?: 'word' | 'char'          // défaut 'word'
  delay?: number
  stagger?: number
  className?: string
}
// Utilise Splitting.js pour split le texte
// Framer Motion staggerChildren sur chaque mot/char
// whileInView pour déclencher au scroll
```

### `TextReveal.tsx`
```typescript
interface TextRevealProps {
  children: React.ReactNode
  delay?: number       // secondes, défaut 0
  className?: string
}
// clip-path: inset(0 100% 0 0) → inset(0 0% 0 0)
// whileInView, once: true, amount: 0.3
// Durée 0.8s, ease-out-expo
```

### `FadeIn.tsx`
```typescript
interface FadeInProps {
  children: React.ReactNode
  delay?: number
  duration?: number    // défaut 0.6
  y?: number           // défaut 20
  className?: string
}
// Framer Motion variants : hidden {opacity:0, y} → visible {opacity:1, y:0}
// whileInView, viewport: {once: true, amount: 0.2}
```

### `ParallaxLayer.tsx`
```typescript
interface ParallaxLayerProps {
  children: React.ReactNode
  speed?: number       // multiplicateur, défaut 0.3
  className?: string
}
// useScroll + useTransform Framer Motion
// translateY proportionnel au speed
```

---

## Canvas (WebGL optionnel)

### `NoiseBackground.tsx`
Shader GLSL — bruit de Perlin animé subtil en fond.
```typescript
// dynamic import, ssr: false
// Canvas en position: absolute, inset: 0, z-index: 0, pointer-events: none
// opacity: 0.06 — extrêmement subtil
// Three.js PlaneGeometry + ShaderMaterial
// uniform uTime actualisé dans rAF via useFrame
```

### `FloatingSphere.tsx`
Sphère de particules réagit à la souris.
```typescript
// dynamic import, ssr: false
// React Three Fiber + Drei (Points)
// Rotation lente au scroll, légère attraction vers curseur
// dpr: [1, 1.5] — limiter pixel ratio
// Désactivé si prefers-reduced-motion
```

---

## Icons — `components/ui/icons/index.tsx`

```typescript
// Tous les SVG inline exportés nommément
// Props communes : size?: number (défaut 18), className?: string
// Jamais de lib externe (Lucide, Heroicons...)

export const GithubIcon   = ({ size = 18, className }: IconProps) => (...)
export const LinkedinIcon = ({ size = 18, className }: IconProps) => (...)
export const MailIcon     = ({ size = 18, className }: IconProps) => (...)
export const PhoneIcon    = ({ size = 18, className }: IconProps) => (...)
export const GlobeIcon    = ({ size = 16, className }: IconProps) => (...)
export const SunIcon      = ({ size = 16, className }: IconProps) => (...)
export const MoonIcon     = ({ size = 16, className }: IconProps) => (...)
export const ArrowUpRight = ({ size = 16, className }: IconProps) => (...)

interface IconProps {
  size?: number
  className?: string
}
```
