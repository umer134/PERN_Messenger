import { style } from "@vanilla-extract/css";
import { vars } from "../../../shared/styles/theme/theme.css";

export const root = style({
  display: "flex",
  alignItems: "center",
  gap: 12,

  padding: "12px 16px",

  cursor: "pointer",

  transition: "150ms ease",

  selectors: {
    "&:hover": {
      background: vars.color.surface,
    },
  },
});

export const selected = style({
  background: vars.color.surface,
});

export const avatar = style({
  width: 48,
  height: 48,

  borderRadius: "50%",

  background: vars.color.surface,

  border: `1px solid ${vars.color.border}`,
  display: 'inline-flex',
  justifyContent:'center',
  alignItems: 'center',
  flexShrink: 0,
});

export const content = style({
  flex: 1,

  minWidth: 0,

  display: "flex",
  flexDirection: "column",
  gap: 4,
});

export const topRow = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export const title = style({
  fontWeight: 600,
  fontSize: "14px",
});

export const time = style({
  fontSize: "12px",
  color: vars.color.textSecondary,
});

export const bottomRow = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export const message = style({
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",

  color: vars.color.textSecondary,

  fontSize: "13px",
});

export const badge = style({
  minWidth: 20,
  height: 20,

  padding: "0 6px",

  borderRadius: 999,

  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  fontSize: "11px",
  fontWeight: 600,

  background: vars.color.primary,
  color: vars.color.primaryText,
});