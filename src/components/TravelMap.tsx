"use client"

import Image from 'next/image'
import { motion } from 'framer-motion'
import { visitedCountries } from '../data/staticData'
import { SectionHeading } from './ui/SectionHeading'
import { enterFromTopLeftBouncy, smoothEase, staggerSpringSlow } from '../utils/animations'

const continentTotals = ['Asia', 'Europe', 'Oceania']

const continentCounts = visitedCountries.reduce<Record<string, number>>((counts, country) => {
  counts[country.continent] = (counts[country.continent] ?? 0) + 1
  return counts
}, {})

export function TravelMap() {
  return (
    <section id="travel" className="scroll-mt-28 bg-bg px-4 py-20 sm:px-8 lg:px-20 xl:px-32">
      <div className="mx-auto max-w-[1600px]">
        <SectionHeading
          eyebrow="Global Footprint"
          title="A Global Perspective"
          subtitle="Countries visited by Dolindra Prasad Sharma across Asia, Europe, and Oceania."
        />

        <motion.div
          variants={staggerSpringSlow}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-12 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]"
        >
          <motion.div
            variants={enterFromTopLeftBouncy}
            className="border border-border bg-surface p-7 shadow-soft sm:p-8"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">Travel summary</p>
                <p className="mt-2 max-w-2xl text-sm leading-7 text-muted">
                  A compact view of places visited and the regions represented in the journey.
                </p>
              </div>
              <div className="rounded-2xl border border-primary/15 bg-primary/8 px-4 py-3 text-right">
                <p className="text-2xl font-bold text-dark">{visitedCountries.length}</p>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Countries</p>
              </div>
            </div>

            <motion.div variants={staggerSpringSlow} className="mt-7 flex flex-wrap gap-3">
              {visitedCountries.map((country) => (
                <motion.div
                  key={country.country}
                  variants={enterFromTopLeftBouncy}
                  whileHover={{ scale: 1.025, y: -2 }}
                  transition={{ duration: 0.3, ease: smoothEase }}
                  className="flex items-center gap-3 rounded-full border border-border bg-bg px-4 py-3 text-sm font-medium text-dark shadow-sm transition-all duration-300 hover:border-primary/50 hover:shadow-soft"
                >
                  <span className="relative flex h-8 w-8 overflow-hidden rounded-full bg-white shadow-sm ring-1 ring-border">
                    <Image
                      src={`https://flagcdn.com/w80/${country.code}.png`}
                      alt={`${country.country} flag`}
                      fill
                      sizes="32px"
                      className="object-cover"
                      unoptimized
                    />
                  </span>
                  <span>{country.country}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.aside
            variants={enterFromTopLeftBouncy}
            className="border border-border bg-dark p-7 text-white shadow-soft sm:p-8"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-white/50">Continent coverage</p>
            <div className="mt-6 space-y-4">
              {continentTotals.map((continent) => (
                <div key={continent} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center justify-between gap-4">
                    <p className="font-display text-lg font-semibold text-white">{continent}</p>
                    <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold text-white/80">
                      {continentCounts[continent] ?? 0} places
                    </span>
                  </div>
                  <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-primary"
                      style={{ width: `${Math.max(18, ((continentCounts[continent] ?? 0) / visitedCountries.length) * 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
                <p className="text-2xl font-bold text-white">4</p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/50">Regions</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
                <p className="text-2xl font-bold text-white">11+</p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/50">Visited</p>
              </div>
            </div>
          </motion.aside>
        </motion.div>
      </div>
    </section>
  )
}