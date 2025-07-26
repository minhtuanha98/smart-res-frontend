import type { Meta, StoryObj } from '@storybook/nextjs';
import ButtonBase from '../ButtonBase';

const meta: Meta<typeof ButtonBase> = {
  title: 'Atoms/ButtonBase',
  component: ButtonBase,
};
export default meta;

export const Primary: StoryObj = {
  args: {
    children: 'Primary Button',
    color: 'primary',
    variant: 'contained',
  },
};

export const Outlined: StoryObj = {
  args: {
    children: 'Outlined Button',
    color: 'primary',
    variant: 'outlined',
  },
};

export const Text: StoryObj = {
  args: {
    children: 'Text Button',
    color: 'primary',
    variant: 'text',
  },
};

export const Error: StoryObj = {
  args: {
    children: 'Error Button',
    color: 'error',
    variant: 'contained',
  },
};

export const CustomFontSize: StoryObj = {
  args: {
    children: 'Large Button',
    color: 'primary',
    fontSize: '24px',
  },
};

export const Disabled: StoryObj = {
  args: {
    children: 'Disabled Button',
    color: 'primary',
    disabled: true,
  },
};
