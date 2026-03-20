import React from 'react'
import Link from 'next/link'
import { GradientButton } from '@/components/ui/GradientButton'
import type { Locale } from '@/i18n/locales'
import type { Dictionary } from '@/i18n/getDictionary'

interface NavbarProps {
  locale: Locale
  dict: Dictionary
}

export function Navbar({ locale, dict }: NavbarProps) {
  const otherLocale = locale === 'fr' ? 'en' : 'fr'

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl shadow-sm shadow-on-surface/5">
      <div className="flex justify-between items-center h-20 px-8 max-w-7xl mx-auto">
        {/* Brand Logo */}
        <Link
          href={`/${locale}`}
          className="text-2xl font-black text-on-surface tracking-tighter font-headline"
        >
          Bourgelas
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-8 font-headline font-bold tracking-tight text-sm uppercase">
          <Link
            href={`/${locale}/services`}
            className="text-on-surface-variant hover:text-primary-container transition-colors"
          >
            {dict.nav.services}
          </Link>
          <Link
            href={`/${locale}/secteurs`}
            className="text-on-surface-variant hover:text-primary-container transition-colors"
          >
            {dict.nav.sectors}
          </Link>
          <Link
            href={`/${locale}/realisations`}
            className="text-on-surface-variant hover:text-primary-container transition-colors"
          >
            {dict.nav.realisations}
          </Link>
          <Link
            href={`/${locale}/contact`}
            className="text-on-surface-variant hover:text-primary-container transition-colors"
          >
            {dict.nav.contact}
          </Link>
        </div>

        {/* Trailing Actions */}
        <div className="flex items-center space-x-6">
          <Link
            href={`/${otherLocale}`}
            className="font-headline font-bold tracking-tight text-sm uppercase text-on-surface-variant hover:text-primary-container transition-colors"
          >
            {dict.nav.langSwitch}
          </Link>
          <GradientButton href={`/${locale}/contact`} className="hidden sm:inline-flex">
            {dict.nav.cta}
          </GradientButton>
        </div>
      </div>
    </nav>
  )
}
