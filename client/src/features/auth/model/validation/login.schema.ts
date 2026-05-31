import { z } from 'zod';

export const loginSchema = z.object({
  email: z.email("Invalid email").trim(),
  password: z.string().min(8, "Password too short").max(128),
});

export type LoginFormData = z.infer<typeof loginSchema>;