import Header from '@/components/layout/Header';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-secondary-50 dark:bg-secondary-950">
      <Header />
      <main className="flex-1 mx-auto w-full max-w-screen-xl px-4 py-6">{children}</main>
    </div>
  );
}
