import type { Meta, StoryObj } from '@storybook/react-vite';
import UserTable from '../UserTable';

const meta: Meta<typeof UserTable> = {
  title: 'Organisms/UserTable',
  component: UserTable,
};
export default meta;

export const Default: StoryObj<typeof UserTable> = {
  render: args => (
    <div style={{ background: '#fff', padding: 24 }}>
      <UserTable {...args} />
    </div>
  ),
  args: {
    users: [
      {
        id: '1',
        username: 'johndoe',
        email: 'john@example.com',
        phone: '0123456789',
        apartNumber: 'A101',
        role: 'resident',
        createdAt: '2025-07-22T07:19:34.638Z',
      },
      {
        id: '1',
        username: 'johndoe',
        email: 'john@example.com',
        phone: '0123456789',
        apartNumber: 'A101',
        role: 'resident',
        createdAt: '2025-07-22T07:19:34.638Z',
      },
      {
        id: '1',
        username: 'johndoe',
        email: 'john@example.com',
        phone: '0123456789',
        apartNumber: 'A101',
        role: 'resident',
        createdAt: '2025-07-22T07:19:34.638Z',
      },
    ],
    page: 1,
    pageSize: 10,
    _total: 3,
    onPageChange: (page: number) => console.log('Page changed:', page),
  },
};
