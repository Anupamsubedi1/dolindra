"use client"

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { FaFacebookF, FaLinkedinIn } from 'react-icons/fa'
import { FaInstagram } from 'react-icons/fa6'
import { FaXTwitter } from 'react-icons/fa6'
import { heroSummary, socialLinks } from '../data/staticData'

import { smoothEase } from '../utils/animations'

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: smoothEase },
  },
}

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
}

const fadeUpSlow = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: smoothEase, delay: 0.25 },
  },
}

interface HeroProps {
  onNavigate: (href: string) => void
  isLoaded: boolean
}

export function Hero({ onNavigate, isLoaded }: HeroProps) {
  const [imageError, setImageError] = useState(false)

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-bg px-4 pb-12 pt-20 sm:px-8 sm:pb-16 sm:pt-24 lg:min-h-screen lg:px-20 lg:pb-8 lg:pt-24 xl:px-32"
    >
      <div className="pointer-events-none absolute inset-y-0 right-0 w-full bg-[radial-gradient(circle_at_center,_rgba(231,76,60,0.15),_transparent_55%)] lg:w-[54rem]" />

      <div className="mx-auto grid max-w-[1600px] items-center gap-10 sm:gap-12 lg:grid-cols-2 lg:gap-10 lg:min-h-[calc(100vh-7rem)]">

        {/* ── LEFT: text content ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isLoaded ? 'visible' : 'hidden'}
          className="order-2 max-w-2xl lg:order-1"
        >
          <motion.p
            variants={fadeUp}
            className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-muted"
          >
            Hello, I&apos;m
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="font-display text-2xl font-bold text-primary sm:text-3xl lg:text-4xl"
          >
            Dolindra Prasad Sharma
          </motion.h1>

          <motion.h2
            variants={fadeUp}
            className="mt-4 max-w-3xl font-display text-[2.25rem] font-bold leading-[1.08] text-dark sm:mt-5 sm:text-5xl lg:text-6xl xl:text-[4.25rem]"
          >
            Organizational Leader,
            <br />
            Author & Public Administrator
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-5 max-w-md text-sm leading-7 text-muted sm:mt-7 sm:text-base sm:leading-8 lg:text-lg"
          >
            {heroSummary}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-7 flex flex-wrap gap-3 sm:mt-10 sm:gap-4">
            <motion.button
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.25, ease: smoothEase }}
              onClick={() => onNavigate('/contact')}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-glow transition-colors duration-300 hover:bg-primary-light sm:px-7 sm:py-3.5"
            >
              Contact Me <span aria-hidden>→</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.25, ease: smoothEase }}
              onClick={() => onNavigate('#publications')}
              className="inline-flex items-center gap-2 rounded-full border border-dark/15 bg-white px-6 py-3 text-sm font-semibold text-dark shadow-sm transition-colors duration-300 hover:bg-dark hover:text-white sm:px-7 sm:py-3.5"
            >
              Read Publication <span aria-hidden>↓</span>
            </motion.button>
          </motion.div>
        </motion.div>

        {/* ── RIGHT: portrait card ── */}
        <motion.div
          variants={fadeUpSlow}
          initial="hidden"
          animate={isLoaded ? 'visible' : 'hidden'}
          className="order-1 flex justify-center lg:order-2 lg:justify-end"
        >
          <div className="relative mx-auto w-full max-w-[300px] pb-8 sm:max-w-[360px] lg:max-w-[480px] lg:pb-0">

            {/* Offset outline frame — modern, subtle */}
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-3 -right-3 h-full w-full rounded-[1.75rem] border-2 border-primary/40 sm:-bottom-4 sm:-right-4 sm:rounded-[2rem] lg:rounded-[2.25rem]"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -top-6 -left-6 h-20 w-20 rounded-full bg-primary/15 blur-2xl sm:h-24 sm:w-24"
            />

            {/* Main photo card — aspect on mobile, viewport-height on desktop */}
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[1.75rem] bg-gradient-to-b from-stone-100 to-stone-200 shadow-[0_24px_60px_rgba(17,24,39,0.18)] ring-1 ring-black/5 sm:rounded-[2rem] lg:aspect-auto lg:h-[calc(100vh-9rem)] lg:max-h-[820px] lg:min-h-[560px] lg:rounded-[2.25rem]">
              {!imageError ? (
                <Image
                  src="/hero-image.png"
                  alt="Dolindra Prasad Sharma"
                  fill
                  priority
                  sizes="(max-width: 768px) 80vw, (max-width: 1024px) 360px, 480px"
                  className="object-cover object-top"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-white to-stone-100 p-6 text-center text-sm text-muted">
                  <p className="font-semibold text-dark">Add /hero-image.png to /public</p>
                  <p className="mt-2 max-w-[200px]">Portrait photo of Dolindra Prasad Sharma.</p>
                </div>
              )}

              {/* Subtle bottom gradient for caption legibility */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/25 to-transparent" />
            </div>

            {/* Social links — floats over the bottom edge of the card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ delay: 0.9, duration: 0.7, ease: smoothEase }}
              className="absolute left-1/2 z-20 -bottom-2 -translate-x-1/2 whitespace-nowrap rounded-2xl border border-black/10 bg-white px-4 py-2.5 shadow-[0_14px_30px_rgba(17,24,39,0.18)]"
            >
              <div className="flex items-center gap-2.5 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-dark sm:gap-3 sm:text-xs">
                <span className="text-muted">FOLLOW ME ON:</span>
                <div className="flex items-center gap-2">
                  <a
                    href={socialLinks[0].href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="grid h-7 w-7 place-items-center rounded-full bg-dark text-white transition-colors duration-300 hover:bg-primary"
                  >
                    <FaFacebookF size={13} />
                  </a>
                  <a
                    href={socialLinks[1].href}
                    aria-label="Instagram"
                    className="grid h-7 w-7 place-items-center rounded-full bg-dark text-white transition-colors duration-300 hover:bg-primary"
                  >
                    <FaInstagram size={13} />
                  </a>
                  <a
                    href={socialLinks[2].href}
                    aria-label="Twitter X"
                    className="grid h-7 w-7 place-items-center rounded-full bg-dark text-white transition-colors duration-300 hover:bg-primary"
                  >
                    <FaXTwitter size={13} />
                  </a>
                  <a
                    href={socialLinks[3].href}
                    aria-label="LinkedIn"
                    className="grid h-7 w-7 place-items-center rounded-full bg-dark text-white transition-colors duration-300 hover:bg-primary"
                  >
                    <FaLinkedinIn size={13} />
                  </a>
                </div>
              </div>
            </motion.div>

          </div>
        </motion.div>

      </div>
    </section>
  )
}