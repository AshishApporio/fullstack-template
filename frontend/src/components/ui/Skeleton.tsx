import { cn } from '@/utils/cn.util';

interface SkeletonProps {
  className?: string;
}

export default function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-secondary-200 dark:bg-secondary-700',
        className
      )}
    />
  );
}
