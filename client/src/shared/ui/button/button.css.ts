import { style, styleVariants } from '@vanilla-extract/css';
import { vars } from '../../styles/theme/theme.css';

export const base = style({
  borderRadius: vars.radius.md,
  padding: `${vars.spacing.sm} ${vars.spacing.md}`,
  fontSize: vars.fontSize.sm,
  cursor: 'pointer',
  transition: `all ${vars.motion.fast}`,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  border: `1px solid transparent`,

  ':disabled': {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
});

export const variants = styleVariants({
  primary: {
    background: vars.color.primary,
    color: vars.color.primaryText,
    ':hover': {
      opacity: 0.9,
    },
  },

  secondary: {
    background: vars.color.surface,
    color: vars.color.text,
    border: `1px solid ${vars.color.border}`,
    ':hover': {
      borderColor: vars.color.inputFocus,
    },
  },

  ghost: {
    background: 'transparent',
    color: vars.color.textSecondary,
    ':hover': {
      color: vars.color.text,
    },
  },

  danger: {
    background: vars.color.danger,
    color: '#fff',
  },
});

export const sizes = ({
  sm: { padding: '6px 10px', fontSize: vars.fontSize.xs },
  md: { padding: '10px 14px', fontSize: vars.fontSize.sm },
  lg: { padding: '12px 18px', fontSize: vars.fontSize.md },
});