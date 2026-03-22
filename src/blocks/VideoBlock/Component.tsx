import React from 'react'
import Image from 'next/image'
import { Play } from 'lucide-react'

import type { Media } from '@/payload-types'

interface VideoBlockComponentProps {
  heading?: string | null
  description?: string | null
  youtubeUrl: string
  thumbnail?: string | Media | null
}

function getYouTubeId(url: string): string | null {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
  )
  return match ? match[1] : null
}

export const VideoBlockComponent: React.FC<VideoBlockComponentProps> = ({
  heading,
  description,
  youtubeUrl,
  thumbnail,
}) => {
  const videoId = getYouTubeId(youtubeUrl)
  const thumbImg = typeof thumbnail === 'object' && thumbnail ? (thumbnail as Media) : null
  const thumbUrl = thumbImg?.url || (videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : '')

  return (
    <section className="py-24 bg-surface-container-low px-8">
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
        {videoId && (
          <a
            href={`https://www.youtube.com/watch?v=${videoId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block rounded-md overflow-hidden shadow-2xl aspect-video"
          >
            {thumbUrl && (
              <Image
                src={thumbUrl}
                alt={heading || 'Video'}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1280px) 100vw, 1280px"
              />
            )}
            <div className="absolute inset-0 bg-on-surface/40 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-primary-container flex items-center justify-center text-white shadow-xl shadow-cyan-900/40 group-hover:scale-110 transition-transform">
                <Play className="w-9 h-9 fill-white" />
              </div>
            </div>
          </a>
        )}
      </div>
    </section>
  )
}
