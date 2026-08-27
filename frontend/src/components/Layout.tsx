import { ReactNode } from 'react'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import Header from './Header'
import Footer from './Footer'

interface LayoutProps {
  children: ReactNode
  currentRoute: string
  theme: 'dark' | 'light'
  onToggleTheme: () => void
}

const pageVariants: Variants = {
  initial: {
    opacity: 0,
    y: 8,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.24,
      ease: [0.16, 1, 0.3, 1] as const,
    },
    transitionEnd: {
      transform: 'none',
    },
  },
  exit: {
    opacity: 0,
    y: -6,
    transition: {
      duration: 0.15,
      ease: [0.7, 0, 0.84, 0] as const,
    },
  },
}

export default function Layout({ children, currentRoute, theme, onToggleTheme }: LayoutProps) {
  return (
    <>
      <Header currentRoute={currentRoute} theme={theme} onToggleTheme={onToggleTheme} />
      <main className="main-content">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={currentRoute}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="page-transition-wrapper"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </>
  )
}
