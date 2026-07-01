import { useForm, useWatch } from 'react-hook-form';
import { useEffect, useMemo } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

import { useTranslation } from 'react-i18next';

import {
  RegisterFormData,
  CreateRegisterSchema,
} from '../../model/validation/register.schema';

import { Field } from '@/shared/ui/field/Field';
import { Input } from '@/shared/ui/input/Input';
import { PasswordInput } from '@/shared/ui/password-input/PasswordInput';
import { Button } from '@/shared/ui/button/Button';
import { AuthHeader } from '@/shared/ui/auth-header/AuthHeader';
import { AvatarPicker } from '@/shared/ui/avatar-picker/AvatarPicker';
import { NAMESPACE } from '@/shared/i18n/namespaces';

type Props = {
  onSubmit: (values: RegisterFormData) => Promise<unknown>;
  isLoading: boolean;
  error?: string;
  onSwitch: () => void;
};

export const RegForm = ({ onSubmit, isLoading, error, onSwitch }: Props) => {
  const { t } = useTranslation([NAMESPACE.AUTH, NAMESPACE.VALIDATION]);

  const registerSchema = useMemo(() => CreateRegisterSchema(t), [t]);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      avatar: undefined,
    },
  });

  useEffect(() => {
    register('avatar');
  }, [register]);

  const avatar = useWatch({
    control,
    name: 'avatar',
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 20,
        }}
      >
        <AuthHeader title={t('signUp.title')} subtitle={t('signUp.subtitle')} />

        <AvatarPicker
          value={avatar}
          onChange={(file) => {
            setValue('avatar', file, {
              shouldDirty: true,
              shouldValidate: true,
            });
          }}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Field
          label={t('signUp.form.username')}
          error={errors.username?.message}
        >
          <Input {...register('username')} />
        </Field>

        <Field label={t('signUp.form.email')} error={errors.email?.message}>
          <Input {...register('email')} />
        </Field>
        <Field
          label={t('signUp.form.password')}
          error={errors.password?.message}
        >
          <PasswordInput {...register('password')} />
        </Field>

        <Field
          label={t('signUp.form.confirmPassword')}
          error={errors.confirmPassword?.message}
        >
          <PasswordInput {...register('confirmPassword')} />
        </Field>

        {error && <div style={{ color: '#EF4444', fontSize: 13 }}>{error}</div>}

        <Button type="submit" loading={isLoading} variant="primary">
          {t('signUp.form.submit')}
        </Button>

        <Button type="button" variant="ghost" onClick={onSwitch}>
          {t('signUp.form.switch')}
        </Button>
      </div>
    </form>
  );
};
