import type { Meta, StoryObj } from "@storybook/react-vite";
import { MemoryRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { within, userEvent } from "@storybook/testing-library";
import { expect } from "@storybook/jest";
import ListOfCourses from "../ListOfCourses";

const mockCourses = [
  {
    id: 1,
    title: "React Básico",
    description: "Aprende React desde cero",
    createdBy: "Juan",
    isEnrolled: false,
  },
  {
    id: 2,
    title: "Advanced Node.js",
    description: "Node avanzado",
    createdBy: "Pedro",
    isEnrolled: true,
  },
];

jest.mock("../../network/fetch/Courses", () => ({
  listOfCourses: () => Promise.resolve(mockCourses),
  listOfCoursesWhitIdUser: () => Promise.resolve(mockCourses),
}));

const meta: Meta<typeof ListOfCourses> = {
  title: "Courses/ListOfCourses",
  component: ListOfCourses,
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
type Story = StoryObj<typeof ListOfCourses>;

export const Default: Story = {};

export const InteractSubscribe: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const subscribeBtn = await canvas.findByRole("button", {
      name: /Inscribirme/i,
    });

    await userEvent.click(subscribeBtn);

    expect(subscribeBtn).toBeInTheDocument();
  },
};
