import { media } from '@/shared/styles/media';
import { globalKeyframes, style } from '@vanilla-extract/css';

export const wrapper = style({
  position: 'relative',

  flex: 1,
  minHeight: 0,

  display: 'flex',
});

export const root = style({
  flex: 1,
  minHeight: 0,

  overflowY: 'auto',

  padding: 12,

  display: 'flex',
  flexDirection: 'column',

  scrollbarWidth: 'thin', // Firefox
  scrollbarColor: 'rgba(255,255,255,.2) transparent',

  selectors: {
    '&::-webkit-scrollbar': {
      width: 6,
    },

    '&::-webkit-scrollbar-track': {
      background: 'transparent',
    },

    '&::-webkit-scrollbar-thumb': {
      background: 'rgba(255,255,255,.2)',
      borderRadius: 999,
    },

    '&::-webkit-scrollbar-thumb:hover': {
      background: 'rgba(255,255,255,.35)',
    },
  },

  '@media': {
    [media.desktop]: {
      padding: 20,
    },
  },
});

export const content = style({
  display: 'flex',
  flexDirection: 'column',

  gap: 12,
  overflowAnchor: 'none',
});

import { keyframes } from '@vanilla-extract/css';

export const showButton = keyframes({
  from: {
    opacity: 0,
    transform: 'translateY(20px)',
  },

  to: {
    opacity: 1,
    transform: 'translateY(0)',
  },
});

export const scrollButton = style({
  position: 'absolute',

  right: 16,
  bottom: 90,

  width: 42,
  height: 42,

  borderRadius: '50%',

  border: 'none',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  cursor: 'pointer',

  background: 'rgba(40,40,40,.95)',

  // boxShadow:
  //   "0 4px 20px rgba(0,0,0,.35)",

  zIndex: 10,

  animation: `${showButton} .2s ease`,
});

export const highlightedMessage = style({
  animation: 'messageHighlight 1.5s ease',
});

globalKeyframes('messageHighlight', {
  '0%': {
    opacity: 0.5,
    transform: 'scale(1.02)',
  },

  '100%': {
    opacity: 1,
    transform: 'scale(1)',
  },
});
