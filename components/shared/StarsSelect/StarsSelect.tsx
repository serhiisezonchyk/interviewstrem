import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { renderStars } from '@/lib/ui';
import { cn } from '@/lib/utils';
import React from 'react';

interface StarsSelectProps {
  label: string;
  value: string;
  setValue: (value: string) => void;
  placeholder?: string;
  className?: string;
}
const StarsSelect = ({
  label,
  value,
  setValue,
  placeholder = 'Select rating',
  className,
}: StarsSelectProps) => {
  return (
    <div className={cn('space-y-2', className)}>
      {label && <Label>{label}</Label>}
      <Select value={value} onValueChange={setValue}>
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {[1, 2, 3, 4, 5].map((value) => (
            <SelectItem key={value} value={value.toString()}>
              <div className='flex items-center gap-2'>
                {renderStars(value)}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default StarsSelect;
