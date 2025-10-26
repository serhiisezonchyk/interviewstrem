'use client';
import { Loader2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
interface LoadingSpinnerProps {
  message?: string;
}
const LoadingSpinner = ({ message }: LoadingSpinnerProps) => {
  return (
    <div className='flex flex-col items-center justify-center text-center h-full w-full gap-2'>
      <Loader2 className='animate-spin h-8 w-8 text-gray-600' />
      {message && <span className='text-sm text-gray-700'>{message}</span>}
    </div>
  );
};

export const LoadingScreen = () => {
  return (
    <div className='h-[calc(100vh-4rem-1px)] flex items-center justify-center'>
      <LoadingSpinner message='Loading...' />
    </div>
  );
};

export default LoadingSpinner;
