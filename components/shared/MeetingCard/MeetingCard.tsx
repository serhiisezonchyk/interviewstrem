import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import useMeetingActions from '@/hooks/useMeetingActions';
import { getMeetingStatus } from '@/lib/utils';
import { Interview } from '@/types';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
interface MeetingCardProps {
  interview: Interview;
}
const MeetingCard = ({ interview }: MeetingCardProps) => {
  const { joinMeeting } = useMeetingActions();
  const status = getMeetingStatus(interview);
  const formattedDate = format(
    new Date(interview.startTime),
    'EEEE, MMMM d - h:mm a'
  );

  return (
    <Card>
      <CardHeader className='space-y-2'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2 text-sm text-muted-foreground'>
            <CalendarIcon className='size-4' />
            {formattedDate}
          </div>
          <Badge
            variant={
              status === 'live'
                ? 'default'
                : status === 'upcoming'
                  ? 'secondary'
                  : 'outline'
            }
          >
            {status === 'live'
              ? 'Live Now'
              : status === 'upcoming'
                ? 'Upcoming'
                : 'Completed'}
          </Badge>
        </div>
        <CardTitle>{interview.title}</CardTitle>
        {interview.description && (
          <CardDescription className='line-clamp-2'>
            {interview.description}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent>
        {status === 'live' && (
          <Button
            className='w-full'
            onClick={() => joinMeeting(interview.streamCallId)}
          >
            Join Meeting
          </Button>
        )}

        {status === 'upcoming' && (
          <Button variant='outline' className='w-full' disabled>
            Waiting to Start
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default MeetingCard;
