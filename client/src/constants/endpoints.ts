import { env } from '../config/env.config';

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${env.apiUrl}/auth/login`,
    REGISTER: `${env.apiUrl}/auth/register`,
    LOGOUT: `${env.apiUrl}/auth/logout`,
    REFRESH: `${env.apiUrl}/auth/refresh`,
    ACTIVATE: `${env.apiUrl}/auth/activate`,
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