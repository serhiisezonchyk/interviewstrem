import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CODING_QUESTIONS, LANGUAGES } from '@/constants';
import React from 'react';
import { useCodeEditorContext } from './CodeEditorProvider';
import { cn } from '@/lib/utils';

interface CodeEditorHeaderProps {
  title: string;
  className?: string;
}
const CodeEditorHeader = ({ title, className }: CodeEditorHeaderProps) => {
  const {
    selectedQuestion,
    handleQuestionChange,
    language,
    handleLanguageChange,
  } = useCodeEditorContext();
  return (
    <div
      className={cn(
        'flex flex-col sm:flex-row sm:items-center justify-between gap-4',
        className
      )}
    >
      <div className='space-y-1'>
        <div className='flex items-center gap-2'>
          <h2 className='text-2xl font-semibold tracking-tight'>
            {selectedQuestion.title}
          </h2>
        </div>
        <p className='text-sm text-muted-foreground'>{title}</p>
      </div>
      <div className='flex items-center gap-3'>
        <Select
          value={selectedQuestion.id}
          onValueChange={handleQuestionChange}
        >
          <SelectTrigger className='w-[180px]'>
            <SelectValue placeholder='Select question' />
          </SelectTrigger>
          <SelectContent>
            {CODING_QUESTIONS.map((q) => (
              <SelectItem key={q.id} value={q.id}>
                {q.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={language} onValueChange={handleLanguageChange}>
          <SelectTrigger className='w-[150px]'>
            <SelectValue>
              <div className='flex items-center gap-2'>
                <img
                  src={`/${language}.png`}
                  alt={language}
                  className='w-5 h-5 object-contain'
                />
                {LANGUAGES.find((l) => l.id === language)?.name}
              </div>
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {LANGUAGES.map((lang) => (
              <SelectItem key={lang.id} value={lang.id}>
                <div className='flex items-center gap-2'>
                  <img
                    src={`/${lang.id}.png`}
                    alt={lang.name}
                    className='w-5 h-5 object-contain'
                  />
                  {lang.name}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default CodeEditorHeader;
