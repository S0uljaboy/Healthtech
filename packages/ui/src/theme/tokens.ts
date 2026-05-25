export const themeTokens = {
  colors: {
    // Dark first foundation
    background: 'hsl(240 10% 3.9%)',
    foreground: 'hsl(0 0% 98%)',
    
    // Semantic
    primary: {
      DEFAULT: 'hsl(0 0% 98%)',
      foreground: 'hsl(240 5.9% 10%)',
      muted: 'hsl(0 0% 98% / 0.8)',
    },
    secondary: {
      DEFAULT: 'hsl(240 3.7% 15.9%)',
      foreground: 'hsl(0 0% 98%)',
    },
    muted: {
      DEFAULT: 'hsl(240 3.7% 15.9%)',
      foreground: 'hsl(240 5% 64.9%)',
    },
    accent: {
      DEFAULT: 'hsl(240 3.7% 15.9%)',
      foreground: 'hsl(0 0% 98%)',
    },
    
    // Borders & UI
    border: 'hsl(240 3.7% 15.9%)',
    input: 'hsl(240 3.7% 15.9%)',
    ring: 'hsl(240 4.9% 83.9%)',

    // Risk Colors (HealthTech Specific)
    risk: {
      critical: 'hsl(0 84.2% 60.2%)', // Red
      high: 'hsl(24.6 95% 53.1%)',     // Orange
      medium: 'hsl(47.9 95.8% 53.1%)', // Yellow
      low: 'hsl(142.1 76.2% 36.3%)',   // Green
      neutral: 'hsl(240 5% 64.9%)',    // Gray
    }
  },
  typography: {
    fonts: {
      sans: 'var(--font-inter)',
    },
    sizes: {
      display: ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
      h1: ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
      h2: ['1.875rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
      h3: ['1.5rem', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
      body: ['1rem', { lineHeight: '1.5' }],
      caption: ['0.875rem', { lineHeight: '1.4' }],
      small: ['0.75rem', { lineHeight: '1.4' }],
    }
  },
  radius: {
    sm: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    elevation: '0 0 0 1px hsl(240 3.7% 15.9%), 0 4px 6px -1px rgb(0 0 0 / 0.1)', // Linear style subtle border + shadow
  },
  motion: {
    spring: {
      gentle: { type: 'spring', stiffness: 100, damping: 15 },
      bouncy: { type: 'spring', stiffness: 200, damping: 10 },
      stiff: { type: 'spring', stiffness: 300, damping: 25 },
    },
    timing: {
      fast: '150ms',
      normal: '250ms',
      slow: '400ms',
    }
  }
};
