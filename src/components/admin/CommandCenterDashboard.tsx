'use client'

import React, { useEffect, useState } from 'react'
import { useAuth } from '@payloadcms/ui'

const QUICK_ACTIONS = [
  {
    name: 'Services',
    desc: 'Bornes sèches, réservoirs, pompes',
    href: '/admin/collections/services',
    icon: '🔧',
    color: 'red' as const,
  },
  {
    name: 'Réalisations',
    desc: 'Projets municipaux & agricoles',
    href: '/admin/collections/realisations',
    icon: '📐',
    color: 'blue' as const,
  },
  {
    name: 'FAQ',
    desc: 'Questions techniques fréquentes',
    href: '/admin/collections/faq',
    icon: '💬',
    color: 'green' as const,
  },
  {
    name: 'Pages',
    desc: 'Contenus éditoriaux du site',
    href: '/admin/collections/pages',
    icon: '📄',
    color: 'purple' as const,
  },
  {
    name: 'Médias',
    desc: 'Images, documents, fichiers',
    href: '/admin/collections/media',
    icon: '🖼️',
    color: 'amber' as const,
  },
  {
    name: 'Demandes',
    desc: 'Soumissions reçues via le site',
    href: '/admin/collections/inquiries',
    icon: '📨',
    color: 'red' as const,
  },
]

const GLOBAL_EDITS = [
  {
    name: 'Page d\'accueil',
    desc: 'Hero, stats, vidéo, CTA',
    href: '/admin/globals/home',
    icon: '🏠',
    color: 'red' as const,
  },
  {
    name: 'Header',
    desc: 'Navigation & bouton CTA',
    href: '/admin/globals/header',
    icon: '🧭',
    color: 'blue' as const,
  },
  {
    name: 'Footer',
    desc: 'Coordonnées & liens',
    href: '/admin/globals/footer',
    icon: '🦶',
    color: 'green' as const,
  },
  {
    name: 'À propos',
    desc: 'Histoire & valeurs',
    href: '/admin/globals/about',
    icon: '📖',
    color: 'purple' as const,
  },
]

function getGreeting(): string {
  const hour = new Date().getHours()
  if (hour < 12) return 'Bonjour'
  if (hour < 18) return 'Bon après-midi'
  return 'Bonsoir'
}

function getFormattedDate(): string {
  return new Date().toLocaleDateString('fr-CA', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

const CommandCenterDashboard: React.FC = () => {
  const { user } = useAuth()
  const [greeting, setGreeting] = useState(getGreeting())
  const [date, setDate] = useState(getFormattedDate())

  useEffect(() => {
    setGreeting(getGreeting())
    setDate(getFormattedDate())
  }, [])

  const displayName = (user as Record<string, unknown>)?.name
    ? String((user as Record<string, unknown>).name)
    : user?.email?.split('@')[0] || 'Admin'

  return (
    <div className="cc-dashboard">
      {/* Hero */}
      <div className="cc-hero">
        <div className="cc-hero__badge">Système Opérationnel</div>
        <h1 className="cc-hero__greeting">
          {greeting}, <span>{displayName}</span>
        </h1>
        <p className="cc-hero__date">{date}</p>
      </div>

      {/* Stats */}
      <div className="cc-stats">
        <div className="cc-stat-card">
          <div className="cc-stat-card__value cc-stat-card__value--red">30+</div>
          <div className="cc-stat-card__label">Années d&apos;expertise</div>
        </div>
        <div className="cc-stat-card">
          <div className="cc-stat-card__value">300+</div>
          <div className="cc-stat-card__label">Installations</div>
        </div>
        <div className="cc-stat-card">
          <div className="cc-stat-card__value">100%</div>
          <div className="cc-stat-card__label">Conformité NFPA</div>
        </div>
        <div className="cc-stat-card">
          <div className="cc-stat-card__value cc-stat-card__value--red">24/7</div>
          <div className="cc-stat-card__label">Service d&apos;urgence</div>
        </div>
      </div>

      {/* Quick Actions — Collections */}
      <div className="cc-section-title">Collections — Édition rapide</div>
      <div className="cc-actions">
        {QUICK_ACTIONS.map((action) => (
          <a key={action.href} href={action.href} className="cc-action-card">
            <div className={`cc-action-card__icon cc-action-card__icon--${action.color}`}>
              {action.icon}
            </div>
            <div className="cc-action-card__text">
              <div className="cc-action-card__name">{action.name}</div>
              <div className="cc-action-card__desc">{action.desc}</div>
            </div>
            <div className="cc-action-card__arrow">→</div>
          </a>
        ))}
      </div>

      {/* Quick Actions — Globals */}
      <div className="cc-section-title">Globals — Configuration du site</div>
      <div className="cc-actions">
        {GLOBAL_EDITS.map((action) => (
          <a key={action.href} href={action.href} className="cc-action-card">
            <div className={`cc-action-card__icon cc-action-card__icon--${action.color}`}>
              {action.icon}
            </div>
            <div className="cc-action-card__text">
              <div className="cc-action-card__name">{action.name}</div>
              <div className="cc-action-card__desc">{action.desc}</div>
            </div>
            <div className="cc-action-card__arrow">→</div>
          </a>
        ))}
      </div>

      {/* System Status */}
      <div className="cc-section-title">Statut du système</div>
      <div className="cc-status">
        <div className="cc-status-card">
          <div className="cc-status-card__header">
            <div className="cc-status-card__title">Infrastructure</div>
            <div className="cc-status-card__badge cc-status-card__badge--ok">En ligne</div>
          </div>
          <div className="cc-status-card__row">
            <span className="cc-status-card__row-label">CMS Payload</span>
            <span className="cc-status-card__row-value">v3.0</span>
          </div>
          <div className="cc-status-card__row">
            <span className="cc-status-card__row-label">Framework</span>
            <span className="cc-status-card__row-value">Next.js 15</span>
          </div>
          <div className="cc-status-card__row">
            <span className="cc-status-card__row-label">Base de données</span>
            <span className="cc-status-card__row-value">MongoDB Atlas</span>
          </div>
          <div className="cc-status-card__row">
            <span className="cc-status-card__row-label">Hébergement</span>
            <span className="cc-status-card__row-value">Vercel</span>
          </div>
        </div>

        <div className="cc-status-card">
          <div className="cc-status-card__header">
            <div className="cc-status-card__title">Localisation</div>
            <div className="cc-status-card__badge cc-status-card__badge--ok">Bilingue</div>
          </div>
          <div className="cc-status-card__row">
            <span className="cc-status-card__row-label">Langue par défaut</span>
            <span className="cc-status-card__row-value">Français (fr)</span>
          </div>
          <div className="cc-status-card__row">
            <span className="cc-status-card__row-label">Langue secondaire</span>
            <span className="cc-status-card__row-value">English (en)</span>
          </div>
          <div className="cc-status-card__row">
            <span className="cc-status-card__row-label">Fallback</span>
            <span className="cc-status-card__row-value">Activé</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CommandCenterDashboard
