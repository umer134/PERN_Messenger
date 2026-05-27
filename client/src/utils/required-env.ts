import { ImportMetaEnv } from '../config/env.types';

export function getRequiredEnv(key: string): ImportMetaEnv[keyof ImportMetaEnv] {
  const value = import.meta.env[key as keyof ImportMetaEnv];
  if (!value) {
    throw new Error(`Environment variable not found: ${key}`);
  }
  return value;
}

export const BASE_URL = getRequiredEnv('VITE_BASE_URL');
export const API_URL = getRequiredEnv('VITE_API_URL');