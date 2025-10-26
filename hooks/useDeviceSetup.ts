import { useEffect, useState } from 'react';
import { useCall } from '@stream-io/video-react-sdk';

export const useDeviceSetup = () => {
  const [isCameraDisabled, setIsCameraDisabled] = useState(false);
  const [isMicrophoneDisabled, setIsMicrophoneDisabled] = useState(false);
  const call = useCall();

  useEffect(() => {
    if (!call) {
      return;
    }

    if (isCameraDisabled) {
      call.camera.disable();
    } else {
      call.camera.enable();
    }
  }, [call, isCameraDisabled]);

  useEffect(() => {
    if (!call) {
      return;
    }

    if (isMicrophoneDisabled) {
      call.microphone.disable();
    } else {
      call.microphone.enable();
    }
  }, [call, isMicrophoneDisabled]);

  return {
    call,
    isCameraDisabled,
    setIsCameraDisabled,
    isMicrophoneDisabled,
    setIsMicrophoneDisabled,
  };
};
