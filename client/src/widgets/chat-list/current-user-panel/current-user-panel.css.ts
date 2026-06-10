import { style } from "@vanilla-extract/css";
import { vars } from "../../../shared/styles/theme/theme.css";

export const root = style({
  height: 72,

  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",

  padding: "0 16px",

  borderBottom: `1px solid ${vars.color.border}`,
});

export const left = style({
  display: "flex",
  alignItems: "center",
  gap: 12,
});

export const avatar = style({
  width: 40,
  height: 40,

  borderRadius: "50%",

  background: vars.color.surface,

  border: `1px solid ${vars.color.border}`,

  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const info = style({
  display: "flex",
  flexDirection: "column",
});

export const username = style({
  fontWeight: 600,
  fontSize: "14px",
});

export const status = style({
  fontSize: "12px",
  color: vars.color.textSecondary,
});

export const settingsButton = style({
  width: 36,
  height: 36,

  borderRadius: 10,

  border: "none",

  background: "transparent",

  cursor: "pointer",

  color: vars.color.textSecondary,

  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});