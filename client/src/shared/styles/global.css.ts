import { globalStyle } from '@vanilla-extract/css';
import { vars } from './theme/theme.css';

globalStyle('*', {
  boxSizing: 'border-box',
  margin: 0,
  padding: 0,
});

globalStyle('html, body, #root', {
  width: '100%',
  minHeight: '100vh',
});

globalStyle('body', {
  background: vars.color.bg,
  color: vars.color.text,

  fontFamily: 'Inter, system-ui, sans-serif',

  WebkitFontSmoothing: 'antialiased',
});

globalStyle('button', {
  border: 'none',
  outline: 'none',
  background: 'transparent',
  font: 'inherit',
});

globalStyle('input', {
  font: 'inherit',
  outline: 'none',
  background: 'transparent',
});

globalStyle('a', {
  color: 'inherit',
  textDecoration: 'none',
});

