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
        <div className="absolute inset-0 bg-linear-to-br from-indigo-100 via-purple-50 to-pink-100"></div>
        <motion.div
          className="absolute top-10 left-10 w-32 h-32 bg-indigo-200/30 rounded-full blur-3xl"
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
          className="absolute bottom-10 right-10 w-40 h-40 bg-purple-200/30 rounded-full blur-3xl"
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
          className="absolute top-1/2 left-1/4 w-24 h-24 bg-pink-200/20 rounded-full blur-2xl"
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
          📞
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
          ✉️
        </motion.div>

        <div className="relative max-w-4xl mx-auto text-center">
          <MotionDiv
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            <motion.h1
              className="text-4xl md:text-6xl font-bold mb-6 bg-linear-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <TypingText text="Contact Us" delay={500} />
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.8 }}
            >
              Get in touch with us. We'd love to hear from you and answer any questions you may
              have.
            </motion.p>
          </MotionDiv>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-6 md:px-12 lg:px-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <MotionDiv
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Reach Out to Us</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Have questions about LearnEarnZone? Want to partner with us? Send us a message and
              we'll get back to you soon.
            </p>
          </MotionDiv>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <MotionDiv
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Send a Message</h3>
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors resize-none"
                    placeholder="Your message here..."
                  ></textarea>
                </div>
                <motion.button
                  type="submit"
                  className="w-full px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Send Message
                </motion.button>
              </form>
            </MotionDiv>

            {/* Contact Info */}
            <MotionDiv
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="bg-linear-to-br from-indigo-50 to-purple-50 p-8 rounded-2xl border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="text-4xl mr-4">📧</div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900">Email Us</h4>
                    <p className="text-gray-600">support@learnearnzone.com</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  For general inquiries, support, or partnership opportunities.
                </p>
              </div>

              <div className="bg-linear-to-br from-purple-50 to-pink-50 p-8 rounded-2xl border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="text-4xl mr-4">📞</div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900">Call Us</h4>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                  </div>
                </div>
                <p className="text-gray-600">Available Monday to Friday, 9 AM to 6 PM EST.</p>
              </div>

              <div className="bg-linear-to-br from-pink-50 to-indigo-50 p-8 rounded-2xl border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="text-4xl mr-4">📍</div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900">Visit Us</h4>
                    <p className="text-gray-600">
                      123 Learning Street
                      <br />
                      Education City, EC 12345
                    </p>
                  </div>
                </div>
                <p className="text-gray-600">Come say hello at our headquarters.</p>
              </div>
            </MotionDiv>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default page
