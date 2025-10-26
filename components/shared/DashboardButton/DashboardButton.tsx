'use client';

import { Button } from '@/components/ui/button';
import useUserRole from '@/hooks/useUserRole';
import { SparklesIcon } from 'lucide-react';
import Link from 'next/link';

const DashboardButton = () => {
  const { isUser, isLoading } = useUserRole();
  if (isUser || isLoading) {
    return null;
  }
  return (
    <Link href='/dashboard'>
      <Button className='gap-2 font-medium' size='sm'>
        <SparklesIcon className='size-4' />
        Dashboard
      </Button>
    </Link>
  );
};

export default DashboardButton;
