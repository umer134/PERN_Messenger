import { style } from '@vanilla-extract/css';

export const root = style({
  height: 48,

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  padding: '0 12px',

  borderRadius: 12,
});

export const left = style({
  display: 'flex',
  alignItems: 'center',

  gap: 8,

  minWidth: 0,
});

export const filename = style({
  overflow: 'hidden',

  whiteSpace: 'nowrap',

  textOverflow: 'ellipsis',
});
