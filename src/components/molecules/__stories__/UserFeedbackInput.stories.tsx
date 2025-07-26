import type { Meta, StoryObj } from '@storybook/nextjs';
import React from 'react';
import UserFeedbackInput from '../UserFeedbackInput';

const meta: Meta<typeof UserFeedbackInput> = {
  title: 'Molecules/UserFeedbackInput',
  component: UserFeedbackInput,
};
export default meta;

const baseFormik = {
  handleSubmit: (e?: any) => {
    if (e) e.preventDefault();
    alert('Feedback submitted!');
  },
  handleChange: () => {},
  handleBlur: () => {},
  setFieldValue: () => {},
  values: { title: '', apartNumber: '', content: '', image: null },
  touched: {},
  errors: {},
};

export const Default: StoryObj = {
  render: args => (
    <div style={{ background: '#f5f6fa', padding: 24, minHeight: 400 }}>
      <UserFeedbackInput {...args} />
    </div>
  ),
  args: {
    formik: { ...baseFormik },
    isLoading: false,
    error: '',
  },
};

export const Loading: StoryObj = {
  render: args => (
    <div style={{ background: '#f5f6fa', padding: 24, minHeight: 400 }}>
      <UserFeedbackInput {...args} />
    </div>
  ),
  args: {
    formik: { ...baseFormik },
    isLoading: true,
    error: '',
  },
};

export const WithError: StoryObj = {
  render: args => (
    <div style={{ background: '#f5f6fa', padding: 24, minHeight: 400 }}>
      <UserFeedbackInput {...args} />
    </div>
  ),
  args: {
    formik: {
      ...baseFormik,
      errors: {
        title: 'Title required',
        apartNumber: 'Apartment required',
        content: 'Content required',
      },
      touched: { title: true, apartNumber: true, content: true },
    },
    isLoading: false,
    error: 'Submission failed. Please try again.',
  },
};
