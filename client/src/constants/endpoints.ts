import { env } from '../config/env.config';

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${env.apiUrl}/api/login`,
    REGISTER: `${env.apiUrl}/api/registration`,
    LOGOUT: `${env.apiUrl}/api/logout`,
    REFRESH: `${env.apiUrl}/api/refresh`,
    ACTIVATE: `${env.apiUrl}/api/activate`,
  },
  ME: {
    GET: `${env.apiUrl}/api/me`,
    UPDATE: `${env.apiUrl}/api/me`,
  },
  USERS: {
    GET_ALL: `${env.apiUrl}/users`,
    GET_BY_ID: (id: string) => `${env.apiUrl}/users/${id}`,
    GET_BY_USERNAME: (username: string) => `${env.apiUrl}/api/users/search?username=${username}`,
    UPDATE: (id: string) => `${env.apiUrl}/users/${id}`,
    DELETE: (id: string) => `${env.apiUrl}/users/${id}`,
  },
  CHATS: {
    GET_ALL: `${env.apiUrl}/api/chats`,
    GET_BY_ID: (id: string) => `${env.apiUrl}/chats/${id}`,
    CREATE: `${env.apiUrl}/chats`,
    UPDATE: (id: string) => `${env.apiUrl}/chats/${id}`,
    DELETE: (id: string) => `${env.apiUrl}/chats/${id}`,
  },
  MESSAGES: {
    GET: (chatId: string) => `${env.apiUrl}/messages/${chatId}`,
    GET2: (chatId: string) => `${env.apiUrl}/api/chats/${chatId}/messages`,
    GET_BY_ID: (id: string) => `${env.apiUrl}/messages/${id}`,
    CREATE: `${env.apiUrl}/api/messages`,
    READ: (chatId: string) => `${env.apiUrl}/api/messages/read/${chatId}`,
    UPDATE: `${env.apiUrl}/api/messages`,
    DELETE: (id: string) => `${env.apiUrl}/api/messages/${id}`,
  }
} as const; 