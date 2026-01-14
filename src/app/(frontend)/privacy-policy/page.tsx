'use client'

import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'

// Dynamic imports for performance
const Footer = dynamic(() => import('../components/Footer'), {
  ssr: false,
  loading: () => <div className="h-20 bg-gray-100 animate-pulse"></div>,
})

const MotionDiv = dynamic(() => import('framer-motion').then((mod) => mod.motion.div), {
  ssr: false,
})

// Typing animation component
const TypingText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const [displayText, setDisplayText] = useState('')
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        let currentIndex = 0
        const typeTimer = setInterval(() => {
          if (currentIndex < text.length) {
            setDisplayText(text.slice(0, currentIndex + 1))
            currentIndex++
          } else {
            clearInterval(typeTimer)
          }
        }, 50)
        return () => clearInterval(typeTimer)
      }, delay)
      return () => clearTimeout(timer)
    }
  }, [isVisible, text, delay])

  return (
    <span
      ref={(el) => {
        if (el && !isVisible) {
          const observer = new IntersectionObserver(
            ([entry]) => {
              if (entry.isIntersecting) {
                setIsVisible(true)
                observer.disconnect()
              }
            },
            { threshold: 0.1 }
          )
          observer.observe(el)
        }
      }}
    >
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
        className="ml-1"
      >
        |
      </motion.span>
    </span>
  )
}

const page = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 px-6 md:px-12 lg:px-16 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 bg-linear-to-br from-blue-100 via-indigo-50 to-purple-100"></div>
        <motion.div
          className="absolute top-10 left-10 w-32 h-32 bg-blue-200/30 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-40 h-40 bg-indigo-200/30 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/4 w-24 h-24 bg-purple-200/20 rounded-full blur-2xl"
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Floating Icons */}
        <motion.div
          className="absolute top-20 right-20 text-6xl opacity-50"
          animate={{
            y: [0, -10, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          🔒
        </motion.div>
        <motion.div
          className="absolute bottom-32 left-20 text-5xl opacity-50"
          animate={{
            y: [0, 15, 0],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          🛡️
        </motion.div>

        <div className="relative max-w-4xl mx-auto text-center">
          <MotionDiv
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            <motion.h1
              className="text-4xl md:text-6xl font-bold mb-6 bg-linear-to-r from-blue-600 via-indigo-600 to-purple-500 bg-clip-text text-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <TypingText text="Privacy Policy" delay={500} />
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.8 }}
            >
              Your privacy is important to us. Learn how we collect, use, and protect your personal
              information.
            </motion.p>
          </MotionDiv>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16 px-6 md:px-12 lg:px-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <MotionDiv
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Introduction</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              At LearnEarnZone, we are committed to protecting your privacy. This Privacy Policy
              explains how we collect, use, disclose, and safeguard your information when you visit
              our website and use our services.
            </p>
          </MotionDiv>
        </div>
      </section>

      {/* Information We Collect Section */}
      <section className="py-16 px-6 md:px-12 lg:px-16 bg-linear-to-br from-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
          <MotionDiv
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Information We Collect
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We collect information to provide better services to all our users.
            </p>
          </MotionDiv>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '👤',
                title: 'Personal Information',
                description:
                  'Name, email address, phone number, and other details you provide when registering or contacting us.',
                color: 'blue',
              },
              {
                icon: '📊',
                title: 'Usage Data',
                description:
                  'Information about how you use our website, including pages visited, time spent, and interactions.',
                color: 'indigo',
              },
              {
                icon: '🍪',
                title: 'Cookies and Tracking',
                description:
                  'Data collected through cookies and similar technologies to enhance your experience.',
                color: 'purple',
              },
            ].map((item, index) => (
              <MotionDiv
                key={index}
                initial={{ opacity: 0, y: 50, rotateY: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{
                  scale: 1.05,
                  rotateY: 5,
                  transition: { duration: 0.3 },
                }}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl border border-gray-100 transition-all duration-300 hover:-translate-y-3 cursor-pointer"
              >
                <motion.div
                  className="text-5xl mb-6"
                  whileHover={{
                    scale: 1.2,
                    rotate: [0, -10, 10, 0],
                    transition: { duration: 0.5 },
                  }}
                >
                  {item.icon}
                </motion.div>
                <motion.h3
                  className={`text-2xl font-bold text-${item.color}-600 mb-4`}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  {item.title}
                </motion.h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </MotionDiv>
            ))}
          </div>
        </div>
      </section>

      {/* How We Use Your Information Section */}
      <section className="py-16 px-6 md:px-12 lg:px-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <MotionDiv
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              How We Use Your Information
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We use the information we collect to provide, maintain, and improve our services.
            </p>
          </MotionDiv>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: 'Provide Services',
                description:
                  'To deliver our learning platform, process transactions, and respond to your inquiries.',
              },
              {
                title: 'Improve User Experience',
                description:
                  'To analyze usage patterns, personalize content, and enhance our website functionality.',
              },
              {
                title: 'Communication',
                description:
                  'To send you updates, newsletters, and important information about our services.',
              },
              {
                title: 'Security and Compliance',
                description:
                  'To protect against fraud, ensure legal compliance, and maintain platform security.',
              },
            ].map((item, index) => (
              <MotionDiv
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-linear-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl border border-gray-100"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </MotionDiv>
            ))}
          </div>
        </div>
      </section>

      {/* Data Sharing and Disclosure Section */}
      <section className="py-16 px-6 md:px-12 lg:px-16 bg-linear-to-br from-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
          <MotionDiv
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Data Sharing and Disclosure
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We do not sell, trade, or otherwise transfer your personal information to third
              parties without your consent, except as described in this policy.
            </p>
          </MotionDiv>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: 'Service Providers',
                description:
                  'We may share information with trusted third-party service providers who assist us in operating our website and conducting our business.',
              },
              {
                title: 'Legal Requirements',
                description:
                  'We may disclose information if required by law, court order, or to protect our rights and the safety of our users.',
              },
            ].map((item, index) => (
              <MotionDiv
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </MotionDiv>
            ))}
          </div>
        </div>
      </section>

      {/* Your Rights Section */}
      <section className="py-16 px-6 md:px-12 lg:px-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <MotionDiv
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Your Rights</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              You have certain rights regarding your personal information. Contact us to exercise
              these rights.
            </p>
          </MotionDiv>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '👁️',
                title: 'Access',
                description: 'Request access to the personal information we hold about you.',
              },
              {
                icon: '✏️',
                title: 'Correction',
                description: 'Request correction of inaccurate or incomplete information.',
              },
              {
                icon: '🗑️',
                title: 'Deletion',
                description:
                  'Request deletion of your personal information under certain circumstances.',
              },
            ].map((item, index) => (
              <MotionDiv
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center bg-linear-to-br from-indigo-50 to-purple-50 p-8 rounded-2xl border border-gray-100"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </MotionDiv>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section className="py-16 px-6 md:px-12 lg:px-16 bg-linear-to-br from-blue-50 to-indigo-50">
        <div className="max-w-4xl mx-auto text-center">
          <MotionDiv
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Contact Us</h2>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us.
            </p>
            <motion.a
              href="/contact-us"
              className="inline-block px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              whileHover={{
                scale: 1.05,
                boxShadow:
                  '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
            >
              Get in Touch
            </motion.a>
          </MotionDiv>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default page
