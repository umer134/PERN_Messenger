import { style } from '@vanilla-extract/css';

export const root = style({
  position: 'relative',

  width: 120,
  height: 120,

  overflow: 'hidden',

  borderRadius: 16,

  background: '#181818',

  flexShrink: 0,
});

export const media = style({
  width: '100%',
  height: '100%',

  objectFit: 'cover',

  display: 'block',
});

export const removeButton = style({
  position: 'absolute',

  top: 8,
  right: 8,

  width: 28,
  height: 28,

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  border: 'none',
  borderRadius: '50%',

  cursor: 'pointer',

  background: 'rgba(0,0,0,.55)',
});
