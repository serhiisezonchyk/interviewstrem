import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import useMeetingActions from '@/hooks/useMeetingActions';
import React, { useState } from 'react';
interface MeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  isJoinMeeting: boolean;
}
const MeetingModal = ({
  isOpen,
  onClose,
  title,
  isJoinMeeting,
}: MeetingModalProps) => {
  const [meetingUrl, setMeetingUrl] = useState('');
  const { joinMeeting, createInstantMeeting } = useMeetingActions();
  const handleStart = () => {
    console.log(isJoinMeeting);
    if (isJoinMeeting) {
      const meetingId = meetingUrl.split('/').pop();
      if (meetingId) {
        joinMeeting(meetingId);
      }
    } else {
      createInstantMeeting();
    }
    setMeetingUrl('');
    onClose();
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='w-full sm:max-w-[435px]'>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className='space-y-4 pt-4'>
          {isJoinMeeting && (
            <Input
              placeholder='Paste meeting link here...'
              value={meetingUrl}
              onChange={(e) => setMeetingUrl(e.target.value)}
            />
          )}

          <div className='flex justify-end gap-3'>
            <Button variant='outline' onClick={onClose}>
              Cancel
            </Button>
            <Button
              onClick={handleStart}
              disabled={isJoinMeeting && !meetingUrl.trim()}
            >
              {isJoinMeeting ? 'Join Meeting' : 'Start Meeting'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MeetingModal;
