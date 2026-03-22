'use client'

import React, { useState } from 'react'
import type { Locale } from '@/i18n/locales'
import type { Dictionary } from '@/i18n/getDictionary'

interface ContactFormProps {
  locale: Locale
  dict: Dictionary
}

export default function ContactForm({ locale, dict }: ContactFormProps) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const f = dict.contact.form

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('submitting')

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get('name') as string,
      organization: formData.get('organization') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      sector: formData.get('sector') as string,
      message: formData.get('message') as string,
      locale,
    }

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (res.ok) {
        setStatus('success')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 rounded-full bg-primary-container/20 flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-8 h-8 text-primary-container"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="text-xl text-on-surface font-headline font-bold">{f.success}</p>
      </div>
    )
  }

  const inputClass =
    'w-full bg-surface-container-lowest border-0 border-b-2 border-outline-variant/30 focus:border-primary-container focus:ring-0 px-0 py-3 text-on-surface placeholder:text-outline-variant/60 transition-colors font-body'

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
      <div className="flex flex-col">
        <label className="font-label text-xs font-semibold text-outline uppercase mb-2">
          {f.name}
        </label>
        <input
          name="name"
          type="text"
          required
          placeholder={f.namePlaceholder}
          className={inputClass}
        />
      </div>

      <div className="flex flex-col">
        <label className="font-label text-xs font-semibold text-outline uppercase mb-2">
          {f.organization}
        </label>
        <input
          name="organization"
          type="text"
          placeholder={f.organizationPlaceholder}
          className={inputClass}
        />
      </div>

      <div className="flex flex-col">
        <label className="font-label text-xs font-semibold text-outline uppercase mb-2">
          {f.email}
        </label>
        <input
          name="email"
          type="email"
          required
          placeholder={f.emailPlaceholder}
          className={inputClass}
        />
      </div>

      <div className="flex flex-col">
        <label className="font-label text-xs font-semibold text-outline uppercase mb-2">
          {f.phone}
        </label>
        <input name="phone" type="tel" placeholder={f.phonePlaceholder} className={inputClass} />
      </div>

      <div className="flex flex-col">
        <label className="font-label text-xs font-semibold text-outline uppercase mb-2">
          {f.sector}
        </label>
        <select name="sector" className={inputClass}>
          {f.sectorOptions.map((opt) => (
            <option key={opt} value={opt.toLowerCase()}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      <div className="md:col-span-2 flex flex-col">
        <label className="font-label text-xs font-semibold text-outline uppercase mb-2">
          {f.message}
        </label>
        <textarea
          name="message"
          required
          rows={4}
          placeholder={f.messagePlaceholder}
          className={`${inputClass} resize-none`}
        />
      </div>

      <div className="md:col-span-2 flex justify-center mt-6">
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="primary-gradient text-white px-12 py-5 rounded-xl font-headline font-bold text-lg hover:shadow-[0_0_30px_rgba(0,180,216,0.5)] transition-all disabled:opacity-50"
        >
          {status === 'submitting' ? '...' : f.submit}
        </button>
      </div>

      {status === 'error' && (
        <div className="md:col-span-2 text-center text-error text-sm">
          {locale === 'fr'
            ? 'Une erreur est survenue. Veuillez réessayer.'
            : 'An error occurred. Please try again.'}
        </div>
      )}
    </form>
  )
}
