import StreamClientProvider from '@/components/providers/StreamClientProvider';
import React, { PropsWithChildren } from 'react';

const Layout = ({ children }: PropsWithChildren) => {
  return <StreamClientProvider>{children}</StreamClientProvider>;
};

export default Layout;
