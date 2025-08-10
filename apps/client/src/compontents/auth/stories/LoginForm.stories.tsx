import type { Meta, StoryObj } from "@storybook/react-vite";
import { MemoryRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { within, userEvent } from "@storybook/testing-library";
import { expect } from "@storybook/jest";
import LoginForm from "../LoginForm";

const meta: Meta<typeof LoginForm> = {
  title: "Forms/LoginForm",
  component: LoginForm,
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
type Story = StoryObj<typeof LoginForm>;

export const Default: Story = {};

export const FilledForm: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const emailInput = canvas.getByPlaceholderText("Ingrese su Correo");
    const passInput = canvas.getByPlaceholderText("Ingresa tu contraseña");
    const submitBtn = canvas.getByRole("button", { name: /Ingresa/i });

    await userEvent.type(emailInput, "test@example.com");
    await userEvent.type(passInput, "123456");
    await userEvent.click(submitBtn);

    expect(emailInput).toHaveValue("test@example.com");
  },
};
