import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  loginSchema,
  LoginFormData,
} from '../../model/validation/login.schema';

import { Field } from '../../../../shared/ui/field/Field';
import { Input } from '../../../../shared/ui/input/Input';
import { PasswordInput } from '../../../../shared/ui/password-input/PasswordInput';
import { Button } from '../../../../shared/ui/button/Button';
import { AuthHeader } from '../../../../shared/ui/auth-header/AuthHeader';

type Props = {
  onSubmit: (values: LoginFormData) => Promise<void>;
  isLoading: boolean;
  error?: string;
  onSwitch: () => void;
};

export const LoginForm = ({ onSubmit, isLoading, error, onSwitch }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
    mode: 'onBlur',
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <AuthHeader title="Welcome back" subtitle="Sign in to your account" />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Field label="Email" error={errors.email?.message}>
          <Input
            autoComplete="email"
            type="email"
            placeholder="you@example.com"
            {...register('email')}
          />
        </Field>

        <Field label="Password" error={errors.password?.message}>
          <PasswordInput
            autoComplete="current-password"
            type="password"
            placeholder="••••••••"
            {...register('password')}
          />
        </Field>

        {error && <div style={{ color: '#EF4444', fontSize: 13 }}>{error}</div>}

        <Button type="submit" loading={isLoading} variant="primary">
          Sign in
        </Button>

        <Button type="button" variant="ghost" onClick={onSwitch}>
          Create account
        </Button>
      </div>
    </form>
  );
};
