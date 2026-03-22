import React from 'react'

const Icon: React.FC = () => {
  return (
    <div
      style={{
        width: '28px',
        height: '28px',
        background: 'linear-gradient(135deg, #da291c 0%, #a91f15 100%)',
        borderRadius: '7px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 2px 8px rgba(218, 41, 28, 0.25)',
      }}
    >
      <span
        style={{
          color: '#ffffff',
          fontSize: '15px',
          fontWeight: 900,
          lineHeight: 1,
          letterSpacing: '-0.02em',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        B
      </span>
    </div>
  )
}

export default Icon
