import { TFunction } from 'i18next';
import { z } from 'zod';

export const CreateRegisterSchema = (t: TFunction<['auth', 'validation']>) =>
  z
    .object({
      username: z
        .string()
        .trim()
        .min(5, t('validation:usernameShort'))
        .max(20, t('validation:usernameLong')),
      email: z.string().trim().email(t('validation:invalidEmail')),
      password: z.string().min(8, t('validation:passwordShort')).max(128),
      confirmPassword: z.string(),
      avatar: z
        .any()
        .optional()
        .refine(
          (file) => !file || file.size <= 5 * 1024 * 1024,
          t('validation:avatarSize'),
        )
        .refine(
          (file) => !file || file.type.startsWith('image/'),
          t('validation:avatarFormat'),
        ),
    })
    .refine((data) => data.password === data.confirmPassword, {
      path: ['confirmPassword'],
      message: t('validation:confirmPassword'),
    });

export type RegisterFormData = z.infer<ReturnType<typeof CreateRegisterSchema>>;
