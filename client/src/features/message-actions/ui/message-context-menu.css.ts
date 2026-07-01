import { style } from '@vanilla-extract/css';

export const root = style({
  minWidth: 180,

  display: 'flex',
  flexDirection: 'column',

  padding: 6,

  borderRadius: 12,

  background: '#1f1f1f',

  border: '1px solid rgba(255,255,255,.08)',

  boxShadow: '0 8px 32px rgba(0,0,0,.35)',

  zIndex: 1000,
});

export const item = style({
  height: 36,

  border: 'none',

  background: 'transparent',

  borderRadius: 8,

  display: 'flex',

  alignItems: 'center',

  padding: '0 12px',

  cursor: 'pointer',

  color: '#fff',

  selectors: {
    '&:hover': {
      background: 'rgba(255,255,255,.06)',
    },
  },
});
