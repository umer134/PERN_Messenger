import { style } from '@vanilla-extract/css';
import { vars } from '@/shared/styles/theme/theme.css';

export const root = style({
  overflowY: 'auto',

  flex: 1,
});

export const empty = style({
  padding: 24,

  textAlign: 'center',

  color: vars.color.textSecondary,
});
