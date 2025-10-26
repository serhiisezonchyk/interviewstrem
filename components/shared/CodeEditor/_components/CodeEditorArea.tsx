import Editor from '@monaco-editor/react';
import { useCodeEditorContext } from './CodeEditorProvider';

const CodeEditorArea = () => {
  const { language, code, setCode } = useCodeEditorContext();

  return (
    <Editor
      height={'100%'}
      defaultLanguage={language}
      language={language}
      theme='vs-dark'
      value={code}
      onChange={(value) => setCode(value || '')}
      options={{
        minimap: { enabled: false },
        fontSize: 18,
        lineNumbers: 'on',
        scrollBeyondLastLine: false,
        automaticLayout: true,
        padding: { top: 16, bottom: 16 },
        wordWrap: 'on',
        wrappingIndent: 'indent',
      }}
    />
  );
};

export default CodeEditorArea;
