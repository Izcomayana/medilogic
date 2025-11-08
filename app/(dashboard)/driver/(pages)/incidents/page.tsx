'use client';

import { PageHeader } from '@/app/(dashboard)/components/PageHeader';
import { Eye, AlertCircle, Calendar, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  // DialogTrigger,
} from '@/components/ui/dialog';
import { useDriverIncidents } from '@/hooks/incidents/driver';
import { ReportIncident } from '@/app/(dashboard)/components/Incidents/ReportIncident';
import { IncidentFilters } from '@/app/(dashboard)/components/Incidents/Filters';
import { IncidentTable } from '@/app/(dashboard)/components/Incidents/Table';
import { useIncidentsBase } from '@/hooks/incidents/base';
import { IncidentDetails } from '@/app/(dashboard)/components/Incidents/Details';

export default function DriverIncidentsPage() {
  const incidentState = useDriverIncidents();

  const base = useIncidentsBase([]);

  const {
    incidents,
    showDetailsModal,
    setShowDetailsModal,
    selectedIncident,
    handleViewDetails,
  } = incidentState;

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'new':
        return <Badge className="bg-blue-600 text-white">New</Badge>;
      case 'under review':
        return <Badge className="bg-yellow-600 text-white">Under Review</Badge>;
      case 'resolved':
        return <Badge className="bg-green-600 text-white">Resolved</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

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
