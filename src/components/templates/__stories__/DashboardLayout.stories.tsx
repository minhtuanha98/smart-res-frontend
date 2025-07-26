// eslint-disable-next-line storybook/no-renderer-packages
import type { Meta, StoryObj } from '@storybook/react';
import DashboardLayout from '../DashboardLayout';

const meta: Meta<typeof DashboardLayout> = {
  title: 'Templates/DashboardLayout',
  component: DashboardLayout,
};
export default meta;

type Story = StoryObj<typeof DashboardLayout>;

export const Default: Story = {
  args: {
    selected: 'user',
    onSelect: (key: any) => console.log('Selected:', key),
    onLogout: () => console.log('Logged out'),
    children: <div>Mock Content</div>,
  },
};
