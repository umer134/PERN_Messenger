import { style } from '@vanilla-extract/css';
import { vars } from "../../styles/theme/theme.css";

export const input = style({
  width: '100%',
  padding: '10px 12px',
  borderRadius: vars.radius.md,
  background: vars.color.inputBg,
  border: `1px solid ${vars.color.inputBorder}`,
  color: vars.color.text,
  transition: `all ${vars.motion.fast}`,

  '::placeholder': {
    color: vars.color.textSecondary,
  },

  ':focus': {
    borderColor: vars.color.inputFocus,
    boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.15)',
  },
});

