import { format, intervalToDuration } from 'date-fns';

export const formatStartDate = (
  date: string | Date,
  fallback: string = 'Unknown'
) => {
  if (!date) {
    return fallback;
  }
  return format(new Date(date), 'MMM d, yyyy, hh:mm a');
};

export const calculateRecordingDuration = (
  startTime: string,
  endTime: string
) => {
  const start = new Date(startTime);
  const end = new Date(endTime);

  const duration = intervalToDuration({ start, end });

  if (duration.hours && duration.hours > 0) {
    return `${duration.hours}:${String(duration.minutes).padStart(2, '0')}:${String(
      duration.seconds
    ).padStart(2, '0')}`;
  }

  if (duration.minutes && duration.minutes > 0) {
    return `${duration.minutes}:${String(duration.seconds).padStart(2, '0')}`;
  }

  return `${duration.seconds} seconds`;
};
