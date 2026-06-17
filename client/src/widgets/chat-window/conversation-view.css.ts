import { style } from "@vanilla-extract/css";

export const root = style({
  height: "100%",

  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
});

export const conversationContent = style({
  height: "100%",

  display: "flex",
  flexDirection: "column",
  minHeight: 0,
  //overflow: "hidden",
})