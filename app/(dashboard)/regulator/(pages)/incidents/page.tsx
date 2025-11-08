'use client';

import { PageHeader } from '@/app/(dashboard)/components/PageHeader';
import { AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAdminIncidents } from '@/hooks/incidents/adminIncidents';
// import { ReportIncident } from '@/app/(dashboard)/components/ReportIncident';
import { IncidentFilters } from '@/app/(dashboard)/components/Incidents/Filters';
import { IncidentTable } from '@/app/(dashboard)/components/Incidents/Table';
import { IncidentDetails } from '@/app/(dashboard)/components/Incidents/Details';

export default function AdminIncidentsPage() {
  const incidentState = useAdminIncidents();

  const { filteredIncidents } = incidentState;

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <PageHeader
        title="Incident Reports"
        subtitle="Review and manage driver-reported incidents"
      />

      <main className="flex-1 p-6">
        {/* Filters and Search */}
        <Card className="dashboard-card mb-6">
          <CardHeader>
            <div className="flex flex-col md:flex-row justify-between md:items-center">
              <CardTitle className="text-white flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                Incidents ({filteredIncidents.length})
              </CardTitle>
            </div>
          </CardHeader>

          <CardContent>
            <IncidentFilters {...incidentState} />
          </CardContent>
        </Card>

        {/* Incidents Table */}
        <IncidentTable {...incidentState} />
      </main>

      {/* Incident Details Modal */}
      <IncidentDetails {...incidentState} />
    </div>
  );
}
