import React from 'react'
import Image from 'next/image'

import type { Media } from '@/payload-types'

interface MediaGridBlockComponentProps {
  heading?: string | null
  description?: string | null
  columns?: '2' | '3' | '4' | null
  items: {
    image: string | Media
    caption?: string | null
    id?: string | null
  }[]
}

export const MediaGridBlockComponent: React.FC<MediaGridBlockComponentProps> = ({
  heading,
  description,
  columns = '3',
  items,
}) => {
  const colsClass =
    columns === '2'
      ? 'grid-cols-1 md:grid-cols-2'
      : columns === '4'
        ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
        : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'

  return (
    <section className="py-24 px-8 bg-surface-container-low">
      <div className="max-w-7xl mx-auto">
        {(heading || description) && (
          <div className="mb-12">
            {heading && (
              <>
                <h2 className="text-3xl font-black font-headline text-on-surface">{heading}</h2>
                <div className="h-[2px] w-[60px] bg-primary-container mt-4" aria-hidden="true" />
              </>
            )}
            {description && (
              <p className="text-on-surface-variant mt-4 max-w-2xl">{description}</p>
            )}
          </div>
        )}
        <div className={`grid ${colsClass} gap-6`}>
          {items?.map((item, i) => {
            const img = typeof item.image === 'object' ? (item.image as Media) : null
            if (!img?.url) return null

            return (
              <div key={item.id || i} className="group overflow-hidden rounded-md shadow-sm">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={img.url}
                    alt={img.alt || ''}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                {item.caption && (
                  <div className="p-4 bg-surface-container-lowest">
                    <p className="text-sm text-on-surface-variant">{item.caption}</p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
