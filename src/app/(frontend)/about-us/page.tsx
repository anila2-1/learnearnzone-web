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
          🎓
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
          💰
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
              <TypingText text="About Us" delay={500} />
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.8 }}
            >
              Revolutionizing education by making learning rewarding, engaging, and accessible to
              everyone.
            </motion.p>
          </MotionDiv>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-6 md:px-12 lg:px-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <MotionDiv
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              At LearnEarnZone, we believe that learning should be both enjoyable and rewarding. Our
              platform combines interactive quizzes with real-world incentives to motivate learners
              of all ages to expand their knowledge and skills.
            </p>
          </MotionDiv>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '🎯',
                title: 'Make Learning Fun',
                description:
                  'Transform traditional education into an engaging, gamified experience that keeps learners motivated and excited.',
                color: 'indigo',
              },
              {
                icon: '💰',
                title: 'Reward Knowledge',
                description:
                  'Turn learning achievements into tangible rewards, from cash payouts to cryptocurrency, making education truly valuable.',
                color: 'purple',
              },
              {
                icon: '🌍',
                title: 'Accessible to All',
                description:
                  'Create an inclusive platform where anyone, anywhere can learn, grow, and earn regardless of their background or location.',
                color: 'pink',
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

      {/* How It Works Section */}
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
              How LearnEarnZone Works
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Our platform is designed to be simple yet powerful. Here's how you can start learning
              and earning today.
            </p>
          </MotionDiv>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: '1',
                title: 'Sign Up',
                description:
                  'Create your free account in under a minute and join our learning community.',
                icon: '📝',
              },
              {
                step: '2',
                title: 'Learn & Read',
                description:
                  'Explore our comprehensive blog library covering diverse topics and subjects.',
                icon: '📚',
              },
              {
                step: '3',
                title: 'Take Quizzes',
                description:
                  'Test your knowledge with engaging quizzes and earn points for correct answers.',
                icon: '❓',
              },
              {
                step: '4',
                title: 'Earn Rewards',
                description:
                  'Convert your points into real money, crypto, or other valuable rewards.',
                icon: '💎',
              },
            ].map((item, index) => (
              <MotionDiv
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl border border-gray-100 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <div className="w-12 h-12 bg-linear-to-r from-indigo-500 to-purple-500 text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
              </MotionDiv>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 md:px-12 lg:px-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <MotionDiv
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Impact</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Join thousands of learners who are already benefiting from our platform.
            </p>
          </MotionDiv>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { number: '10K+', label: 'Active Learners' },
              { number: '500+', label: 'Quiz Topics' },
              { number: '50K+', label: 'Points Earned' },
              { number: '95%', label: 'Satisfaction Rate' },
            ].map((stat, index) => (
              <MotionDiv
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center bg-linear-to-br from-indigo-50 to-purple-50 p-8 rounded-2xl border border-gray-100"
              >
                <div className="text-3xl md:text-4xl font-bold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </MotionDiv>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-6 md:px-12 lg:px-16 bg-linear-to-r from-indigo-100 via-purple-100 to-pink-100">
        <div className="max-w-4xl mx-auto text-center">
          <MotionDiv
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Ready to Start Learning and Earning?
            </h2>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              Join our community today and discover how learning can be both fun and financially
              rewarding.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/auth/signup"
                className="inline-block px-8 py-4 bg-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
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
                Get Started Free
              </motion.a>
              <motion.a
                href="/blog"
                className="inline-block px-8 py-4 bg-white text-indigo-600 font-semibold rounded-xl border border-indigo-200 hover:bg-indigo-50 transition-all duration-300"
                whileHover={{
                  scale: 1.05,
                  backgroundColor: 'rgba(99, 102, 241, 0.1)',
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                viewport={{ once: true }}
              >
                Explore Blogs
              </motion.a>
            </div>
          </MotionDiv>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default page
