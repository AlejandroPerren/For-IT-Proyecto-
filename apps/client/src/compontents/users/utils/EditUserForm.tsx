import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateSchema } from "../../../schemas/Auth.schema";
import {InputField} from "../../ui/inputField";
import type { User } from "../../../interface/user.interface";
import type { TUpdate } from "../../../types/auth.types";
import { useEffect } from "react";
import { updateUser } from "../../../network/fetch/Users";
import { toast } from "react-toastify";
import {SelectField} from "../../ui/SelectField";

type Props = {
  user: User;
  onClose: () => void;
  onUpdated: () => void;
};

const EditUserForm = ({ user, onClose, onUpdated }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TUpdate>({
    resolver: yupResolver(updateSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });

  useEffect(() => {
    reset({
      name: user.name,
      email: user.email,
      role: user.role,
    });
  }, [user, reset]);

  const onSubmit = async (data: TUpdate) => {
    try {
      const id = user.id;
      await updateUser(id, data);
      toast.success("Usuario actualizado");
      onUpdated();
      onClose();
    } catch (error) {
      toast.error("Error al actualizar usuario");
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <InputField
        label="Nombre"
        id="name"
        placeholder="Nombre"
        register={register("name")}
        error={errors.name}
      />
      <InputField
        label="Correo"
        id="email"
        placeholder="Correo"
        register={register("email")}
        error={errors.email}
      />
      <SelectField
        label="Rol"
        id="role"
        options={[
          { label: "ADMIN", value: "admin" },
          { label: "ESTUDIANTE", value: "student" },
          { label: "PROFESOR", value: "prof" },
        ]}
        register={register("role")}
        error={errors.role}
      />

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onClose}
          className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Guardar Cambios
        </button>
      </div>
    </form>
  );
};

export default EditUserForm;
