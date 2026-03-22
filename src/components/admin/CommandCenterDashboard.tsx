'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@payloadcms/ui'

/* ══════════════════════════════════════════════
   Inline SVG Icons (no external font dependency)
   ══════════════════════════════════════════════ */

const icons = {
  donut: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2a10 10 0 0 1 10 10h-10z" />
      <circle cx="12" cy="12" r="10" />
    </svg>
  ),
  barChart: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="12" width="4" height="9" rx="1" />
      <rect x="10" y="7" width="4" height="14" rx="1" />
      <rect x="17" y="3" width="4" height="18" rx="1" />
    </svg>
  ),
  edit: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 20h9" />
      <path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z" />
    </svg>
  ),
  clock: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  heart: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001z" />
    </svg>
  ),
  database: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" />
      <path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3" />
    </svg>
  ),
  droplet: (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5S5 13 5 15a7 7 0 0 0 7 7z" />
    </svg>
  ),
  arrowRight: (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  ),
  chevronRight: (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  ),
  wrench: (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  ),
  hardhat: (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 18a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v2z" />
      <path d="M10 15V6.5a3.5 3.5 0 0 1 7 0v.5" />
      <path d="M7 15v-3a6 6 0 0 1 12 0v3" />
    </svg>
  ),
  helpCircle: (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <path d="M12 17h.01" />
    </svg>
  ),
  fileText: (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  ),
  image: (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
      <circle cx="9" cy="9" r="2" />
      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
    </svg>
  ),
  mail: (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  ),
  home: (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
      <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    </svg>
  ),
  menu: (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  ),
  footer: (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M3 15h18" />
    </svg>
  ),
  info: (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  ),
}

/* ── Data ── */

const RECENT_ACTIVITY = [
  {
    name: 'Francis F.',
    action: 'a publié',
    target: 'Page Bornes Sèches',
    time: 'Il y a 2h',
    color: '#16a34a',
  },
  {
    name: 'Admin',
    action: 'a mis à jour',
    target: 'Navigation En-tête',
    time: 'Il y a 5h',
    color: '#2563eb',
  },
  {
    name: 'Francis F.',
    action: 'a créé',
    target: 'Réalisation Sainte-Julie',
    time: 'Hier',
    color: '#9333ea',
  },
  {
    name: 'Admin',
    action: 'a mis à jour',
    target: 'FAQ Conformité NFPA',
    time: 'Hier',
    color: '#2563eb',
  },
  {
    name: 'Francis F.',
    action: 'a publié',
    target: 'Article Blog Printemps',
    time: '2 jours',
    color: '#16a34a',
  },
]

const QUICK_ACTIONS: { name: string; desc: string; href: string; icon: React.ReactNode }[] = [
  {
    name: 'Services',
    desc: 'Bornes, réservoirs, pompes',
    href: '/admin/collections/services',
    icon: icons.wrench,
  },
  {
    name: 'Réalisations',
    desc: 'Projets municipaux',
    href: '/admin/collections/realisations',
    icon: icons.hardhat,
  },
  {
    name: 'FAQ',
    desc: 'Questions fréquentes',
    href: '/admin/collections/faq',
    icon: icons.helpCircle,
  },
  {
    name: 'Pages',
    desc: 'Contenus éditoriaux',
    href: '/admin/collections/pages',
    icon: icons.fileText,
  },
  {
    name: 'Médias',
    desc: 'Images & fichiers',
    href: '/admin/collections/media',
    icon: icons.image,
  },
  {
    name: 'Demandes',
    desc: 'Soumissions reçues',
    href: '/admin/collections/inquiries',
    icon: icons.mail,
  },
]

const GLOBAL_EDITS: { name: string; desc: string; href: string; icon: React.ReactNode }[] = [
  {
    name: 'Accueil',
    desc: 'Hero, stats, vidéo, CTA',
    href: '/admin/globals/home',
    icon: icons.home,
  },
  { name: 'En-tête', desc: 'Navigation & CTA', href: '/admin/globals/header', icon: icons.menu },
  {
    name: 'Pied de page',
    desc: 'Coordonnées & liens',
    href: '/admin/globals/footer',
    icon: icons.footer,
  },
  { name: 'À propos', desc: 'Histoire & valeurs', href: '/admin/globals/about', icon: icons.info },
]

/* ── Bar chart data ── */
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
    <svg width="130" height="130" viewBox="0 0 130 130">
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
        style={{ fontFamily: "'Manrope', system-ui, sans-serif" }}
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
          fontFamily: "'Inter', system-ui, sans-serif",
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
    <svg width={totalW} height={chartH + 20} viewBox={`0 0 ${totalW} ${chartH + 20}`}>
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
              style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
            >
              {d.label}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

/* ── Icon wrapper ── */

const IconWrap: React.FC<{ children: React.ReactNode; color?: string }> = ({
  children,
  color = '#da291c',
}) => (
  <span
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      color,
      flexShrink: 0,
    }}
  >
    {children}
  </span>
)

/* ══════════════════════════════════════════════
   Main Component
   ══════════════════════════════════════════════ */

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

      {/* ── Row 1 — Soumissions + Visiteurs ── */}
      <div className="bento-grid bento-grid--2col">
        <div className="bento-card">
          <div className="bento-card__header">
            <IconWrap>{icons.donut}</IconWrap>
            <span className="bento-card__title">Soumissions de formulaires</span>
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

        <div className="bento-card">
          <div className="bento-card__header">
            <IconWrap>{icons.barChart}</IconWrap>
            <span className="bento-card__title">Visiteurs du site</span>
            <span className="bento-card__tag">7 derniers jours</span>
          </div>
          <div className="bento-card__body" style={{ display: 'flex', justifyContent: 'center' }}>
            <BarChart />
          </div>
        </div>
      </div>

      {/* ── Row 2 — Édition rapide + Activité ── */}
      <div className="bento-grid bento-grid--2col">
        <div className="bento-card bento-card--priority">
          <div className="bento-card__header">
            <IconWrap>{icons.edit}</IconWrap>
            <span className="bento-card__title">Édition rapide</span>
            <span className="bento-card__tag bento-card__tag--draft">Brouillon prioritaire</span>
          </div>
          <div className="bento-card__body">
            <div className="bento-draft">
              <div className="bento-draft__preview">
                <IconWrap color="#da291c">{icons.droplet}</IconWrap>
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
              Aller à l&apos;éditeur de page
              {icons.arrowRight}
            </Link>
          </div>
        </div>

        <div className="bento-card">
          <div className="bento-card__header">
            <IconWrap>{icons.clock}</IconWrap>
            <span className="bento-card__title">Activité récente</span>
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

      {/* ── Row 3 — Santé système + Stockage BD ── */}
      <div className="bento-grid bento-grid--2col">
        <div className="bento-card bento-card--compact">
          <div className="bento-card__header">
            <IconWrap color="#16a34a">{icons.heart}</IconWrap>
            <span className="bento-card__title">Santé du système</span>
          </div>
          <div
            className="bento-card__body"
            style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}
          >
            <span className="bento-big-number" style={{ color: '#16a34a' }}>
              99.98%
            </span>
            <span className="bento-big-label">disponibilité</span>
          </div>
          <div className="bento-card__footer">
            <span className="bento-pill bento-pill--green">Payload v3.0</span>
            <span className="bento-pill bento-pill--green">Next.js 15</span>
            <span className="bento-pill bento-pill--green">Vercel</span>
          </div>
        </div>

        <div className="bento-card bento-card--compact">
          <div className="bento-card__header">
            <IconWrap color="#2563eb">{icons.database}</IconWrap>
            <span className="bento-card__title">Stockage de la base de données</span>
          </div>
          <div
            className="bento-card__body"
            style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}
          >
            <span className="bento-big-number" style={{ color: '#2563eb' }}>
              1.2 Go
            </span>
            <span className="bento-big-label">/ 5 Go</span>
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

      {/* ── Row 4 — Collections + Globals ── */}
      <div className="bento-section-label">Collections</div>
      <div className="bento-grid bento-grid--3col">
        {QUICK_ACTIONS.map((a) => (
          <Link key={a.href} href={a.href} className="bento-nav-card">
            <IconWrap>{a.icon}</IconWrap>
            <div className="bento-nav-card__text">
              <div className="bento-nav-card__name">{a.name}</div>
              <div className="bento-nav-card__desc">{a.desc}</div>
            </div>
            <span className="bento-nav-card__chevron">{icons.chevronRight}</span>
          </Link>
        ))}
      </div>

      <div className="bento-section-label">Globals</div>
      <div className="bento-grid bento-grid--2col">
        {GLOBAL_EDITS.map((a) => (
          <Link key={a.href} href={a.href} className="bento-nav-card">
            <IconWrap>{a.icon}</IconWrap>
            <div className="bento-nav-card__text">
              <div className="bento-nav-card__name">{a.name}</div>
              <div className="bento-nav-card__desc">{a.desc}</div>
            </div>
            <span className="bento-nav-card__chevron">{icons.chevronRight}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default CommandCenterDashboard
