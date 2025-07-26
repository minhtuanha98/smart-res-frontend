export interface User {
  id: string;
  username: string;
  email: string;
  apartNumber: string;
  phone: string;
  role: 'resident';
  createdAt: '2025-07-22T07:19:34.638Z';
}

export interface UserListResponse {
  users: User[];
  total: number;
  page: number | null;
  limit: number | null;
}
