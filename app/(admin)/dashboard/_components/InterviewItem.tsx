import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Id } from '@/convex/_generated/dataModel';
import { cn } from '@/lib/utils';
import { CandidateInfoType, Interview, InterviewStatus } from '@/types';
import { format } from 'date-fns';
import {
  CalendarIcon,
  CheckCircle2Icon,
  ClockIcon,
  XCircleIcon,
} from 'lucide-react';
interface InterviewItemProps {
  interview: Interview;
  candidateInfo: CandidateInfoType;
  className?: string;
  handleStatusUpdate: (
    interviewId: Id<'interviews'>,
    status: InterviewStatus
  ) => void;
}
const InterviewItem = ({
  interview,
  candidateInfo,
  className,
  handleStatusUpdate,
}: InterviewItemProps) => {
  const startTime = new Date(interview.startTime);

  return (
    <Card className={cn('', className)}>
      <CardHeader className='p-4'>
        <div className='flex items-center gap-3'>
          <Avatar className='h-10 w-10'>
            <AvatarImage src={candidateInfo.image} />
            <AvatarFallback>{candidateInfo.initials}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className='text-base'>{candidateInfo.name}</CardTitle>
            <p className='text-sm text-muted-foreground'>{interview.title}</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className='p-4'>
        <div className='flex items-center gap-4 text-sm text-muted-foreground'>
          <div className='flex items-center gap-1'>
            <CalendarIcon className='h-4 w-4' />
            {format(startTime, 'MMM dd')}
          </div>
          <div className='flex items-center gap-1'>
            <ClockIcon className='h-4 w-4' />
            {format(startTime, 'hh:mm a')}
          </div>
        </div>
      </CardContent>

      <CardFooter className='p-4 pt-0 flex flex-col gap-3'>
        {interview.status === 'completed' && (
          <div className='flex gap-2 w-full'>
            <Button
              className='flex-1'
              onClick={() => handleStatusUpdate(interview._id, 'succeded')}
            >
              <CheckCircle2Icon className='h-4 w-4 mr-2' />
              Pass
            </Button>
            <Button
              variant='destructive'
              className='flex-1'
              onClick={() => handleStatusUpdate(interview._id, 'failed')}
            >
              <XCircleIcon className='h-4 w-4 mr-2' />
              Fail
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default InterviewItem;
