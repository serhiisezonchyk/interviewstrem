'use client';
import { LoadingScreen } from '@/components/shared/LoadingSpinner';
import { Button } from '@/components/ui/button';
import { INTERVIEW_CATEGORY } from '@/constants';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { getCandidateInfo, groupInterviews } from '@/lib/utils';
import { Interview, InterviewStatus } from '@/types';
import { useMutation, useQuery } from 'convex/react';
import Link from 'next/link';
import { toast } from 'sonner';
import InterviewList from './_components/InterviewList';
import InterviewItem from './_components/InterviewItem';

const DashboardPage = () => {
  const users = useQuery(api.users.getUsers);
  const interviews = useQuery(api.interviews.getAllInterviews);
  const updateStatus = useMutation(api.interviews.updateInterviewStatus);

  const handleStatusUpdate = async (
    interviewId: Id<'interviews'>,
    status: InterviewStatus
  ) => {
    try {
      await updateStatus({ interviewId, status });
      toast.success(`interview marked as ${status}`);
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  if (!interviews || !users) {
    return <LoadingScreen />;
  }

  const groupedInterviews = groupInterviews(interviews);

  return (
    <div className='container mx-auto py-10'>
      <div className='flex items-center mb-8'>
        <Link href='/schedule'>
          <Button>Schedule New interview</Button>
        </Link>
      </div>
      <div className='space-y-8'>
        {INTERVIEW_CATEGORY.map(
          (cat) =>
            groupedInterviews[cat.id]?.length > 0 && (
              <InterviewList
                key={cat.id}
                title={cat.title}
                variant={cat.variant}
                count={groupedInterviews[cat.id].length}
                renderItems={() =>
                  groupedInterviews[cat.id].map((interview: Interview) => {
                    const candidateInfo = getCandidateInfo(
                      users,
                      interview.candidateId
                    );

                    return (
                      <InterviewItem
                        key={interview._id}
                        interview={interview}
                        candidateInfo={candidateInfo}
                        className='hover:shadow-md transition-all'
                        handleStatusUpdate={handleStatusUpdate}
                      />
                    );
                  })
                }
              />
            )
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
