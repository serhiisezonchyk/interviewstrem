import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getFullName = (
  firstName: string | null,
  lastName: string | null,
  placeholder: string = 'User'
) => {
  return (firstName || '' + ' ' + lastName || '').trim() || placeholder;
};

export const copyToClipboard = async (
  data: any,
  onSuccess?: () => void,
  onError?: (error: any) => void
) => {
  try {
    await navigator.clipboard.writeText(data);
    onSuccess?.();
  } catch (error) {
    onError?.(error);
  }
};
