import React from 'react';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { XIcon } from 'lucide-react';
import { User } from '@/types';
import UserInfo from '../UserInfo';

interface InterviewersSelectProps {
  interviewers: User[];
  selectedIds: string[];
  onAdd: (id: string) => void;
  onRemove: (id: string) => void;
  currentUserId?: string;
}
const InterviewersSelect = ({
  interviewers,
  selectedIds,
  onAdd,
  onRemove,
  currentUserId,
}: InterviewersSelectProps) => {
  const selected = interviewers.filter((i) => selectedIds.includes(i.clerkId));
  const available = interviewers.filter(
    (i) => !selectedIds.includes(i.clerkId)
  );

  return (
    <div className='space-y-2'>
      <label className='text-sm font-medium'>Interviewers</label>
      <div className='flex flex-wrap gap-2 mb-2'>
        {selected.map((i) => (
          <div
            key={i.clerkId}
            className='inline-flex items-center gap-2 bg-secondary px-2 py-1 rounded-md text-sm'
          >
            <UserInfo user={i} />
            {i.clerkId !== currentUserId && (
              <button
                onClick={() => onRemove(i.clerkId)}
                className='hover:text-destructive transition-colors'
              >
                <XIcon className='h-4 w-4' />
              </button>
            )}
          </div>
        ))}
      </div>
      {available.length > 0 && (
        <Select onValueChange={onAdd}>
          <SelectTrigger>
            <SelectValue placeholder='Add interviewer' />
          </SelectTrigger>
          <SelectContent>
            {available.map((i) => (
              <SelectItem key={i.clerkId} value={i.clerkId}>
                <UserInfo user={i} />
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </div>
  );
};

export default InterviewersSelect;
