import type { Meta, StoryObj } from "@storybook/react-vite";

import { within, userEvent } from "@storybook/testing-library";
import { expect } from "@storybook/jest";
import NavCourse from "../NavCurse";

localStorage.setItem(
  "sections",
  JSON.stringify([
    { id: 1, title: "Introducción" },
    { id: 2, title: "Avanzado" },
  ])
);

localStorage.setItem(
  "lessons",
  JSON.stringify([
    { id: 1, sectionId: 1, title: "Bienvenida" },
    { id: 2, sectionId: 2, title: "Tema Avanzado" },
  ])
);

const meta: Meta<typeof NavCourse> = {
  title: "Courses/NavCourse",
  component: NavCourse,
};

export default meta;
type Story = StoryObj<typeof NavCourse>;

export const Default: Story = {
  args: {
    onSelectLesson: (lesson) => console.log("Lección seleccionada:", lesson),
  },
};

export const OpenSectionAndClickLesson: Story = {
  args: {
    onSelectLesson: (lesson) => console.log("Lección seleccionada:", lesson),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const sectionBtn = await canvas.findByRole("button", {
      name: /Introducción/i,
    });
    await userEvent.click(sectionBtn);

    const lessonBtn = await canvas.findByRole("button", {
      name: /Bienvenida/i,
    });
    await userEvent.click(lessonBtn);

    expect(lessonBtn).toBeInTheDocument();
  },
};
