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
    GET_ALL: `${env.apiUrl}/messages`,
    GET_BY_ID: (id: string) => `${env.apiUrl}/messages/${id}`,
    CREATE: `${env.apiUrl}/messages`,
    UPDATE: (id: string) => `${env.apiUrl}/messages/${id}`,
    DELETE: (id: string) => `${env.apiUrl}/messages/${id}`,
  }
} as const; 