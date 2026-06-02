import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center">
      <h1 className="text-8xl font-bold text-secondary-200 dark:text-secondary-800">404</h1>
      <h2 className="text-2xl font-semibold text-secondary-900 dark:text-secondary-50">
        Page not found
      </h2>
      <p className="max-w-sm text-sm text-secondary-500 dark:text-secondary-400">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link href="/">
        <Button>Go home</Button>
      </Link>
    </div>
  );
}
