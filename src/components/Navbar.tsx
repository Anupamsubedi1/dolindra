"use client"

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiMenu, FiX } from 'react-icons/fi'
import clsx from 'clsx'
import { navLinks } from '../data/staticData'
import { fadeInUp, smoothEase } from '../utils/animations'

interface NavbarProps {
  activeSection: string
  onNavigate: (href: string) => void
}

export function Navbar({ activeSection, onNavigate }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0, opacity: 0 })
  const navRef = useRef<HTMLElement | null>(null)
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([])
  const scrollFrame = useRef<number | null>(null)

  // ── lock body scroll while mobile drawer is open ──────────────────
  useEffect(() => {
    if (typeof document === 'undefined') return
    if (mobileOpen) {
      const previous = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = previous
      }
    }
  }, [mobileOpen])

  // ── scroll detection ──────────────────────────────────────────────
  useEffect(() => {
    const handleScroll = () => {
      if (scrollFrame.current !== null) return
      scrollFrame.current = window.requestAnimationFrame(() => {
        scrollFrame.current = null
        setIsScrolled((cur) => {
          const next = window.scrollY > 80
          return cur === next ? cur : next
        })
      })
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (scrollFrame.current !== null) window.cancelAnimationFrame(scrollFrame.current)
    }
  }, [])

  // ── compute underline position ────────────────────────────────────
  useEffect(() => {
    const targetIndex =
      hoveredIndex !== null
        ? hoveredIndex
        : navLinks.findIndex(
            (l) => l.href.replace('#', '').toLowerCase() === activeSection.toLowerCase()
          )

    const btn = buttonRefs.current[targetIndex]
    const nav = navRef.current

    if (!btn || !nav || targetIndex === -1) {
      setUnderlineStyle((s) => ({ ...s, opacity: 0 }))
      return
    }

    const navRect = nav.getBoundingClientRect()
    const btnRect = btn.getBoundingClientRect()

    setUnderlineStyle({
      left: btnRect.left - navRect.left,
      width: btnRect.width,
      opacity: 1,
    })
  }, [hoveredIndex, activeSection])

  const navigate = (href: string) => {
    onNavigate(href)
    setMobileOpen(false)
  }

  return (
    <motion.header
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      className={clsx(
        'fixed inset-x-0 top-0 z-50 border-b text-white transition-all duration-500',
        isScrolled
          ? 'border-white/15 bg-[#0F172B]/95 shadow-[0_8px_30px_rgba(15,23,43,0.45)] backdrop-blur-xl'
          : 'border-white/10 bg-[#0F172B]'
      )}
    >
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-4 py-4 sm:px-8 lg:px-20 xl:px-32">

        {/* Logo */}
        <button
          onClick={() => navigate('#home')}
          className="font-display text-3xl font-bold tracking-tight text-primary transition-transform duration-300 hover:scale-105"
        >
          DPS
        </button>

        {/* Desktop nav */}
        <nav
          ref={navRef}
          className="relative hidden items-center gap-8 lg:flex"
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {/* Sliding underline */}
          <motion.span
            className="pointer-events-none absolute -bottom-1 h-[3px] rounded-full bg-primary-light shadow-[0_0_12px_rgba(231,76,60,0.6)]"
            animate={{
              left: underlineStyle.left,
              width: underlineStyle.width,
              opacity: underlineStyle.opacity,
            }}
            transition={{ type: 'spring', stiffness: 260, damping: 30, mass: 0.6 }}
          />

          {navLinks.map((link, i) => (
            <button
              key={link.href}
              ref={(el) => { buttonRefs.current[i] = el }}
              onClick={() => navigate(link.href)}
              onMouseEnter={() => setHoveredIndex(i)}
              className={clsx(
                'relative text-sm font-medium transition-colors duration-300',
                activeSection.toLowerCase() === link.href.replace('#', '').toLowerCase()
                  ? 'text-white'
                  : 'text-white/85 hover:text-white'
              )}
            >
              {link.label}
            </button>
          ))}

          <button
            onClick={() => navigate('/contact')}
            className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-primary-light"
          >
            Contact Me
          </button>
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white lg:hidden"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <FiX size={20} /> : <FiMenu size={20} />}
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="nav-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: smoothEase }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-40 bg-black/45 backdrop-blur-sm lg:hidden"
            />

            {/* Glassmorphism drawer */}
            <motion.aside
              key="nav-drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.45, ease: smoothEase }}
              className="fixed right-0 top-0 z-50 flex h-full w-[82vw] max-w-xs flex-col gap-2 border-l border-white/15 bg-white/5 px-5 pb-8 pt-24 shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-2xl backdrop-saturate-150 lg:hidden"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-dark/30 via-dark/40 to-dark/60"
              />

              {navLinks.map((link) => {
                const isActive =
                  activeSection.toLowerCase() === link.href.replace('#', '').toLowerCase()
                return (
                  <button
                    key={link.href}
                    onClick={() => navigate(link.href)}
                    className={clsx(
                      'rounded-2xl border px-4 py-3 text-left text-base font-medium transition-all duration-300',
                      isActive
                        ? 'border-white/30 bg-white/20 text-white shadow-inner'
                        : 'border-white/10 bg-white/[0.06] text-white/85 hover:border-white/20 hover:bg-white/[0.12] hover:text-white'
                    )}
                  >
                    {link.label}
                  </button>
                )
              })}
              <button
                onClick={() => navigate('/contact')}
                className="mt-3 rounded-full bg-primary px-5 py-3.5 text-sm font-semibold text-white shadow-lg transition-colors duration-300 hover:bg-primary-light"
              >
                Contact Me
              </button>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  )
}