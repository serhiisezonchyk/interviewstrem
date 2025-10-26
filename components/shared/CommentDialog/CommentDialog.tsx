import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { getInterviewerInfo } from '@/lib/utils';
import { useMutation, useQuery } from 'convex/react';
import { format } from 'date-fns';
import { MessageSquareIcon } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import TextField from '../TextField';
import { renderStars } from '@/lib/ui';
import StarsSelect from '../StarsSelect';
interface CommentDialogProps {
  interviewId: Id<'interviews'>;
}
const CommentDialog = ({ interviewId }: CommentDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState('3');

  const addComment = useMutation(api.comments.addComment);
  const users = useQuery(api.users.getUsers);
  const existingComments = useQuery(api.comments.getComments, { interviewId });

  const handleSubmit = async () => {
    if (!comment.trim()) return toast.error('Please enter comment');

    try {
      await addComment({
        interviewId,
        content: comment.trim(),
        rating: parseInt(rating),
      });

      toast.success('Comment submitted');
      setComment('');
      setRating('3');
      setIsOpen(false);
    } catch (error) {
      toast.error('Failed to submit comment');
    }
  };

  if (existingComments === undefined || users === undefined) return null;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant='secondary' className='w-full'>
          <MessageSquareIcon className='h-4 w-4 mr-2' />
          Add Comment
        </Button>
      </DialogTrigger>

      <DialogContent className='w-full sm:max-w-[550px] h-[400px] overflow-auto'>
        <DialogHeader>
          <DialogTitle>Interview Comment</DialogTitle>
        </DialogHeader>

        <div className='space-y-6'>
          {existingComments.length > 0 && (
            <div className='space-y-4'>
              <div className='flex items-center justify-between'>
                <h4 className='text-sm font-medium'>Previous Comments</h4>
                <Badge variant='outline'>
                  {existingComments.length} Comment
                  {existingComments.length !== 1 ? 's' : ''}
                </Badge>
              </div>

              <ScrollArea className='h-[240px]'>
                <div className='space-y-4'>
                  {existingComments.map((comment, index) => {
                    const interviewer = getInterviewerInfo(
                      users,
                      comment.interviewerId
                    );
                    return (
                      <div
                        key={index}
                        className='rounded-lg border p-4 space-y-3'
                      >
                        <div className='flex items-center justify-between'>
                          <div className='flex items-center gap-2'>
                            <Avatar className='h-8 w-8'>
                              <AvatarImage src={interviewer.image} />
                              <AvatarFallback>
                                {interviewer.initials}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className='text-sm font-medium'>
                                {interviewer.name}
                              </p>
                              <p className='text-xs text-muted-foreground'>
                                {format(
                                  comment._creationTime,
                                  'MMM d, yyyy • h:mm a'
                                )}
                              </p>
                            </div>
                          </div>
                          {renderStars(comment.rating)}
                        </div>
                        <p className='text-sm text-muted-foreground'>
                          {comment.content}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </ScrollArea>
            </div>
          )}

          <div className='space-y-4'>
            <StarsSelect label='Rating' value={rating} setValue={setRating} />

            <TextField
              className='space-y-2'
              label='Your Comment'
              placeholder='Share your detailed comment about the candidate...'
              multiline
              value={comment}
              onChange={(v) => setComment(v)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant='outline' onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CommentDialog;
