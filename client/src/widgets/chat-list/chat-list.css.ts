import { style } from '@vanilla-extract/css';
import { vars } from '@/shared/styles/theme/theme.css';

export const root = style({
  height: '100%',
  borderRight: `1px solid ${vars.color.border}`,
  display: 'flex',
  flexDirection: 'column',
});

export const pages = style({
  position: 'relative',
  width: '100%',
  height: '100%',
  overflow: 'hidden',
});

export const page = style({
  position: 'absolute',

  top: 0,
  left: 0,

  width: '100%',
  height: '100%',

  transition: 'transform .25s ease',
});

export const dialogsActive = style([
  page,
  {
    transform: 'translateX(0)',
  },
]);

export const dialogsHidden = style([
  page,
  {
    transform: 'translateX(-30%)',
  },
]);

export const profileActive = style([
  page,
  {
    transform: 'translateX(0)',
  },
]);

export const profileHidden = style([
  page,
  {
    transform: 'translateX(100%)',
  },
]);

export const settingsActive = style([
  page,
  {
    transform: 'translateX(0)',
  },
]);

export const settingsHidden = style([
  page,
  {
    transform: 'translateX(100%)',
  },
]);
