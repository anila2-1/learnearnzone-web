'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Sidebar from '@/components/Sidebar'
import { useSidebar } from '../../SidebarContext'
import { useAuth } from './../../../../_providers/Auth'
import { useRouter } from 'next/navigation'

export default function TakeQuizListClient() {
  const { user } = useAuth()
  const router = useRouter()
  const [articles, setArticles] = useState<any[]>([])
  const [categories, setCategories] = useState<{ id: string; name: string; slug: string }[]>([])
  const [isCategoryOpen, setIsCategoryOpen] = useState(false)
  const { sidebarOpen, setSidebarOpen } = useSidebar()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 25
  const [isManualSearch, setIsManualSearch] = useState(false)
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm)

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      setIsManualSearch(true)
      setDebouncedSearchTerm(searchTerm)
    }
  }

  const handleSearchClick = () => {
    setIsManualSearch(true)
    setDebouncedSearchTerm(searchTerm)
  }

  useEffect(() => {
    if (isManualSearch) return
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm)
    }, 6000)
    return () => clearTimeout(handler)
  }, [searchTerm, isManualSearch])

  useEffect(() => {
    if (isManualSearch) {
      setIsManualSearch(false)
    }
  }, [debouncedSearchTerm])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/categories?depth=0`)
        const data = await res.json()
        setCategories(
          (data.docs || []).map((cat: any) => ({
            id: cat.id,
            name: cat.title || cat.name,
            slug: cat.slug,
          }))
        )
      } catch (error) {
        console.error('Failed to fetch categories:', error)
      }
    }
    fetchCategories()
  }, [])

  useEffect(() => {
    setCurrentPage(1)
  }, [debouncedSearchTerm, selectedCategorySlug])

  useEffect(() => {
    const fetchAllBlogsWithQuizzes = async () => {
      setLoading(true)
      setError(null)

      try {
        if (!user?.id) {
          setError('Please log in to view available quizzes')
          setArticles([])
          setLoading(false)
          return
        }

        const response = await fetch('/api/get-all-blogs-with-quizzes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            searchTerm: debouncedSearchTerm,
            categorySlug: selectedCategorySlug,
            page: currentPage,
            limit: itemsPerPage,
            memberId: user.id,
          }),
        })

        const data = await response.json()
        if (response.ok) {
          setArticles(data.articles || [])
        } else {
          console.error('API Error:', data.error)
          setArticles([])
        }
      } catch (error) {
        console.error('Failed to fetch blogs with quizzes:', error)
        setArticles([])
      } finally {
        setLoading(false)
      }
    }

    fetchAllBlogsWithQuizzes()
  }, [debouncedSearchTerm, selectedCategorySlug, currentPage, itemsPerPage, user?.id])

  useEffect(() => {
    const handleClickOutside = () => {
      if (isCategoryOpen) {
        setIsCategoryOpen(false)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [isCategoryOpen])

  if (!user) {
    return (
      <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex-col md:flex-row">
        <Sidebar />
        <div className="flex-1 p-6 mt-10 md:ml-64 flex items-center justify-center text-center">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Please Log In</h2>
            <p className="text-gray-600 mb-6">
              You need to be logged in to view available quizzes.
            </p>
            <Link
              href="/auth/login"
              className="inline-flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition"
            >
              Go to Login
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex-col md:flex-row">
        <Sidebar />
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/10 z-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        <div className="flex-1 flex items-center justify-center p-6 mt-10 md:ml-64">
          <div className="text-center">
            <div className="w-14 h-14 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-lg font-semibold text-gray-700 animate-pulse">Loading...</p>
            <p className="text-sm text-gray-500 mt-2">Almost there — just a moment 😊</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex-col md:flex-row">
      <Sidebar />

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/10 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex-1 p-4 sm:p-6 mt-12 md:mt-10 md:ml-64">
        <div className="max-w-6xl mx-auto">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            {/* Search */}
            <div className="flex flex-col w-full sm:flex-1">
              <div className="flex">
                <input
                  type="text"
                  placeholder="Search quizzes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-indigo-500 shadow-sm"
                />
                <button
                  onClick={handleSearchClick}
                  className="px-4 py-2 text-sm sm:text-base bg-indigo-600 hover:bg-indigo-700 text-white rounded-r-lg shadow-sm"
                >
                  Search
                </button>
              </div>
            </div>

            {/* Category Dropdown */}
            <div className="relative w-full sm:flex-1">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setIsCategoryOpen(!isCategoryOpen)
                }}
                className="w-full px-4 py-2 text-left border border-gray-300 rounded-lg bg-white flex justify-between items-center focus:ring-2 focus:ring-indigo-500 shadow-sm"
              >
                <span className="truncate text-sm sm:text-base">
                  {selectedCategorySlug
                    ? categories.find((c) => c.slug === selectedCategorySlug)?.name ||
                      'Select Category'
                    : 'All Categories'}
                </span>
                <svg
                  className={`w-4 h-4 sm:w-5 sm:h-5 text-gray-400 transition-transform ${
                    isCategoryOpen ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {isCategoryOpen && (
                <div
                  className="absolute z-20 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div
                    className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setSelectedCategorySlug(null)
                      setIsCategoryOpen(false)
                    }}
                  >
                    All Categories
                  </div>
                  {categories.map((cat) => (
                    <div
                      key={cat.id}
                      className="px-4 py-2 text-sm hover:bg-indigo-50 hover:text-indigo-700 cursor-pointer"
                      onClick={() => {
                        setSelectedCategorySlug(cat.slug)
                        setIsCategoryOpen(false)
                      }}
                    >
                      {cat.name}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {(searchTerm || selectedCategorySlug) && (
              <button
                onClick={() => {
                  setSearchTerm('')
                  setSelectedCategorySlug(null)
                  setCurrentPage(1)
                  setDebouncedSearchTerm('')
                }}
                className="px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg shadow-sm whitespace-nowrap"
              >
                Reset
              </button>
            )}
          </div>

          {/* Results */}
          {articles.length > 0 ? (
            <ul className="space-y-3">
              {articles.map((article) => (
                <li
                  key={article.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition"
                >
                  <Link
                    href={`/${article.slug}`}
                    className="flex-1 mb-2 sm:mb-0 text-sm sm:text-base font-medium text-gray-900 hover:text-indigo-700 truncate"
                  >
                    {article.title}
                  </Link>
                  <Link
                    href={`/${article.slug}`}
                    className="w-full sm:w-auto px-4 py-2 text-sm sm:text-base bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg hover:from-indigo-700 hover:to-purple-700 transition text-center"
                  >
                    🚀 Take Quiz
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="bg-white rounded-xl shadow-lg p-6 text-center border border-gray-200">
              <svg
                className="mx-auto h-12 w-12 text-gray-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-gray-900">No quizzes found</h3>
              <p className="mt-2 text-gray-500 text-sm">Try changing your search or filters.</p>
            </div>
          )}

          {/* Pagination */}
          {articles.length > 0 && articles.length === itemsPerPage && (
            <div className="flex flex-wrap justify-center gap-2 mt-8">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 text-sm bg-white text-gray-700 rounded-lg border border-gray-300 disabled:opacity-50 hover:bg-gray-50 transition shadow-sm"
              >
                Previous
              </button>
              <span className="px-4 py-2 text-sm bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg shadow-sm">
                Page {currentPage}
              </span>
              <button
                onClick={() => setCurrentPage((p) => p + 1)}
                className="px-4 py-2 text-sm bg-white text-gray-700 rounded-lg border border-gray-300 hover:bg-gray-50 transition shadow-sm"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
