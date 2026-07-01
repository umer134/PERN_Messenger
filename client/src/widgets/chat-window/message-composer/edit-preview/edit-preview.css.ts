import { style } from '@vanilla-extract/css';
import { vars } from '@/shared/styles/theme/theme.css';

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

export const title = style({
  color: vars.color.primary,
  fontWeight: 600,
  marginBottom: 4,
});
