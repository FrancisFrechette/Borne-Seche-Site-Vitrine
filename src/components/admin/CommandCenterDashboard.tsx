'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@payloadcms/ui'

/* ── Data ── */

const RECENT_ACTIVITY = [
  {
    name: 'Francis F.',
    action: 'published',
    target: 'Page Bornes Sèches',
    time: 'Il y a 2h',
    color: '#16a34a',
  },
  {
    name: 'Admin',
    action: 'updated',
    target: 'Header Navigation',
    time: 'Il y a 5h',
    color: '#2563eb',
  },
  {
    name: 'Francis F.',
    action: 'created',
    target: 'Réalisation Sainte-Julie',
    time: 'Hier',
    color: '#9333ea',
  },
  {
    name: 'Admin',
    action: 'updated',
    target: 'FAQ Conformité NFPA',
    time: 'Hier',
    color: '#2563eb',
  },
  {
    name: 'Francis F.',
    action: 'published',
    target: 'Article Blog Printemps',
    time: '2 jours',
    color: '#16a34a',
  },
]

const QUICK_ACTIONS = [
  {
    name: 'Services',
    desc: 'Bornes, réservoirs, pompes',
    href: '/admin/collections/services',
    icon: 'build',
  },
  {
    name: 'Réalisations',
    desc: 'Projets municipaux',
    href: '/admin/collections/realisations',
    icon: 'engineering',
  },
  { name: 'FAQ', desc: 'Questions fréquentes', href: '/admin/collections/faq', icon: 'quiz' },
  { name: 'Pages', desc: 'Contenus éditoriaux', href: '/admin/collections/pages', icon: 'article' },
  {
    name: 'Médias',
    desc: 'Images & fichiers',
    href: '/admin/collections/media',
    icon: 'perm_media',
  },
  {
    name: 'Demandes',
    desc: 'Soumissions reçues',
    href: '/admin/collections/inquiries',
    icon: 'mail',
  },
]

const GLOBAL_EDITS = [
  { name: 'Accueil', desc: 'Hero, stats, vidéo, CTA', href: '/admin/globals/home', icon: 'home' },
  { name: 'Header', desc: 'Navigation & CTA', href: '/admin/globals/header', icon: 'menu' },
  {
    name: 'Footer',
    desc: 'Coordonnées & liens',
    href: '/admin/globals/footer',
    icon: 'bottom_navigation',
  },
  { name: 'À propos', desc: 'Histoire & valeurs', href: '/admin/globals/about', icon: 'info' },
]

/* ── Bar chart data (simulated weekly visitors) ── */
const BAR_DATA = [
  { label: 'Lun', value: 65 },
  { label: 'Mar', value: 82 },
  { label: 'Mer', value: 58 },
  { label: 'Jeu', value: 91 },
  { label: 'Ven', value: 76 },
  { label: 'Sam', value: 42 },
  { label: 'Dim', value: 35 },
]

/* ── Helpers ── */

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

/* ── Donut Chart (SVG) ── */

const DonutChart: React.FC<{ percentage: number }> = ({ percentage }) => {
  const radius = 54
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (percentage / 100) * circumference

  return (
    <svg width="130" height="130" viewBox="0 0 130 130" className="bento-donut">
      <circle
        cx="65"
        cy="65"
        r={radius}
        fill="none"
        stroke="rgba(218,41,28,0.1)"
        strokeWidth="12"
      />
      <circle
        cx="65"
        cy="65"
        r={radius}
        fill="none"
        stroke="url(#donutGrad)"
        strokeWidth="12"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        transform="rotate(-90 65 65)"
        style={{ transition: 'stroke-dashoffset 1s ease' }}
      />
      <defs>
        <linearGradient id="donutGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#da291c" />
          <stop offset="100%" stopColor="#ffb4a8" />
        </linearGradient>
      </defs>
      <text
        x="65"
        y="60"
        textAnchor="middle"
        fontSize="24"
        fontWeight="900"
        fill="#2c2c39"
        style={{ fontFamily: 'Manrope, system-ui, sans-serif' }}
      >
        {percentage}%
      </text>
      <text
        x="65"
        y="78"
        textAnchor="middle"
        fontSize="10"
        fill="#6b7280"
        style={{
          fontFamily: 'Inter, system-ui, sans-serif',
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
        }}
      >
        conversion
      </text>
    </svg>
  )
}

/* ── Bar Chart (SVG) ── */

const BarChart: React.FC = () => {
  const maxVal = Math.max(...BAR_DATA.map((d) => d.value))
  const barW = 28
  const gap = 12
  const chartH = 100
  const totalW = BAR_DATA.length * (barW + gap) - gap

  return (
    <svg
      width={totalW}
      height={chartH + 20}
      viewBox={`0 0 ${totalW} ${chartH + 20}`}
      className="bento-bars"
    >
      <defs>
        <linearGradient id="barGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#da291c" />
          <stop offset="100%" stopColor="#ffb4a8" />
        </linearGradient>
      </defs>
      {BAR_DATA.map((d, i) => {
        const h = (d.value / maxVal) * chartH
        const x = i * (barW + gap)
        const y = chartH - h
        return (
          <g key={d.label}>
            <rect
              x={x}
              y={y}
              width={barW}
              height={h}
              rx="6"
              fill="url(#barGrad)"
              opacity={0.7 + (d.value / maxVal) * 0.3}
            />
            <text
              x={x + barW / 2}
              y={chartH + 14}
              textAnchor="middle"
              fontSize="9"
              fill="#6b7280"
              style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
            >
              {d.label}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

/* ── Material Symbol helper ── */

const MIcon: React.FC<{ name: string; size?: number; color?: string }> = ({
  name,
  size = 20,
  color,
}) => (
  <span className="material-symbols-outlined" style={{ fontSize: size, color, lineHeight: 1 }}>
    {name}
  </span>
)

/* ── Main Component ── */

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
    <div className="bento-dashboard">
      {/* ── Hero Banner ── */}
      <div className="bento-hero">
        <div className="bento-hero__badge">
          <span className="bento-hero__pulse" />
          Système Opérationnel
        </div>
        <h1 className="bento-hero__greeting">
          {greeting}, <span>{displayName}</span>
        </h1>
        <p className="bento-hero__date">{date}</p>
      </div>

      {/* ── Bento Grid: Row 1 — Charts ── */}
      <div className="bento-grid bento-grid--2col">
        {/* Form Submissions — Donut */}
        <div className="bento-card">
          <div className="bento-card__header">
            <MIcon name="donut_large" size={18} color="#da291c" />
            <span className="bento-card__title">Form Submissions</span>
          </div>
          <div
            className="bento-card__body"
            style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}
          >
            <DonutChart percentage={72} />
            <div>
              <div className="bento-kpi">
                <span className="bento-kpi__value">428</span>
                <span className="bento-kpi__label">Nouvelles entrées</span>
              </div>
              <div className="bento-kpi" style={{ marginTop: '0.75rem' }}>
                <span className="bento-kpi__value">312</span>
                <span className="bento-kpi__label">Qualifiées</span>
              </div>
            </div>
          </div>
        </div>

        {/* Site Visitors — Bars */}
        <div className="bento-card">
          <div className="bento-card__header">
            <MIcon name="monitoring" size={18} color="#da291c" />
            <span className="bento-card__title">Site Visitors</span>
            <span className="bento-card__tag">Cette semaine</span>
          </div>
          <div className="bento-card__body" style={{ display: 'flex', justifyContent: 'center' }}>
            <BarChart />
          </div>
        </div>
      </div>

      {/* ── Bento Grid: Row 2 — Quick Edit + Activity ── */}
      <div className="bento-grid bento-grid--2col">
        {/* Quick Edit Card */}
        <div className="bento-card bento-card--priority">
          <div className="bento-card__header">
            <MIcon name="edit_note" size={18} color="#da291c" />
            <span className="bento-card__title">Quick Edit</span>
            <span className="bento-card__tag bento-card__tag--draft">Draft</span>
          </div>
          <div className="bento-card__body">
            <div className="bento-draft">
              <div className="bento-draft__preview">
                <MIcon name="water_drop" size={32} color="#da291c" />
              </div>
              <div className="bento-draft__info">
                <div className="bento-draft__title">Bornes Sèches — Page Service</div>
                <div className="bento-draft__meta">
                  Dernière modification il y a 2h par Francis F.
                </div>
                <div className="bento-draft__team">
                  <div className="bento-avatar" style={{ background: '#da291c' }}>
                    F
                  </div>
                  <div className="bento-avatar" style={{ background: '#2563eb' }}>
                    A
                  </div>
                </div>
              </div>
            </div>
            <Link href="/admin/collections/services" className="bento-btn-primary">
              Jump to Page Editor
              <MIcon name="arrow_forward" size={16} />
            </Link>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bento-card">
          <div className="bento-card__header">
            <MIcon name="history" size={18} color="#da291c" />
            <span className="bento-card__title">Recent Activity</span>
          </div>
          <div className="bento-card__body bento-card__body--flush">
            {RECENT_ACTIVITY.map((item, i) => (
              <div className="bento-activity-row" key={i}>
                <div className="bento-avatar bento-avatar--sm" style={{ background: item.color }}>
                  {item.name[0]}
                </div>
                <div className="bento-activity-row__text">
                  <strong>{item.name}</strong>{' '}
                  <span className="bento-activity-row__action">{item.action}</span> {item.target}
                </div>
                <span className="bento-activity-row__time">{item.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bento Grid: Row 3 — System Health + DB Storage ── */}
      <div className="bento-grid bento-grid--2col">
        <div className="bento-card bento-card--compact">
          <div className="bento-card__header">
            <MIcon name="monitor_heart" size={18} color="#16a34a" />
            <span className="bento-card__title">System Health</span>
          </div>
          <div
            className="bento-card__body"
            style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}
          >
            <span className="bento-big-number" style={{ color: '#16a34a' }}>
              99.98%
            </span>
            <span className="bento-big-label">uptime</span>
          </div>
          <div className="bento-card__footer">
            <span className="bento-pill bento-pill--green">Payload v3.0</span>
            <span className="bento-pill bento-pill--green">Next.js 15</span>
            <span className="bento-pill bento-pill--green">Vercel</span>
          </div>
        </div>

        <div className="bento-card bento-card--compact">
          <div className="bento-card__header">
            <MIcon name="database" size={18} color="#2563eb" />
            <span className="bento-card__title">DB Storage</span>
          </div>
          <div
            className="bento-card__body"
            style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}
          >
            <span className="bento-big-number" style={{ color: '#2563eb' }}>
              1.2 GB
            </span>
            <span className="bento-big-label">/ 5 GB</span>
          </div>
          <div className="bento-storage-bar">
            <div className="bento-storage-bar__fill" style={{ width: '24%' }} />
          </div>
          <div className="bento-card__footer">
            <span className="bento-pill bento-pill--blue">MongoDB Atlas</span>
            <span className="bento-pill bento-pill--blue">FR + EN</span>
          </div>
        </div>
      </div>

      {/* ── Bento Grid: Row 4 — Collections + Globals ── */}
      <div className="bento-section-label">Collections</div>
      <div className="bento-grid bento-grid--3col">
        {QUICK_ACTIONS.map((a) => (
          <Link key={a.href} href={a.href} className="bento-nav-card">
            <MIcon name={a.icon} size={22} color="#da291c" />
            <div className="bento-nav-card__text">
              <div className="bento-nav-card__name">{a.name}</div>
              <div className="bento-nav-card__desc">{a.desc}</div>
            </div>
            <MIcon name="chevron_right" size={18} color="#a4a4af" />
          </Link>
        ))}
      </div>

      <div className="bento-section-label">Globals</div>
      <div className="bento-grid bento-grid--2col">
        {GLOBAL_EDITS.map((a) => (
          <Link key={a.href} href={a.href} className="bento-nav-card">
            <MIcon name={a.icon} size={22} color="#da291c" />
            <div className="bento-nav-card__text">
              <div className="bento-nav-card__name">{a.name}</div>
              <div className="bento-nav-card__desc">{a.desc}</div>
            </div>
            <MIcon name="chevron_right" size={18} color="#a4a4af" />
          </Link>
        ))}
      </div>
    </div>
  )
}

export default CommandCenterDashboard
