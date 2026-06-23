import { style } from '@vanilla-extract/css';
import { vars } from '../../../shared/styles/theme/theme.css';

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

  padding: '0 16px',

  borderBottom: `1px solid ${vars.color.border}`,
});

export const backButton = style({
  width: 36,
  height: 36,

  border: 'none',

  background: 'transparent',

  color: vars.color.text,

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  cursor: 'pointer',
});

export const title = style({
  marginLeft: 12,

  color: vars.color.text,

  fontSize: vars.fontSize.md,
  fontWeight: 600,
});

export const content = style({
  padding: vars.spacing.md,

  display: 'flex',
  flexDirection: 'column',

  gap: 8,
});

export const item = style({
  height: 48,

  border: 'none',

  borderRadius: vars.radius.md,

  background: vars.color.surface,

  color: vars.color.primary,

  display: 'flex',
  alignItems: 'center',

  gap: 12,

  padding: '0 14px',

  cursor: 'pointer',

  selectors: {
    '&:hover': {
      background: vars.color.surface2,
    },
  },
});
