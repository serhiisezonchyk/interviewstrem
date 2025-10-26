type LanguagesType = 'javascript' | 'python' | 'java';
type InterviewStatus = 'succeded' | 'failed' | 'upcoming' | 'completed';
type ComponentVariants = 'outline' | 'secondary' | 'default' | 'destructive';

type InterviewCategoryType = {
  id: InterviewStatus;
  title: string;
  variant: ComponentVariants;
};
type CandidateInfoType = {
  name: string;
  image: string;
  initials: string;
};
export type {
  LanguagesType,
  InterviewStatus,
  InterviewCategoryType,
  ComponentVariants,
  CandidateInfoType,
};
