import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User } from '@/types';
import { UserCircleIcon } from 'lucide-react';
import React from 'react';

interface UserInfoProps {
  user: User;
}
const UserInfo = ({ user }: UserInfoProps) => {
  return (
    <div className='flex items-center gap-2'>
      <Avatar className='h-6 w-6'>
        <AvatarImage src={user.image} />
        <AvatarFallback>
          <UserCircleIcon className='h-4 w-4' />
        </AvatarFallback>
      </Avatar>
      <span>{user.name}</span>
    </div>
  );
};

export default UserInfo;
