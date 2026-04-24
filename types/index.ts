// ─── Global Types ────────────────────────────────────────────────

export interface Project {
  id: string
  title: string            // SCREAMING_SNAKE_CASE — affiché
  titleDisplay: string     // "Human Work Force" — usage courant
  tagline: string
  description: { fr: string; en: string }
  longDescription?: { fr: string; en: string }
  tech: string[]
  live?: string
  github?: string
  year: string
  tags: string[]
  featured?: boolean
  visual: string           // '/images/projects/xxx.webp'
  accentColor?: string
  gallery?: string[]
}

export interface TimelineEntry {
  id: string
  year: string
  title: string
  subtitle: string
  description: { fr: string; en: string }
  type: 'work' | 'project' | 'education'
}

export interface Skill {
  name: string
  category: 'frontend' | 'backend' | 'tools' | 'learning'
  level: 'expert' | 'confirmed' | 'learning'
}

export interface Quality {
  id: string
  number: string
  title: { fr: string; en: string }
  description: { fr: string; en: string }
}

export interface Person {
  name: string
  nameDisplay: string
  role: { fr: string; en: string }
  location: string
  bio: { fr: string; en: string }
  email: string
  github: string
  linkedin: string
  phone?: string
  available: boolean
}

export type Theme = 'light' | 'dark'
export type Lang  = 'fr' | 'en'
