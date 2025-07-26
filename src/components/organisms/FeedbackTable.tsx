import React, { useState } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Select,
  MenuItem,
  FormControl,
  CircularProgress,
} from '@mui/material';
import Table, { Column } from '../atoms/Table';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
// Update the path below to the correct relative path if needed
export interface UserFeedback {
  id: string;
  title: string;
  content: string;
  apartNumber: string;
  userId: string;
  imageUrl: string | null;
  status: string;
}

interface UserFeedbackTableProps {
  page: number;
  pageSize: number;
  data?: UserFeedback[];
  onDelete: (id: string) => void;
  onStatusChange: (id: string, newStatus: string) => void;
  userRole?: 'admin' | 'user';
}

export const FeedbackTable = ({
  page,
  pageSize,
  data = [],
  onDelete,
  onStatusChange,
  userRole = 'user',
}: UserFeedbackTableProps) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<UserFeedback | null>(null);

  const handleOpen = (row: UserFeedback) => {
    setSelected(row);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setSelected(null);
  };

  const columns: Column[] = [
    { id: 'stt', label: 'STT', minWidth: 40 },
    { id: 'title', label: 'Tiêu đề', minWidth: 120 },
    { id: 'apartment', label: 'Căn hộ', minWidth: 80 },
    { id: 'content', label: 'Nội dung chi tiết', minWidth: 200 },
    { id: 'status', label: 'Trạng thái', minWidth: 100 },
    { id: 'image', label: 'Hình ảnh', minWidth: 60 },
    ...(userRole === 'admin'
      ? [
          { id: 'statusChange', label: 'Thay đổi trạng thái', minWidth: 120 },
          { id: 'action', label: 'Hành động', minWidth: 80 },
        ]
      : []),
  ];

  const tableData = data?.map((row: UserFeedback, idx: number) => ({
    stt: (page - 1) * pageSize + idx + 1,
    title: row.title,
    apartment: row.apartNumber,
    content:
      row.content.length > 30 ? row.content.slice(0, 30) + '...' : row.content,
    status: row.status,
    image: (
      <IconButton onClick={() => handleOpen(row)}>
        <VisibilityIcon />
      </IconButton>
    ),
    ...(userRole === 'admin'
      ? {
          statusChange: (
            <FormControl size='small'>
              <Select
                value={row.status}
                onChange={e => onStatusChange(row.id, e.target.value)}
                variant='outlined'
                size='small'
                disabled={row.status === 'resolved'}
              >
                <MenuItem value='pending'>Chờ xử lý</MenuItem>
                <MenuItem value='resolved'>Hoàn thành</MenuItem>
              </Select>
            </FormControl>
          ),
          action: (
            <IconButton
              disabled={row.status === 'pending'}
              color='error'
              onClick={() => onDelete(row.id)}
            >
              <DeleteIcon />
            </IconButton>
          ),
        }
      : {}),
  }));

  return (
    <>
      <Table
        columns={columns}
        data={
          tableData?.length
            ? tableData
            : [
                {
                  specialEmptyRow: true,
                  message: 'Không có dữ liệu',
                },
              ]
        }
      />
      <Dialog open={open} onClose={handleClose} maxWidth='sm'>
        <DialogTitle>Chi tiết phản ánh</DialogTitle>
        <DialogContent
          sx={{
            bgcolor: 'white',
            maxHeight: 400,
            overflowY: 'auto',
            '&::-webkit-scrollbar': {
              width: 8,
              backgroundColor: '#fff',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#e0e0e0',
              borderRadius: 4,
            },
            scrollbarColor: '#e0e0e0 #fff',
            scrollbarWidth: 'thin',
          }}
        >
          {selected && (
            <>
              <DialogContentText>
                <b>Tiêu đề:</b> {selected.title}
              </DialogContentText>
              <DialogContentText>
                <b>Căn hộ:</b> {selected.apartNumber}
              </DialogContentText>
              <DialogContentText>
                <b>Nội dung:</b> {selected.content}
              </DialogContentText>
              <DialogContentText>
                <b>Trạng thái:</b> {selected.status}
              </DialogContentText>
              {selected.imageUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={selected.imageUrl}
                  alt='feedback'
                  className='w-full max-w-md h-auto rounded mt-2'
                />
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FeedbackTable;
