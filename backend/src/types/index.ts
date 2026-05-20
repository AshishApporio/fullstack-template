export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
  created_at: Date;
  updated_at: Date;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
}
