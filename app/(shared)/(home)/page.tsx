'use client';
import ActionCard from '@/components/shared/ActionCard';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import MeetingModal from '@/components/shared/MeetingModal';
import { QUICK_ACTIONS } from '@/constants';
import useUserRole from '@/hooks/useUserRole';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Home() {
  const { isCreator, isLoading } = useUserRole();
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'start' | 'join'>();
  const handleAction = (id: string) => {
    switch (id) {
      case 'new-call':
        setShowModal(true);
        setModalType('start');
        break;
      case 'join':
        setShowModal(true);
        setModalType('join');
        break;
      default:
        router.push(`/${id}`);
    }
  };
  if (isLoading) {
    return (
      <div className='h-[calc(100vh-4rem-1px)] flex items-center justify-center'>
        <LoadingSpinner message='Loading...' />
      </div>
    );
  }
  return (
    <div className='container mx-auto max-w-7xl p-6'>
      <div className='rounded-lg bg-card p-6 border shadow-sm mb-10'>
        <h1 className='text-4xl font-bold bg-linear-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent'>
          Welcome back!
        </h1>
        <p className='text-muted-foreground mt-2'>
          {isCreator
            ? 'Manage your interviews and review candidates effectively'
            : 'Access your upcoming interviews and preparations'}
        </p>
      </div>

      {isCreator ? (
        <>
          <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-6'>
            {QUICK_ACTIONS.map((action) => (
              <ActionCard
                key={action.title}
                action={action}
                onClick={() => handleAction(action.id)}
              />
            ))}
          </div>
          <MeetingModal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            title={modalType === 'join' ? 'Join Meeting' : 'Start Meeting'}
            isJoinMeeting={modalType === 'join'}
          />
        </>
      ) : (
        <>
          <div> User view</div>
        </>
      )}
    </div>
  );
}
