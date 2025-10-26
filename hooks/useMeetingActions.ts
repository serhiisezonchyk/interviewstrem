import { useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface UseMeetingActionsReturn {
  createInstantMeeting: () => void;
  joinMeeting: (callId: string) => void;
}
const useMeetingActions = (): UseMeetingActionsReturn => {
  const router = useRouter();
  const client = useStreamVideoClient();
  const createInstantMeeting = async () => {
    if (!client) {
      return;
    }
    try {
      const id = crypto.randomUUID();
      const call = client.call('default', id);
      await call.getOrCreate({
        data: {
          starts_at: new Date().toISOString(),
          custom: {
            description: 'Instant Meeting',
          },
        },
      });
      router.push(`/meeting/${call.id}`);
      toast.success('Meeting Created');
    } catch (error) {
      console.error(error);
      toast.error('Failed to create meeting');
    }
  };

  const joinMeeting = async (callId: string) => {
    if (!client) {
      toast.error('Failed to join meeting');
      return;
    }
    router.push(`/meeting/${callId}`);
  };
  return { joinMeeting, createInstantMeeting };
};

export default useMeetingActions;
