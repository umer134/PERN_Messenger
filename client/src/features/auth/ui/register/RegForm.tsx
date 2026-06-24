import { useForm, useWatch } from 'react-hook-form';
import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  RegisterFormData,
  RegisterSchema,
} from '../../model/validation/register.schema';

import { Field } from '@/shared/ui/field/Field';
import { Input } from '@/shared/ui/input/Input';
import { PasswordInput } from '@/shared/ui/password-input/PasswordInput';
import { Button } from '@/shared/ui/button/Button';
import { AuthHeader } from '@/shared/ui/auth-header/AuthHeader';
import { AvatarPicker } from '@/shared/ui/avatar-picker/AvatarPicker';

type Props = {
  onSubmit: (values: RegisterFormData) => Promise<unknown>;
  isLoading: boolean;
  error?: string;
  onSwitch: () => void;
};

export const RegForm = ({ onSubmit, isLoading, error, onSwitch }: Props) => {
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(RegisterSchema),
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
        <AuthHeader title="Create account" subtitle="Start your journey" />

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
        <Field label="Username" error={errors.username?.message}>
          <Input {...register('username')} />
        </Field>

        <Field label="Email" error={errors.email?.message}>
          <Input {...register('email')} />
        </Field>
        <Field label="Password" error={errors.password?.message}>
          <PasswordInput {...register('password')} />
        </Field>

        <Field label="Confirm password" error={errors.confirmPassword?.message}>
          <PasswordInput {...register('confirmPassword')} />
        </Field>

        {error && <div style={{ color: '#EF4444', fontSize: 13 }}>{error}</div>}

        <Button type="submit" loading={isLoading} variant="primary">
          Create account
        </Button>

        <Button type="button" variant="ghost" onClick={onSwitch}>
          I already have an account
        </Button>
      </div>
    </form>
  );
};
