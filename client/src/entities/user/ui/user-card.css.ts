import { style } from "@vanilla-extract/css";
import { vars } from "../../../shared/styles/theme/theme.css";

export const root = style({
  width: "100%",

  display: "flex",

  alignItems: "center",

  gap: 12,

  padding: "10px 16px",

  border: "none",

  background: "transparent",

  cursor: "pointer",

  color: vars.color.text,

  selectors: {
    "&:hover": {
      background:
        vars.color.surface,
    },
  },
});

export const avatar = style({
  width: 42,

  height: 42,

  borderRadius: "50%",

  objectFit: "cover",

  flexShrink: 0,
});

export const content = style({
  flex: 1,

  minWidth: 0,
});

export const username = style({
  fontSize: 14,

  fontWeight: 500,
});