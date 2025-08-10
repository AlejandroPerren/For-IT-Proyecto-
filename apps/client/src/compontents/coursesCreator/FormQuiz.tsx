import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import type { TQuiz } from "../../types/courses.types";
import { quizSchema } from "../../schemas/Course.schema";
import { saveToStorage } from "../../utils/localStorageHelper";
import {InputField} from "../ui/inputField";
import {
  clearCourseCreatorStorage,
  createFullCourseFlow,
} from "../../utils/CourseCreatorHelper";
import { toast } from "react-toastify";

type Props = {
  onBack?: () => void;
};

const FormQuiz = ({ onBack }: Props) => {
  const stored = localStorage.getItem("quiz");
  const defaultValues: TQuiz = stored
    ? JSON.parse(stored)
    : {
        question: "",
        options: { A: "", B: "", C: "", D: "" },
        correctAnswer: "A",
      };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TQuiz>({
    resolver: yupResolver(quizSchema),
    defaultValues,
  });

  const onSubmit = async (data: TQuiz) => {
    saveToStorage("quiz", data);
    try {
      await createFullCourseFlow();
      toast.success("Se creo tu curso correctamente");
    } catch (error) {
      toast.error("Ocurrio un error al Crear el Curso");
      console.log(error);
    } finally {
      await clearCourseCreatorStorage();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <InputField
        label="question"
        id="question"
        placeholder="Ingrese la Pregunta"
        register={register("question")}
        error={errors.question}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          label="Opción A"
          id="optionA"
          placeholder="Opción A"
          register={register("options.A")}
          error={errors.options?.A}
        />
        <InputField
          label="Opción B"
          id="optionB"
          placeholder="Opción B"
          register={register("options.B")}
          error={errors.options?.B}
        />
        <InputField
          label="Opción C"
          id="optionC"
          placeholder="Opción C"
          register={register("options.C")}
          error={errors.options?.C}
        />
        <InputField
          label="Opción D"
          id="optionD"
          placeholder="Opción D"
          register={register("options.D")}
          error={errors.options?.D}
        />
      </div>

      <InputField
        label="correctAnswer"
        id="correctAnswer"
        placeholder="Ingrese la opción correcta"
        register={register("correctAnswer")}
        error={errors.correctAnswer}
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
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Finalizar
        </button>
      </div>
    </form>
  );
};

export default FormQuiz;
