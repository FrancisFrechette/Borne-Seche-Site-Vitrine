import React from 'react'
import Link from 'next/link'
import { GradientButton } from '@/components/ui/GradientButton'
import type { Locale } from '@/i18n/locales'
import type { Dictionary } from '@/i18n/getDictionary'
import type { Header, Service } from '@/payload-types'
import { NavDropdown } from './NavDropdown'

interface NavbarProps {
  locale: Locale
  dict: Dictionary
  header: Header
  services: Pick<Service, 'id' | 'title' | 'slug'>[]
}

export function Navbar({ locale, dict, header, services }: NavbarProps) {
  const otherLocale = locale === 'fr' ? 'en' : 'fr'

  const ctaEnabled = header.ctaButton?.enabled
  const ctaLabel = header.ctaButton?.link?.label
  const ctaUrl =
    header.ctaButton?.link?.type === 'custom'
      ? header.ctaButton.link.url || `/${locale}/contact`
      : `/${locale}/contact`

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl shadow-sm shadow-on-surface/5">
      <div className="flex justify-between items-center h-20 px-8 max-w-7xl mx-auto">
        <Link
          href={`/${locale}`}
          className="text-2xl font-black text-on-surface tracking-tighter font-headline"
        >
          {header.logoAlt || 'Bourgelas'}
        </Link>

        <div className="hidden md:flex items-center space-x-8 font-headline font-bold tracking-tight text-sm uppercase">
          <NavDropdown
            label={dict.nav.services}
            href={`/${locale}/services`}
            items={services.map((s) => ({
              label: s.title,
              href: `/${locale}/services/${s.slug}`,
            }))}
          />
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

        <div className="flex items-center space-x-6">
          <Link
            href={`/${otherLocale}`}
            className="font-headline font-bold tracking-tight text-sm uppercase text-on-surface-variant hover:text-primary-container transition-colors"
          >
            {dict.nav.langSwitch}
          </Link>
          {ctaEnabled && ctaLabel && (
            <GradientButton href={ctaUrl} className="hidden sm:inline-flex">
              {ctaLabel}
            </GradientButton>
          )}
        </div>
      </div>
    </nav>
  )
}
