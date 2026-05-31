import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormData } from "../../model/validation/login.schema";


type Props = {
  onSubmit: (values: LoginFormData) => Promise<void>;
  isLoading: boolean;
  error?: string;
};

export const LoginForm = ({ onSubmit, isLoading, error }: Props) => {

  const { register, handleSubmit, formState: { errors } } =
    useForm<LoginFormData>({
      resolver: zodResolver(loginSchema),
      defaultValues: { email: "", password: ""}, 
      mode: "onBlur",
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <input autoComplete="email" type="email" placeholder="Email" {...register("email")} />
        {errors.email && (
          <p>{errors.email.message}</p>
        )}
      </div>
      <div>
        <input autoComplete="password" type="password" placeholder="password" {...register("password")} />
        {errors.password && (
          <p>{errors.password.message}</p>
        )}
      </div>

      {error && <p>{error}</p>}

      <button disabled={isLoading}>
        Sign in
      </button>
    </form>
  )
}