'use client'

import AiIcon from './icons/AiIcon'
import ArrowRightIcon from './icons/ArrowRightIcon'
import DockerIcon from './icons/DockerIcon'
import EmailIcon from './icons/EmailIcon'
import FigmaIcon from './icons/FigmaIcon'
import FirebaseIcon from './icons/FirebaseIcon'
import GithubIcon from './icons/GithubIcon'
import LinkedinIcon from './icons/LinkedinIcon'
import LocationIcon from './icons/LocationIcon'
import MotionIcon from './icons/MotionIcon'
import NeonIcon from './icons/NeonIcon'
import NETIcon from './icons/NETIcon'
import NextJsIcon from './icons/NextJsIcon'
import NodeIcon from './icons/NodeIcon'
import PhoneIcon from './icons/PhoneIcon'
import PHPIcon from './icons/PHPIcon'
import RailwayIcon from './icons/RailwayIcon'
import ReactIcon from './icons/ReactIcon'
import ResumeIcon from './icons/ResumeIcon'
import ScrumIcon from './icons/ScrumIcon'
import SQLIcon from './icons/SQLIcon'
import TimeIcon from './icons/TimeIcon'
import i18nIcon from './icons/i18nIcon'
import SassIcon from './icons/SassIcon'
import VercelIcon from './icons/VercelIcon'
import ItchIcon from './icons/ItchIcon'
import TypeScriptIcon from './icons/TypeScriptIcon'
import SupabaseIcon from './icons/SupabaseIcon'
import SvelteIcon from './icons/SvelteIcon'
import ThemeIcon from './icons/ThemeIcon'
import DarkModeToggleIcon from './icons/DarkModeToggleIcon'
import DarkModeIcon from './icons/DarkModeIcon'
import LightModeIcon from './icons/LightModeIcon'

import type { IconName } from './types'
import LanguageIcon from './icons/LanguageIcon'
import User from './icons/User'
import MessageIcon from './icons/MessageIcon'

type IconComponent = React.FC<any>

/**
 * Registry global des icônes disponibles
 * Associe chaque nom d'icône à son composant correspondant
 * @example
 * const IconComponent = iconRegistry['github']
 */
export const iconRegistry: Record<IconName, IconComponent> = {
    ai: AiIcon,
    arrowRight: ArrowRightIcon,
    docker: DockerIcon,
    email: EmailIcon,
    figma: FigmaIcon,
    firebase: FirebaseIcon,
    github: GithubIcon,
    linkedin: LinkedinIcon,
    location: LocationIcon,
    motion: MotionIcon,
    neon: NeonIcon,
    dotnet: NETIcon,
    nextjs: NextJsIcon,
    node: NodeIcon,
    phone: PhoneIcon,
    php: PHPIcon,
    railway: RailwayIcon,
    react: ReactIcon,
    resume: ResumeIcon,
    scrum: ScrumIcon,
    sql: SQLIcon,
    time: TimeIcon,
    i18n: i18nIcon,
    sass: SassIcon,
    vercel: VercelIcon,
    itch: ItchIcon,
    typescript: TypeScriptIcon,
    supabase: SupabaseIcon,
    svelte: SvelteIcon,
    theme: ThemeIcon,
    darkModeToggle: DarkModeToggleIcon,
    darkMode: DarkModeIcon,
    lightMode: LightModeIcon,
    language: LanguageIcon,
    user: User,
    message: MessageIcon
}
