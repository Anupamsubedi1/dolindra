"use client"

import { motion } from 'framer-motion'
import type { IconType } from 'react-icons'
import {
  HiOutlineAcademicCap,
  HiOutlineBookOpen,
  HiOutlineBriefcase,
} from 'react-icons/hi2'
import { SectionHeading } from './ui/SectionHeading'
import { enterFromTopLeftBouncy, smoothEase, staggerSpringSlow } from '../utils/animations'

interface PatronshipCard {
  icon: IconType
  role: string
  org: string
  since: string
}

const patronships: PatronshipCard[] = [
  {
    icon: HiOutlineBriefcase,
    role: 'Managing Director',
    org: 'Himalaya Nepal Krishi Company Limited',
    since: 'Since 7th Baishakh 2083 BS',
  },
  {
    icon: HiOutlineBookOpen,
    role: 'Patron',
    org: 'Shami Literary Academy',
    since: 'Since inception',
  },
  {
    icon: HiOutlineAcademicCap,
    role: 'Patron',
    org: 'Nepal Studies and Research Center',
    since: 'Since 15 Mangsir 2074 BS',
  },
]

export function Patronships() {
  return (
    <section id="patronships" className="scroll-mt-28 bg-bg px-4 py-20 sm:px-8 lg:px-20 xl:px-32">
      <div className="mx-auto max-w-[1600px]">
        <SectionHeading
          eyebrow="Patronships"
          title="Patronships & Current Roles"
          subtitle="Stewardship across agriculture, literature, and research institutions."
        />

        <motion.div
          variants={staggerSpringSlow}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-12 grid gap-6 lg:grid-cols-3"
        >
          {patronships.map((item) => {
            const Icon = item.icon
            return (
              <motion.article
                key={item.org}
                variants={enterFromTopLeftBouncy}
                whileHover={{ y: -4, scale: 1.012 }}
                transition={{ duration: 0.35, ease: smoothEase }}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface p-7 shadow-soft transition-all duration-300 hover:border-primary/40 hover:shadow-lg"
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-gold to-primary-light" />

                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
                  <Icon size={26} />
                </span>

                <p className="mt-6 text-sm font-semibold uppercase tracking-[0.25em] text-primary">
                  {item.role}
                </p>
                <h3 className="mt-3 font-display text-2xl font-bold leading-tight text-dark">
                  {item.org}
                </h3>
                <p className="mt-4 text-sm leading-7 text-muted">{item.since}</p>

                <div className="mt-auto pt-6">
                  <div className="h-px w-full bg-border" />
                  <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                    Current responsibility
                  </p>
                </div>
              </motion.article>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
