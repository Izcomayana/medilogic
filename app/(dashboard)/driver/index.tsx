import React from 'react';
import { PageHeader } from '../components/PageHeader';

export const Driver = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      {/* Header is always visible */}
      <PageHeader title="Driver" subtitle="" />

      <div className="text-white">driver dashboard</div>
    </div>
  );
};
