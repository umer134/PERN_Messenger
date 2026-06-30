import { breakpoints } from './breakpoints';

export const media = {
  mobile: `(max-width: ${breakpoints.mobile})`,

  tablet: `(min-width: 768px) and (max-width: ${breakpoints.tablet})`,

  desktop: `(min-width: ${breakpoints.desktop})`,
} as const;
