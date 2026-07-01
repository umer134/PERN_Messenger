import { style } from '@vanilla-extract/css';

export const root = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  gap: 12,

  width: 260,

  padding: '12px 14px',

  borderRadius: 14,

  background: '#202020',
});

export const left = style({
  display: 'flex',
  alignItems: 'center',
  gap: 10,

  flex: 1,

  overflow: 'hidden',
});

export const filename = style({
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',

  color: 'white',

  textDecoration: 'none',

  flex: 1,
});

export const iconButton = style({
  width: 32,
  height: 32,

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  border: 'none',

  borderRadius: '50%',

  cursor: 'pointer',
});
