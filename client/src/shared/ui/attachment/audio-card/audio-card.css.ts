import { style } from '@vanilla-extract/css';

export const root = style({
  position: 'relative',

  width: 260,

  padding: 14,

  borderRadius: 16,

  background: '#202020',
});

export const header = style({
  display: 'flex',
  alignItems: 'center',
  gap: 10,

  marginBottom: 12,
});

export const name = style({
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',

  flex: 1,
});

export const audio = style({
  width: '100%',
});

export const removeButton = style({
  position: 'absolute',

  top: 8,
  right: 8,

  width: 28,
  height: 28,

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  border: 'none',

  borderRadius: '50%',

  background: 'rgba(0,0,0,.55)',

  cursor: 'pointer',
});
