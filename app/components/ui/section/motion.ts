export const sectionFadeUp = {
  hidden: { y: 24, opacity: 0 },
  visible: { y: 0, opacity: 1 },
}

export const sectionFadeLeft = {
  hidden: { x: -24, opacity: 0 },
  visible: { x: 0, opacity: 1 },
}

export const sectionViewport = { once: true, amount: 0.15 } as const

export const sectionStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
}
