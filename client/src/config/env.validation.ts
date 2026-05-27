import { z } from 'zod';

const envSchema = z.object({
  VITE_BASE_URL: z.string().url().default('http://localhost:5173'),
  VITE_API_URL: z.string().min(1),
  VITE_APP_TITLE: z.string().default('PERN_MESSENGER'),
  MODE: z.enum(['development', 'production', 'test']),
  PROD: z.boolean(),
  DEV: z.boolean(),
});

function validateEnv() {
  const parsedEnv = envSchema.safeParse(import.meta.env);

  if(!parsedEnv.success) {
    console.error('Invalid environment variables:', parsedEnv.error.format());
    throw new Error('Environment validation failed');
  }

  return parsedEnv.data;
}

export const env = validateEnv();