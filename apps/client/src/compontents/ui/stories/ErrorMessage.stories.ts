import type { Meta, StoryObj } from "@storybook/react-vite";
import { Error } from '../ErrorMessage';


const meta: Meta<typeof Error> = {
  title: 'UI/Error',
  component: Error,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Error>;

export const Default: Story = {
  args: {
    children: 'Este es un mensaje de error para formularios',
  },
};
