"use client"

import { useEffect, useRef, useState } from 'react'
import type { ComponentType } from 'react'
import { motion } from 'framer-motion'
import { FaQuoteLeft } from 'react-icons/fa6'
import {
  HiOutlineBriefcase,
  HiOutlineIdentification,
  HiOutlineLanguage,
  HiOutlineMapPin,
} from 'react-icons/hi2'
import { aboutDetails, aboutStats, patronships } from '../data/staticData'
import { scaleIn, smoothEase, staggerContainer } from '../utils/animations'

const slideFromLeft = {
  hidden: { opacity: 0, x: -32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: smoothEase },
  },
}

const slideFromRight = {
  hidden: { opacity: 0, x: 32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: smoothEase, delay: 0.08 },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: smoothEase },
  },
}

type IconCmp = ComponentType<{ size?: number; className?: string }>

const detailIcons: Record<string, IconCmp> = {
  'Full Name': HiOutlineIdentification,
  Profession: HiOutlineBriefcase,
  Location: HiOutlineMapPin,
  Languages: HiOutlineLanguage,
}

function CountUpValue({ value }: { value: string }) {
  const [displayValue, setDisplayValue] = useState('0')
  const ref = useRef<HTMLSpanElement | null>(null)
  const [visible, setVisible] = useState(false)
  const hasRun = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      threshold: 0.4,
    })

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!visible || hasRun.current) {
      return
    }

    const target = Number.parseInt(value, 10)
    if (Number.isNaN(target)) {
      setDisplayValue(value)
      hasRun.current = true
      return
    }

    hasRun.current = true
    let current = 0
    const step = Math.max(1, Math.ceil(target / 30))
    const interval = window.setInterval(() => {
      current += step
      if (current >= target) {
        current = target
        window.clearInterval(interval)
      }
      setDisplayValue(`${current}+`)
    }, 35)

    return () => window.clearInterval(interval)
  }, [value, visible])

  return <span ref={ref}>{displayValue}</span>
}

export function About() {
  return (
    <section id="about" className="scroll-mt-28 bg-bg px-4 py-16 sm:px-8 sm:py-20 lg:px-20 xl:px-32">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="mx-auto grid max-w-[1600px] gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10"
      >
        {/* ── Left bio card ── */}
        <motion.div
          variants={slideFromLeft}
          className="group/bio rounded-[1.75rem] border border-border bg-surface p-6 shadow-soft transition-all duration-300 hover:border-dark hover:bg-dark sm:p-8 lg:rounded-[2rem] lg:p-10"
        >
          <FaQuoteLeft className="text-4xl text-primary/25 transition-colors duration-300 group-hover/bio:text-white/25 sm:text-5xl" />

          <motion.p
            variants={fadeUp}
            className="mt-5 text-base font-medium leading-8 text-dark transition-colors duration-300 group-hover/bio:text-white sm:mt-6 sm:text-lg sm:leading-9 lg:text-[1.35rem] lg:leading-[1.85rem]"
          >
            I&apos;m{' '}
            <span className="font-semibold text-primary transition-colors duration-300 group-hover/bio:text-primary-light">
              Dolindra Prasad Sharma
            </span>
            , a public administrator, author, and organizational leader. I lead institutions to
            turn ideas into sustainable outcomes across publishing, research, and agriculture.
            I hold an MPA (Public Administration &amp; Resource Management) and an MA in Political
            Science from Tribhuvan University, and my writing includes the anthology{' '}
            <span className="italic">Badalbhitra Ko Gham</span> and essays in{' '}
            <span className="italic">Vision and Horizon</span> and{' '}
            <span className="italic">Cognition</span>. Currently I serve as Managing Director of
            Himalaya Nepal Krishi Company Limited and continue to support literary and academic
            initiatives as a patron.
          </motion.p>

          <div className="mt-7 grid gap-3 sm:mt-9 sm:grid-cols-2 sm:gap-4">
            {aboutDetails.map((item) => {
              const Icon = detailIcons[item.label] ?? HiOutlineIdentification
              return (
                <motion.div
                  key={item.label}
                  variants={fadeUp}
                  className="flex items-start gap-3 rounded-2xl border border-border bg-bg p-4 transition-all duration-300 group-hover/bio:border-white/10 group-hover/bio:bg-white/[0.06] sm:gap-4 sm:p-5"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 group-hover/bio:bg-primary group-hover/bio:text-white">
                    <Icon size={18} />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-muted transition-colors duration-300 group-hover/bio:text-white/55 sm:text-xs">
                      {item.label}
                    </p>
                    <p className="mt-1 break-words text-sm font-semibold text-dark transition-colors duration-300 group-hover/bio:text-white sm:text-base">
                      {item.value}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* ── Right column ── */}
        <motion.div variants={slideFromRight} className="space-y-5 sm:space-y-6">

          {/* Stats grid */}
          <motion.div variants={staggerContainer} className="grid grid-cols-2 gap-3 sm:gap-4">
            {aboutStats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={scaleIn}
                className="group/stat rounded-2xl border border-border bg-surface p-5 shadow-soft transition-all duration-300 hover:border-dark hover:bg-dark sm:rounded-[1.75rem] sm:p-6"
              >
                <p className="font-display text-3xl font-bold text-emerald-700 transition-colors duration-300 group-hover/stat:text-emerald-300 sm:text-4xl">
                  <CountUpValue value={stat.value.replace(/\D/g, '')} />
                </p>
                <p className="mt-2 text-xs leading-5 text-muted transition-colors duration-300 group-hover/stat:text-white/65 sm:text-sm sm:leading-6">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* ── Patronships dark card ── */}
          <motion.div
            variants={fadeUp}
            className="group/patron rounded-[1.75rem] border border-border bg-dark p-6 text-white shadow-soft transition-all duration-300 hover:bg-slate-800 sm:p-7 lg:rounded-[2rem]"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/55 sm:text-sm">
              Patronships &amp; Current Roles
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-3 sm:gap-4">
              {patronships.map((item) => (
                <motion.div
                  key={item.detail}
                  variants={fadeUp}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4 transition-all duration-300 hover:border-emerald-400/40 hover:bg-white/10"
                >
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-emerald-300 sm:text-xs">
                    {item.title}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-white/85 sm:text-sm sm:leading-7">
                    {item.detail}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </motion.div>
      </motion.div>
    </section>
  )
}
