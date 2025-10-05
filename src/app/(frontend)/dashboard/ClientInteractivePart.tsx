'use client'

import React, { useState, useEffect } from 'react'
import Sidebar from '@/components/Sidebar'
import WalletCard from '@/components/WalletCard'
import ReferralStats from '@/components/ReferralStats'
import QuizStats from '@/components/QuizStats'
import Link from 'next/link'
import { useSidebar } from '../SidebarContext'

interface User {
  id: string
  name?: string | null
  email: string
  wallet?: number | null
  usdtBalance?: number | null
  referralCode?: string | null
  referralsCount?: number | null
}

interface ClientInteractivePartProps {
  user: User | null
}

export default function ClientInteractivePart({ user: serverUser }: ClientInteractivePartProps) {
  const { sidebarOpen, setSidebarOpen } = useSidebar()
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setUser(serverUser)
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [serverUser])

  // ✅ Wrapper for consistent sidebar layout
  const renderContent = (children: React.ReactNode) => (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Sidebar />

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex-1 p-4 sm:p-6 md:ml-64">{children}</div>
    </div>
  )

  if (isLoading) {
    return renderContent(
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-6 mx-auto"></div>
          <p className="text-xl font-semibold text-gray-700 animate-pulse">Loading...</p>
          <p className="text-sm text-gray-500 mt-2 animate-fade-in">
            Almost there — just a moment please 😊
          </p>
        </div>
      </div>
    )
  }

  if (!user) {
    return renderContent(
      <div className="flex justify-center items-center h-screen">
        <div className="max-w-md text-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            Please sign in to view your dashboard.
          </div>
          <Link
            href="/auth/login"
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
          >
            Sign In
          </Link>
        </div>
      </div>
    )
  }

  return renderContent(
    <div className="max-w-4xl mx-auto">
      {/* ✨ Welcome Back Section */}
      <div className="relative mb-10">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-50/60 to-teal-50/60 backdrop-blur-sm rounded-3xl border border-emerald-100 shadow-sm"></div>
        <div className="relative z-10 text-center p-6 sm:p-8 rounded-3xl">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Welcome back,{' '}
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              {user.name || user.email.split('@')[0]}
            </span>
            !
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-base sm:text-lg">
            Here’s your account overview and earnings summary.
          </p>
        </div>
      </div>

      {/* ✅ Wallet + USDT */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-white shadow-lg rounded-2xl p-6 border border-gray-200 hover:shadow-2xl transition-all duration-300 group">
          <div className="text-center">
            <div className="text-3xl font-extrabold text-indigo-600 mb-2 group-hover:scale-110 transition-transform duration-300">
              ₹{(user.wallet || 0).toFixed(2)}
            </div>
            <div className="text-sm font-medium text-gray-600">Wallet Balance (Points)</div>
          </div>
        </div>
        <div className="bg-white shadow-lg rounded-2xl p-6 border border-gray-200 hover:shadow-2xl transition-all duration-300 group">
          <div className="text-center">
            <div className="text-3xl font-extrabold text-green-600 mb-2 group-hover:scale-110 transition-transform duration-300">
              ${(user.usdtBalance || 0).toFixed(4)}
            </div>
            <div className="text-sm font-medium text-gray-600">USDT Balance</div>
          </div>
        </div>
      </div>

      {/* ✨ Other Sections */}
      <div className="space-y-8">
        <div className="bg-white shadow-lg rounded-2xl p-8 border border-gray-200 hover:shadow-2xl transition-all duration-500 group">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">💰 Referral Earnings</h2>
          </div>
          <ReferralStats count={user.referralsCount || 0} code={user.referralCode || ''} />
        </div>

        <div className="bg-white shadow-lg rounded-2xl p-8 border border-gray-200 hover:shadow-2xl transition-all duration-500 group">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">💰 Your Wallet</h2>
          </div>
          <WalletCard />
        </div>

        <div className="bg-white shadow-lg rounded-2xl p-8 border border-gray-200 hover:shadow-2xl transition-all duration-500 group">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">📝 Quiz Earnings</h2>
          </div>
          <QuizStats />
        </div>
      </div>
    </div>
  )
}
