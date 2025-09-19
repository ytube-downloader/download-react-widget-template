"use client"
import { Link } from "@/i18n/routing"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"

// Languages data (you might want to import this from the existing file)
const languages = [
  { locale: "en", label: "English" },
  { locale: "es", label: "Español" },
  { locale: "fr", label: "Français" },
  { locale: "de", label: "Deutsch" },
  { locale: "it", label: "Italiano" },
  { locale: "pt", label: "Português" },
  { locale: "ru", label: "Русский" },
  { locale: "ja", label: "日本語" },
  { locale: "ko", label: "한국어" },
  { locale: "zh", label: "中文" },
]

// Footer navigation links
const footerLinks = {
  product: [
    { href: "/download", label: "Video Downloader" },
    { href: "/features", label: "Features" },
    { href: "/formats", label: "Supported Formats" },
    { href: "/api", label: "API Access" }
  ],
  company: [
    { href: "/about", label: "About Us" },
    { href: "/blog", label: "Blog" },
    { href: "/careers", label: "Careers" },
    { href: "/contact", label: "Contact" }
  ],
  support: [
    { href: "/help", label: "Help Center" },
    { href: "/faq", label: "FAQ" },
    { href: "/status", label: "Service Status" },
    { href: "/feedback", label: "Feedback" }
  ],
  legal: [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
    { href: "/cookies", label: "Cookie Policy" },
    { href: "/dmca", label: "DMCA" }
  ]
}

// Social media links
const socialLinks = [
  {
    name: "Twitter",
    href: "https://twitter.com/vda",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
      </svg>
    )
  },
  {
    name: "Facebook",
    href: "https://facebook.com/vda",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    )
  },
  {
    name: "Instagram",
    href: "https://instagram.com/vda",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.987 11.987s11.987-5.367 11.987-11.987C23.971 5.367 18.637.029 12.017.029zm0 21.735c-5.367 0-9.748-4.381-9.748-9.748s4.381-9.748 9.748-9.748 9.748 4.381 9.748 9.748-4.381 9.748-9.748 9.748z"/>
        <path d="M17.274 6.615H6.726c-.567 0-1.111.433-1.111 1v10.77c0 .567.544 1 1.111 1h10.548c.567 0 1.111-.433 1.111-1V7.615c0-.567-.544-1-1.111-1z"/>
      </svg>
    )
  },
  {
    name: "YouTube",
    href: "https://youtube.com/vda",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    )
  },
  {
    name: "Discord",
    href: "https://discord.gg/vda",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418Z"/>
      </svg>
    )
  }
]

export const Footer = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  }

  const socialVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15
      }
    }
  }

  const renderLanguages = () => {
    return languages.map((language, index) => (
      <motion.li
        key={language.locale}
        variants={itemVariants}
        custom={index}
      >
        <Link
          className="text-partner hover:text-purple_main dark:hover:text-purple_light font-medium text-sm relative group transition-colors duration-200"
          href="/"
          locale={language.locale}
        >
          {language.label}
          <motion.div
            className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple_main group-hover:w-full transition-all duration-200"
            whileHover={{ width: "100%" }}
          />
        </Link>
      </motion.li>
    ))
  }

  const renderLinkSection = (title: string, links: { href: string; label: string }[]) => (
    <motion.div variants={itemVariants}>
      <h3 className="font-semibold text-heading_main dark:text-dark_heading_main mb-4 text-lg">
        {title}
      </h3>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-base_one dark:text-dark_base_one hover:text-purple_main dark:hover:text-purple_light transition-colors duration-200 text-sm relative group"
            >
              {link.label}
              <motion.div
                className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-purple_main group-hover:w-full transition-all duration-200"
                whileHover={{ width: "100%" }}
              />
            </Link>
          </li>
        ))}
      </ul>
    </motion.div>
  )

  return (
    <motion.footer
      ref={ref}
      className="relative bg-gradient-to-br from-white to-gray-50 dark:from-dark_heading dark:to-dark_body border-t border-gray-200 dark:border-gray-800 overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-purple_main/5 to-transparent rounded-full blur-2xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-24 h-24 bg-gradient-to-br from-accent_blue/5 to-transparent rounded-full blur-2xl"
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.5, 0.3, 0.5]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8">
        {/* Main footer content */}
        <div className="py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-12 lg:gap-8">
            {/* Brand section */}
            <motion.div 
              className="lg:col-span-2 space-y-6"
              variants={itemVariants}
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <Link
                  href="/"
                  className="text-gradient font-black text-3xl lg:text-4xl"
                >
                  VDA
                </Link>
              </motion.div>
              
              <p className="text-base_one dark:text-dark_base_one text-lg leading-relaxed max-w-md">
                The most powerful and user-friendly video downloader. Download from YouTube, 
                Facebook, Twitter, and many more platforms in high quality.
              </p>

              {/* Social links */}
              <motion.div 
                className="flex space-x-4"
                variants={containerVariants}
              >
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 glass-card rounded-xl flex items-center justify-center text-base_one hover:text-purple_main dark:hover:text-purple_light transition-colors duration-200 group"
                    variants={socialVariants}
                    whileHover={{ 
                      scale: 1.1, 
                      y: -2,
                      boxShadow: "0 10px 25px rgba(139, 92, 246, 0.2)" 
                    }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.name}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </motion.div>

            </motion.div>

            {/* Navigation links */}
            <div className="lg:col-span-4 grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-6">
              {renderLinkSection("Product", footerLinks.product)}
              {renderLinkSection("Company", footerLinks.company)}
              {renderLinkSection("Support", footerLinks.support)}
              {renderLinkSection("Legal", footerLinks.legal)}
            </div>
          </div>

          {/* Language selection */}
          <motion.div
            className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700"
            variants={itemVariants}
          >
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
              <div>
                <h3 className="font-semibold text-heading_main dark:text-dark_heading_main mb-4">
                  Choose Language
                </h3>
                <ul className="flex flex-wrap gap-4">
                  {renderLanguages()}
                </ul>
              </div>

              {/* Quick stats */}
              <motion.div
                className="glass-card p-4 rounded-2xl"
                whileHover={{ scale: 1.02 }}
              >
                <div className="grid grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="text-2xl font-bold text-purple_main">10M+</div>
                    <div className="text-xs text-base_one dark:text-dark_base_one">Downloads</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple_main">50+</div>
                    <div className="text-xs text-base_one dark:text-dark_base_one">Platforms</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple_main">99.9%</div>
                    <div className="text-xs text-base_one dark:text-dark_base_one">Uptime</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          className="py-6 border-t border-gray-200 dark:border-gray-700"
          variants={itemVariants}
        >
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-6 text-sm text-base_one dark:text-dark_base_one">
              <span>© 2024 VDA. All rights reserved.</span>
              <motion.div
                className="flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>All systems operational</span>
              </motion.div>
            </div>

            {/* Back to top button */}
            <motion.button
              className="glass-card p-3 rounded-xl text-base_one hover:text-purple_main dark:hover:text-purple_light transition-colors duration-200 group"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              whileHover={{ 
                scale: 1.1, 
                y: -2,
                boxShadow: "0 10px 25px rgba(139, 92, 246, 0.15)" 
              }}
              whileTap={{ scale: 0.95 }}
              aria-label="Back to top"
            >
              <svg 
                className="w-5 h-5 transform group-hover:-translate-y-1 transition-transform duration-200" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Decorative bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple_main via-accent_blue to-purple_main"></div>
    </motion.footer>
  )
}