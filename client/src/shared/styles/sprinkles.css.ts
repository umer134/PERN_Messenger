import { defineProperties, createSprinkles } from '@vanilla-extract/sprinkles';
import { vars } from './theme/theme.css';

const spacingProperties = defineProperties({
  properties: {
    padding: vars.spacing,
    paddingTop: vars.spacing,
    paddingBottom: vars.spacing,
    paddingLeft: vars.spacing,
    paddingRight: vars.spacing,

    margin: vars.spacing,
    marginTop: vars.spacing,
    marginBottom: vars.spacing,
    marginLeft: vars.spacing,
    marginRight: vars.spacing,

    gap: vars.spacing,
  },
});

const layoutProperties = defineProperties({
  properties: {
    display: ['none', 'flex', 'block', 'inline-flex'],

    flexDirection: ['row', 'column'],

    justifyContent: ['center', 'space-between', 'flex-start', 'flex-end'],

    alignItems: ['center', 'flex-start', 'flex-end'],

    width: ['100%', 'fit-content'],

    height: ['100%', '100vh'],
  },
});

export const sprinkles = createSprinkles(spacingProperties, layoutProperties);

export type Sprinkles = Parameters<typeof sprinkles>[0];
