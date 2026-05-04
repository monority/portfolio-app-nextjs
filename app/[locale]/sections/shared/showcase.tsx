'use client'

import { AnimatePresence, motion, type Transition } from "framer-motion"
import { useState, type CSSProperties, type ReactNode } from "react"

type ShowcaseItem = {
    id: string
}

const SHOWCASE_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]
const SHOWCASE_PANEL_TRANSITION: Transition = { duration: 0.35, ease: SHOWCASE_EASE }

export function useActiveShowcaseItem<T extends ShowcaseItem>(items: readonly T[]) {
    const initialItem = items[0]

    if (!initialItem) {
        throw new Error("useActiveShowcaseItem requires at least one item")
    }

    const [activeId, setActiveId] = useState<string>(initialItem.id)
    const activeItem = items.find((item) => item.id === activeId) ?? initialItem

    return {
        activeId,
        setActiveId,
        activeItem,
    }
}

export function getShowcasePickerTransition(index: number): Transition {
    return {
        duration: 0.45,
        ease: SHOWCASE_EASE,
        delay: index * 0.05,
    }
}

export function ShowcasePanel({
    panelKey,
    className,
    style,
    children,
}: {
    panelKey: string
    className: string
    style: CSSProperties
    children: ReactNode
}) {
    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={panelKey}
                className={className}
                style={style}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={SHOWCASE_PANEL_TRANSITION}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    )
}