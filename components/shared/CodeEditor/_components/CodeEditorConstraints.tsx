import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircleIcon } from 'lucide-react';
import React from 'react';
import { useCodeEditorContext } from './CodeEditorProvider';

interface CodeEditorConstraintsProps {
  title: string;
  className?: string;
}

const CodeEditorConstraints = ({
  title,
  className,
}: CodeEditorConstraintsProps) => {
  const { selectedQuestion } = useCodeEditorContext();
  return (
    selectedQuestion.constraints && (
      <Card className={className}>
        <CardHeader className='flex flex-row items-center gap-2'>
          <AlertCircleIcon className='h-5 w-5 text-blue-500' />
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className='list-disc list-inside space-y-1.5 text-sm marker:text-muted-foreground'>
            {selectedQuestion.constraints.map((constraint, index) => (
              <li key={index} className='text-muted-foreground'>
                {constraint}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    )
  );
};

export default CodeEditorConstraints;
