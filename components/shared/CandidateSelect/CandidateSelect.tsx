import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import React from 'react';
import UserInfo from '../UserInfo';
import { User } from '@/types';

interface CandidateSelectProps {
  candidates: User[];
  value: string;
  onChange: (value: string) => void;
}
const CandidateSelect = ({
  candidates,
  value,
  onChange,
}: CandidateSelectProps) => {
  return (
    <div className='space-y-2'>
      <label className='text-sm font-medium'>Candidate</label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder='Select candidate' />
        </SelectTrigger>
        <SelectContent>
          {candidates.map((c) => (
            <SelectItem key={c.clerkId} value={c.clerkId}>
              <UserInfo user={c} />
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CandidateSelect;
