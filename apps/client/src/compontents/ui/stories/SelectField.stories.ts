import type { Meta, StoryObj } from "@storybook/react-vite";
import type { UseFormRegisterReturn, FieldError } from "react-hook-form";
import { SelectField } from "../SelectField";

const mockRegister: UseFormRegisterReturn = {
  name: "role",
  onChange: () => Promise.resolve(),
  onBlur: () => Promise.resolve(),
  ref: () => {},
};

const options = [
  { label: "Admin", value: "admin" },
  { label: "Usuario", value: "user" },
];

const meta: Meta<typeof SelectField> = {
  title: "Form/SelectField",
  component: SelectField,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof SelectField>;

export const Default: Story = {
  args: {
    label: "Rol",
    id: "role",
    options,
    register: mockRegister,
    error: undefined,
  },
};

export const WithError: Story = {
  args: {
    label: "Rol",
    id: "role",
    options,
    register: mockRegister,
    error: {
      type: "required",
      message: "Campo requerido",
    } as FieldError,
  },
};
