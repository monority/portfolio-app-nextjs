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
  palette?: ProjectPalettes
  gallery?: string[]
  galleryDesktop?: string[]
}

export interface ProjectPalette {
  accent: string
  bg: string
  surface: string
  fg: string
}

export interface ProjectPalettes {
  dark: ProjectPalette
  light?: ProjectPalette
}

export interface Module {
  id: string
  title: string
  titleDisplay: string
  tagline: { fr: string; en: string }
  description: { fr: string; en: string }
  details: { fr: string; en: string }
  highlights: { fr: string; en: string }[]
  tech: string[]
  live?: string
  github?: string
  npm?: string
  year: string
  category: string
  featured?: boolean
  palette?: ProjectPalettes
}

export interface CreationItem {
  id: string
  title: string
  titleDisplay: string
  category: { fr: string; en: string }
  tagline: { fr: string; en: string }
  description: { fr: string; en: string }
  details: { fr: string; en: string }
  highlights: { fr: string; en: string }[]
  tools: string[]
  outputs: string[]
  year: string
  status: { fr: string; en: string }
  palette?: ProjectPalettes
  visual?: string
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
export type Lang = 'fr' | 'en'
