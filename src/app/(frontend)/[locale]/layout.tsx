import React from 'react'
import { Navbar } from '@/components/Navbar'
import { SiteFooter } from '@/components/SiteFooter'
import { getDictionary } from '@/i18n/getDictionary'
import { locales, type Locale, isValidLocale } from '@/i18n/locales'
import { notFound } from 'next/navigation'

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

  const dict = await getDictionary(locale as Locale)

  return (
    <>
      <Navbar locale={locale as Locale} dict={dict} />
      <main className="pt-20">{children}</main>
      <SiteFooter locale={locale as Locale} dict={dict} />
    </>
  )
}
