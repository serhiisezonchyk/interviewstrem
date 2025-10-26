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
