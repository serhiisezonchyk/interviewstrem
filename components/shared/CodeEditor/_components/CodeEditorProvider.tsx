import { CodeQuestion, CODING_QUESTIONS, LANGUAGES } from '@/constants';
import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from 'react';
import CodeEditorHeader from './CodeEditorHeader';
import CodeEditorProblem from './CodeEditorProblem';
import CodeEditoreExample from './CodeEditoreExample';
import CodeEditorConstraints from './CodeEditorConstraints';
import CodeEditorArea from './CodeEditorArea';
import { LanguagesType } from '@/types';

interface CodeEditorContextProps {
  code: string;
  setCode: (code: string) => void;
  language: LanguagesType;
  selectedQuestion: CodeQuestion;
  handleLanguageChange: (newLanguage: LanguagesType) => void;
  handleQuestionChange: (questionId: string) => void;
}

const CodeEditorContext = createContext<CodeEditorContextProps>(null!);

export const useCodeEditorContext = () => {
  const props = useContext(CodeEditorContext);
  if (!props) {
    throw new Error('No CodeEditor context');
  }
  return props;
};

const CodeEditorProvider = ({ children }: PropsWithChildren) => {
  const [selectedQuestion, setSelectedQuestion] = useState(CODING_QUESTIONS[0]);
  const [language, setLanguage] = useState<LanguagesType>(LANGUAGES[0].id);

  const [code, setCode] = useState(selectedQuestion.starterCode[language]);

  const handleQuestionChange = (questionId: string) => {
    const question = CODING_QUESTIONS.find((q) => q.id === questionId)!;
    setSelectedQuestion(question);
    setCode(question.starterCode[language]);
  };

  const handleLanguageChange = (newLanguage: LanguagesType) => {
    setLanguage(newLanguage);
    setCode(selectedQuestion.starterCode[newLanguage]);
  };

  return (
    <CodeEditorContext.Provider
      value={{
        code,
        setCode,
        language,
        selectedQuestion,
        handleLanguageChange,
        handleQuestionChange,
      }}
    >
      {children}
    </CodeEditorContext.Provider>
  );
};

const CodeEditorComponent = Object.assign(CodeEditorProvider, {
  Header: CodeEditorHeader,
  Problem: CodeEditorProblem,
  Example: CodeEditoreExample,
  Constraints: CodeEditorConstraints,
  CodeEditor: CodeEditorArea,
});

export default CodeEditorComponent;
