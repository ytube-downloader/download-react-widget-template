"use client"
import { FacebookIcon } from "@/app/_client/components/svgs/icons/facebook"
import { ImdbIcon } from "@/app/_client/components/svgs/icons/imdb"
import { SoundcloudIcon } from "@/app/_client/components/svgs/icons/soundcloud"
import { TiktokIcon } from "@/app/_client/components/svgs/icons/tiktok"
import { TwitchIcon } from "@/app/_client/components/svgs/icons/twitch"
import { TwitterIcon } from "@/app/_client/components/svgs/icons/twitter"
import { VimeoIcon } from "@/app/_client/components/svgs/icons/vimeo"
import { YoutubeIcon } from "@/app/_client/components/svgs/icons/youtube"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"

const partners = [
  {
    key: "youtube",
    component: <YoutubeIcon />,
    name: "YouTube",
    color: "hover:text-red-500"
  },
  {
    key: "facebook", 
    component: <FacebookIcon />,
    name: "Facebook",
    color: "hover:text-blue-600"
  },
  {
    key: "soundcloud",
    component: <SoundcloudIcon />,
    name: "SoundCloud", 
    color: "hover:text-orange-500"
  },
  {
    key: "vimeo",
    component: <VimeoIcon />,
    name: "Vimeo",
    color: "hover:text-blue-500"
  },
  {
    key: "tiktok",
    component: <TiktokIcon />,
    name: "TikTok",
    color: "hover:text-black dark:hover:text-white"
  },
  {
    key: "imdb",
    component: <ImdbIcon />,
    name: "IMDb",
    color: "hover:text-yellow-500"
  },
  {
    key: "twitter",
    component: <TwitterIcon />,
    name: "Twitter",
    color: "hover:text-blue-400"
  },
  {
    key: "twitch",
    component: <TwitchIcon />,
    name: "Twitch",
    color: "hover:text-purple-500"
  },
]

export const Partners = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.08
      }
    }
  }

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15
      }
    }
  }

  const renderPartners = () => {
    return partners.map((partner, index) => (
      <motion.li
        key={partner.key}
        variants={itemVariants}
        className="group relative"
      >
        <motion.div
          className={`
            relative p-4 lg:p-6 rounded-2xl glass-card cursor-pointer
            transition-all duration-300 ease-out
            text-partner dark:text-partner ${partner.color}
            group-hover:scale-110 group-hover:shadow-2xl
            group-hover:bg-white/30 dark:group-hover:bg-black/30
          `}
          whileHover={{ 
            y: -8,
            rotateY: 5,
            rotateX: 5
          }}
          whileTap={{ scale: 0.95 }}
          transition={{ 
            type: "spring", 
            stiffness: 400, 
            damping: 25 
          }}
        >
          {/* Icon container with improved sizing */}
          <div className="w-12 h-12 lg:w-16 lg:h-16 mx-auto flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110">
            {partner.component}
          </div>

          {/* Partner name - shows on hover */}
          <motion.div
            className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 
                       opacity-0 group-hover:opacity-100 transition-all duration-300
                       px-2 py-1 bg-black/80 text-white text-xs rounded-md
                       whitespace-nowrap pointer-events-none"
            initial={{ scale: 0.8, y: -5 }}
            whileHover={{ scale: 1, y: 0 }}
          >
            {partner.name}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full
                           border-l-4 border-r-4 border-b-4 border-l-transparent 
                           border-r-transparent border-b-black/80"></div>
          </motion.div>

          {/* Hover effect ripple */}
          <motion.div
            className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple_main/20 to-accent_blue/20 
                       opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
            initial={{ scale: 0.8 }}
            whileHover={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          />

          {/* Subtle glow effect */}
          <motion.div
            className="absolute -inset-1 bg-gradient-to-r from-purple_main/10 to-accent_blue/10 
                       rounded-2xl opacity-0 group-hover:opacity-100 blur transition-opacity duration-500 -z-20"
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      </motion.li>
    ))
  }

  return (
    <motion.section
      ref={ref}
      className="relative py-16 lg:py-24 px-4 overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/2 left-10 w-20 h-20 bg-gradient-to-br from-purple_main/5 to-transparent rounded-full blur-xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/4 right-10 w-16 h-16 bg-gradient-to-br from-accent_blue/5 to-transparent rounded-full blur-xl"
          animate={{
            x: [0, -25, 0],
            y: [0, 15, 0],
            scale: [1.1, 1, 1.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>

      <div className="relative z-10">
        {/* Section header */}
        <motion.div
          className="text-center mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.h2
            className="text-2xl lg:text-4xl font-bold text-heading_main dark:text-dark_heading_main mb-4"
            whileHover={{ scale: 1.02 }}
          >
            Supported Platforms
          </motion.h2>
          <motion.p
            className="text-base_one dark:text-dark_base_one text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Download content from your favorite social media and video platforms
          </motion.p>
        </motion.div>

        {/* Partners grid with improved responsive layout */}
        <motion.div
          className="max-w-6xl mx-auto"
          variants={containerVariants}
        >
          <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-6 lg:gap-8 justify-items-center">
            {renderPartners()}
          </ul>
        </motion.div>

        {/* Additional info section */}
        <motion.div
          className="text-center mt-16 lg:mt-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <div className="glass-card p-6 lg:p-8 rounded-3xl max-w-2xl mx-auto">
            <motion.div
              className="flex items-center justify-center gap-3 mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="font-semibold text-heading_main dark:text-dark_heading_main">
                Always Adding More Platforms
              </span>
            </motion.div>
            <p className="text-base_one dark:text-dark_base_one text-sm lg:text-base">
              We continuously expand our platform support to bring you the best downloading experience across the web
            </p>
          </div>
        </motion.div>
      </div>

      {/* Floating animation elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-purple_main/20 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              x: [-10, 10, -10],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </motion.section>
  )
}