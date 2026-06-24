import { style, keyframes } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { vars } from '@/shared/styles/theme/theme.css';

const dotFade = keyframes({
  '0%, 20%': { opacity: 0 },
  '40%, 100%': { opacity: 1 },
});

const dotBase = style({
  position: 'relative',
  bottom: '-4px',
  borderRadius: vars.radius.full,
  backgroundColor: 'currentColor',
  animation: `${dotFade} 1.4s ease-in-out infinite`,
});

export const dot = recipe({
  base: dotBase,
  variants: {
    size: {
      xs: { width: '2px', height: '2px' },
      sm: { width: '4px', height: '4px' },
      md: { width: '6px', height: '6px' },
      lg: { width: '8px', height: '8px' },
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export const dot1 = style({ animationDelay: '0ms' });
export const dot2 = style({ animationDelay: '200ms' });
export const dot3 = style({ animationDelay: '400ms' });

export const typingContainer = recipe({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    color: '#60A5FA',
  },
  variants: {
    size: {
      xs: {
        fontSize: vars.fontSize.xs,
        gap: '2px',
      },
      sm: {
        fontSize: vars.fontSize.sm,
        gap: '4px',
      },
      md: {
        fontSize: vars.fontSize.md,
        gap: '6px',
      },
      lg: {
        fontSize: vars.fontSize.lg,
        gap: '8px',
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
});
