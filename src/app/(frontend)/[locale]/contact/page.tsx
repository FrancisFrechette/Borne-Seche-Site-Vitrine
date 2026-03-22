export const dynamic = 'force-dynamic'

import React from 'react'
import { getDictionary } from '@/i18n/getDictionary'
import { type Locale, isValidLocale } from '@/i18n/locales'
import { notFound } from 'next/navigation'
import ContactForm from './ContactForm'

interface ContactPageProps {
  params: Promise<{ locale: string }>
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params

  if (!isValidLocale(locale)) {
    notFound()
  }

  const dict = await getDictionary(locale as Locale)

  return (
    <>
      {/* Hero */}
      <section className="hero-gradient relative overflow-hidden py-32 px-8">
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
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <h1 className="font-headline font-black text-5xl md:text-7xl text-white leading-[1.1] tracking-tight mb-6">
            {dict.contact.heroTitle}
          </h1>
          <div className="h-1 w-20 bg-primary-container mx-auto mb-8" aria-hidden="true" />
          <p className="text-xl text-blue-100/80 font-body font-light leading-relaxed">
            {dict.contact.heroSubtitle}
          </p>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-24 px-8 bg-surface-container-low">
        <div className="max-w-4xl mx-auto">
          <ContactForm locale={locale as Locale} dict={dict} />
        </div>
      </section>
    </>
  )
}
