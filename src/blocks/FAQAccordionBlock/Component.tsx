'use client'

import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/utilities/ui'

interface FAQItem {
  question: string
  answer: string
}

interface FAQAccordionBlockComponentProps {
  heading?: string | null
  description?: string | null
  items?: {
    question: string
    answer: unknown
    id?: string | null
  }[] | null
}

export const FAQAccordionBlockComponent: React.FC<FAQAccordionBlockComponentProps> = ({
  heading,
  description,
  items,
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  if (!items || items.length === 0) return null

  return (
    <section className="py-24 px-8 bg-surface">
      <div className="max-w-4xl mx-auto">
        {(heading || description) && (
          <div className="mb-12 text-center">
            {heading && (
              <>
                <h2 className="text-3xl font-black font-headline text-on-surface">{heading}</h2>
                <div className="h-[2px] w-[60px] bg-primary-container mt-4 mx-auto" aria-hidden="true" />
              </>
            )}
            {description && (
              <p className="text-on-surface-variant mt-4 max-w-2xl mx-auto">{description}</p>
            )}
          </div>
        )}
        <div className="space-y-3">
          {items.map((item, i) => {
            const isOpen = openIndex === i
            const answerText =
              typeof item.answer === 'string'
                ? item.answer
                : item.answer &&
                    typeof item.answer === 'object' &&
                    'root' in (item.answer as Record<string, unknown>)
                  ? extractTextFromLexical(item.answer)
                  : ''

            return (
              <div
                key={item.id || i}
                className="bg-surface-container-lowest rounded-md shadow-sm overflow-hidden"
              >
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-surface-container-low transition-colors"
                >
                  <span className="font-headline font-bold text-on-surface pr-4">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={cn(
                      'w-5 h-5 text-primary-container shrink-0 transition-transform duration-200',
                      isOpen && 'rotate-180',
                    )}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 text-on-surface-variant leading-relaxed">
                    {answerText}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function extractTextFromLexical(data: unknown): string {
  if (!data || typeof data !== 'object') return ''
  const root = (data as Record<string, unknown>).root
  if (!root || typeof root !== 'object') return ''
  const children = (root as Record<string, unknown>).children
  if (!Array.isArray(children)) return ''

  return children
    .map((node: Record<string, unknown>) => {
      if (node.type === 'paragraph' && Array.isArray(node.children)) {
        return node.children
          .map((child: Record<string, unknown>) => (child.text as string) || '')
          .join('')
      }
      return ''
    })
    .filter(Boolean)
    .join('\n')
}
