import type { Variants } from 'framer-motion'

// Single canonical easing curve used across the whole site.
// "smooth" easeOutQuart-style — refined, no bounce, no rush.
export const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1]

export const DURATION = {
  fast: 0.35,
  base: 0.6,
  slow: 0.8,
} as const

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.base, ease: smoothEase },
  },
}

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -28 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: DURATION.base, ease: smoothEase },
  },
}

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 28 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: DURATION.base, ease: smoothEase },
  },
}

export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } },
}

export const staggerFast: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: DURATION.base, ease: smoothEase },
  },
}

// Re-exported under their old names so existing imports keep working,
// but the underlying motion is now a clean, consistent fade-up rather
// than a dramatic bouncy spring.
export const enterFromTopLeftBouncy: Variants = fadeInUp
export const staggerSpringSlow: Variants = staggerContainer
