export const dynamic = 'force-dynamic'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { isValidLocale } from '@/i18n/locales'
import type { Locale } from '@/i18n/locales'
import { getDictionary } from '@/i18n/getDictionary'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { MapPin, MoveRight } from 'lucide-react'
import type { Realisation, Media as MediaType } from '@/payload-types'

interface RealisationsPageProps {
  params: Promise<{ locale: string }>
}

export default async function RealisationsPage({ params }: RealisationsPageProps) {
  const { locale } = await params

  if (!isValidLocale(locale)) {
    notFound()
  }

  const [dict, payload] = await Promise.all([
    getDictionary(locale as Locale),
    getPayload({ config: configPromise }),
  ])

  const realisationsResult = await payload.find({
    collection: 'realisations',
    locale: locale as Locale,
    limit: 50,
    sort: '-createdAt',
    depth: 1,
  })

  const realisations = realisationsResult.docs as Realisation[]

  return (
    <>
      <section className="hero-gradient relative overflow-hidden py-32 px-8">
        <div className="max-w-7xl mx-auto relative z-10">
          <h1 className="font-headline font-black text-5xl md:text-7xl text-white leading-[1.1] tracking-tight mb-6">
            {dict.nav.realisations}
          </h1>
          <div className="h-1 w-20 bg-primary-container mb-8" aria-hidden="true" />
          <p className="text-xl text-blue-100/80 font-body font-light leading-relaxed max-w-2xl">
            {dict.realisation.ctaDescription}
          </p>
        </div>
      </section>

      <section className="py-24 px-8 bg-surface">
        <div className="max-w-7xl mx-auto">
          {realisations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {realisations.map((project) => {
                const featuredImg = project.featuredImage as MediaType | undefined
                const imgUrl = featuredImg?.sizes?.medium?.url || featuredImg?.url || null

                return (
                  <Link
                    key={project.id}
                    href={`/${locale}/realisations/${project.slug}`}
                    className="group bg-surface-container-lowest rounded-md shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
                  >
                    {imgUrl ? (
                      <div className="relative h-56 overflow-hidden">
                        <Image
                          src={imgUrl}
                          alt={featuredImg?.alt || project.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </div>
                    ) : (
                      <div className="h-56 bg-surface-container-low flex items-center justify-center">
                        <span className="text-on-surface-variant/40 text-6xl font-headline font-black">
                          B
                        </span>
                      </div>
                    )}
                    <div className="p-8">
                      <h2 className="text-xl font-black text-on-surface mb-2 font-headline group-hover:text-primary transition-colors">
                        {project.title}
                      </h2>
                      {project.location && (
                        <p className="text-on-surface-variant text-sm flex items-center gap-1 mb-3">
                          <MapPin className="w-3.5 h-3.5" />
                          {project.location}
                        </p>
                      )}
                      {project.excerpt && (
                        <p className="text-on-surface-variant font-body text-sm leading-relaxed mb-6">
                          {project.excerpt}
                        </p>
                      )}
                      <span className="inline-flex items-center gap-2 font-label font-bold text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                        {dict.service.learnMore}
                        <MoveRight className="w-4 h-4" />
                      </span>
                    </div>
                  </Link>
                )
              })}
            </div>
          ) : (
            <p className="text-center text-on-surface-variant py-16">
              {dict.realisation.emptyState}
            </p>
          )}
        </div>
      </section>
    </>
  )
}
