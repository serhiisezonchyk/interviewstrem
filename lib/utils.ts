import { CandidateInfoType, Interview, User } from '@/types';
import { clsx, type ClassValue } from 'clsx';
import { addHours, isAfter, isBefore, isWithinInterval } from 'date-fns';
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

export const groupInterviews = (interviews: Interview[]) => {
  if (!interviews) return {};

  return interviews.reduce((acc: any, interview: Interview) => {
    const date = new Date(interview.startTime);
    const now = new Date();

    if (interview.status === 'succeded') {
      acc.succeeded = [...(acc.succeeded || []), interview];
    } else if (interview.status === 'failed') {
      acc.failed = [...(acc.failed || []), interview];
    } else if (isBefore(date, now)) {
      acc.completed = [...(acc.completed || []), interview];
    } else if (isAfter(date, now)) {
      acc.upcoming = [...(acc.upcoming || []), interview];
    }

    return acc;
  }, {});
};

export const getCandidateInfo = (
  users: User[],
  candidateId: string
): CandidateInfoType => {
  const candidate = users?.find((user) => user.clerkId === candidateId);
  return {
    name: candidate?.name || 'Unknown Candidate',
    image: candidate?.image || '',
    initials:
      candidate?.name
        ?.split(' ')
        .map((n) => n[0])
        .join('') || 'UC',
  };
};

export const getInterviewerInfo = (users: User[], interviewerId: string) => {
  const interviewer = users?.find((user) => user.clerkId === interviewerId);
  return {
    name: interviewer?.name || 'Unknown Interviewer',
    image: interviewer?.image,
    initials:
      interviewer?.name
        ?.split(' ')
        .map((n) => n[0])
        .join('') || 'UI',
  };
};
