import { yupResolver } from "@hookform/resolvers/yup";

import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import type { TLogin } from "../../types/auth.types";
import { Login } from "../../network/fetch/Auth";
import { useNavigate } from "react-router-dom";
import {InputField} from "../ui/inputField";
import {PasswordInput} from "../ui/inputPassword";
import { loginSchema } from "../../schemas/Auth.schema";

const LoginForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TLogin>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data: TLogin) => {
    try {
      await Login(data);

      toast.success("Ingreso Correcto!!");
      reset();
      setTimeout(() => {
        navigate("/");
      }, 500);
    } catch (error) {
      toast.error("Ocurrio un error al ingresar");
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2 mt-10">
        <h1 className="m-2 text-center text-4xl font-extrabold p-5">Hola, Ingresa tus datos para ingresar!!</h1>
        <InputField
          label="email"
          id="email"
          placeholder="Ingrese su Correo"
          register={register("email")}
          error={errors.email}
        />

        <PasswordInput
          label="Contraseña"
          id="password"
          placeholder="Ingresa tu contraseña"
          register={register("password")}
          error={errors.password}
        />
        <button
          className="w-full bg-rose-500 text-white p-2 rounded-md hover:bg-rose-600"
          type="submit"
        >
          Ingresa
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
