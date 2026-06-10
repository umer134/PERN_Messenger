import { style } from '@vanilla-extract/css';

export const root = style({
  display: "flex",
  alignItems: "center",

  gap: 12,

  margin: "20px 0",
});

export const line = style({
  flex: 1,
  height: 1,
});

export const label = style({
  fontSize: "12px",
});