'use client';

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import { AuthProvider } from '../auth';

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      {children}
      <ProgressBar
        height="5px"
        color="#111111"
        options={{ showSpinner: true }}
        shallowRouting
      />
    </AuthProvider>
  );
};

export default Providers;
