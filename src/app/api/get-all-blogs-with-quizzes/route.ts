// src/app/api/get-all-blogs-with-quizzes/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import payloadConfig from '../../../payload.config'

export async function POST(req: NextRequest) {
  try {
    const {
      searchTerm = '',
      categorySlug = null,
      page = 1,
      limit = 25,
      memberId = null,
    } = await req.json()

    if (!memberId) {
      return NextResponse.json({ error: 'Member ID is required' }, { status: 400 })
    }

    const payload = await getPayload({ config: payloadConfig })

    // Get member and their completed quiz IDs
    const memberResult = await payload.find({
      collection: 'members',
      where: { id: { equals: memberId } },
      depth: 2, // Increased depth to get completedQuizIds
      limit: 1,
    })

    if (!memberResult.docs[0]) {
      return NextResponse.json({ error: 'Member not found' }, { status: 404 })
    }

    const member = memberResult.docs[0]
    console.log('Fetching blogs for member:', memberId)

    // Get set of completed quiz IDs for faster lookup
    const completedQuizIds = new Set(
      (member.completedQuizIds || []).map((item: any) => item.quizId)
    )

    // Build base query for published blogs with quizzes
    const where: any = {
      and: [{ status: { equals: 'published' } }, { quizzes: { exists: true } }],
    }

    // Add category filter if specified
    if (categorySlug) {
      const cat = await payload.find({
        collection: 'categories',
        where: { slug: { equals: categorySlug } },
        limit: 1,
        overrideAccess: true,
      })
      if (cat.docs[0]) {
        where.and.push({ category: { equals: cat.docs[0].id } })
      }
    }

    // Add search filter if specified
    if (searchTerm) {
      where.and.push({
        or: [{ title: { contains: searchTerm } }, { excerpt: { contains: searchTerm } }],
      })
    }

    // Fetch blogs with quizzes
    const blogsResult = await payload.find({
      collection: 'blogs',
      where,
      depth: 2,
      limit: 1000, // Get all to filter client-side
      overrideAccess: true,
      sort: '-createdAt',
    })

    // Filter blogs to only include those with incomplete quizzes
    const availableBlogs = blogsResult.docs.filter((blog) => {
      if (!blog.quizzes || !Array.isArray(blog.quizzes) || blog.quizzes.length === 0) {
        return false
      }

      // Check if blog has any quiz that hasn't been completed
      return blog.quizzes.some((quiz: any) => {
        if (!quiz || !quiz.id) return false
        return !completedQuizIds.has(quiz.id)
      })
    })

    // Apply pagination
    const total = availableBlogs.length
    const totalPages = Math.ceil(total / limit)
    const startIndex = (page - 1) * limit
    const paginatedBlogs = availableBlogs.slice(startIndex, startIndex + limit)

    // Format response
    const articles = paginatedBlogs.map((blog: any) => ({
      id: blog.id,
      title: blog.title,
      slug: blog.slug,
      excerpt: blog.excerpt || '',
      readTime: blog.readTime || 5,
      totalQuizzes: blog.quizzes?.length || 0,
      remainingQuizzes: blog.quizzes?.filter((q: any) => !completedQuizIds.has(q.id)).length || 0,
      category: blog.category
        ? {
            id: blog.category.id,
            title: blog.category.title,
            slug: blog.category.slug,
          }
        : null,
    }))

    return NextResponse.json({
      articles,
      total,
      totalPages,
      currentPage: page,
    })
  } catch (error: any) {
    console.error('❌ API Error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to fetch blogs with quizzes' },
      { status: 500 }
    )
  }
}
