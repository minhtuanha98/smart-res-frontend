import '../src/styles/globals.css';
import type { Preview } from '@storybook/nextjs';
import React from 'react';

const preview: Preview = {
  decorators: [
    Story =>
      React.createElement(
        'div',
        {
          style: { background: '#fff', minHeight: '100vh', minWidth: '100vw' },
        },
        React.createElement(Story)
      ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'white',
      values: [
        { name: 'white', value: '#fff' },
        { name: 'light', value: '#f5f6fa' },
        { name: 'gray', value: '#f3f4f6' },
      ],
    },
  },
};

export default preview;
