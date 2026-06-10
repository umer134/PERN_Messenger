import { style } from '@vanilla-extract/css';
import { vars } from '../../shared/styles/theme/theme.css';

export const root = style({
  height: '100%',
  borderRight: `1px solid ${vars.color.border}`,
  display: 'flex',
  flexDirection: 'column',
});