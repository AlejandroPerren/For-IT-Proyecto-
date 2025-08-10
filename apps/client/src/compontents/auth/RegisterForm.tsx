import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../../schemas/Auth.schema";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import type { TRegister } from "../../types/auth.types";
import { useNavigate } from "react-router-dom";
import {InputField} from "../ui/inputField";

import { SignUp } from "../../network/fetch/Auth";
import {PasswordInput} from "../ui/inputPassword";

const RegisterForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TRegister>({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = async (data: TRegister) => {
    try {
      await SignUp(data);

      toast.success("Registro Correcto!!");
      reset();
      setTimeout(() => {
        navigate("/");
      }, 500);
    } catch (error) {
      toast.error("Ocurrio un error al Registrarte");
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          label="name"
          id="name"
          placeholder="Ingrese su Nombre"
          register={register("name")}
          error={errors.name}
        />

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

export default RegisterForm;
