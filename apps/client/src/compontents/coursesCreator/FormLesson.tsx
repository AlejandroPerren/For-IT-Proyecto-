import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import {InputField} from "../ui/inputField";
import type { TLesson } from "../../types/courses.types";
import { lessonSchema } from "../../schemas/Course.schema";
import { saveToStorage } from "../../utils/localStorageHelper";

type Props = {
  onNext: () => void;
  onBack?: () => void;
};

const FormLesson = ({ onNext, onBack }: Props) => {
  const stored = localStorage.getItem("lesson");
  const defaultValues: TLesson = stored
    ? JSON.parse(stored)
    : { title: "", videoUrl: "", textContent: "", order: 0 };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLesson>({
    resolver: yupResolver(lessonSchema),
    defaultValues,
  });

  const onSubmit = (data: TLesson) => {
    saveToStorage("lesson", data);
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <InputField
        label="title"
        id="title"
        placeholder="Ingrese el Titulo"
        register={register("title")}
        error={errors.title}
      />
      <InputField
        label="videoUrl"
        id="videoUrl"
        placeholder="Ingrese la direccion del video (opcional)"
        register={register("videoUrl")}
        error={errors.videoUrl}
      />
      <InputField
        label="textContent"
        id="textContent"
        placeholder="Ingrese el contenido en texto (opcional)"
        register={register("textContent")}
        error={errors.textContent}
      />
      <InputField
        label="order"
        id="order"
        placeholder="Ingrese el orden"
        register={register("order")}
        error={errors.order}
      />

      <div className="flex justify-between">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="bg-gray-300 px-4 py-2 rounded"
          >
            Volver
          </button>
        )}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Siguiente
        </button>
      </div>
    </form>
  );
};

export default FormLesson;
