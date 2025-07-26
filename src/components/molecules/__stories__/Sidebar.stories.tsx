import type { Meta, StoryObj } from '@storybook/nextjs';
import Sidebar from '../Sidebar';

const meta: Meta<typeof Sidebar> = {
  title: 'Molecules/Sidebar',
  component: Sidebar,
};
export default meta;

export const Default: StoryObj<typeof Sidebar> = {
  args: {
    selected: 'user',
    onSelect: key => alert('Selected: ' + key),
    onLogout: () => alert('Logout'),
  },
};

export const UserSelected: StoryObj<typeof Sidebar> = {
  render: args => (
    <div style={{ background: '#f5f6fa', minHeight: 400 }}>
      <Sidebar {...args} />
    </div>
  ),
  args: {
    selected: 'user',
    onSelect: key => alert('Selected: ' + key),
    onLogout: () => alert('Logout'),
  },
};

export const FeedbackSelected: StoryObj<typeof Sidebar> = {
  render: args => (
    <div style={{ background: '#f5f6fa', minHeight: 400 }}>
      <Sidebar {...args} />
    </div>
  ),
  args: {
    selected: 'feedback',
    onSelect: key => alert('Selected: ' + key),
    onLogout: () => alert('Logout'),
  },
};
