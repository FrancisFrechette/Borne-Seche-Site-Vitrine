import React from 'react'
import Link from 'next/link'
import { cn } from '@/utilities/ui'

interface GradientButtonProps {
  children: React.ReactNode
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'secondary'
  className?: string
  icon?: React.ReactNode
}

export function GradientButton({
  children,
  href,
  onClick,
  variant = 'primary',
  className,
  icon,
}: GradientButtonProps) {
  const baseStyles =
    'inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-sm uppercase tracking-wide transition-all duration-150 ease-in-out active:scale-95'

  const variants = {
    primary:
      'bg-gradient-to-br from-primary to-primary-container text-on-primary shadow-lg shadow-primary/20 hover:shadow-glow-primary',
    secondary:
      'bg-transparent text-on-surface hover:bg-surface-container-low border border-outline-variant/30',
  }

  const classes = cn(baseStyles, variants[variant], className)

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
        {icon}
      </Link>
    )
  }

  return (
    <button onClick={onClick} className={classes}>
      {children}
      {icon}
    </button>
  )
}
