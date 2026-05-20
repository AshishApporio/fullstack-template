import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Merge tailwind classes safely
export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};
