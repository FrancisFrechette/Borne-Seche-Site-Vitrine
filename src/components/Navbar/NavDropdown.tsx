'use client'

import React, { useState, useRef } from 'react'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/utilities/ui'

interface NavDropdownProps {
  label: string
  href: string
  items: { label: string; href: string }[]
}

export function NavDropdown({ label, href, items }: NavDropdownProps) {
  const [open, setOpen] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setOpen(true)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 150)
  }

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        href={href}
        className="text-on-surface-variant hover:text-primary-container transition-colors inline-flex items-center gap-1"
      >
        {label}
        {items.length > 0 && (
          <ChevronDown
            className={cn(
              'w-3.5 h-3.5 transition-transform duration-200',
              open && 'rotate-180',
            )}
          />
        )}
      </Link>

      {open && items.length > 0 && (
        <div className="absolute top-full left-0 pt-2 min-w-[240px] z-50">
          <div className="bg-white rounded-lg shadow-xl shadow-on-surface/10 border border-outline-variant/10 py-2 overflow-hidden">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-5 py-2.5 text-sm normal-case font-medium text-on-surface-variant hover:text-primary-container hover:bg-surface-container-low transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
