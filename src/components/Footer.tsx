"use client"

import { motion } from 'framer-motion'
import { FaFacebookF, FaLinkedinIn } from 'react-icons/fa'
import { FaInstagram } from 'react-icons/fa6'
import { FaXTwitter } from 'react-icons/fa6'
import { navLinks, socialLinks } from '../data/staticData'
import { fadeInUp } from '../utils/animations'

interface FooterProps {
  onNavigate: (href: string) => void
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <motion.footer
      id="contact"
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="bg-[#0F172B] px-4 pt-10 text-white sm:px-8 sm:pt-14 lg:px-20 lg:pt-16 xl:px-32"
    >
      <div className="mx-auto grid max-w-[1600px] gap-8 border-b border-white/10 pb-8 sm:gap-10 sm:pb-10 lg:grid-cols-3">
        <div>
          <button onClick={() => onNavigate('#home')} className="font-display text-4xl font-bold text-primary">
            DPS
          </button>
          <p className="mt-4 max-w-sm text-sm leading-7 text-white/65">Integrity | Leadership | Vision</p>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-white/40">Quick Links</p>
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {navLinks.map((link) => (
              <button key={link.href} onClick={() => onNavigate(link.href)} className="text-left text-sm text-white/70 transition-colors duration-300 hover:text-primary-light">
                {link.label}
              </button>
            ))}
          </div>
        </div>

        <div className="lg:justify-self-end">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-white/40">Follow</p>
          <div className="mt-5 flex items-center gap-3">
            <a href={socialLinks[0].href} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="rounded-full bg-white/10 p-3 text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary"><FaFacebookF /></a>
            <a href={socialLinks[1].href} aria-label="Instagram" className="rounded-full bg-white/10 p-3 text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary"><FaInstagram /></a>
            <a href={socialLinks[2].href} aria-label="Twitter" className="rounded-full bg-white/10 p-3 text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary"><FaXTwitter /></a>
            <a href={socialLinks[3].href} aria-label="LinkedIn" className="rounded-full bg-white/10 p-3 text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary"><FaLinkedinIn /></a>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-[1600px] flex-col gap-3 py-6 text-sm text-white/50 sm:flex-row sm:items-center sm:justify-between">
        <p>© 2025 Dolindra Prasad Sharma</p>
        
      </div>
    </motion.footer>
  )
}