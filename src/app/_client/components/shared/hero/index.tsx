"use client"
import { useTranslations } from "next-intl"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

type HeroProps = {
  vda: string
}

export const Hero = ({ vda }: HeroProps) => {
  const translate = useTranslations(`homepage.${vda}.hero`)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  }

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  // Typewriter effect for title
  const [displayText, setDisplayText] = useState("")
  const fullText = translate("title")

  useEffect(() => {
    if (!mounted) return
    
    let index = 0
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayText(fullText.slice(0, index))
        index++
      } else {
        clearInterval(timer)
      }
    }, 50)

    return () => clearInterval(timer)
  }, [fullText, mounted])

  if (!mounted) {
    return (
      <div className="pt-24 pb-12 text-center min-h-[60vh] flex items-center justify-center">
        <div className="animate-pulse">
          <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded-lg w-96 mb-4 mx-auto"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-64 mx-auto"></div>
        </div>
      </div>
    )
  }

  return (
    <motion.section 
      className="relative pt-32 pb-20 text-center overflow-hidden min-h-[80vh] flex items-center justify-center"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating geometric shapes */}
        <motion.div
          className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-purple_main/20 to-accent_blue/20 rounded-2xl blur-sm"
          variants={floatingVariants}
          animate="animate"
        />
        <motion.div
          className="absolute top-40 right-16 w-12 h-12 bg-gradient-to-br from-accent_pink/30 to-purple_main/30 rounded-full blur-sm"
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 1 }}
        />
        <motion.div
          className="absolute bottom-32 left-20 w-8 h-8 bg-gradient-to-br from-accent_green/40 to-accent_blue/40 rounded-full blur-sm"
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 2 }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-16 h-16 bg-gradient-to-br from-accent_orange/20 to-accent_pink/20 rounded-3xl blur-sm rotate-45"
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 0.5 }}
        />

        {/* Gradient orbs */}
        <motion.div
          className="absolute -top-10 -left-10 w-96 h-96 bg-gradient-to-br from-purple_main/10 to-transparent rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute -bottom-10 -right-10 w-96 h-96 bg-gradient-to-tl from-accent_blue/10 to-transparent rounded-full blur-3xl"
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.5, 0.3, 0.5]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        {/* Hero badge */}
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8"
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
        >
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
            Fast & Secure Download
          </span>
        </motion.div>

        {/* Main title with typewriter effect */}
        <motion.div variants={itemVariants} className="mb-8">
          <h1 className="text-5xl sm:text-6xl lg:text-8xl font-black leading-none mb-4">
            <span className="text-gradient block">
              {displayText}
              <motion.span
                className="inline-block w-1 h-16 lg:h-24 bg-purple_main ml-2"
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            </span>
          </h1>
        </motion.div>

        {/* Description with enhanced styling */}
        <motion.div variants={itemVariants} className="mb-12">
          <p className="text-lg sm:text-xl lg:text-2xl font-light text-base_one dark:text-dark_base_one leading-relaxed max-w-2xl mx-auto">
            {translate("description")}
          </p>
        </motion.div>

        {/* Call-to-Action Buttons */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.button
            className="btn-modern group relative overflow-hidden px-8 py-4 min-w-[200px]"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              document.querySelector('#download-widget')?.scrollIntoView({ 
                behavior: 'smooth' 
              })
            }}
          >
            <span className="relative z-10 flex items-center gap-2">
              Start Download
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </motion.button>

          <motion.button
            className="glass-card px-8 py-4 rounded-xl font-semibold text-gray-700 dark:text-gray-200 hover:bg-white/30 dark:hover:bg-black/30 transition-all duration-300 min-w-[200px] focus-modern"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Learn More
          </motion.button>
        </motion.div>

        {/* Feature highlights */}
        <motion.div
          variants={itemVariants}
          className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto"
        >
          {[
            { icon: "⚡", text: "Lightning Fast" },
            { icon: "🔒", text: "100% Secure" },
            { icon: "🎯", text: "High Quality" }
          ].map((feature, index) => (
            <motion.div
              key={feature.text}
              className="glass-card p-4 rounded-xl text-center group hover:bg-white/30 dark:hover:bg-black/30 transition-all duration-300"
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="text-2xl mb-2">{feature.icon}</div>
              <div className="text-sm font-medium text-gray-600 dark:text-gray-300">
                {feature.text}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.5 }}
        >
          <motion.div
            className="w-6 h-10 border-2 border-gray-400 dark:border-gray-500 rounded-full flex justify-center"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="w-1 h-3 bg-purple_main rounded-full mt-2"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Ambient light effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple_main/5 to-transparent pointer-events-none" />
    </motion.section>
  )
}