import { keyframes, style } from '@vanilla-extract/css';
import { vars } from '@/shared/styles/theme/theme.css';

export const root = style({
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: vars.color.bg,
});

const spin = keyframes({
  from: {
    transform: 'rotate(0deg)',
  },
  to: {
    transform: 'rotate(360deg)',
  },
});

export const spinner = style({
  width: '42px',
  height: '42px',
  borderRadius: '50%',
  border: `3px solid ${vars.color.border}`,
  borderTopColor: vars.color.primary,
  animation: `${spin} 0.8s linear infinite`,
});
