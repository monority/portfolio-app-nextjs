# ANIMATION SYSTEM

## Principes
- Subtle only (jamais flashy)
- Never distract from content
- Respect the "calm" feeling

## Hero Timeline
- t=0: page load starts
- t=0: H1 fade in + translateY(20px → 0)
- t=0.1s: paragraph fade in + translateY(20px → 0)
- t=0.2s: CTA fade in + translateY(20px → 0)
- t=0.3s: image (si presente) fade in + scale(1.05 → 1)

## General Transitions
- Enter: fade + translateY (0.3s ease-out)
- Exit: fade out (0.2s ease-in)
- Hover: opacity ou scale (0.2s ease)
- Page transition: fade (0.4s)

## Easing
- Default: cubic-bezier(0.4, 0, 0.2, 1)
- Bounce: none (jamais)
- Spring: cubic-bezier(0.175, 0.885, 0.32, 1.275) (subtle)

## Scroll Animations
- Fade in on scroll: 0-100px viewport
- Parallax: subtle only (max 20px)
- No sticky animations

## Forbidden
- No bouncy springs
- No flashy entrances
- No complex 3D
- No particle systems (except hero optionnel)
- No micro-interactions excessives

## Technical
- Use Framer Motion for React/Next.js
- CSS only for simple transitions
- Avoid GSAP unless necessary