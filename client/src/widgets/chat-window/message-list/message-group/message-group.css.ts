import { style } from '@vanilla-extract/css';

export const bubble = style({
  borderRadius: 16,
});

export const groupedTop = style({
  borderBottomLeftRadius: 6,
  borderBottomRightRadius: 6,
});

export const groupedMiddle = style({
  borderRadius: 6,
});

export const groupedBottom = style({
  borderTopLeftRadius: 6,
  borderTopRightRadius: 6,
});