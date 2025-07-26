import type { Meta, StoryObj } from '@storybook/react-vite';
import FeedbackTable from '../FeedbackTable';

const meta: Meta<typeof FeedbackTable> = {
  title: 'Organisms/FeedbackTable',
  component: FeedbackTable,
};
export default meta;

const mockData = [
  {
    id: '1',
    title: 'Broken Light',
    content:
      'The light in the hallway is broken and needs to be fixed as soon as possible.',
    apartNumber: 'A101',
    userId: 'u1',
    imageUrl:
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    status: 'pending',
  },
  {
    id: '2',
    title: 'Water Leak',
    content:
      'There is a water leak in the kitchen. Please send someone to check.',
    apartNumber: 'B202',
    userId: 'u2',
    imageUrl: null,
    status: 'resolved',
  },
  {
    id: '3',
    title: 'Noise Complaint',
    content: 'Loud noise from apartment C303 every night.',
    apartNumber: 'C303',
    userId: 'u3',
    imageUrl: null,
    status: 'pending',
  },
];

export const Default: StoryObj<typeof FeedbackTable> = {
  args: {
    page: 1,
    pageSize: 10,
    data: mockData,
    onDelete: (id: string) => alert('Delete: ' + id),
    onStatusChange: (id: string, status: string) =>
      alert(`Status for ${id}: ${status}`),
    userRole: 'user',
  },
};

export const UserView: StoryObj<typeof FeedbackTable> = {
  render: args => (
    <div style={{ background: '#fff', padding: 24 }}>
      <FeedbackTable {...args} />
    </div>
  ),
  args: {
    page: 1,
    pageSize: 10,
    data: mockData,
    onDelete: (id: string) => alert('Delete: ' + id),
    onStatusChange: (id: string, status: string) =>
      alert(`Status for ${id}: ${status}`),
    userRole: 'user',
  },
};

export const AdminView: StoryObj<typeof FeedbackTable> = {
  render: args => (
    <div style={{ background: '#fff', padding: 24 }}>
      <FeedbackTable {...args} />
    </div>
  ),
  args: {
    page: 1,
    pageSize: 10,
    data: mockData,
    onDelete: (id: string) => alert('Delete: ' + id),
    onStatusChange: (id: string, status: string) =>
      alert(`Status for ${id}: ${status}`),
    userRole: 'admin',
  },
};

export const Empty: StoryObj<typeof FeedbackTable> = {
  render: args => (
    <div style={{ background: '#fff', padding: 24 }}>
      <FeedbackTable {...args} />
    </div>
  ),
  args: {
    page: 1,
    pageSize: 10,
    data: [],
    onDelete: () => {},
    onStatusChange: () => {},
    userRole: 'user',
  },
};
