export const dynamic = 'force-dynamic'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getDictionary } from '@/i18n/getDictionary'
import { type Locale, isValidLocale } from '@/i18n/locales'
import { notFound } from 'next/navigation'
import { GradientButton } from '@/components/ui/GradientButton'
import { Play, MapPin, MoveRight } from 'lucide-react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { Service, Realisation, Media as MediaType } from '@/payload-types'

interface HomePageProps {
  params: Promise<{ locale: string }>
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params

  if (!isValidLocale(locale)) {
    notFound()
  }

  const [dict, payload] = await Promise.all([
    getDictionary(locale as Locale),
    getPayload({ config: configPromise }),
  ])

  const [servicesResult, realisationsResult] = await Promise.all([
    payload.find({
      collection: 'services',
      locale: locale as Locale,
      limit: 6,
      sort: 'order',
    }),
    payload.find({
      collection: 'realisations',
      locale: locale as Locale,
      limit: 4,
      sort: '-createdAt',
      depth: 1,
    }),
  ])

  const services = servicesResult.docs as Service[]
  const realisations = realisationsResult.docs as Realisation[]

  return (
    <>
      {/* ========== HERO SECTION (Dark Gradient + SVG Blob) ========== */}
      <section className="hero-gradient relative overflow-hidden min-h-[870px] flex items-center py-24">
        {/* Decorative SVG Blob */}
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
              {dict.hero.title}
            </h1>
            <div className="h-1 w-20 bg-primary-container mb-8" aria-hidden="true" />
            <p className="text-xl md:text-2xl text-blue-100/80 mb-12 font-body font-light leading-relaxed">
              {dict.hero.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <GradientButton
                href={`/${locale}/contact`}
                variant="primary"
                className="text-lg px-8 py-4 shadow-xl shadow-cyan-900/40"
              >
                {dict.hero.ctaPrimary}
              </GradientButton>
              <Link
                href={`/${locale}/realisations`}
                className="border border-white/30 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-all active:scale-95 text-center"
              >
                {dict.hero.ctaSecondary}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========== STATS SECTION (Trust-Builder) ========== */}
      <section className="py-24 bg-surface relative -mt-16 z-20 px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {dict.stats.items.map((stat, i) => (
            <div
              key={i}
              className="bg-surface-container-lowest p-8 rounded-md shadow-sm border-b-4 border-primary-container flex flex-col items-center text-center"
            >
              <span className="font-headline font-black text-5xl text-primary-container mb-2 tracking-tighter">
                {stat.value}
              </span>
              <span className="font-label font-bold text-xs uppercase tracking-widest text-on-surface/60">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ========== EXPERT VIDEO SECTION ========== */}
      <section className="py-24 bg-surface-container-low px-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
          {/* Video/Image Placeholder */}
          <div className="w-full lg:w-3/5 group cursor-pointer relative rounded-md overflow-hidden shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80"
              alt={dict.expert.imageAlt}
              width={1200}
              height={400}
              className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-on-surface/40 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-primary-container flex items-center justify-center text-white shadow-xl shadow-cyan-900/40 group-hover:scale-110 transition-transform">
                <Play className="w-9 h-9 fill-white" />
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="w-full lg:w-2/5">
            <h2 className="font-headline font-black text-4xl text-on-surface mb-4 tracking-tight">
              {dict.expert.title}
            </h2>
            <div className="h-1 w-12 bg-primary-container mb-6" aria-hidden="true" />
            <div className="space-y-6">
              <p className="text-on-surface-variant leading-relaxed italic">{dict.expert.quote}</p>
              <div className="grid grid-cols-2 gap-6 pt-4 bg-surface-container-low">
                {dict.expert.pillars.map((pillar, i) => (
                  <div key={i}>
                    <h4 className="font-label font-bold text-xs uppercase tracking-widest text-primary mb-2">
                      {pillar.title}
                    </h4>
                    <p className="text-sm text-on-surface-variant">{pillar.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== SERVICES SECTION (Dynamic from Payload) ========== */}
      {services.length > 0 && (
        <section className="py-24 px-8 bg-surface">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16">
              <h2 className="text-3xl font-black font-headline text-on-surface">
                {dict.nav.services}
              </h2>
              <div className="h-[2px] w-[60px] bg-primary-container mt-4" aria-hidden="true" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => (
                <Link
                  key={service.id}
                  href={`/${locale}/services/${service.slug}`}
                  className="group bg-surface-container-lowest p-8 rounded-md shadow-sm hover:shadow-lg transition-all duration-300"
                >
                  <h3 className="text-xl font-black text-on-surface mb-3 font-headline group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-on-surface-variant font-body text-sm leading-relaxed mb-6">
                    {service.excerpt}
                  </p>
                  <span className="inline-flex items-center gap-2 font-label font-bold text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    {dict.service.learnMore}
                    <MoveRight className="w-4 h-4" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ========== REALISATIONS SECTION (Dynamic from Payload) ========== */}
      {realisations.length > 0 && (
        <section className="py-24 px-8 bg-surface-container-low">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16">
              <h2 className="text-3xl font-black font-headline text-on-surface">
                {dict.nav.realisations}
              </h2>
              <div className="h-[2px] w-[60px] bg-primary-container mt-4" aria-hidden="true" />
            </div>
            <div className="grid grid-cols-12 gap-6">
              {realisations.map((project, i) => {
                const featuredImg = project.featuredImage as MediaType | undefined
                const imgUrl =
                  featuredImg?.url ||
                  'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80'
                const imgAlt = featuredImg?.alt || project.title
                const isLarge = i === 0 || i === 3

                return (
                  <Link
                    key={project.id}
                    href={`/${locale}/realisations/${project.slug}`}
                    className={`group relative rounded-xl overflow-hidden min-h-[360px] ${
                      isLarge ? 'col-span-12 md:col-span-8' : 'col-span-12 md:col-span-4'
                    }`}
                  >
                    <Image
                      src={imgUrl}
                      alt={imgAlt || ''}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute bottom-0 left-0 p-8 bg-gradient-to-t from-black/80 to-transparent w-full">
                      <p className="text-white font-bold text-xl">{project.title}</p>
                      {project.location && (
                        <p className="text-white/70 text-sm font-label uppercase flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {project.location}
                        </p>
                      )}
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* ========== SECONDARY CTA SECTION ========== */}
      <section className="py-20 px-8">
        <div className="max-w-7xl mx-auto bg-surface-container-highest rounded-md p-12 flex flex-col md:flex-row justify-between items-center gap-8 border-l-8 border-primary">
          <div>
            <h3 className="font-headline font-extrabold text-2xl text-on-surface tracking-tight">
              {dict.cta.title}
            </h3>
            <p className="text-on-surface-variant">{dict.cta.description}</p>
          </div>
          <GradientButton
            href={`/${locale}/contact`}
            variant="primary"
            className="whitespace-nowrap px-10 py-4"
          >
            {dict.cta.button}
          </GradientButton>
        </div>
      </section>
    </>
  )
}
