import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import InputField from "../ui/input";
import type { TLesson } from "../../types/courses.types";
import { lessonSchema } from "../../schemas/Course.schema";
import { saveToStorage } from "../../utils/localStorageHelper";

type Props = {
  onNext: () => void;
  onBack?: () => void;
};

const FormLesson = ({ onNext, onBack }: Props) => {
  const stored = localStorage.getItem("lesson");
  const defaultValues = stored
    ? JSON.parse(stored)
    : {
        title: "",
        videoUrl: "",
        textContent: "",
        order: 0,
      };

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
          label="videoUrl"
          id="videoUrl"
          placeholder="Ingrese la direccion del video(opcional si tiene uno)"
          register={register("videoUrl")}
          error={errors.videoUrl}
        />
        <InputField
          label="textContent"
          id="textContent"
          placeholder="Ingrese la el contenido en texto (opcional si tiene uno)"
          register={register("textContent")}
          error={errors.textContent}
        />
        <InputField
          label="order"
          id="order"
          placeholder="Ingrese la el contenido en texto (opcional si tiene uno)"
          register={register("order")}
          error={errors.order}
        />

        {onBack && (
          <button type="button" onClick={onBack}>
            Volver
          </button>
        )}
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

export default FormLesson;
