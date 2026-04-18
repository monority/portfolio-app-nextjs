# 04 — Animations

## Philosophie

Les animations **révèlent** — elles ne décorent pas.
Chaque animation a une intention : montrer, guider, récompenser.
Si supprimer une animation ne change pas la compréhension du contenu → la supprimer.

---

## Stack animations

| Outil | Usage | Quand |
|---|---|---|
| Framer Motion | Animations React, transitions, layout | Composants interactifs, entrées de section |
| GSAP + ScrollTrigger | Scrub scroll, pin, timelines complexes | About word-reveal, Timeline, effets avancés |
| Lenis | Smooth scroll | Global — toutes les pages |
| Splitting.js | Split texte lettre/mot | Hero, titres animés |
| CSS `@keyframes` | Boucles simples (grain, marquee, pulse) | Éléments répétitifs |
| Three.js / R3F | WebGL | Background shader, sphère hero |

---

## Init globale — `app/layout.tsx`

```typescript
'use client'
import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function AnimationProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    })

    // Sync Lenis → GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add(time => lenis.raf(time * 1000))
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(time => lenis.raf(time * 1000))
    }
  }, [])

  return <>{children}</>
}
```

---

## Framer Motion — variants catalogue

### fadeUp (entrée standard)
```typescript
export const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
  }
}
```

### staggerContainer
```typescript
export const staggerContainer = (staggerChildren = 0.08) => ({
  hidden:  {},
  visible: { transition: { staggerChildren } }
})
```

### textReveal (clip-path)
```typescript
export const textReveal = {
  hidden:  { clipPath: 'inset(0 100% 0 0)' },
  visible: { clipPath: 'inset(0 0% 0 0)',
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  }
}
```

### scaleIn
```typescript
export const scaleIn = {
  hidden:  { opacity: 0, scale: 0.94 },
  visible: { opacity: 1, scale: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
  }
}
```

### Usage standard dans les sections
```tsx
<motion.section
  variants={staggerContainer(0.1)}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.2 }}
>
  <motion.div variants={fadeUp}>
    <SectionLabel number="02">À propos</SectionLabel>
  </motion.div>
  <motion.p variants={fadeUp}>Bio text...</motion.p>
</motion.section>
```

---

## GSAP — patterns catalogue

### Cleanup obligatoire
```typescript
useEffect(() => {
  const ctx = gsap.context(() => {
    // toutes les animations ici
  }, containerRef)

  return () => ctx.revert()
}, [])
```

### Word reveal au scroll (About)
```typescript
useEffect(() => {
  const ctx = gsap.context(() => {
    // Splitting.js sur l'élément cible
    const result = Splitting({ target: '.about__quote', by: 'words' })

    gsap.fromTo(
      result[0].words,
      { color: 'var(--text-3)', opacity: 0.2 },
      {
        color: 'var(--text)',
        opacity: 1,
        stagger: 0.04,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          end: 'bottom 30%',
          scrub: 1.5,
          invalidateOnRefresh: true,
        }
      }
    )
  }, sectionRef)

  return () => ctx.revert()
}, [])
```

### Timeline entries reveal
```typescript
gsap.from('.timeline__entry', {
  opacity: 0,
  x: -24,
  stagger: 0.12,
  duration: 0.7,
  ease: 'power3.out',
  scrollTrigger: {
    trigger: '.timeline',
    start: 'top 60%',
    toggleActions: 'play none none reverse',
  }
})
```

### Hero letters (Splitting.js + GSAP)
```typescript
// Après mount, Splitting sur le h1
const result = Splitting({ target: '.hero__title', by: 'chars' })

// Wrap chaque char dans overflow:hidden
result[0].chars.forEach(char => {
  const wrapper = document.createElement('span')
  wrapper.style.display = 'inline-block'
  wrapper.style.overflow = 'hidden'
  char.parentNode?.insertBefore(wrapper, char)
  wrapper.appendChild(char)
})

gsap.from(result[0].chars, {
  yPercent: 110,
  opacity: 0,
  stagger: 0.04,
  duration: 0.8,
  ease: 'power4.out',
  delay: 0.2,
})
```

---

## Parallax

### Photo hero (Framer Motion)
```typescript
const { scrollYProgress } = useScroll()
const y = useTransform(scrollYProgress, [0, 0.4], [0, -30])
// <motion.div style={{ y }} />
```

### Parallax multi-couches (ParallaxLayer)
```typescript
// Vitesses différentes selon la couche
// Fond : speed 0.1 (lent)
// Milieu : speed 0.3
// Avant : speed 0.5 (rapide)
// Formule : translateY = scrollY * speed * -1
```

---

## Curseur custom (desktop only)

```typescript
// lib/useCustomCursor.ts
export function useCustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const pos = useRef({ x: 0, y: 0 })
  const target = useRef({ x: 0, y: 0 })

  useEffect(() => {
    // Désactiver si pointer: coarse (touch)
    if (!window.matchMedia('(pointer: fine)').matches) return

    document.body.classList.add('cursor-none')

    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', onMove)

    // rAF loop avec lerp
    let raf: number
    const loop = () => {
      pos.current.x = lerp(pos.current.x, target.current.x, 0.12)
      pos.current.y = lerp(pos.current.y, target.current.y, 0.12)
      if (cursorRef.current) {
        cursorRef.current.style.transform =
          `translate(${pos.current.x}px, ${pos.current.y}px)`
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
      document.body.classList.remove('cursor-none')
    }
  }, [])

  return cursorRef
}
```

```tsx
// Composant CustomCursor
// Cercle 10px, fond var(--text), opacity 0.7
// Hover <a>/<button> : scale(2.5) + mix-blend-mode: difference
// z-index: var(--z-cursor)
```

---

## Magnetic button

```typescript
// lib/useMagneticEffect.ts
export function useMagneticEffect(strength = 0.3, radius = 60) {
  const ref = useRef<HTMLElement>(null)
  const { x, y } = useSpring({ x: 0, y: 0 }, { stiffness: 150, damping: 15 })

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    const el = ref.current
    if (!el) return

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const dist = Math.sqrt(dx * dx + dy * dy)

      if (dist < radius) {
        x.set(dx * strength)
        y.set(dy * strength)
      } else {
        x.set(0)
        y.set(0)
      }
    }

    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [radius, strength, x, y])

  return { ref, x, y }
}
```

---

## Performance — règles GPU

```
✅ transform: translate / scale / rotate / skew
✅ opacity
✅ clip-path (transitions reveal)
✅ filter: blur (uniquement pour transitions d'entrée)

❌ top / left / right / bottom  → reflow
❌ width / height               → reflow + repaint
❌ margin / padding en animation → reflow
❌ background-color en animation → utiliser opacity sur un pseudo-élément
```

### `will-change` — usage strict
```css
/* Uniquement pendant l'animation, retiré après */
.animating { will-change: transform; }
/* Framer Motion : automatique via layoutId ou animate */
```

### prefers-reduced-motion
```typescript
// Dans chaque composant animé
const shouldAnimate = !useReducedMotion() // hook Framer Motion

// OU globalement via CSS
@media (prefers-reduced-motion: reduce) {
  /* Désactiver toutes les animations */
}
```

---

## WebGL — guidelines

```typescript
// Canvas en position: absolute, inset: 0
// pointer-events: none — ne jamais bloquer les interactions
// dpr: [1, 1.5] — limiter le pixel ratio
// Désactiver si prefers-reduced-motion
// Charger via dynamic import + ssr: false obligatoire

// Fragment shader noise (base) :
const fragmentShader = `
  uniform float uTime;
  varying vec2 vUv;

  float noise(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
  }

  void main() {
    float n = noise(vUv * 100.0 + uTime * 0.1);
    gl_FragColor = vec4(vec3(n * 0.03), 1.0);
  }
`
// Opacity globale du canvas : 0.04–0.06 max
```
