export const SOCKET_EVENTS = {
  MESSAGE_NEW: "messages:new",
  MESSAGE_EDITED: "message:edited",
  MESSAGE_DELETED: "message:deleted",

  MESSAGE_READ: "message:read",
  MESSAGE_DELIVERED: "message:delivered",

  CHAT_JOIN: "chat:join",
  CHAT_LEAVE: "chat:leave",

  CHAT_UPDATED: "chat:updated",
} as const;