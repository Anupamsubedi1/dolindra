"use client"

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
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
  const [mounted, setMounted] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0, opacity: 0 })
  const navRef = useRef<HTMLElement | null>(null)
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([])
  const scrollFrame = useRef<number | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  // ── lock body scroll + pause Lenis while drawer is open ───────────
  useEffect(() => {
    if (typeof document === 'undefined') return
    if (!mobileOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.__lenis?.stop()

    return () => {
      document.body.style.overflow = previousOverflow
      window.__lenis?.start()
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
        'fixed inset-x-0 top-0 z-50 border-b text-white transition-colors duration-300 will-change-[background-color,border-color,box-shadow]',
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

      {mounted &&
        createPortal(
          <AnimatePresence>
            {mobileOpen && (
              <div className="lg:hidden">
                {/* Backdrop */}
                <motion.div
                  key="nav-backdrop"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25, ease: smoothEase }}
                  onClick={() => setMobileOpen(false)}
                  className="fixed inset-0 z-[90] bg-black/70 backdrop-blur-sm"
                />

                {/* Drawer */}
                <motion.aside
                  key="nav-drawer"
                  initial={{ x: '100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '100%' }}
                  transition={{ duration: 0.35, ease: smoothEase }}
                  style={{ backgroundColor: '#0F172B' }}
                  className="fixed right-0 top-0 z-[100] flex h-[100dvh] w-[82vw] max-w-xs flex-col border-l border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
                >
                  <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-white/10">
                    <span className="font-display text-2xl font-bold text-primary">DPS</span>
                    <button
                      onClick={() => setMobileOpen(false)}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white"
                      aria-label="Close menu"
                    >
                      <FiX size={20} />
                    </button>
                  </div>

                  <div className="flex flex-1 flex-col gap-2 overflow-y-auto px-5 pt-5 pb-8">
                    {navLinks.map((link) => {
                      const isActive =
                        activeSection.toLowerCase() === link.href.replace('#', '').toLowerCase()
                      return (
                        <button
                          key={link.href}
                          onClick={() => navigate(link.href)}
                          className={clsx(
                            'rounded-2xl border px-4 py-3 text-left text-base font-medium transition-colors duration-200',
                            isActive
                              ? 'border-white/30 bg-white/15 text-white shadow-inner'
                              : 'border-white/10 bg-white/[0.04] text-white/90 hover:border-white/25 hover:bg-white/10 hover:text-white'
                          )}
                        >
                          {link.label}
                        </button>
                      )
                    })}
                    <button
                      onClick={() => navigate('/contact')}
                      className="mt-3 rounded-full bg-primary px-5 py-3.5 text-sm font-semibold text-white shadow-lg transition-colors duration-200 hover:bg-primary-light"
                    >
                      Contact Me
                    </button>
                  </div>
                </motion.aside>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </motion.header>
  )
}