'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { Navbar } from '../components/Navbar'
import { Hero } from '../components/Hero'
import { About } from '../components/About'
import { Career } from '../components/Career'
import { Education } from '../components/Education'
import { Publications } from '../components/Publications'
import { Training } from '../components/Training'
import { Patronships } from '../components/Patronships'
import { TravelMap } from '../components/TravelMap'
import { Footer } from '../components/Footer'
import { BackToTop } from '../components/ui/BackToTop'

const sectionIds = ['home', 'about', 'career', 'education', 'publications', 'training', 'patronships', 'travel', 'contact']

export default function HomePage() {
  const router = useRouter()
  const [activeSection, setActiveSection] = useState('home')
  const [loading, setLoading] = useState(true)
  const rafId = useRef<number | null>(null)

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 1500)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    const updateActiveSection = () => {
      const viewportAnchor = window.innerHeight * 0.35
      let mostVisibleSection = 'home'
      let closestDistance = Number.POSITIVE_INFINITY

      sectionIds.forEach((id) => {
        const element = document.getElementById(id)
        if (!element) {
          return
        }

        const rect = element.getBoundingClientRect()
        const isInView = rect.bottom > 0 && rect.top < window.innerHeight * 0.75

        if (!isInView) {
          return
        }

        const distance = Math.abs(rect.top - viewportAnchor)
        if (distance < closestDistance) {
          closestDistance = distance
          mostVisibleSection = id
        }
      })

      setActiveSection((currentSection) =>
        currentSection === mostVisibleSection ? currentSection : mostVisibleSection
      )
    }

    const observer = new IntersectionObserver(
      () => {
        if (rafId.current !== null) {
          return
        }

        rafId.current = window.requestAnimationFrame(() => {
          rafId.current = null
          updateActiveSection()
        })
      },
      {
        root: null,
        rootMargin: '-20% 0px -55% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    )

    sectionIds.forEach((id) => {
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    })

    updateActiveSection()

    return () => {
      observer.disconnect()
      if (rafId.current !== null) {
        window.cancelAnimationFrame(rafId.current)
        rafId.current = null
      }
    }
  }, [])

  const navigate = useCallback(
    (href: string) => {
      if (href.startsWith('/')) {
        router.push(href)
        return
      }
      const sectionId = href.replace('#', '')
      setActiveSection(sectionId)
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    },
    [router],
  )

  return (
    <>
      <Navbar activeSection={activeSection} onNavigate={navigate} />
      <main className="overflow-x-hidden bg-bg">
        <Hero onNavigate={navigate} isLoaded={!loading} />
        <About />
        <Career />
        <Education />
        <Publications />
        <Training />
        <Patronships />
        <TravelMap />
        <Footer onNavigate={navigate} />
      </main>
      <BackToTop onClick={() => navigate('#home')} />

      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-bg"
          >
            <motion.div
              animate={{ opacity: [0.4, 1, 0.4], scale: [0.92, 1, 0.92] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="flex items-end gap-2 font-display text-7xl font-bold tracking-tight text-primary sm:text-8xl"
            >
              <motion.span initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.45 }}>
                D
              </motion.span>
              <motion.span initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.55, delay: 0.08 }}>
                P
              </motion.span>
              <motion.span initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.65, delay: 0.16 }}>
                S
              </motion.span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}