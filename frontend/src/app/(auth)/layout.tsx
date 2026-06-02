export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary-50 px-4 dark:bg-secondary-950">
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
}
