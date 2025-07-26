import type { Meta, StoryObj } from '@storybook/nextjs';
import SidebarItem from '../SidebarItem';

const meta: Meta<typeof SidebarItem> = {
  title: 'Atoms/SidebarItem',
  component: SidebarItem,
};
export default meta;

export const UserUnselected: StoryObj = {
  args: {
    label: 'User Management',
    icon: 'user',
    selected: false,
    onClick: () => alert('Clicked User'),
  },
};

export const UserSelected: StoryObj = {
  args: {
    label: 'User Management',
    icon: 'user',
    selected: true,
    onClick: () => alert('Clicked User'),
  },
};

export const FeedbackUnselected: StoryObj = {
  args: {
    label: 'Feedback Management',
    icon: 'feedback',
    selected: false,
    onClick: () => alert('Clicked Feedback'),
  },
};

export const FeedbackSelected: StoryObj = {
  args: {
    label: 'Feedback Management',
    icon: 'feedback',
    selected: true,
    onClick: () => alert('Clicked Feedback'),
  },
};
