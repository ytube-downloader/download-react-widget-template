"use client"
import { motion, useScroll, useSpring, useTransform } from "framer-motion"
import { useEffect, useState, ReactNode } from "react"
import { useReducedMotion } from "./hooks/useScrollAnimation" // assuming the hooks are in a hooks folder

interface ResponsiveLayoutProps {
  children: ReactNode
  showScrollProgress?: boolean
  enableParallax?: boolean
  className?: string
}

export const ResponsiveLayout = ({ 
  children, 
  showScrollProgress = true, 
  enableParallax = true,
  className = "" 
}: ResponsiveLayoutProps) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const prefersReducedMotion = useReducedMotion()
  
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    // Page load animation
    const timer = setTimeout(() => setIsLoaded(true), 100)
    
    return () => {
      window.removeEventListener('resize', checkMobile)
      clearTimeout(timer)
    }
  }, [])

  // Performance optimization: disable heavy animations on low-end devices
  const shouldUseReducedAnimations = prefersReducedMotion || 
    (typeof navigator !== 'undefined' && navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4)

  // Main container variants
  const containerVariants = {
    hidden: { 
      opacity: 0,
      y: shouldUseReducedAnimations ? 0 : 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldUseReducedAnimations ? 0.1 : 0.6,
        ease: "easeOut",
        delayChildren: shouldUseReducedAnimations ? 0 : 0.2,
        staggerChildren: shouldUseReducedAnimations ? 0 : 0.1
      }
    }
  }

  return (
    <div className={`min-h-screen relative ${className}`}>
      {/* Scroll Progress Bar */}
      {showScrollProgress && !shouldUseReducedAnimations && (
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple_main via-accent_blue to-purple_main z-50 origin-left"
          style={{ scaleX }}
        />
      )}

      {/* Main Content */}
      <motion.main
        variants={containerVariants}
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
        className="relative z-10"
      >
        {children}
      </motion.main>

      {/* Loading Overlay */}
      {!isLoaded && (
        <motion.div
          className="fixed inset-0 bg-body dark:bg-dark_body z-50 flex items-center justify-center"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          style={{ pointerEvents: isLoaded ? 'none' : 'auto' }}
        >
          <div className="text-center">
            <motion.div
              className="w-16 h-16 border-4 border-purple_main/20 border-t-purple_main rounded-full mx-auto mb-4"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <motion.p
              className="text-base_one dark:text-dark_base_one font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Loading amazing experience...
            </motion.p>
          </div>
        </motion.div>
      )}
    </div>
  )
}

// Performance Optimization Utilities
export class PerformanceUtils {
  // Lazy load images with intersection observer
  static setupLazyLoading() {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return

    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement
          if (img.dataset.src) {
            img.src = img.dataset.src
            img.classList.remove('lazy')
            observer.unobserve(img)
          }
        }
      })
    })

    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img)
    })
  }

  // Preload critical resources
  static preloadCriticalResources() {
    const criticalResources = [
      '/fonts/inter.woff2',
      '/fonts/league-spartan.woff2',
    ]

    criticalResources.forEach(resource => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.href = resource
      link.as = 'font'
      link.type = 'font/woff2'
      link.crossOrigin = 'anonymous'
      document.head.appendChild(link)
    })
  }

  // Optimize CSS animations for performance
  static optimizeAnimations() {
    const style = document.createElement('style')
    style.textContent = `
      * {
        will-change: auto;
      }
      
      .animate-transform {
        will-change: transform;
      }
      
      .animate-opacity {
        will-change: opacity;
      }
      
      .animate-filter {
        will-change: filter;
      }
      
      @media (prefers-reduced-motion: reduce) {
        *,
        *::before,
        *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
          scroll-behavior: auto !important;
        }
      }
    `
    document.head.appendChild(style)
  }

  // Memory management for animations
  static cleanupAnimations() {
    // Remove will-change properties after animations complete
    document.addEventListener('animationend', (e) => {
      const target = e.target as HTMLElement
      if (target.style.willChange) {
        target.style.willChange = 'auto'
      }
    })

    document.addEventListener('transitionend', (e) => {
      const target = e.target as HTMLElement
      if (target.style.willChange) {
        target.style.willChange = 'auto'
      }
    })
  }
}

// Custom hooks for mobile optimization
export const useMobileOptimization = () => {
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait')

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      setIsMobile(width < 768)
      setIsTablet(width >= 768 && width < 1024)
      setOrientation(width > window.innerHeight ? 'landscape' : 'portrait')
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    window.addEventListener('orientationchange', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('orientationchange', handleResize)
    }
  }, [])

  return { isMobile, isTablet, orientation }
}

// Touch-friendly component wrapper
export const TouchFriendly = ({ children, className = "" }: { children: ReactNode, className?: string }) => {
  return (
    <div 
      className={`touch-target focus-modern ${className}`}
      style={{ 
        minHeight: '44px', 
        minWidth: '44px',
        WebkitTapHighlightColor: 'transparent'
      }}
    >
      {children}
    </div>
  )
}

// Responsive image component
export const ResponsiveImage = ({
  src,
  alt,
  className = "",
  priority = false,
  ...props
}: {
  src: string
  alt: string
  className?: string
  priority?: boolean
  [key: string]: any
}) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState(false)

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!isLoaded && !error && (
        <div className="absolute inset-0 skeleton animate-pulse" />
      )}
      
      {error ? (
        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
          <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
      ) : (
        <motion.img
          src={priority ? src : undefined}
          data-src={priority ? undefined : src}
          alt={alt}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } ${priority ? '' : 'lazy'}`}
          onLoad={() => setIsLoaded(true)}
          onError={() => setError(true)}
          initial={{ scale: 1.1 }}
          animate={{ scale: isLoaded ? 1 : 1.1 }}
          transition={{ duration: 0.3 }}
          {...props}
        />
      )}
    </div>
  )
}

// Initialize performance optimizations
export const initializePerformanceOptimizations = () => {
  if (typeof window === 'undefined') return

  // Run optimizations after DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      PerformanceUtils.setupLazyLoading()
      PerformanceUtils.preloadCriticalResources()
      PerformanceUtils.optimizeAnimations()
      PerformanceUtils.cleanupAnimations()
    })
  } else {
    PerformanceUtils.setupLazyLoading()
    PerformanceUtils.preloadCriticalResources()
    PerformanceUtils.optimizeAnimations()
    PerformanceUtils.cleanupAnimations()
  }
}

// Mobile-specific utilities
export const MobileUtils = {
  // Prevent zoom on input focus (iOS)
  preventZoomOnFocus: () => {
    const meta = document.createElement('meta')
    meta.name = 'viewport'
    meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
    document.head.appendChild(meta)
  },

  // Add safe area insets for devices with notches
  addSafeAreaSupport: () => {
    const style = document.createElement('style')
    style.textContent = `
      .safe-area-top {
        padding-top: env(safe-area-inset-top);
      }
      
      .safe-area-bottom {
        padding-bottom: env(safe-area-inset-bottom);
      }
      
      .safe-area-left {
        padding-left: env(safe-area-inset-left);
      }
      
      .safe-area-right {
        padding-right: env(safe-area-inset-right);
      }
    `
    document.head.appendChild(style)
  },

  // Optimize for mobile keyboards
  handleMobileKeyboard: () => {
    let initialViewportHeight = window.innerHeight

    window.addEventListener('resize', () => {
      const currentViewportHeight = window.innerHeight
      const heightDifference = initialViewportHeight - currentViewportHeight
      
      // Keyboard is likely open if height decreased significantly
      if (heightDifference > 150) {
        document.body.classList.add('keyboard-open')
        document.documentElement.style.setProperty(
          '--keyboard-height', 
          `${heightDifference}px`
        )
      } else {
        document.body.classList.remove('keyboard-open')
        document.documentElement.style.removeProperty('--keyboard-height')
      }
    })
  }
}

// Usage example for the layout
export const ExampleUsage = () => {
  return (
    <ResponsiveLayout 
      showScrollProgress={true} 
      enableParallax={true}
      className="custom-layout-class"
    >
      {/* Your page components go here */}
      <div className="container-modern">
        <TouchFriendly>
          <button className="btn-modern">
            Mobile-optimized button
          </button>
        </TouchFriendly>
        
        <ResponsiveImage
          src="/hero-image.jpg"
          alt="Hero image"
          className="rounded-3xl"
          priority={true}
        />
      </div>
    </ResponsiveLayout>
  )
}