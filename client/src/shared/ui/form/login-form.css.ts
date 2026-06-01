import { style } from '@vanilla-extract/css';

export const form = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
});

export const input = style({
  padding: 10,
  borderRadius: 8,
  border: `1px solid #ccc`,
});

export const button = style({
  padding: 10,
  background: 'black',
  color: 'white',
  borderRadius: 8,
})