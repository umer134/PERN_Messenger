import { useForm } from "react-hook-form";
import { RegisterFormData, RegisterSchema } from "../../model/validation/register.schema"
import { zodResolver } from "@hookform/resolvers/zod";

type Props = {
  onSubmit: (values: RegisterFormData) => Promise<unknown>;
  isLoading: boolean;
  error?: string;
};

export const RegForm = ({ onSubmit, isLoading, error }: Props) => {

  const { register, handleSubmit, setValue, formState: { errors } } = 
    useForm<RegisterFormData>({
      resolver: zodResolver(RegisterSchema),
      mode: "onBlur",
      reValidateMode: "onChange",
      defaultValues: {
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <input autoComplete="username" type="text" placeholder="username" {...register("username")} />
        {errors.username && (
          <p>{errors.username.message}</p>
        )}
      </div>
      <div>
        <input autoComplete="email" type="email" placeholder="email" {...register("email")} />
        {errors.email && (
          <p>{errors.email.message}</p>
        )}
      </div>
      <div>
        <input autoComplete="new-password" type="password" placeholder="password" {...register("password")} />
        {errors.password && (
          <p>{errors.password.message}</p>
        )}
      </div>
      <div>
        <input type="password" placeholder="confirm password" {...register("confirmPassword")} />
        {errors.confirmPassword && (
          <p>{errors.confirmPassword.message}</p>
        )}
      </div>
      <div>
        <input type="file" accept="image/*" onChange={(e) => setValue("avatar", e.target.files?.[0], { shouldValidate: true, shouldDirty: true })} />
        {errors.avatar?.message && (
          <p>{String(errors.avatar.message)}</p>
        )}
      </div>
      {error && (<p>{error}</p>)}
      <button type="submit" disabled={isLoading}>
        Register
      </button>
    </form>
  );
};