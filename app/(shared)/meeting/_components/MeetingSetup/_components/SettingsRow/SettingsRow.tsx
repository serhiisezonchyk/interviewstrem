import React, { ReactNode } from 'react';

interface SettingsRowProps {
  icon: ReactNode;
  title: string;
  description: string;
  rightElement?: ReactNode;
}

const SettingsRow = ({
  icon,
  title,
  description,
  rightElement,
}: SettingsRowProps) => {
  return (
    <div className='flex items-center justify-between'>
      <div className='flex items-center gap-3'>
        <div className='h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center'>
          {icon}
        </div>
        <div>
          <p className='font-medium'>{title}</p>
          <p className='text-sm text-muted-foreground'>{description}</p>
        </div>
      </div>
      {rightElement}
    </div>
  );
};

export default SettingsRow;
