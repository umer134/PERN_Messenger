import { style } from '@vanilla-extract/css';

export const root = style({
  flex: 1,
  minHeight: 0,

  overflowY: "auto",

  padding: "20px",

  display: "flex",
  flexDirection: "column",
  
  scrollbarWidth: "thin", // Firefox
  scrollbarColor: "rgba(255,255,255,.2) transparent",

  selectors: {
    "&::-webkit-scrollbar": {
      width: 6,
    },

    "&::-webkit-scrollbar-track": {
      background: "transparent",
    },

    "&::-webkit-scrollbar-thumb": {
      background: "rgba(255,255,255,.2)",
      borderRadius: 999,
    },

    "&::-webkit-scrollbar-thumb:hover": {
      background: "rgba(255,255,255,.35)",
    },
  },
});

export const content = style({
  display: "flex",
  flexDirection: "column",

  gap: 12,
});