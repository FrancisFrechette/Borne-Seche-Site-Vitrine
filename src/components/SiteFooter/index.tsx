import React from 'react'
import Link from 'next/link'
import { Mail, Phone, MapPin } from 'lucide-react'
import type { Locale } from '@/i18n/locales'
import type { Dictionary } from '@/i18n/getDictionary'
import type { Footer } from '@/payload-types'

interface SiteFooterProps {
  locale: Locale
  dict: Dictionary
  footer: Footer
}

export function SiteFooter({ locale, dict, footer }: SiteFooterProps) {
  const linkClass = 'text-sm text-on-surface-variant hover:text-primary-container transition-colors'

  return (
    <footer className="bg-surface-container-low py-16 px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-4">
          <Link href={`/${locale}`} className="text-xl font-black text-on-surface font-headline">
            Bourgelas
          </Link>
          {footer.companyDescription && (
            <p className="text-on-surface-variant text-sm leading-relaxed max-w-xs">
              {footer.companyDescription}
            </p>
          )}
        </div>

        {footer.navItems && footer.navItems.length > 0 && (
          <div>
            <h4 className="font-label font-bold text-xs uppercase tracking-widest text-on-surface mb-6">
              {dict.footer.expertiseTitle}
            </h4>
            <ul className="space-y-3">
              {footer.navItems.map((item) => {
                const url = item.link?.type === 'custom' ? item.link.url || '#' : '#'
                return (
                  <li key={item.id}>
                    <Link href={url} className={linkClass}>
                      {item.link.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        )}

        <div>
          <h4 className="font-label font-bold text-xs uppercase tracking-widest text-on-surface mb-6">
            {dict.footer.sectorsTitle}
          </h4>
          <ul className="space-y-3">
            <li>
              <Link href={`/${locale}/services`} className={linkClass}>
                {dict.footer.sectors.municipal}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/services`} className={linkClass}>
                {dict.footer.sectors.agricultural}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/services`} className={linkClass}>
                {dict.footer.sectors.industrial}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-label font-bold text-xs uppercase tracking-widest text-on-surface mb-6">
            {dict.footer.contactTitle}
          </h4>
          <ul className="space-y-3">
            {footer.contact?.email && (
              <li>
                <a
                  href={`mailto:${footer.contact.email}`}
                  className={`${linkClass} flex items-center gap-2`}
                >
                  <Mail className="w-4 h-4" /> {footer.contact.email}
                </a>
              </li>
            )}
            {footer.contact?.phone && (
              <li>
                <a
                  href={`tel:${footer.contact.phone.replace(/\s/g, '')}`}
                  className={`${linkClass} flex items-center gap-2`}
                >
                  <Phone className="w-4 h-4" /> {footer.contact.phone}
                </a>
              </li>
            )}
            {footer.contact?.address && (
              <li className={`${linkClass} flex items-start gap-2`}>
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                <span className="whitespace-pre-line">{footer.contact.address}</span>
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-16 pt-8 bg-surface-container-low flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs text-on-surface-variant">
          {footer.copyright || dict.footer.copyright}
        </p>
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
