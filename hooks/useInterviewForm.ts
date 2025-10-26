import { useCallback, useMemo, useState } from 'react';
import { toast } from 'sonner';
import { useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useUser } from '@clerk/nextjs';
import { useMutation, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';

const useInterviewForm = () => {
  const client = useStreamVideoClient();
  const { user } = useUser();

  const createInterview = useMutation(api.interviews.createInterview);
  const users = useQuery(api.users.getUsers) ?? [];

  const candidates = useMemo(
    () => users.filter((u) => u.role === 'user'),
    [users]
  );

  const interviewers = useMemo(
    () => users.filter((u) => u.role === 'creator'),
    [users]
  );

  const [isCreating, setIsCreating] = useState(false);
  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: new Date(),
    time: '09:00',
    candidateId: '',
    interviewerIds: user?.id ? [user.id] : [],
  });

  // 🔹 Memoized handlers (stable references)
  const addInterviewer = useCallback(
    (id: string) => {
      setFormData((prev) =>
        prev.interviewerIds.includes(id)
          ? prev
          : { ...prev, interviewerIds: [...prev.interviewerIds, id] }
      );
    },
    [setFormData]
  );

  const removeInterviewer = useCallback(
    (id: string) => {
      if (id === user?.id) return;
      setFormData((prev) => ({
        ...prev,
        interviewerIds: prev.interviewerIds.filter((i) => i !== id),
      }));
    },
    [user?.id]
  );

  const scheduleMeeting = useCallback(async () => {
    if (!client || !user) return;
    if (!formData.candidateId || formData.interviewerIds.length === 0) {
      toast.error('Please select both candidate and at least one interviewer');
      return;
    }

    setIsCreating(true);

    try {
      const { title, description, date, time, candidateId, interviewerIds } =
        formData;
      const [hours, minutes] = time.split(':');
      const meetingDate = new Date(date);
      meetingDate.setHours(parseInt(hours), parseInt(minutes), 0);

      const id = crypto.randomUUID();
      const call = client.call('default', id);

      await call.getOrCreate({
        data: {
          starts_at: meetingDate.toISOString(),
          custom: {
            description: title,
            additionalDetails: description,
          },
        },
      });

      await createInterview({
        title,
        description,
        startTime: meetingDate.getTime(),
        status: 'upcoming',
        streamCallId: id,
        candidateId,
        interviewerIds,
      });

      toast.success('Meeting scheduled successfully!');
      setOpen(false);
      setFormData({
        title: '',
        description: '',
        date: new Date(),
        time: '09:00',
        candidateId: '',
        interviewerIds: user?.id ? [user.id] : [],
      });
    } catch (err) {
      console.error(err);
      toast.error('Failed to schedule meeting');
    } finally {
      setIsCreating(false);
    }
  }, [client, user, formData, createInterview]);

  return {
    client,
    user,
    candidates,
    interviewers,
    formData,
    setFormData,
    isCreating,
    open,
    setOpen,
    addInterviewer,
    removeInterviewer,
    scheduleMeeting,
  };
};

export default useInterviewForm;
