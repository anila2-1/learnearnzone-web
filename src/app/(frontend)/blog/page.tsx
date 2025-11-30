// src/app/(frontend)/blog/page.tsx
import BlogListClient from './BlogListClient'
import HeroSection from './HeroSection'
import { generateStaticMetadata } from '@/utilities/generateStaticMetadata'

export const metadata = generateStaticMetadata({
  title: 'Learn Earn Blog',
  description:
    'Explore insightful articles, tips, and guides to boost your knowledge and earn rewards through quizzes.',
  url: '/blog',
})

export default async function BlogList({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>
}) {
  const params = await searchParams

  const currentPage = parseInt(params?.page || '1', 10)

  return (
    <>
      <HeroSection />

      {/* BLOG LIST SECTION */}
      <div className="relative z-10 mt-10">
        <BlogListClient initialPage={currentPage} />
      </div>
    </>
  )
}
