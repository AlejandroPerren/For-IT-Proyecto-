import type { Meta, StoryObj } from "@storybook/react-vite";
import type { UseFormRegisterReturn, FieldError } from "react-hook-form";
import { InputField } from "../inputField";

const mockRegister: UseFormRegisterReturn = {
  name: "email",
  onChange: () => Promise.resolve(), 
  onBlur: () => Promise.resolve(),
  ref: () => {},
};

const meta: Meta<typeof InputField> = {
  title: "Form/InputField",
  component: InputField,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof InputField>;

export const Default: Story = {
  args: {
    label: "Email",
    id: "email",
    placeholder: "Introduce tu email",
    type: "email",
    register: mockRegister,
    error: undefined,
  },
};

export const WithError: Story = {
  args: {
    label: "Email",
    id: "email",
    placeholder: "Introduce tu email",
    type: "email",
    register: mockRegister,
    error: {
      type: "required",
      message: "Este campo es obligatorio",
    } as FieldError,
  },
};
