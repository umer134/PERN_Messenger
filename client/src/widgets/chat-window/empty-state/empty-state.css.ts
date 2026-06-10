import { style } from "@vanilla-extract/css";
import { vars } from "../../../shared/styles/theme/theme.css";

export const root = style({
  height: "100%",

  display: "flex",
  flexDirection: "column",

  alignItems: "center",
  justifyContent: "center",

  gap: 12,
});

export const title = style({
  fontSize: "24px",
  fontWeight: 600,
});

export const subtitle = style({
  color: vars.color.textSecondary,
});