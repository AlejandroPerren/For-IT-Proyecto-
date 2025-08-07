import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import { courseSchema } from "../../schemas/Course.schema";
import type { TCourse } from "../../types/courses.types";
import InputField from "../ui/input";
import { saveToStorage } from "../../utils/localStorageHelper";

type Props = {
  onNext: () => void;
};

const FormCourse = ({ onNext }: Props) => {
  const stored = localStorage.getItem("course");
  const defaultValues = stored
    ? JSON.parse(stored)
    : { title: "", description: "", isPublished: false };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TCourse>({
    resolver: yupResolver(courseSchema),
    defaultValues,
  });

  const onSubmit = (data: TCourse) => {
    saveToStorage("course", data);
    onNext();
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <InputField
          label="title"
          id="title"
          placeholder="Ingrese el Titulo"
          register={register("title")}
          error={errors.title}
        />

        <InputField
          label="description"
          id="description"
          placeholder="Ingrese la descripcion"
          register={register("description")}
          error={errors.description}
        />

        <div className="flex items-center gap-2 mb-4">
          <input
            type="checkbox"
            id="isPublished"
            {...register("isPublished")}
          />
          <label htmlFor="isPublished">¿Publicar?</label>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Siguiente
        </button>
      </form>
    </div>
  );
};

export default FormCourse;
