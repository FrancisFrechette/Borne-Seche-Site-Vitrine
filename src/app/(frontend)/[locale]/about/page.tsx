import React from 'react'
import { getDictionary } from '@/i18n/getDictionary'
import { type Locale, isValidLocale } from '@/i18n/locales'
import { notFound } from 'next/navigation'
import { GradientButton } from '@/components/ui/GradientButton'
import { Wrench, Droplets, Compass } from 'lucide-react'
import { BlueprintCard } from '@/components/ui/BlueprintCard'

interface AboutPageProps {
  params: Promise<{ locale: string }>
}

const iconMap: Record<string, React.ReactNode> = {
  precision_manufacturing: <Wrench className="w-10 h-10 text-primary" />,
  water_drop: <Droplets className="w-10 h-10 text-primary" />,
  architecture: <Compass className="w-10 h-10 text-primary/30" />,
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params

  if (!isValidLocale(locale)) {
    notFound()
  }

  const dict = await getDictionary(locale as Locale)
  const { about } = dict

  return (
    <main className="pt-24">
      {/* Hero Section: Precision Aqueduct */}
      <section className="relative px-8 py-32 md:py-48 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start">
          <div className="md:w-2/3 md:pl-24">
            <h1 className="text-6xl md:text-8xl font-black font-headline tracking-tighter text-on-surface leading-none mb-4 whitespace-pre-line">
              {about.heroTitle}
            </h1>
            <div className="h-[2px] w-[60px] bg-primary-container mb-12" aria-hidden="true" />
            <p className="text-xl md:text-2xl text-on-surface-variant font-light max-w-xl leading-relaxed">
              {about.heroSubtitle}
            </p>
          </div>
          {/* Asymmetric "Ghost" Element */}
          <div className="absolute -right-20 top-1/4 opacity-[0.03] pointer-events-none hidden lg:block select-none">
            <span className="text-[20rem] font-black font-headline leading-none text-on-surface">
              {about.ghostText}
            </span>
          </div>
        </div>
      </section>

      {/* Timeline: 30 Years of Expertise */}
      <section className="bg-surface-container-low py-32 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-24 md:ml-24">
            <h2 className="text-xs font-label uppercase tracking-[0.3em] text-primary mb-2">
              {about.timelineEyebrow}
            </h2>
            <h3 className="text-4xl font-headline font-extrabold text-on-surface">
              {about.timelineTitle}
            </h3>
          </div>
          <div className="space-y-32">
            {about.timeline.map((item, i) => (
              <div key={item.year} className="flex flex-col md:flex-row md:items-start">
                <div className={`md:w-1/4 md:text-right md:pr-12 mb-4 md:mb-0 ${i === 1 ? 'md:translate-y-8' : ''}`}>
                  <span className="text-5xl font-headline font-black text-primary-container/40">
                    {item.year}
                  </span>
                </div>
                <div className={`md:w-2/3 md:pl-12 ${i === 1 ? 'md:translate-x-12' : ''}`}>
                  <h4 className="text-2xl font-headline font-bold mb-4 text-on-surface">
                    {item.title}
                  </h4>
                  <p className="text-on-surface-variant max-w-2xl leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team & Values Section */}
      <section className="py-32 px-8 bg-surface">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end mb-24">
            <div className="lg:col-span-8">
              <h2 className="text-4xl md:text-5xl font-headline font-extrabold tracking-tight leading-tight text-on-surface whitespace-pre-line">
                {about.valuesTitle}
              </h2>
            </div>
            <div className="lg:col-span-4 text-xs font-label uppercase tracking-widest text-outline">
              {about.valuesEyebrow}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {about.values.map((value, i) => {
              if (value.isBlueprint) {
                return (
                  <BlueprintCard key={i}>
                    <div className="flex items-center justify-between mb-8">
                      <span className="text-[10px] font-label font-bold text-primary uppercase">
                        Blueprint ID: 2024-SYS
                      </span>
                      {iconMap[value.icon] || null}
                    </div>
                    <h5 className="text-xl font-headline font-bold mb-4 text-on-surface">
                      {value.title}
                    </h5>
                    <p className="text-on-surface-variant text-sm font-body leading-relaxed">
                      {value.description}
                    </p>
                  </BlueprintCard>
                )
              }

              return (
                <div
                  key={i}
                  className={`bg-surface-container p-10 rounded-lg border-b-4 ${i === 0 ? 'border-primary-container' : 'border-primary'}`}
                >
                  <div className="mb-6">{iconMap[value.icon] || null}</div>
                  <h5 className="text-xl font-headline font-bold mb-4 text-on-surface">
                    {value.title}
                  </h5>
                  <p className="text-on-surface-variant text-sm font-body leading-relaxed">
                    {value.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-8">
        <div className="max-w-5xl mx-auto primary-gradient rounded-xl p-12 md:p-24 text-center relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-headline font-black text-on-primary mb-8 tracking-tighter">
              {about.ctaTitle}
            </h2>
            <p className="text-on-primary/80 mb-12 max-w-xl mx-auto font-body text-lg">
              {about.ctaDescription}
            </p>
            <GradientButton
              href={`/${locale}/contact`}
              variant="secondary"
              className="bg-surface text-primary border-0 px-10 py-4 text-lg shadow-xl hover:scale-105"
            >
              {about.ctaButton}
            </GradientButton>
          </div>
          {/* Blueprint grid overlay */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(#bcc9ce 0.5px, transparent 0.5px)',
              backgroundSize: '20px 20px',
            }}
            aria-hidden="true"
          />
        </div>
      </section>
    </main>
  )
}
