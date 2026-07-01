export const SOCKET_EVENTS = {
  MESSAGE_NEW: 'messages:new',
  MESSAGE_EDITED: 'message:edited',
  MESSAGE_DELETED: 'message:deleted',

  MESSAGE_READ: 'message:read',
  MESSAGE_DELIVERED: 'message:delivered',

  CHAT_JOIN: 'chat:join',
  CHAT_LEAVE: 'chat:leave',

  CHAT_CREATED: 'chat:created',
  CHAT_UPDATED: 'chat:updated',

  TYPING_START: 'typing:start',
  TYPING_STOP: 'typing:stop',

  PRESENCE_ONLINE: 'presence:online',
  PRESENCE_OFFLINE: 'presence:offline',
  PRESENCE_INIT: 'presence:init',
} as const;
