import React from 'react'
import { cn } from '@/utilities/ui'

interface SectionHeadingProps {
  children: React.ReactNode
  className?: string
  as?: 'h1' | 'h2' | 'h3'
}

export function SectionHeading({ children, className, as: Tag = 'h1' }: SectionHeadingProps) {
  return (
    <div className={cn('flex flex-col', className)}>
      <Tag className="text-4xl md:text-6xl font-black text-on-surface leading-[0.95] tracking-tighter font-headline">
        {children}
      </Tag>
      <div className="h-0.5 w-[60px] bg-primary-container mt-4" aria-hidden="true" />
    </div>
  )
}
