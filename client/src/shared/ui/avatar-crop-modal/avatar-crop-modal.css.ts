import { style } from '@vanilla-extract/css';
import { vars } from '@/shared/styles/theme/theme.css';

export const backdrop = style({
  position: 'fixed',
  inset: 0,
  zIndex: 100,

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  background: 'rgba(0,0,0,0.72)',
});

export const modal = style({
  width: 'min(92vw, 540ox)',
  borderRadius: vars.radius.lg,
  background: vars.color.surface,
  border: `1px solid ${vars.color.border}`,
  padding: vars.spacing.lg,
});

export const cropArea = style({
  position: 'relative',
  height: 360,
  borderRadius: vars.radius.md,
  overflow: 'hidden',
  background: '#111',
});

export const footer = style({
  marginTop: vars.spacing.lg,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const slider = style({
  width: '100%',
});
