import { z } from 'zod';

const envSchema = z.object({
  VITE_BASE_URL: z.string().default('/'),
  VITE_API_URL: z.string().min(1),
  VITE_APP_TITLE: z.string().default('Scribora'),
  MODE: z.enum(['development', 'production', 'test']),
  PROD: z.boolean(),
  DEV: z.boolean(),
});

const parsedEnv = envSchema.safeParse(import.meta.env);

if (!parsedEnv.success) {
  console.error(parsedEnv.error.format());
  throw new Error('Environment validation failed');
}

export const env = {
  BASE_URL: parsedEnv.data.VITE_BASE_URL,
  API_URL: parsedEnv.data.VITE_API_URL,
  MODE: parsedEnv.data.MODE,
  IS_PRODUCTION: parsedEnv.data.PROD,
  IS_DEVELOPMENT: parsedEnv.data.DEV,
};
