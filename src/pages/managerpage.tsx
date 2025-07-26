import React, { useState, useEffect } from 'react';
import UserTable from '@/components/organisms/UserTable';
import SearchForm from '@/components/molecules/SearchForm';
import DashboardLayout from '@/components/templates/DashboardLayout';
import { useLogout } from '@/hooks/useLogout';
import { useFeedBack } from '@/hooks/useFeedBack';

import { useUpdateFeedBack } from '@/hooks/useUpdateFeedBack';
import FeedbackTable from '@/components/organisms/FeedbackTable';

import { useDeleteFeedBack } from '@/hooks/useDeleteFeedBack';
import { Box, CircularProgress, Pagination } from '@mui/material';
import { useUser } from '@/hooks/useUser';

const ManagerPage: React.FC = () => {
  const [tab, setTab] = useState<'user' | 'feedback'>('user');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const { logoutHandler } = useLogout();
  const [pageSize, setPageSize] = useState(10);
  const { data } = useFeedBack({
    page: String(page),
    limit: String(pageSize),
  });
  const { updateStatusMutation } = useUpdateFeedBack();
  const { deleteFeedBack } = useDeleteFeedBack();
  const { users, isLoading } = useUser({
    page: String(page),
    limit: String(pageSize),
  });

  useEffect(() => {
    if (data?.page && data.page !== page) setPage(data.page);
    if (data?.limit && data.limit !== pageSize) setPageSize(data.limit);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.page, data?.limit]);

  const handleLogout = () => {
    logoutHandler.mutate();
  };

  const handleDelete = (id: string) => {
    deleteFeedBack.mutate(id);
  };

  const handleStatusChange = (id: string, newStatus: string) => {
    updateStatusMutation.mutate({ id, status: newStatus });
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
        <>
          {isLoading ? (
            <div className='min-h-[200px] flex items-center justify-center'>
              <CircularProgress color='success' />
            </div>
          ) : (
            <>
              <UserTable
                page={users?.page ?? 1}
                users={users?.users ?? []}
                pageSize={pageSize}
                _total={users?.total ?? 0}
                onPageChange={setPage}
              />
              <Box display='flex' justifyContent='center' mt={2}>
                <Pagination
                  count={Math.ceil((users?.total ?? 1) / (users?.limit ?? 5))}
                  page={page}
                  onChange={(_, value) => setPage(value)}
                  color='primary'
                />
              </Box>
            </>
          )}
        </>
      ) : (
        <>
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
                onStatusChange={handleStatusChange}
                userRole='admin'
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
        </>
      )}
    </DashboardLayout>
  );
};

export default ManagerPage;
