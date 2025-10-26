import { Interview } from '@/types';
import { clsx, type ClassValue } from 'clsx';
import { addHours, isBefore, isWithinInterval } from 'date-fns';
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

export const getMeetingStatus = (interview: Interview) => {
  const now = new Date();
  const interviewStartTime = interview.startTime;
  const endTime = addHours(interviewStartTime, 1);

  if (
    interview.status === 'completed' ||
    interview.status === 'failed' ||
    interview.status === 'succeded'
  )
    return 'completed';
  if (isWithinInterval(now, { start: interviewStartTime, end: endTime }))
    return 'live';
  if (isBefore(now, interviewStartTime)) return 'upcoming';
  return 'completed';
};
