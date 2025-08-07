import { useState } from "react";
import type { FieldError, UseFormRegisterReturn } from "react-hook-form";

import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Error } from "./ErrorMessage";

interface PasswordInputProps {
  label: string;
  id: string;
  placeholder: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
}

const PasswordInput = ({
  label,
  id,
  placeholder,
  register,
  error,
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative" data-aos="fade-left">
      <label
        htmlFor={id}
        className={`absolute left-3 text-gray-500 transition-all font-bold duration-300
          ${isFocused ? "-top-2 text-sm bg-white px-1" : "top-3"}`}
      >
        {label}
      </label>
      <input
        id={id}
        type={showPassword ? "text" : "password"}
        {...register}
        placeholder={isFocused ? placeholder : ""}
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => setIsFocused(!!e.target.value)}
        className="w-full border border-gray-300 rounded-md p-2 pr-10 focus:border-blue-500 focus:ring-blue-500"
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 top-2 text-gray-500 hover:text-black focus:outline-none"
        tabIndex={-1}
      >
        {showPassword ? <FaEyeSlash /> : <FaEye />}
      </button>
      {error && <Error>{error.message}</Error>}
    </div>
  );
};

export default PasswordInput;
