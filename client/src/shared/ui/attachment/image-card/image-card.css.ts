import { style } from '@vanilla-extract/css';

export const root = style({
  position: 'relative',

  width: 120,
  height: 120,

  overflow: 'hidden',

  borderRadius: 16,
});

export const image = style({
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

  borderRadius: '50%',

  border: 'none',

  cursor: 'pointer',
});
