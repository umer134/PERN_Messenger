import { style } from '@vanilla-extract/css';
import { vars } from '../../../styles/theme/theme.css';

export const root = style({
  display: 'inline-flex',

  alignItems: 'center',

  gap: 12,

  maxWidth: 320,
});

export const playButton = style({
  width: 40,

  height: 40,

  borderRadius: vars.radius.full,

  color: vars.color.primary,

  display: 'flex',

  alignItems: 'center',

  justifyContent: 'center',
});

export const body = style({
  flex: 1,
});

export const waveform = style({
  width: 'fit-content',
  position: 'relative',

  display: 'flex',

  alignItems: 'center',

  gap: 2,

  height: 32,

  cursor: 'pointer',

  overflow: 'hidden',
});

export const progress = style({
  position: 'absolute',

  left: 0,

  top: 0,

  bottom: 0,

  width: 0,

  pointerEvents: 'none',

  borderRadius: 999,

  background: 'rgba(255,255,255,0.08)',

  transition: 'width 120ms linear',
});

export const bar = style({
  width: 3,

  borderRadius: 999,

  flexShrink: 0,

  background: 'rgba(255,255,255,0.28)',

  transition: 'background .15s ease',
});

export const activeBar = style({
  background: 'rgba(255,255,255,0.9)',
});

export const duration = style({
  fontSize: 12,
});
