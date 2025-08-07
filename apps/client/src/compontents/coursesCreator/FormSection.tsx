import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import type { TSection } from "../../types/courses.types";
import { saveToStorage } from "../../utils/localStorageHelper";

import InputField from "../ui/input";
import { sectionSchema } from "../../schemas/Course.schema";

type Props = {
  onNext: () => void;
  onBack?: () => void;
};

const FormSection = ({ onNext, onBack }: Props) => {
  const onSubmit = (data: TSection) => {
    saveToStorage("section", data);
    onNext();
  };

  const stored = localStorage.getItem("section");
  const defaultValues = stored
    ? JSON.parse(stored)
    : {
        title: "",
      };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TSection>({
    resolver: yupResolver(sectionSchema),
    defaultValues,
  });

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

export default FormSection;
