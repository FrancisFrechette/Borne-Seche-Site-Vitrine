import React from 'react'

import type { StatsBlock as StatsBlockProps } from '@/payload-types'

export const StatsBlockComponent: React.FC<StatsBlockProps> = ({ heading, stats }) => {
  return (
    <section className="py-24 bg-surface relative px-8">
      <div className="max-w-7xl mx-auto">
        {heading && (
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-black font-headline text-on-surface">{heading}</h2>
            <div className="h-[2px] w-[60px] bg-primary-container mt-4 mx-auto" aria-hidden="true" />
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats?.map((stat, i) => (
            <div
              key={stat.id || i}
              className="bg-surface-container-lowest p-8 rounded-md shadow-sm border-b-4 border-primary-container flex flex-col items-center text-center"
            >
              <span className="font-headline font-black text-5xl text-primary-container mb-2 tracking-tighter">
                {stat.value}
              </span>
              <span className="font-label font-bold text-xs uppercase tracking-widest text-on-surface/60">
                {stat.label}
              </span>
              {stat.suffix && (
                <span className="text-xs text-on-surface-variant mt-1">{stat.suffix}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
