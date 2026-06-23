import { recipe } from '@vanilla-extract/recipes';
import { style } from '@vanilla-extract/css';
import { vars } from '../../styles/theme/theme.css';

export const avatar = recipe({
  base: {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    background: vars.color.surface2,
    color: vars.color.text,
    fontWeight: 600,
    userSelect: 'none',
  },

  variants: {
    size: {
      sm: {
        width: 32,
        height: 32,
        fontSize: vars.fontSize.sm,
        borderRadius: vars.radius.full,
      },
      md: {
        width: 40,
        height: 40,
        fontSize: vars.fontSize.md,
        borderRadius: vars.radius.full,
      },
      lg: {
        width: 56,
        height: 56,
        fontSize: vars.fontSize.lg,
        borderRadius: vars.radius.full,
      },
      xl: {
        width: 80,
        height: 80,
        fontSize: vars.fontSize.xl,
        borderRadius: vars.radius.full,
      },
    },
  },

  defaultVariants: {
    size: 'md',
  },
});

export const image = style({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

export const fallback = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
  background: vars.color.surface2,
});

export const status = style({
  position: 'absolute',
  right: 3,
  bottom: 2,
  width: 11,
  height: 11,
  borderRadius: vars.radius.full,
  border: `2px solid ${vars.color.surface}`,
});

export const statusColor = {
  online: { background: '#60A5FA' },
  offline: { background: '#6b7280' },
  away: { background: '#f59e0b' },
};
