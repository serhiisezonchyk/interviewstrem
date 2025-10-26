import { Card } from '@/components/ui/card';
import { DeviceSettings, VideoPreview } from '@stream-io/video-react-sdk';
import { CameraIcon, MicIcon, SettingsIcon } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import SettingsRow from './_components/SettingsRow';
import JoinButton from './_components/JoinButton';
import { useDeviceSetup } from '@/hooks/useDeviceSetup';

interface MeetingSetupProps {
  onSetupComplete: () => void;
}

const MeetingSetup = ({ onSetupComplete }: MeetingSetupProps) => {
  const {
    call,
    isCameraDisabled,
    setIsCameraDisabled,
    isMicrophoneDisabled,
    setIsMicrophoneDisabled,
  } = useDeviceSetup();

  if (!call) return null;

  const handleJoin = async () => {
    await call.join();
    onSetupComplete();
  };

  return (
    <div className='min-h-screen flex items-center justify-center p-6 bg-background/95'>
      <div className='w-full max-w-[1200px] mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <Card className='md:col-span-1 p-6 flex flex-col'>
            <div>
              <h1 className='text-xl font-semibold mb-1'>Camera Preview</h1>
              <p className='text-sm text-muted-foreground'>
                Make sure you look good!
              </p>
            </div>
            <div className='mt-4 flex-1 min-h-[400px] rounded-xl overflow-hidden bg-muted/50 border relative'>
              <VideoPreview className='absolute inset-0 w-full! h-full!' />
            </div>
          </Card>

          <Card className='md:col-span-1 p-6'>
            <div className='h-full flex flex-col justify-between'>
              <div>
                <h2 className='text-xl font-semibold mb-1'>Meeting Details</h2>
                <p className='text-sm text-muted-foreground break-all'>
                  {call.id}
                </p>
              </div>

              <div className='space-y-6 mt-6'>
                <SettingsRow
                  icon={<MicIcon className='w-5 h-5 text-primary' />}
                  title='Microphone'
                  description={isMicrophoneDisabled ? 'Off' : 'On'}
                  rightElement={
                    <Switch
                      checked={!isMicrophoneDisabled}
                      onCheckedChange={(checked) =>
                        setIsMicrophoneDisabled(!checked)
                      }
                    />
                  }
                />

                <SettingsRow
                  icon={<CameraIcon className='w-5 h-5 text-primary' />}
                  title='Camera'
                  description={isCameraDisabled ? 'Off' : 'On'}
                  rightElement={
                    <Switch
                      checked={!isCameraDisabled}
                      onCheckedChange={(checked) =>
                        setIsCameraDisabled(!checked)
                      }
                    />
                  }
                />

                <SettingsRow
                  icon={<SettingsIcon className='w-5 h-5 text-primary' />}
                  title='Settings'
                  description='Configure devices'
                  rightElement={<DeviceSettings />}
                />
                <JoinButton onClick={handleJoin} />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MeetingSetup;
