import React from 'react';
import Table, { Column } from '../atoms/Table';
import Pagination from '../atoms/Pagination';
import { Box, Chip } from '@mui/material';

const columns: Column[] = [
  { id: 'name', label: 'Họ tên', minWidth: 120 },
  { id: 'email', label: 'Email', minWidth: 150 },
  { id: 'phone', label: 'Số điện thoại', minWidth: 120 },
  { id: 'apartment', label: 'Căn hộ', minWidth: 80 },
  { id: 'status', label: 'Trạng thái', minWidth: 100 },
  { id: 'action', label: 'Action', minWidth: 120 },
];

export interface User {
  name: string;
  email: string;
  phone: string;
  apartment: string;
  status: 'active' | 'inactive' | 'pending';
}

interface UserTableProps {
  users: User[];
  page: number;
  pageSize: number;
  _total: number;
  onPageChange: (page: number) => void;
}

const statusColor = {
  active: 'success',
  inactive: 'default',
  pending: 'warning',
} as const;

import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Select,
  Box as MuiBox,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const UserTable: React.FC<UserTableProps> = ({
  users,
  page,
  pageSize,
  _total,
  onPageChange,
}) => {
  const [localUsers, setLocalUsers] = React.useState<User[]>(users);
  const [editIdx, setEditIdx] = React.useState<number | null>(null);
  const [editUser, setEditUser] = React.useState<Partial<User>>({});
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    setLocalUsers(users);
  }, [users]);

  const handleEdit = (idx: number) => {
    setEditIdx(idx);
    setEditUser(localUsers[idx]);
    setOpen(true);
  };
  //
  const handleClose = () => {
    setOpen(false);
    setEditIdx(null);
    setEditUser({});
  };
  const handleSave = () => {
    if (editIdx === null) return;
    setLocalUsers(prev =>
      prev.map((u, idx) =>
        idx === editIdx ? { ...u, ...editUser, email: u.email } : u
      )
    );
    handleClose();
  };
  const handleDelete = (idx: number) => {
    setLocalUsers(prev => prev.filter((_, i) => i !== idx));
  };

  const data = localUsers.map((u, idx) => ({
    ...u,
    status: (
      <Chip
        label={
          u.status === 'active'
            ? 'Hoạt động'
            : u.status === 'inactive'
              ? 'Ngưng'
              : 'Chờ duyệt'
        }
        color={statusColor[u.status]}
        size='small'
      />
    ),
    action: (
      <MuiBox display='flex' gap={1}>
        <IconButton
          aria-label='edit'
          onClick={() => handleEdit(idx)}
          size='small'
        >
          <EditIcon />
        </IconButton>
        <IconButton
          aria-label='delete'
          onClick={() => handleDelete(idx)}
          size='small'
          color='error'
        >
          <DeleteIcon />
        </IconButton>
      </MuiBox>
    ),
  }));

  return (
    <Box>
      <Table columns={columns} data={data} />
      <div className='flex justify-end mt-2'>
        <Pagination
          count={Math.ceil(localUsers.length / pageSize)}
          page={page}
          onChange={(_, value) => onPageChange(value)}
        />
      </div>
      <Dialog open={open} onClose={handleClose} maxWidth='xs' fullWidth>
        <DialogTitle>Cập nhật thông tin user</DialogTitle>
        <DialogContent>
          <TextField
            margin='dense'
            label='Họ tên'
            fullWidth
            value={editUser.name || ''}
            onChange={e => setEditUser({ ...editUser, name: e.target.value })}
          />
          <TextField
            margin='dense'
            label='Số điện thoại'
            fullWidth
            value={editUser.phone || ''}
            onChange={e => setEditUser({ ...editUser, phone: e.target.value })}
          />
          <TextField
            margin='dense'
            label='Căn hộ'
            fullWidth
            value={editUser.apartment || ''}
            onChange={e =>
              setEditUser({ ...editUser, apartment: e.target.value })
            }
          />
          <Select
            margin='dense'
            fullWidth
            value={editUser.status || 'active'}
            onChange={e =>
              setEditUser({
                ...editUser,
                status: e.target.value as User['status'],
              })
            }
            sx={{ mt: 2 }}
          >
            <MenuItem value='active'>Hoạt động</MenuItem>
            <MenuItem value='inactive'>Ngưng</MenuItem>
            <MenuItem value='pending'>Chờ duyệt</MenuItem>
          </Select>
          <TextField
            margin='dense'
            label='Email'
            fullWidth
            value={editUser.email || ''}
            disabled
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button onClick={handleSave} variant='contained'>
            Lưu
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserTable;
