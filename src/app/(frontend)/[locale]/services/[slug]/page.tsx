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
import { MapPin } from 'lucide-react'
import type { Service, Realisation, Media as MediaType } from '@/payload-types'

interface ServicePageProps {
  params: Promise<{ locale: string; slug: string }>
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { locale, slug } = await params

  if (!isValidLocale(locale)) {
    notFound()
  }

  const [dict, payload] = await Promise.all([
    getDictionary(locale as Locale),
    getPayload({ config: configPromise }),
  ])

  const serviceResult = await payload.find({
    collection: 'services',
    locale: locale as Locale,
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 1,
  })

  if (!serviceResult.docs.length) {
    notFound()
  }

  const service = serviceResult.docs[0] as Service

  // Fetch all services for sidebar and related realisations
  const [allServicesResult, realisationsResult] = await Promise.all([
    payload.find({
      collection: 'services',
      locale: locale as Locale,
      sort: 'order',
      limit: 20,
    }),
    payload.find({
      collection: 'realisations',
      locale: locale as Locale,
      where: {
        services: { contains: service.id },
      },
      limit: 4,
      depth: 1,
      sort: '-createdAt',
    }),
  ])

  const allServices = allServicesResult.docs as Service[]
  const realisations = realisationsResult.docs as Realisation[]
  const heroImage = service.image as MediaType | undefined
  const heroUrl =
    heroImage?.url || 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80'
  const specs =
    (
      service as Service & {
        specs?: Array<{
          category?: string
          label: string
          value: string
          unit?: string
          note?: string
          id?: string
        }>
      }
    ).specs || []

  const sidebarItems = [
    { key: 'specs', label: dict.service.sidebar.specs, icon: 'settings_input_component' },
    { key: 'installation', label: dict.service.sidebar.installation, icon: 'construction' },
    { key: 'maintenance', label: dict.service.sidebar.maintenance, icon: 'plumbing' },
    { key: 'standards', label: dict.service.sidebar.standards, icon: 'verified' },
  ]

  return (
    <div className="flex">
      {/* Sidebar Navigation */}
      <aside className="hidden lg:flex w-64 fixed left-0 top-0 pt-20 h-full flex-col gap-6 p-6 bg-surface-container-low z-40">
        <div className="mb-4">
          <h2 className="text-lg font-bold text-on-surface font-headline">{service.title}</h2>
          <p className="text-xs uppercase tracking-wider text-on-surface-variant font-label">
            {service.excerpt?.slice(0, 40)}...
          </p>
        </div>
        <nav className="flex flex-col gap-2">
          {sidebarItems.map((item, i) => (
            <a
              key={item.key}
              href={`#${item.key}`}
              className={`flex items-center gap-3 pl-4 py-2 font-label uppercase tracking-wider text-xs transition-all duration-300 ${
                i === 0
                  ? 'text-primary-container font-bold border-l-4 border-primary-container'
                  : 'text-on-surface-variant hover:text-primary-container hover:bg-surface-container-low'
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 w-full">
        {/* Hero Section */}
        <section className="relative h-[716px] flex items-center px-8 md:px-20 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image src={heroUrl} alt={service.title} fill className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/80 to-transparent" />
          </div>
          <div className="relative z-10 max-w-2xl">
            <p className="font-label text-primary-container font-semibold uppercase tracking-[0.2em] mb-4">
              {locale === 'fr' ? 'Infrastructure Municipale' : 'Municipal Infrastructure'}
            </p>
            <h1 className="text-6xl md:text-8xl font-black text-on-surface font-headline leading-tight tracking-tighter">
              {service.title}
            </h1>
            <div className="h-[2px] w-[60px] bg-primary-container my-8" aria-hidden="true" />
            <p className="text-xl text-on-surface-variant leading-relaxed font-body">
              {service.excerpt}
            </p>
            <div className="mt-10 flex gap-4">
              <GradientButton href={`/${locale}/contact`} variant="primary" className="px-8 py-4">
                {dict.service.viewPlans}
              </GradientButton>
              <Link
                href={`/${locale}/contact`}
                className="px-8 py-4 rounded-xl font-bold border-2 border-outline-variant/30 text-secondary hover:bg-surface-container-low transition-all"
              >
                {dict.service.dataSheet}
              </Link>
            </div>
          </div>
        </section>

        {/* Specifications Blueprint Cards */}
        {specs.length > 0 && (
          <section id="specs" className="py-24 px-8 md:px-20 bg-surface">
            <div className="mb-16">
              <h2 className="text-3xl font-black font-headline text-on-surface">
                {dict.service.specsTitle}
              </h2>
              <div className="h-[2px] w-[60px] bg-primary-container mt-4" aria-hidden="true" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {specs.map((spec, i) => (
                <div key={spec.id || i} className="blueprint-dots p-8 rounded-md shadow-sm">
                  <div className="bg-surface-container-lowest/90 backdrop-blur-sm p-6 h-full">
                    {spec.category && (
                      <p className="font-label text-xs uppercase tracking-widest text-outline mb-2">
                        {spec.category}
                      </p>
                    )}
                    <h3 className="font-label text-sm font-semibold text-primary mb-4">
                      {spec.label}
                    </h3>
                    <p className="text-4xl font-headline font-black text-on-surface">
                      {spec.value}
                      {spec.unit && <span className="text-lg ml-1">{spec.unit}</span>}
                    </p>
                    {spec.note && (
                      <div className="mt-6 border-t border-dashed border-outline-variant pt-4">
                        <span className="text-[10px] font-label text-outline uppercase">
                          {spec.note}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Realisations Gallery */}
        {realisations.length > 0 && (
          <section className="py-24 px-8 md:px-20 bg-surface">
            <div className="mb-16">
              <h2 className="text-3xl font-black font-headline text-on-surface">
                {dict.service.projects}
              </h2>
              <div className="h-[2px] w-[60px] bg-primary-container mt-4" aria-hidden="true" />
            </div>
            <div className="grid grid-cols-12 gap-6">
              {realisations.map((project, i) => {
                const featuredImg = project.featuredImage as MediaType | undefined
                const imgUrl =
                  featuredImg?.url ||
                  'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80'
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
                      alt={project.title}
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
          </section>
        )}

        {/* CTA Section */}
        <section className="py-24 px-8 md:px-20 bg-surface-container-low">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl font-black font-headline text-on-surface mb-6">
              {dict.service.ctaTitle}
            </h2>
            <p className="text-lg text-on-surface-variant font-body mb-10">
              {dict.service.ctaDescription}
            </p>
            <GradientButton
              href={`/${locale}/contact`}
              variant="primary"
              className="px-12 py-5 text-lg"
            >
              {dict.contact.form.submit}
            </GradientButton>
          </div>
        </section>
      </main>
    </div>
  )
}

export async function generateStaticParams() {
  try {
    const payload = await getPayload({ config: configPromise })
    const services = await payload.find({
      collection: 'services',
      limit: 100,
    })

    const params: Array<{ locale: string; slug: string }> = []

    for (const service of services.docs) {
      for (const locale of ['fr', 'en']) {
        if (service.slug) {
          params.push({ locale, slug: service.slug })
        }
      }
    }

    return params
  } catch {
    return []
  }
}
