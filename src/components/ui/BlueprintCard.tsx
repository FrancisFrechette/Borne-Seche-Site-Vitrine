import React from 'react'
import { cn } from '@/utilities/ui'

interface BlueprintCardProps {
  children: React.ReactNode
  className?: string
}

export function BlueprintCard({ children, className }: BlueprintCardProps) {
  return (
    <div
      className={cn(
        'relative bg-surface-container-highest p-12 rounded-xl overflow-hidden',
        className,
      )}
    >
      {/* Dot-grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.08] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #091d2e 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
        aria-hidden="true"
      />
      <div className="relative z-10">{children}</div>
    </div>
  )
}
