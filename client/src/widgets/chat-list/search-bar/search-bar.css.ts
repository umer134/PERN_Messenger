import { style } from '@vanilla-extract/css';
import { vars } from '../../../shared/styles/theme/theme.css';

export const wrapper = style({
  padding: '12px 16px',
  borderBottom: `1px solid ${vars.color.border}`,
});

export const container = style({
  height: 44,

  display: 'flex',
  alignItems: 'center',
  gap: 10,

  padding: '0 14px',

  borderRadius: vars.radius.md,

  background: vars.color.surface,

  border: `1px solid ${vars.color.border}`,
  
  transition: '150ms',
});

export const input = style({
  flex: 1,

  background: 'transparent',

  border: 'none',

  outline: 'none',

  color: vars.color.text,

  '::placeholder': {
    color: vars.color.textSecondary,
  }
});