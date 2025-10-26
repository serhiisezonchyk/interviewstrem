'use client';
import { LoadingScreen } from '@/components/shared/LoadingSpinner';
import useUserRole from '@/hooks/useUserRole';
import { useRouter } from 'next/navigation';
import React from 'react';
import InterviewSchedule from './_components/InterviewSchedule';

const SchedulePage = () => {
  const router = useRouter();

  const { isLoading, isCreator } = useUserRole();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!isCreator) {
    return router.push('/');
  }

  return <InterviewSchedule />;
};

export default SchedulePage;
