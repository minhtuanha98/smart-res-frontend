import type { Meta, StoryObj } from '@storybook/nextjs';
import Header from '../Header';

const meta: Meta<typeof Header> = {
  title: 'Atoms/Header',
  component: Header,
};
export default meta;

export const Default: StoryObj = {
  args: {
    title: 'Resident Management',
  },
};
