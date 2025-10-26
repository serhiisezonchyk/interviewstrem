import { api } from '@/convex/_generated/api';
import { cn } from '@/lib/utils';
import { useQuery } from 'convex/react';
import React from 'react';
import InterviewsList from '../InterviewList';

interface UserInterviewsProps {
  className?: string;
}
const UserInterviews = ({ className }: UserInterviewsProps) => {
  const interviews = useQuery(api.interviews.getMyInterviews);
  return (
    <div className={cn('', className)}>
      <InterviewsList
        emptyMessage='No interviews scheduled'
        interviews={interviews}
      />
    </div>
  );
};

export default UserInterviews;
