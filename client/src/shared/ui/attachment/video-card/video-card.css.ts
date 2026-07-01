import { style } from '@vanilla-extract/css';
import { vars } from '@/shared/styles';

export const root = style({
  position: 'relative',

  width: 120,
  height: 120,

  overflow: 'hidden',
  borderRadius: 16,
});

export const video = style({
  width: '100%',
  height: '100%',

  objectFit: 'cover',

  display: 'block',
});

export const removeButton = style({
  position: 'absolute',

  top: 8,
  right: 8,

  width: 18,
  height: 18,

  borderRadius: '50%',

  backgroundColor: vars.color.bg,
});
