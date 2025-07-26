import React, { useState } from 'react';
import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Select,
  MenuItem,
  FormControl,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import Table, { Column } from '@/components/atoms/Table';
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
    { id: 'title', label: 'Title', minWidth: 120 },
    { id: 'apartment', label: 'Apartment', minWidth: 80 },
    { id: 'content', label: 'Detail', minWidth: 200 },
    { id: 'status', label: 'Status', minWidth: 100 },
    { id: 'image', label: 'Image', minWidth: 60 },
    ...(userRole === 'admin'
      ? [
          { id: 'statusChange', label: 'Change Status', minWidth: 120 },
          { id: 'action', label: 'Action', minWidth: 80 },
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
                <MenuItem value='pending'>Pending</MenuItem>
                <MenuItem value='resolved'>Completed</MenuItem>
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
                  message: 'No Data Available',
                },
              ]
        }
      />
      <Dialog open={open} onClose={handleClose} maxWidth='sm'>
        <DialogTitle> Feed Back Detail</DialogTitle>
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
                <b>Title:</b> {selected.title}
              </DialogContentText>
              <DialogContentText>
                <b>Apartment:</b> {selected.apartNumber}
              </DialogContentText>
              <DialogContentText>
                <b>Detail:</b> {selected.content}
              </DialogContentText>
              <DialogContentText>
                <b>Status:</b> {selected.status}
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
