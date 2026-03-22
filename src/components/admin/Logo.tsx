import React from 'react'

const Logo: React.FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
      }}
    >
      <div
        style={{
          width: '42px',
          height: '42px',
          background: 'linear-gradient(135deg, #da291c 0%, #a91f15 100%)',
          borderRadius: '10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(218, 41, 28, 0.3)',
        }}
      >
        <span
          style={{
            color: '#ffffff',
            fontSize: '22px',
            fontWeight: 900,
            lineHeight: 1,
            letterSpacing: '-0.02em',
            fontFamily: "'Manrope', system-ui, -apple-system, sans-serif",
          }}
        >
          B
        </span>
      </div>
      <div>
        <div
          style={{
            fontSize: '18px',
            fontWeight: 900,
            color: '#2c2c39',
            letterSpacing: '0.06em',
            lineHeight: 1.1,
            fontFamily: "'Manrope', system-ui, -apple-system, sans-serif",
            textTransform: 'uppercase' as const,
          }}
        >
          BOURGELAS
        </div>
        <div
          style={{
            fontSize: '9px',
            fontWeight: 600,
            color: '#6b7280',
            letterSpacing: '0.15em',
            textTransform: 'uppercase' as const,
            fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
          }}
        >
          Command Center
        </div>
      </div>
    </div>
  )
}

export default Logo
