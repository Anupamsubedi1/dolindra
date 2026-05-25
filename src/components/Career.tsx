"use client"

import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { FaBriefcase, FaBuildingColumns, FaChartLine, FaUsers } from 'react-icons/fa6'
import { careerData } from '../data/staticData'
import type { CareerItem } from '../types'
import { fadeInUp, smoothEase } from '../utils/animations'

const roleIcons = [FaChartLine, FaBuildingColumns, FaUsers, FaBriefcase]

function pickIcon(index: number) {
  return roleIcons[index % roleIcons.length]
}

function CareerCard({ item, initialX }: { item: CareerItem; initialX: number }) {
  return (
    <motion.article
      whileInView={{ opacity: 1, x: 0 }}
      initial={{ opacity: 0, x: initialX }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: smoothEase }}
      className="group rounded-2xl border border-border bg-surface p-5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:bg-dark hover:shadow-lg sm:rounded-[1.75rem] sm:p-6"
    >
      <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-primary sm:text-xs">
        {item.org}
      </p>
      <h3 className="mt-3 font-display text-xl font-bold text-dark transition-colors duration-300 group-hover:text-white sm:mt-4 sm:text-2xl">
        {item.role}
      </h3>
      <p className="mt-2 text-xs leading-6 text-muted transition-colors duration-300 group-hover:text-white/60 sm:text-sm sm:leading-7">
        {item.period}
      </p>
      <p className="mt-3 text-sm leading-7 text-muted transition-colors duration-300 group-hover:text-white/70 sm:mt-4">
        {item.description}
      </p>
    </motion.article>
  )
}

export function Career() {
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 80%', 'end 20%'],
  })
  const lineScale = useSpring(scrollYProgress, { stiffness: 60, damping: 24, mass: 0.6 })
  const glowY = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section id="career" className="relative scroll-mt-28 overflow-hidden bg-bg px-4 py-16 sm:px-8 sm:py-20 lg:px-20 xl:px-32">
      <div className="relative mx-auto max-w-[1600px]">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">Career Timeline</p>
          <h2 className="mt-5 font-display text-3xl font-bold text-dark sm:text-5xl lg:text-6xl">
            A Life of Leadership
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-muted sm:text-base">
            Three decades of stewardship across publishing, research, agriculture, and community development.
          </p>
        </motion.div>

        <div ref={sectionRef} className="relative mt-12 sm:mt-16 lg:mt-20">
          <div className="absolute left-5 top-0 h-full w-px bg-border lg:left-1/2 lg:-translate-x-1/2" />
          <motion.div
            style={{ scaleY: lineScale, originY: 0 }}
            className="absolute left-5 top-0 h-full w-[2px] bg-primary lg:left-1/2 lg:-translate-x-1/2"
          />
          <motion.div
            style={{ top: glowY }}
            className="pointer-events-none absolute left-5 hidden h-24 w-[2px] -translate-y-1/2 bg-primary/30 blur-md lg:left-1/2 lg:block lg:-translate-x-1/2"
          />

          <ul className="space-y-8 sm:space-y-10 lg:space-y-16">
            {careerData.map((item, index) => {
              const isLeft = index % 2 === 0
              const Icon = pickIcon(index)
              return (
                <li
                  key={`${item.role}-${item.org}`}
                  className="relative flex items-start lg:items-center"
                >
                  {/* Mobile/tablet: icon on left of card. Desktop: alternates. */}
                  <div className="relative z-10 flex h-11 w-11 flex-shrink-0 items-center justify-center lg:hidden">
                    <motion.span
                      initial={{ scale: 0.6, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{ duration: 0.55, delay: 0.1, ease: smoothEase }}
                      className="grid h-11 w-11 place-items-center rounded-full bg-primary text-white shadow-[0_8px_24px_rgba(192,57,43,0.35)] ring-4 ring-bg"
                    >
                      <Icon size={16} />
                    </motion.span>
                  </div>

                  {/* Desktop alternation — left side */}
                  {isLeft ? (
                    <div className="ml-5 flex-1 lg:ml-0 lg:w-[calc(50%-3rem)] lg:flex-none lg:pr-6">
                      <CareerCard item={item} initialX={-32} />
                    </div>
                  ) : (
                    <div className="hidden lg:block lg:w-[calc(50%-3rem)]" />
                  )}

                  {/* Desktop centered icon — hidden on mobile */}
                  <div className="relative z-10 hidden h-12 w-24 flex-shrink-0 items-center justify-center lg:flex">
                    <motion.div
                      initial={{ scale: 0.6, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{ duration: 0.55, delay: 0.1, ease: smoothEase }}
                      className="flex items-center justify-center"
                    >
                      <span className="relative grid h-12 w-12 place-items-center rounded-full bg-primary text-white shadow-[0_8px_24px_rgba(192,57,43,0.35)] ring-4 ring-bg transition-transform duration-300 group-hover:scale-105">
                        <Icon size={16} />
                      </span>
                    </motion.div>
                  </div>

                  {/* Desktop alternation — right side. On mobile the left card already filled the row. */}
                  {!isLeft ? (
                    <div className="ml-5 flex-1 lg:ml-0 lg:w-[calc(50%-3rem)] lg:flex-none lg:pl-6">
                      <CareerCard item={item} initialX={32} />
                    </div>
                  ) : (
                    <div className="hidden lg:block lg:w-[calc(50%-3rem)]" />
                  )}
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
