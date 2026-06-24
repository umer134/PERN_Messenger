import { style } from '@vanilla-extract/css';
import { vars } from '@/shared/styles/theme/theme.css';

export const root = style({
  height: '100%',

  display: 'flex',
  flexDirection: 'column',

  background: vars.color.bg,
});

export const header = style({
  height: 72,

  display: 'flex',
  alignItems: 'center',

  justifyContent: 'space-between',

  padding: '0 16px',

  borderBottom: `1px solid ${vars.color.border}`,
});

export const backButton = style({
  width: 36,
  height: 36,

  border: 'none',
  background: 'transparent',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  cursor: 'pointer',

  color: vars.color.text,
});

export const title = style({
  marginLeft: 12,

  fontSize: vars.fontSize.md,
  fontWeight: 600,

  color: vars.color.text,
});

export const content = style({
  flex: 1,

  overflowY: 'auto',

  padding: vars.spacing.lg,
});

export const avatarSection = style({
  display: 'flex',
  justifyContent: 'center',

  marginBottom: 24,
});

export const card = style({
  borderRadius: vars.radius.lg,

  background: vars.color.surface2,

  overflow: 'hidden',
});

export const field = style({
  padding: vars.spacing.lg,

  display: 'flex',
  flexDirection: 'column',

  gap: 6,

  selectors: {
    '&:not(:last-child)': {
      borderBottom: '1px solid rgba(255,255,255,.05)',
    },
  },
});

export const label = style({
  fontSize: vars.fontSize.xs,

  color: 'rgba(255,255,255,.55)',
});

export const value = style({
  color: vars.color.text,

  fontSize: vars.fontSize.sm,
});

export const actions = style({
  marginTop: 24,

  display: 'flex',

  gap: 12,
});

export const headerActions = style({
  marginLeft: 'auto',

  display: 'flex',
  alignItems: 'center',

  gap: 8,
});

export const iconButton = style({
  width: 36,
  height: 36,

  border: 'none',
  background: 'transparent',

  borderRadius: vars.radius.full,

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  cursor: 'pointer',

  color: vars.color.text,

  transition: 'background .2s',

  selectors: {
    '&:hover': {
      background: vars.color.surface,
    },
  },
});

export const confirmButton = style({
  width: 36,
  height: 36,

  border: 'none',

  borderRadius: vars.radius.full,

  background: vars.color.bg,

  color: vars.color.text,

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  cursor: 'pointer',

  transition: 'opacity .2s',

  selectors: {
    '&:hover': {
      opacity: 0.9,
    },
  },
});
