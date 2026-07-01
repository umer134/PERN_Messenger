export const tokens = {
  color: {
    bg: '#09090B',
    surface: '#111113',
    surface2: '#18181B',

    border: '#27272A',

    text: '#FAFAFA',
    textSecondary: '#A1A1AA',

    primary: '#FFFFFF',
    primaryText: '#09090B',

    danger: '#EF4444',

    inputBg: '#0F0F10',
    inputBorder: '#27272A',
    inputFocus: '#3B82F6',
  },

  layout: {
    sidebar: '320px',
    mobileHeader: '56px',
  },

  spacing: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    xxl: '32px',
  },

  radius: {
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    full: '9999px',
  },

  fontSize: {
    xs: '12px',
    sm: '14px',
    md: '16px',
    lg: '18px',
    xl: '24px',
    xxl: '32px',
  },

  shadow: {
    card: '0 0 0 1px rgba(255, 255, 255, 0.04), 0 8px 30px rgba(0, 0, 0, 0.32)',
  },

  motion: {
    fast: '120ms',
    normal: '180ms',
  },
} as const;
