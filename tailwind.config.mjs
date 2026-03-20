/** @type {import('tailwindcss').Config} */
const config = {
  theme: {
    extend: {
      colors: {
        'on-surface': '#091d2e',
        'on-tertiary-fixed-variant': '#194b66',
        'on-primary-container': '#00414f',
        'on-secondary': '#ffffff',
        background: '#f7f9ff',
        'outline-variant': '#bcc9ce',
        error: '#ba1a1a',
        'secondary-container': '#a3d4fe',
        'inverse-surface': '#203243',
        'surface-variant': '#d1e4fb',
        'on-error-container': '#93000a',
        'tertiary-fixed-dim': '#9fccec',
        'surface-container-low': '#edf4ff',
        'primary-container': '#00b4d8',
        'primary-fixed': '#b3ebff',
        'on-tertiary-container': '#063f5a',
        'surface-bright': '#f7f9ff',
        'on-secondary-container': '#275c81',
        'surface-container': '#e3efff',
        'surface-container-highest': '#d1e4fb',
        'on-error': '#ffffff',
        'surface-container-lowest': '#ffffff',
        'inverse-on-surface': '#e8f2ff',
        'secondary-fixed-dim': '#9bccf6',
        'tertiary-container': '#7eabc9',
        'on-primary-fixed': '#001f27',
        'tertiary-fixed': '#c6e7ff',
        'on-secondary-fixed-variant': '#0e4b6e',
        'on-background': '#091d2e',
        outline: '#6d797e',
        'surface-container-high': '#d9eaff',
        'on-surface-variant': '#3d494d',
        'surface-dim': '#c9dcf3',
        'inverse-primary': '#4cd6fb',
        'error-container': '#ffdad6',
        tertiary: '#35637f',
        'on-primary': '#ffffff',
        'primary-fixed-dim': '#4cd6fb',
        'on-primary-fixed-variant': '#004e5f',
        'surface-tint': '#00677d',
        'secondary-fixed': '#cbe6ff',
        secondary: '#2f6388',
        'on-secondary-fixed': '#001e30',
        surface: '#f7f9ff',
        primary: '#00677d',
        'on-tertiary': '#ffffff',
        'on-tertiary-fixed': '#001e2e',
      },
      fontFamily: {
        headline: ['var(--font-inter)', 'Inter', 'sans-serif'],
        body: ['var(--font-inter)', 'Inter', 'sans-serif'],
        label: ['var(--font-work-sans)', 'Work Sans', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '0.125rem',
        sm: '0.25rem',
        md: '0.375rem',
        lg: '0.5rem',
        xl: '0.75rem',
      },
      boxShadow: {
        ambient: '0 20px 40px rgba(9, 29, 46, 0.06)',
        'glow-primary': '0 8px 30px rgba(0, 103, 125, 0.25)',
      },
      typography: () => ({
        DEFAULT: {
          css: [
            {
              '--tw-prose-body': '#091d2e',
              '--tw-prose-headings': '#091d2e',
              h1: {
                fontWeight: '900',
                letterSpacing: '-0.02em',
                marginBottom: '0.25em',
              },
            },
          ],
        },
        base: {
          css: [
            {
              h1: {
                fontSize: '2.5rem',
              },
              h2: {
                fontSize: '1.25rem',
                fontWeight: 600,
              },
            },
          ],
        },
        md: {
          css: [
            {
              h1: {
                fontSize: '3.5rem',
              },
              h2: {
                fontSize: '1.5rem',
              },
            },
          ],
        },
      }),
    },
  },
}

export default config
