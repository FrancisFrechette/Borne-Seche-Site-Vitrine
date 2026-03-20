export const dynamic = 'force-dynamic'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getDictionary } from '@/i18n/getDictionary'
import { type Locale, isValidLocale } from '@/i18n/locales'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { GradientButton } from '@/components/ui/GradientButton'
import { MapPin, ArrowLeft, CheckCircle } from 'lucide-react'
import type { Realisation, Media as MediaType } from '@/payload-types'

interface RealisationPageProps {
  params: Promise<{ locale: string; slug: string }>
}

type TechnicalStat = {
  icon?: string | null
  label: string
  value: string
  unit?: string | null
  description?: string | null
  id?: string | null
}

type Highlight = {
  title: string
  description?: string | null
  id?: string | null
}

type GalleryItem = {
  image: MediaType | number
  caption?: string | null
  id?: string | null
}

type RealisationExtended = Realisation & {
  technicalStats?: TechnicalStat[] | null
  challenge?: string | null
  solution?: string | null
  highlights?: Highlight[] | null
}

export default async function RealisationPage({ params }: RealisationPageProps) {
  const { locale, slug } = await params

  if (!isValidLocale(locale)) {
    notFound()
  }

  const [dict, payload] = await Promise.all([
    getDictionary(locale as Locale),
    getPayload({ config: configPromise }),
  ])

  const result = await payload.find({
    collection: 'realisations',
    locale: locale as Locale,
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 2,
  })

  if (!result.docs.length) {
    notFound()
  }

  const project = result.docs[0] as RealisationExtended
  const heroImage = project.featuredImage as MediaType | undefined
  const heroUrl =
    heroImage?.url || 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80'
  const stats = project.technicalStats || []
  const gallery = (project.gallery || []) as GalleryItem[]
  const highlights = project.highlights || []

  return (
    <>
      {/* Hero Section — Full dark overlay */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-on-surface">
        <div className="absolute inset-0 z-0">
          <Image
            src={heroUrl}
            alt={project.title}
            fill
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-on-background/60" />
        </div>
        <div className="container mx-auto px-8 relative z-10">
          <div className="max-w-4xl">
            {project.location && (
              <div className="flex items-center gap-2 mb-6">
                <MapPin className="w-5 h-5 text-primary-container" />
                <span className="font-label uppercase tracking-[0.2em] text-primary-fixed text-sm">
                  {project.location}
                </span>
              </div>
            )}
            <h1 className="text-6xl md:text-8xl font-black text-white leading-none tracking-tighter mb-8 font-headline">
              {project.title}
            </h1>
            <div className="h-0.5 w-[60px] bg-primary-container mb-12" aria-hidden="true" />
            <p className="text-xl md:text-2xl text-surface-container font-light max-w-2xl leading-relaxed">
              {project.excerpt}
            </p>
          </div>
        </div>
        {/* Ghost project ID */}
        <div className="absolute bottom-12 right-12 hidden lg:block text-white/10 font-black text-9xl select-none font-headline">
          {project.slug?.toUpperCase().slice(0, 8)}
        </div>
      </section>

      {/* Blueprint Card Grid (Technical Stats) */}
      {stats.length > 0 && (
        <section className="py-24 bg-surface px-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16">
              <span className="font-label text-primary font-semibold uppercase tracking-widest text-xs mb-4 block">
                {dict.realisation.specsLabel}
              </span>
              <h2 className="text-4xl font-extrabold font-headline text-on-surface tracking-tight">
                {dict.realisation.specsTitle}
              </h2>
              <div className="h-0.5 w-[60px] bg-primary-container mt-4" aria-hidden="true" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {stats.map((stat, i) => (
                <div
                  key={stat.id || i}
                  className="relative group overflow-hidden rounded-md bg-surface-container-highest p-8 border-b-2 border-transparent hover:border-primary-container transition-all duration-500"
                >
                  {/* Dot pattern */}
                  <div
                    className="absolute inset-0 z-0 opacity-[0.15] pointer-events-none"
                    style={{
                      backgroundImage: 'radial-gradient(circle, #00b4d8 1px, transparent 1px)',
                      backgroundSize: '20px 20px',
                      backgroundPosition: 'center',
                    }}
                    aria-hidden="true"
                  />
                  <div className="relative z-10">
                    <div className="font-label text-on-surface-variant text-sm uppercase tracking-wider mb-2">
                      {stat.label}
                    </div>
                    <div className="text-5xl font-black font-headline text-on-surface tracking-tighter">
                      {stat.value}{' '}
                      {stat.unit && <span className="text-xl font-medium">{stat.unit}</span>}
                    </div>
                    {stat.description && (
                      <p className="mt-4 text-on-surface-variant/80 text-sm leading-relaxed">
                        {stat.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Editorial Section: Défis & Solutions (Asymmetric) */}
      {(project.challenge || project.solution) && (
        <section className="bg-surface-container-low py-32">
          <div className="container mx-auto px-8">
            <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr] gap-20 items-start">
              <div className="pl-0 md:pl-20">
                <h2 className="text-4xl md:text-5xl font-black font-headline text-on-surface tracking-tighter mb-6">
                  {dict.realisation.challengesTitle}
                </h2>
                <div className="h-0.5 w-[60px] bg-primary-container mb-10" aria-hidden="true" />
                <div className="space-y-12">
                  {project.challenge && (
                    <div>
                      <h3 className="font-label font-bold text-primary uppercase tracking-widest text-sm mb-4">
                        {dict.realisation.challengeLabel}
                      </h3>
                      <p className="text-lg leading-relaxed text-on-surface-variant">
                        {project.challenge}
                      </p>
                    </div>
                  )}
                  {project.solution && (
                    <div className="bg-surface p-8 rounded-md shadow-sm">
                      <h3 className="font-label font-bold text-primary uppercase tracking-widest text-sm mb-4">
                        {dict.realisation.solutionLabel}
                      </h3>
                      <p className="text-lg leading-relaxed text-on-surface-variant">
                        {project.solution}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              {/* Side image */}
              <div className="relative">
                <div className="aspect-[4/5] w-full bg-surface-container-highest rounded-md overflow-hidden shadow-2xl">
                  <Image src={heroUrl} alt={project.title} fill className="object-cover" />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Gallery Section */}
      {(gallery.length > 0 || highlights.length > 0) && (
        <section className="bg-surface py-32">
          <div className="container mx-auto px-8">
            <div className="grid grid-cols-12 gap-8 items-center">
              <div className="col-span-12 lg:col-span-5">
                <h2 className="text-4xl font-black font-headline text-on-surface mb-6">
                  {dict.realisation.galleryTitle}
                </h2>
                <div className="h-0.5 w-[60px] bg-primary-container mb-8" aria-hidden="true" />
                <p className="text-on-surface-variant text-lg leading-relaxed mb-12">
                  {dict.realisation.galleryDescription}
                </p>
                {highlights.length > 0 && (
                  <div className="flex flex-col gap-6">
                    {highlights.map((hl, i) => (
                      <div key={hl.id || i} className="flex items-start gap-4">
                        <CheckCircle className="w-6 h-6 text-primary-container flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="block font-bold text-on-surface">{hl.title}</span>
                          {hl.description && (
                            <span className="text-sm text-on-surface-variant">
                              {hl.description}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {gallery.length > 0 && (
                <div className="col-span-12 lg:col-span-7 grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    {gallery
                      .filter((_, i) => i % 2 === 0)
                      .map((item, i) => {
                        const img = item.image as MediaType
                        const imgUrl =
                          img?.url ||
                          'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80'
                        return (
                          <div
                            key={item.id || i}
                            className="relative rounded-md overflow-hidden"
                            style={{ height: i % 2 === 0 ? 300 : 400 }}
                          >
                            <Image
                              src={imgUrl}
                              alt={item.caption || project.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )
                      })}
                  </div>
                  <div className="space-y-4 pt-12">
                    {gallery
                      .filter((_, i) => i % 2 === 1)
                      .map((item, i) => {
                        const img = item.image as MediaType
                        const imgUrl =
                          img?.url ||
                          'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80'
                        return (
                          <div
                            key={item.id || i}
                            className="relative rounded-md overflow-hidden"
                            style={{ height: i % 2 === 0 ? 400 : 300 }}
                          >
                            <Image
                              src={imgUrl}
                              alt={item.caption || project.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )
                      })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-24 px-8">
        <div className="max-w-5xl mx-auto primary-gradient rounded-xl p-12 md:p-24 text-center relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-headline font-black text-on-primary mb-8 tracking-tighter">
              {dict.realisation.ctaTitle}
            </h2>
            <p className="text-on-primary/80 mb-12 max-w-xl mx-auto font-body text-lg">
              {dict.realisation.ctaDescription}
            </p>
            <GradientButton
              href={`/${locale}/contact`}
              variant="secondary"
              className="bg-surface text-primary border-0 px-10 py-4 text-lg shadow-xl hover:scale-105"
            >
              {dict.realisation.ctaButton}
            </GradientButton>
          </div>
          {/* Blueprint grid overlay */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(#bcc9ce 0.5px, transparent 0.5px)',
              backgroundSize: '20px 20px',
            }}
            aria-hidden="true"
          />
        </div>
      </section>

      {/* Back link */}
      <div className="max-w-7xl mx-auto px-8 pb-16">
        <Link
          href={`/${locale}`}
          className="inline-flex items-center gap-2 text-primary hover:text-primary-container font-label uppercase tracking-wider text-sm transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {dict.realisation.backToProjects}
        </Link>
      </div>
    </>
  )
}

export async function generateStaticParams() {
  try {
    const payload = await getPayload({ config: configPromise })
    const realisations = await payload.find({
      collection: 'realisations',
      limit: 100,
    })

    const params: Array<{ locale: string; slug: string }> = []

    for (const project of realisations.docs) {
      for (const locale of ['fr', 'en']) {
        if (project.slug) {
          params.push({ locale, slug: project.slug })
        }
      }
    }

    return params
  } catch {
    return []
  }
}
