import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';
import React, { useEffect, useState } from 'react';

interface UseGetCallByIdReturn {
  call: Call | undefined;
  isCallLoading: boolean;
}

const useGetCallById = (id: string): UseGetCallByIdReturn => {
  const [call, setCall] = useState<Call>();
  const [isCallLoading, setIsCallLoading] = useState(true);

  const client = useStreamVideoClient();
  useEffect(() => {
    if (!client) {
      return;
    }
    const getCall = async () => {
      try {
        const { calls } = await client.queryCalls({
          filter_conditions: { id },
        });
        if (calls.length > 0) {
          setCall(calls.at(0));
        }
      } catch (error) {
        console.error(error);
        setCall(undefined);
      } finally {
        setIsCallLoading(false);
      }
    };
    getCall();
  }, [client, id]);
  return { call, isCallLoading };
};

export default useGetCallById;
