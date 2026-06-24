import { env } from '@/config/env.config';

export const useEnv = () => {
  return {
    baseUrl: env.baseUrl,
    apiUrl: env.apiUrl,
    isProduction: env.isProduction,
    isDevelopment: env.isDevelopment,
  };
};
