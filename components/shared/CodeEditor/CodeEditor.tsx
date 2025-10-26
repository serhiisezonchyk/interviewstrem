import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import { ScrollArea } from '@/components/ui/scroll-area';
import CodeEditorComponent from './_components/CodeEditorProvider';

const CodeEditor = () => {
  return (
    <ResizablePanelGroup
      direction='vertical'
      className='min-h-[calc(100vh-4rem-1px)]'
    >
      <CodeEditorComponent>
        <ResizablePanel>
          <ScrollArea className='h-full'>
            <div className='p-6'>
              <div className='max-w-4xl mx-auto space-y-6'>
                <CodeEditorComponent.Header title='Choose your language and solve the problem' />
                <CodeEditorComponent.Problem title='Problem Description' />
                <CodeEditorComponent.Example title='Examples' />
                <CodeEditorComponent.Constraints title='Constraints' />
              </div>
            </div>
          </ScrollArea>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={60} maxSize={100}>
          <div className='h-full relative'>
            <CodeEditorComponent.CodeEditor />
          </div>
        </ResizablePanel>
      </CodeEditorComponent>
    </ResizablePanelGroup>
  );
};

export default CodeEditor;
