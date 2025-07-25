import React, { useState } from 'react';
import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from '@mui/material';
import Table, { Column } from '../atoms/Table';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';

export interface UserFeedback {
  title: string;
  apartment: string;
  content: string;
  status: string;
  imageUrl?: string;
}

interface UserFeedbackTableProps {
  data: UserFeedback[];
  onDelete: (idx: number) => void;
}

const UserFeedbackTable: React.FC<UserFeedbackTableProps> = ({
  data,
  onDelete,
}) => {
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
    { id: 'action', label: 'Hành động', minWidth: 80 },
  ];

  const tableData = data.map((row, idx) => ({
    stt: idx + 1,
    title: row.title,
    apartment: row.apartment,
    content:
      row.content.length > 30 ? row.content.slice(0, 30) + '...' : row.content,
    status: row.status,
    image: (
      <IconButton onClick={() => handleOpen(row)}>
        <VisibilityIcon />
      </IconButton>
    ),
    action: (
      <IconButton color='error' onClick={() => onDelete(idx)}>
        <DeleteIcon />
      </IconButton>
    ),
  }));

  return (
    <>
      <Table
        columns={columns}
        data={
          tableData.length
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
                <b>Căn hộ:</b> {selected.apartment}
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

export default UserFeedbackTable;
