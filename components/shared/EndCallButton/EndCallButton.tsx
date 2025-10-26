import { Button } from '@/components/ui/button';
import { api } from '@/convex/_generated/api';
import { useCall, useCallStateHooks } from '@stream-io/video-react-sdk';
import { useMutation, useQuery } from 'convex/react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { toast } from 'sonner';

const EndCallButton = () => {
  const call = useCall();
  const router = useRouter();
  const { useLocalParticipant } = useCallStateHooks();

  const localParticipants = useLocalParticipant();

  const updateInterviewStatus = useMutation(
    api.interviews.updateInterviewStatus
  );

  const interview = useQuery(api.interviews.getInterviewByStreamCallId, {
    streamCallId: call?.id || '',
  });

  if (!call || !interview) {
    return null;
  }

  const isMeetingOwner = localParticipants?.userId === call.state.createdBy?.id;

  if (!isMeetingOwner) {
    return null;
  }

  const endCall = async () => {
    try {
      await call.endCall();
      await updateInterviewStatus({
        interviewId: interview._id,
        status: 'completed',
      });
      router.push('/');
      toast.success('Meeting ended for everyone');
    } catch (error) {
      console.error('Failed to end meeting');
      toast.error('Failed to end meeting');
    }
  };
  return (
    <Button variant='destructive' onClick={endCall}>
      End Meeting
    </Button>
  );
};

export default EndCallButton;
