'use client'

import dynamic from 'next/dynamic'
import LoadingLink from '../components/LoadingLink'

const MotionDiv = dynamic(() => import('framer-motion').then((mod) => mod.motion.div), {
  ssr: false,
})

export default function BlogSection() {
  return (
    <section className="my-20 md:my-24 max-w-7xl mx-auto px-6 sm:px-8 relative">
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

      <MotionDiv
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10 bg-white/70 backdrop-blur-xl rounded-3xl sm:rounded-4xl p-8 md:p-12 border border-gray-200/40 shadow-lg md:shadow-xl hover:shadow-xl md:hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 md:hover:-translate-y-2 overflow-hidden group"
      >
        {/* Gradient corners */}
        <div className="hidden md:block absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-teal-400/10 to-cyan-400/10 rounded-bl-full -translate-y-12 translate-x-12 group-hover:translate-x-8 group-hover:-translate-y-8 transition-transform duration-500"></div>
        <div className="hidden md:block absolute bottom-0 left-0 w-32 h-32 bg-linear-to-tr from-purple-400/10 to-indigo-400/10 rounded-tr-full translate-y-12 -translate-x-12 group-hover:-translate-x-8 group-hover:translate-y-8 transition-transform duration-500"></div>

        <div className="relative z-10 text-center">
          <MotionDiv
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4, type: 'spring', stiffness: 300 }}
            className="inline-flex items-center gap-2 sm:gap-3 mb-6 bg-linear-to-r from-teal-500/20 to-cyan-500/20 px-4 py-2 sm:px-6 sm:py-3 rounded-full border border-teal-200/50 shadow-sm"
          >
            <span className="text-xl sm:text-2xl">📖</span>
            <span className="text-xs sm:text-sm font-medium text-gray-700 tracking-wide uppercase">
              New Knowledge Awaits
            </span>
          </MotionDiv>

          <MotionDiv
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 sm:mb-6 leading-tight px-2">
              Ready to Learn Something{' '}
              <span className="bg-linear-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                New?
              </span>
            </h3>

            <p className="text-base sm:text-lg text-gray-600 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed px-2">
              Learn from experts. Quiz with confidence. Earn as you grow.
            </p>

            <LoadingLink
              href="/blog"
              whileHover={{ scale: 1.05, boxShadow: '0 20px 40px -10px rgba(32, 211, 200, 0.3)' }}
              whileTap={{ scale: 0.97 }}
              className="px-8 sm:px-12 py-4 sm:py-5 bg-linear-to-r from-teal-500 via-cyan-500 to-teal-500 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transform transition-all duration-300 relative overflow-hidden inline-block"
            >
              <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-3">
                Explore Blogs Now <span className="text-lg sm:text-xl">→</span>
              </span>
              {/* Animated Gradient Overlay */}
              <span className="absolute inset-0 bg-linear-to-r from-teal-400/30 via-cyan-300/30 to-teal-400/30 opacity-50 rounded-2xl animate-pulse"></span>
            </LoadingLink>

            {/* Floating dots */}
            <div className="hidden lg:block absolute -top-2 -left-2 w-2 h-2 bg-teal-400 rounded-full animate-ping"></div>
            <div className="hidden lg:block absolute -bottom-4 -right-4 w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-1000"></div>
          </MotionDiv>
        </div>
      </MotionDiv>
    </section>
  )
}
