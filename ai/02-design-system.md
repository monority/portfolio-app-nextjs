# 02 — Design System

## Identité visuelle

**"Éditorial. Précis. Vivant."**

Inspiré de scalzodesign.be (élégance, typographie comme design),
salmangsamar.com (storytelling, personnalité), tr.af (minimalisme brutal).

Monochrome dominant. Un seul accent. Vide intentionnel.
Chaque pixel a un rôle — rien de décoratif pour décorer.

---

## Variables CSS — globals.css

```css
/* ─── FONTS ───────────────────────────────────────────────── */
@font-face {
  font-family: 'Syne';
  src: url('/fonts/Syne-Variable.woff2') format('woff2');
  font-weight: 100 900;
  font-display: swap;
}
@font-face {
  font-family: 'Inter';
  src: url('/fonts/Inter-Variable.woff2') format('woff2');
  font-weight: 100 900;
  font-display: swap;
}
@font-face {
  font-family: 'JetBrains Mono';
  src: url('/fonts/JetBrainsMono-Variable.woff2') format('woff2');
  font-weight: 100 800;
  font-display: swap;
}

/* ─── RESET ────────────────────────────────────────────────── */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: auto; -webkit-font-smoothing: antialiased; }
img, video { max-width: 100%; display: block; }
button { cursor: pointer; border: none; background: none; }
a { color: inherit; text-decoration: none; }

/* ─── TOKENS ────────────────────────────────────────────────── */
:root {
  /* — Couleurs brutes — */
  --clr-paper:     #f7f6f3;
  --clr-paper-2:   #eeecea;
  --clr-paper-3:   #e0dedd;
  --clr-ink:       #1a1a18;
  --clr-ink-2:     #5c5c5a;
  --clr-ink-3:     #a8a8a4;

  --clr-void:      #080808;
  --clr-void-2:    #0f0f0f;
  --clr-void-3:    #1a1a1a;
  --clr-white:     #f5f5f0;
  --clr-white-2:   #888884;
  --clr-white-3:   #3a3a38;

  --clr-accent:    #c8ff00;    /* lime électrique — 1 seule couleur d'accent */
  --clr-accent-10: rgba(200,255,0,0.10);
  --clr-accent-20: rgba(200,255,0,0.20);

  /* — Tokens sémantiques (basculent avec data-theme) — */
  --bg:       var(--clr-paper);
  --bg-2:     var(--clr-paper-2);
  --bg-3:     var(--clr-paper-3);
  --border:   var(--clr-paper-3);
  --text:     var(--clr-ink);
  --text-2:   var(--clr-ink-2);
  --text-3:   var(--clr-ink-3);

  /* — Typographie — */
  --font-display: 'Syne', system-ui, sans-serif;
  --font-body:    'Inter', system-ui, sans-serif;
  --font-mono:    'JetBrains Mono', monospace;

  /* Échelle typographique fluid */
  --text-2xs:  0.625rem;          /* 10px */
  --text-xs:   0.75rem;           /* 12px */
  --text-sm:   0.875rem;          /* 14px */
  --text-base: 1rem;              /* 16px */
  --text-lg:   1.25rem;           /* 20px */
  --text-xl:   1.5rem;            /* 24px */
  --text-2xl:  2rem;              /* 32px */
  --text-3xl:  clamp(2rem, 4vw, 3rem);
  --text-hero: clamp(4rem, 12vw, 10rem);    /* nom principal */
  --text-title: clamp(2rem, 5vw, 5rem);     /* titres sections */

  /* — Espacement — */
  --space-1:   0.5rem;    /* 8px  */
  --space-2:   1rem;      /* 16px */
  --space-3:   1.5rem;    /* 24px */
  --space-4:   2rem;      /* 32px */
  --space-6:   3rem;      /* 48px */
  --space-8:   4rem;      /* 64px */
  --space-12:  6rem;      /* 96px */
  --space-16:  8rem;      /* 128px */
  --space-24:  12rem;     /* 192px */

  --section-y: clamp(5rem, 12vh, 10rem);
  --section-x: clamp(1.5rem, 5vw, 5rem);
  --container: min(1280px, 100% - 3rem);

  /* — Bords — */
  --radius-sm: 2px;
  --radius-md: 4px;
  --radius-lg: 8px;     /* max — jamais plus */

  /* — Easings — */
  --ease-out-expo:  cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in-expo:   cubic-bezier(0.7, 0, 0.84, 0);
  --ease-elastic:   cubic-bezier(0.34, 1.56, 0.64, 1);
  --ease-smooth:    cubic-bezier(0.4, 0, 0.2, 1);

  /* — Durées — */
  --dur-instant: 100ms;
  --dur-fast:    200ms;
  --dur-base:    400ms;
  --dur-slow:    700ms;
  --dur-crawl:   1200ms;

  /* — Z-index — */
  --z-base:    0;
  --z-raised:  10;
  --z-overlay: 100;
  --z-header:  200;
  --z-cursor:  9999;
}

/* ─── DARK MODE ─────────────────────────────────────────────── */
[data-theme="dark"] {
  --bg:       var(--clr-void);
  --bg-2:     var(--clr-void-2);
  --bg-3:     var(--clr-void-3);
  --border:   var(--clr-white-3);
  --text:     var(--clr-white);
  --text-2:   var(--clr-white-2);
  --text-3:   var(--clr-white-3);
}

/* ─── BODY BASE ─────────────────────────────────────────────── */
body {
  background: var(--bg);
  color: var(--text);
  font-family: var(--font-body);
  font-size: var(--text-base);
  line-height: 1.6;
  transition: background var(--dur-base) var(--ease-smooth),
              color var(--dur-base) var(--ease-smooth);
}

/* ─── UTILITAIRES ───────────────────────────────────────────── */
.container { width: var(--container); margin-inline: auto; }
.font-display { font-family: var(--font-display); }
.font-mono    { font-family: var(--font-mono); }

/* Hover underline animé */
.hover-line {
  background-image: linear-gradient(currentColor, currentColor);
  background-size: 0% 1px;
  background-repeat: no-repeat;
  background-position: left bottom;
  transition: background-size var(--dur-base) var(--ease-out-expo);
}
.hover-line:hover { background-size: 100% 1px; }

/* Label section — mono uppercase tracké */
.label-caps {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--text-3);
}

/* Focus visible global */
:focus-visible {
  outline: 2px solid var(--clr-accent);
  outline-offset: 3px;
  border-radius: var(--radius-sm);
}

/* Grain — appliqué sur le hero uniquement */
.grain::after {
  content: '';
  position: fixed;
  inset: -50%;
  width: 200%; height: 200%;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  opacity: 0.032;
  pointer-events: none;
  animation: grain 0.5s steps(2) infinite;
  z-index: var(--z-overlay);
}
@keyframes grain {
  0%,100% { transform: translate(0,0); }
  25%  { transform: translate(-2%,-3%); }
  50%  { transform: translate(3%,2%); }
  75%  { transform: translate(-1%,4%); }
}

/* Scroll smooth Lenis */
html.lenis { height: auto; }
.lenis.lenis-smooth { scroll-behavior: auto; }

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
  }
  .grain::after { display: none; }
}
```

---

## Guidelines UI

### Typographie — règles de comportement

**Mix de weights dans les titres (obligatoire)**
```tsx
// Titres hero : weight 300 (light) + weight 800 (black) dans le même élément
<h1 style={{ fontFamily: 'var(--font-display)' }}>
  <span style={{ fontWeight: 300, color: 'var(--text-2)' }}>Creative</span>
  <br />
  <span style={{ fontWeight: 800 }}>
    Developer<span style={{ color: 'var(--clr-accent)' }}>.</span>
  </span>
</h1>
```

**"." en accent sur les titres principaux**
Chaque titre hero ou section importante se termine par un `.` en `var(--clr-accent)`.

**Nomenclature projets SCREAMING_SNAKE_CASE**
```
HUMAN_WORK_FORCE     ← affiché
_SaaS concept        ← métadonnée avec underscore prefix
_React 19 · TS
_2024 → live
```

**Labels mono uppercase**
```css
font-family: var(--font-mono);
font-size: var(--text-xs);
letter-spacing: 0.15em;
text-transform: uppercase;
color: var(--text-3);
```

### Règles accent (#c8ff00)
- **Maximum 3 utilisations par page**
- Usages légitimes : `"."` dans les titres, point de statut, `·` séparateur actif, numéro hover
- **Interdit** : fond de surface, background bouton, texte long

### Règles radius
- `var(--radius-sm)` 2px : séparateurs, tags
- `var(--radius-md)` 4px : images, cards légères
- `var(--radius-lg)` 8px : modales, menus déroulants
- **Jamais > 8px** — évite l'aspect "app mobile"

### Ce qui est interdit
```
❌ Gradients décoratifs sur fonds (sauf WebGL/shader)
❌ Ombres excessives (max: 0 2px 8px rgba(0,0,0,0.12))
❌ Librairies d'icônes (Lucide, Heroicons) — SVG inline uniquement
❌ border-radius > 8px
❌ Animations sans intention (décoratives uniquement)
❌ Centrer les blocs de texte longs
❌ Plus de 3 tailles de texte dans une section
❌ Lorem ipsum
```
