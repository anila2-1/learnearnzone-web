'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import BlogSection from '../blogsection/BlogSection'
import BlogListClient from '../blog/BlogListClient'

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
      {/* SECTION 01 — Hero Section */}
      <div className="relative -mt-10 min-h-screen flex flex-col md:flex-row items-center justify-between p-6 md:p-12 overflow-hidden">
        {/* Abstract Background Image with Overlay */}
        <div className="absolute inset-0 bg-linear-to-br from-white/80 via-white/60 to-purple-50/80"></div>

        <div
          className="absolute inset-0 bg-linear-to-br from-white/90 via-white/90 to-purple-50/80 z-0"
          style={{
            backgroundImage: "url('/image/cloud.png')", // ← Your soft abstract image
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          {/* Optional: subtle gradient overlay for text readability */}
          <div className="absolute inset-0 "></div>
        </div>

        {/* Left Side: Animated Multicolor Text */}
        <MotionDiv
          className="w-full md:w-1/2 text-center md:text-left mb-12 md:mb-0 order-2 md:order-1 relative z-10"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <motion.h1
            className="text-4xl md:text-6xl lg:text-5xl font-extrabold leading-tight mb-6"
            initial="hidden"
            animate="visible"
          >
            <motion.span
              className="inline text-pink-500"
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
            >
              <TypingText text="Grow " />
            </motion.span>

            <motion.span
              className="inline text-cyan-800"
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
              transition={{ delay: 0.3 }}
            >
              <TypingText text="Skills " />
            </motion.span>

            <motion.span
              className="inline text-teal-600"
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 5 } }}
              transition={{ delay: 0.6 }}
            >
              <TypingText text="— Get" />
            </motion.span>

            <motion.span
              className="inline bg-clip-text text-transparent bg-linear-to-r from-purple-700 to-pink-600"
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
              transition={{ delay: 0.9 }}
            >
              <TypingText text=" Rewards" />
            </motion.span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-gray-700 max-w-lg mx-auto md:mx-0 mb-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            Master new skills, test your knowledge, and get rewarded with real crypto or cash.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
          >
            {!member ? (
              <>
                <LoadingLink
                  href="/auth/signup"
                  className="px-8 py-4 bg-linear-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform transition-all duration-200"
                >
                  Join Now — It&apos;s Free
                </LoadingLink>
                <LoadingLink
                  href="/auth/login"
                  theme="light"
                  className="px-8 py-4 bg-white text-indigo-600 font-semibold rounded-xl shadow border border-indigo-200"
                >
                  Login
                </LoadingLink>
              </>
            ) : (
              <LoadingLink
                href="/dashboard"
                className="px-8 py-4 bg-linear-to-r from-green-500 to-teal-500 text-white font-semibold rounded-xl shadow-lg"
              >
                Go to Dashboard
              </LoadingLink>
            )}
          </motion.div>
        </MotionDiv>
        <MotionDiv
          className="w-full md:w-1/2 flex justify-center md:justify-end order-1 md:order-2 relative z-10"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
        >
          {/* Stylish Floating Card Background */}
          <div className="relative  animate-floaty">
            {/* Glassmorphism Card */}
            <div className="relative p-4 md:p-6">
              <motion.img
                src="/image/hero-illustration.png"
                alt="Learn, Quiz & Earn Illustration"
                className="w-full max-w-2xl mx-auto "
                initial={{ scale: 0.9, rotate: 2 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 100, damping: 15 }}
              />
            </div>
          </div>
        </MotionDiv>

        {/* Wave Divider at Bottom */}
        <div className="absolute bottom-0 left-0 right-0 w-full z-20">
          <svg viewBox=" 1880" className="w-full h-full text-white" preserveAspectRatio="none">
            <path
              fill="currentColor"
              fillOpacity="100"
              d="M0,32L48,42.7C96,53,192,75,288,74.7C384,75,480,53,576,48C672,43,768,53,864,69.3C960,85,1056,107,1152,106.7C1248,107,1344,85,1392,74.7L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
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

      {/* Blog Section */}
      <MotionDiv
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="mt-24 mb-20 relative z-10 bg-white/70 backdrop-blur-xl rounded-2xl sm:rounded-2xl p-8 md:p-12 border border-gray-200/40 shadow-md md:shadow-lg hover:shadow-xl md:hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 md:hover:-translate-y-2 overflow-hidden group"
      >
        {/* Floating shapes in background */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div
            className="absolute top-0 left-10 w-16 h-16 rounded-full bg-pink-300 opacity-20 animate-float"
            style={{ animationDuration: '12s' }}
          ></div>
          <div
            className="absolute bottom-10 right-10 w-24 h-24 rounded-full bg-purple-400 opacity-15 animate-float"
            style={{ animationDuration: '18s' }}
          ></div>
          <div
            className="absolute top-1/2 left-1/3 w-20 h-20 rounded-full bg-cyan-400 opacity-10 animate-float"
            style={{ animationDuration: '14s' }}
          ></div>
        </div>

        {/* Gradient corners */}
        <div className="hidden md:block absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-teal-400/10 to-cyan-400/10 rounded-bl-full -translate-y-12 translate-x-12 group-hover:translate-x-8 group-hover:-translate-y-8 transition-transform duration-500"></div>
        <div className="hidden md:block absolute bottom-0 left-0 w-32 h-32 bg-linear-to-tr from-purple-400/10 to-indigo-400/10 rounded-tr-full translate-y-12 -translate-x-12 group-hover:-translate-x-8 group-hover:translate-y-8 transition-transform duration-500"></div>

        <div className="relative z-10 text-center mb-8">
          <MotionDiv
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4, type: 'spring', stiffness: 300 }}
            className="inline-flex items-center gap-2 sm:gap-3 mb-6 bg-linear-to-r from-teal-500/20 to-cyan-500/20 px-4 py-2 sm:px-6 sm:py-3 rounded-full border border-teal-200/50 shadow-sm"
          >
            <span className="text-xl sm:text-2xl">📖</span>
            <span className="text-xs sm:text-sm font-medium text-gray-700 tracking-wide uppercase">
              Latest Blogs
            </span>
          </MotionDiv>

          <MotionDiv
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 sm:mb-6 leading-tight px-2">
              Explore Our{' '}
              <span className="bg-linear-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                Blog Collection
              </span>
            </h3>

            <p className="text-base sm:text-lg text-gray-600 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed px-2">
              Dive into insightful articles to boost your knowledge and prepare for quizzes.
            </p>
          </MotionDiv>
        </div>

        <BlogListClient initialPage={1} showFooter={false} />
      </MotionDiv>
      <Footer />
    </div>
  )
}
