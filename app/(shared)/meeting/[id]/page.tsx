'use client';
import { LoadingScreen } from '@/components/shared/LoadingSpinner';
import { useUser } from '@clerk/nextjs';
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk';
import { useParams } from 'next/navigation';
import React, { useState } from 'react';
import MeetingSetup from '../_components/MeetingSetup';
import MeetingRoom from '../_components/MeetingRoom';
import useGetCallById from '@/hooks/useGetCallById';

const MeetingPage = () => {
  const { id } = useParams();
  const { isLoaded } = useUser();
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  if (!id) {
    return;
  }
  const { call, isCallLoading } = useGetCallById(id as string);
  if (!isLoaded || isCallLoading) {
    return <LoadingScreen />;
  }
  if (!call) {
    return (
      <div className='h-screen flex items-center justify-center'>
        <p className='text-2xl font-semibold'>Meeting not found</p>
      </div>
    );
  }
  return (
    <StreamCall call={call}>
      <StreamTheme>
        {!isSetupComplete ? (
          <MeetingSetup onSetupComplete={() => setIsSetupComplete(true)} />
        ) : (
          <MeetingRoom />
        )}
      </StreamTheme>
    </StreamCall>
  );
};

export default MeetingPage;
