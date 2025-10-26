import CandidateSelect from '@/components/shared/CandidateSelect';
import InterviewersSelect from '@/components/shared/InterviewersSelect';
import { TextField } from '@/components/shared/TextField/TextField';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { TIME_SLOTS } from '@/constants';
import useInterviewForm from '@/hooks/useInterviewForm';
import { Loader2Icon } from 'lucide-react';

const InterviewDialog = () => {
  const {
    open,
    setOpen,
    formData,
    setFormData,
    candidates,
    interviewers,
    addInterviewer,
    removeInterviewer,
    scheduleMeeting,
    isCreating,
    user,
  } = useInterviewForm();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size='lg'>Schedule Interview</Button>
      </DialogTrigger>

      <DialogContent className='sm:max-w-[500px] h-[calc(100vh-200px)] overflow-auto'>
        <DialogHeader>
          <DialogTitle>Schedule Interview</DialogTitle>
        </DialogHeader>

        <div className='space-y-4 py-4'>
          <TextField
            label='Title'
            placeholder='Interview title'
            value={formData.title}
            onChange={(v) => setFormData({ ...formData, title: v })}
          />

          <TextField
            label='Description'
            placeholder='Interview description'
            multiline
            value={formData.description}
            onChange={(v) => setFormData({ ...formData, description: v })}
          />

          <CandidateSelect
            candidates={candidates}
            value={formData.candidateId}
            onChange={(id) => setFormData({ ...formData, candidateId: id })}
          />

          <InterviewersSelect
            interviewers={interviewers}
            selectedIds={formData.interviewerIds}
            onAdd={addInterviewer}
            onRemove={removeInterviewer}
            currentUserId={user?.id}
          />

          {/* DATE & TIME */}
          <div className='flex gap-4'>
            <div className='space-y-2'>
              <label className='text-sm font-medium'>Date</label>
              <Calendar
                mode='single'
                selected={formData.date}
                onSelect={(date) => date && setFormData({ ...formData, date })}
                disabled={(date) => date < new Date()}
                className='rounded-md border'
              />
            </div>

            {/* TIME */}

            <div className='space-y-2'>
              <label className='text-sm font-medium'>Time</label>
              <Select
                value={formData.time}
                onValueChange={(time) => setFormData({ ...formData, time })}
              >
                <SelectTrigger>
                  <SelectValue placeholder='Select time' />
                </SelectTrigger>
                <SelectContent>
                  {TIME_SLOTS.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className='flex justify-end gap-3 pt-4'>
            <Button variant='outline' onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={scheduleMeeting} disabled={isCreating}>
              {isCreating ? (
                <>
                  <Loader2Icon className='mr-2 size-4 animate-spin' />
                  Scheduling...
                </>
              ) : (
                'Schedule Interview'
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InterviewDialog;
