import React from 'react';
import { PageHeader } from '../components/PageHeader';

export const Client = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      {/* Header is always visible */}
      <PageHeader title="Client" subtitle="" />

      <div className="text-white">client dashboard</div>
    </div>
  );
};
