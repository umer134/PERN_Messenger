import { media } from '@/shared/styles/media';
import { style } from '@vanilla-extract/css';

export const root = style({
  height: '100dvh',

  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
});

export const chatContent = style({
  flex: 1,

  display: 'flex',
  flexDirection: 'column',
  minHeight: 0,
  overflow: 'hidden',
});

export const hiddenMobile = style({
  '@media': {
    [media.mobile]: {
      display: 'none',
    },
  },
});
