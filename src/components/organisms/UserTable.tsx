import React from 'react';
import Table, { Column } from '@/components/atoms/Table';
import Pagination from '@/components/atoms/Pagination';
import { Box } from '@mui/material';
import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box as MuiBox,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { User } from '@/types/userType';

const columns: Column[] = [
  { id: 'stt', label: 'STT', minWidth: 40 },
  { id: 'username', label: 'Username', minWidth: 120 },
  { id: 'email', label: 'Email', minWidth: 150 },
  { id: 'phone', label: 'Phone number', minWidth: 120 },
  { id: 'apartment', label: 'Apartment', minWidth: 80 },
  { id: 'action', label: 'Action', minWidth: 120 },
];

interface UserTableProps {
  users: User[];
  page: number;
  pageSize: number;
  _total: number;
  onPageChange: (page: number) => void;
}

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

  const data = users?.map((row, idx) => ({
    stt: (page - 1) * pageSize + idx + 1,
    username: row.username,
    email: row.email,
    phone: row.phone,
    apartment: row.apartNumber,
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
      <Dialog open={open} onClose={handleClose} maxWidth='xs'>
        <DialogTitle>Update user information</DialogTitle>
        <DialogContent>
          <TextField
            margin='dense'
            label='Username'
            fullWidth
            value={editUser.username || ''}
            onChange={e =>
              setEditUser({ ...editUser, username: e.target.value })
            }
          />
          <TextField
            disabled
            margin='dense'
            label='Email'
            fullWidth
            value={editUser.email || ''}
            onChange={e => setEditUser({ ...editUser, email: e.target.value })}
          />
          <TextField
            margin='dense'
            label='Phone number'
            fullWidth
            value={editUser.phone || ''}
            onChange={e => setEditUser({ ...editUser, phone: e.target.value })}
          />

          <TextField
            margin='dense'
            label='Apartment'
            fullWidth
            value={editUser.apartNumber || ''}
            onChange={e =>
              setEditUser({ ...editUser, apartNumber: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave} variant='contained'>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserTable;
