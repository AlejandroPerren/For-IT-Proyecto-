import type { Meta, StoryObj } from "@storybook/react-vite";
import { MemoryRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { within, userEvent } from "@storybook/testing-library";
import { expect } from "@storybook/jest";
import RegisterForm from "../RegisterForm";

const meta: Meta<typeof RegisterForm> = {
  title: "Forms/RegisterForm",
  component: RegisterForm,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
        <ToastContainer />
      </MemoryRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof RegisterForm>;

export const Default: Story = {};

export const FilledForm: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const nameInput = canvas.getByPlaceholderText("Ingrese su Nombre");
    const emailInput = canvas.getByPlaceholderText("Ingrese su Correo");
    const passInput = canvas.getByPlaceholderText("Ingresa tu contraseña");
    const submitBtn = canvas.getByRole("button", { name: /Ingresa/i });

    await userEvent.type(nameInput, "Alejandro");
    await userEvent.type(emailInput, "test@example.com");
    await userEvent.type(passInput, "123456");
    await userEvent.click(submitBtn);

    expect(nameInput).toHaveValue("Alejandro");
    expect(emailInput).toHaveValue("test@example.com");
  },
};
