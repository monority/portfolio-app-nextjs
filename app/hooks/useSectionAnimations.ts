'use client'

import { useMemo } from 'react'
import {
    sectionFadeUp,
    sectionFadeLeft,
    sectionViewport,
    sectionStagger,
} from '@/components/ui/section/motion'

type TransitionPreset = 'fast' | 'default' | 'slow'

interface UseSectionAnimationsOptions {
    preset?: TransitionPreset
    stagger?: boolean
    viewportAmount?: number
}

const TRANSITION_PRESETS = {
    fast: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
    default: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
    slow: { duration: 1.0, ease: [0.16, 1, 0.3, 1] as const },
} as const

export function useSectionAnimations(options: UseSectionAnimationsOptions = {}) {
    const { preset = 'default', stagger = false, viewportAmount } = options

    const transition = useMemo(
        () => ({
            ...TRANSITION_PRESETS[preset],
        }),
        [preset]
    )

    const viewport = useMemo(
        () => ({
            ...sectionViewport,
            ...(viewportAmount && { amount: viewportAmount }),
        }),
        [viewportAmount]
    )

    const fadeUp = useMemo(
        () => ({
            ...sectionFadeUp,
            transition,
        }),
        [transition]
    )

    const fadeLeft = useMemo(
        () => ({
            ...sectionFadeLeft,
            transition,
        }),
        [transition]
    )

    const staggerConfig = useMemo(
        () => ({
            ...sectionStagger,
            visible: {
                ...sectionStagger.visible,
                transition: {
                    ...sectionStagger.visible.transition,
                    staggerChildren: preset === 'fast' ? 0.08 : 0.1,
                },
            },
        }),
        [preset]
    )

    return {
        transition,
        viewport,
        fadeUp,
        fadeLeft,
        stagger: stagger ? staggerConfig : undefined,
    }
}

export type { TransitionPreset }