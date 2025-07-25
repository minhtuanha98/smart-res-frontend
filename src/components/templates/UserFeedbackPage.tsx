import React, { useState } from 'react';
import UserFeedbackInput from '../molecules/UserFeedbackInput';
import UserFeedbackTable, {
  UserFeedback,
} from '../organisms/UserFeedbackTable';
import { Box, Container, Pagination } from '@mui/material';
import ButtonBase from '../atoms/ButtonBase';
import { useLogout } from '@/hooks/useLogout';

const UserFeedbackPage: React.FC = () => {
  const { logoutHandler } = useLogout();

  const [form, setForm] = useState({
    title: '',
    apartment: '',
    content: '',
    image: null as File | null,
  });
  const [feedbacks, setFeedbacks] = useState<UserFeedback[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleImageChange = (file: File | null) => {
    setForm(prev => ({ ...prev, image: file }));
  };
  const handleSubmit = (e: React.FormEvent) => {
    // e.preventDefault();
    // setLoading(true);
    // let imageUrl = '';
    // if (form.image) {
    //   imageUrl = URL.createObjectURL(form.image);
    // }
    // setFeedbacks(prev => [
    //   {
    //     title: form.title,
    //     apartment: form.apartment,
    //     content: form.content,
    //     status: 'Chờ xử lý',
    //     imageUrl,
    //   },
    //   ...prev,
    // ]);
    // setForm({ title: '', apartment: '', content: '', image: null });
    // setLoading(false);
  };
  const handleDelete = (idx: number) => {
    setFeedbacks(prev => prev.filter((_, i) => i !== idx));
  };

  const handleLogout = () => {
    logoutHandler.mutate();
  };

  // Phân trang dữ liệu
  const pagedFeedbacks = feedbacks.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  return (
    <Box className='min-h-screen bg-white'>
      <Container maxWidth='md' className='py-4 relative'>
        <Box className='p-2'>
          <ButtonBase variant='outlined' color='error' onClick={handleLogout}>
            Logout
          </ButtonBase>
        </Box>
        <UserFeedbackInput
          values={form}
          onChange={handleChange}
          onImageChange={handleImageChange}
          onSubmit={handleSubmit}
          loading={loading}
        />
        <UserFeedbackTable data={pagedFeedbacks} onDelete={handleDelete} />
        {feedbacks.length > 0 && (
          <Box display='flex' justifyContent='center' mt={2}>
            <Pagination
              count={Math.ceil(feedbacks.length / pageSize)}
              page={page}
              onChange={(_, value) => setPage(value)}
              color='primary'
            />
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default UserFeedbackPage;
