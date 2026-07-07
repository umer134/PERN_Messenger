import { env } from '@/config/env.config';

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${env.apiUrl}/login`,
    REGISTER: `${env.apiUrl}/registration`,
    LOGOUT: `${env.apiUrl}/logout`,
    REFRESH: `${env.apiUrl}/refresh`,
    ACTIVATE: `${env.apiUrl}/activate`,
  },
  ME: {
    GET: `${env.apiUrl}/me`,
    UPDATE: `${env.apiUrl}/me`,
  },
  USERS: {
    GET_ALL: `${env.apiUrl}/users`,
    GET_BY_ID: (id: string) => `${env.apiUrl}/users/${id}`,
    GET_BY_USERNAME: (username: string) =>
      `${env.apiUrl}/users/search?username=${username}`,
    UPDATE: (id: string) => `${env.apiUrl}/users/${id}`,
    DELETE: (id: string) => `${env.apiUrl}/users/${id}`,
  },
  CHATS: {
    GET_ALL: `${env.apiUrl}/chats`,
    GET_BY_ID: (id: string) => `${env.apiUrl}/chats/${id}`,
    CREATE: `${env.apiUrl}/chats`,
    UPDATE: (id: string) => `${env.apiUrl}/chats/${id}`,
    DELETE: (id: string) => `${env.apiUrl}/chats/${id}`,
  },
  MESSAGES: {
    GET: (chatId: string) => `${env.apiUrl}/messages/${chatId}`,
    GET2: (chatId: string) => `${env.apiUrl}/chats/${chatId}/messages`,
    GET_BY_ID: (id: string) => `${env.apiUrl}/messages/${id}`,
    CREATE: `${env.apiUrl}/messages`,
    READ: (chatId: string) => `${env.apiUrl}/messages/read/${chatId}`,
    UPDATE: `${env.apiUrl}/messages`,
    DELETE: (id: string) => `${env.apiUrl}/messages/${id}`,
  },
} as const;
