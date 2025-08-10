import type { Meta, StoryObj } from "@storybook/react-vite";
import type { UseFormRegisterReturn, FieldError } from "react-hook-form";
import { PasswordInput } from "../inputPassword";

const mockRegister: UseFormRegisterReturn = {
  name: "password",
  onChange: () => Promise.resolve(),
  onBlur: () => Promise.resolve(),
  ref: () => {},
};

const meta: Meta<typeof PasswordInput> = {
  title: "Form/PasswordInput",
  component: PasswordInput,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof PasswordInput>;

export const Default: Story = {
  args: {
    label: "Contraseña",
    id: "password",
    placeholder: "Ingresa tu contraseña",
    register: mockRegister,
    error: undefined,
  },
};

export const WithError: Story = {
  args: {
    label: "Contraseña",
    id: "password",
    placeholder: "Ingresa tu contraseña",
    register: mockRegister,
    error: {
      type: "required",
      message: "Campo requerido",
    } as FieldError,
  },
};
