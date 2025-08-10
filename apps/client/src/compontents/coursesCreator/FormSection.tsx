import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import type { TSection } from "../../types/courses.types";
import { saveToStorage } from "../../utils/localStorageHelper";

import {InputField} from "../ui/inputField";
import { sectionSchema } from "../../schemas/Course.schema";

type Props = {
  onNext: () => void;
  onBack?: () => void;
};

const FormSection = ({ onNext, onBack }: Props) => {
  const stored = localStorage.getItem("section");
  const defaultValues: TSection = stored ? JSON.parse(stored) : { title: "" };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TSection>({
    resolver: yupResolver(sectionSchema),
    defaultValues,
  });

  const onSubmit = (data: TSection) => {
    saveToStorage("section", data);
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

export default FormSection;
