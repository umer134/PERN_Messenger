import { style } from '@vanilla-extract/css';
import { vars } from '../../../shared/styles/theme/theme.css';

export const root = style({
  height: '100vh',

  display: 'grid',

  gridTemplateColumns: '320px 1fr',

  background: vars.color.bg,
});
