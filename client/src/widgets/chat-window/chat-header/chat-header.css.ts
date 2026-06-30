import { style } from '@vanilla-extract/css';
import { vars } from '@/shared/styles/theme/theme.css';
import { media } from '@/shared/styles/media';

export const root = style({
  height: 56,

  flexShrink: 0,

  display: 'flex',

  alignItems: 'center',

  gap: 12,

  padding: '0 12px',

  borderBottom: `1px solid ${vars.color.border}`,

  '@media': {
    [media.desktop]: {
      height: 72,

      padding: '0 20px',
    },
  },
});

export const backButton = style({
  display: 'none',

  '@media': {
    [media.mobile]: {
      display: 'flex',

      width: 36,
      height: 36,

      alignItems: 'center',
      justifyContent: 'center',
    },
  },
});

export const avatar = style({
  width: 40,
  height: 40,

  borderRadius: '50%',

  background: vars.color.surface,
  display: 'inline-flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const info = style({
  display: 'flex',
  flexDirection: 'column',
});

export const title = style({
  fontWeight: 600,
});

export const meta = style({
  fontSize: vars.fontSize.xs,
  //fontStyle: "italic",
  color: '#60A5FA',
});
