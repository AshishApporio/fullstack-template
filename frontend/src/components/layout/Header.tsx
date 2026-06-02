'use client';

import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';
import { useLogoutMutation } from '@/hooks/useAuth';
import Button from '@/components/ui/Button';
import ThemeToggle from '@/components/ui/ThemeToggle';

export default function Header() {
  const { isAuthenticated, user } = useAuthStore();
  const { mutate: logout, isPending } = useLogoutMutation();

  return (
    <header className="sticky top-0 z-50 border-b border-secondary-200 bg-white/80 backdrop-blur-sm dark:border-secondary-800 dark:bg-secondary-900/80">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center justify-between px-4">
        <Link
          href="/"
          className="text-lg font-semibold text-secondary-900 dark:text-secondary-50"
        >
          {process.env.NEXT_PUBLIC_APP_NAME ?? 'App'}
        </Link>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          {isAuthenticated ? (
            <>
              <span className="hidden text-sm text-secondary-500 dark:text-secondary-400 sm:block">
                {user?.name}
              </span>
              <Button variant="outline" size="sm" loading={isPending} onClick={() => logout()}>
                Sign out
              </Button>
            </>
          ) : (
            <Link href="/login">
              <Button size="sm">Sign in</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
