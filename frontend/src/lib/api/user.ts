import { get, patch, del } from '@/lib/axios';
import type { User, ApiResponse, PaginatedResponse, PaginationParams } from '@/types';

// ─── Request Types ─────────────────────────────────────────────────────────────

export type UpdateUserDto = Partial<Pick<User, 'name' | 'email'>>;

// ─── API ───────────────────────────────────────────────────────────────────────

export const userApi = {
  getAll:   (params?: PaginationParams)              => get<PaginatedResponse<User>>('/users', params),
  getById:  (id: string)                             => get<ApiResponse<User>>(`/users/${id}`),
  update:   (id: string, data: UpdateUserDto)        => patch<ApiResponse<User>>(`/users/${id}`, data),
  delete:   (id: string)                             => del<ApiResponse<null>>(`/users/${id}`),
};
