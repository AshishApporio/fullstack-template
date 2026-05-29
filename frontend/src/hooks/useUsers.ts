import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userApi } from '@/lib/api/user';
import type { UpdateUserDto } from '@/lib/api/user';
import type { PaginationParams } from '@/types';

export const userKeys = {
  all:    ['users'] as const,
  list:   (params?: PaginationParams) => [...userKeys.all, 'list', params] as const,
  detail: (id: string)                => [...userKeys.all, 'detail', id] as const,
};

export const useUsersQuery = (params?: PaginationParams) =>
  useQuery({
    queryKey: userKeys.list(params),
    queryFn:  () => userApi.getAll(params),
  });

export const useUserQuery = (id: string) =>
  useQuery({
    queryKey: userKeys.detail(id),
    queryFn:  async () => {
      const res = await userApi.getById(id);
      return res.data;
    },
    enabled: !!id,
  });

export const useUpdateUserMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: { id: string } & UpdateUserDto) => userApi.update(id, data),
    onSuccess: (_, { id }) => {
      qc.invalidateQueries({ queryKey: userKeys.detail(id) });
      qc.invalidateQueries({ queryKey: userKeys.all });
    },
  });
};

export const useDeleteUserMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => userApi.delete(id),
    onSuccess:  () => qc.invalidateQueries({ queryKey: userKeys.all }),
  });
};
