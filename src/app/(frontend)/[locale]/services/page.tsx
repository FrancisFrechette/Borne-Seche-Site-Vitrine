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
import { MoveRight } from 'lucide-react'
import type { Service, Media as MediaType } from '@/payload-types'

interface ServicesPageProps {
  params: Promise<{ locale: string }>
}

export default async function ServicesPage({ params }: ServicesPageProps) {
  const { locale } = await params

  if (!isValidLocale(locale)) {
    notFound()
  }

  const [dict, payload] = await Promise.all([
    getDictionary(locale as Locale),
    getPayload({ config: configPromise }),
  ])

  const servicesResult = await payload.find({
    collection: 'services',
    locale: locale as Locale,
    limit: 50,
    sort: 'order',
    depth: 1,
  })

  const services = servicesResult.docs as Service[]

  return (
    <>
      <section className="hero-gradient relative overflow-hidden py-32 px-8">
        <div className="max-w-7xl mx-auto relative z-10">
          <h1 className="font-headline font-black text-5xl md:text-7xl text-white leading-[1.1] tracking-tight mb-6">
            {dict.nav.services}
          </h1>
          <div className="h-1 w-20 bg-primary-container mb-8" aria-hidden="true" />
          <p className="text-xl text-blue-100/80 font-body font-light leading-relaxed max-w-2xl">
            {dict.service.ctaDescription}
          </p>
        </div>
      </section>

      <section className="py-24 px-8 bg-surface">
        <div className="max-w-7xl mx-auto">
          {services.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => {
                const img = service.image as MediaType | undefined
                const imgUrl = img?.sizes?.medium?.url || img?.url || null

                return (
                  <Link
                    key={service.id}
                    href={`/${locale}/services/${service.slug}`}
                    className="group bg-surface-container-lowest rounded-md shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
                  >
                    {imgUrl && (
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={imgUrl}
                          alt={img?.alt || service.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </div>
                    )}
                    <div className="p-8">
                      <h2 className="text-xl font-black text-on-surface mb-3 font-headline group-hover:text-primary transition-colors">
                        {service.title}
                      </h2>
                      {service.excerpt && (
                        <p className="text-on-surface-variant font-body text-sm leading-relaxed mb-6">
                          {service.excerpt}
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
            <p className="text-center text-on-surface-variant py-16">{dict.service.emptyState}</p>
          )}
        </div>
      </section>
    </>
  )
}
