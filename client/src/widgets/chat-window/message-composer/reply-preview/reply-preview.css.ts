import { style } from '@vanilla-extract/css';

export const root = style({
  display: 'flex',

  alignItems: 'center',

  justifyContent: 'space-between',

  padding: 12,

  borderBottom: '1px solid rgba(255,255,255,.08)',
});

export const content = style({
  minWidth: 0,
});

export const author = style({
  fontSize: 12,

  fontWeight: 600,
});

export const text = style({
  fontSize: 12,

  opacity: 0.7,

  overflow: 'hidden',

  whiteSpace: 'nowrap',

  textOverflow: 'ellipsis',
});
