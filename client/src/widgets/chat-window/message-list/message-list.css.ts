import { style } from '@vanilla-extract/css';

export const root = style({
  flex: 1,

  overflowY: "auto",

  padding: "20px",

  display: "flex",
  flexDirection: "column",

  justifyContent: "flex-end",
});

export const content = style({
  display: "flex",
  flexDirection: "column",

  gap: 12,
});