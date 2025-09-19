"use client"
import { Link } from '@/i18n/routing';
import { MenuIcon } from "../../svgs/icons/menu"
import { useEffect, useState } from "react"
import { AnimatePresence } from "framer-motion"
import { HeaderNav } from "./nav"
import { motion } from "framer-motion"
import { Theming } from './theme';
import { useBetterMediaQuery } from '@/app/_client/libs/hooks/useBetterMediaQuery';

export const Header = () => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const matches = useBetterMediaQuery('(min-width: 1024px)')

  useEffect(() => {
    if (isExpanded) {
      window.document.body.classList.add("no-scroll")
    } else {
      window.document.body.classList.remove("no-scroll")
    }
  }, [isExpanded])

  // Scroll effect for header background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Mobile menu variants
  const mobileMenuVariants = {
    hidden: {
      opacity: 0,
      x: "100%",
      transition: {
        type: "tween",
        ease: [0.4, 0, 0.2, 1],
        duration: 0.3
      }
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "tween",
        ease: [0.4, 0, 0.2, 1],
        duration: 0.4
      }
    }
  }

  // Logo animation variants
  const logoVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: { scale: 0.95 }
  }

  // Menu button variants
  const menuButtonVariants = {
    initial: { rotate: 0, scale: 1 },
    hover: { 
      scale: 1.1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: { scale: 0.9, rotate: 90 }
  }

  return (
    <motion.header
      className={`sticky top-0 z-50 transition-all duration-300 lg:pt-6 lg:px-5 ${
        scrolled 
          ? 'lg:bg-body/80 dark:bg-dark_body/80 backdrop-blur-md' 
          : 'lg:bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ 
        type: "spring",
        stiffness: 100,
        damping: 20,
        delay: 0.1
      }}
    >
      <motion.div
        className={`glass-card transition-all duration-300 p-4 lg:p-6 flex justify-between items-center lg:rounded-3xl ${
          scrolled 
            ? 'shadow-modern backdrop-blur-md bg-header_bg/95 dark:bg-dark_heading/95' 
            : 'bg-header_bg dark:bg-dark_heading shadow-sm'
        }`}
        whileHover={{ y: -2 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        {/* Logo with enhanced animation */}
        <motion.div
          variants={logoVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
        >
          <Link
            className="text-gradient font-black text-xl lg:text-5xl relative group"
            href="/"
          >
            VDA
            <motion.div
              className="absolute -inset-2 bg-gradient-to-r from-purple_main/20 to-accent_blue/20 rounded-xl opacity-0 group-hover:opacity-100 blur-sm -z-10"
              initial={{ scale: 0.8, opacity: 0 }}
              whileHover={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.2 }}
            />
          </Link>
        </motion.div>

        {/* Mobile menu button with enhanced animation */}
        <motion.button
          className="lg:hidden p-2 rounded-xl glass focus-modern relative overflow-hidden"
          onClick={() => setIsExpanded(true)}
          aria-expanded={isExpanded}
          variants={menuButtonVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
        >
          <motion.div
            animate={isExpanded ? { rotate: 180 } : { rotate: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <MenuIcon />
          </motion.div>
          
          {/* Ripple effect */}
          <motion.div
            className="absolute inset-0 bg-white/20 rounded-xl"
            initial={{ scale: 0, opacity: 1 }}
            whileTap={{ scale: 1, opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        </motion.button>

        {/* Mobile navigation with enhanced animations */}
        <AnimatePresence>
          {isExpanded && (
            <>
              {/* Backdrop blur overlay */}
              <motion.div
                className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setIsExpanded(false)}
              />
              
              {/* Mobile menu */}
              <motion.div
                className="lg:hidden fixed top-0 right-0 min-h-screen w-80 max-w-[85vw] glass-card border-l border-white/10"
                variants={mobileMenuVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                {/* Close button */}
                <motion.button
                  className="absolute top-6 right-6 p-2 rounded-xl glass hover:bg-red-500/20 focus-modern"
                  onClick={() => setIsExpanded(false)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg className="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>

                <div className="p-8 pt-20">
                  <HeaderNav onClose={() => setIsExpanded(false)} />
                  
                  <motion.div 
                    className="mt-8 pt-8 border-t border-white/10 flex justify-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.3 }}
                  >
                    <Theming />
                  </motion.div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Desktop navigation */}
        {matches && (
          <motion.div 
            className='flex items-center gap-8'
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <HeaderNav />
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Theming />
            </motion.div>
          </motion.div>
        )}
      </motion.div>

      {/* Floating decoration elements */}
      <div className="absolute -top-4 left-10 w-2 h-2 bg-purple_main/30 rounded-full animate-float hidden lg:block" />
      <div className="absolute -top-2 right-20 w-1 h-1 bg-accent_blue/30 rounded-full animate-float hidden lg:block" style={{ animationDelay: '1s' }} />
      <div className="absolute -bottom-1 left-1/3 w-1.5 h-1.5 bg-accent_pink/30 rounded-full animate-float hidden lg:block" style={{ animationDelay: '2s' }} />
    </motion.header>
  )
}