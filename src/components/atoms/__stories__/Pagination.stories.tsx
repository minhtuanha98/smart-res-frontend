import type { Meta, StoryObj } from '@storybook/nextjs';
import Pagination from '../Pagination';

const meta: Meta<typeof Pagination> = {
  title: 'Atoms/Pagination',
  component: Pagination,
};
export default meta;

export const Default: StoryObj = {
  args: {
    count: 10,
    page: 1,
    onChange: (_: any, value: string) => alert('Page: ' + value),
  },
};

export const CustomPage: StoryObj = {
  args: {
    count: 5,
    page: 3,
    onChange: (_: any, value: string) => alert('Page: ' + value),
  },
};

export const Disabled: StoryObj = {
  args: {
    count: 10,
    page: 1,
    disabled: true,
    onChange: () => {},
  },
};
