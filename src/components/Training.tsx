"use client"

import { motion, type Variants } from 'framer-motion'
import {
  HiOutlineAcademicCap,
  HiOutlineBanknotes,
  HiOutlineBeaker,
  HiOutlineBookOpen,
  HiOutlineGlobeAlt,
  HiOutlineHeart,
  HiOutlineLanguage,
  HiOutlinePresentationChartLine,
  HiOutlineSparkles,
  HiOutlineUserGroup,
} from 'react-icons/hi2'
import type { TrainingItem } from '../types'
import { skills, trainingPrograms } from '../data/staticData'
import { smoothEase } from '../utils/animations'

function trainingIcon(title: string) {
  const lower = title.toLowerCase()
  if (lower.includes('leadership')) return HiOutlinePresentationChartLine
  if (lower.includes('savings') || lower.includes('credit') || lower.includes('financial') || lower.includes('account') || lower.includes('fundraising')) {
    return HiOutlineBanknotes
  }
  if (lower.includes('health') || lower.includes('sanitation')) return HiOutlineHeart
  if (lower.includes('animal')) return HiOutlineBeaker
  if (lower.includes('education')) return HiOutlineBookOpen
  return HiOutlineSparkles
}

function skillIcon(title: string) {
  const lower = title.toLowerCase()
  if (lower.includes('english') || lower.includes('language')) return HiOutlineLanguage
  if (lower.includes('computer') || lower.includes('digital')) return HiOutlineGlobeAlt
  return HiOutlineUserGroup
}

const cardEntrance: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: smoothEase },
  },
}

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: smoothEase },
  },
}

const subtleLift: Variants = {
  hover: { y: -3, transition: { duration: 0.25, ease: smoothEase } },
  tap: { y: 0, transition: { duration: 0.15, ease: smoothEase } },
}

const staggerNormal: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.04 } },
}

export function Training() {
  return (
    <section
      id="training"
      className="scroll-mt-28 bg-bg px-4 py-24 sm:px-8 lg:px-20 xl:px-32"
    >
      <div className="mx-auto max-w-[1600px] space-y-10">

        {/* ── Skills & Languages ── */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="rounded-3xl border border-border bg-surface p-8 shadow-soft sm:p-10"
        >
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">
              Skills &amp; Languages
            </p>
            <h2 className="mt-3 font-display text-4xl font-bold text-dark">Capabilities</h2>
          </div>

          <motion.div
            variants={staggerNormal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="mt-8 grid gap-4 sm:grid-cols-2"
          >
            {skills.map((skill) => {
              const Icon = skillIcon(skill.title)
              return (
                <motion.div
                  key={skill.title}
                  variants={{ ...cardEntrance, ...subtleLift }}
                  whileHover="hover"
                  whileTap="tap"
                  className="group flex items-start gap-4 rounded-2xl border border-border bg-bg p-5 transition-colors duration-300 hover:border-primary/40"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
                    <Icon size={20} />
                  </span>
                  <div className="min-w-0">
                    <p className="text-base font-semibold text-dark">{skill.title}</p>
                    <p className="mt-1 text-sm leading-6 text-muted">{skill.detail}</p>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </motion.div>

        {/* ── Training Programs ── */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="rounded-3xl border border-white/5 bg-dark p-8 text-white shadow-soft sm:p-10"
        >
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary-light">
                Training Programs
              </p>
              <h2 className="mt-3 font-display text-4xl font-bold">Professional Development</h2>
              <p className="mt-4 text-sm leading-7 text-white/65 sm:text-base">
                A career-long record of structured training across leadership, finance,
                health, and community development.
              </p>
            </div>
            <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2">
              <HiOutlineAcademicCap className="text-primary-light" size={18} />
              <span className="text-sm font-semibold tabular-nums text-white">
                {trainingPrograms.length} programs
              </span>
            </div>
          </div>

          <motion.ul
            variants={staggerNormal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="mt-8 grid gap-4 sm:grid-cols-2"
          >
            {trainingPrograms.map((training: TrainingItem) => {
              const Icon = trainingIcon(training.title)
              return (
                <motion.li
                  key={training.title}
                  variants={{ ...cardEntrance, ...subtleLift }}
                  whileHover="hover"
                  whileTap="tap"
                  className="group flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition-colors duration-300 hover:border-primary-light/50 hover:bg-white/[0.07]"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/20 text-primary-light transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
                    <Icon size={20} />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold leading-6 text-white sm:text-base">
                      {training.title}
                    </p>
                    <p className="mt-1 text-sm leading-6 text-white/55">
                      {training.detail}
                    </p>
                  </div>
                </motion.li>
              )
            })}
          </motion.ul>
        </motion.div>

      </div>
    </section>
  )
}
