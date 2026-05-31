import { useLogin } from "../../hooks/useLogin"
import { LoginFormData } from "../../model/validation/login.schema";
import { LoginForm } from "./LoginForm";

export function Login() {
  const { mutateAsync, isPending, error } = useLogin();

  const handleSubmit = async (values: LoginFormData ) => {
    await mutateAsync({
      email: values.email,
      password: values.password
    });
  };

  return (
    <LoginForm
      onSubmit={handleSubmit}
      isLoading={isPending}
      error={error?.message}
    />
  )
}