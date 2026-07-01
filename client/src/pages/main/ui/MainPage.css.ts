import { style } from '@vanilla-extract/css';
import { vars } from '@/shared/styles/theme/theme.css';
import { media } from '@/shared/styles/media';

export const root = style({
  height: '100dvh',

  display: 'grid',

  gridTemplateColumns: '1fr',

  overflow: 'hidden',

  background: vars.color.bg,

  '@media': {
    [media.desktop]: {
      gridTemplateColumns: '320px 1fr',
    },
  },
});
