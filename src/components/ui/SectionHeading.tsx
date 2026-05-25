'use client'

import { motion } from 'framer-motion'
import clsx from 'clsx'
import { smoothEase } from '../../utils/animations'

interface SectionHeadingProps {
  eyebrow: string
  title: string
  subtitle?: string
  centered?: boolean
}

export function SectionHeading({ eyebrow, title, subtitle, centered = false }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: smoothEase }}
      className={clsx(centered && 'mx-auto text-center')}
    >
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">{eyebrow}</p>
      <h2 className="mt-3 font-display text-4xl font-bold text-dark sm:text-5xl">{title}</h2>
      <span className={clsx('mt-5 block h-1 w-12 rounded-full bg-primary', centered && 'mx-auto')} />
      {subtitle && <p className={clsx('mt-5 max-w-2xl text-base leading-8 text-muted', centered && 'mx-auto')}>{subtitle}</p>}
    </motion.div>
  )
}