import { createTheme } from '@vanilla-extract/css';
import { tokens } from '../vars.css';

export const [themeClass, vars] = createTheme({
  color: tokens.color,
  spacing: tokens.spacing,
  radius: tokens.radius,
  fontSize: tokens.fontSize,
  shadow: tokens.shadow,
  motion: tokens.motion,
})