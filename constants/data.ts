import type { Person, Project, TimelineEntry, Quality } from '../types/index'

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
    id: 'sneakara',
    year: '2023',
    title: 'Sneakara',
    subtitle: 'Projet personnel',
    description: {
      fr: 'Marketplace sneakers avec filtres avancés et système de wishlist. Next.js, Prisma, PostgreSQL.',
      en: 'Sneakers marketplace with advanced filters and wishlist. Next.js, Prisma, PostgreSQL.',
    },
    type: 'project',
  },
]

// ─── Projects ───────────────────────────────────────────────────
export const PROJECTS: Project[] = [
  {
    id: 'human-work-force',
    title: 'HUMAN_WORK_FORCE',
    titleDisplay: 'Human Work Force',
    tagline: 'Les IA embauchent des humains.',
    description: {
      fr: 'Concept SaaS satirique où les intelligences artificielles recrutent des humains pour leurs tâches créatives. Interface pensée comme un vrai produit, UX soignée.',
      en: 'Satirical SaaS concept where AIs recruit humans for creative tasks. Designed like a real product, polished UX.',
    },
    tech: ['React 19', 'TypeScript', 'i18n', 'Framer Motion'],
    year: '2024',
    tags: ['SaaS', 'concept'],
    featured: true,
    live: 'https://humanworkforce.vercel.app',
    github: 'https://github.com/ronanchenu/human-work-force',
    visual: '/images/projects/human-work-force.webp',
    accentColor: '#c8ff00',
  },
  {
    id: 'dashboard-rch',
    title: 'DASHBOARD_RCH',
    titleDisplay: 'Dashboard RCH',
    tagline: 'Données de marché en temps réel.',
    description: {
      fr: 'Dashboard de visualisation de données financières avec mise à jour WebSocket. Graphiques D3.js, filtres dynamiques.',
      en: 'Financial data visualization dashboard with WebSocket updates. D3.js charts, dynamic filters.',
    },
    tech: ['React', 'D3.js', 'WebSocket', 'TypeScript'],
    year: '2024',
    tags: ['dashboard', 'data'],
    featured: false,
    live: 'https://dashboard-rch.vercel.app',
    github: 'https://github.com/ronanchenu/dashboard-rch',
    visual: '/images/projects/dashboard-rch.webp',
  },
  {
    id: 'skillswap',
    title: 'SKILLSWAP',
    titleDisplay: 'SkillSwap',
    tagline: 'Échangez vos compétences.',
    description: {
      fr: 'Plateforme peer-to-peer d\'échange de compétences. Messagerie temps réel, matching algorithmique, profils vérifiés.',
      en: 'Peer-to-peer skill exchange platform. Real-time messaging, algorithmic matching, verified profiles.',
    },
    tech: ['React 19', 'Node.js', 'WebSocket', 'PostgreSQL'],
    year: '2024',
    tags: ['plateforme', 'social'],
    featured: false,
    live: 'https://skillswap.vercel.app',
    github: 'https://github.com/ronanchenu/skillswap',
    visual: '/images/projects/skillswap.webp',
  },
  {
    id: 'sneakara',
    title: 'SNEAKARA',
    titleDisplay: 'Sneakara',
    tagline: 'La marketplace des sneakers rares.',
    description: {
      fr: 'Marketplace dédiée aux sneakers avec filtres avancés, système de wishlist et alertes de prix.',
      en: 'Sneakers marketplace with advanced filters, wishlist and price alerts.',
    },
    tech: ['Next.js', 'Prisma', 'PostgreSQL', 'Stripe'],
    year: '2023',
    tags: ['e-commerce', 'marketplace'],
    featured: false,
    live: 'https://sneakara.vercel.app',
    github: 'https://github.com/ronanchenu/sneakara',
    visual: '/images/projects/sneakara.webp',
  },
  {
    id: 'cesar-lezard',
    title: 'CESAR_LEZARD',
    titleDisplay: 'César Lézard',
    tagline: 'Expérience musicale immersive.',
    description: {
      fr: 'Site vitrine interactif pour un artiste musical. WebGL, animations GSAP, expérience immersive.',
      en: 'Interactive showcase for a music artist. WebGL, GSAP animations, immersive experience.',
    },
    tech: ['Next.js', 'GSAP', 'Three.js', 'CSS'],
    year: '2023',
    tags: ['vitrine', 'musique'],
    featured: false,
    live: 'https://cesarl.vercel.app',
    github: 'https://github.com/ronanchenu/cesar-lezard',
    visual: '/images/projects/cesar-lezard.webp',
  },
  {
    id: 'monority-base',
    title: 'MONORITY_BASE',
    titleDisplay: 'Monority Base',
    tagline: 'Design system open source.',
    description: {
      fr: 'Bibliothèque de composants React avec design system complet, tokens CSS, storybook et documentation.',
      en: 'React component library with complete design system, CSS tokens, storybook and docs.',
    },
    tech: ['React', 'Storybook', 'TypeScript', 'CSS'],
    year: '2023',
    tags: ['open source', 'design system'],
    featured: false,
    live: 'https://monority.vercel.app',
    github: 'https://github.com/ronanchenu/monority-base',
    visual: '/images/projects/monority-base.webp',
  },
]
