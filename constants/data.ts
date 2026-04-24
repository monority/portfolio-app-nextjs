import type { Person, Project, TimelineEntry, Quality } from '../types/index'
import type { IconName } from '@/components/ui/icon/types'

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
    title: 'HUMAN WORK FORCE',
    titleDisplay: 'Human Work Force',
    tagline: 'Les IA embauchent des humains.',
    description: {
      fr: 'Concept SaaS satirique où les intelligences artificielles recrutent des humains pour leurs tâches créatives.',
      en: 'Satirical SaaS concept where AIs recruit humans for creative tasks.',
    },
    longDescription: {
      fr: 'Ce projet explore une idée satirical - et si les IA décidaient d\'embaucher des humains pour des tâches créatives ? L\'interface a été pensée comme un vrai produit SaaS avec une expérience utilisateur soignée, des animations fluides et un design system cohérent.',
      en: 'This project explores a satirical idea - what if AIs decided to hire humans for creative tasks? The interface was designed like a real SaaS product with a polished user experience, smooth animations, and a coherent design system.',
    },
    tech: ['React 19', 'TypeScript', 'i18n', 'Framer Motion'],
    year: '2024',
    tags: ['SaaS', 'concept'],
    featured: true,
    live: 'https://humanworkforce.vercel.app',
    github: 'https://github.com/monority/human-work-force',
    visual: '/images/projects/human-work-force.webp',
    gallery: [
      '/images/projects/human-work-force.webp',
      '/images/projects/human-work-force.webp',
      '/images/projects/human-work-force.webp',
    ],
    accentColor: '#faa453',
  },
  {
    id: 'dashboard-rch',
    title: 'DASHBOARD',
    titleDisplay: 'Dashboard',
    tagline: 'Données de marché en temps réel.',
    description: {
      fr: 'Dashboard de visualisation de données financières avec mise à jour WebSocket.',
      en: 'Financial data visualization dashboard with WebSocket updates.',
    },
    longDescription: {
      fr: 'Application de visualisation de données financières avec des graphiques D3.js interactifs et des mises à jour en temps réel via WebSocket. L\'interface permet de filtrer et explorer les données de marché de manière intuitive.',
      en: 'Financial data visualization application with interactive D3.js charts and real-time updates via WebSocket. The interface allows filtering and exploring market data intuitively.',
    },
    tech: ['React', 'D3.js', 'WebSocket', 'TypeScript'],
    year: '2024',
    tags: ['dashboard', 'data'],
    featured: false,
    live: 'https://dashboard-rch.vercel.app',
    github: 'https://github.com/monority/dashboard-rch',
    visual: '/images/projects/dashboard-rch.webp',
    gallery: [
      '/images/projects/dashboard-rch.webp',
      '/images/projects/dashboard-rch.webp',
      '/images/projects/dashboard-rch.webp',
    ],
  },
  {
    id: 'skillswap',
    title: 'SKILLSWAP',
    titleDisplay: 'SkillSwap',
    tagline: 'Échangez vos compétences.',
    description: {
      fr: 'Plateforme peer-to-peer d\'échange de compétences.',
      en: 'Peer-to-peer skill exchange platform.',
    },
    longDescription: {
      fr: 'Plateforme d\'échange de compétences entre particuliers avec messagerie temps réel, matching algorithmique basé sur les compétences et les disponibilités, et système de profils vérifiés pour，建立信任.',
      en: 'Skill exchange platform between individuals with real-time messaging, algorithmic matching based on skills and availability, and verified profiles system to build trust.',
    },
    tech: ['React 19', 'Node.js', 'WebSocket', 'PostgreSQL'],
    year: '2024',
    tags: ['plateforme', 'social'],
    featured: false,
    live: 'https://skillswap.vercel.app',
    github: 'https://github.com/monority/skillswap',
    visual: '/images/projects/skillswap.webp',
    gallery: [
      '/images/projects/skillswap.webp',
      '/images/projects/skillswap.webp',
      '/images/projects/skillswap.webp',
    ],
  },
  {
    id: 'horloges',
    title: 'HORLOGES',
    titleDisplay: 'Horloges',
    tagline: 'La marketplace des montres rares.',
    description: {
      fr: 'Marketplace dédiée aux montres avec filtres avancés.',
      en: 'Watches marketplace with advanced filters.',
    },
    longDescription: {
      fr: 'Marketplace spécialisée dans les montres rares avec un système de filtres avancés permettant de affiner les recherches par marque, prix, état. Système de wishlist et alertes de prix pour ne pas manquer les bonnes affaires.',
      en: 'Specialized marketplace for rare watches with an advanced filtering system to refine searches by brand, price, condition. Wishlist and price alert system to not miss good deals.',
    },
    tech: ['Next.js', 'Prisma', 'PostgreSQL', 'Stripe'],
    year: '2023',
    tags: ['e-commerce', 'marketplace'],
    featured: false,
    live: 'https://horloges.vercel.app',
    github: 'https://github.com/monority/horloge-app-react',
    visual: '/images/projects/horloges.webp',
    gallery: [
      '/images/projects/horloges.webp',
      '/images/projects/horloges.webp',
      '/images/projects/horloges.webp',
    ],
  },
  {
    id: 'cesar-lezard',
    title: 'CESAR_LEZARD',
    titleDisplay: 'César Lézard',
    tagline: 'Expérience musicale immersive.',
    description: {
      fr: 'Site vitrine interactif pour un artiste musical.',
      en: 'Interactive showcase for a music artist.',
    },
    longDescription: {
      fr: 'Site vitrine immersif pour un artiste musical avec des animations WebGL et GSAP créant une expérience visuelle unique. L\'interface reflète l\'univers musical de l\'artiste avec une navigation intuitive.',
      en: 'Immersive showcase website for a music artist with WebGL and GSAP animations creating a unique visual experience. The interface reflects the artist\'s musical universe with intuitive navigation.',
    },
    tech: ['Next.js', 'GSAP', 'Three.js', 'CSS'],
    year: '2023',
    tags: ['vitrine', 'musique'],
    featured: false,
    live: 'https://cesarl.vercel.app',
    github: 'https://github.com/monority/cesar-lezard',
    visual: '/images/projects/cesar-lezard.webp',
    gallery: [
      '/images/projects/cesar-lezard.webp',
      '/images/projects/cesar-lezard.webp',
      '/images/projects/cesar-lezard.webp',
    ],
  },
  {
    id: 'monority-base',
    title: 'MONORITY_BASE',
    titleDisplay: 'Monority Base',
    tagline: 'Design system open source.',
    description: {
      fr: 'Bibliothèque de composants React avec design system complet.',
      en: 'React component library with complete design system.',
    },
    longDescription: {
      fr: 'Bibliothèque de composants React open-source accompagnée d\'un design system complet avec tokens CSS, documentation Storybook et examples interactifs. Un projet personnel pour explorer les bonnes pratiques du design system.',
      en: 'Open-source React component library with a complete design system including CSS tokens, Storybook documentation, and interactive examples. A personal project to explore design system best practices.',
    },
    tech: ['React', 'Storybook', 'TypeScript', 'CSS'],
    year: '2023',
    tags: ['open source', 'design system'],
    featured: false,
    live: 'https://monority.vercel.app',
    github: 'https://github.com/monority/library-monority-react',
    visual: '/images/projects/monority-base.webp',
    gallery: [
      '/images/projects/monority-base.webp',
      '/images/projects/monority-base.webp',
      '/images/projects/monority-base.webp',
    ],
  },
]
