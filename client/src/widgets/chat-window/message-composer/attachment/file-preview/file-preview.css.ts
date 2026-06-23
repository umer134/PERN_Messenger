import { style } from '@vanilla-extract/css';
import { vars } from '../../../../../shared/styles/theme/theme.css';

export const root = style({
  height: 44,

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  padding: '0 12px',

  borderRadius: vars.radius.md,

  background: vars.color.surface,

  border: `1px solid ${vars.color.border}`,
});

export const left = style({
  display: 'flex',
  alignItems: 'center',
  gap: 10,

  minWidth: 0,
});

export const name = style({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',

  fontSize: '13px',
});

export const removeButton = style({
  width: 28,
  height: 28,

  border: 'none',
  background: 'transparent',

  cursor: 'pointer',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});
