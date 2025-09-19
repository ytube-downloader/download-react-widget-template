"use client"
import { useTranslations } from "next-intl"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { useState, useRef } from "react"

type FAQProps = {
  vda: string
}

const vdaLimits = (vda: string) => {
  switch(vda) {
    case "yvd":
      return {
        intro2: 4,
        brandingIntro: 6,
        brandingList: 8
      }
    case "4kd":
      return {
        intro2: 6,
        brandingIntro: 5,
        brandingList: 6
      }
    case "ytmp3":
      return {
        intro2: 5,
        brandingIntro: 5,
        brandingList: 7
      }
    case "ypd":
      return {
        intro2: 7,
        brandingIntro: 5,
        brandingList: 7
      }
    case "ytwav":
      return {
        intro2: 5,
        brandingIntro: 4,
        brandingList: 5
      }
    case "y1080d":
      return {
        intro2: 6,
        brandingIntro: 5,
        brandingList: 7
      }
    default:
      return {
        intro2: 4,
        brandingIntro: 6,
        brandingList: 8
      }
  }
}

export const FAQs = ({ vda }: FAQProps) => {
  const yvdTranslate = useTranslations(`homepage.${vda}`)
  const faqsTranslate = useTranslations(`homepage.${vda}.faqs`)
  const [expandedItems, setExpandedItems] = useState<number[]>([])
  const [searchQuery, setSearchQuery] = useState("")
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

  const toggleExpanded = (index: number) => {
    setExpandedItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  const renderIntro2 = () => {
    const limit = vdaLimits(vda)?.intro2 || 4
    return Array(limit)
      .fill("")
      .map((_, index) => (
        <motion.p
          key={`intro2-${index}`}
          className="mb-2 text-base_one dark:text-dark_base_one leading-relaxed"
          variants={itemVariants}
        >
          {faqsTranslate(`intro2.${index}`)}
        </motion.p>
      ))
  }

  const brandingIntro = () => {
    const limit = vdaLimits(vda)?.brandingIntro || 6
    return Array(limit)
      .fill("")
      .map((_, index) => (
        <motion.p
          key={`branding-intro-${index}`}
          className="mb-2 text-base_one dark:text-dark_base_one leading-relaxed"
          variants={itemVariants}
        >
          {faqsTranslate(`branding.intro.${index}`)}
        </motion.p>
      ))
  }
  
  const brandingList = () => {
    const limit = vdaLimits(vda)?.brandingList || 8
    return Array(limit)
      .fill("")
      .map((_, index) => (
        <motion.li
          key={`branding-list-${index}`}
          className="mb-1 text-base_one dark:text-dark_base_one"
          variants={itemVariants}
        >
          {faqsTranslate(`branding.list.${index}`)}
        </motion.li>
      ))
  }

  // FAQ items data
  const faqItems = [
    {
      question: faqsTranslate("list.0.question"),
      answer: faqsTranslate("list.0.answer")
    },
    {
      question: faqsTranslate("list.1.question"),
      answer: faqsTranslate("list.1.answer")
    },
    {
      question: faqsTranslate("list.2.question"),
      answer: faqsTranslate("list.2.answer")
    },
    {
      question: faqsTranslate("branding.questions.0.question"),
      answer: faqsTranslate("branding.questions.0.answer")
    },
    {
      question: faqsTranslate("branding.questions.1.question"),
      answer: faqsTranslate("branding.questions.1.answer")
    },
    {
      question: faqsTranslate("branding.questions.2.question"),
      answer: faqsTranslate("branding.questions.2.answer")
    }
  ]

  // Filter FAQ items based on search query
  const filteredFAQs = faqItems.filter(item =>
    item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchQuery.toLowerCase())
  )

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
          className="absolute top-20 right-20 w-40 h-40 bg-gradient-to-br from-purple_main/5 to-transparent rounded-full blur-3xl"
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
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          className="text-center mb-12"
          variants={itemVariants}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-purple_main uppercase tracking-wider">
              Help Center
            </span>
          </motion.div>

          <h2 className="text-3xl lg:text-5xl font-black text-heading_main dark:text-dark_heading_main mb-4">
            <span className="text-gradient">
              Frequently Asked Questions
            </span>
          </h2>
          
          <p className="text-lg text-base_one dark:text-dark_base_one max-w-2xl mx-auto">
            Find answers to common questions about our video download service
          </p>
        </motion.div>

        {/* Search bar */}
        <motion.div
          className="mb-8"
          variants={itemVariants}
        >
          <div className="relative max-w-lg mx-auto">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-base_one" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              className="input-modern pl-12 pr-4 w-full"
              placeholder="Search frequently asked questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </motion.div>

        <motion.div
          className="glass-card rounded-3xl p-8 lg:p-12 shadow-2xl"
          variants={itemVariants}
          whileHover={{ y: -2 }}
        >
          {/* Introduction text */}
          <motion.div className="mb-8 space-y-4" variants={containerVariants}>
            <motion.div variants={itemVariants} className="space-y-2">
              <p className="text-base_one dark:text-dark_base_one leading-relaxed">
                {faqsTranslate("intro1.0")}
              </p>
              <p className="text-base_one dark:text-dark_base_one leading-relaxed">
                {faqsTranslate("intro1.1")}
              </p>
              <p className="text-base_one dark:text-dark_base_one leading-relaxed">
                {faqsTranslate("intro1.2")}
              </p>
            </motion.div>

            <motion.h3 
              className="text-2xl font-bold text-heading_main dark:text-dark_heading_main mt-8 mb-4"
              variants={itemVariants}
            >
              {faqsTranslate("heading")}
            </motion.h3>

            <motion.div className="space-y-2" variants={containerVariants}>
              {renderIntro2()}
            </motion.div>
          </motion.div>

          {/* FAQ Accordion */}
          <motion.div className="space-y-4 mb-8" variants={containerVariants}>
            <motion.h3 
              className="text-2xl font-bold text-heading_main dark:text-dark_heading_main mb-6"
              variants={itemVariants}
            >
              {yvdTranslate("fullname")}: {faqsTranslate("word")}
            </motion.h3>

            <AnimatePresence>
              {filteredFAQs.length === 0 && searchQuery && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="text-center py-8"
                >
                  <div className="text-4xl mb-4">🔍</div>
                  <p className="text-base_one dark:text-dark_base_one">
                    No questions found matching "{searchQuery}"
                  </p>
                </motion.div>
              )}

              {filteredFAQs.map((item, index) => (
                <motion.div
                  key={index}
                  className="glass-card rounded-2xl overflow-hidden"
                  variants={itemVariants}
                  layout
                >
                  <motion.button
                    className="w-full p-6 text-left flex justify-between items-start gap-4 hover:bg-white/30 dark:hover:bg-black/30 transition-colors duration-200 focus-modern"
                    onClick={() => toggleExpanded(index)}
                    whileHover={{ x: 2 }}
                  >
                    <h4 className="font-semibold text-heading_main dark:text-dark_heading_main text-lg">
                      {item.question}
                    </h4>
                    <motion.div
                      animate={{ rotate: expandedItems.includes(index) ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="flex-shrink-0 mt-1"
                    >
                      <svg className="w-5 h-5 text-base_one" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </motion.div>
                  </motion.button>

                  <AnimatePresence>
                    {expandedItems.includes(index) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <motion.div
                          initial={{ y: -10 }}
                          animate={{ y: 0 }}
                          exit={{ y: -10 }}
                          className="px-6 pb-6 border-t border-white/10"
                        >
                          <p className="text-base_one dark:text-dark_base_one leading-relaxed pt-4">
                            {item.answer}
                          </p>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Branding section */}
          <motion.div className="border-t border-white/10 pt-8" variants={containerVariants}>
            <motion.h3 
              className="text-2xl font-bold text-heading_main dark:text-dark_heading_main mb-6"
              variants={itemVariants}
            >
              {faqsTranslate("branding.title")}
            </motion.h3>

            <motion.div className="mb-6 space-y-2" variants={containerVariants}>
              {brandingIntro()}
            </motion.div>

            <motion.div className="mb-8" variants={itemVariants}>
              <ul className="list-disc pl-6 space-y-1">
                {brandingList()}
              </ul>
            </motion.div>

            <motion.h4 
              className="text-xl font-bold text-heading_main dark:text-dark_heading_main mb-6"
              variants={itemVariants}
            >
              {faqsTranslate("branding.subtitle")}
            </motion.h4>

            <motion.div className="space-y-6" variants={containerVariants}>
              {[0, 1, 2].map(index => (
                <motion.div key={index} variants={itemVariants}>
                  <h5 className="font-semibold text-heading_main dark:text-dark_heading_main mb-2">
                    {faqsTranslate(`branding.questions.${index}.question`)}
                  </h5>
                  <p className="text-base_one dark:text-dark_base_one leading-relaxed">
                    {faqsTranslate(`branding.questions.${index}.answer`)}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Contact support */}
          <motion.div
            className="mt-12 p-6 glass-card rounded-2xl text-center"
            variants={itemVariants}
          >
            <motion.div
              className="w-12 h-12 bg-purple_main/20 rounded-full flex items-center justify-center mx-auto mb-4"
              whileHover={{ scale: 1.1, rotate: 10 }}
            >
              <svg className="w-6 h-6 text-purple_main" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </motion.div>
            
            <h4 className="font-semibold text-heading_main dark:text-dark_heading_main mb-2">
              Still have questions?
            </h4>
            
            <p className="text-base_one dark:text-dark_base_one mb-4">
              Can't find what you're looking for? Get in touch with our support team.
            </p>
            
            <motion.button
              className="btn-modern px-6 py-3"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Support
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  )
}