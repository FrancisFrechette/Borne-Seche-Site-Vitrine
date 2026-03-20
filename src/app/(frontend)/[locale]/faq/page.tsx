export const dynamic = 'force-dynamic'

import React from 'react'
import { getDictionary } from '@/i18n/getDictionary'
import { type Locale, isValidLocale } from '@/i18n/locales'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { GradientButton } from '@/components/ui/GradientButton'
import { FaqAccordion } from './FaqAccordion'
import RichText from '@/components/RichText'
import type { Faq } from '@/payload-types'

interface FaqPageProps {
  params: Promise<{ locale: string }>
}

type FaqCategory = 'nfpa' | 'rbq' | 'maintenance' | 'general' | 'bornes-seches' | 'installation'

export default async function FaqPage({ params }: FaqPageProps) {
  const { locale } = await params

  if (!isValidLocale(locale)) {
    notFound()
  }

  const [dict, payload] = await Promise.all([
    getDictionary(locale as Locale),
    getPayload({ config: configPromise }),
  ])

  const faqResult = await payload.find({
    collection: 'faq',
    locale: locale as Locale,
    limit: 100,
    sort: 'order',
  })

  const allFaqs = faqResult.docs as Faq[]

  // Group FAQs by category
  const grouped: Record<string, Faq[]> = {}
  for (const faq of allFaqs) {
    const cat = faq.category || 'general'
    if (!grouped[cat]) grouped[cat] = []
    grouped[cat].push(faq)
  }

  // Order categories to match Stitch template
  const categoryOrder: FaqCategory[] = [
    'nfpa',
    'rbq',
    'maintenance',
    'general',
    'bornes-seches',
    'installation',
  ]
  const activeCategories = categoryOrder.filter((cat) => grouped[cat]?.length)

  return (
    <>
      <main className="pt-32 pb-24 px-8 max-w-7xl mx-auto">
        {/* Hero Section */}
        <header className="mb-20 ml-0 md:ml-12">
          <p className="font-label text-primary-container font-semibold tracking-widest uppercase text-xs mb-4">
            {dict.faq.eyebrow}
          </p>
          <h1 className="font-headline text-5xl md:text-7xl font-black text-on-surface tracking-tight mb-6">
            {dict.faq.title}
          </h1>
          <div className="h-0.5 w-[60px] bg-primary-container" aria-hidden="true" />
          <p className="mt-8 text-on-surface-variant max-w-2xl text-lg leading-relaxed">
            {dict.faq.subtitle}
          </p>
        </header>

        {/* Technical Categories & Accordions */}
        <div className="space-y-32">
          {activeCategories.map((cat) => {
            const catInfo = dict.faq.categories[cat]
            const faqs = grouped[cat]

            return (
              <section key={cat} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                {/* Sticky sidebar label */}
                <div className="lg:col-span-4 lg:sticky lg:top-32">
                  <span className="font-label text-sm font-bold text-secondary uppercase tracking-[0.2em] mb-4 block">
                    {catInfo.label}
                  </span>
                  <h2 className="font-headline text-3xl font-extrabold text-on-surface mb-4">
                    {catInfo.title}
                  </h2>
                  <p className="text-on-surface-variant font-body">{catInfo.description}</p>
                </div>

                {/* Accordion items */}
                <div className="lg:col-span-8 space-y-6">
                  {faqs.map((faq) => (
                    <FaqAccordion key={faq.id} question={faq.question}>
                      {faq.answer && (
                        <div className="text-on-surface-variant leading-relaxed prose prose-sm max-w-none">
                          <RichText data={faq.answer} />
                        </div>
                      )}
                    </FaqAccordion>
                  ))}
                </div>
              </section>
            )
          })}

          {/* Fallback if no FAQs exist yet */}
          {activeCategories.length === 0 && (
            <div className="text-center py-16 text-on-surface-variant">
              <p className="text-lg">
                {locale === 'fr' ? 'Aucune question pour le moment.' : 'No questions yet.'}
              </p>
            </div>
          )}
        </div>

        {/* CTA Section */}
        <section className="mt-32 bg-primary p-16 rounded-xl text-center relative overflow-hidden shadow-[0_20px_40px_rgba(9,29,46,0.06)]">
          <div
            className="absolute top-0 right-0 w-64 h-64 bg-primary-container/20 rounded-full -mr-32 -mt-32"
            aria-hidden="true"
          />
          <h2 className="font-headline text-3xl font-extrabold text-on-primary mb-6 relative z-10">
            {dict.faq.ctaTitle}
          </h2>
          <p className="text-primary-fixed/80 max-w-xl mx-auto mb-10 relative z-10">
            {dict.faq.ctaDescription}
          </p>
          <GradientButton
            href={`/${locale}/contact`}
            variant="secondary"
            className="bg-surface text-primary border-0 px-10 py-4 font-headline font-bold uppercase tracking-wider relative z-10 hover:scale-105"
          >
            {dict.faq.ctaButton}
          </GradientButton>
        </section>
      </main>
    </>
  )
}
