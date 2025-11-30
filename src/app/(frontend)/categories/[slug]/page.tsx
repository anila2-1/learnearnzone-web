// src/app/categories/[slug]/page.tsx
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Footer from './../../components/Footer'

import AnimatedCategoryBlogCard from '../AnimatedCategoryBlogCard' // 👈 Import new client component
import CategoryHeroSection from './CategoryHeroSection'

interface PageProps {
  params: Promise<{ slug: string }>
}

async function getCategory(slug: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/categories?where[slug][equals]=${slug}&depth=1`,
      {
        next: { revalidate: 60 },
      }
    )
    if (!res.ok) throw new Error('Failed to fetch category')
    const data = await res.json()
    return data.docs[0]
  } catch (error) {
    console.error('Error fetching category:', error)
    return null
  }
}

async function getCategoryBlogs(categoryId: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/blogs?where[category][equals][id]=${categoryId}&depth=2`,
      {
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    if (!res.ok) throw new Error('Failed to fetch blogs')
    const data = await res.json()
    return data.docs
  } catch (error) {
    console.error('Error fetching blogs:', error)
    return []
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const category = await getCategory(slug)

  if (!category) {
    return {
      title: 'Category Not Found',
    }
  }

  return {
    title: `${category.title}`,
    description: category.description || `Browse all ${category.title} content`,
  }
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params
  const category = await getCategory(slug)

  if (!category) {
    return notFound()
  }

  const blogs = await getCategoryBlogs(category.id)

  return (
    <>
      <CategoryHeroSection category={category} />

      {/* Blogs Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog: any) => (
            <AnimatedCategoryBlogCard key={blog.id} post={blog} />
          ))}
        </div>

        {/* Empty State */}
        {blogs.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl text-gray-600">No blogs found in this category yet.</h3>
          </div>
        )}
      </div>

      {/* ✅ Footer — Outside container, full width */}
      <div className="mt-12 sm:mt-16 md:mt-20">
        <Footer />
      </div>
    </>
  )
}
