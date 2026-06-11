import { style } from "@vanilla-extract/css";
import { vars } from "../../../shared/styles/theme/theme.css";

export const row = style({
  display: "flex",
});

export const mine = style({
  justifyContent: "flex-end",
});

export const bubble = style({
  maxWidth: "70%",

  padding: "10px 14px",

  borderRadius: 16,

  background: vars.color.surface,

  border: `1px solid ${vars.color.border}`,
});

export const myBubble = style({
  background: vars.color.surface,
  color: vars.color.text,
});

export const text = style({
  wordBreak: "break-word",
});

export const footer = style({
  marginTop: 4,

  display: "flex",
  alignItems: "center",

  justifyContent: "flex-end",

  gap: 4,

  fontSize: "11px",

  opacity: 0.7,
});

export const attachments = style({
  display: "flex",
  flexDirection: "column",

  gap: 8,

  marginBottom: 8,
});