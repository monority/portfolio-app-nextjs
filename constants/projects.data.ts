import type { Lang, Person, Project, TimelineEntry, Quality } from '../types/index'
import type { IconName } from '@/components/ui/icon/types'

export const PROJECTS_COPY: Record<Lang, {
  sectionLabel: string
  heading: string
  intro: string
  pickerLabel: string
  paletteLabel: string
  lightMode: string
  darkMode: string
  scopeLabel: string
  openSite: string
  liveSite: string
  techStack: string
  github: string
  fullscreen: string
  openFullscreenGallery: string
  resetZoom: string
  closeModal: string
  previousImage: string
  nextImage: string
  zoomOut: string
  zoomIn: string
  viewImage: (index: number) => string
  showImage: (index: number) => string
}> = {
  fr: {
    sectionLabel: 'Projets',
    heading: 'Une selection de projets recents',
    intro: 'Des contextes differents, une meme intention : rendre un produit plus simple a comprendre, plus agreable a utiliser et plus solide cote front.',
    pickerLabel: 'Choisir un projet :',
    paletteLabel: 'Palette',
    lightMode: 'Mode clair',
    darkMode: 'Mode sombre',
    scopeLabel: 'Perimetre',
    openSite: 'Voir le site',
    liveSite: 'Voir le site live',
    techStack: 'Stack technique',
    github: 'GitHub',
    fullscreen: 'Fullscreen',
    openFullscreenGallery: 'Ouvrir la galerie en plein ecran',
    resetZoom: 'Reinitialiser le zoom',
    closeModal: 'Fermer la modal',
    previousImage: 'Image precedente',
    nextImage: 'Image suivante',
    zoomOut: 'Reduire le zoom',
    zoomIn: 'Augmenter le zoom',
    viewImage: (index) => `Voir l'image ${index}`,
    showImage: (index) => `Afficher l'image ${index}`,
  },
  en: {
    sectionLabel: 'Projects',
    heading: 'A selection of recent work',
    intro: 'Different contexts, one intention: make a product easier to understand, more enjoyable to use and more solid on the front.',
    pickerLabel: 'Pick a project:',
    paletteLabel: 'Colour palette',
    lightMode: 'Light mode',
    darkMode: 'Dark mode',
    scopeLabel: 'Project scope',
    openSite: 'Open site',
    liveSite: 'Check live site',
    techStack: 'Tech stack',
    github: 'GitHub',
    fullscreen: 'Fullscreen',
    openFullscreenGallery: 'Open fullscreen gallery',
    resetZoom: 'Reset zoom',
    closeModal: 'Close modal',
    previousImage: 'Previous image',
    nextImage: 'Next image',
    zoomOut: 'Zoom out',
    zoomIn: 'Zoom in',
    viewImage: (index) => `View image ${index}`,
    showImage: (index) => `Show image ${index}`,
  },
}

export const PROJECT_ICON_BY_ID: Record<string, IconName> = {
  'human-work-force': 'humanworkforce',
  'dashboard-rch': 'dashboard',
  skillswap: 'skyllswap',
  horloges: 'horloges',
  'cesar-lezard': 'cesarlezard',
  'monority-base': 'monority',
}

export const PROJECT_TECH_ICON_BY_LABEL: Record<string, IconName> = {
  react: 'react',
  'react 19': 'react',
  'next.js': 'nextjs',
  typescript: 'typescript',
  'node.js': 'node',
  websocket: 'websocket',
  'd3.js': 'd3js',
  postgresql: 'sql',
  prisma: 'prisma',
  stripe: 'arrowRight',
  gsap: 'gsap',
  'three.js': 'threejs',
  css: 'css',
  storybook: 'storybook',
  i18n: 'i18n',
  'framer motion': 'motion',
}

// ─── Tech stack row classes (About section) ───────────────────────────
export const TECH_ROW_CLASSES = {
  wrapperClassName: 'about-tech-row',
  titleClassName: 'about-tech-row__title',
  listClassName: 'about-tech-row__list',
  itemClassName: 'about-tech-row__item',
} as const

// ─── Marquee items (About section) ───────────────────────────
export const MARQUEE_ITEMS: { icon: IconName; label: string }[] = [
  { icon: 'react', label: 'React' },
  { icon: 'nextjs', label: 'Next.js' },
  { icon: 'astro', label: 'Astro' },
  { icon: 'tailwind', label: 'Tailwind CSS' },
  { icon: 'sass', label: 'Sass' },
  { icon: 'motion', label: 'Motion' },
  { icon: 'node', label: 'Node.js' },
  { icon: 'express', label: 'Express' },
  { icon: 'mongo', label: 'MongoDB' },
  { icon: 'typescript', label: 'TypeScript' },
  { icon: 'javascript', label: 'JavaScript' },
  { icon: 'docker', label: 'Docker' },
  { icon: 'figma', label: 'Figma' },
  { icon: 'github', label: 'GitHub' },
  { icon: 'vercel', label: 'Vercel' },
  { icon: 'railway', label: 'Railway' },
]

// ─── Person ─────────────────────────────────────────────────────
export const PERSON: Person = {
  name: 'RONAN_CHENU',
  nameDisplay: 'Ronan Chenu',
  role: {
    fr: 'Creative Developer',
    en: 'Creative Developer',
  },
  location: 'Lille, France',
  bio: {
    fr: 'Je fais la jonction entre le design et l\'ingénierie. Des interfaces pensées produit, construites pour durer.',
    en: 'I bridge the gap between design and engineering. Product-focused interfaces, built to last.',
  },
  email: 'contact@ronanchenu.dev',
  github: 'https://github.com/ronanchenu',
  linkedin: 'https://linkedin.com/in/ronanchenu',
  available: true,
}

// ─── Qualities ──────────────────────────────────────────────────
export const QUALITIES: Quality[] = [
  {
    id: 'screens',
    number: '01',
    title: { fr: 'Écrans & parcours', en: 'Screens & flows' },
    description: { fr: 'Interfaces qui tiennent dans le temps.', en: 'Interfaces built to last.' },
  },
  {
    id: 'components',
    number: '02',
    title: { fr: 'Composants', en: 'Components' },
    description: { fr: 'Briques réutilisables, cohérentes.', en: 'Reusable, consistent building blocks.' },
  },
  {
    id: 'backend',
    number: '03',
    title: { fr: 'Branchement', en: 'Integration' },
    description: { fr: 'APIs et logique métier.', en: 'APIs and business logic.' },
  },
  {
    id: 'finish',
    number: '04',
    title: { fr: 'Finition', en: 'Polish' },
    description: { fr: 'Responsive, accessibilité, détails.', en: 'Responsive, a11y, details.' },
  },
]

// ─── Timeline ───────────────────────────────────────────────────
export const TIMELINE: TimelineEntry[] = [
  {
    id: 'freelance',
    year: '2024 →',
    title: 'Creative Developer',
    subtitle: 'Freelance · Lille',
    description: {
      fr: 'Interfaces pensées produit pour startups et agences. Focus sur la performance et l\'expérience utilisateur.',
      en: 'Product-focused interfaces for startups and agencies. Performance and UX at the core.',
    },
    type: 'work',
  },
  {
    id: 'skillswap',
    year: '2024',
    title: 'SkillSwap',
    subtitle: 'Projet personnel',
    description: {
      fr: 'Plateforme d\'échange de compétences peer-to-peer. React 19, Node.js, WebSocket temps réel.',
      en: 'Peer-to-peer skill exchange platform. React 19, Node.js, real-time WebSocket.',
    },
    type: 'project',
  },
  {
    id: 'humanworkforce',
    year: '2024',
    title: 'Human Work Force',
    subtitle: 'Projet personnel',
    description: {
      fr: 'Et si les IA embauchaient des humains ? Concept SaaS satirique, interface pensée comme un produit réel.',
      en: 'What if AIs hired humans? A satirical SaaS concept, designed like a real product.',
    },
    type: 'project',
  },
  {
    id: 'formation',
    year: '2022 – 2024',
    title: 'Développeur Web Full-Stack',
    subtitle: 'Formation · Lille',
    description: {
      fr: 'Apprentissage intensif du développement web moderne. React, Node.js, bases de données, DevOps.',
      en: 'Intensive modern web development training. React, Node.js, databases, DevOps.',
    },
    type: 'education',
  },
  {
    id: 'horloges',
    year: '2023',
    title: 'Horloges',
    subtitle: 'Projet personnel',
    description: {
      fr: 'Marketplace de montres avec filtres avancés et système de wishlist. Next.js, Prisma, PostgreSQL.',
      en: 'Watches marketplace with advanced filters and wishlist. Next.js, Prisma, PostgreSQL.',
    },
    type: 'project',
  },
]

// ─── Projects ───────────────────────────────────────────────────
export const PROJECTS: Project[] = [
  {
    id: 'human-work-force',
    title: 'HUMAN WORK FORCE',
    titleDisplay: 'Human Work Force',
    tagline: {
      fr: 'Les IA embauchent des humains.',
      en: 'AIs hire humans.',
    },
    description: {
      fr: 'Concept SaaS satirique où les intelligences artificielles recrutent des humains pour leurs tâches créatives, avec un ton volontairement décalé mais une exécution très produit.',
      en: 'Satirical SaaS concept where AIs recruit humans for creative tasks, with a deliberately playful tone but a product-grade execution.',
    },
    longDescription: {
      fr: 'Ce projet explore une idée satirique : et si les IA décidaient d\'embaucher des humains pour des tâches créatives ? L\'interface a été pensée comme un vrai produit SaaS, avec une hiérarchie claire, des transitions maîtrisées et une direction artistique qui donne de la densité au concept.',
      en: 'This project explores a satirical idea: what if AIs decided to hire humans for creative tasks? The interface was designed like a real SaaS product, with clear hierarchy, controlled transitions, and an art direction that gives the concept more depth.',
    },
    tech: ['React 19', 'TypeScript', 'i18n', 'Framer Motion'],
    year: '2024',
    tags: [
      { fr: 'SaaS', en: 'SaaS' },
      { fr: 'concept', en: 'concept' },
      { fr: 'direction artistique', en: 'art direction' },
    ],
    featured: true,
    live: 'https://humanworkforce.vercel.app',
    github: 'https://github.com/monority/frontend-hwf-react',
    visual: '/images/projects/hwf/hwf-1.webp',
    gallery: [
      '/images/projects/hwf/hwf-1.webp',
      '/images/projects/hwf/hwf-2.webp',
      '/images/projects/hwf/hwf-3.webp',
      '/images/projects/hwf/hwf-4.webp',
    ],
    palette: {
      dark: {
        accent: '#3a85ea',
        bg: '#0c0c0c',
        surface: '#141f2e',
        fg: '#8a8a8b',
      },
      light: {
        accent: '#d5e6f0',
        bg: '#fff4e8',
        surface: '#ffe7cf',
        fg: '#22140b',
      },
    },
  },
  {
    id: 'dashboard-rch',
    title: 'DASHBOARD',
    titleDisplay: 'Dashboard',
    tagline: {
      fr: 'Donnees de marche en temps reel.',
      en: 'Real-time market data.',
    },
    description: {
      fr: 'Dashboard de visualisation de données financières avec mise à jour WebSocket, pensé pour lire l\'info rapidement et garder un rythme visuel vivant.',
      en: 'Financial data visualization dashboard with WebSocket updates, designed for fast readability and a lively visual rhythm.',
    },
    longDescription: {
      fr: 'Application de visualisation de données financières avec des graphiques D3.js interactifs, des mises à jour en temps réel via WebSocket et une structure pensée pour faire ressortir les tendances sans bruit visuel inutile.',
      en: 'Financial data visualization application with interactive D3.js charts, real-time WebSocket updates, and a structure designed to surface trends without visual noise.',
    },
    tech: ['React', 'D3.js', 'WebSocket', 'TypeScript'],
    year: '2024',
    tags: [
      { fr: 'dashboard', en: 'dashboard' },
      { fr: 'data', en: 'data' },
      { fr: 'temps reel', en: 'real-time' },
    ],
    featured: false,
    live: 'https://dashboard-rch.vercel.app',
    github: 'https://github.com/monority/frontend-dashboard-react',
    visual: '/images/projects/dashboard/dashboard-1.webp',
    gallery: [
      '/images/projects/dashboard/dashboard-1.webp',
      '/images/projects/dashboard/dashboard-2.webp',
      '/images/projects/dashboard/dashboard-3.webp',
      '/images/projects/dashboard/dashboard-4.webp',
    ],
    palette: {
      dark: {
        accent: '#66d9ef',
        bg: '#12161d',
        surface: '#171d26',
        fg: '#e6ebf3',
      },
    },
  },
  {
    id: 'skillswap',
    title: 'SKILLSWAP',
    titleDisplay: 'SkillSwap',
    tagline: {
      fr: 'Echangez vos competences.',
      en: 'Exchange your skills.',
    },
    description: {
      fr: 'Plateforme peer-to-peer d\'échange de compétences, orientée communauté, confiance et échanges simples entre profils complémentaires.',
      en: 'Peer-to-peer skill exchange platform, focused on community, trust, and simple exchanges between complementary profiles.',
    },
    longDescription: {
      fr: 'Plateforme d\'échange de compétences entre particuliers avec messagerie temps réel, matching basé sur les disponibilités et une logique de confiance pensée pour rendre l\'échange plus naturel et plus fluide.',
      en: 'Skill exchange platform between individuals with real-time messaging, availability-based matching, and a trust-first approach designed to make exchanges feel natural and fluid.',
    },
    tech: ['React 19', 'Node.js', 'WebSocket', 'PostgreSQL'],
    year: '2024',
    tags: [
      { fr: 'plateforme', en: 'platform' },
      { fr: 'social', en: 'social' },
      { fr: 'fullstack', en: 'fullstack' },
      { fr: 'matching', en: 'matching' },
    ],
    featured: false,
    live: 'https://skyllswap.vercel.app',
    github: 'https://github.com/monority/fullstack-skyllswap-react',
    visual: '/images/projects/skyllswap/skyllswap-1.webp',
    gallery: [
      '/images/projects/skyllswap/skyllswap-1.webp',
      '/images/projects/skyllswap/skyllswap-2.webp',
      '/images/projects/skyllswap/skyllswap-3.webp',
      '/images/projects/skyllswap/skyllswap-4.webp',
    ],
    palette: {
      dark: {
        accent: '#16a249',
        bg: '#090909',
        surface: '#0e0e0e',
        fg: '#f7f3ff',
      },
    },
  },
  {
    id: 'horloges',
    title: 'HORLOGES',
    titleDisplay: 'Horloges',
    tagline: {
      fr: 'La marketplace des montres rares.',
      en: 'Marketplace for rare watches.',
    },
    description: {
      fr: 'Marketplace dédiée aux montres avec filtres avancés, conçue pour une lecture rapide des collections et une navigation plus premium.',
      en: 'Watches marketplace with advanced filters, designed for fast collection scanning and a more premium browsing experience.',
    },
    longDescription: {
      fr: 'Marketplace spécialisée dans les montres rares avec un système de filtres avancés pour affiner les recherches par marque, prix et état. La logique de wishlist et les alertes de prix renforcent l\'aspect produit de l\'expérience.',
      en: 'Specialized marketplace for rare watches with advanced filters for brand, price, and condition. Wishlist and price alerts strengthen the product feel of the experience.',
    },
    tech: ['Next.js', 'Prisma', 'PostgreSQL', 'Stripe'],
    year: '2023',
    tags: [
      { fr: 'e-commerce', en: 'e-commerce' },
      { fr: 'marketplace', en: 'marketplace' },
      { fr: 'luxe', en: 'luxury' },
    ],
    featured: false,
    live: 'https://horloges.vercel.app',
    github: 'https://github.com/monority/frontend-horloges-react',
    visual: '/images/projects/horloges/horloges-1.webp',
    gallery: [
      '/images/projects/horloges/horloges-1.webp',
      '/images/projects/horloges/horloges-2.webp',
      '/images/projects/horloges/horloges-3.webp',
      '/images/projects/horloges/horloges-4.webp',
    ],
    palette: {
      dark: {
        accent: '#d9b77c',
        bg: '#14110d',
        surface: '#1d1812',
        fg: '#f7efe3',
      },
    },
  },
  {
    id: 'cesar-lezard',
    title: 'CESAR_LEZARD',
    titleDisplay: 'César Lézard',
    tagline: {
      fr: 'Experience musicale immersive.',
      en: 'Immersive music experience.',
    },
    description: {
      fr: 'Site vitrine interactif pour un artiste musical, pensé comme une immersion visuelle et sonore plutôt qu\'une simple landing page.',
      en: 'Interactive showcase for a music artist, built as a visual and sonic immersion rather than a simple landing page.',
    },
    longDescription: {
      fr: 'Site vitrine immersif pour un artiste musical avec des animations WebGL et GSAP qui créent une vraie sensation de scène. L\'interface reflète l\'univers musical de l\'artiste avec une navigation plus narrative et plus cinématique.',
      en: 'Immersive showcase website for a music artist with WebGL and GSAP animations that create a real stage-like feeling. The interface reflects the artist\'s musical universe with a more narrative, cinematic flow.',
    },
    tech: ['Next.js', 'GSAP', 'Three.js', 'CSS'],
    year: '2023',
    tags: [
      { fr: 'vitrine', en: 'showcase' },
      { fr: 'musique', en: 'music' },
      { fr: 'immersif', en: 'immersive' },
    ],
    featured: false,
    live: 'https://cesarlezard.com',
    github: 'https://github.com/monority/frontend-cslz-react',
    visual: '/images/projects/cesarlezard/cesarlezard-1.webp',
    gallery: [
      '/images/projects/cesarlezard/cesarlezard-1.webp',
      '/images/projects/cesarlezard/cesarlezard-2.webp',
      '/images/projects/cesarlezard/cesarlezard-3.webp',
      '/images/projects/cesarlezard/cesarlezard-4.webp',
    ],
    palette: {
      dark: {
        accent: '#ff6b6b',
        bg: '#120f12',
        surface: '#1b161b',
        fg: '#f8f2f8',
      },
    },
  },
  {
    id: 'monority-base',
    title: 'Monority Library',
    titleDisplay: 'Monority Library',
    tagline: {
      fr: 'Design system open source.',
      en: 'Open-source design system.',
    },
    description: {
      fr: 'Bibliothèque de composants React avec design system complet, pensée pour servir de base solide et réutilisable sur plusieurs projets.',
      en: 'React component library with a complete design system, built as a solid and reusable base for multiple projects.',
    },
    longDescription: {
      fr: 'Bibliothèque de composants React open-source accompagnée d\'un design system complet avec tokens CSS, documentation Storybook et exemples interactifs. Le projet explore la cohérence d\'un système réutilisable, lisible et durable.',
      en: 'Open-source React component library with a complete design system including CSS tokens, Storybook documentation, and interactive examples. The project explores how to keep a reusable system coherent, readable, and durable.',
    },
    tech: ['React', 'Storybook', 'TypeScript', 'CSS'],
    year: '2023',
    tags: [
      { fr: 'open source', en: 'open source' },
      { fr: 'design system', en: 'design system' },
      { fr: 'composants', en: 'components' },
    ],
    featured: false,
    live: 'https://monority.vercel.app',
    github: 'https://github.com/monority/lib-monority-react',
    visual: '/images/projects/library/library-1.webp',
    gallery: [
      '/images/projects/library/library-1.webp',
      '/images/projects/library/library-2.webp',
      '/images/projects/library/library-3.webp',
      '/images/projects/library/library-4.webp',
    ],
    palette: {
      dark: {
        accent: '#7dd3fc',
        bg: '#0d1320',
        surface: '#141c2d',
        fg: '#eef5ff',
      },
    },
  },
]


