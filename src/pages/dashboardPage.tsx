import React, { useState, useMemo } from 'react';
import UserTable, { User } from '@/components/organisms/UserTable';
import SearchForm from '@/components/molecules/SearchForm';
import FeedbackTable, { Feedback } from '@/components/organisms/FeedbackTable';
import DashboardLayout from '@/components/templates/DashboardLayout';

const MOCK_USERS: User[] = [
  {
    name: 'Nguyễn Văn A',
    email: 'a@gmail.com',
    phone: '0901234567',
    apartment: 'A101',
    status: 'active',
  },
  {
    name: 'Trần Thị B',
    email: 'b@gmail.com',
    phone: '0912345678',
    apartment: 'B202',
    status: 'inactive',
  },
  {
    name: 'Lê Văn C',
    email: 'c@gmail.com',
    phone: '0923456789',
    apartment: 'C303',
    status: 'pending',
  },
  {
    name: 'Phạm Thị D',
    email: 'd@gmail.com',
    phone: '0934567890',
    apartment: 'D404',
    status: 'active',
  },
  {
    name: 'Vũ Văn E',
    email: 'e@gmail.com',
    phone: '0945678901',
    apartment: 'E505',
    status: 'active',
  },
  {
    name: 'Đỗ Thị F',
    email: 'f@gmail.com',
    phone: '0956789012',
    apartment: 'F606',
    status: 'inactive',
  },
  {
    name: 'Ngô Văn G',
    email: 'g@gmail.com',
    phone: '0967890123',
    apartment: 'G707',
    status: 'pending',
  },
  {
    name: 'Bùi Thị H',
    email: 'h@gmail.com',
    phone: '0978901234',
    apartment: 'H808',
    status: 'active',
  },
  {
    name: 'Hoàng Văn I',
    email: 'i@gmail.com',
    phone: '0989012345',
    apartment: 'I909',
    status: 'active',
  },
  {
    name: 'Phan Thị K',
    email: 'k@gmail.com',
    phone: '0990123456',
    apartment: 'K010',
    status: 'inactive',
  },
];

const MOCK_FEEDBACKS: Feedback[] = [
  {
    name: 'Nguyễn Văn A',
    apartment: 'A101',
    title: 'Nước yếu',
    content:
      'Nước trong phòng tắm chảy rất yếu, không đủ dùng cho sinh hoạt hàng ngày.',
    image: '/assets/images/coffee.jpeg',
    status: 'pending',
  },
  {
    name: 'Trần Thị B',
    apartment: 'B202',
    title: 'Thang máy hỏng',
    content:
      'Thang máy số 1 không hoạt động từ sáng nay, mong ban quản lý kiểm tra.',
    image: '/assets/images/coffee.jpeg',
    status: 'resolved',
  },
  {
    name: 'Lê Văn C',
    apartment: 'C303',
    title: 'Mất điện',
    content: 'Cúp điện đột ngột vào tối qua, hành lang không có đèn.',
    image: '/assets/images/coffee.jpeg',
    status: 'pending',
  },
  {
    name: 'Phạm Thị D',
    apartment: 'D404',
    title: 'Bảo vệ không trực',
    content: 'Tối qua không thấy bảo vệ trực ở sảnh, gây lo lắng cho cư dân.',
    image: '/assets/images/coffee.jpeg',
    status: 'resolved',
  },
  {
    name: 'Vũ Văn E',
    apartment: 'E505',
    title: 'Rác chưa thu gom',
    content: 'Rác ở hành lang tầng 5 chưa được thu gom trong 2 ngày.',
    image: '/assets/images/coffee.jpeg',
    status: 'pending',
  },
  {
    name: 'Đỗ Thị F',
    apartment: 'F606',
    title: 'Cửa ra vào hỏng',
    content: 'Cửa ra vào tầng 6 bị kẹt, khó mở và đóng.',
    image: '/assets/images/coffee.jpeg',
    status: 'resolved',
  },
];

const PAGE_SIZE = 5;

const DashboardPage: React.FC = () => {
  const [tab, setTab] = useState<'user' | 'feedback'>('user');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  // Filtered data
  const filteredUsers = useMemo(
    () =>
      MOCK_USERS.filter(
        u =>
          u.name.toLowerCase().includes(search.toLowerCase()) ||
          u.email.toLowerCase().includes(search.toLowerCase()) ||
          u.phone.includes(search) ||
          u.apartment.toLowerCase().includes(search.toLowerCase())
      ),
    [search]
  );
  const filteredFeedbacks = useMemo(
    () =>
      MOCK_FEEDBACKS.filter(
        f =>
          f.name.toLowerCase().includes(search.toLowerCase()) ||
          f.apartment.toLowerCase().includes(search.toLowerCase()) ||
          f.content.toLowerCase().includes(search.toLowerCase())
      ),
    [search]
  );

  // Pagination
  const pagedUsers = useMemo(
    () => filteredUsers.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [filteredUsers, page]
  );
  const pagedFeedbacks = useMemo(
    () => filteredFeedbacks.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [filteredFeedbacks, page]
  );

  // Reset page when tab/search changes
  React.useEffect(() => {
    setPage(1);
  }, [tab, search]);

  const handleLogout = () => {
    // TODO: handle logout logic
    alert('Đăng xuất!');
  };

  return (
    <DashboardLayout selected={tab} onSelect={setTab} onLogout={handleLogout}>
      <SearchForm
        value={search}
        onChange={e => setSearch(e.target.value)}
        onSubmit={e => {
          e.preventDefault();
        }}
        placeholder={
          tab === 'user'
            ? 'Tìm kiếm tên, email, SĐT, căn hộ...'
            : 'Tìm kiếm tên, căn hộ, nội dung...'
        }
      />
      {tab === 'user' ? (
        <UserTable
          users={pagedUsers}
          page={page}
          pageSize={PAGE_SIZE}
          _total={filteredUsers.length}
          onPageChange={setPage}
        />
      ) : (
        <FeedbackTable
          feedbacks={pagedFeedbacks}
          page={page}
          pageSize={PAGE_SIZE}
          total={filteredFeedbacks.length}
          onPageChange={setPage}
        />
      )}
    </DashboardLayout>
  );
};

export default DashboardPage;
