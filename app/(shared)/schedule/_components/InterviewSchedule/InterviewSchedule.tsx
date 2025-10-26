import { api } from '@/convex/_generated/api';
import { useQuery } from 'convex/react';
import { Loader2Icon } from 'lucide-react';
import InterviewDialog from '../InterviewDialog/InterviewDialog';
import MeetingCard from '@/components/shared/MeetingCard';
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

      {!interviews ? (
        <div className='flex justify-center py-12'>
          <Loader2Icon className='size-8 animate-spin text-muted-foreground' />
        </div>
      ) : interviews.length > 0 ? (
        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {interviews.map((i) => (
            <MeetingCard key={i._id} interview={i} />
          ))}
        </div>
      ) : (
        <div className='text-center py-12 text-muted-foreground'>
          No interviews scheduled
        </div>
      )}
    </div>
  );
};

export default InterviewSchedule;
