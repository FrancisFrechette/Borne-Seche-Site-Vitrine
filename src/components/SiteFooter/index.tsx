import React from 'react'
import Link from 'next/link'
import { Mail, Phone } from 'lucide-react'
import type { Locale } from '@/i18n/locales'
import type { Dictionary } from '@/i18n/getDictionary'

interface SiteFooterProps {
  locale: Locale
  dict: Dictionary
}

export function SiteFooter({ locale, dict }: SiteFooterProps) {
  const linkClass = 'text-sm text-on-surface-variant hover:text-primary-container transition-colors'

  return (
    <footer className="bg-surface-container-low py-16 px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand Column */}
        <div className="space-y-4">
          <Link href={`/${locale}`} className="text-xl font-black text-on-surface font-headline">
            Bourgelas
          </Link>
          <p className="text-on-surface-variant text-sm leading-relaxed max-w-xs">
            {dict.footer.description}
          </p>
        </div>

        {/* Expertise Column */}
        <div>
          <h4 className="font-label font-bold text-xs uppercase tracking-widest text-on-surface mb-6">
            {dict.footer.expertiseTitle}
          </h4>
          <ul className="space-y-3">
            <li>
              <Link href={`/${locale}/services`} className={linkClass}>
                {dict.footer.services.dryHydrants}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/services`} className={linkClass}>
                {dict.footer.services.reservoirs}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/services`} className={linkClass}>
                {dict.footer.services.inspection}
              </Link>
            </li>
          </ul>
        </div>

        {/* Sectors Column */}
        <div>
          <h4 className="font-label font-bold text-xs uppercase tracking-widest text-on-surface mb-6">
            {dict.footer.sectorsTitle}
          </h4>
          <ul className="space-y-3">
            <li>
              <Link href={`/${locale}/secteurs`} className={linkClass}>
                {dict.footer.sectors.municipal}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/secteurs`} className={linkClass}>
                {dict.footer.sectors.agricultural}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/secteurs`} className={linkClass}>
                {dict.footer.sectors.industrial}
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Column */}
        <div>
          <h4 className="font-label font-bold text-xs uppercase tracking-widest text-on-surface mb-6">
            {dict.footer.contactTitle}
          </h4>
          <ul className="space-y-3">
            <li>
              <a
                href="mailto:contact@bourgelas.ca"
                className={`${linkClass} flex items-center gap-2`}
              >
                <Mail className="w-4 h-4" /> contact@bourgelas.ca
              </a>
            </li>
            <li>
              <a href="tel:+14505550123" className={`${linkClass} flex items-center gap-2`}>
                <Phone className="w-4 h-4" /> (450) 555-0123
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar — surface shift instead of border (No-Line Rule) */}
      <div className="max-w-7xl mx-auto mt-16 pt-8 bg-surface-container-low flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs text-on-surface-variant">{dict.footer.copyright}</p>
        <div className="flex gap-6">
          <Link
            href="#"
            className="text-xs text-on-surface-variant hover:text-primary-container transition-colors"
          >
            {dict.footer.privacy}
          </Link>
          <Link
            href="#"
            className="text-xs text-on-surface-variant hover:text-primary-container transition-colors"
          >
            {dict.footer.terms}
          </Link>
        </div>
      </div>
    </footer>
  )
}
