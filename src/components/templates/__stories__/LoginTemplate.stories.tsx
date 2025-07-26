// eslint-disable-next-line storybook/no-renderer-packages
import type { Meta, StoryObj } from '@storybook/react';
import LoginTemplate from '../LoginTemplate';

const meta: Meta<typeof LoginTemplate> = {
  title: 'Templates/LoginTemplate',
  component: LoginTemplate,
};
export default meta;

type Story = StoryObj<typeof LoginTemplate>;

export const Default: Story = {
  args: {
    title: 'Login',
    formik: {
      handleSubmit: () => console.log('Form submitted'),
      handleChange: () => {},
      handleBlur: () => {},
      values: { username: '', password: '' },
      touched: {},
      errors: {},
    },
  },
};
