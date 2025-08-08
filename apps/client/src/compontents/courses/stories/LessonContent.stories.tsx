import type { Meta, StoryObj } from "@storybook/react-vite";
import LessonContent from "../VideoPlayer";

const meta: Meta<typeof LessonContent> = {
  title: "Courses/LessonContent",
  component: LessonContent,
};

export default meta;
type Story = StoryObj<typeof LessonContent>;

export const WithVideo: Story = {
  args: {
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    textContent: null,
  },
};

export const WithText: Story = {
  args: {
    videoUrl: null,
    textContent: "Este es el contenido de texto de la lección.",
  },
};

export const EmptyContent: Story = {
  args: {
    videoUrl: null,
    textContent: null,
  },
};
