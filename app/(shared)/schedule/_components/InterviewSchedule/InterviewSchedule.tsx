import { api } from '@/convex/_generated/api';
import { useQuery } from 'convex/react';
import InterviewDialog from '../InterviewDialog/InterviewDialog';
import MeetingCard from '@/components/shared/MeetingCard';
import InterviewsList from '@/components/shared/InterviewList';
const InterviewSchedule = () => {
  const interviews = useQuery(api.interviews.getAllInterviews) ?? [];

  return (
    <div className='container max-w-7xl mx-auto p-6 space-y-8'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold'>Interviews</h1>
          <p className='text-muted-foreground mt-1'>
            Schedule and manage interviews
          </p>
        </div>
        <InterviewDialog />
      </div>

      <InterviewsList
        emptyMessage='No interviews scheduled'
        interviews={interviews}
      />
    </div>
  );
};

export default InterviewSchedule;
