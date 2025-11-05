import { Card, CardContent } from '@/components/ui/card';
import { useAdminIncidents } from '@/hooks/incidents/adminIncidents';
import { Eye, AlertCircle, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';

type IncidentTableProps = ReturnType<typeof useAdminIncidents>;

export function IncidentTable({
  filteredIncidents,
  handleViewIncident,
}: IncidentTableProps) {
  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'new':
        return <Badge className="bg-blue-600 text-white">New</Badge>;
      case 'under review':
        return <Badge className="bg-yellow-600 text-white">Under Review</Badge>;
      case 'needs follow-up':
        return (
          <Badge className="bg-orange-600 text-white">Needs Follow-up</Badge>
        );
      case 'resolved':
        return <Badge className="bg-green-600 text-white">Resolved</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <Card className="dashboard-card">
      <CardContent className="p-0">
        {filteredIncidents.length === 0 ? (
          <div className="text-center py-12">
            <AlertCircle className="h-12 w-12 text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">
              No incidents found
            </h3>
            <p className="text-gray-400">
              No incidents match your search and filter criteria
            </p>
          </div>
        ) : (
          <div className="rounded-md border border-gray-700 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-700 hover:bg-gray-800">
                  <TableHead className="text-gray-300">ID</TableHead>
                  <TableHead className="text-gray-300">Driver</TableHead>
                  <TableHead className="text-gray-300">Trip</TableHead>
                  <TableHead className="text-gray-300">Type</TableHead>
                  <TableHead className="text-gray-300">Status</TableHead>
                  <TableHead className="text-gray-300">Reported Date</TableHead>
                  <TableHead className="text-gray-300">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredIncidents.map((incident) => (
                  <TableRow
                    key={incident.id}
                    className="border-gray-700 hover:bg-gray-800"
                  >
                    <TableCell className="font-medium text-white">
                      {incident.id}
                    </TableCell>
                    <TableCell className="text-gray-300">
                      {incident.driver}
                    </TableCell>
                    <TableCell className="text-gray-300">
                      {incident.tripId}
                    </TableCell>
                    <TableCell className="text-gray-300">
                      {incident.type}
                    </TableCell>
                    <TableCell>{getStatusBadge(incident.status)}</TableCell>
                    <TableCell className="text-gray-300 text-sm">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {incident.reportedDate}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewIncident(incident)}
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
  );
}
