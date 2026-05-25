"use client"

import { motion } from 'framer-motion'
import {
  HiOutlineAcademicCap,
  HiOutlineBookOpen,
  HiOutlineBuildingLibrary,
  HiOutlineGlobeAlt,
  HiOutlineSparkles,
} from 'react-icons/hi2'
import { educationData } from '../data/staticData'
import { fadeInUp, smoothEase, staggerContainer } from '../utils/animations'

const educationIcons = [
  HiOutlineAcademicCap,
  HiOutlineBuildingLibrary,
  HiOutlineBookOpen,
  HiOutlineGlobeAlt,
  HiOutlineSparkles,
]

function levelLabel(degree: string): string {
  const lower = degree.toLowerCase()
  if (lower.includes('mpa') || lower.includes('master')) return 'Postgraduate'
  if (lower.includes('bachelor') || lower.includes('ba')) return 'Undergraduate'
  if (lower.includes('proficiency') || lower.includes('pcl')) return 'Intermediate'
  if (lower.includes('slc') || lower.includes('school')) return 'Secondary'
  return 'Programme'
}

const cardVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: smoothEase },
  },
}

export function Education() {
  return (
    <section
      id="education"
      className="scroll-mt-28 bg-bg px-4 py-20 sm:px-8 lg:px-20 xl:px-32"
    >
      <div className="mx-auto max-w-[1600px]">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="max-w-2xl"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">
            Education
          </p>
          <h2 className="mt-3 font-display text-4xl font-bold text-dark sm:text-5xl">
            Academic Foundation
          </h2>
          <p className="mt-5 text-base leading-8 text-muted">
            Five degrees across public administration, political science, and the
            liberal arts. Each one shapes the way I lead institutions today.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {educationData.map((item, index) => {
            const Icon = educationIcons[index % educationIcons.length]
            const isFeatured = index === 0
            return (
              <motion.article
                key={item.degree}
                variants={cardVariant}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.35, ease: smoothEase }}
                className={
                  isFeatured
                    ? 'group relative flex flex-col justify-between rounded-3xl bg-dark p-7 text-white shadow-soft sm:col-span-2 lg:col-span-1 lg:row-span-2'
                    : 'group relative flex flex-col justify-between rounded-3xl border border-border bg-surface p-7 shadow-soft transition-colors duration-300 hover:border-primary/40'
                }
              >
                {/* Top row: icon + year */}
                <div className="flex items-start justify-between gap-4">
                  <span
                    className={
                      isFeatured
                        ? 'flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white'
                        : 'flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white'
                    }
                  >
                    <Icon size={22} />
                  </span>
                  <span
                    className={
                      isFeatured
                        ? 'rounded-full bg-gold/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-gold'
                        : 'rounded-full bg-gold/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-gold'
                    }
                  >
                    {item.year}
                  </span>
                </div>

                {/* Body */}
                <div className="mt-8">
                  <p
                    className={
                      isFeatured
                        ? 'text-xs font-semibold uppercase tracking-[0.25em] text-white/55'
                        : 'text-xs font-semibold uppercase tracking-[0.25em] text-muted'
                    }
                  >
                    {levelLabel(item.degree)}
                  </p>
                  <h3
                    className={
                      isFeatured
                        ? 'mt-3 font-display text-2xl font-bold leading-tight sm:text-3xl'
                        : 'mt-3 font-display text-xl font-bold leading-tight text-dark sm:text-2xl'
                    }
                  >
                    {item.degree}
                  </h3>
                  <p
                    className={
                      isFeatured
                        ? 'mt-3 text-sm leading-7 text-white/70'
                        : 'mt-3 text-sm leading-7 text-muted'
                    }
                  >
                    {item.field}
                  </p>
                </div>

                {/* Footer */}
                <div
                  className={
                    isFeatured
                      ? 'mt-8 flex items-center gap-3 border-t border-white/10 pt-5'
                      : 'mt-8 flex items-center gap-3 border-t border-border pt-5'
                  }
                >
                  <span
                    className={
                      isFeatured
                        ? 'inline-flex h-2 w-2 rounded-full bg-gold'
                        : 'inline-flex h-2 w-2 rounded-full bg-primary'
                    }
                  />
                  <p
                    className={
                      isFeatured
                        ? 'text-sm font-semibold text-white'
                        : 'text-sm font-semibold text-dark'
                    }
                  >
                    {item.institution}
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
