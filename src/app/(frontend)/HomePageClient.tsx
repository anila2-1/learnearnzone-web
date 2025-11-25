'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

// Code-split heavy components
const Footer = dynamic(() => import('./components/Footer'), {
  ssr: false,
  loading: () => <div className="h-20 bg-gray-100 animate-pulse"></div>,
})

const LoadingLink = dynamic(() => import('./components/LoadingLink'), {
  ssr: false,
  loading: () => (
    <button className="px-6 py-3 bg-gray-200 text-gray-500 rounded-lg animate-pulse cursor-wait">
      Loading...
    </button>
  ),
})

const MotionDiv = dynamic(() => import('framer-motion').then((mod) => mod.motion.div), {
  ssr: false,
})

const AnimatePresence = dynamic(() => import('framer-motion').then((mod) => mod.AnimatePresence), {
  ssr: false,
})

export default function HomePageClient() {
  const [member, setMember] = useState<any>(null)
  const [, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    fetch('/api/get-member')
      .then((res) => res.json())
      .then((data) => setMember(data.member))
      .catch((err) => console.error('Failed to fetch member:', err))
  }, [])

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Orb 1: Slow pulsing */}
        <div
          className="absolute w-96 h-96 rounded-full blur-3xl opacity-70 animate-pulse"
          style={{
            background:
              'radial-gradient(circle at 30% 30%, rgba(79, 70, 229, 0.3), transparent 50%)',
            left: '-10%',
            top: '-10%',
            animation: 'float 20s ease-in-out infinite',
          }}
        ></div>

        {/* Orb 3: Rotating */}
        <div
          className="absolute top-1/2 left-1/2 w-64 h-64 rounded-full blur-2xl opacity-40 animate-spin"
          style={{
            background:
              'radial-gradient(circle at center, rgba(14, 165, 233, 0.2), transparent 70%)',
            transform: 'translate(-50%, -50%)',
            animationDuration: '40s',
          }}
        ></div>

        {/* Subtle Grid Pattern */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(69, 70, 229, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(79, 70, 229, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        ></div>
      </div>

      {/* Memphis Design Elements - Bold, Colorful, Geometric */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Memphis Circles */}
        <div
          className="absolute w-10 h-10 bg-red-500 rounded-full opacity-80"
          style={{
            left: '5%',
            top: '10%',
            animation: 'float 6s ease-in-out infinite',
          }}
        ></div>

        <div
          className="absolute w-10 h-10 bg-yellow-500 rounded-full opacity-70"
          style={{
            right: '10%',
            top: '20%',
            animation: 'pulse 5s ease-in-out infinite',
          }}
        ></div>

        {/* Memphis Squares */}
        <div
          className="absolute w-18 h-18 bg-green-500 rotate-45 opacity-80"
          style={{
            right: '25%',
            bottom: '10%',
            animation: 'float 7s ease-in-out infinite',
          }}
        ></div>
        <div
          className="absolute w-24 h-24 border-4 border-dashed border-purple-500 rounded-full opacity-60"
          style={{
            left: '20%',
            bottom: '15%',
            animation: 'spin 8s linear infinite',
          }}
        ></div>
        <div
          className="absolute w-14 h-14 bg-blue-500 rounded-md opacity-70"
          style={{
            left: '35%',
            top: '30%',
            animation: 'pulse 4s ease-in-out infinite',
          }}
        ></div>

        {/* Memphis Triangles */}

        <div
          className="absolute w-0 h-0 opacity-80"
          style={{
            right: '5%',
            bottom: '25%',
            borderLeft: '18px solid transparent',
            borderRight: '18px solid transparent',
            borderTop: '32px solid #8b5cf6',
            animation: 'float 5s ease-in-out infinite',
          }}
        ></div>

        {/* Memphis Lines & Patterns */}
        <div
          className="absolute w-24 h-6 opacity-80"
          style={{
            left: '10%',
            top: '60%',
            animation: 'wiggle 3s ease-in-out infinite',
          }}
        >
          <svg viewBox="0 0 100 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 10 L20 0 L40 10 L60 0 L80 10 L100 0" stroke="#f59e0b" strokeWidth="6" />
          </svg>
        </div>

        <div
          className="absolute w-28 h-8 opacity-70"
          style={{
            right: '15%',
            bottom: '5%',
            animation: 'wiggle 4s ease-in-out infinite',
          }}
        >
          <svg viewBox="0 0 100 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0 10 L10 0 L20 10 L30 0 L40 10 L50 0 L60 10 L70 0 L80 10 L90 0 L100 10"
              stroke="#10b981"
              strokeWidth="6"
            />
          </svg>
        </div>

        {/* Memphis Dots */}
        <div
          className="absolute w-6 h-6 bg-pink-500 rounded-full opacity-80"
          style={{
            left: '80%',
            top: '40%',
            animation: 'pulse 3s ease-in-out infinite',
          }}
        ></div>

        <div
          className="absolute w-8 h-8 bg-cyan-500 rounded-full opacity-70"
          style={{
            right: '30%',
            top: '65%',
            animation: 'float 5s ease-in-out infinite',
          }}
        ></div>

        {/* Memphis Plus Signs */}
        <div
          className="absolute w-10 h-10 opacity-70"
          style={{
            left: '70%',
            bottom: '30%',
            animation: 'rotate 7s linear infinite',
          }}
        >
          <div className="absolute w-10 h-1 bg-fuchsia-500 top-4.5 left-0"></div>
          <div className="absolute w-1 h-10 bg-fuchsia-500 top-0 left-4.5"></div>
        </div>

        {/* Memphis Striped Shapes */}
        <div
          className="absolute w-20 h-20 opacity-60"
          style={{
            right: '40%',
            top: '50%',
            animation: 'spin 10s linear infinite',
          }}
        >
          <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="20" height="20" fill="#8b5cf6" />
            <line x1="0" y1="2" x2="20" y2="2" stroke="#ffffff" strokeWidth="2" />
            <line x1="0" y1="6" x2="20" y2="6" stroke="#ffffff" strokeWidth="2" />
            <line x1="0" y1="10" x2="20" y2="10" stroke="#ffffff" strokeWidth="2" />
            <line x1="0" y1="14" x2="20" y2="14" stroke="#ffffff" strokeWidth="2" />
            <line x1="0" y1="18" x2="20" y2="18" stroke="#ffffff" strokeWidth="2" />
          </svg>
        </div>

        {/* Memphis Checkerboard - TOP CENTER */}
        <div
          className="absolute w-16 h-16 opacity-50 z-10"
          style={{
            left: '50%',
            top: '0', // Changed from bottom to top
            transform: 'translateX(-50%)', // Center horizontally
            animation: 'float 8s ease-in-out infinite',
          }}
        >
          <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="16" height="16" fill="#10b981" />
            <rect x="0" y="0" width="4" height="4" fill="#ffffff" />
            <rect x="8" y="0" width="4" height="4" fill="#ffffff" />
            <rect x="4" y="4" width="4" height="4" fill="#ffffff" />
            <rect x="12" y="4" width="4" height="4" fill="#ffffff" />
            <rect x="0" y="8" width="4" height="4" fill="#ffffff" />
            <rect x="8" y="8" width="4" height="4" fill="#ffffff" />
            <rect x="4" y="12" width="4" height="4" fill="#ffffff" />
            <rect x="12" y="12" width="4" height="4" fill="#ffffff" />
          </svg>
        </div>

        {/* Memphis Wavy Lines */}
        <div
          className="absolute w-32 h-8 opacity-70"
          style={{
            left: '25%',
            top: '75%',
            animation: 'wiggle 5s ease-in-out infinite',
          }}
        >
          <svg viewBox="0 0 100 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0 10 C10 5, 20 15, 30 10 C40 5, 50 15, 60 10 C70 5, 80 15, 90 10 C100 5, 110 15, 120 10"
              stroke="#f59e0b"
              strokeWidth="6"
            />
          </svg>
        </div>
      </div>

      {/* Floating Animation Keyframes */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(10px, 10px); }
          50% { transform: translate(-5px, -5px); }
          75% { transform: translate(-10px, 10px); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 0.9; }
        }

        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes wiggle {
          0% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-3px) rotate(3deg); }
          50% { transform: translateY(0px) rotate(0deg); }
          75% { transform: translateY(3px) rotate(-3deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }

        @keyframes grow {
          0% { transform: scaleX(0); }
          100% { transform: scaleX(1); }
        }

        @keyframes glow {
          0%, 100% { box-shadow: 0 5px 15px rgba(32, 211, 200, 0.2); }
          50% { box-shadow: 0 5px 30px rgba(32, 211, 200, 0.4); }
        }

        .animate-grow {
          animation: grow 1.5s ease-out forwards;
        }

        .button-glow:hover {
          animation: glow 1.5s infinite;
        }
      `}</style>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 text-center pt-16">
        <MotionDiv
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mb-8"
        ></MotionDiv>

        <AnimatePresence>
          <MotionDiv
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Learn, Quiz & Earn Real Rewards
              <span className="block mt-4 text-lg text-gray-600 font-normal">
                Master new skills, test your knowledge, and get rewarded.
              </span>
            </h2>

            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
              Refer friends and get{' '}
              <span className="font-bold text-indigo-600">100 bonus points</span> per signup!
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-6">
              {!member ? (
                <>
                  <LoadingLink
                    href="/auth/signup"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform transition-all duration-200 text-base"
                  >
                    Join Now — It's Free
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
                  className="px-8 py-4 bg-gradient-to-r from-green-500 to-teal-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform transition-all duration-200 text-base"
                >
                  Go to Dashboard
                </LoadingLink>
              )}
            </div>
          </MotionDiv>
        </AnimatePresence>

        {/* Blog Section */}
        <div className="my-16 md:my-24 max-w-5xl mx-auto px-2 sm:px-4">
          <MotionDiv
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
            className="relative bg-white/70 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 border border-gray-200/40 shadow-xl md:shadow-2xl hover:shadow-2xl md:hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-1 md:hover:-translate-y-2 overflow-hidden group"
          >
            <div className="hidden md:block absolute top-0 right-0 w-24 md:w-32 h-24 md:h-32 bg-gradient-to-br from-teal-400/10 to-cyan-400/10 rounded-bl-full -translate-y-8 md:-translate-y-12 translate-x-8 md:translate-x-12 group-hover:translate-x-6 md:group-hover:translate-x-8 group-hover:-translate-y-6 md:group-hover:-translate-y-8 transition-transform duration-500"></div>
            <div className="hidden md:block absolute bottom-0 left-0 w-24 md:w-32 h-24 md:h-32 bg-gradient-to-tr from-purple-400/10 to-indigo-400/10 rounded-tr-full translate-y-8 md:translate-y-12 -translate-x-8 md:-translate-x-12 group-hover:-translate-x-6 md:group-hover:-translate-x-8 group-hover:translate-y-6 md:group-hover:translate-y-8 transition-transform duration-500"></div>

            <div className="relative z-10 text-center">
              <MotionDiv
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.8, type: 'spring', stiffness: 300 }}
                className="inline-flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 bg-gradient-to-r from-teal-500/20 to-cyan-500/20 px-3 sm:px-5 py-2 sm:py-3 rounded-full border border-teal-200/50"
              >
                <span className="text-xl sm:text-2xl">📖</span>
                <span className="text-xs sm:text-sm font-medium text-gray-700 tracking-wide uppercase">
                  New Knowledge Awaits
                </span>
              </MotionDiv>

              <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-3 sm:mb-4 leading-tight px-2">
                Ready to Learn Something{' '}
                <span className="bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                  New?
                </span>
              </h3>

              <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-10 max-w-3xl mx-auto leading-relaxed px-2">
                Learn from experts. Quiz with confidence. Earn as you grow.
              </p>

              <LoadingLink
                href="/blog"
                whileHover={{ scale: 1.03, boxShadow: '0 20px 40px -10px rgba(32, 211, 200, 0.3)' }}
                whileTap={{ scale: 0.97 }}
                className="px-6 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-teal-500 via-cyan-500 to-teal-500 text-white font-bold rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl hover:shadow-xl sm:hover:shadow-2xl transform transition-all duration-300 text-base sm:text-lg relative overflow-hidden mx-auto block"
              >
                <span className="relative z-10 flex items-center justify-center gap-1 sm:gap-2">
                  Explore Blogs Now
                  <span className="text-base sm:text-lg">→</span>
                </span>
              </LoadingLink>

              <div className="hidden lg:block absolute -top-2 -left-2 w-1.5 h-1.5 bg-teal-400 rounded-full animate-ping"></div>
              <div className="hidden lg:block absolute -bottom-4 -right-4 w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-1000"></div>
            </div>
          </MotionDiv>
        </div>

        {/* Stats Cards */}
        <MotionDiv
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
        >
          {[
            { number: '100+', label: 'Learning Posts', color: 'indigo' },
            { number: '50K+', label: 'Quizzes Taken', color: 'purple' },
            { number: '₹5L+', label: 'Rewards Distributed', color: 'pink' },
          ].map((stat, idx) => (
            <MotionDiv
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + idx * 0.1 }}
              className="bg-white/90 backdrop-blur-lg p-8 rounded-3xl shadow-xl hover:shadow-2xl border border-gray-200/50 transition-all duration-300 transform hover:-translate-y-2"
            >
              <h3 className={`text-4xl font-extrabold text-${stat.color}-600 mb-2`}>
                {stat.number}
              </h3>
              <p className="text-gray-600 font-medium">{stat.label}</p>
            </MotionDiv>
          ))}
        </MotionDiv>

        {/* Feature Highlights */}
        <MotionDiv
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto"
        >
          {[
            {
              icon: '📚',
              title: 'Learn from Blogs',
              desc: 'Read well-researched articles on tech, finance, and more before taking quizzes.',
            },
            {
              icon: '🏆',
              title: 'Earn Points & Rewards',
              desc: 'Get points for correct answers and redeem them for real rewards.',
            },
            {
              icon: '🔗',
              title: 'Refer & Earn',
              desc: 'Share your referral link and earn 100 bonus points per signup.',
            },
            {
              icon: '📱',
              title: 'Mobile Friendly',
              desc: 'Access quizzes and track earnings from any device, anytime.',
            },
          ].map((feature, idx) => (
            <MotionDiv
              key={idx}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 + idx * 0.1 }}
              className="flex items-start space-x-4 p-6 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <span className="text-3xl">{feature.icon}</span>
              <div className="text-left">
                <h4 className="text-xl font-semibold text-gray-800">{feature.title}</h4>
                <p className="text-gray-600 mt-1">{feature.desc}</p>
              </div>
            </MotionDiv>
          ))}
        </MotionDiv>
      </div>

      <Footer />
    </div>
  )
}
