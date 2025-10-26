import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { LightbulbIcon } from 'lucide-react';
import React from 'react';
import { useCodeEditorContext } from './CodeEditorProvider';

interface CodeEditoreExampleProps {
  title: string;
  className?: string;
}

const CodeEditoreExample = ({ title, className }: CodeEditoreExampleProps) => {
  const { selectedQuestion } = useCodeEditorContext();
  return (
    <Card className={className}>
      <CardHeader className='flex flex-row items-center gap-2'>
        <LightbulbIcon className='h-5 w-5 text-yellow-500' />
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className='h-full w-full rounded-md border'>
          <div className='p-4 space-y-4'>
            {selectedQuestion.examples.map((example, index) => (
              <div key={index} className='space-y-2'>
                <p className='font-medium text-sm'>Example {index + 1}:</p>
                <ScrollArea className='h-full w-full rounded-md'>
                  <pre className='bg-muted/50 p-3 rounded-lg text-sm font-mono'>
                    <div>Input: {example.input}</div>
                    <div>Output: {example.output}</div>
                    {example.explanation && (
                      <div className='pt-2 text-muted-foreground'>
                        Explanation: {example.explanation}
                      </div>
                    )}
                  </pre>
                  <ScrollBar orientation='horizontal' />
                </ScrollArea>
              </div>
            ))}
          </div>
          <ScrollBar />
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default CodeEditoreExample;
