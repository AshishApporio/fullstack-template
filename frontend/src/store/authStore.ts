import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import type { User, AuthTokens } from '@/types';
import { cookieUtil } from '@/utils/cookie.util';

interface AuthState {
  user: User | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  login: (user: User, tokens: AuthTokens) => void;
  logout: () => void;
  setTokens: (tokens: AuthTokens) => void;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        tokens: null,
        isAuthenticated: false,
        login: (user, tokens) => {
          cookieUtil.set('has_session', '1');
          set({ user, tokens, isAuthenticated: true });
        },
        logout: () => {
          cookieUtil.remove('has_session');
          set({ user: null, tokens: null, isAuthenticated: false });
        },
        setTokens: (tokens) => set({ tokens }),
      }),
      { name: 'app:auth' }
    ),
    { name: 'AuthStore' }
  )
);
