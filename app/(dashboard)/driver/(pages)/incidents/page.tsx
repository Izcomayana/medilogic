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
import { ReportIncident } from '@/app/(dashboard)/components/ReportIncident';

export default function DriverIncidentsPage() {
  const incidentState = useDriverIncidents();

  const {
    incidents,
    showDetailsModal,
    setShowDetailsModal,
    selectedIncident,
    handleViewDetails,
  } = useDriverIncidents();

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
          <div className="mb-8 flex justify-between items-start">
            <ReportIncident {...incidentState} />
          </div>

          {/* Incidents Table */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                Your Incidents ({incidents.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {incidents.length === 0 ? (
                <div className="text-center py-12">
                  <AlertCircle className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-white mb-2">
                    No incidents reported
                  </h3>
                  <p className="text-gray-400">
                    You haven&apos;t reported any incidents yet
                  </p>
                </div>
              ) : (
                <div className="rounded-md border border-gray-700 overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-gray-700 hover:bg-gray-800">
                        <TableHead className="text-gray-300">
                          Incident ID
                        </TableHead>
                        <TableHead className="text-gray-300">Trip</TableHead>
                        <TableHead className="text-gray-300">Type</TableHead>
                        <TableHead className="text-gray-300">Status</TableHead>
                        <TableHead className="text-gray-300">
                          Reported At
                        </TableHead>
                        <TableHead className="text-gray-300">Details</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {incidents.map((incident) => (
                        <TableRow
                          key={incident.id}
                          className="border-gray-700 hover:bg-gray-800"
                        >
                          <TableCell className="font-medium text-white">
                            {incident.id}
                          </TableCell>
                          <TableCell className="text-gray-300">
                            {incident.title}
                          </TableCell>
                          <TableCell className="text-gray-300">
                            {incident.incident_type}
                          </TableCell>
                          <TableCell>
                            {getStatusBadge(incident.status)}
                          </TableCell>
                          <TableCell className="text-gray-300 text-sm">
                            {incident.created_at}
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleViewDetails(incident)}
                              className="border-gray-600 text-gray-300 hover:bg-gray-700"
                            >
                              <Eye className="h-3 w-3 mr-1" />
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Incident Details Modal */}
      <Dialog open={showDetailsModal} onOpenChange={setShowDetailsModal}>
        <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-2xl max-h-96 overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              {selectedIncident?.id}
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Complete incident details and status
            </DialogDescription>
          </DialogHeader>

          {selectedIncident && (
            <div className="space-y-6 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-400 text-sm">Trip</Label>
                  <p className="text-white font-medium mt-1">
                    {selectedIncident.title}
                  </p>
                </div>
                <div>
                  <Label className="text-gray-400 text-sm">Type</Label>
                  <p className="text-white font-medium mt-1">
                    {selectedIncident.incident_type}
                  </p>
                </div>
              </div>

              <div>
                <Label className="text-gray-400 text-sm">Status</Label>
                <div className="mt-1">
                  {getStatusBadge(selectedIncident.status)}
                </div>
              </div>

              <div>
                <Label className="text-gray-400 text-sm">Description</Label>
                <div className="bg-gray-700 rounded p-3 border border-gray-600 mt-1">
                  <p className="text-gray-300 text-sm">
                    {selectedIncident.description}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-400 text-sm flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    Reported At
                  </Label>
                  <p className="text-gray-300 text-sm mt-1">
                    {selectedIncident.timestamp}
                  </p>
                </div>
              </div>

              {selectedIncident.photoUrl && (
                <div>
                  <Label className="text-gray-400 text-sm">
                    Photo Evidence
                  </Label>
                  <img
                    src={selectedIncident.photoUrl || '/placeholder.svg'}
                    alt="Incident evidence"
                    className="mt-2 rounded border border-gray-600 max-h-48 w-full object-cover"
                  />
                </div>
              )}

              {selectedIncident.adminResponse && (
                <div className="bg-blue-900 border border-blue-700 rounded p-4">
                  <p className="text-sm font-semibold text-blue-200 mb-1">
                    Admin Response
                  </p>
                  <p className="text-blue-100 text-sm">
                    {selectedIncident.adminResponse}
                  </p>
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDetailsModal(false)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
