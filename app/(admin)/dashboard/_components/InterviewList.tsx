import { Badge } from '@/components/ui/badge';
import { ComponentVariants, Interview, User } from '@/types';
import React from 'react';
import InterviewItem from './InterviewItem';
import { cn } from '@/lib/utils';

interface InterviewListProps {
  title: string;
  variant: ComponentVariants;
  count: number;
  className?: string;
  renderItems: () => React.ReactNode[];
}
const InterviewList = ({
  title,
  variant,
  count,
  renderItems,
  className,
}: InterviewListProps) => {
  return (
    <section className={cn('', className)}>
      <div className='flex items-center gap-2 mb-4'>
        <h2 className='text-xl font-semibold'>{title}</h2>
        <Badge variant={variant}>{count}</Badge>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {renderItems()}
      </div>
    </section>
  );
};

export default InterviewList;
