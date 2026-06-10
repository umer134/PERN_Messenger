import { style } from '@vanilla-extract/css';

export const backdrop = style({
  position: "fixed",

  inset: 0,

  zIndex: 1000,

  display: "flex",

  alignItems: "center",

  justifyContent: "center",
  flexDirection: 'column',

  background:
    "rgba(0,0,0,0.88)",

  backdropFilter:
    "blur(8px)",
  gap: 10,
});

export const header = style({
  position: "absolute",

  top: 0,
  left: 0,
  right: 0,

  height: 64,

  display: "flex",

  alignItems: "center",

  justifyContent:
    "space-between",

  padding: "0 24px",

  zIndex: 10,
});

export const content = style({
  width: "90vw",

  height: "90vh",

  display: "flex",

  alignItems: "center",

  justifyContent: "center",
});

export const closeButton = style({
  position: "absolute",

  top: 24,

  right: 24,
});

export const thumbnails = style({
  position: "absolute",

  bottom: 24,

  left: "50%",

  transform:
    "translateX(-50%)",

  display: "flex",

  gap: 8,

  maxWidth: "80vw",

  overflowX: "auto",

  padding: 8,

  selectors: {
  "&::-webkit-scrollbar": {
    display: "none",
  },
},
});

export const thumbnail = style({
  width: 64,

  height: 64,

  flexShrink: 0,

  borderRadius: 12,

  overflow: "hidden",

  cursor: "pointer",

  opacity: 0.5,

  transition:
    "all .2s ease",
});

export const thumbnailActive =
  style({
    opacity: 1,

    transform:
      "scale(1.05)",
  });

  export const thumbnailImage =
  style({
    width: "100%",

    height: "100%",

    objectFit: "cover",
  });