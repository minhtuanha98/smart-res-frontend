import type { Meta, StoryObj } from '@storybook/nextjs';
import Table, { Column } from '../Table';

const meta: Meta<typeof Table> = {
  title: 'Atoms/Table',
  component: Table,
};
export default meta;

const columns: Column[] = [
  { id: 'stt', label: 'STT', minWidth: 40 },
  { id: 'username', label: 'Username', minWidth: 120 },
  { id: 'email', label: 'Email', minWidth: 150 },
  { id: 'phone', label: 'Phone number', minWidth: 120 },
  { id: 'apartment', label: 'Apartment', minWidth: 80 },
];

const data = [
  {
    stt: 1,
    username: 'johndoe',
    email: 'john@example.com',
    phone: '0123456789',
    apartment: 'A101',
  },
  {
    stt: 2,
    username: 'janedoe',
    email: 'jane@example.com',
    phone: '0987654321',
    apartment: 'B202',
  },
  {
    stt: 3,
    username: 'alice',
    email: 'alice@example.com',
    phone: '0111222333',
    apartment: 'C303',
  },
];

export const Default: StoryObj = {
  render: args => (
    <div style={{ background: '#fff', padding: 24 }}>
      <Table columns={[]} data={[]} {...args} />
    </div>
  ),
  args: {
    columns,
    data,
  },
};

export const Empty: StoryObj = {
  render: args => (
    <div style={{ background: '#fff', padding: 24 }}>
      <Table columns={[]} data={[]} {...args} />
    </div>
  ),
  args: {
    columns,
    data: [
      {
        specialEmptyRow: true,
        message: 'No Data Available',
      },
    ],
  },
};

export const CustomColumns: StoryObj = {
  render: args => (
    <div style={{ background: '#fff', padding: 24 }}>
      <Table columns={[]} data={[]} {...args} />
    </div>
  ),
  args: {
    columns: [
      { id: 'id', label: 'ID', minWidth: 40 },
      { id: 'name', label: 'Name', minWidth: 120 },
      { id: 'role', label: 'Role', minWidth: 100 },
    ],
    data: [
      { id: 1, name: 'Admin', role: 'admin' },
      { id: 2, name: 'User', role: 'user' },
    ],
  },
};
