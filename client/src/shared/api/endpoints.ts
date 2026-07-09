export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `/login`,
    REGISTER: `/registration`,
    LOGOUT: `/logout`,
    REFRESH: `/refresh`,
    ACTIVATE: `/activate`,
  },
  ME: {
    GET: `/me`,
    UPDATE: `/me`,
  },
  USERS: {
    GET_ALL: `/users`,
    GET_BY_ID: (id: string) => `/users/${id}`,
    GET_BY_USERNAME: (username: string) => `/users/search?username=${username}`,
    UPDATE: (id: string) => `/users/${id}`,
    DELETE: (id: string) => `/users/${id}`,
  },
  CHATS: {
    GET_ALL: `/chats`,
    GET_BY_ID: (id: string) => `/chats/${id}`,
    CREATE: `/chats`,
    UPDATE: (id: string) => `/chats/${id}`,
    DELETE: (id: string) => `/chats/${id}`,
  },
  MESSAGES: {
    GET: (chatId: string) => `/messages/${chatId}`,
    GET2: (chatId: string) => `/chats/${chatId}/messages`,
    GET_BY_ID: (id: string) => `/messages/${id}`,
    CREATE: `/messages`,
    READ: (chatId: string) => `/messages/read/${chatId}`,
    UPDATE: `/messages`,
    DELETE: (id: string) => `/messages/${id}`,
  },
} as const;
