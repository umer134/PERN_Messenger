import { style } from '@vanilla-extract/css';

export const root = style({
  paddingLeft: 10,

  marginBottom: 8,

  borderLeft: '3px solid rgba(255,255,255,.3)',
});

export const author = style({
  fontSize: 12,

  fontWeight: 600,
});

export const content = style({
  fontSize: 12,

  opacity: 0.75,

  overflow: 'hidden',

  whiteSpace: 'nowrap',

  textOverflow: 'ellipsis',
});
