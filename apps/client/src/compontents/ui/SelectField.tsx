import type { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { Error } from "./ErrorMessage";

type Option = {
  label: string;
  value: string;
};

interface SelectFieldProps {
  label: string;
  id: string;
  options: Option[];
  register: UseFormRegisterReturn;
  error?: FieldError;
}

export const SelectField = ({
  label,
  id,
  options,
  register,
  error,
}: SelectFieldProps) => {
  return (
    <div className="relative" data-aos="fade-left">
      <label
        htmlFor={id}
        className="absolute -top-2 left-3 text-sm bg-white px-1 text-gray-500 font-bold"
      >
        {label}
      </label>
      <select
        id={id}
        {...register}
        className="w-full border border-gray-300 rounded-md p-2 bg-white focus:border-blue-500 focus:ring-blue-500"
      >
        <option value="">Seleccionar rol</option>
        {options.map(({ label, value }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
      {error && <Error>{error.message}</Error>}
    </div>
  );
};
