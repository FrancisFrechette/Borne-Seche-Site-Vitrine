import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import type { HeroBlock as HeroBlockProps, Media } from '@/payload-types'
import { cn } from '@/utilities/ui'

export const HeroBlockComponent: React.FC<HeroBlockProps> = ({
  heading,
  subheading,
  cta,
  backgroundImage,
}) => {
  const bgImage = typeof backgroundImage === 'object' ? backgroundImage as Media : null
  const bgUrl = bgImage?.url || ''

  const ctaLabel = cta?.label || ''
  const ctaUrl = cta?.type === 'custom' ? (cta?.url || '#') : '#'

  return (
    <section className="hero-gradient relative overflow-hidden min-h-[870px] flex items-center py-24">
      {bgUrl && (
        <Image
          src={bgUrl}
          alt={heading || ''}
          fill
          className="object-cover opacity-20"
          priority
        />
      )}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
        <svg
          className="w-full h-full scale-150 translate-x-1/4"
          viewBox="0 0 400 400"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className="text-primary-container"
            d="M45.7,-77.2C58.1,-69.1,66.3,-54.6,73.1,-40.4C79.9,-26.2,85.2,-12.3,84.1,1.1C83,14.5,75.4,27.3,66.8,38.9C58.3,50.4,48.7,60.6,37.3,68.4C25.9,76.2,12.9,81.6,-0.7,82.8C-14.3,84,-28.7,81.1,-41.2,74C-53.7,66.9,-64.4,55.6,-72.1,42.7C-79.9,29.9,-84.6,15.5,-84.4,1.1C-84.1,-13.3,-78.9,-27.6,-70.7,-40C-62.5,-52.4,-51.3,-62.8,-38.7,-70.8C-26.1,-78.8,-12.1,-84.4,2.3,-88.4C16.8,-92.4,33.3,-85.3,45.7,-77.2Z"
            fill="currentColor"
            transform="translate(200 200)"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div className="max-w-3xl">
          <h1 className="font-headline font-black text-5xl md:text-7xl text-white leading-[1.1] tracking-tight mb-6">
            {heading}
          </h1>
          <div className="h-1 w-20 bg-primary-container mb-8" aria-hidden="true" />
          {subheading && (
            <p className="text-xl md:text-2xl text-blue-100/80 mb-12 font-body font-light leading-relaxed">
              {subheading}
            </p>
          )}
          {ctaLabel && (
            <Link
              href={ctaUrl}
              className={cn(
                'inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-sm uppercase tracking-wide transition-all duration-150 ease-in-out active:scale-95',
                cta?.appearance === 'outline'
                  ? 'border border-white/30 backdrop-blur-sm text-white hover:bg-white/10'
                  : 'bg-gradient-to-br from-primary to-primary-container text-on-primary shadow-lg shadow-primary/20 hover:shadow-glow-primary',
              )}
            >
              {ctaLabel}
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}
