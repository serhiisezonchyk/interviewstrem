import { api } from '@/convex/_generated/api';
import { useUser } from '@clerk/nextjs';
import { useQuery } from 'convex/react';
import React from 'react';

interface UseUserRoleReturn {
  isLoading: boolean;
  isUser: boolean;
  isCreator: boolean;
}
const useUserRole = (): UseUserRoleReturn => {
  const { user } = useUser();
  const userData = useQuery(api.users.getUserByClerkId, {
    clerkId: user?.id || '',
  });

  const isLoading = userData === undefined;
  return {
    isLoading,
    isCreator: userData?.role === 'creator',
    isUser: userData?.role === 'user',
  };
};

export default useUserRole;
