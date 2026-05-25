'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { FaArrowUp } from 'react-icons/fa6'
import { useEffect, useRef, useState } from 'react'
import { smoothEase } from '../../utils/animations'

interface BackToTopProps {
  onClick: () => void
}

export function BackToTop({ onClick }: BackToTopProps) {
  const [visible, setVisible] = useState(false)
  const scrollFrame = useRef<number | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (scrollFrame.current !== null) {
        return
      }

      scrollFrame.current = window.requestAnimationFrame(() => {
        scrollFrame.current = null
        setVisible((currentState) => {
          const nextState = window.scrollY > 400
          return currentState === nextState ? currentState : nextState
        })
      })
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (scrollFrame.current !== null) {
        window.cancelAnimationFrame(scrollFrame.current)
      }
    }
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.9, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 12 }}
          transition={{ duration: 0.35, ease: smoothEase }}
          whileHover={{ scale: 1.08, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClick}
          className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white shadow-lg transition-colors duration-300 hover:bg-primary-light"
          aria-label="Back to top"
        >
          <FaArrowUp />
        </motion.button>
      )}
    </AnimatePresence>
  )
}