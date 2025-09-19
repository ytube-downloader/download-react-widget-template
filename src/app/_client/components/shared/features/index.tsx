"use client"
import { FeatureVector } from "@/app/_client/components/svgs/vectors/feature"
import { useTranslations } from "next-intl"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"

type FeaturesProps = {
  vda: string
}

export const Features = ({ vda }: FeaturesProps) => {
  const translate = useTranslations(`homepage.${vda}.features`)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.15
      }
    }
  }

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      rotateX: -15
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
        duration: 0.6
      }
    }
  }

  const headerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 12
      }
    }
  }

  const iconColors = [
    "from-purple_main to-purple_dark",
    "from-accent_blue to-blue-600", 
    "from-accent_green to-green-600",
    "from-accent_pink to-pink-600",
    "from-accent_orange to-orange-600",
    "from-purple_dark to-indigo-700"
  ]

  const renderFeatures = () => {
    return Array(6)
      .fill("")
      .map((_, index) => (
        <motion.div
          key={`feature-${index}`}
          variants={cardVariants}
          className="group perspective-1000"
        >
          <motion.div
            className="relative glass-card p-6 lg:p-8 rounded-3xl cursor-pointer transition-all duration-500 transform-gpu group-hover:shadow-2xl overflow-hidden"
            whileHover={{ 
              rotateY: 5, 
              rotateX: 5,
              scale: 1.02,
              y: -10
            }}
            transition={{ 
              type: "spring", 
              stiffness: 400, 
              damping: 25 
            }}
          >
            {/* Background gradient overlay on hover */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-purple_main/20 via-transparent to-accent_blue/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              initial={{ scale: 0.8 }}
              whileHover={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            />

            {/* Animated background pattern */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
            </div>

            <div className="relative z-10">
              {/* Enhanced feature number with gradient */}
              <motion.div
                className={`w-16 h-16 rounded-2xl relative bg-gradient-to-r ${iconColors[index]} text-white font-bold text-2xl flex items-center justify-center mb-6 shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-12`}
                whileHover={{ 
                  boxShadow: "0 20px 40px rgba(139, 92, 246, 0.3)"
                }}
              >
                <span className="relative z-10">{index + 1}</span>
                
                {/* Animated ring */}
                <motion.div
                  className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100"
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              </motion.div>

              {/* Feature title with enhanced typography */}
              <motion.h3 
                className="text-2xl lg:text-3xl font-bold text-heading_main dark:text-dark_heading_main mb-4 transition-colors duration-300 group-hover:text-purple_main dark:group-hover:text-purple_light"
                initial={{ opacity: 0.8 }}
                whileHover={{ opacity: 1 }}
              >
                {translate(`list.${index}.title`)}
              </motion.h3>

              {/* Feature description with better readability */}
              <motion.p 
                className="font-light text-base lg:text-lg text-base_one dark:text-dark_base_one leading-relaxed transition-colors duration-300 group-hover:text-gray-700 dark:group-hover:text-gray-200"
                initial={{ opacity: 0.9 }}
                whileHover={{ opacity: 1 }}
              >
                {translate(`list.${index}.description`)}
              </motion.p>

              {/* Learn more link that appears on hover */}
              <motion.div
                className="mt-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0"
                initial={{ height: 0 }}
                whileHover={{ height: "auto" }}
              >
                <button className="text-purple_main dark:text-purple_light font-semibold text-sm flex items-center gap-2 hover:gap-3 transition-all duration-200">
                  Learn more
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </motion.div>
            </div>

            {/* Enhanced decorative vector */}
            <motion.div
              className="absolute right-0 bottom-0 opacity-0 group-hover:opacity-20 transition-all duration-500 transform translate-x-4 translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0"
              initial={{ scale: 0.8, rotate: -10 }}
              whileHover={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.1 }}
            >
              <FeatureVector />
            </motion.div>

            {/* Floating particles effect */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-purple_main/40 rounded-full"
                  style={{
                    top: `${20 + i * 30}%`,
                    left: `${80 + i * 5}%`,
                  }}
                  animate={{
                    y: [-10, -20, -10],
                    x: [-5, 5, -5],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 3 + i,
                    repeat: Infinity,
                    delay: i * 0.5,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>

            {/* Glow effect on hover */}
            <motion.div
              className="absolute -inset-1 bg-gradient-to-r from-purple_main/20 to-accent_blue/20 rounded-3xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
              animate={{
                scale: [1, 1.02, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        </motion.div>
      ))
  }

  return (
    <motion.section 
      ref={ref}
      className="relative py-20 lg:py-32 px-4 lg:px-20 overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-purple_main/10 to-transparent rounded-full blur-2xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-10 left-10 w-24 h-24 bg-gradient-to-br from-accent_blue/10 to-transparent rounded-full blur-2xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.6, 0.3, 0.6]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>

      <div className="relative z-10">
        {/* Section header with enhanced animations */}
        <motion.div 
          className="text-center mb-16 lg:mb-20"
          variants={headerVariants}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-2 h-2 bg-purple_main rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-purple_main uppercase tracking-wider">
              {translate("tag")}
            </span>
          </motion.div>

          <motion.h2 
            className="text-4xl sm:text-5xl lg:text-7xl font-black text-heading_main dark:text-dark_heading_main leading-tight"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <span className="text-gradient">
              {translate("title")}
            </span>
          </motion.h2>
        </motion.div>

        {/* Features grid with enhanced responsive design */}
        <motion.div 
          className="grid gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 max-w-7xl mx-auto"
          variants={containerVariants}
        >
          {renderFeatures()}
        </motion.div>

        {/* Call to action section */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <motion.button
            className="btn-modern px-8 py-4 inline-flex items-center gap-3"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Explore All Features</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  )
}