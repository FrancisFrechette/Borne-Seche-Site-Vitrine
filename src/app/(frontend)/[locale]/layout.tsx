export const dynamic = 'force-dynamic'

import React from 'react'
import { Navbar } from '@/components/Navbar'
import { SiteFooter } from '@/components/SiteFooter'
import { getDictionary } from '@/i18n/getDictionary'
import { locales, type Locale, isValidLocale } from '@/i18n/locales'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

interface LocaleLayoutProps {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params

  if (!isValidLocale(locale)) {
    notFound()
  }

  const [dict, payload] = await Promise.all([
    getDictionary(locale as Locale),
    getPayload({ config: configPromise }),
  ])

  const [header, footer, servicesResult] = await Promise.all([
    payload.findGlobal({ slug: 'header', locale: locale as Locale, depth: 1 }),
    payload.findGlobal({ slug: 'footer', locale: locale as Locale, depth: 1 }),
    payload.find({
      collection: 'services',
      locale: locale as Locale,
      limit: 20,
      sort: 'order',
      select: { title: true, slug: true },
    }),
  ])

  return (
    <>
      <Navbar
        locale={locale as Locale}
        dict={dict}
        header={header}
        services={servicesResult.docs}
      />
      <main className="pt-20">{children}</main>
      <SiteFooter locale={locale as Locale} dict={dict} footer={footer} />
    </>
  )
}
