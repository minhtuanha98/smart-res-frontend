import React, { useState } from 'react';
import Table, { Column } from '../atoms/Table';
import Pagination from '../atoms/Pagination';
import {
  Box,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  IconButton,
  Select,
  MenuItem,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Image from 'next/image';

export interface Feedback {
  name: string;
  apartment: string;
  title: string;
  content: string;
  image?: string;
  status: 'pending' | 'resolved' | 'in_progress';
}

interface FeedbackTableProps {
  feedbacks: Feedback[];
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
}

const columns: Column[] = [
  { id: 'name', label: 'Họ tên', minWidth: 120 },
  { id: 'apartment', label: 'Căn hộ', minWidth: 80 },
  { id: 'title', label: 'Tiêu đề', minWidth: 120 },
  { id: 'shortContent', label: 'Nội dung chi tiết', minWidth: 200 },
  { id: 'status', label: 'Trạng thái', minWidth: 100 },
  { id: 'detail', label: 'Chi tiết', minWidth: 60 },
  { id: 'action', label: 'Cập nhật trạng thái', minWidth: 160 },
];

const statusColor: Record<Feedback['status'], 'warning' | 'success' | 'info'> =
  {
    pending: 'warning',
    resolved: 'success',
    in_progress: 'info',
  };

const FeedbackTable: React.FC<FeedbackTableProps> = ({
  feedbacks,
  page,
  pageSize,
  total,
  onPageChange,
}) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Feedback | null>(null);
  const [localFeedbacks, setLocalFeedbacks] = useState<Feedback[]>(feedbacks);

  React.useEffect(() => {
    setLocalFeedbacks(feedbacks);
  }, [feedbacks]);

  const handleOpen = (fb: Feedback) => {
    setSelected(fb);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setSelected(null);
  };

  const handleChangeStatus = (id: number, newStatus: Feedback['status']) => {
    setLocalFeedbacks(prev =>
      prev.map((f, idx) => (idx === id ? { ...f, status: newStatus } : f))
    );
  };

  const handleDelete = (id: number) => {
    setLocalFeedbacks(prev => prev.filter((_, idx) => idx !== id));
  };

  const data = localFeedbacks.map((f, idx) => ({
    ...f,
    shortContent:
      f.content.length > 30 ? f.content.slice(0, 30) + '...' : f.content,
    status: (
      <Chip
        label={
          f.status === 'pending'
            ? 'Chờ xử lý'
            : f.status === 'resolved'
              ? 'Đã xử lý'
              : 'Đang xử lý'
        }
        color={statusColor[f.status]}
        size='small'
      />
    ),
    detail: (
      <IconButton aria-label='Xem chi tiết' onClick={() => handleOpen(f)}>
        <VisibilityIcon />
      </IconButton>
    ),
    action: (
      <Box display='flex' alignItems='center' gap={1}>
        <Select
          size='small'
          value={f.status}
          onChange={e =>
            handleChangeStatus(idx, e.target.value as Feedback['status'])
          }
          sx={{ minWidth: 120 }}
        >
          <MenuItem value='pending'>Chờ xử lý</MenuItem>
          <MenuItem value='in_progress'>Đang xử lý</MenuItem>
          <MenuItem value='resolved'>Đã xử lý</MenuItem>
        </Select>
        <IconButton
          aria-label='Xóa'
          onClick={() => handleDelete(idx)}
          size='small'
          color='error'
        >
          <span role='img' aria-label='delete'>
            🗑️
          </span>
        </IconButton>
      </Box>
    ),
  }));

  return (
    <Box>
      <Table columns={columns} data={data} />
      <div className='flex justify-end mt-2'>
        <Pagination
          count={Math.ceil(localFeedbacks.length / pageSize)}
          page={page}
          onChange={(_, value) => onPageChange(value)}
        />
      </div>
      <Dialog open={open} onClose={handleClose} maxWidth='sm'>
        <DialogTitle>Chi tiết phản ánh</DialogTitle>
        <DialogContent>
          {selected && (
            <>
              <DialogContentText>
                <b>Tiêu đề:</b> {selected.title || '(Không có tiêu đề)'}
              </DialogContentText>
              <DialogContentText>
                <b>Nội dung:</b> {selected.content || '(Không có nội dung)'}
              </DialogContentText>
              {selected.image && (
                <Box mt={2} borderRadius={2} overflow='hidden'>
                  <Image
                    src={selected.image}
                    alt='feedback'
                    width={400}
                    height={250}
                    style={{ width: '100%', height: 'auto', borderRadius: 8 }}
                  />
                </Box>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default FeedbackTable;
