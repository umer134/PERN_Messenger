import { z } from 'zod';
import { TFunction } from 'i18next';

export const CreateLoginSchema = (t: TFunction<['auth', 'validation']>) =>
  z.object({
    email: z.string().email(t('validation:invalidEmail')).trim(),
    password: z.string().min(8, t('validation:passwordShort')).max(128),
  });

export type LoginFormData = z.infer<ReturnType<typeof CreateLoginSchema>>;
