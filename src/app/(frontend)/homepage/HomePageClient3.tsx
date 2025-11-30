'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import BlogListClient from '../blog/BlogListClient'
import page from './../categories/page'

// Code-split heavy components
const Footer = dynamic(() => import('../components/Footer'), {
  ssr: false,
  loading: () => <div className="h-20 bg-gray-100 animate-pulse"></div>,
})

const LoadingLink = dynamic(() => import('../components/LoadingLink'), {
  ssr: false,
  loading: () => (
    <button className="px-6 py-3 homepage-text bg-gray-200 text-gray-500 rounded-lg animate-pulse cursor-wait">
      Loading...
    </button>
  ),
})

const MotionDiv = dynamic(() => import('framer-motion').then((mod) => mod.motion.div), {
  ssr: false,
})
const TypingText = ({ text }: { text: string }) => {
  return (
    <span>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.02, duration: 0.1 }}
          style={{ display: 'inline-block' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  )
}

export default function HomePageClient() {
  const [member, setMember] = useState<any>(null)
  const [, setIsVisible] = useState(false)
  const [showGradientBar, setShowGradientBar] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    fetch('/api/get-member')
      .then((res) => res.json())
      .then((data) => setMember(data.member))
      .catch((err) => console.error('Failed to fetch member:', err))
  }, [])

  return (
    <div className=" homepage-text relative min-h-screen overflow-hidden bg-white">
      {/* MODERN WATERCOLOR BACKGROUND FOR SECTION 01 */}
      <div
        className="relative w-full h-[700px] overflow-hidden bg-cover bg-no-repeat animate-cloudMove"
        style={{
          backgroundImage: "url('/image/cloud.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'bottom',
        }}
      >
        {/* TOP LIGHT GRADIENT ONLY */}
        <div className="absolute inset-0 bg-linear-to-b from-white/70 to-transparent"></div>

        {/* Floating Abstract Shapes */}
        <div className="absolute inset-0 pointer-events-none z-10">
          <div
            className="absolute top-10 left-10 w-12 h-12 rounded-full bg-pink-300 opacity-25"
            style={{ animation: 'float 8s ease-in-out infinite' }}
          ></div>
          <div
            className="absolute bottom-20 right-10 w-16 h-16 rounded-full bg-purple-500 opacity-20"
            style={{ animation: 'float 10s ease-in-out infinite' }}
          ></div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-[600px] p-8 md:p-12 lg:p-16 text-center">
          {/* LEFT SIDE → Now Centered */}
          <MotionDiv
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="max-w-4xl w-full"
          >
            {/* Multi-color Typing Headline */}
            <motion.h2
              className="text-4xl md:text-6xl font-bold mb-6 leading-tight cursor-pointer"
              onClick={() => setShowGradientBar(!showGradientBar)}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2, staggerChildren: 0.03 }}
            >
              {/* Word 1: "Learn," → Pink */}
              <motion.span
                className="inline-block text-pink-500"
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1 },
                }}
              >
                <TypingText text="Learn," />
              </motion.span>

              {/* Word 2: "Quiz" → Purple */}
              <motion.span
                className="inline-block text-purple-600 mx-1"
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1 },
                }}
              >
                <TypingText text="Quiz" />
              </motion.span>

              {/* Word 3: "& Earn" → Cyan */}
              <motion.span
                className="inline-block text-cyan-600 mx-1"
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1 },
                }}
              >
                <TypingText text="& Earn" />
              </motion.span>

              {/* Word 4: "Real Rewards" → Purple */}
              <motion.span
                className="inline-block text-purple-500 mx-1"
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1 },
                }}
              >
                <TypingText text="Real Rewards" />
              </motion.span>

              {/* Subheading */}
              <motion.span
                className="block mt-4 text-lg text-gray-600 font-normal"
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ delay: 0.4 }}
              >
                Master new skills, test your knowledge, and get rewarded.
              </motion.span>
            </motion.h2>

            <motion.p
              className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
            >
              Refer friends and get{' '}
              <span className="font-bold text-purple-600">100 bonus points</span> per signup!
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row justify-center gap-6"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6 }}
            >
              {!member ? (
                <>
                  <LoadingLink
                    href="/auth/signup"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-linear-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform transition-all duration-200 text-base"
                  >
                    Join Now — It&apos;s Free
                  </LoadingLink>
                  <LoadingLink
                    href="/auth/login"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    theme="light"
                    className="px-8 py-4 bg-white text-indigo-600 font-semibold rounded-xl shadow-lg hover:shadow-xl border border-indigo-200 transform transition-all duration-200 text-base"
                  >
                    Login
                  </LoadingLink>
                </>
              ) : (
                <LoadingLink
                  href="/dashboard"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-linear-to-r from-green-500 to-teal-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform transition-all duration-200 text-base"
                >
                  Go to Dashboard
                </LoadingLink>
              )}
            </motion.div>
          </MotionDiv>
        </div>
      </div>

      {/* Stats Cards */}
      <MotionDiv
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
      >
        {[
          {
            icon: '👤',
            title: 'Create an Account',
            desc: 'Start your journey by creating a free account. It takes less than a minute!',
            color: 'indigo',
          },
          {
            icon: '📚',
            title: 'Read Blogs',
            desc: 'Dive into our library of well-researched articles to build your knowledge before taking quizzes.',
            color: 'purple',
          },
          {
            icon: '💰',
            title: 'Earn Money',
            desc: 'Convert your quiz points into real rewards or crypto. Your knowledge has value!',
            color: 'pink',
          },
        ].map((feature, idx) => (
          <MotionDiv
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + idx * 0.1 }}
            className="bg-white/90 backdrop-blur-lg p-8 rounded-3xl shadow-xl hover:shadow-2xl border border-gray-200/50 transition-all duration-300 transform hover:-translate-y-2"
          >
            <div className="text-4xl mb-4">{feature.icon}</div>
            <h3 className={`text-2xl font-bold text-${feature.color}-600 mb-3`}>{feature.title}</h3>
            <p className="text-gray-600">{feature.desc}</p>
          </MotionDiv>
        ))}
      </MotionDiv>

      {/* Blog Section with Wave Background */}
      <section className="relative mt-20 overflow-hidden bg-linear-to-br from-purple-50 via-indigo-50 to-pink-50 py-20">
        <div className="relative bg-bottom bg-no-repeat">
          <BlogListClient showFooter={false} />
        </div>
      </section>
      <Footer />
    </div>
  )
}
