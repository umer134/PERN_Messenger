import { style } from '@vanilla-extract/css';
import { vars } from '@/shared/styles/theme/theme.css';

export const root = style({
  height: 72,

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  padding: '0 16px',

  borderBottom: `1px solid ${vars.color.border}`,
});

export const left = style({
  display: 'flex',
  alignItems: 'center',
  gap: 12,
});

export const avatar = style({
  width: 40,
  height: 40,

  borderRadius: '50%',

  background: vars.color.surface,

  border: `1px solid ${vars.color.border}`,

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const info = style({
  display: 'flex',
  flexDirection: 'column',
});

export const username = style({
  fontWeight: 600,
  fontSize: '14px',
});

export const status = style({
  fontSize: '12px',
  color: vars.color.textSecondary,
});

export const settingsButton = style({
  width: 36,
  height: 36,

  borderRadius: 10,

  border: 'none',

  background: 'transparent',

  cursor: 'pointer',

  color: vars.color.textSecondary,

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const menuWrapper = style({
  position: 'relative',
});

export const menu = style({
  position: 'absolute',

  top: 44,
  right: 0,

  width: 180,

  padding: 6,

  background: vars.color.surface,

  border: `1px solid ${vars.color.border}`,

  borderRadius: 12,

  boxShadow: '0 10px 30px rgba(0,0,0,.15)',

  zIndex: 20,
});

export const menuItem = style({
  width: '100%',

  height: 36,

  padding: '0 12px',

  display: 'flex',
  alignItems: 'center',
  gap: 8,

  border: 'none',

  background: 'transparent',

  color: vars.color.primary,

  cursor: 'pointer',

  borderRadius: 8,

  fontSize: 14,

  textAlign: 'left',

  selectors: {
    '&:hover': {
      background: vars.color.bg,
    },
  },
});
