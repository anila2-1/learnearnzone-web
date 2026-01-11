'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Footer from '../components/Footer'
import Image from 'next/image'
import CategoriesHeroSection from './CategoriesHeroSection'

export default function CategoriesPage() {
  const [categories, setCategories] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/categories?depth=1`)
        if (!res.ok) throw new Error('Failed to fetch categories')
        const data = await res.json()
        console.log('Fetched categories:', data.docs)
        setCategories(data.docs || [])
      } catch (error) {
        console.error('Error fetching categories:', error)
        setCategories([])
      } finally {
        setLoading(false)
      }
    }
    fetchCategories()
  }, [])

  if (loading) {
    return (
      <div className="px-4 sm:px-6 lg:px-8 pb-12">
        {/* Blog Grid Skeleton - EXACTLY like CategoryLoading */}
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="overflow-hidden rounded-xl border border-gray-200 bg-white">
                <div className="h-48 bg-gray-200 animate-pulse"></div>
                <div className="p-6">
                  <div className="h-6 bg-gray-200 rounded animate-pulse mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3 mb-4"></div>
                  <div className="h-8 w-32 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (!categories?.length) {
    return (
      <>
        <CategoriesHeroSection />

        <div className="container mx-auto px-6 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="col-span-full text-center py-16">
              <div className="text-6xl mb-4">📂</div>
              <h3 className="text-2xl font-semibold text-gray-700">No categories available</h3>
              <p className="text-gray-500 mt-2">Categories will appear here once they are added.</p>
            </div>
          </div>
        </div>

        <Footer />
      </>
    )
  }

  return (
    <>
      <CategoriesHeroSection />

      {/* ✅ Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category: any) => (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md transition-all hover:shadow-lg"
            >
              {/* Featured Image */}
              {category.featuredImage && (
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={
                      category.featuredImage.url ||
                      `${process.env.NEXT_PUBLIC_SERVER_URL}/media/${category.featuredImage.filename}`
                    }
                    alt={category.title}
                    width={800} // Example: 800px wide
                    height={600} // Example: 600px tall
                    unoptimized
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              )}

              {/* Content */}
              <div className="p-6">
                <h2
                  className="text-2xl font-semibold mb-2"
                  style={{ color: category.color || '#4F46E5' }}
                >
                  {category.title}
                </h2>

                {category.description && (
                  <p className="text-gray-600 mb-4 line-clamp-2">{category.description}</p>
                )}

                <span
                  className="inline-flex items-center text-sm font-medium transition-colors"
                  style={{ color: category.color || '#4F46E5' }}
                >
                  Browse Category
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
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ✅ Footer — Outside container, full width */}
      <div className="mt-12 sm:mt-16 md:mt-20">
        <Footer />
      </div>
    </>
  )
}
