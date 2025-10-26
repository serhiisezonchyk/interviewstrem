'use client';

import { getFullName } from '@/lib/utils';
import { useUser } from '@clerk/nextjs';
import { StreamVideo, StreamVideoClient } from '@stream-io/video-react-sdk';
import { PropsWithChildren, useEffect, useState } from 'react';
import LoadingSpinner from '../shared/LoadingSpinner';
import { streamTokenProvider } from '@/actions/stream.actions';

const StreamClientProvider = ({ children }: PropsWithChildren) => {
  const [streamVideoClient, setStreamVideoClient] =
    useState<StreamVideoClient>();
  const { user, isLoaded } = useUser();
  useEffect(() => {
    if (!isLoaded || !user) {
      return;
    }
    const client = new StreamVideoClient({
      apiKey: process.env.NEXT_PUBLIC_STREAM_API_KEY!,
      user: {
        id: user.id,
        name: getFullName(user?.firstName, user?.lastName, user?.id),
        image: user?.imageUrl,
      },
      tokenProvider: streamTokenProvider,
    });
    setStreamVideoClient(client);
  }, [user, isLoaded]);

  if (!streamVideoClient) {
    return (
      <div className='h-[calc(100vh-4rem-1px)] flex items-center justify-center'>
        <LoadingSpinner />
      </div>
    );
  }
  return <StreamVideo client={streamVideoClient}>{children}</StreamVideo>;
};

export default StreamClientProvider;
