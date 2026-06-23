import { z } from 'zod';

export const RegisterSchema = z
  .object({
    username: z
      .string()
      .trim()
      .min(5, 'username too short')
      .max(20, 'Username too long'),
    email: z.string().trim().email('Invalid email'),
    password: z.string().min(8, 'password too short').max(128),
    confirmPassword: z.string(),
    avatar: z
      .any()
      .optional()
      .refine(
        (file) => !file || file.size <= 5 * 1024 * 1024,
        'Avatar must be under 5',
      )
      .refine(
        (file) => !file || file.type.startsWith('image/'),
        'Only image files allowed',
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });

export type RegisterFormData = z.infer<typeof RegisterSchema>;
