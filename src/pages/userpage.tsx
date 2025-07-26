import React, { useEffect, useState } from 'react';

import { Box, CircularProgress, Container, Pagination } from '@mui/material';
import { useLogout } from '@/hooks/useLogout';
import FeedbackTable from '@/components/organisms/FeedbackTable';
import ButtonBase from '@/components/atoms/ButtonBase';
import UserFeedbackInput from '@/components/molecules/UserFeedbackInput';
import { useFeedBack } from '@/hooks/useFeedBack';

const UserPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const { logoutHandler } = useLogout();

  const { data, formik, isLoading } = useFeedBack({
    page: String(page),
    limit: String(pageSize),
  });

  useEffect(() => {
    if (data?.page && data.page !== page) setPage(data.page);
    if (data?.limit && data.limit !== pageSize) setPageSize(data.limit);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.page, data?.limit]);

  const handleDelete = (id: string) => {};

  const handleLogout = () => {
    logoutHandler.mutate();
  };

  return (
    <Box className='min-h-screen bg-white'>
      <Box className='p-2 flex justify-end'>
        <ButtonBase variant='outlined' color='error' onClick={handleLogout}>
          Logout
        </ButtonBase>
      </Box>
      <Container maxWidth='md' className='py-4 relative'>
        <UserFeedbackInput formik={formik} isLoading={isLoading} />
        {isLoading ? (
          <div className='min-h-[200px] flex items-center justify-center'>
            <CircularProgress color='success' />
          </div>
        ) : (
          <>
            <FeedbackTable
              page={data?.page ?? 1}
              pageSize={pageSize}
              data={data?.feedBacks ?? []}
              onDelete={handleDelete}
              onStatusChange={() => {}}
              userRole='user'
            />
            {(data?.feedBacks?.length ?? 0) > 0 && (
              <Box display='flex' justifyContent='center' mt={2}>
                <Pagination
                  count={Math.ceil((data?.total ?? 1) / (data?.limit ?? 5))}
                  page={page}
                  onChange={(_, value) => setPage(value)}
                  color='primary'
                />
              </Box>
            )}
          </>
        )}
      </Container>
    </Box>
  );
};

export default UserPage;
