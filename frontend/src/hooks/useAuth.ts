import { useMutation, useQuery } from '@tanstack/react-query';
import { authApi } from '@/lib/api/auth';
import type { LoginDto, RegisterDto, ForgotPasswordDto, ResetPasswordDto } from '@/lib/api/auth';
import { useAuthStore } from '@/store/authStore';

export const useLoginMutation = () => {
  const { login } = useAuthStore();
  return useMutation({
    mutationFn: (data: LoginDto) => authApi.login(data),
    onSuccess: (res) => login(res.data.user, res.data.tokens),
  });
};

export const useRegisterMutation = () => {
  const { login } = useAuthStore();
  return useMutation({
    mutationFn: (data: RegisterDto) => authApi.register(data),
    onSuccess: (res) => login(res.data.user, res.data.tokens),
  });
};

export const useLogoutMutation = () => {
  const { logout } = useAuthStore();
  return useMutation({
    mutationFn: authApi.logout,
    onSuccess: logout,
  });
};

export const useForgotPasswordMutation = () =>
  useMutation({ mutationFn: (data: ForgotPasswordDto) => authApi.forgotPassword(data) });

export const useResetPasswordMutation = () =>
  useMutation({ mutationFn: (data: ResetPasswordDto) => authApi.resetPassword(data) });

export const useMeQuery = () => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  return useQuery({
    queryKey: ['me'],
    queryFn: async () => {
      const res = await authApi.me();
      return res.data;
    },
    enabled: isAuthenticated,
  });
};
