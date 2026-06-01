import { style } from '@vanilla-extract/css';
import { vars } from '../../styles/theme/theme.css';

export const wrapper = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
});

export const label = style({
  fontSize: vars.fontSize.xs,
  color: vars.color.textSecondary,
});

export const error = style({
  fontSize: vars.fontSize.xs,
  color: vars.color.danger,
});