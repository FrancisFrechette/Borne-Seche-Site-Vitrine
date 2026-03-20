'use client'

import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface FaqAccordionProps {
  question: string
  children: React.ReactNode
}

export function FaqAccordion({ question, children }: FaqAccordionProps) {
  const [open, setOpen] = useState(false)

  return (
    <div className="bg-surface-container-low rounded-xl overflow-hidden transition-all duration-500 shadow-[0_20px_40px_rgba(9,29,46,0.06)]">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full p-8 flex justify-between items-center cursor-pointer text-left"
        aria-expanded={open}
      >
        <h3 className="font-headline font-bold text-lg text-on-surface pr-4">{question}</h3>
        <ChevronDown
          className={`w-5 h-5 text-primary flex-shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <div
        className={`grid transition-all duration-500 ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
      >
        <div className="overflow-hidden">
          <div className="bg-surface-container-lowest p-8 pt-4">{children}</div>
        </div>
      </div>
    </div>
  )
}
