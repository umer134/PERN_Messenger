import { useRegister } from "../../hooks/useRegister";
import { RegisterFormData } from "../../model/validation/register.schema";
import { RegForm } from "./RegForm";

export function Register({onSwitch}) {
  const { mutateAsync, isPending, error } = useRegister();

  const handleSubmit = async (values: RegisterFormData) => {
    await mutateAsync({
      username: values.username,
      email: values.email,
      password: values.password,
      avatar: values.avatar,
    });
  };

  return (
    <RegForm onSubmit={handleSubmit} onSwitch={onSwitch} isLoading={isPending} error={error?.message} />
  )
}