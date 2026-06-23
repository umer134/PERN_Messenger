import { style } from '@vanilla-extract/css';
import { vars } from '../../styles/theme/theme.css';

export const card = style({
  width: '420px',
  padding: '28px',
  borderRadius: vars.radius.lg,
  background: vars.color.surface,
  border: `1px solid ${vars.color.border}`,
  boxShadow: vars.shadow.card,
});
