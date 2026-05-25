"use client"

import { AnimatePresence, motion } from 'framer-motion'
import { FaBook, FaNewspaper, FaMagnifyingGlass, FaXmark } from 'react-icons/fa6'
import clsx from 'clsx'
import { usePublications } from '../hooks/usePublications'
import { enterFromTopLeftBouncy, smoothEase, staggerSpringSlow } from '../utils/animations'
import { SectionHeading } from './ui/SectionHeading'

// ─── constants ────────────────────────────────────────────────────────────────

const TYPE_TABS = ['all', 'anthology', 'essay', 'article', 'book'] as const
const LANG_TABS = ['all', 'English', 'Nepali'] as const

const TYPE_LABELS: Record<string, string> = {
  all: 'All types',
  book: 'Book',
  essay: 'Essay',
  article: 'Article',
  anthology: 'Anthology',
}

const TYPE_BADGE: Record<string, string> = {
  book:      'border-l-2 border-emerald-600 bg-emerald-50  text-emerald-800 group-hover/pub:bg-emerald-950/20 group-hover/pub:text-emerald-200 group-hover/pub:border-emerald-400',
  essay:     'border-l-2 border-primary     bg-primary/[.07] text-primary group-hover/pub:bg-primary/20 group-hover/pub:text-primary-light group-hover/pub:border-primary-light',
  article:   'border-l-2 border-sky-600     bg-sky-50      text-sky-800 group-hover/pub:bg-sky-950/20 group-hover/pub:text-sky-200 group-hover/pub:border-sky-400',
  anthology: 'border-l-2 border-amber-600   bg-amber-50    text-amber-800 group-hover/pub:bg-amber-950/20 group-hover/pub:text-amber-200 group-hover/pub:border-amber-400',
}

// ─── chip component ────────────────────────────────────────────────────────────

function Chip({
  label,
  active,
  onClick,
}: {
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        'relative border px-4 py-1.5 text-sm font-medium transition-all duration-300',
        active
          ? 'border-primary bg-primary text-white'
          : 'border-border bg-surface text-muted hover:border-primary hover:text-dark',
      )}
    >
      {label}
    </button>
  )
}

// ─── skeleton card ─────────────────────────────────────────────────────────────

function PubSkeleton() {
  return (
    <div className="flex h-52 flex-col justify-between border border-border bg-surface p-5">
      <div className="space-y-3">
        <div className="h-5 w-20 animate-pulse bg-border" />
        <div className="h-4 w-3/4 animate-pulse bg-border" />
        <div className="h-4 w-1/2 animate-pulse bg-border" />
      </div>
      <div className="flex gap-2">
        <div className="h-6 w-16 animate-pulse bg-border" />
        <div className="h-6 w-16 animate-pulse bg-border" />
      </div>
    </div>
  )
}

// ─── main component ────────────────────────────────────────────────────────────

export function Publications() {
  const {
    publications,
    loading,
    error,
    refetch,
    typeFilter,
    languageFilter,
    keyword,
    setTypeFilter,
    setLanguageFilter,
    setKeyword,
    usingFallback,
  } = usePublications()

  const hasActiveFilter =
    typeFilter !== 'all' || languageFilter !== 'all' || keyword.trim() !== ''

  function clearFilters() {
    setTypeFilter('all')
    setLanguageFilter('all')
    setKeyword('')
  }

  return (
    <section
      id="publications"
      className="scroll-mt-28 bg-bg px-4 py-16 sm:px-8 sm:py-24 lg:px-20 xl:px-32"
    >
      <div className="mx-auto max-w-[1600px]">

        {/* ── heading ── */}
        <SectionHeading
          eyebrow="Publications"
          title="Publications & Writings"
          subtitle="Exploring governance, identity, and society through words."
        />

        {/* ── search + filters ── */}
        <motion.div
          variants={staggerSpringSlow}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-12 space-y-4"
        >

          {/* Search bar */}
          <motion.label
            variants={enterFromTopLeftBouncy}
            className="flex w-full items-center gap-3 border border-border bg-surface px-5 py-3 shadow-sm transition-all duration-300 focus-within:border-primary/50 focus-within:shadow-md sm:max-w-lg"
          >
            <FaMagnifyingGlass className="flex-shrink-0 text-sm text-muted" />
            <input
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Search by title, tag, publisher…"
              className="w-full bg-transparent text-sm text-dark outline-none placeholder:text-muted"
            />
            {keyword && (
              <button
                onClick={() => setKeyword('')}
                className="flex-shrink-0 text-muted transition-colors duration-300 hover:text-dark"
                aria-label="Clear search"
              >
                <FaXmark className="text-sm" />
              </button>
            )}
          </motion.label>

          {/* Filter rows */}
          <motion.div variants={enterFromTopLeftBouncy} className="flex flex-wrap items-center gap-y-3 gap-x-6">

            {/* Type chips */}
            <div className="flex flex-wrap gap-2">
              {TYPE_TABS.map((tab) => (
                <Chip
                  key={tab}
                  label={TYPE_LABELS[tab]}
                  active={typeFilter === tab}
                  onClick={() => setTypeFilter(tab)}
                />
              ))}
            </div>

            {/* Divider */}
            <div className="hidden h-5 w-px bg-border lg:block" />

            {/* Language chips */}
            <div className="flex flex-wrap gap-2">
              {LANG_TABS.map((tab) => (
                <Chip
                  key={tab}
                  label={tab === 'all' ? 'All languages' : tab}
                  active={languageFilter === tab}
                  onClick={() => setLanguageFilter(tab)}
                />
              ))}
            </div>
          </motion.div>

          {/* Meta row: result count + clear */}
          <motion.div variants={enterFromTopLeftBouncy} className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted">
              <FaBook className="text-primary" />
              {loading ? 'Loading…' : `${publications.length} result${publications.length !== 1 ? 's' : ''}`}
            </span>
            {hasActiveFilter && !loading && (
              <button
                onClick={clearFilters}
                className="text-xs font-semibold text-primary underline-offset-2 transition-all duration-300 hover:underline"
              >
                Clear filters
              </button>
            )}
          </motion.div>
        </motion.div>

        {/* ── error banner ── */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: smoothEase }}
            className="mt-4 flex flex-wrap items-center justify-between gap-3 border border-rose-200 bg-rose-50 px-5 py-3 text-sm"
          >
            <p className="text-rose-700">{error}</p>
            <button
              onClick={refetch}
              className="border border-rose-600 bg-rose-600 px-4 py-1.5 text-xs font-semibold text-white transition-colors duration-300 hover:bg-rose-700"
            >
              Retry
            </button>
            {usingFallback && (
              <p className="w-full text-xs text-rose-500">Showing offline seed data.</p>
            )}
          </motion.div>
        )}

        {/* ── grid ── */}
        <div className="mt-8">
          <AnimatePresence mode="wait">

            {/* Loading */}
            {loading && (
              <motion.div
                key="loading"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                exit="hidden"
                variants={staggerSpringSlow}
                className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
              >
                {Array.from({ length: 6 }).map((_, i) => (
                  <motion.div key={i} variants={enterFromTopLeftBouncy}>
                    <PubSkeleton />
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* Empty state */}
            {!loading && publications.length === 0 && (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: smoothEase }}
                className="flex flex-col items-center justify-center border border-dashed border-border bg-surface py-20 text-center transition-all duration-300 hover:bg-dark/5"
              >
                <FaNewspaper className="text-4xl text-border" />
                <h3 className="mt-5 font-display text-xl font-semibold text-dark">
                  No publications found
                </h3>
                <p className="mt-2 text-sm text-muted">
                  Try adjusting your search or filters.
                </p>
                {hasActiveFilter && (
                  <button
                    onClick={clearFilters}
                    className="mt-6 border border-border px-5 py-2 text-sm font-semibold text-dark transition-all duration-300 hover:-translate-y-1 hover:bg-primary hover:text-white hover:border-primary"
                  >
                    Clear filters
                  </button>
                )}
              </motion.div>
            )}

            {/* Cards */}
            {!loading && publications.length > 0 && (
              <motion.div
                key="content"
                variants={staggerSpringSlow}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                className="grid gap-6 sm:gap-7 md:grid-cols-2 xl:grid-cols-3"
              >
                <AnimatePresence mode="popLayout">
                  {publications.map((pub) => (
                    <motion.article
                      layout
                      key={pub.id}
                      variants={enterFromTopLeftBouncy}
                      exit={{ opacity: 0, scale: 0.96, y: 12, transition: { duration: 0.3, ease: smoothEase } }}
                      whileHover={{ y: -4, scale: 1.01 }}
                      transition={{ duration: 0.35, ease: smoothEase }}
                      className="group/pub flex flex-col rounded-2xl border border-border bg-surface p-7 shadow-soft transition-all duration-300 hover:bg-dark hover:shadow-lg sm:p-8"
                    >
                      {/* Top: badge */}
                      <span
                        className={clsx(
                          'inline-flex self-start rounded-md px-3.5 py-1 text-xs font-semibold uppercase tracking-widest transition-all duration-300',
                          TYPE_BADGE[pub.type] ?? 'border-l-2 border-border bg-bg text-muted group-hover/pub:bg-white/10 group-hover/pub:text-white/80 group-hover/pub:border-white/20',
                        )}
                      >
                        {TYPE_LABELS[pub.type] ?? pub.type}
                      </span>

                      {/* Title */}
                      <h3 className="mt-5 font-display text-xl font-bold leading-snug text-dark transition-colors duration-300 group-hover/pub:text-white sm:text-2xl">
                        {pub.title}
                      </h3>

                      {/* Meta */}
                      <dl className="mt-5 space-y-1.5 text-sm text-muted transition-colors duration-300 group-hover/pub:text-white/65">
                        <div className="flex flex-wrap gap-1.5">
                          <dt className="font-semibold text-dark transition-colors duration-300 group-hover/pub:text-white">Published in:</dt>
                          <dd>{pub.publishedIn}</dd>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          <dt className="font-semibold text-dark transition-colors duration-300 group-hover/pub:text-white">Year:</dt>
                          <dd>{pub.year}</dd>
                        </div>
                      </dl>

                      {/* Tags */}
                      <div className="mt-5 flex flex-wrap gap-2">
                        <span className="rounded-md border border-dark/15 bg-dark/5 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-dark transition-all duration-300 group-hover/pub:border-white/20 group-hover/pub:bg-white/10 group-hover/pub:text-white/80">
                          {pub.language}
                        </span>
                        {pub.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="rounded-md border border-border bg-bg px-2.5 py-1 text-[11px] font-medium text-muted transition-all duration-300 group-hover/pub:border-white/20 group-hover/pub:bg-white/5 group-hover/pub:text-white/65"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Link — pushed to bottom */}
                      {pub.url && (
                        <a
                          href={pub.url}
                          className="mt-auto pt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-all duration-300 hover:gap-2.5 group-hover/pub:text-white"
                        >
                          Read more <FaNewspaper className="text-xs" />
                        </a>
                      )}
                    </motion.article>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}