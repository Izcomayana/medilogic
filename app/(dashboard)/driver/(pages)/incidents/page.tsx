'use client';

import { PageHeader } from '@/app/(dashboard)/components/PageHeader';
import { ReportIncident } from '@/app/(dashboard)/components/Incidents/ReportIncident';
import { IncidentFilters } from '@/app/(dashboard)/components/Incidents/Filters';
import { IncidentTable } from '@/app/(dashboard)/components/Incidents/Table';
import { IncidentDetails } from '@/app/(dashboard)/components/Incidents/Details';
import { useIncidents } from '@/hooks/incidents/base';

export default function DriverIncidentsPage() {
  const incidentState = useIncidents([]);

  return (
    <div className="flex flex-col h-screen bg-gray-900">
      <PageHeader
        title="Incidents"
        subtitle="Report and track issues during your trips"
      />

      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="mb-4 flex justify-between items-start">
            <ReportIncident {...incidentState} />
          </div>
          <IncidentFilters {...incidentState} />
          <br />
          {/* Incidents Table */}
          <IncidentTable {...incidentState} />
        </div>
      </main>

      <IncidentDetails {...incidentState} />
    </div>
  );
}
