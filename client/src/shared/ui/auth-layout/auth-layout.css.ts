import { style } from '@vanilla-extract/css';

export const layout = style({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  background: 'radial-gradient(circle at top, #111 0%, #09090B 60%)',
});
