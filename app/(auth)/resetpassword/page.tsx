import React, { Suspense } from 'react';
import Resetpassword from '.';

const Page = () => {
  return (
    <Suspense
      fallback={
        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
      }
    >
      <Resetpassword />
    </Suspense>
  );
};

export default Page;
