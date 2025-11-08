'use client'
import { cn } from '@/utilities/ui'
import Link from 'next/link'
import React from 'react'

import type { Blog } from '@/payload-types'
import { Media } from '@/components/Media'

export type CardPostData = Pick<Blog, 'slug' | 'category' | 'seo' | 'title'>

export const Card: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: CardPostData
  relationTo?: 'posts'
  showCategories?: boolean
  title?: string
}> = (props) => {
  const { className, doc, relationTo, showCategories, title: titleFromProps } = props

  const { slug, category, seo, title } = doc || {}
  const { description, image: metaImage } = seo || {}

  const hasCategory = category ? true : false
  const titleToUse = titleFromProps || title
  const sanitizedDescription = description?.replace(/\s/g, ' ')
  const href = `/${relationTo}/${slug}`

  return (
    <article
      className={cn(
        'group relative flex w-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-gray-200',
        className
      )}
    >
      {/* Image Section */}
      <div className="relative w-full h-56 overflow-hidden bg-gray-50">
        {!metaImage && (
          <div className="flex h-full items-center justify-center text-gray-400 text-sm">
            No Image
          </div>
        )}
        {metaImage && typeof metaImage !== 'string' && metaImage.url && (
          <Media
            resource={{ url: metaImage.url, alt: metaImage.alt || '' }}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
      </div>

      {/* Content Section */}
      <div className="p-5 flex flex-col gap-3">
        {showCategories && hasCategory && (
          <div className="flex flex-wrap gap-2">
            {typeof category === 'object' ? (
              <span className="bg-indigo-50 text-indigo-700 text-xs font-medium px-2.5 py-1 rounded-full border border-indigo-100">
                {category.title || 'Untitled Category'}
              </span>
            ) : (
              <span className="bg-indigo-50 text-indigo-700 text-xs font-medium px-2.5 py-1 rounded-full border border-indigo-100">
                {category}
              </span>
            )}
          </div>
        )}

        {/* Title */}
        {titleToUse && (
          <h3 className="text-xl font-bold text-gray-800 leading-snug hover:text-indigo-600 transition-colors">
            <Link href={href}>{titleToUse}</Link>
          </h3>
        )}

        {/* Description */}
        {description && (
          <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
            {sanitizedDescription}
          </p>
        )}
      </div>
    </article>
  )
}
