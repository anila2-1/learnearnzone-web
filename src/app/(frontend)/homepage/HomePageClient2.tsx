'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import BlogSection from '../blogsection/BlogSection'
import Link from 'next/link'
import Image from 'next/image'
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
  const [categories, setCategories] = useState<any[]>([]) // Add categories state
  const [, setIsVisible] = useState(false)
  const [showGradientBar, setShowGradientBar] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    fetch('/api/get-member')
      .then((res) => res.json())
      .then((data) => setMember(data.member))
      .catch((err) => console.error('Failed to fetch member:', err))

    // Fetch categories
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/categories?depth=1`)
      .then((res) => res.json())
      .then((data) => {
        console.log('Fetched categories:', data.docs)
        setCategories(data.docs || [])
      })
      .catch((err) => console.error('Failed to fetch categories:', err))
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

      {/* Blog Section with Wave Background */}
      <div className="relative  bg-bottom bg-no-repeat">
        <BlogSection />
      </div>

      <section className="relative overflow-hidden bg-linear-to-br from-purple-50/60 via-indigo-50/40 to-pink-50/30 py-20">
        {/* Floating abstract blobs (optional decorative) */}
        <div
          className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-purple-300/20 blur-3xl"
          style={{ animation: 'float 12s ease-in-out infinite' }}
        ></div>
        <div
          className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-indigo-300/20 blur-3xl"
          style={{ animation: 'float 14s ease-in-out infinite reverse' }}
        ></div>

        <MotionDiv
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-7xl mx-auto px-4"
        >
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block mb-4 px-4 py-1.5 rounded-full bg-linear-to-r from-indigo-500 to-purple-500 text-white text-xs font-semibold tracking-wide"
            >
              Discover Learning Paths
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl md:text-4xl font-bold bg-linear-to-r from-gray-900 to-indigo-700 bg-clip-text text-transparent mb-4"
            >
              Explore Categories
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-gray-600 max-w-2xl mx-auto"
            >
              Discover a wide range of learning categories to enhance your knowledge and skills.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category: any, idx: number) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + idx * 0.1, ease: 'easeOut' }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group"
              >
                <Link href={`/categories/${category.slug}`} className="block h-full">
                  <div className="relative h-full overflow-hidden rounded-2xl border border-gray-200/60 bg-white/80 backdrop-blur-sm shadow-lg transition-all duration-300 hover:shadow-xl hover:border-indigo-300/70">
                    {/* Hover glow effect */}
                    <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-transparent via-transparent to-indigo-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

                    {/* Featured Image */}
                    {category.featuredImage ? (
                      <div className="relative h-48 w-full overflow-hidden">
                        <Image
                          src={
                            category.featuredImage.url ||
                            `${process.env.NEXT_PUBLIC_SERVER_URL}/media/${category.featuredImage.filename}`
                          }
                          alt={category.title}
                          width={800}
                          height={600}
                          unoptimized
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        {/* Overlay tint for readability */}
                        <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent"></div>
                      </div>
                    ) : (
                      <div className="h-48 w-full flex items-center justify-center bg-linear-to-r from-indigo-100 to-purple-100">
                        <div className="text-indigo-400 text-5xl opacity-30">📚</div>
                      </div>
                    )}

                    {/* Content */}
                    <div className="p-6">
                      <h3
                        className="text-2xl font-bold mb-2"
                        style={{ color: category.color || '#4F46E5' }}
                      >
                        {category.title}
                      </h3>

                      {category.description && (
                        <p className="text-gray-600 mb-4 line-clamp-2">{category.description}</p>
                      )}

                      <div className="flex items-center text-sm font-medium group-hover:translate-x-1 transition-transform duration-300">
                        <span style={{ color: category.color || '#4F46E5' }}>Browse Category</span>
                        <svg
                          className="ml-2 h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </MotionDiv>
      </section>

      {/* Optional: Add keyframes if not already defined */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(20px, -20px);
          }
        }
      `}</style>
      {/* Feature Highlights */}
      <MotionDiv
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-24 max-w-5xl mb-20 mx-auto"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Getting started with our platform is easy. Follow these simple steps to begin your
            learning and earning journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              number: '1',
              title: 'Learn from Blog',
              desc: 'Browse our extensive collection of blogs to learn new concepts and topics.',
            },
            {
              number: '2',
              title: 'Earn Points & Rewards in Crypto',
              desc: 'Complete quizzes to earn points. Redeem them for cash or cryptocurrency rewards.',
            },
            {
              number: '3',
              title: 'Refer & Earn',
              desc: 'Share your unique referral link with friends. Get 100 bonus points for every successful signup.',
            },
            {
              number: '4',
              title: 'Take Quizzes',
              desc: 'Test your knowledge with fun and challenging quizzes across various categories.',
            },
          ].map((step, idx) => (
            <MotionDiv
              key={idx}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 + idx * 0.1 }}
              className="flex items-start space-x-4 p-6 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="shrink-0 w-6 h-6 bg-linear-to-r from-indigo-500 to-purple-500 text-white rounded-full flex items-center justify-center font-medium text-xl">
                {step.number}
              </div>
              <div className="text-left">
                <h4 className="text-xl font-semibold text-gray-800">{step.title}</h4>
                <p className="text-gray-600 mt-1">{step.desc}</p>
              </div>
            </MotionDiv>
          ))}
        </div>
      </MotionDiv>
      <Footer />
    </div>
  )
}
