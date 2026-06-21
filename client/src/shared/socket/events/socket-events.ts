export const SOCKET_EVENTS = {
  MESSAGE_NEW: "messages:new",
  MESSAGE_EDITED: "message:edited",
  MESSAGE_DELETED: "message:deleted",

  MESSAGE_READ: "message:read",
  MESSAGE_DELIVERED: "message:delivered",

  CHAT_JOIN: "chat:join",
  CHAT_LEAVE: "chat:leave",

  CHAT_UPDATED: "chat:updated",

  TYPING_START: "typing:start",
  TYPING_STOP: "typing:stop",

  USER_TYPING: "user:typing",
  USER_STOPPED_TYPING: "user:stopped_typing",
} as const;