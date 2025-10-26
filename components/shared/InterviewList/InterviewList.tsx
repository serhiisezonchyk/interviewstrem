import { Loader2Icon } from 'lucide-react';
import MeetingCard from '../MeetingCard';
import { Interview } from '@/types';

interface InterviewsListProps {
  interviews: Interview[] | undefined;
  emptyMessage?: string;
}

const InterviewsList = ({ interviews, emptyMessage }: InterviewsListProps) => {
  if (!interviews) {
    return (
      <div className='flex justify-center py-12'>
        <Loader2Icon className='size-8 animate-spin text-muted-foreground' />
      </div>
    );
  }

  if (interviews.length === 0) {
    return emptyMessage ? (
      <div className='text-center py-12 text-muted-foreground'>
        {emptyMessage}
      </div>
    ) : null;
  }

  return (
    <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
      {interviews.map((interview) => (
        <MeetingCard key={interview._id} interview={interview} />
      ))}
    </div>
  );
};

export default InterviewsList;
