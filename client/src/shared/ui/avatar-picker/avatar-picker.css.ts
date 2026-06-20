import { style } from '@vanilla-extract/css';
import { vars } from '../../styles/theme/theme.css';

export const root = style({
  position: 'relative',
  width: 80,
  height: 80,
  borderRadius: '50%',
  overflow: 'hidden',
  cursor: 'pointer',
  flexShrink: 0,

  border: `1px solid ${vars.color.border}`,
  background: vars.color.surface2,
});

export const image = style({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

export const placeholder = style({
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: vars.color.textSecondary,
  fontSize: 28,
});

export const overlay = style({
  position: 'absolute',
  inset: 0,

  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 4,

  background: 'rgba(0,0,0,0.5)',
  color: '#fff',

  opacity: 0,
  transition: 'opacity 150ms',

  selectors: {
    [`${root}:hover &`]: {
      opacity: 1,
    },
  },
});

export const hiddenInput = style({
  display: 'none',
});
