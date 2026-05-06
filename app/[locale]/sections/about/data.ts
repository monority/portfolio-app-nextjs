import type { IconName } from '@shared-types/icons'

export const ABOUT_TECH_CONTAINER = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
} as const

const TECH_ROW_CLASSES = {
  wrapperClassName: 'about-tech-row',
  titleClassName: 'about-tech-row__title',
  listClassName: 'about-tech-row__list',
  itemClassName: 'about-tech-row__item',
} as const

export const ABOUT_TECH_GROUPS = [
  { id: 'frontend', items: ['react', 'nextjs', 'astro', 'tailwind', 'sass', 'motion'], ...TECH_ROW_CLASSES },
  { id: 'backend', items: ['node', 'express', 'mongo', 'jwt', 'nodemon', 'sql'], ...TECH_ROW_CLASSES },
  { id: 'hosting', items: ['vercel', 'railway', 'supabase', 'render', 'neon', 'firebase', 'cloudfare'], ...TECH_ROW_CLASSES },
  { id: 'languages', items: ['typescript', 'javascript', 'csharp'], ...TECH_ROW_CLASSES },
  { id: 'tools', items: ['github', 'vscode', 'postman', 'figma', 'docker', 'photoshop'], ...TECH_ROW_CLASSES },
] as const

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