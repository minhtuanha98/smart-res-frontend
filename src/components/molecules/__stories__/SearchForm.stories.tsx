import type { Meta, StoryObj } from '@storybook/nextjs';
import React, { useState } from 'react';
import SearchForm from '../SearchForm';

const meta: Meta<typeof SearchForm> = {
  title: 'Molecules/SearchForm',
  component: SearchForm,
};
export default meta;

export const Default: StoryObj = {
  render: args => {
    const [value, setValue] = useState('');
    return (
      <div style={{ background: '#f5f6fa', padding: 24, minHeight: 120 }}>
        <SearchForm
          {...args}
          value={value}
          onChange={e => setValue(e.target.value)}
          onSubmit={e => {
            e.preventDefault();
            alert('Search: ' + value);
          }}
        />
      </div>
    );
  },
  args: {
    placeholder: 'Search...',
  },
};

export const WithInitialValue: StoryObj = {
  render: args => {
    const [value, setValue] = useState('Initial search');
    return (
      <div style={{ background: '#f5f6fa', padding: 24, minHeight: 120 }}>
        <SearchForm
          {...args}
          value={value}
          onChange={e => setValue(e.target.value)}
          onSubmit={e => {
            e.preventDefault();
            alert('Search: ' + value);
          }}
        />
      </div>
    );
  },
  args: {
    placeholder: 'Type to search...',
  },
};
