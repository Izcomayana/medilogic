'use client';

import { PageHeader } from '../components/PageHeader';

export const RegulatorDashboard = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      {/* Header is always visible */}
      <PageHeader
        title="Regulator"
        subtitle="Oversight and compliance monitoring dashboard for regulators."
      />

      <main>
        <p className="text-gray-200">regulator dashboard</p>
      </main>
    </div>
  );
};
