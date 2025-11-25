import React from 'react'
import Image from 'next/image'

export interface MediaProps {
  resource: {
    url: string
    alt: string
  }
  className?: string
  imgClassName?: string
}

export const Media: React.FC<MediaProps> = ({ resource, className = '', imgClassName = '' }) => {
  // Check if URL is relative (from Payload) or absolute
  const isRelative = resource.url && !resource.url.startsWith('http')
  const imageUrl = isRelative
    ? `${process.env.NEXT_PUBLIC_SERVER_URL}${resource.url}`
    : resource.url

  return (
    <div className={`relative w-full ${className}`}>
      <Image
        src={imageUrl}
        alt={resource.alt || 'Media'}
        width={800}
        height={600}
        unoptimized
        className={`w-full h-auto object-cover ${imgClassName}`}
        loading="lazy"
      />
    </div>
  )
}

export default Media
