import React from 'react'

const Logo: React.FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '4px 0',
      }}
    >
      <span
        style={{
          fontSize: '26px',
          fontWeight: 900,
          color: '#da291c',
          letterSpacing: '0.08em',
          lineHeight: 1,
          fontFamily: "'Manrope', system-ui, -apple-system, sans-serif",
          textTransform: 'uppercase' as const,
        }}
      >
        BOURGELAS
      </span>
    </div>
  )
}

export default Logo
