export const dynamic = 'force-dynamic'

import React from 'react'
import { isValidLocale } from '@/i18n/locales'
import type { Locale } from '@/i18n/locales'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { RenderBlocks } from '@/blocks/RenderBlocks'

interface HomePageProps {
  params: Promise<{ locale: string }>
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params

  if (!isValidLocale(locale)) {
    notFound()
  }

  const payload = await getPayload({ config: configPromise })

  const home = await payload.findGlobal({
    slug: 'home',
    locale: locale as Locale,
    depth: 2,
  })

  return (
    <>
      <RenderBlocks blocks={home.layout || []} />
    </>
  )
}
