"use client"

import Link from 'next/link'
import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import {
  HiOutlineArrowLongLeft,
  HiOutlineCheckCircle,
  HiOutlineEnvelope,
  HiOutlineMapPin,
  HiOutlinePaperAirplane,
  HiOutlinePhone,
} from 'react-icons/hi2'
import { contactInfo } from '../data/staticData'
import { fadeInUp, smoothEase, staggerContainer } from '../utils/animations'

const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: smoothEase },
  },
}

const channels = [
  {
    label: 'Email',
    value: contactInfo.email,
    helper: 'Most reliable channel',
    href: `mailto:${contactInfo.email}`,
    Icon: HiOutlineEnvelope,
  },
  {
    label: 'Phone',
    value: contactInfo.phone,
    helper: 'Calls and messages welcome',
    href: `tel:${contactInfo.phone.replace(/[^\d+]/g, '')}`,
    Icon: HiOutlinePhone,
  },
  {
    label: 'Location',
    value: contactInfo.location,
    helper: 'Open to meetings on request',
    href: 'https://maps.google.com/?q=Kathmandu,Nepal',
    Icon: HiOutlineMapPin,
  },
]

export function ContactPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const body = `From: ${name} <${email}>\n\n${message}`
    const mailto = `mailto:${contactInfo.email}?subject=${encodeURIComponent(
      subject || 'Portfolio enquiry',
    )}&body=${encodeURIComponent(body)}`
    window.location.href = mailto
    setSubmitted(true)
  }

  return (
    <main className="min-h-screen bg-bg px-4 py-14 sm:px-8 sm:py-20 lg:px-20 lg:py-24 xl:px-32">
      <div className="mx-auto max-w-[1200px]">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-muted transition-colors duration-300 hover:text-primary"
        >
          <HiOutlineArrowLongLeft size={20} />
          Back to portfolio
        </Link>

        {/* Heading */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="mt-8 max-w-3xl sm:mt-10"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary sm:text-sm">
            Contact
          </p>
          <h1 className="mt-4 font-display text-3xl font-bold leading-tight text-dark sm:text-5xl lg:text-6xl">
            Let&apos;s build something meaningful together.
          </h1>
          <p className="mt-4 text-sm leading-7 text-muted sm:mt-6 sm:text-base sm:leading-8 lg:text-lg">
            Whether it&apos;s a leadership conversation, a writing collaboration, or an
            institutional partnership, I&apos;m always glad to hear from people doing
            thoughtful work.
          </p>
        </motion.div>

        {/* Channels grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mt-10 grid gap-4 sm:mt-12 sm:gap-5 md:grid-cols-3"
        >
          {channels.map(({ label, value, helper, href, Icon }) => (
            <motion.a
              key={label}
              variants={cardVariant}
              href={href}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3, ease: smoothEase }}
              className="group flex flex-col rounded-2xl border border-border bg-surface p-5 shadow-soft transition-all duration-300 hover:border-primary/40 hover:shadow-lg sm:rounded-3xl sm:p-6"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white sm:h-12 sm:w-12">
                <Icon size={20} />
              </span>
              <p className="mt-5 text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-muted sm:text-xs">
                {label}
              </p>
              <p className="mt-2 break-all text-sm font-semibold text-dark sm:text-base">
                {value}
              </p>
              <p className="mt-1 text-xs text-muted">{helper}</p>
            </motion.a>
          ))}
        </motion.div>

        {/* Form */}
        <div className="mt-8 sm:mt-10">
          <motion.form
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            onSubmit={handleSubmit}
            className="rounded-2xl border border-border bg-surface p-6 shadow-soft sm:rounded-3xl sm:p-8 lg:p-10"
          >
            <h2 className="font-display text-2xl font-bold text-dark sm:text-3xl">
              Send a message
            </h2>
            <p className="mt-2 text-sm leading-7 text-muted">
              This opens your email client pre-filled, with no inbox or tracker in between.
            </p>

            <div className="mt-7 grid gap-5 sm:mt-8 sm:grid-cols-2">
              <Field label="Your name" htmlFor="name">
                <input
                  id="name"
                  type="text"
                  required
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="w-full rounded-xl border border-border bg-bg px-4 py-3 text-sm text-dark outline-none transition-all duration-300 focus:border-primary focus:bg-white focus:shadow-sm"
                  placeholder="Ram Subedi"
                />
              </Field>
              <Field label="Email" htmlFor="email">
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="w-full rounded-xl border border-border bg-bg px-4 py-3 text-sm text-dark outline-none transition-all duration-300 focus:border-primary focus:bg-white focus:shadow-sm"
                  placeholder="you@example.com"
                />
              </Field>
            </div>

            <div className="mt-5">
              <Field label="Subject" htmlFor="subject">
                <input
                  id="subject"
                  type="text"
                  value={subject}
                  onChange={(event) => setSubject(event.target.value)}
                  className="w-full rounded-xl border border-border bg-bg px-4 py-3 text-sm text-dark outline-none transition-all duration-300 focus:border-primary focus:bg-white focus:shadow-sm"
                  placeholder="A short headline for your message"
                />
              </Field>
            </div>

            <div className="mt-5">
              <Field label="Message" htmlFor="message">
                <textarea
                  id="message"
                  required
                  rows={6}
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  className="w-full resize-none rounded-xl border border-border bg-bg px-4 py-3 text-sm leading-7 text-dark outline-none transition-all duration-300 focus:border-primary focus:bg-white focus:shadow-sm"
                  placeholder="Share a bit about yourself and what you'd like to discuss…"
                />
              </Field>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-4 sm:mt-8">
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.25, ease: smoothEase }}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-glow transition-colors duration-300 hover:bg-primary-light sm:px-7 sm:py-3.5"
              >
                Send message
                <HiOutlinePaperAirplane size={16} />
              </motion.button>

              {submitted && (
                <motion.span
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, ease: smoothEase }}
                  className="inline-flex items-center gap-2 text-sm font-medium text-emerald-700"
                >
                  <HiOutlineCheckCircle size={18} />
                  Your email client should now be open.
                </motion.span>
              )}
            </div>
          </motion.form>
        </div>
      </div>
    </main>
  )
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string
  htmlFor: string
  children: React.ReactNode
}) {
  return (
    <label htmlFor={htmlFor} className="block">
      <span className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-muted sm:text-xs">
        {label}
      </span>
      <div className="mt-2">{children}</div>
    </label>
  )
}
