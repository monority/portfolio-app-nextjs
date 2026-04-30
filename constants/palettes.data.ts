import type { ProjectPalettes } from '../types/index'

// ─── Shared Color Palettes ─────────────────────────────────────────────
// These palettes are used across both Creations and Modules sections
// to ensure visual consistency across the portfolio

export const PALETTES: Record<string, ProjectPalettes> = {
    // Green palette - used for nature/level design themes
    green: {
        dark: {
            accent: '#739b8a',
            bg: '#0a0c0b',
            surface: '#151816',
            fg: '#e8f0ec',
        },
        light: {
            accent: '#7ea792',
            bg: '#fcfdfc',
            surface: '#f5f7f5',
            fg: '#171b18',
        },
    },
    // Blue palette - used for UI/interface themes
    blue: {
        dark: {
            accent: '#8bb9d1',
            bg: '#0b0c0d',
            surface: '#121417',
            fg: '#e8edf1',
        },
        light: {
            accent: '#94adc0',
            bg: '#fdfdfd',
            surface: '#f7f8f9',
            fg: '#17191c',
        },
    },
    // Gold palette - used for game/creative themes
    gold: {
        dark: {
            accent: '#c8a16b',
            bg: '#0c0c0b',
            surface: '#151412',
            fg: '#f0ebe3',
        },
        light: {
            accent: '#b69367',
            bg: '#fefdfb',
            surface: '#f8f6f2',
            fg: '#1d1a16',
        },
    },
}
