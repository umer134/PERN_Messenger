import { style } from '@vanilla-extract/css';
import { vars } from '@/shared/styles/theme/theme.css';

export const root = style({
  padding: 16,

  borderTop: `1px solid ${vars.color.border}`,

  display: 'flex',
  flexDirection: 'column',
  gap: 12,
});

export const inputRow = style({
  display: 'flex',
  alignItems: 'center',
  gap: 12,
});

export const textarea = style({
  flex: 1,

  minHeight: 44,
  maxHeight: 180,

  resize: 'none',

  border: `1px solid ${vars.color.border}`,

  borderRadius: vars.radius.lg,

  background: vars.color.surface,

  color: vars.color.text,

  padding: '12px 14px',

  outline: 'none',

  selectors: {
    '&:focus': {
      borderColor: vars.color.primary,
    },
  },
});

export const iconButton = style({
  width: 40,
  height: 40,

  borderRadius: vars.radius.full,

  border: 'none',

  background: vars.color.surface,

  color: vars.color.textSecondary,

  cursor: 'pointer',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const sendButton = style([
  iconButton,
  {
    background: vars.color.primary,
    color: vars.color.primaryText,
  },
]);

export const voiceButton = style({
  width: 40,

  height: 40,

  flexShrink: 0,

  borderRadius: vars.radius.full,

  background: vars.color.primary,

  color: vars.color.primaryText,

  cursor: 'pointer',

  display: 'flex',

  alignItems: 'center',

  justifyContent: 'center',

  selectors: {
    "&[data-recording='true']": {
      background: vars.color.danger,
    },
  },
});

export const recording = style({
  flex: 1,

  display: 'flex',

  alignItems: 'center',

  gap: 12,

  padding: '0 12px',
});

export const cancelButton = style({
  width: 40,

  height: 40,

  flexShrink: 0,

  color: vars.color.primary,

  cursor: 'pointer',

  display: 'flex',

  alignItems: 'center',

  justifyContent: 'center',

  borderRadius: '50%',
});

export const recordingDot = style({
  width: 8,

  height: 8,

  borderRadius: '50%',

  background: 'red',
});

export const attachments = style({
  display: 'flex',
  flexWrap: 'wrap',

  gap: 8,
});
