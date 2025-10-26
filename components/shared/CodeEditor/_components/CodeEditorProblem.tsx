import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookIcon } from 'lucide-react';
import React from 'react';
import { useCodeEditorContext } from './CodeEditorProvider';

interface CodeEditorProblemProps {
  title: string;
  className?: string;
}
const CodeEditorProblem = ({ title, className }: CodeEditorProblemProps) => {
  const { selectedQuestion } = useCodeEditorContext();
  return (
    <Card className={className}>
      <CardHeader className='flex flex-row items-center gap-2'>
        <BookIcon className='h-5 w-5 text-primary/80' />
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className='text-sm leading-relaxed'>
        <div className='prose prose-sm dark:prose-invert max-w-none'>
          <p className='whitespace-pre-line'>{selectedQuestion.description}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CodeEditorProblem;
