"use client"
import { useEffect, useState } from "react"
import Script from "next/script"
import { ADS_URL } from "@/app/_client/configs"
import { motion, AnimatePresence } from "framer-motion"

export const Download = () => {
  const [show, setShow] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true)
      // Simulate loading time for iframe
      setTimeout(() => {
        setIsLoading(false)
      }, 1500)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <motion.div
      className="glass-card rounded-3xl p-8 space-y-6"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header skeleton */}
      <div className="text-center space-y-4">
        <div className="skeleton h-8 w-64 mx-auto rounded-xl"></div>
        <div className="skeleton h-4 w-96 mx-auto rounded-lg"></div>
      </div>

      {/* Input skeleton */}
      <div className="space-y-4">
        <div className="skeleton h-14 w-full rounded-2xl"></div>
        <div className="skeleton h-12 w-32 mx-auto rounded-xl"></div>
      </div>

      {/* Features skeleton */}
      <div className="grid grid-cols-3 gap-4 mt-8">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="text-center space-y-2">
            <div className="skeleton h-8 w-8 mx-auto rounded-full"></div>
            <div className="skeleton h-3 w-16 mx-auto rounded"></div>
          </div>
        ))}
      </div>

      {/* Pulsing dots animation */}
      <div className="flex justify-center space-x-2 mt-6">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="w-2 h-2 bg-purple_main rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.2
            }}
          />
        ))}
      </div>
    </motion.div>
  )

  // Error component
  const ErrorComponent = () => (
    <motion.div
      className="glass-card rounded-3xl p-8 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
      >
        <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </motion.div>
      
      <h3 className="text-xl font-semibold text-heading_main dark:text-dark_heading_main mb-2">
        Oops! Something went wrong
      </h3>
      
      <p className="text-base_one dark:text-dark_base_one mb-6">
        We're having trouble loading the download widget. Please try refreshing the page.
      </p>
      
      <motion.button
        className="btn-modern px-6 py-3"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => window.location.reload()}
      >
        Refresh Page
      </motion.button>
    </motion.div>
  )

  if (!show) return null

  return (
    <motion.section
      id="download-widget"
      className="relative py-16 lg:py-24 px-4"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-10 left-1/4 w-32 h-32 bg-gradient-to-br from-purple_main/10 to-transparent rounded-full blur-2xl"
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
          className="absolute bottom-10 right-1/4 w-24 h-24 bg-gradient-to-br from-accent_blue/10 to-transparent rounded-full blur-2xl"
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

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-purple_main uppercase tracking-wider">
              Download Center
            </span>
          </motion.div>

          <h2 className="text-3xl lg:text-5xl font-black text-heading_main dark:text-dark_heading_main mb-4">
            <span className="text-gradient">
              Start Your Download
            </span>
          </h2>
          
          <p className="text-lg text-base_one dark:text-dark_base_one max-w-2xl mx-auto">
            Paste any video URL below and get high-quality downloads in seconds
          </p>
        </motion.div>

        {/* Download widget container */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full max-w-2xl mx-auto"
              >
                <LoadingSkeleton />
              </motion.div>
            ) : hasError ? (
              <motion.div
                key="error"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full max-w-2xl mx-auto"
              >
                <ErrorComponent />
              </motion.div>
            ) : (
              <motion.div
                key="widget"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="glass-card rounded-3xl p-2 shadow-2xl overflow-hidden"
                whileHover={{ y: -5 }}
              >
                {/* Enhanced iframe container */}
                <div className="relative bg-white dark:bg-dark_heading rounded-2xl overflow-hidden">
                  <iframe
                    className="w-full border-0 rounded-2xl"
                    id="widgetApiIframe"
                    width="100%"
                    height="100%"
                    style={{ border: "none", minHeight: "400px" }}
                    src={`https://loader.to/api/widget?${ADS_URL ? `&adUrl=${ADS_URL}` : ""}`}
                    onLoad={() => setIsLoading(false)}
                    onError={() => {
                      setHasError(true)
                      setIsLoading(false)
                    }}
                  />
                  
                  {/* Loading overlay */}
                  {isLoading && (
                    <div className="absolute inset-0 bg-white/80 dark:bg-dark_heading/80 backdrop-blur-sm flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-12 h-12 border-4 border-purple_main/20 border-t-purple_main rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-base_one dark:text-dark_base_one">Loading download widget...</p>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Floating help button */}
          <motion.button
            className="absolute -right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-purple_main text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 focus-modern"
            whileHover={{ scale: 1.1, rotate: 15 }}
            whileTap={{ scale: 0.9 }}
            title="Need help?"
          >
            <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </motion.button>
        </motion.div>

        {/* Feature highlights */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          {[
            {
              icon: "⚡",
              title: "Lightning Fast",
              description: "Download at maximum speed"
            },
            {
              icon: "🛡️",
              title: "Secure & Safe",
              description: "No malware or unwanted software"
            },
            {
              icon: "🎯",
              title: "High Quality",
              description: "Best available video quality"
            }
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              className="text-center p-6 glass-card rounded-2xl group hover:bg-white/30 dark:hover:bg-black/30 transition-all duration-300"
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="text-3xl mb-3 transform group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="font-semibold text-heading_main dark:text-dark_heading_main mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-base_one dark:text-dark_base_one">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          className="flex flex-wrap justify-center items-center gap-8 mt-12 opacity-60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span className="text-sm text-base_one dark:text-dark_base_one">SSL Secured</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span className="text-sm text-base_one dark:text-dark_base_one">No Registration</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span className="text-sm text-base_one dark:text-dark_base_one">100% Free</span>
          </div>
        </motion.div>
      </div>

      <Script>
        {`iFrameResize({ log: false }, '#widgetApiIframe')`}
      </Script>
    </motion.section>
  )
}