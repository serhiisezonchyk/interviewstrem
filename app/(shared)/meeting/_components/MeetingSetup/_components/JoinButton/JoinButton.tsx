import { Button } from '@/components/ui/button';
import React, { MouseEventHandler } from 'react';

interface JoinButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
}
const JoinButton = ({ onClick }: JoinButtonProps) => {
  return (
    <div className='space-y-3 mt-8'>
      <Button className='w-full' size='lg' onClick={onClick}>Join meeting</Button>
      <p className='text-xs text-center text-muted-foreground'>
        Don`t worry, our team is super friendly☺️
      </p>
    </div>
  );
};

export default JoinButton;
