import React from 'react'
import { motion } from 'framer-motion'

export const pageVariants = {
  initial: {
    opacity: 0,
    // x: '-100vw',
    scale: 1
  },
  in: {
    opacity: 1,
    // x: 0,
    scale: 1
  },
  out: {
    opacity: 0,
    // x: '100vw',
    scale: 1
  }
}

export const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.3
}

export const pageStyle = {
  position: 'absolute',
  width: '100%'
}

export const TransitionWrapper = ({ children }) => {
  return (
    <motion.div
      style={pageStyle}
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      { children }
    </motion.div>
  )
}
